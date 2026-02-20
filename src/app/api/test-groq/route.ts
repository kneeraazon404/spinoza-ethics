import { NextResponse } from 'next/server';

export async function GET() {
    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
        return NextResponse.json({ 
            error: 'GROQ_API_KEY not set',
            hasKey: false
        }, { status: 400 });
    }
    
    // Test the API key with a simple request
    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: 'You are a test assistant.' },
                    { role: 'user', content: 'Say hello' }
                ],
                stream: false
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            return NextResponse.json({
                error: 'API request failed',
                details: data,
                hasKey: true,
                keyPrefix: apiKey.substring(0, 8) + '...'
            }, { status: response.status });
        }
        
        return NextResponse.json({
            success: true,
            hasKey: true,
            keyPrefix: apiKey.substring(0, 8) + '...',
            response: data.choices?.[0]?.message?.content
        });
        
    } catch (error) {
        return NextResponse.json({
            error: 'Request failed',
            details: error instanceof Error ? error.message : 'Unknown error',
            hasKey: true
        }, { status: 500 });
    }
}
