"use client";

import React, { useState } from 'react';
import { Info, Zap, Brain, Heart, Crown, Network } from 'lucide-react';
import HierarchyDiagram from './diagrams/HierarchyDiagram';
import FlowDiagram from './diagrams/FlowDiagram';
import ParallelismDiagram from './diagrams/ParallelismDiagram';
import AffectsDiagram from './diagrams/AffectsDiagram';
import PowerDiagram from './diagrams/PowerDiagram';
import SystemDiagram from './diagrams/SystemDiagram';

const SpinozaEthicsDiagram = () => {
    const [activeView, setActiveView] = useState('hierarchy');

    const views = [
        { id: 'hierarchy', name: 'Hierarchy', icon: Network },
        { id: 'flow', name: '5 Parts', icon: Zap },
        { id: 'parallelism', name: 'Parallelism', icon: Brain },
        { id: 'affects', name: 'Affects', icon: Heart },
        { id: 'power', name: 'Power→Virtue', icon: Crown },
        { id: 'system', name: 'Complete', icon: Info }
    ];

    return (
        <div className="w-full min-h-screen bg-[#f9fafb] text-slate-900 font-sans flex flex-col">
            
            {/* HEADER CONTENT */}
            <header className="w-full max-w-5xl mx-auto pt-12 pb-8 px-6 text-center z-10">
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 tracking-tight">
                    Spinoza&apos;s Ethics
                </h1>
                <p className="text-sm md:text-base text-slate-500 font-bold tracking-[0.25em] uppercase mb-2">
                    Interactive Visual Exploration
                </p>
                <p className="text-base md:text-lg italic text-slate-400 font-serif">
                    From Substance to Blessedness: A Complete Philosophical System
                </p>
            </header>

            {/* NAVIGATION - Styled as a clean toggle list, no heavy cards */}
            <nav className="w-full max-w-screen-xl mx-auto mb-6 px-4 z-10">
                <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                    {views.map(view => {
                        const Icon = view.icon;
                        const isActive = activeView === view.id;
                        return (
                            <button
                                key={view.id}
                                onClick={() => setActiveView(view.id)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border ${
                                    isActive
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg transform scale-105'
                                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-800 hover:bg-slate-50'
                                }`}
                            >
                                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                                <span>{view.name}</span>
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* DIAGRAM CONTAINER */}
            {/* Removed the "White Card" styling (bg-white, shadow-2xl). 
                Now it uses a subtle border to frame the content while blending with the background. */}
            <main className="w-full max-w-[1800px] mx-auto px-2 md:px-6 flex-grow mb-12">
                <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-sm relative">
                    <div className="w-full overflow-x-auto">
                        <div className="min-w-[1000px]">
                            {activeView === 'hierarchy' && <HierarchyDiagram />}
                            {activeView === 'flow' && <FlowDiagram />}
                            {activeView === 'parallelism' && <ParallelismDiagram />}
                            {activeView === 'affects' && <AffectsDiagram />}
                            {activeView === 'power' && <PowerDiagram />}
                            {activeView === 'system' && <SystemDiagram />}
                        </div>
                    </div>
                </div>
            </main>

            {/* FOOTER CONTENT */}
            <footer className="w-full py-12 text-center border-t border-slate-200/50 bg-[#f9fafb]">
                <div className="max-w-md mx-auto px-6">
                    <p className="text-slate-500 text-base font-serif italic mb-2">
                        &quot;All things excellent are as difficult as they are rare.&quot;
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-slate-400 uppercase">
                        <span>Ethics V</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span>Scholium to P42</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default SpinozaEthicsDiagram;