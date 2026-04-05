import { GoogleGenAI } from "@google/genai";
import * as fs from 'fs';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateAndSave(prompt: string, filename: string) {
  console.log(`Generating ${filename}...`);
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: `Minimalist artistic representation of ${prompt}, muted tones, grayscale, spiritual atmosphere, dramatic lighting, high quality digital art, charcoal sketch style, dark background.` }]
    }
  });
  
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      const buffer = Buffer.from(part.inlineData.data, 'base64');
      fs.writeFileSync(`public/${filename}`, buffer);
      console.log(`Saved ${filename}`);
      return;
    }
  }
}

async function main() {
  await generateAndSave('Lord Shiva meditating in the Himalayas, divine minimalist art', 'shiva.png');
  await generateAndSave('Lord Vishnu reclining on Sheshanaga, divine minimalist art', 'vishnu.png');
  await generateAndSave('Hanuman ji in a powerful meditative pose, minimalist divine art', 'hanuman.png');
}

main();
