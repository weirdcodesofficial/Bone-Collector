import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Server-side AI SVG Vector Avatar Generation route for full body dog avatars
  app.post('/api/generate-dog-svg', async (req, res) => {
    try {
      const { breed, name, title, achievementLevel, accentColor = '#F59E0B' } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(503).json({
          error: 'GEMINI_API_KEY is not configured in environment secrets.',
          fallback: true,
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const prompt = `Generate a complete, beautiful, scalable vector SVG illustration of an adorable full-body cartoon ${breed || 'Golden Retriever'} dog named "${name || 'Champion'}" (${title || 'Bone Scout'}) celebrating trophy achievement #${achievementLevel || 1}.
Requirements:
1. Output ONLY the raw <svg>...</svg> element. Do not wrap in markdown codeblocks. Do not include any explanations or commentary.
2. The SVG MUST have viewBox="0 0 200 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg".
3. Include full body: head, floppy/perky ears, cheerful shiny expressive cartoon eyes with highlights, nose, muzzle with tongue, front legs with paws, hind body and legs, wagging tail with motion lines, and a collar with a shiny golden trophy medal stamped with "#${achievementLevel || 1}".
4. Use rich modern gradient definitions (<defs><linearGradient>...), clean rounded paths/polygons/circles, and matching brand accent color "${accentColor}".
5. Ensure valid XML syntax and closed tags so it renders cleanly in React.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      let svgText = response.text || '';
      // Clean any markdown formatting if present
      svgText = svgText.replace(/```xml\s*/gi, '').replace(/```svg\s*/gi, '').replace(/```\s*/gi, '').trim();

      const svgMatch = svgText.match(/<svg[\s\S]*<\/svg>/i);
      if (svgMatch) {
        svgText = svgMatch[0];
      }

      if (!svgText.startsWith('<svg')) {
        return res.status(500).json({
          error: 'Model did not return valid SVG code.',
          fallback: true,
        });
      }

      return res.json({
        svg: svgText,
        breed,
        name,
        achievementLevel,
      });
    } catch (err: any) {
      console.error('Error generating dog achievement SVG:', err);
      return res.status(500).json({
        error: err?.message || 'Failed to generate dog SVG',
        fallback: true,
      });
    }
  });

  // Server-side AI Image Generation route using Imagen / Gemini Flash Image for dog achievements
  app.post('/api/generate-dog-image', async (req, res) => {
    try {
      const { breed, name, title, achievementLevel, style = 'hyper-cute-3d' } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(503).json({
          error: 'GEMINI_API_KEY is not configured in environment secrets.',
          fallback: true,
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      // Construct high quality prompt based on breed & achievement for Imagen
      const prompt = `A full body, highly detailed, vibrant 3D Pixar-style digital illustration of an adorable ${breed || 'Golden Retriever'} dog named "${name || 'Champion'}" (${title || 'Bone Scout'}). The dog is celebrating achievement #${achievementLevel || 1}, joyfully holding a golden bone or wearing a tiny golden champion trophy medal, cheerful dynamic pose with floppy ears and sparkling happy eyes, lush sunny green grass park background, cinematic lighting, sharp focus, 8k resolution character design, cute and joyful puppy atmosphere.`;

      // Try Imagen 3 / gemini-3.1-flash-image
      let imageUrl: string | null = null;

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-image',
          contents: {
            parts: [{ text: prompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: '1:1',
              imageSize: '1K',
            },
          },
        });

        if (response.candidates && response.candidates[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData && part.inlineData.data) {
              const mime = part.inlineData.mimeType || 'image/png';
              imageUrl = `data:${mime};base64,${part.inlineData.data}`;
              break;
            }
          }
        }
      } catch (genErr) {
        console.warn('Primary image generation call failed, attempting fallback model:', genErr);
      }

      if (!imageUrl) {
        return res.status(500).json({
          error: 'No image data returned from generation model.',
          fallback: true,
        });
      }

      return res.json({
        imageUrl,
        prompt,
        breed,
        name,
        achievementLevel,
      });
    } catch (err: any) {
      console.error('Error generating dog achievement image:', err);
      return res.status(500).json({
        error: err?.message || 'Failed to generate dog image',
        fallback: true,
      });
    }
  });

  // Vite middleware for development vs static files for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bone Collector server running on http://localhost:${PORT}`);
  });
}

startServer();
