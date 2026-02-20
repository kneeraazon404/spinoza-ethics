export interface GroqMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export interface GroqOptions {
    model?: string;
    stream?: boolean;
    temperature?: number;
}

export interface GroqResponse {
    id?: string;
    choices?: Array<{
        message?: {
            content?: string;
            role?: string;
        };
        finish_reason?: string;
    }>;
    error?: {
        message?: string;
        type?: string;
    };
}

const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || '';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const callGroqAI = async (
    prompt: string,
    systemPrompt: string = 'You are a helpful assistant.',
    model: string = 'llama-3.3-70b-versatile'
): Promise<string> => {
    const messages: GroqMessage[] = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
    ];

    try {
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model,
                messages,
                stream: false,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData?.error?.message || `API request failed with status ${response.status}`);
        }

        const data: GroqResponse = await response.json();

        if (data?.error) {
            throw new Error(data.error.message || 'Unknown API error');
        }

        const content = data?.choices?.[0]?.message?.content;

        if (!content) {
            throw new Error('No content in response');
        }

        return content;
    } catch (error) {
        console.error('Groq API error:', error);
        throw error;
    }
};
