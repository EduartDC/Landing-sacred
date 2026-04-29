/**
 * compress-images.mjs - Compresión inteligente de imágenes
 * 
 * Estrategia:
 * - Imágenes fotográficas (hero, fondos): resize a 1920px + quality 82
 * - Imágenes de galería/detalle: resize a 1280px + quality 85
 * - Imágenes de header de tour: resize a 1920px + quality 82
 * - Logos/iconos PNG: mantener dimensiones + quality 90 (sin pérdida)
 * - Todos los originals se guardan en public/_originals/ (con estructura de subdirs)
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const BACKUP_DIR = path.join(PUBLIC_DIR, '_originals');

// ── Subdirectorios de tours a procesar ───────────────────────────────────────
const TOUR_SUBDIRS = ['legacy', 'azulik', 'mystic', 'tulum', 'forest'];

// ── Configuración específica por archivo ─────────────────────────────────────
// Si un archivo tiene configuración específica, se usa esa. Si no, la genérica.
const SPECIFIC = {
  'palmeras.jpg':        { maxWidth: 1920, quality: 82, type: 'jpeg' },  // fondo hero
  'about-uno.jpg':       { maxWidth: 1280, quality: 85, type: 'jpeg' },
  'about-dos.jpg':       { maxWidth: 1280, quality: 85, type: 'jpeg' },
  'about-tres.jpg':      { maxWidth: 1280, quality: 85, type: 'jpeg' },
  'about-cuatro.jpg':    { maxWidth: 1280, quality: 85, type: 'jpeg' },
  'honda_exterior.png':  { maxWidth: 1280, quality: 85, type: 'jpeg' },  // convertir PNG→JPG
  'honda_interior.png':  { maxWidth: 1280, quality: 85, type: 'jpeg' },
  'hiace_exterior.png':  { maxWidth: 1280, quality: 85, type: 'jpeg' },
  'hice_interior.png':   { maxWidth: 1280, quality: 85, type: 'jpeg' },
  'transporte.png':      { maxWidth: 1920, quality: 85, type: 'jpeg' },
  'LOGO SACRED.png':     { maxWidth: null, quality: 90, type: 'png' },   // logo: sin resize
  'background-maya.png': { maxWidth: null, quality: 90, type: 'png' },   // pequeño, lo dejamos
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(2)} MB`;
};

const SUPPORTED = ['.jpg', '.jpeg', '.png', '.webp'];

const getFiles = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isFile() && SUPPORTED.includes(path.extname(e.name).toLowerCase()))
    .filter(e => !e.name.startsWith('_'))
    .map(e => ({ name: e.name, path: path.join(dir, e.name) }));

/**
 * Determina la configuración de compresión para un archivo dado.
 * Para archivos en subdirectorios de tours usa reglas basadas en nombre.
 */
function getConfig(fileName, subdir) {
  // Primero revisar config específica por nombre
  if (SPECIFIC[fileName]) return SPECIFIC[fileName];

  const ext = path.extname(fileName).toLowerCase();

  // Imágenes de tour
  if (subdir) {
    // Headers de tour → más grandes, alta calidad
    if (fileName.includes('header')) {
      return { maxWidth: 1920, quality: 82, type: ext === '.webp' ? 'webp' : 'jpeg' };
    }
    // Galería de tour → tamaño medio
    return { maxWidth: 1280, quality: 85, type: ext === '.webp' ? 'webp' : 'jpeg' };
  }

  // Genérica para archivos sin config específica en root
  return {
    maxWidth: 1920,
    quality: 85,
    type: ext === '.png' ? 'png' : ext === '.webp' ? 'webp' : 'jpeg',
  };
}

// Pequeña pausa para liberar file handles en Windows
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// ── Procesar un archivo ──────────────────────────────────────────────────────
async function processFile({ name, path: filePath }, backupDir, subdir) {
  const ext = path.extname(name).toLowerCase();
  const cfg = getConfig(name, subdir);
  const displayName = subdir ? `${subdir}/${name}` : name;

  // Backup (solo una vez) — leer todo a buffer para evitar locks
  const backupPath = path.join(backupDir, name);
  let sourceBuffer;

  if (!fs.existsSync(backupPath)) {
    // Primera vez: el archivo actual es el original
    sourceBuffer = fs.readFileSync(filePath);
    fs.writeFileSync(backupPath, sourceBuffer);
  } else {
    // Ya hay backup: usar el original para re-comprimir fresh
    sourceBuffer = fs.readFileSync(backupPath);
  }

  const originalSize = sourceBuffer.length;

  try {
    // Trabajar siempre desde buffer (evita file locking de Sharp en Windows)
    const meta = await sharp(sourceBuffer, { limitInputPixels: false }).metadata();

    let pipeline = sharp(sourceBuffer, { limitInputPixels: false });

    if (cfg.maxWidth && meta.width && meta.width > cfg.maxWidth) {
      pipeline = pipeline.resize(cfg.maxWidth, null, { withoutEnlargement: true });
    }

    if (cfg.type === 'jpeg') {
      pipeline = pipeline.jpeg({ quality: cfg.quality, mozjpeg: true });
    } else if (cfg.type === 'png') {
      pipeline = pipeline.png({ quality: cfg.quality, compressionLevel: 9 });
    } else if (cfg.type === 'webp') {
      pipeline = pipeline.webp({ quality: cfg.quality, effort: 6 });
    }

    const outBuffer = await pipeline.toBuffer();
    const newSize = outBuffer.length;

    if (newSize < originalSize) {
      fs.writeFileSync(filePath, outBuffer);
      const saved = ((1 - newSize / originalSize) * 100).toFixed(1);
      console.log(`✅ ${displayName.padEnd(32)} ${fmt(originalSize).padStart(10)} → ${fmt(newSize).padStart(9)}  (-${saved}%)`);
      await sleep(50);
      return { before: originalSize, after: newSize };
    } else {
      // Ya estaba optimizada — restaurar original
      fs.writeFileSync(filePath, sourceBuffer);
      console.log(`⏭️  ${displayName.padEnd(32)} ${fmt(originalSize).padStart(10)}   (ya optimizada, se mantiene)`);
      await sleep(50);
      return { before: originalSize, after: originalSize };
    }
  } catch (err) {
    console.error(`❌ Error: ${displayName}: ${err.message}`);
    return { before: originalSize, after: originalSize };
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  console.log(`\n📁 Backups en: public/_originals/\n`);

  // Recopilar todos los archivos: root + subdirectorios
  const allFiles = [];

  // Root
  const rootFiles = getFiles(PUBLIC_DIR);
  for (const f of rootFiles) {
    allFiles.push({ file: f, backupDir: BACKUP_DIR, subdir: null });
  }

  // Subdirectorios de tours
  for (const sub of TOUR_SUBDIRS) {
    const subDir = path.join(PUBLIC_DIR, sub);
    if (!fs.existsSync(subDir)) continue;

    const subBackup = path.join(BACKUP_DIR, sub);
    if (!fs.existsSync(subBackup)) {
      fs.mkdirSync(subBackup, { recursive: true });
    }

    const subFiles = getFiles(subDir);
    for (const f of subFiles) {
      allFiles.push({ file: f, backupDir: subBackup, subdir: sub });
    }
  }

  console.log(`🖼️  Procesando ${allFiles.length} imagen(es)...\n`);
  console.log('─'.repeat(72));

  let totalBefore = 0;
  let totalAfter = 0;

  for (const { file, backupDir, subdir } of allFiles) {
    const result = await processFile(file, backupDir, subdir);
    totalBefore += result.before;
    totalAfter += result.after;
  }

  const saved = totalBefore - totalAfter;
  const pct = totalBefore > 0 ? ((saved / totalBefore) * 100).toFixed(1) : '0.0';

  console.log('\n' + '─'.repeat(72));
  console.log(`\n🎉 ¡Listo!`);
  console.log(`   📦 Antes:    ${fmt(totalBefore)}`);
  console.log(`   📦 Después:  ${fmt(totalAfter)}`);
  console.log(`   💾 Ahorrado: ${fmt(saved)}  (-${pct}%)\n`);
  console.log(`   Los originales están en public/_originals/ por si necesitas revertir.\n`);
}

main().catch(err => { console.error(err); process.exit(1); });
