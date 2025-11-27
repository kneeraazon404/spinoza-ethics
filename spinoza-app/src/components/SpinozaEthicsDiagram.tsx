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

        <div className="w-full min-h-screen bg-slate-50 p-4 font-sans">
            <div className="w-full max-w-[1800px] mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-5xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                        Spinoza&apos;s Ethics
                    </h1>
                    <p className="text-lg text-slate-500 font-bold tracking-[0.2em] uppercase italic">
                        Interactive Visual Exploration
                    </p>
                    <p className="text-lg italic text-gray-500 mt-2">
                        From Substance to Blessedness: A Complete Philosophical System
                    </p>
                </div>

                {/* View tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {views.map(view => {
                        const Icon = view.icon;
                        const isActive = activeView === view.id;
                        return (
                            <button
                                key={view.id}
                                onClick={() => setActiveView(view.id)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${isActive
                                    ? 'bg-slate-800 text-white shadow-lg ring-2 ring-slate-800 ring-offset-2'
                                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 shadow-sm border border-slate-200'
                                    }`}
                            >
                                <Icon size={18} />
                                {view.name}
                            </button>
                        );
                    })}
                </div>

                {/* Diagram container */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50 p-4 overflow-hidden">
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

                {/* Footer info */}
                <div className="mt-12 text-center">
                    <p className="text-slate-400 text-sm font-medium italic">
                        &quot;All things excellent are as difficult as they are rare.&quot;
                    </p>
                    <p className="text-slate-300 text-xs mt-1 font-semibold uppercase tracking-widest">
                        Ethics V, Scholium to P42
                    </p>
                </div>
            </div>
        </div>
    );

};

export default SpinozaEthicsDiagram;
