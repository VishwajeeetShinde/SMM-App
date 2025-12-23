
import { GoogleGenAI, Type } from "@google/genai";
import { BrandDetails, MarketAnalysis, GeneratedPost, PostType } from "../types";

const API_KEY = process.env.API_KEY || "";

export const getGeminiClient = () => {
  return new GoogleGenAI({ apiKey: API_KEY });
};

export async function performMarketResearch(brand: BrandDetails): Promise<MarketAnalysis> {
  const ai = getGeminiClient();
  const prompt = `Conduct deep market research for a brand named "${brand.name}" in the "${brand.industry}" industry. 
  Target Audience: ${brand.targetAudience}. 
  Tone: ${brand.tone}. 
  Unique Value Proposition: ${brand.uniqueValueProp}.
  
  Please identify:
  1. Main competitors and what is working for them.
  2. Market opportunities for growth.
  3. How to improve brand positioning.
  4. 4 core content pillars for their social media strategy.
  
  Format the output strictly as JSON.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          competitorsAnalysis: { type: Type.STRING },
          marketOpportunities: { type: Type.STRING },
          brandPositioningAdvice: { type: Type.STRING },
          contentPillars: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["title", "description"]
            }
          }
        },
        required: ["competitorsAnalysis", "marketOpportunities", "brandPositioningAdvice", "contentPillars"]
      }
    }
  });

  const analysis = JSON.parse(response.text || "{}");
  return {
    ...analysis,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
}

export async function generateContentOptions(brand: BrandDetails, research: MarketAnalysis, postType: PostType): Promise<GeneratedPost[]> {
  const ai = getGeminiClient();
  const prompt = `Based on the brand "${brand.name}" and the content pillars ${JSON.stringify(research.contentPillars)}, 
  generate 6 distinct ${postType} content options for social media. 
  Each option must include:
  1. A catchy Title.
  2. An engaging Caption.
  3. 10 relevant Hashtags.
  4. 5 optimized Keywords.
  5. A detailed AI Image Generation Prompt that captures the essence of the post.
  
  The content should focus on ${research.marketOpportunities} and aim to improve positioning as per: ${research.brandPositioningAdvice}.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            caption: { type: Type.STRING },
            hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
            keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            imagePrompt: { type: Type.STRING }
          },
          required: ["title", "caption", "hashtags", "keywords", "imagePrompt"]
        }
      }
    }
  });

  const posts = JSON.parse(response.text || "[]");
  return posts.map((p: any, index: number) => ({
    ...p,
    id: `post-${index}-${Date.now()}`,
    type: postType,
    status: 'draft'
  }));
}

export async function generatePostImage(prompt: string): Promise<string> {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: { aspectRatio: "1:1" }
    }
  });

  let imageUrl = "";
  for (const part of response.candidates?.[0]?.content.parts || []) {
    if (part.inlineData) {
      imageUrl = `data:image/png;base64,${part.inlineData.data}`;
      break;
    }
  }
  return imageUrl;
}

export async function editPostImage(base64Image: string, editPrompt: string): Promise<string> {
  const ai = getGeminiClient();
  // Remove data:image/png;base64, prefix if present
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: base64Data, mimeType: 'image/png' } },
        { text: editPrompt }
      ]
    }
  });

  let imageUrl = "";
  for (const part of response.candidates?.[0]?.content.parts || []) {
    if (part.inlineData) {
      imageUrl = `data:image/png;base64,${part.inlineData.data}`;
      break;
    }
  }
  return imageUrl;
}
