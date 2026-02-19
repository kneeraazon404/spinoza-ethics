export interface PuterAIOptions {
    model?: string;
    stream?: boolean;
}

export interface PuterResponse {
    message?: {
        content?: string;
        role?: string;
    };
    text?: string;
    result?: {
        message?: {
            content?: string;
        };
    };
}

export interface WindowPuter {
    ai: {
        chat: (prompt: string, options?: PuterAIOptions) => Promise<unknown>;
    };
}

export const callPuterAI = async (prompt: string, model: string = 'gemini-2.0-flash'): Promise<string> => {
    const puter = (window as Window & { puter?: WindowPuter }).puter;
    
    if (!puter?.ai) {
        throw new Error('Puter not loaded');
    }

    const response = await puter.ai.chat(prompt, {
        model,
        stream: false
    });

    const res = response as PuterResponse;
    
    if (res?.message?.content) {
        return res.message.content;
    }
    if (res?.result?.message?.content) {
        return res.result.message.content;
    }
    if (res?.text) {
        return res.text;
    }
    if (typeof response === 'string') {
        return response;
    }
    
    return "I could not contemplate that clearly.";
};
