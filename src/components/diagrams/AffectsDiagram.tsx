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

const AffectsDiagram = () => {
    const { explainConcept } = useSpinoza();

    const handleNodeClick = (title: string, context: string) => {
        explainConcept(title, context);
    };

    const CANVAS_WIDTH = 1100;
    const CANVAS_HEIGHT = 800;

    return (
        <div className="w-full min-h-screen bg-slate-50 relative font-sans overflow-hidden">
            {/* HEADER */}
            <div className="absolute top-6 left-8 z-10 pointer-events-none">
                <h2 className="text-slate-400 text-sm font-semibold tracking-widest uppercase mb-1.5">
                    Ethica: De Affectibus
                </h2>
                <h3 className="text-slate-300 text-xs font-medium tracking-wider uppercase">
                    / From Bondage to Freedom
                </h3>
            </div>

            <div className="w-full max-w-[1600px] mx-auto aspect-11/8 relative px-4">
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
                        <linearGradient id="gradConatus" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#e0e7ff" />
                            <stop offset="100%" stopColor="#c7d2fe" />
                        </linearGradient>
                        <linearGradient id="gradBondage" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#ffe4e6" />
                            <stop offset="100%" stopColor="#fecdd3" />
                        </linearGradient>
                        <linearGradient id="gradFreedom" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#dcfce7" />
                            <stop offset="100%" stopColor="#bbf7d0" />
                        </linearGradient>
                        <linearGradient id="gradTransform" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#c084fc" />
                            <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>

                        <marker id="arrowRed" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 L0,0" fill="#fa5252" />
                        </marker>
                        <marker id="arrowGreen" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 L0,0" fill="#51cf66" />
                        </marker>
                        <marker id="arrowPurple" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 L0,0" fill="#845ef7" />
                        </marker>
                    </defs>

                    {/* Background Grid */}
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    <text x={CANVAS_WIDTH / 2} y="35" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#343a40">
                        From Bondage to Freedom Through Understanding
                    </text>

                    {/* Central Conatus */}
                    <InteractiveGroup transform={`translate(${CANVAS_WIDTH / 2}, 100)`} onClick={() => handleNodeClick("Conatus", "Striving to persevere")}>
                        <rect x="-150" y="-50" width="300" height="100" rx="6" fill="url(#gradConatus)" fillOpacity="0.9" stroke="#4c6ef5" strokeWidth="2" filter="url(#dropShadow)" />
                        <text x="0" y="-5" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#3b5bdb">CONATUS</text>
                        <text x="0" y="15" textAnchor="middle" fontSize="11" fill="#4c6ef5">Striving to persevere = Essence (IIIP7)</text>
                    </InteractiveGroup>

                    {/* Connection from conatus */}
                    <path d={`M ${CANVAS_WIDTH / 2 - 100} 120 Q 270 160 270 260`} stroke="#fa5252" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                    <path d={`M ${CANVAS_WIDTH / 2 + 100} 120 Q 830 160 830 260`} stroke="#51cf66" strokeWidth="2" fill="none" strokeDasharray="5,5" />

                    {/* Left path - Bondage */}
                    <g transform="translate(70, 200)">
                        <rect width="400" height="500" rx="6" fill="#fff5f5" stroke="#fa5252" strokeWidth="2" />
                        <text x="200" y="35" textAnchor="middle" fontSize="19" fontWeight="bold" fill="#c92a2a">
                            PATH OF BONDAGE
                        </text>

                        <InteractiveGroup transform="translate(50, 60)" onClick={() => handleNodeClick("Inadequate Ideas", "Confused perception")}>
                            <rect width="300" height="80" rx="6" fill="#ffe3e3" stroke="#fa5252" strokeWidth="1.5" filter="url(#dropShadow)" />
                            <text x="150" y="25" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#c92a2a">
                                INADEQUATE IDEAS
                            </text>
                            <text x="150" y="45" textAnchor="middle" fontSize="10" fill="#7d1a1a">
                                Confused • Partial • From external causes
                            </text>
                            <text x="150" y="62" textAnchor="middle" fontSize="9" fill="#7d1a1a" fontStyle="italic">
                                First kind of knowledge (imagination)
                            </text>
                        </InteractiveGroup>

                        <path d="M 200 140 L 200 170" stroke="#fa5252" strokeWidth="2" markerEnd="url(#arrowRed)" />

                        <InteractiveGroup transform="translate(50, 170)" onClick={() => handleNodeClick("Passive Affects", "Passions")}>
                            <rect width="300" height="140" rx="6" fill="#ffc9c9" stroke="#c92a2a" strokeWidth="1.5" filter="url(#dropShadow)" />
                            <text x="150" y="25" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#c92a2a">
                                PASSIVE AFFECTS
                            </text>
                            <text x="150" y="45" textAnchor="middle" fontSize="11" fill="#7d1a1a">
                                (Passions)
                            </text>
                            <text x="150" y="65" textAnchor="middle" fontSize="10" fill="#7d1a1a">
                                • Joy from external causes
                            </text>
                            <text x="150" y="82" textAnchor="middle" fontSize="10" fill="#7d1a1a">
                                • Sadness from external causes
                            </text>
                            <text x="150" y="99" textAnchor="middle" fontSize="10" fill="#7d1a1a">
                                • Desire from imagination
                            </text>
                            <text x="150" y="120" textAnchor="middle" fontSize="9" fill="#7d1a1a" fontStyle="italic">
                                Love, Hate, Hope, Fear, Anger...
                            </text>
                        </InteractiveGroup>

                        <path d="M 200 310 L 200 340" stroke="#c92a2a" strokeWidth="2" markerEnd="url(#arrowRed)" />

                        <InteractiveGroup transform="translate(50, 340)" onClick={() => handleNodeClick("Bondage", "Human impotence")}>
                            <rect width="300" height="140" rx="6" fill="#ff8787" stroke="#7d1a1a" strokeWidth="2" filter="url(#dropShadow)" />
                            <text x="150" y="25" textAnchor="middle" fontSize="15" fontWeight="bold" fill="white">
                                BONDAGE
                            </text>
                            <text x="150" y="50" textAnchor="middle" fontSize="11" fill="white">
                                • Determined by external causes
                            </text>
                            <text x="150" y="68" textAnchor="middle" fontSize="11" fill="white">
                                • Fluctuating emotions
                            </text>
                            <text x="150" y="86" textAnchor="middle" fontSize="11" fill="white">
                                • See better, do worse (IVPreface)
                            </text>
                            <text x="150" y="104" textAnchor="middle" fontSize="11" fill="white">
                                • Slavery to transient goods
                            </text>
                            <text x="150" y="122" textAnchor="middle" fontSize="11" fill="white">
                                • Suffering & conflict
                            </text>
                        </InteractiveGroup>
                    </g>

                    {/* Right path - Freedom */}
                    <g transform="translate(630, 200)">
                        <rect width="400" height="500" rx="6" fill="#f0fdf4" stroke="#51cf66" strokeWidth="2" />
                        <text x="200" y="35" textAnchor="middle" fontSize="19" fontWeight="bold" fill="#2b8a3e">
                            PATH OF FREEDOM
                        </text>

                        <InteractiveGroup transform="translate(50, 60)" onClick={() => handleNodeClick("Adequate Ideas", "Clear and distinct")}>
                            <rect width="300" height="80" rx="6" fill="#dcfce7" stroke="#51cf66" strokeWidth="1.5" filter="url(#dropShadow)" />
                            <text x="150" y="25" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#2b8a3e">
                                ADEQUATE IDEAS
                            </text>
                            <text x="150" y="45" textAnchor="middle" fontSize="10" fill="#14532d">
                                Clear & distinct • Complete • From our nature
                            </text>
                            <text x="150" y="62" textAnchor="middle" fontSize="9" fill="#14532d" fontStyle="italic">
                                Second & third kinds of knowledge
                            </text>
                        </InteractiveGroup>

                        <path d="M 200 140 L 200 170" stroke="#51cf66" strokeWidth="2" markerEnd="url(#arrowGreen)" />

                        <InteractiveGroup transform="translate(50, 170)" onClick={() => handleNodeClick("Active Affects", "Actions")}>
                            <rect width="300" height="140" rx="6" fill="#bbf7d0" stroke="#2b8a3e" strokeWidth="1.5" filter="url(#dropShadow)" />
                            <text x="150" y="25" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#14532d">
                                ACTIVE AFFECTS
                            </text>
                            <text x="150" y="45" textAnchor="middle" fontSize="11" fill="#14532d">
                                (Actions)
                            </text>
                            <text x="150" y="65" textAnchor="middle" fontSize="10" fill="#14532d">
                                • Active joy from understanding
                            </text>
                            <text x="150" y="82" textAnchor="middle" fontSize="10" fill="#14532d">
                                • Active desire from reason
                            </text>
                            <text x="150" y="99" textAnchor="middle" fontSize="10" fill="#14532d">
                                • Tenacity & Nobility (IIIP59)
                            </text>
                            <text x="150" y="120" textAnchor="middle" fontSize="9" fill="#14532d" fontStyle="italic">
                                Intellectual love, Self-esteem...
                            </text>
                        </InteractiveGroup>

                        <path d="M 200 310 L 200 340" stroke="#2b8a3e" strokeWidth="2" markerEnd="url(#arrowGreen)" />

                        <InteractiveGroup transform="translate(50, 340)" onClick={() => handleNodeClick("Freedom", "Human Freedom")}>
                            <rect width="300" height="140" rx="6" fill="#4ade80" stroke="#1a5a1a" strokeWidth="2" filter="url(#dropShadow)" />
                            <text x="150" y="25" textAnchor="middle" fontSize="15" fontWeight="bold" fill="white">
                                FREEDOM
                            </text>
                            <text x="150" y="50" textAnchor="middle" fontSize="11" fill="white">
                                • Self-determined through knowledge
                            </text>
                            <text x="150" y="68" textAnchor="middle" fontSize="11" fill="white">
                                • Stable emotions
                            </text>
                            <text x="150" y="86" textAnchor="middle" fontSize="11" fill="white">
                                • Virtue = Power (IVd8)
                            </text>
                            <text x="150" y="104" textAnchor="middle" fontSize="11" fill="white">
                                • Love of eternal goods
                            </text>
                            <text x="150" y="122" textAnchor="middle" fontSize="11" fill="white">
                                • Blessedness & peace
                            </text>
                        </InteractiveGroup>
                    </g>

                    {/* Transformation arrow */}
                    <g transform="translate(470, 410)">
                        <path d="M 0 40 L 160 40" stroke="#a855f7" strokeWidth="4" markerEnd="url(#arrowPurple)" strokeDasharray="10,5" />
                        <InteractiveGroup transform="translate(0, 0)" onClick={() => handleNodeClick("Transformation", "Understanding affects")}>
                            <rect width="160" height="80" rx="6" fill="url(#gradTransform)" filter="url(#dropShadow)" />
                            <text x="80" y="25" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">
                                TRANSFORMATION
                            </text>
                            <text x="80" y="45" textAnchor="middle" fontSize="9" fill="white">
                                VP3: Clear idea of affect
                            </text>
                            <text x="80" y="60" textAnchor="middle" fontSize="9" fill="white">
                                transforms passion → action
                            </text>
                        </InteractiveGroup>
                    </g>

                    {/* Bottom note */}
                    <g transform="translate(150, 740)">
                        <rect width="800" height="45" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                        <text x="400" y="25" textAnchor="middle" fontSize="11" fill="#475569" fontWeight="600">
                            Both paths are determined. Freedom ≠ Indetermination, but Self-Determination through Knowledge.
                        </text>
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default AffectsDiagram;


