import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const source = path.join(root, 'public', 'img', 'NovaMindGlobal - copia.jpg')
const outputBase = path.join(root, 'public', 'img', 'novamind-brand')

async function run() {
  await sharp(source)
    .resize({ width: 1024, withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true })
    .toFile(`${outputBase}.jpg`)

  await sharp(source)
    .resize({ width: 1024, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(`${outputBase}.webp`)

  await sharp(source)
    .resize({ width: 1024, withoutEnlargement: true })
    .avif({ quality: 62 })
    .toFile(`${outputBase}.avif`)

  console.log('Generated optimized variants: novamind-brand.jpg/.webp/.avif')
}

run().catch((error) => {
  console.error('Image variant generation failed:', error)
  process.exit(1)
})
