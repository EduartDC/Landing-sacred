/**
 * compress-images.mjs - Compresión inteligente de imágenes
 * 
 * Estrategia:
 * - Imágenes fotográficas (hero, fondos): resize a 1920px + quality 82
 * - Imágenes de galería/detalle: resize a 1280px + quality 85
 * - Logos/iconos PNG: mantener dimensiones + quality 90 (sin pérdida)
 * - Todos los originals se guardan en public/_originals/
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const BACKUP_DIR = path.join(PUBLIC_DIR, '_originals');

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

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    console.log(`\n📁 Backups en: public/_originals/\n`);
  }

  const files = getFiles(PUBLIC_DIR);
  console.log(`\n🖼️  Procesando ${files.length} imagen(es)...\n`);
  console.log('─'.repeat(72));

  let totalBefore = 0;
  let totalAfter = 0;

  for (const { name, path: filePath } of files) {
    const ext = path.extname(name).toLowerCase();
    const cfg = SPECIFIC[name] || {
      maxWidth: 1920,
      quality: 85,
      type: ext === '.png' ? 'png' : 'jpeg',
    };

    const originalSize = fs.statSync(filePath).size;
    totalBefore += originalSize;

    // Backup (solo una vez)
    const backupPath = path.join(BACKUP_DIR, name);
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(filePath, backupPath);
    } else {
      // Restaurar desde backup para re-comprimir fresh
      fs.copyFileSync(backupPath, filePath);
    }

    try {
      let pipeline = sharp(filePath, { limitInputPixels: false });

      // Obtener metadata para decidir si resize es necesario
      const meta = await sharp(filePath, { limitInputPixels: false }).metadata();

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

      const buffer = await pipeline.toBuffer();
      const newSize = buffer.length;

      // Determinar nombre de salida (si cambió extensión, renombrar)
      let outPath = filePath;
      if (cfg.type === 'jpeg' && (ext === '.png')) {
        // Mantener el mismo nombre pero con contenido JPEG (los browsers no les importa la extensión)
        // Guardamos como JPEG dentro del mismo .png para no romper referencias en el código
        outPath = filePath;
      }

      if (newSize < originalSize) {
        fs.writeFileSync(outPath, buffer);
        const saved = ((1 - newSize / originalSize) * 100).toFixed(1);
        totalAfter += newSize;
        console.log(`✅ ${name.padEnd(28)} ${fmt(originalSize).padStart(10)} → ${fmt(newSize).padStart(9)}  (-${saved}%)`);
      } else {
        // Restaurar original si ya estaba bien comprimida
        fs.copyFileSync(backupPath, filePath);
        totalAfter += originalSize;
        console.log(`⏭️  ${name.padEnd(28)} ${fmt(originalSize).padStart(10)}   (ya optimizada, se mantiene)`);
      }
    } catch (err) {
      totalAfter += originalSize;
      console.error(`❌ Error: ${name}: ${err.message}`);
    }
  }

  const saved = totalBefore - totalAfter;
  const pct = ((saved / totalBefore) * 100).toFixed(1);

  console.log('\n' + '─'.repeat(72));
  console.log(`\n🎉 ¡Listo!`);
  console.log(`   📦 Antes:    ${fmt(totalBefore)}`);
  console.log(`   📦 Después:  ${fmt(totalAfter)}`);
  console.log(`   💾 Ahorrado: ${fmt(saved)}  (-${pct}%)\n`);
  console.log(`   Los originales están en public/_originals/ por si necesitas revertir.\n`);
}

main().catch(err => { console.error(err); process.exit(1); });
