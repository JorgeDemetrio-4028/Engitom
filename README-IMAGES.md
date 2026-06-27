Image optimization for the Engitom site

Steps to optimize your images locally:

1. Put the image you sent into the project `images` folder and name it `construcao-azul.jpg`.

2. Install dependencies (requires Node.js >= 14):

```bash
npm install
```

3. Run the optimizer:

```bash
npm run optimize-images
```

The script will create resized/optimized versions alongside the originals:
- `name-1600.jpg` — large JPEG
- `name-800.jpg` — medium JPEG
- `name.webp` — WebP modern format

You can then update `index.html` to prefer the WebP or the appropriate size for each layout.
