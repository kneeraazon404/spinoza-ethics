import React from 'react';
import { useSpinoza } from '@/context/SpinozaContext';

interface InteractiveGroupProps {
    transform?: string;
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
}

const InteractiveGroup = ({ transform, onClick, children, className = "" }: InteractiveGroupProps) => (
    <g
        transform={transform}
        onClick={onClick}
        className={`cursor-pointer ${className}`}
        style={{ pointerEvents: 'all' }}
    >
        <g className="transition-all duration-300 ease-out hover:-translate-y-1 hover:drop-shadow-xl">
            {children}
        </g>
    </g>
);

const PowerDiagram = () => {
    const { explainConcept } = useSpinoza();

    const handleNodeClick = (title: string, context: string) => {
        explainConcept(title, context);
    };

    const CANVAS_WIDTH = 1200;
    const CANVAS_HEIGHT = 1000;

    return (
        <div className="w-full min-h-screen bg-slate-50 relative font-sans overflow-hidden">
            {/* HEADER */}
            <div className="absolute top-6 left-8 z-10 pointer-events-none">
                <h2 className="text-slate-400 text-sm font-semibold tracking-widest uppercase mb-1.5">
                    Ethica: Potentia et Virtus
                </h2>
                <h3 className="text-slate-300 text-xs font-medium tracking-wider uppercase">
                    / The Dynamics of Human Power
                </h3>
            </div>

            <div className="w-full max-w-[1600px] mx-auto aspect-12/10 relative px-4">
                <svg viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`} preserveAspectRatio="xMidYMid meet" className="w-full h-full">
                    <defs>
                        {/* Grid Pattern */}
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1" opacity="0.5" />
                        </pattern>

                        {/* Drop Shadow */}
                        <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                            <feOffset dx="2" dy="4" result="offsetblur" />
                            <feComponentTransfer>
                                <feFuncA type="linear" slope="0.15" />
                            </feComponentTransfer>
                            <feMerge>
                                <feMergeNode />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        {/* Gradients */}
                        <linearGradient id="gradPower" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#f3e8ff" />
                            <stop offset="100%" stopColor="#d8b4fe" />
                        </linearGradient>
                        <linearGradient id="gradConatus" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#e0e7ff" />
                            <stop offset="100%" stopColor="#c7d2fe" />
                        </linearGradient>
                        <linearGradient id="gradAffects" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#ffe4e6" />
                            <stop offset="100%" stopColor="#fecdd3" />
                        </linearGradient>
                        <linearGradient id="gradJoy" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#dcfce7" />
                            <stop offset="100%" stopColor="#bbf7d0" />
                        </linearGradient>
                        <linearGradient id="gradSadness" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#fee2e2" />
                            <stop offset="100%" stopColor="#fecaca" />
                        </linearGradient>
                        <linearGradient id="gradKnowledge" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#e0e7ff" />
                            <stop offset="100%" stopColor="#c7d2fe" />
                        </linearGradient>
                        <linearGradient id="gradInadequate" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#fee2e2" />
                            <stop offset="100%" stopColor="#fecaca" />
                        </linearGradient>
                        <linearGradient id="gradReason" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#fef3c7" />
                            <stop offset="100%" stopColor="#fde68a" />
                        </linearGradient>
                        <linearGradient id="gradIntuition" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#dcfce7" />
                            <stop offset="100%" stopColor="#bbf7d0" />
                        </linearGradient>
                        <linearGradient id="gradVirtue" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#dcfce7" />
                            <stop offset="100%" stopColor="#86efac" />
                        </linearGradient>
                        <linearGradient id="gradBlessedness" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#16a34a" />
                            <stop offset="100%" stopColor="#15803d" />
                        </linearGradient>
                        <linearGradient id="gradBox" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#f8fafc" />
                            <stop offset="100%" stopColor="#f1f5f9" />
                        </linearGradient>

                        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 L0,0" fill="#94a3b8" />
                        </marker>
                        <marker id="arrowVirtue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 L0,0" fill="#16a34a" />
                        </marker>
                    </defs>

                    {/* Background Grid */}
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Title */}
                    <text x={CANVAS_WIDTH / 2} y="50" textAnchor="middle" className="text-2xl font-bold fill-slate-700">
                        From Conatus to Blessedness: The Power Equation
                    </text>

                    {/* God's Essence/Power */}
                    <InteractiveGroup transform={`translate(${CANVAS_WIDTH / 2}, 120)`} onClick={() => handleNodeClick("God's Power", "Infinite productive power")}>
                        <rect x="-240" y="-70" width="480" height="140" rx="6" fill="url(#gradPower)" fillOpacity="0.9" stroke="#7e22ce" strokeWidth="2" filter="url(#dropShadow)" />
                        <text x="0" y="10" textAnchor="middle" className="text-2xl font-black tracking-widest uppercase fill-purple-900">
                            GOD&apos;S ESSENCE = GOD&apos;S POWER
                        </text>
                        <text x="0" y="35" textAnchor="middle" className="text-sm font-bold italic serif fill-purple-800">
                            Infinite productive power (IP34)
                        </text>
                    </InteractiveGroup>

                    <line x1={CANVAS_WIDTH / 2} y1="190" x2={CANVAS_WIDTH / 2} y2="250" stroke="#7e22ce" strokeWidth="2" markerEnd="url(#arrow)" />

                    {/* Conatus */}
                    <InteractiveGroup transform={`translate(${CANVAS_WIDTH / 2}, 250)`} onClick={() => handleNodeClick("Conatus", "Striving to persevere")}>
                        <rect x="-180" y="0" width="360" height="100" rx="6" fill="url(#gradConatus)" stroke="#4338ca" strokeWidth="2" filter="url(#dropShadow)" />
                        <text x="0" y="35" textAnchor="middle" className="text-2xl font-black tracking-widest uppercase fill-indigo-900">
                            CONATUS
                        </text>
                        <text x="0" y="57" textAnchor="middle" className="text-sm font-bold fill-indigo-800">
                            Each thing&apos;s striving = its essence (IIIP7)
                        </text>
                        <text x="0" y="75" textAnchor="middle" className="text-xs font-medium italic fill-indigo-700">
                            Finite expression of God&apos;s power
                        </text>
                    </InteractiveGroup>

                    {/* Split to affects and knowledge */}
                    <line x1={CANVAS_WIDTH / 2 - 100} y1="350" x2="300" y2="420" stroke="#4338ca" strokeWidth="2" markerEnd="url(#arrow)" />
                    <line x1={CANVAS_WIDTH / 2 + 100} y1="350" x2="900" y2="420" stroke="#4338ca" strokeWidth="2" markerEnd="url(#arrow)" />

                    {/* Affects branch */}
                    <g transform="translate(100, 420)">
                        <InteractiveGroup onClick={() => handleNodeClick("Affects", "Transitions in power")}>
                            <rect width="400" height="180" rx="6" fill="url(#gradAffects)" stroke="#be123c" strokeWidth="2" filter="url(#dropShadow)" />
                            <text x="200" y="40" textAnchor="middle" className="text-2xl font-black tracking-widest uppercase fill-rose-900">AFFECTS</text>
                            <text x="200" y="65" textAnchor="middle" className="text-sm font-bold fill-rose-800">Transitions in power</text>
                        </InteractiveGroup>

                        <g transform="translate(30, 85)">
                            <rect width="160" height="80" rx="6" fill="url(#gradJoy)" stroke="#16a34a" strokeWidth="1.5" filter="url(#dropShadow)" />
                            <text x="80" y="30" textAnchor="middle" className="text-lg font-black uppercase fill-green-900">JOY</text>
                            <text x="80" y="48" textAnchor="middle" className="text-xs font-bold fill-green-800">↑ Power</text>
                            <text x="80" y="62" textAnchor="middle" className="text-[10px] font-medium fill-green-800">Greater perfection</text>
                        </g>

                        <g transform="translate(210, 85)">
                            <rect width="160" height="80" rx="6" fill="url(#gradSadness)" stroke="#be123c" strokeWidth="1.5" filter="url(#dropShadow)" />
                            <text x="80" y="30" textAnchor="middle" className="text-lg font-black uppercase fill-rose-900">SADNESS</text>
                            <text x="80" y="48" textAnchor="middle" className="text-xs font-bold fill-rose-800">↓ Power</text>
                            <text x="80" y="62" textAnchor="middle" className="text-[10px] font-medium fill-rose-800">Lesser perfection</text>
                        </g>
                    </g>

                    {/* Knowledge branch */}
                    <g transform="translate(700, 420)">
                        <InteractiveGroup onClick={() => handleNodeClick("Knowledge", "Degrees of understanding")}>
                            <rect width="400" height="180" rx="6" fill="url(#gradKnowledge)" stroke="#4338ca" strokeWidth="2" filter="url(#dropShadow)" />
                            <text x="200" y="40" textAnchor="middle" className="text-2xl font-black tracking-widest uppercase fill-indigo-900">KNOWLEDGE</text>
                            <text x="200" y="65" textAnchor="middle" className="text-sm font-bold fill-indigo-800">Degrees of understanding</text>
                        </InteractiveGroup>

                        <g transform="translate(20, 85)">
                            <rect width="110" height="80" rx="6" fill="url(#gradInadequate)" stroke="#be123c" strokeWidth="1.5" filter="url(#dropShadow)" />
                            <text x="55" y="30" textAnchor="middle" className="text-xs font-black uppercase fill-rose-900">Inadequate</text>
                            <text x="55" y="50" textAnchor="middle" className="text-[10px] font-bold fill-rose-800">Imagination</text>
                            <text x="55" y="65" textAnchor="middle" className="text-[10px] font-bold fill-rose-800">↓ Power</text>
                        </g>

                        <g transform="translate(145, 85)">
                            <rect width="110" height="80" rx="6" fill="url(#gradReason)" stroke="#d97706" strokeWidth="1.5" filter="url(#dropShadow)" />
                            <text x="55" y="30" textAnchor="middle" className="text-xs font-black uppercase fill-amber-900">Adequate</text>
                            <text x="55" y="50" textAnchor="middle" className="text-[10px] font-bold fill-amber-800">Reason</text>
                            <text x="55" y="65" textAnchor="middle" className="text-[10px] font-bold fill-amber-800">↑ Power</text>
                        </g>

                        <g transform="translate(270, 85)">
                            <rect width="110" height="80" rx="6" fill="url(#gradIntuition)" stroke="#16a34a" strokeWidth="1.5" filter="url(#dropShadow)" />
                            <text x="55" y="30" textAnchor="middle" className="text-xs font-black uppercase fill-green-900">Adequate</text>
                            <text x="55" y="50" textAnchor="middle" className="text-[10px] font-bold fill-green-800">Intuition</text>
                            <text x="55" y="65" textAnchor="middle" className="text-[10px] font-bold fill-green-800">↑↑ Power</text>
                        </g>
                    </g>

                    {/* Converge to Virtue */}
                    <line x1="300" y1="600" x2="500" y2="680" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrowVirtue)" />
                    <line x1="900" y1="600" x2="700" y2="680" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrowVirtue)" />

                    <InteractiveGroup transform={`translate(${CANVAS_WIDTH / 2}, 680)`} onClick={() => handleNodeClick("Virtue", "Power of acting")}>
                        <rect x="-200" y="0" width="400" height="120" rx="6" fill="url(#gradVirtue)" stroke="#16a34a" strokeWidth="2" filter="url(#dropShadow)" />
                        <text x="0" y="40" textAnchor="middle" className="text-2xl font-black tracking-widest uppercase fill-green-900">
                            VIRTUE = POWER
                        </text>
                        <text x="0" y="65" textAnchor="middle" className="text-sm font-bold fill-green-800">
                            Acting from reason = Self-determination (IVD8)
                        </text>
                        <text x="0" y="85" textAnchor="middle" className="text-xs font-medium italic fill-green-700">
                            Maximum capacity to exist and act
                        </text>
                    </InteractiveGroup>

                    <line x1={CANVAS_WIDTH / 2} y1="800" x2={CANVAS_WIDTH / 2} y2="860" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrowVirtue)" />

                    {/* Blessedness */}
                    <InteractiveGroup transform={`translate(${CANVAS_WIDTH / 2}, 860)`} onClick={() => handleNodeClick("Blessedness", "Virtue itself")}>
                        <rect x="-240" y="-20" width="480" height="120" rx="6" fill="url(#gradBlessedness)" stroke="#14532d" strokeWidth="2" filter="url(#dropShadow)" />
                        <text x="0" y="45" textAnchor="middle" className="text-2xl font-black tracking-widest uppercase fill-white">
                            BLESSEDNESS
                        </text>
                        <text x="0" y="70" textAnchor="middle" className="text-sm font-bold fill-white">
                            Not reward for virtue, but virtue itself (VP42)
                        </text>
                    </InteractiveGroup>

                    {/* Side boxes */}
                    <g transform="translate(100, 720)">
                        <rect width="300" height="160" rx="6" fill="url(#gradBox)" stroke="#94a3b8" strokeWidth="1.5" />
                        <text x="150" y="40" textAnchor="middle" className="text-lg font-black uppercase fill-slate-800">THE POWER EQUATION</text>
                        <text x="150" y="70" textAnchor="middle" className="text-sm font-medium fill-slate-600">More adequate ideas</text>
                        <text x="150" y="95" textAnchor="middle" className="text-sm font-medium fill-slate-600">= More power = More virtue</text>
                        <text x="150" y="120" textAnchor="middle" className="text-sm font-medium fill-slate-600">= More joy</text>
                        <text x="150" y="140" textAnchor="middle" className="text-sm font-medium fill-slate-600">= More blessedness</text>
                    </g>

                    <g transform="translate(800, 720)">
                        <rect width="300" height="160" rx="6" fill="url(#gradBox)" stroke="#94a3b8" strokeWidth="1.5" />
                        <text x="150" y="40" textAnchor="middle" className="text-lg font-black uppercase fill-slate-800">INTELLECTUAL LOVE</text>
                        <text x="150" y="70" textAnchor="middle" className="text-sm font-medium fill-slate-600">VP32c: Joy from third kind</text>
                        <text x="150" y="95" textAnchor="middle" className="text-sm font-medium fill-slate-600">of knowledge + idea of God</text>
                        <text x="150" y="120" textAnchor="middle" className="text-sm font-medium fill-slate-600">VP36: Mind&apos;s love =</text>
                        <text x="150" y="140" textAnchor="middle" className="text-sm font-medium fill-slate-600">God&apos;s self-love</text>
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default PowerDiagram;
