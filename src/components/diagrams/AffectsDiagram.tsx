import React from 'react';
import { useSpinoza } from '@/context/SpinozaContext';

const AffectsDiagram = () => {
    const { explainConcept } = useSpinoza();

    const handleNodeClick = (title: string, context: string) => {
        explainConcept(title, context);
    };

    const colors = {
        bg: "#f8fafc",
        text: { main: "#1e293b", sub: "#475569", light: "#94a3b8" },
        conatus: { fill: "#f3e8ff", stroke: "#7e22ce", text: "#581c87" },
        joy: { fill: "#dcfce7", stroke: "#16a34a", text: "#14532d" },
        sadness: { fill: "#fee2e2", stroke: "#dc2626", text: "#7f1d1d" },
        desire: { fill: "#ffedd5", stroke: "#ea580c", text: "#7c2d12" },
        bondage: { fill: "#f1f5f9", stroke: "#64748b", text: "#334155" },
        freedom: { fill: "#e0e7ff", stroke: "#4338ca", text: "#312e81" },
        neutral: { fill: "#f8fafc", stroke: "#cbd5e1", text: "#475569" }
    };

    const CANVAS_WIDTH = 1200;
    const CANVAS_HEIGHT = 1100;

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
            className={`cursor-pointer transition-all duration-300 hover:opacity-75 ${className}`}
            style={{ pointerEvents: 'all' }}
        >
            {children}
        </g>
    );

    return (
        <div className="w-full min-h-screen bg-slate-50 relative font-sans overflow-hidden">
            {/* HEADER */}
            <div className="absolute top-6 left-8 z-10 pointer-events-none">
                <h2 className="text-slate-400 text-sm font-semibold tracking-widest uppercase mb-1.5">
                    Ethica: De Servitute et Libertate
                </h2>
                <h3 className="text-slate-300 text-xs font-medium tracking-wider uppercase">
                    / From Bondage to Freedom Through Understanding
                </h3>
            </div>

            <div className="w-full max-w-[1600px] mx-auto aspect-[12/11] relative px-4">
                <svg viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`} preserveAspectRatio="xMidYMid meet" className="w-full h-full">
                    <defs>
                        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 L0,0" fill={colors.text.light} />
                        </marker>
                    </defs>

                    {/* Central Conatus */}
                    <InteractiveGroup onClick={() => handleNodeClick("Conatus", "The striving to persevere in being")}>
                        <ellipse cx="600" cy="100" rx="240" ry="70" fill={colors.conatus.fill} stroke={colors.conatus.stroke} strokeWidth="4" />
                        <text x="600" y="90" textAnchor="middle" fontSize="26" fontWeight="900" fill={colors.conatus.text} letterSpacing="1.5">
                            CONATUS
                        </text>
                        <text x="600" y="120" textAnchor="middle" fontSize="16" fill={colors.conatus.text} fontWeight="700" fontStyle="italic">
                            Striving to persevere = Essence (IIIP7)
                        </text>
                    </InteractiveGroup>

                    {/* Primary Affects */}
                    <line x1="600" y1="170" x2="240" y2="240" stroke={colors.text.light} strokeWidth="2" markerEnd="url(#arrow)" />
                    <line x1="600" y1="170" x2="600" y2="240" stroke={colors.text.light} strokeWidth="2" markerEnd="url(#arrow)" />
                    <line x1="600" y1="170" x2="960" y2="240" stroke={colors.text.light} strokeWidth="2" markerEnd="url(#arrow)" />

                    <InteractiveGroup transform="translate(120, 240)" onClick={() => handleNodeClick("Sadness", "Transition to lesser perfection")}>
                        <rect width="240" height="140" rx="8" fill={colors.sadness.fill} stroke={colors.sadness.stroke} strokeWidth="4" />
                        <text x="120" y="50" textAnchor="middle" fontSize="22" fontWeight="900" fill={colors.sadness.text} letterSpacing="1">SADNESS</text>
                        <text x="120" y="80" textAnchor="middle" fontSize="14" fill={colors.sadness.text} fontWeight="700">↓ Perfection</text>
                        <text x="120" y="105" textAnchor="middle" fontSize="14" fill={colors.sadness.text} fontWeight="700">External Cause</text>
                    </InteractiveGroup>

                    <InteractiveGroup transform="translate(480, 240)" onClick={() => handleNodeClick("Desire", "Appetite with consciousness")}>
                        <rect width="240" height="140" rx="8" fill={colors.desire.fill} stroke={colors.desire.stroke} strokeWidth="4" />
                        <text x="120" y="50" textAnchor="middle" fontSize="22" fontWeight="900" fill={colors.desire.text} letterSpacing="1">DESIRE</text>
                        <text x="120" y="80" textAnchor="middle" fontSize="14" fill={colors.desire.text} fontWeight="700">Appetite + Consciousness</text>
                        <text x="120" y="105" textAnchor="middle" fontSize="14" fill={colors.desire.text} fontWeight="700">Determined by Affects</text>
                    </InteractiveGroup>

                    <InteractiveGroup transform="translate(840, 240)" onClick={() => handleNodeClick("Joy", "Transition to greater perfection")}>
                        <rect width="240" height="140" rx="8" fill={colors.joy.fill} stroke={colors.joy.stroke} strokeWidth="4" />
                        <text x="120" y="50" textAnchor="middle" fontSize="22" fontWeight="900" fill={colors.joy.text} letterSpacing="1">JOY</text>
                        <text x="120" y="80" textAnchor="middle" fontSize="14" fill={colors.joy.text} fontWeight="700">↑ Perfection</text>
                        <text x="120" y="105" textAnchor="middle" fontSize="14" fill={colors.joy.text} fontWeight="700">Agreeable Cause</text>
                    </InteractiveGroup>

                    {/* Paths */}
                    <line x1="240" y1="380" x2="240" y2="450" stroke={colors.sadness.stroke} strokeWidth="2" strokeDasharray="6,6" />
                    <line x1="960" y1="380" x2="960" y2="450" stroke={colors.joy.stroke} strokeWidth="2" strokeDasharray="6,6" />

                    {/* Bondage Side */}
                    <InteractiveGroup transform="translate(30, 450)" onClick={() => handleNodeClick("Path of Bondage", "Slavery to passions")}>
                        <rect width="480" height="400" rx="8" fill={colors.bondage.fill} stroke={colors.bondage.stroke} strokeWidth="4" />
                        <text x="240" y="50" textAnchor="middle" fontSize="24" fontWeight="900" fill={colors.bondage.text} letterSpacing="1.5">
                            PATH OF BONDAGE
                        </text>

                        <g transform="translate(60, 90)">
                            <InteractiveGroup onClick={() => handleNodeClick("Inadequate Ideas", "Confused knowledge")}>
                                <rect width="360" height="70" rx="6" fill="white" stroke={colors.bondage.stroke} strokeWidth="2" />
                                <text x="180" y="30" textAnchor="middle" fontSize="18" fontWeight="900" fill={colors.bondage.text}>INADEQUATE IDEAS</text>
                                <text x="180" y="52" textAnchor="middle" fontSize="13" fill={colors.bondage.text} fontWeight="600">Confused • Partial • From external causes</text>
                            </InteractiveGroup>
                            <line x1="180" y1="70" x2="180" y2="100" stroke={colors.bondage.stroke} strokeWidth="2" markerEnd="url(#arrow)" />

                            <InteractiveGroup transform="translate(0, 100)" onClick={() => handleNodeClick("Passive Affects", "Passions we suffer")}>
                                <rect width="360" height="70" rx="6" fill="white" stroke={colors.bondage.stroke} strokeWidth="2" />
                                <text x="180" y="30" textAnchor="middle" fontSize="18" fontWeight="900" fill={colors.bondage.text}>PASSIVE AFFECTS</text>
                                <text x="180" y="52" textAnchor="middle" fontSize="13" fill={colors.bondage.text} fontWeight="600">Joy/Sadness from external • Love, Hate, Fear</text>
                            </InteractiveGroup>
                            <line x1="180" y1="170" x2="180" y2="200" stroke={colors.bondage.stroke} strokeWidth="2" markerEnd="url(#arrow)" />

                            <InteractiveGroup transform="translate(0, 200)" onClick={() => handleNodeClick("Bondage", "Human impotence")}>
                                <rect width="360" height="110" rx="6" fill={colors.sadness.fill} stroke={colors.sadness.stroke} strokeWidth="3" />
                                <text x="180" y="35" textAnchor="middle" fontSize="20" fontWeight="900" fill={colors.sadness.text} letterSpacing="1">BONDAGE</text>
                                <text x="180" y="62" textAnchor="middle" fontSize="14" fill={colors.sadness.text} fontWeight="700">• Determined by external causes</text>
                                <text x="180" y="85" textAnchor="middle" fontSize="14" fill={colors.sadness.text} fontWeight="700">• See better, do worse (IVPreface)</text>
                            </InteractiveGroup>
                        </g>
                    </InteractiveGroup>

                    {/* Freedom Side */}
                    <InteractiveGroup transform="translate(690, 450)" onClick={() => handleNodeClick("Path of Freedom", "Power of reason")}>
                        <rect width="480" height="400" rx="8" fill={colors.freedom.fill} stroke={colors.freedom.stroke} strokeWidth="4" />
                        <text x="240" y="50" textAnchor="middle" fontSize="24" fontWeight="900" fill={colors.freedom.text} letterSpacing="1.5">
                            PATH OF FREEDOM
                        </text>

                        <g transform="translate(60, 90)">
                            <InteractiveGroup onClick={() => handleNodeClick("Adequate Ideas", "Clear and distinct knowledge")}>
                                <rect width="360" height="70" rx="6" fill="white" stroke={colors.freedom.stroke} strokeWidth="2" />
                                <text x="180" y="30" textAnchor="middle" fontSize="18" fontWeight="900" fill={colors.freedom.text}>ADEQUATE IDEAS</text>
                                <text x="180" y="52" textAnchor="middle" fontSize="13" fill={colors.freedom.text} fontWeight="600">Clear & distinct • Complete • From our nature</text>
                            </InteractiveGroup>
                            <line x1="180" y1="70" x2="180" y2="100" stroke={colors.freedom.stroke} strokeWidth="2" markerEnd="url(#arrow)" />

                            <InteractiveGroup transform="translate(0, 100)" onClick={() => handleNodeClick("Active Affects", "Actions from reason")}>
                                <rect width="360" height="70" rx="6" fill="white" stroke={colors.freedom.stroke} strokeWidth="2" />
                                <text x="180" y="30" textAnchor="middle" fontSize="18" fontWeight="900" fill={colors.freedom.text}>ACTIVE AFFECTS</text>
                                <text x="180" y="52" textAnchor="middle" fontSize="13" fill={colors.freedom.text} fontWeight="600">Active joy/desire • Tenacity & Nobility</text>
                            </InteractiveGroup>
                            <line x1="180" y1="170" x2="180" y2="200" stroke={colors.freedom.stroke} strokeWidth="2" markerEnd="url(#arrow)" />

                            <InteractiveGroup transform="translate(0, 200)" onClick={() => handleNodeClick("Freedom", "Power of acting")}>
                                <rect width="360" height="110" rx="6" fill={colors.joy.fill} stroke={colors.joy.stroke} strokeWidth="3" />
                                <text x="180" y="35" textAnchor="middle" fontSize="20" fontWeight="900" fill={colors.joy.text} letterSpacing="1">FREEDOM</text>
                                <text x="180" y="62" textAnchor="middle" fontSize="14" fill={colors.joy.text} fontWeight="700">• Self-determined through knowledge</text>
                                <text x="180" y="85" textAnchor="middle" fontSize="14" fill={colors.joy.text} fontWeight="700">• Virtue = Power (IVd8)</text>
                            </InteractiveGroup>
                        </g>
                    </InteractiveGroup>

                    {/* Transformation arrow */}
                    <path d="M 510 650 L 690 650" stroke={colors.conatus.stroke} strokeWidth="3" markerEnd="url(#arrow)" strokeDasharray="6,3" />
                    <rect x="540" y="615" width="120" height="70" rx="6" fill={colors.conatus.fill} stroke={colors.conatus.stroke} strokeWidth="2" />
                    <text x="600" y="640" textAnchor="middle" fontSize="12" fontWeight="900" fill={colors.conatus.text}>TRANSFORM</text>
                    <text x="600" y="660" textAnchor="middle" fontSize="10" fill={colors.conatus.text} fontWeight="700">VP3: Clear idea</text>
                    <text x="600" y="675" textAnchor="middle" fontSize="10" fill={colors.conatus.text} fontWeight="700">passion → action</text>

                    {/* Bottom Note */}
                    <rect x="150" y="920" width="900" height="70" rx="6" fill={colors.neutral.fill} stroke={colors.neutral.stroke} strokeWidth="3" />
                    <text x="600" y="960" textAnchor="middle" fontSize="15" fill={colors.text.main} fontWeight="700">
                        Both paths are determined. Freedom ≠ Indetermination, but Self-Determination through Knowledge.
                    </text>
                </svg>
            </div>
        </div>
    );
};

export default AffectsDiagram;


