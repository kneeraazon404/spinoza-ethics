"use client";

import React, { useState } from 'react';
import { ArrowRight, BookOpen, Loader2, Sparkles, X } from 'lucide-react';
import { callGroqAI } from '@/lib/groq';

const GeometricAdvisor = () => {
    const [showAdvisor, setShowAdvisor] = useState(false);
    const [userQuery, setUserQuery] = useState("");
    const [advisorResponse, setAdvisorResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

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

        try {
            const text = await callGroqAI(userPrompt, systemPrompt);
            setAdvisorResponse(text);
        } catch (error) {
            console.error(error);
            setAdvisorResponse("Error: Could not connect to the infinite intellect (API).");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setShowAdvisor(true)}
                className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
            >
                <Sparkles size={20} />
                <span className="font-semibold text-sm">Geometric Advisor</span>
            </button>

            {showAdvisor && (
                <div className="fixed inset-0 bg-[var(--surface)] z-[60] flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
                    <button onClick={() => setShowAdvisor(false)} className="absolute top-6 right-6 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                        <X size={24} />
                    </button>

                    <div className="max-w-2xl w-full">
                        <div className="flex items-center gap-3 mb-2">
                            <Sparkles className="text-[var(--accent)]" />
                            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Geometric Advisor</h2>
                        </div>
                        <p className="text-[var(--text-muted)] mb-8">Describe a burden or question. I will demonstrate the solution geometrically.</p>

                        {!advisorResponse ? (
                            <form onSubmit={handleAdvisorSubmit} className="w-full">
                                <textarea
                                    value={userQuery}
                                    onChange={(e) => setUserQuery(e.target.value)}
                                    placeholder="e.g., 'I feel anxious about my career path' or 'I am angry at my friend'"
                                    className="w-full p-4 rounded-xl border border-[var(--border)] focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] outline-none resize-none h-32 bg-[var(--surface-muted)] text-[var(--text-primary)] placeholder-[var(--text-muted)] mb-4"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !userQuery.trim()}
                                    className="w-full py-3 bg-[var(--accent)] text-white rounded-lg font-semibold hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading ? <Loader2 className="animate-spin" /> : <><BookOpen size={18} /> Demonstrate</>}
                                </button>
                            </form>
                        ) : (
                            <div className="w-full bg-[var(--surface-muted)] rounded-xl border border-[var(--border)] p-6 max-h-[60vh] overflow-y-auto">
                                <div className="prose prose-indigo max-w-none font-serif text-base leading-relaxed text-[var(--text-primary)]">
                                    <p className="whitespace-pre-wrap">{advisorResponse}</p>
                                </div>
                                <button
                                    onClick={() => { setAdvisorResponse(null); setUserQuery(""); }}
                                    className="mt-6 text-[var(--accent)] font-semibold hover:underline flex items-center gap-1 text-sm"
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
