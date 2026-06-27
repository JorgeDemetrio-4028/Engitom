const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, '..', 'images');

async function optimize() {
  try {
    const files = await fs.readdir(imagesDir);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
      const name = path.basename(file, ext);
      const input = path.join(imagesDir, file);

      // Large JPG (max 1600px)
      await sharp(input)
        .resize({ width: 1600, withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toFile(path.join(imagesDir, `${name}-1600.jpg`));

      // Medium JPG (max 800px)
      await sharp(input)
        .resize({ width: 800, withoutEnlargement: true })
        .jpeg({ quality: 70 })
        .toFile(path.join(imagesDir, `${name}-800.jpg`));

      // WebP for modern browsers
      await sharp(input)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(path.join(imagesDir, `${name}.webp`));

      console.log(`Optimized: ${file}`);
    }
    console.log('All images processed.');
  } catch (err) {
    console.error('Error optimizing images:', err);
    process.exit(1);
  }
}

optimize();
