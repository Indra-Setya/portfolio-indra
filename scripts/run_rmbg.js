import { AutoModel, AutoProcessor, RawImage } from '@xenova/transformers';
import path from 'path';
import sharp from 'sharp';

async function main() {
  console.log('Loading briaai/RMBG-1.4 model...');
  const model_id = 'briaai/RMBG-1.4';
  const model = await AutoModel.from_pretrained(model_id, {
    config: { model_type: 'custom' },
  });

  const processor = await AutoProcessor.from_pretrained(model_id, {
    config: {
      do_normalize: true,
      do_pad: false,
      do_rescale: true,
      do_resize: true,
      image_mean: [0.5, 0.5, 0.5],
      feature_extractor_type: "ImageFeatureExtractor",
      image_std: [1, 1, 1],
      resample: 2,
      rescale_factor: 0.00392156862745098,
      size: { width: 1024, height: 1024 },
    }
  });

  console.log('Model and processor loaded! Processing image...');

  const inputPath = '/home/indrasetyaariirawan/.gemini/antigravity/brain/89b0024b-dfe8-4374-a9b4-c351890f3bae/.user_uploaded/media_1794243653558_bad6d6c2.jpg';
  const image = await RawImage.read(inputPath);

  const { pixel_values } = await processor(image);
  const { output } = await model({ input: pixel_values });

  const mask = await RawImage.fromTensor(output[0].mul(255).to('uint8')).resize(image.width, image.height);

  console.log('Mask generated! Applying alpha mask to original image...');

  // Combine original image with mask to create transparent PNG
  const imageBuffer = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const maskBuffer = Buffer.from(mask.data);

  const { width, height, channels } = imageBuffer.info;
  const rgbaBuffer = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    rgbaBuffer[i * 4] = imageBuffer.data[i * channels];
    rgbaBuffer[i * 4 + 1] = imageBuffer.data[i * channels + 1];
    rgbaBuffer[i * 4 + 2] = imageBuffer.data[i * channels + 2];
    // Alpha channel from mask
    rgbaBuffer[i * 4 + 3] = maskBuffer[i];
  }

  const outputPath = '/media/indrasetyaariirawan/Random/portfolio-indra/public/IMG/Profile.png';
  await sharp(rgbaBuffer, { raw: { width, height, channels: 4 } })
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(outputPath);

  // Also save original full photo to public/IMG/
  const fullGraduationPath = '/media/indrasetyaariirawan/Random/portfolio-indra/public/IMG/indra_graduation.jpg';
  await sharp(inputPath).jpeg({ quality: 95 }).toFile(fullGraduationPath);

  console.log('Saved transparent cutout to', outputPath);
  console.log('Saved full photo to', fullGraduationPath);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
