"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { X, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { callGroqAI } from '@/lib/groq';

interface SpinozaContextType {
    explainConcept: (title: string, context: string) => Promise<void>;
}

const SpinozaContext = createContext<SpinozaContextType | undefined>(undefined);

export const useSpinoza = () => {
    const context = useContext(SpinozaContext);
    if (!context) {
        throw new Error("useSpinoza must be used within a SpinozaProvider");
    }
    return context;
};

export const SpinozaProvider = ({ children }: { children: ReactNode }) => {
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [aiResponse, setAiResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const explainConcept = async (title: string, context: string) => {
        setSelectedTopic(title);
        setAiResponse("");
        setIsLoading(true);

        const systemPrompt = "You are an expert on Baruch Spinoza's Ethics. Explain concepts clearly, concisely, and relate them to modern life. Use a calm, rational tone.";
        const userPrompt = `Explain the concept of "${title}" specifically in the context of "${context}" from Spinoza's Ethics.
1. Summarize the core philosophical argument.
2. Give a concrete, modern-day example of this concept in action.
Keep it under 150 words.`;

        try {
            const text = await callGroqAI(userPrompt, systemPrompt);
            setAiResponse(text);
        } catch (error) {
            console.error(error);
            setAiResponse("Error: Could not connect to the infinite intellect (API).");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SpinozaContext.Provider value={{ explainConcept }}>
            {children}

            {selectedTopic && (
                <div className="fixed top-0 right-0 w-80 h-full bg-[var(--surface)] shadow-2xl border-l border-[var(--border)] p-6 overflow-y-auto z-[100] animate-in slide-in-from-right duration-300">
                    <button onClick={() => setSelectedTopic(null)} className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                        <X size={20} />
                    </button>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{selectedTopic}</h3>
                    <div className="h-1 w-20 bg-[var(--accent)] mb-6 rounded-full"></div>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-10">
                            <Loader2 size={32} className="animate-spin text-[var(--accent)] mb-3" />
                            <span className="text-sm font-medium text-[var(--text-muted)]">Asking Spinoza...</span>
                        </div>
                    ) : (
                        <div className="prose prose-sm prose-slate max-w-none text-[var(--text-primary)]">
                            <ReactMarkdown>{aiResponse}</ReactMarkdown>
                        </div>
                    )}
                </div>
            )}
        </SpinozaContext.Provider>
    );
};
