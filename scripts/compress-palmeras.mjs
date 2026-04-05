/**
 * compress-palmeras.mjs
 * Script dedicado para comprimir el archivo palmeras.jpg (>30MB)
 * usando limitInputPixels: false para saltear el límite de Sharp
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const original = path.join(__dirname, '..', 'public', '_originals', 'palmeras.jpg');
const output   = path.join(__dirname, '..', 'public', 'palmeras.jpg');
const temp     = path.join(__dirname, '..', 'public', 'palmeras_temp.jpg');

const fmt = (b) => `${(b / 1048576).toFixed(2)} MB`;

const before = fs.statSync(original).size;
console.log(`\n🌴 Comprimiendo palmeras.jpg (${fmt(before)})...`);
console.log(`   Este archivo es muy grande, puede tardar 1-2 minutos...\n`);

sharp(original, { limitInputPixels: false })
  .resize(1920, null, { withoutEnlargement: true })   // máx 1920px ancho
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(temp)
  .then((info) => {
    const after = fs.statSync(temp).size;
    fs.renameSync(temp, output);
    const pct = ((1 - after / before) * 100).toFixed(1);
    console.log(`✅ palmeras.jpg`);
    console.log(`   Antes:    ${fmt(before)}`);
    console.log(`   Después:  ${fmt(after)}`);
    console.log(`   Ahorrado: ${fmt(before - after)}  (-${pct}%)\n`);
    console.log(`   Dimensiones finales: ${info.width}×${info.height}px\n`);
  })
  .catch((err) => {
    console.error('❌ Error:', err.message);
    // Limpiar temp si existe
    if (fs.existsSync(temp)) fs.unlinkSync(temp);
    process.exit(1);
  });
