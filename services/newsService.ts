import { GoogleGenAI } from "@google/genai";
import { Article } from "../types";

// Initialize Gemini
// Note: In a real production app, you might proxy this through a backend to hide the key,
// but for this client-side demo per instructions, we use process.env.
const apiKey = process.env.API_KEY || '';
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateFullArticle = async (article: Article): Promise<string> => {
  if (!ai) {
    console.warn("API Key not found, returning mock content.");
    return `
    ## ${article.title}
    
    *(Simulated Content - API Key Missing)*

    **${article.category} | By ${article.author}**

    In a breaking development that has captured the attention of the ${article.category.toLowerCase()} world, ${article.title.toLowerCase()}. 
    
    ${article.summary}

    Experts suggest that this event could have far-reaching implications. "It's unprecedented," says one analyst. The community is buzzing with speculation about what this means for the future.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

    ### Key Takeaways
    * Significant impact on ${article.category}.
    * Global reaction has been mixed.
    * Future developments are expected soon.
    `;
  }

  try {
    const prompt = `
      You are a senior journalist for a top-tier news organization like CNN or BBC.
      Write a full, engaging news article based on this headline and summary.
      
      Headline: "${article.title}"
      Summary: "${article.summary}"
      Category: "${article.category}"
      Author: "${article.author}"

      The article should be approximately 400-600 words.
      Use Markdown formatting.
      Include a "Key Highlights" section at the top.
      Write in a professional, journalistic tone.
      Invent plausible quotes from fictional experts or officials to make it feel authentic.
      Do NOT include a title at the start (the UI handles that).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Error generating content.";
  } catch (error) {
    console.error("Error generating article:", error);
    return `
      **We are currently experiencing technical difficulties retrieving this story.**
      
      Please try again later.
      
      *Error details: ${error instanceof Error ? error.message : 'Unknown error'}*
    `;
  }
};
