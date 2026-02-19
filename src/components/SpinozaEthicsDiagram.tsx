"use client";

import React, { useState } from 'react';
import { Info, Zap, Brain, Heart, Crown, Network, Globe, BookOpen, Sun, Moon } from 'lucide-react';
import HierarchyDiagram from './diagrams/HierarchyDiagram';
import FlowDiagram from './diagrams/FlowDiagram';
import ParallelismDiagram from './diagrams/ParallelismDiagram';
import AffectsDiagram from './diagrams/AffectsDiagram';
import PowerDiagram from './diagrams/PowerDiagram';
import SystemDiagram from './diagrams/SystemDiagram';
import AboutView from './diagrams/AboutView';
import SummaryView from './diagrams/SummaryView';
import { useTheme } from '@/context/ThemeContext';

const SpinozaEthicsDiagram = () => {
    const [activeView, setActiveView] = useState('hierarchy');
    const { theme, toggleTheme } = useTheme();

    const views = [
        { id: 'hierarchy', name: 'Hierarchy', icon: Network },
        { id: 'flow', name: '5 Parts', icon: Zap },
        { id: 'parallelism', name: 'Parallelism', icon: Brain },
        { id: 'affects', name: 'Affects', icon: Heart },
        { id: 'power', name: 'Power→Virtue', icon: Crown },
        { id: 'system', name: 'Complete', icon: Globe },
        { id: 'about', name: 'About', icon: Info },
        { id: 'summary', name: 'Read Summary', icon: BookOpen }
    ];

    return (
        <div className="w-full min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans flex flex-col">

            {/* HEADER CONTENT */}
            <header className="w-full max-w-5xl mx-auto pt-12 pb-8 px-6 text-center z-10">
                <h1 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-3 tracking-tight">
                    Spinoza&apos;s Ethics
                </h1>
                <p className="text-sm md:text-base text-[var(--text-muted)] font-bold tracking-[0.25em] uppercase mb-2">
                    Interactive Visual Exploration
                </p>
                <p className="text-base md:text-lg font-serif font-bold text-[var(--text-muted)]">
                    From Substance to Blessedness: A Complete Philosophical System
                </p>
            </header>

            {/* NAVIGATION - Styled as a clean toggle list, no heavy cards */}
            <nav className="w-full max-w-[1800px] mx-auto mb-6 px-4 z-10">
                <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
                    {views.map(view => {
                        const Icon = view.icon;
                        const isActive = activeView === view.id;
                        return (
                            <button
                                key={view.id}
                                onClick={() => setActiveView(view.id)}
                                className={`flex items-center gap-2.5 px-5 py-3 rounded-full font-bold text-sm transition-all duration-300 border ${isActive
                                    ? 'bg-[var(--btn-active-bg)] text-[var(--btn-active-text)] border-[var(--btn-active-border)] shadow-lg scale-105'
                                    : 'bg-[var(--btn-inactive-bg)] text-[var(--btn-inactive-text)] border-[var(--btn-inactive-border)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)]'
                                    }`}
                            >
                                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                <span>{view.name}</span>
                            </button>
                        );
                    })}
                    {/* Theme Toggle Button - Sun and Moon */}
                    <button
                        onClick={toggleTheme}
                        className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 border-4 active:scale-95"
                        style={{
                            backgroundColor: theme === 'light' ? '#ffffff' : '#1f2937',
                            borderColor: theme === 'light' ? '#9ca3af' : '#f3f4f6',
                        }}
                        title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                    >
                        {theme === 'light' ? (
                            <Sun size={26} strokeWidth={2.5} className="text-yellow-500" />
                        ) : (
                            <Moon size={26} strokeWidth={2.5} className="text-white" />
                        )}
                    </button>
                </div>
            </nav>

            {/* DIAGRAM CONTAINER */}
            <main className="w-full max-w-[1800px] mx-auto px-2 md:px-6 flex-grow mb-12">
                <div className="w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur-sm relative">
                    <div className="w-full overflow-x-auto">
                        <div className="min-w-[1000px]">
                            {activeView === 'about' && <AboutView />}
                            {activeView === 'hierarchy' && <HierarchyDiagram />}
                            {activeView === 'flow' && <FlowDiagram />}
                            {activeView === 'parallelism' && <ParallelismDiagram />}
                            {activeView === 'affects' && <AffectsDiagram />}
                            {activeView === 'power' && <PowerDiagram />}
                            {activeView === 'system' && <SystemDiagram />}
                            {activeView === 'summary' && <SummaryView />}
                        </div>
                    </div>
                </div>
            </main>

            {/* FOOTER CONTENT */}
            <footer className="w-full py-12 text-center border-t border-[var(--border)]/50 bg-[var(--background)]">
                <div className="max-w-md mx-auto px-6">
                    <p className="text-[var(--text-muted)] text-base font-serif italic mb-2">
                        &quot;All things excellent are as difficult as they are rare.&quot;
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-[var(--text-muted)] opacity-60 uppercase">
                        <span>Ethics V</span>
                        <span className="w-1 h-1 rounded-full bg-[var(--text-muted)] opacity-60"></span>
                        <span>Scholium to P42</span>
                    </div>
                </div>
            </footer>
            {/* FOOTER */}
            <footer className="w-full max-w-screen-xl mx-auto px-6 py-8 mt-auto flex flex-col md:flex-row justify-between items-center text-sm text-[var(--text-muted)] gap-4">
                <div className="font-medium text-center md:text-left">
                    Credit: <span className="font-semibold text-[var(--text-secondary)]">Baruch Spinoza</span> — <i>Ethica Ordine Geometrico Demonstrata</i> (1677)
                </div>
                <div className="flex items-center gap-1">
                    <span>&copy; {new Date().getFullYear()} Nirajan Karki | Created with passion by </span>
                    <a
                        href="https://kneeraazon.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--text-primary)] transition-colors font-semibold"
                    >
                        kneeraazon
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default SpinozaEthicsDiagram;
