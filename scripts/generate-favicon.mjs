/**
 * generate-favicon.mjs
 * Genera favicon.png, apple-touch-icon.png y favicon-32x32.png
 * desde el logo original de Sacred Tours
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC   = path.join(__dirname, '..', 'public');

// Buscar el logo original (preferir el backup sin comprimir)
const LOGO_ORIGINAL = path.join(PUBLIC, '_originals', 'LOGO SACRED.png');
const LOGO_FALLBACK = path.join(PUBLIC, 'LOGO SACRED.png');
const LOGO = fs.existsSync(LOGO_ORIGINAL) ? LOGO_ORIGINAL : LOGO_FALLBACK;

console.log(`\n🎨 Generando favicons desde: ${path.basename(LOGO)}\n`);

const sizes = [
  { name: 'favicon-16x16.png',   size: 16  },
  { name: 'favicon-32x32.png',   size: 32  },
  { name: 'favicon-96x96.png',   size: 96  },
  { name: 'apple-touch-icon.png',size: 180 },
  { name: 'favicon-192x192.png', size: 192 },
];

for (const { name, size } of sizes) {
  const outPath = path.join(PUBLIC, name);
  await sharp(LOGO, { limitInputPixels: false })
    .resize(size, size, {
      fit: 'contain',           // mantiene proporción sin recortar
      background: { r: 0, g: 0, b: 0, alpha: 0 }, // fondo transparente
    })
    .png({ compressionLevel: 9 })
    .toFile(outPath);
  console.log(`  ✅ ${name.padEnd(24)} ${size}×${size}px`);
}

console.log('\n🎉 Favicons generados en /public/\n');
console.log('   Actualiza el index.html para referenciarlos (ya lo haré automáticamente).\n');
