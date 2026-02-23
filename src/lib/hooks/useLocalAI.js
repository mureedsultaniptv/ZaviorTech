// lib/hooks/useLocalAI.js
import { useState, useEffect } from 'react';

export function useLocalAI() {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [webGPUAvailable, setWebGPUAvailable] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadModel() {
      try {
        // Check for WebGPU only in browser
        if (typeof navigator !== 'undefined' && navigator.gpu) {
          setWebGPUAvailable(true);
        }

        // Dynamically import the library – this runs only on the client
        const { pipeline } = await import('@xenova/transformers');

        const generator = await pipeline(
          'text-generation',
          'Xenova/SmolLM-360M-Instruct',
          {
            quantized: true,
            device: webGPUAvailable ? 'webgpu' : 'cpu',
          }
        );

        if (isMounted) {
          setModel(generator);
          setLoading(false);
        }
      } catch (err) {
        console.error('Model load failed:', err);
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    loadModel();

    return () => {
      isMounted = false;
    };
  }, [webGPUAvailable]);

  const generateResponse = async (messages, services) => {
    if (!model) throw new Error('Model not loaded');

    // Build a detailed system prompt with your services
    const serviceList = services
      .map((s) => `- ${s.title}: ${s.description} (Features: ${s.features.join(', ')})`)
      .join('\n');

    const systemPrompt = `You are a helpful assistant for Zavior Tech. We offer the following services:
${serviceList}

Always guide customers toward our services. When someone asks about business promotion, explain why online presence matters and suggest our web development or AI automation services. Be friendly, concise, and professional.`;

    const conversation = messages.map((m) => `${m.role}: ${m.content}`).join('\n');
    const prompt = `${systemPrompt}\n\n${conversation}\nassistant:`;

    const result = await model(prompt, {
      max_new_tokens: 150,
      temperature: 0.7,
      do_sample: true,
    });

    return result[0].generated_text.replace(prompt, '').trim();
  };

  return { generateResponse, loading, error, webGPUAvailable };
}