
import { GoogleGenAI, Type } from '@google/genai';
import { Slide } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const slideSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: 'The main title of the slide. Should be concise.' },
        bullets: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: 'An array of 3 to 5 bullet points expanding on the title. Each bullet should be a short, impactful sentence.'
        },
        layoutDescription: {
            type: Type.STRING,
            description: 'A brief description of the visual layout and mood of the slide.'
        },
        shapes: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    type: { type: Type.STRING, enum: ['rectangle', 'circle', 'line'], description: 'The type of shape.' },
                    color: { type: Type.STRING, description: "A valid Tailwind CSS background color class, e.g., 'bg-blue-500' or 'bg-sky-200/50' for opacity." },
                    size: { type: Type.STRING, description: "A valid Tailwind CSS width and height class, e.g., 'w-24 h-24' or 'w-full h-1'." },
                    position: { type: Type.STRING, description: "Valid Tailwind CSS absolute positioning classes, e.g., 'top-4 right-4' or 'bottom-0 left-1/2 -translate-x-1/2'." },
                    rotation: { type: Type.STRING, nullable: true, description: "Optional Tailwind CSS rotation class, e.g., 'rotate-45' or '-rotate-12'." },
                    zIndex: { type: Type.STRING, nullable: true, description: "Optional Tailwind CSS z-index class, e.g., 'z-0' or 'z-10'."}
                },
                required: ['type', 'color', 'size', 'position']
            },
            description: 'An array of 2 to 4 decorative shapes. These shapes are for visual appeal and should not obscure text.'
        }
    },
    required: ['title', 'bullets', 'layoutDescription', 'shapes']
};


export const generatePresentation = async (topic: string): Promise<Omit<Slide, 'id'>[]> => {
    const prompt = `You are a world-class presentation designer and content creator. Create a detailed, 8-slide presentation on the topic: "${topic}". The presentation should have a logical flow, starting with a title slide, followed by an introduction, key points, and a conclusion.

For each of the 8 slides, generate the content and a creative layout.

Respond with a JSON object that strictly follows this schema: An array of 8 slide objects.
The shape properties (color, size, position, rotation, zIndex) MUST be valid Tailwind CSS classes. Use a variety of colors from the Tailwind palette (e.g., 'bg-sky-200', 'bg-indigo-500/50'). Position shapes using absolute positioning classes like 'top-0', 'left-0', 'bottom-10', 'right-16'. Use zIndex 'z-0' to place shapes behind content. Ensure shapes are decorative and don't overlap with text areas.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: slideSchema
                }
            }
        });
        const jsonText = response.text.trim();
        const slides = JSON.parse(jsonText) as Omit<Slide, 'id'>[];
        if (!Array.isArray(slides) || slides.length < 8) {
            throw new Error("AI returned an invalid format. Expected an array of at least 8 slides.");
        }
        return slides;
    } catch (error) {
        console.error("Error generating presentation:", error);
        throw new Error("Failed to generate presentation from AI.");
    }
};

export const redesignSlideLayout = async (slide: Slide): Promise<Pick<Slide, 'layoutDescription' | 'shapes'>> => {
    const slideJson = JSON.stringify({ title: slide.title, bullets: slide.bullets });
    const prompt = `You are a presentation design expert. Here is the JSON for a single presentation slide's content: ${slideJson}.

Do not change the 'title' or 'bullets'.

Your task is to generate a new, creative 'layoutDescription' and a new array of 'shapes' to give this slide a fresh visual design. The shapes should be decorative, use varied Tailwind CSS classes, and not obscure the text content areas. Use zIndex 'z-0' to place shapes behind content.

Respond with a single JSON object that strictly contains 'layoutDescription' and 'shapes' properties, following the previously defined schema.`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        layoutDescription: slideSchema.properties.layoutDescription,
                        shapes: slideSchema.properties.shapes
                    },
                    required: ['layoutDescription', 'shapes']
                }
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error redesigning slide:", error);
        throw new Error("Failed to redesign slide from AI.");
    }
};
