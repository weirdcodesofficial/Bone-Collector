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

      // Tailor anatomical guidance to the specific breed
      const breedLower = (breed || '').toLowerCase();
      let breedTraits = 'athletic build, distinct 4 legs, breed-appropriate ears and tail, rich coat colors';
      
      if (breedLower.includes('corgi')) {
        breedTraits = 'iconic ultra-short stubby legs, elongated body, big upright pointed foxy ears, white chest blaze and paws, fox-colored coat';
      } else if (breedLower.includes('dachshund')) {
        breedTraits = 'ultra-long slender sausage body, very short legs, long velvety droopy ears, long tapering snout, sleek tan coat';
      } else if (breedLower.includes('poodle')) {
        breedTraits = 'elegant fluffy puffy pom-pom head topknot, curly coat puffs on paws, slender graceful legs, puffy pom-pom tail, stylish build';
      } else if (breedLower.includes('pug')) {
        breedTraits = 'chubby round stocky body, wrinkled black face mask, button fold ears, tight curly spiral piggy tail, short sturdy legs';
      } else if (breedLower.includes('french') || breedLower.includes('bull')) {
        breedTraits = 'compact muscular stocky body, wide round erect bat-ears, flat wrinkled snout, tiny nub tail, sturdy chest';
      } else if (breedLower.includes('dalmatian')) {
        breedTraits = 'clean pure white sleek athletic body covered with distinct scattered crisp black spots, floppy spotted ears, sleek tail';
      } else if (breedLower.includes('husky')) {
        breedTraits = 'wolf-like silvery slate & white coat, iconic husky face mask, piercing eyes, bushy curved tail, athletic arctic runner build';
      } else if (breedLower.includes('shiba')) {
        breedTraits = 'fox-like golden-orange coat with white urajiro cheeks & belly, triangular prick ears, tightly curled tail over back';
      } else if (breedLower.includes('samoyed')) {
        breedTraits = 'ultra-fluffy cloud-like pure white double coat, smiling black mouth, dark eyes and nose, plumed tail arching over back';
      } else if (breedLower.includes('chihuahua')) {
        breedTraits = 'tiny delicate pocket-sized body, oversized triangular bat ears, giant sparkling round eyes, slender slender legs, perky tail';
      } else if (breedLower.includes('basset')) {
        breedTraits = 'extra-long droopy velvety ears reaching down, low-slung long body, tricolor hound coat, loose skin wrinkles, droopy eyes';
      } else if (breedLower.includes('boxer')) {
        breedTraits = 'muscular deep-chested athletic build, square dark muzzle with jowls, rich fawn-red coat, white chest splash, alert stance';
      } else if (breedLower.includes('doberman')) {
        breedTraits = 'sleek aerodynamic midnight black/indigo body, tall erect pointed ears, rich rust markings on muzzle and legs, noble stance';
      } else if (breedLower.includes('rottweiler')) {
        breedTraits = 'stocky powerful black muscular body, rich mahogany/rust markings above eyes, muzzle, and chest, broad head';
      } else if (breedLower.includes('schnauzer')) {
        breedTraits = 'pepper-gray coat with distinguished bushy white beard/mustache, bushy eyebrows, folded ears, square sturdy build';
      } else if (breedLower.includes('chow')) {
        breedTraits = 'huge puffy lion-like mane around neck, rounded teddy-bear ears, deep orange-brown plush coat, fluffy curled tail';
      } else if (breedLower.includes('maltese')) {
        breedTraits = 'tiny pure white silky fluffy coat, cute pink topknot bow in hair, button black nose and dark eyes, dainty paws';
      } else if (breedLower.includes('collie')) {
        breedTraits = 'agile athletic herding build, classic black and white tuxedo coat with full white collar and chest blaze, semi-prick ears';
      } else if (breedLower.includes('beagle')) {
        breedTraits = 'classic tricolor black saddle, tan head/flanks, white chest and white-tipped upright hound tail, long droopy hound ears';
      } else if (breedLower.includes('great dane') || breedLower.includes('dane')) {
        breedTraits = 'giant statuesque tall build, long straight legs, deep athletic chest, noble slate coat, long tapering tail';
      } else if (breedLower.includes('shepherd')) {
        breedTraits = 'noble athletic guard stance, black saddle back with warm tan belly and legs, tall pointed upright ears with pink inner ear, saber tail';
      } else if (breedLower.includes('golden') || breedLower.includes('labrador') || breedLower.includes('retriever')) {
        breedTraits = 'warm golden/chocolate silky coat, friendly rounded floppy ears, cheerful feathered tail, strong athletic retriever build';
      }

      const prompt = `Generate a complete, unique, high-quality, scalable vector SVG illustration of a full-body ${breed || 'Dog'} named "${name || 'Champion'}" (${title || 'Bone Scout'}) in an athletic side-profile standing pose facing right.
Unique Breed Requirements:
- Breed: ${breed || 'Dog'} (Anatomical Traits: ${breedTraits})
- Color Palette: Accent color ${accentColor || '#F59E0B'} with realistic, high-contrast breed coat colors and shading.
- Output ONLY the raw <svg>...</svg> element. Do not wrap in markdown codeblocks. No commentary.
- The SVG MUST have viewBox="0 0 200 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg".
- Structure & Components:
   1. DO NOT generate any ground shadow, floor patch, or shadow ellipse under the paws. The character must be on a clean transparent background without shadows.
   2. 4 distinct articulated legs (2 near legs with full detail and 2 far legs in a darker shaded tone).
   3. Breed-accurate body silhouette, head shape, ears (pointed, bat, floppy, droopy, or puff depending on breed), and tail.
   4. A stylish champion collar or saddle vest in ${accentColor || '#EF4444'} with a shiny golden achievement trophy medal stamped with "★${achievementLevel || 1}".
   5. DO NOT include any blue bar, handle, or stick on the body.
   6. Clean vector paths, modern linear gradients (<defs><linearGradient>...), and rich contrast.
- Ensure valid XML syntax and closed tags so it renders cleanly in React.`;

      // Cascade through models in case of high demand spikes (503) or rate limits
      const candidateModels = ['gemini-3.6-flash', 'gemini-2.0-flash', 'gemini-3.7-flash'];
      let responseText = '';
      let lastError: any = null;

      for (const modelName of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
          });
          if (response && response.text) {
            responseText = response.text;
            break;
          }
        } catch (err: any) {
          lastError = err;
          // Brief pause before trying next candidate
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
      }

      let svgText = responseText.trim();
      // Clean any markdown formatting if present
      svgText = svgText.replace(/```xml\s*/gi, '').replace(/```svg\s*/gi, '').replace(/```\s*/gi, '').trim();

      const svgMatch = svgText.match(/<svg[\s\S]*<\/svg>/i);
      if (svgMatch) {
        svgText = svgMatch[0];
      }

      // Strip any ground shadow ellipses if generated
      svgText = svgText
        .replace(/<ellipse[^>]*fill=["']#14532D["'][^>]*\/>/gi, '')
        .replace(/<ellipse[^>]*opacity=["']0\.2[0-9]*["'][^>]*\/>/gi, '');

      if (!svgText.startsWith('<svg')) {
        return res.status(200).json({
          svg: null,
          fallback: true,
          message: lastError?.message || 'Model capacity temporarily busy, using local SVG vector.',
          breed,
          name,
          achievementLevel,
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
      return res.status(200).json({
        svg: null,
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
