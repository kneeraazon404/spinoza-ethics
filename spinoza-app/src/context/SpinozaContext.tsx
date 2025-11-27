"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { X, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

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

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
    const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";

    const callGemini = async (prompt: string, systemInstruction: string) => {
        setIsLoading(true);
        setAiResponse("");

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        systemInstruction: { parts: [{ text: systemInstruction }] },
                    }),
                }
            );

            if (!response.ok) throw new Error("API call failed");

            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "I could not contemplate that clearly.";
            return text;
        } catch (error) {
            console.error(error);
            return "Error: Could not connect to the infinite intellect (API).";
        } finally {
            setIsLoading(false);
        }
    };

    const explainConcept = async (title: string, context: string) => {
        setSelectedTopic(title);
        setAiResponse("");

        const systemPrompt = "You are an expert on Baruch Spinoza's Ethics. Explain concepts clearly, concisely, and relate them to modern life. Use a calm, rational tone.";
        const userPrompt = `Explain the concept of "${title}" specifically in the context of "${context}" from Spinoza's Ethics. 
    1. Summarize the core philosophical argument.
    2. Give a concrete, modern-day example of this concept in action.
    Keep it under 150 words.`;

        const text = await callGemini(userPrompt, systemPrompt);
        setAiResponse(text);
    };

    return (
        <SpinozaContext.Provider value={{ explainConcept }}>
            {children}

            {/* --- INFO PANEL FOR SELECTED NODE --- */}
            {selectedTopic && (
                <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl border-l border-slate-200 p-6 overflow-y-auto z-[100] animate-in slide-in-from-right duration-300">
                    <button onClick={() => setSelectedTopic(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{selectedTopic}</h3>
                    <div className="h-1 w-20 bg-indigo-500 mb-6 rounded-full"></div>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-10 text-indigo-500">
                            <Loader2 size={32} className="animate-spin mb-2" />
                            <span className="text-sm font-medium">Consulting the Infinite Intellect...</span>
                        </div>
                    ) : (
                        <div className="prose prose-sm prose-slate text-slate-900 max-w-none">
                            <ReactMarkdown>{aiResponse}</ReactMarkdown>
                        </div>
                    )}
                </div>
            )}
        </SpinozaContext.Provider>
    );
};
