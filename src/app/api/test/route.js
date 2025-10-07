import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export const runtime = 'edge'

const openai = createOpenAI({
    baseURL: 'https://api.openai.com/v1',
    apiKey: process.env.AI_TOKEN
})

export async function GET() {
    try{
        const { text } = await generateText({
            model: openai('gpt-4o-mini'),
            reasoning: { effort: 'low' },
            system: 'You are a helpful AI assistant named "Ella".',
            prompt: 'Give 2 sentence introduction of yourself'
        });

        return NextResponse.json({
            message: text
        });
    }catch(error){
        console.error('Error in test route', error)
        return NextResponse.json({
            error: error.message || "An error occured!!"
        },{
            status:500
        });
    }
}