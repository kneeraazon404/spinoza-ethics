export interface DeepSeekMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export interface DeepSeekOptions {
    model?: string;
    stream?: boolean;
}

export interface DeepSeekResponse {
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

const DEEPSEEK_API_KEY = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY || '';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

export const callDeepSeekAI = async (
    prompt: string,
    systemPrompt: string = 'You are a helpful assistant.',
    model: string = 'deepseek-chat'
): Promise<string> => {
    const messages: DeepSeekMessage[] = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
    ];

    try {
        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
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

        const data: DeepSeekResponse = await response.json();

        if (data?.error) {
            throw new Error(data.error.message || 'Unknown API error');
        }

        const content = data?.choices?.[0]?.message?.content;

        if (!content) {
            throw new Error('No content in response');
        }

        return content;
    } catch (error) {
        console.error('DeepSeek API error:', error);
        throw error;
    }
};
