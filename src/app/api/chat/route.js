import { createOpenAI } from "@ai-sdk/openai";
import { streamText, smoothStream } from "ai";

export const maxDuration = 30;

export async function POST(req){
    const { messages } = await req.json()

    const openai = createOpenAI({
        baseURL: 'https://api.openai.com/v1',
        apiKey: process.env.AI_TOKEN
    })
    
    const result = streamText({
        model: openai('gpt-4o-mini'),
        reasoning: { effort: 'low' },
        system: 'You are a helpful AI assistant named "Lexi".',
        messages,
        experimental_transform: smoothStream()
    })

    return result.toDataStreamResponse()
}