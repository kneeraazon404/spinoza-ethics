"use client";

import React, { useState, useCallback } from "react";
import {
  ArrowRight,
  BookOpen,
  Loader2,
  Sparkles,
  X,
  AlertCircle,
} from "lucide-react";
import { callGroqAI } from "@/lib/groq";

interface AdvisorState {
  response: string | null;
  error: string | null;
  isLoading: boolean;
}

const GeometricAdvisor: React.FC = () => {
  const [showAdvisor, setShowAdvisor] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [state, setState] = useState<AdvisorState>({
    response: null,
    error: null,
    isLoading: false,
  });

  const handleAdvisorSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!userQuery.trim()) return;

      setState({
        response: null,
        error: null,
        isLoading: true,
      });

      const systemPrompt = `You are Baruch Spinoza. You reply to personal problems NOT with generic advice, but by generating a specific 'Proposition', 'Demonstration', and 'Scholium' in the style of your book 'The Ethics'.
- Proposition: A concise statement of truth regarding the user's problem.
- Demonstration: A logical proof derived from reason.
- Scholium: A compassionate, practical comment on how to apply this.
Tone: Rational, geometric, yet deeply liberating.`;

      const userPrompt = `The user says: "${userQuery}". Construct a geometric proof to help them.`;

      try {
        const text = await callGroqAI(userPrompt, systemPrompt);
        setState({
          response: text,
          error: null,
          isLoading: false,
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Unknown error occurred. Please try again.";
        console.error("Groq API Error:", error);
        setState({
          response: null,
          error: errorMessage,
          isLoading: false,
        });
      }
    },
    [userQuery]
  );

  const handleReset = useCallback(() => {
    setState({
      response: null,
      error: null,
      isLoading: false,
    });
    setUserQuery("");
  }, []);

  const handleClose = useCallback(() => {
    setShowAdvisor(false);
    handleReset();
  }, [handleReset]);

  return (
    <>
      <button
        onClick={() => setShowAdvisor(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
        aria-label="Open Geometric Advisor"
      >
        <Sparkles size={20} />
        <span className="font-semibold text-sm">Geometric Advisor</span>
      </button>

      {showAdvisor && (
        <div className="fixed inset-0 bg-[var(--surface)] z-[60] flex flex-col items-center justify-center p-8 animate-in fade-in duration-300 overflow-y-auto">
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Close advisor"
          >
            <X size={24} />
          </button>

          <div className="max-w-2xl w-full">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="text-[var(--accent)]" />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                Geometric Advisor
              </h2>
            </div>
            <p className="text-[var(--text-muted)] mb-8">
              Describe a burden or question. I will demonstrate the solution
              geometrically.
            </p>

            {!state.response && !state.error ? (
              <form onSubmit={handleAdvisorSubmit} className="w-full">
                <textarea
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder="e.g., 'I feel anxious about my career path' or 'I am angry at my friend'"
                  className="w-full p-4 rounded-xl border border-[var(--border)] focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] outline-none resize-none h-32 bg-[var(--surface-muted)] text-[var(--text-primary)] placeholder-[var(--text-muted)] mb-4"
                  disabled={state.isLoading}
                  maxLength={1000}
                />
                <button
                  type="submit"
                  disabled={state.isLoading || !userQuery.trim()}
                  className="w-full py-3 bg-[var(--accent)] text-white rounded-lg font-semibold hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
                >
                  {state.isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      <span>Thinking geometrically...</span>
                    </>
                  ) : (
                    <>
                      <BookOpen size={18} />
                      <span>Demonstrate</span>
                    </>
                  )}
                </button>
              </form>
            ) : state.error ? (
              <div className="w-full bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 p-6">
                <div className="flex gap-3 mb-3">
                  <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-900 dark:text-red-200">
                      Error
                    </h3>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                      {state.error}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="text-[var(--accent)] font-semibold hover:underline flex items-center gap-1 text-sm"
                >
                  <ArrowRight size={16} /> Try again
                </button>
              </div>
            ) : (
              <div className="w-full bg-[var(--surface-muted)] rounded-xl border border-[var(--border)] p-6 max-h-[60vh] overflow-y-auto">
                <div className="prose prose-indigo max-w-none font-serif text-base leading-relaxed text-[var(--text-primary)]">
                  <p className="whitespace-pre-wrap">{state.response}</p>
                </div>
                <button
                  onClick={handleReset}
                  className="mt-6 text-[var(--accent)] font-semibold hover:underline flex items-center gap-1 text-sm transition-colors"
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
