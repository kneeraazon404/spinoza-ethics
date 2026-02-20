const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const callGroqAI = async (
    prompt: string,
    systemPrompt: string = 'You are a helpful assistant.',
    model: string = 'llama-3.3-70b-versatile'
): Promise<string> => {
    if (!GROQ_API_KEY) {
        throw new Error('GROQ_API_KEY is not configured');
    }

    const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: prompt }
            ],
            temperature: 0.7
        })
    });

    const data = await response.json();

    if (!response.ok) {
        console.error('Groq API Error:', {
            status: response.status,
            statusText: response.statusText,
            error: data
        });
        throw new Error(data?.error?.message || `API request failed with status ${response.status}`);
    }

    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
        throw new Error('No content in response');
    }

    return content;
};
