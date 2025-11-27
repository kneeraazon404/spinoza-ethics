"use client";

import React, { useState } from 'react';
import { Sparkles, X, BookOpen, Loader2, ArrowRight } from 'lucide-react';

const GeometricAdvisor = () => {
    const [showAdvisor, setShowAdvisor] = useState(false);
    const [userQuery, setUserQuery] = useState("");
    const [advisorResponse, setAdvisorResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // --- API CONSTANTS ---
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""; // Set by environment
    const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";

    // --- API HANDLER ---
    const callGemini = async (prompt: string, systemInstruction: string) => {
        setIsLoading(true);

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

    const handleAdvisorSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userQuery.trim()) return;

        setAdvisorResponse(null);
        setIsLoading(true);

        const systemPrompt = `You are Baruch Spinoza. You reply to personal problems NOT with generic advice, but by generating a specific 'Proposition', 'Demonstration', and 'Scholium' in the style of your book 'The Ethics'. 
    - Proposition: A concise statement of truth regarding the user's problem.
    - Demonstration: A logical proof derived from reason.
    - Scholium: A compassionate, practical comment on how to apply this.
    Tone: Rational, geometric, yet deeply liberating.`;

        const userPrompt = `The user says: "${userQuery}". Construct a geometric proof to help them.`;

        const text = await callGemini(userPrompt, systemPrompt);
        setAdvisorResponse(text);
        setIsLoading(false);
    };

    return (
        <>
            {/* FLOATING ACTION BUTTON */}
            <button
                onClick={() => setShowAdvisor(true)}
                className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
            >
                <Sparkles size={20} />
                <span className="font-semibold text-sm">Geometric Advisor</span>
            </button>

            {/* --- GEOMETRIC ADVISOR MODAL --- */}
            {showAdvisor && (
                <div className="fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
                    <button onClick={() => setShowAdvisor(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
                        <X size={24} />
                    </button>

                    <div className="max-w-2xl w-full">
                        <div className="flex items-center gap-3 mb-2">
                            <Sparkles className="text-indigo-500" />
                            <h2 className="text-2xl font-bold text-slate-800">Geometric Advisor</h2>
                        </div>
                        <p className="text-slate-500 mb-8">Describe a burden or question. I will demonstrate the solution geometrically.</p>

                        {!advisorResponse ? (
                            <form onSubmit={handleAdvisorSubmit} className="w-full">
                                <textarea
                                    value={userQuery}
                                    onChange={(e) => setUserQuery(e.target.value)}
                                    placeholder="e.g., 'I feel anxious about my career path' or 'I am angry at my friend'"
                                    className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none h-32 bg-slate-50 text-slate-700 placeholder-slate-400 mb-4"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !userQuery.trim()}
                                    className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading ? <Loader2 className="animate-spin" /> : <><BookOpen size={18} /> Demonstrate</>}
                                </button>
                            </form>
                        ) : (
                            <div className="w-full bg-slate-50 rounded-xl border border-slate-200 p-6 max-h-[60vh] overflow-y-auto">
                                <div className="prose prose-indigo max-w-none font-serif text-base leading-relaxed text-slate-900">
                                    <p className="whitespace-pre-wrap">{advisorResponse || ""}</p>
                                </div>
                                <button
                                    onClick={() => { setAdvisorResponse(null); setUserQuery(""); }}
                                    className="mt-6 text-indigo-600 font-semibold hover:underline flex items-center gap-1 text-sm"
                                >
                                    <ArrowRight size={16} /> Another demonstration
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default GeometricAdvisor;
