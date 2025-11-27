import React from 'react';
import { useSpinoza } from '@/context/SpinozaContext';

const PowerDiagram = () => {
    const { explainConcept } = useSpinoza();

    const handleNodeClick = (title: string, context: string) => {
        explainConcept(title, context);
    };

    const colors = {
        bg: "#f8fafc",
        text: { main: "#1e293b", sub: "#475569", light: "#94a3b8" },
        power: { fill: "#f3e8ff", stroke: "#7e22ce", text: "#581c87" },
        affects: { fill: "#ffe4e6", stroke: "#be123c", text: "#881337" },
        knowledge: { fill: "#e0e7ff", stroke: "#4338ca", text: "#312e81" },
        virtue: { fill: "#dcfce7", stroke: "#16a34a", text: "#14532d" },
        bondage: { fill: "#f1f5f9", stroke: "#64748b", text: "#334155" },
        joy: { fill: "#dcfce7", stroke: "#16a34a", text: "#14532d" }
    };

    const CANVAS_WIDTH = 1200;
    const CANVAS_HEIGHT = 1000;

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
                    Ethica: Potentia et Virtus
                </h2>
                <h3 className="text-slate-300 text-xs font-medium tracking-wider uppercase">
                    / The Dynamics of Human Power
                </h3>
            </div>

            <div className="w-full max-w-[1600px] mx-auto aspect-[12/10] relative px-4">
                <svg viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`} preserveAspectRatio="xMidYMid meet" className="w-full h-full">
                    <defs>
                        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 L0,0" fill={colors.text.light} />
                        </marker>
                        <marker id="arrowVirtue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 L0,0" fill={colors.virtue.stroke} />
                        </marker>
                    </defs>

                    {/* God's Essence/Power */}
                    <InteractiveGroup transform={`translate(${CANVAS_WIDTH / 2}, 100)`} onClick={() => handleNodeClick("God's Power", "Infinite productive power")}>
                        <ellipse cx="0" cy="0" rx="240" ry="70" fill={colors.power.fill} stroke={colors.power.stroke} strokeWidth="4" />
                        <text x="0" y="10" textAnchor="middle" fontSize="24" fontWeight="900" fill={colors.power.text} letterSpacing="1">
                            GOD'S ESSENCE = POWER
                        </text>
                        <text x="0" y="35" textAnchor="middle" fontSize="14" fill={colors.power.text} fontWeight="600">
                            Infinite productive power (IP34)
                        </text>
                    </InteractiveGroup>

                    <line x1={CANVAS_WIDTH / 2} y1="170" x2={CANVAS_WIDTH / 2} y2="230" stroke={colors.power.stroke} strokeWidth="2" markerEnd="url(#arrow)" />

                    {/* Conatus */}
                    <InteractiveGroup transform={`translate(${CANVAS_WIDTH / 2}, 230)`} onClick={() => handleNodeClick("Conatus", "Striving to persevere")}>
                        <rect x="-180" y="0" width="360" height="100" rx="8" fill={colors.knowledge.fill} stroke={colors.knowledge.stroke} strokeWidth="3" />
                        <text x="0" y="45" textAnchor="middle" fontSize="24" fontWeight="900" fill={colors.knowledge.text} letterSpacing="1">
                            CONATUS
                        </text>
                        <text x="0" y="70" textAnchor="middle" fontSize="14" fill={colors.knowledge.text} fontWeight="600">
                            Essence = Striving (IIIP7)
                        </text>
                    </InteractiveGroup>

                    {/* Split to affects and knowledge */}
                    <line x1={CANVAS_WIDTH / 2 - 100} y1="330" x2="300" y2="400" stroke={colors.knowledge.stroke} strokeWidth="2" markerEnd="url(#arrow)" />
                    <line x1={CANVAS_WIDTH / 2 + 100} y1="330" x2="900" y2="400" stroke={colors.knowledge.stroke} strokeWidth="2" markerEnd="url(#arrow)" />

                    {/* Affects branch */}
                    <g transform="translate(100, 400)">
                        <InteractiveGroup onClick={() => handleNodeClick("Affects", "Transitions in power")}>
                            <rect width="400" height="180" rx="8" fill={colors.affects.fill} stroke={colors.affects.stroke} strokeWidth="3" />
                            <text x="200" y="40" textAnchor="middle" fontSize="22" fontWeight="900" fill={colors.affects.text}>AFFECTS</text>
                            <text x="200" y="65" textAnchor="middle" fontSize="14" fill={colors.affects.text} fontWeight="600">Transitions in power</text>
                        </InteractiveGroup>

                        <g transform="translate(30, 85)">
                            <rect width="160" height="80" rx="6" fill={colors.virtue.fill} stroke={colors.virtue.stroke} strokeWidth="2" />
                            <text x="80" y="35" textAnchor="middle" fontSize="16" fontWeight="800" fill={colors.virtue.text}>JOY</text>
                            <text x="80" y="55" textAnchor="middle" fontSize="12" fill={colors.virtue.text}>↑ Power</text>
                        </g>

                        <g transform="translate(210, 85)">
                            <rect width="160" height="80" rx="6" fill={colors.affects.fill} stroke={colors.affects.stroke} strokeWidth="2" />
                            <text x="80" y="35" textAnchor="middle" fontSize="16" fontWeight="800" fill={colors.affects.text}>SADNESS</text>
                            <text x="80" y="55" textAnchor="middle" fontSize="12" fill={colors.affects.text}>↓ Power</text>
                        </g>
                    </g>

                    {/* Knowledge branch */}
                    <g transform="translate(700, 400)">
                        <InteractiveGroup onClick={() => handleNodeClick("Knowledge", "Degrees of understanding")}>
                            <rect width="400" height="180" rx="8" fill={colors.knowledge.fill} stroke={colors.knowledge.stroke} strokeWidth="3" />
                            <text x="200" y="40" textAnchor="middle" fontSize="22" fontWeight="900" fill={colors.knowledge.text}>KNOWLEDGE</text>
                            <text x="200" y="65" textAnchor="middle" fontSize="14" fill={colors.knowledge.text} fontWeight="600">Degrees of understanding</text>
                        </InteractiveGroup>

                        <g transform="translate(20, 85)">
                            <rect width="110" height="80" rx="6" fill={colors.affects.fill} stroke={colors.affects.stroke} strokeWidth="2" />
                            <text x="55" y="30" textAnchor="middle" fontSize="12" fontWeight="800" fill={colors.affects.text}>Inadequate</text>
                            <text x="55" y="50" textAnchor="middle" fontSize="10" fill={colors.affects.text}>Imagination</text>
                            <text x="55" y="65" textAnchor="middle" fontSize="10" fill={colors.affects.text}>↓ Power</text>
                        </g>

                        <g transform="translate(145, 85)">
                            <rect width="110" height="80" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
                            <text x="55" y="30" textAnchor="middle" fontSize="12" fontWeight="800" fill="#92400e">Adequate</text>
                            <text x="55" y="50" textAnchor="middle" fontSize="10" fill="#92400e">Reason</text>
                            <text x="55" y="65" textAnchor="middle" fontSize="10" fill="#92400e">↑ Power</text>
                        </g>

                        <g transform="translate(270, 85)">
                            <rect width="110" height="80" rx="6" fill={colors.virtue.fill} stroke={colors.virtue.stroke} strokeWidth="2" />
                            <text x="55" y="30" textAnchor="middle" fontSize="12" fontWeight="800" fill={colors.virtue.text}>Adequate</text>
                            <text x="55" y="50" textAnchor="middle" fontSize="10" fill={colors.virtue.text}>Intuition</text>
                            <text x="55" y="65" textAnchor="middle" fontSize="10" fill={colors.virtue.text}>↑↑ Power</text>
                        </g>
                    </g>

                    {/* Converge to Virtue */}
                    <line x1="300" y1="580" x2="500" y2="660" stroke={colors.virtue.stroke} strokeWidth="2" markerEnd="url(#arrowVirtue)" />
                    <line x1="900" y1="580" x2="700" y2="660" stroke={colors.virtue.stroke} strokeWidth="2" markerEnd="url(#arrowVirtue)" />

                    <InteractiveGroup transform={`translate(${CANVAS_WIDTH / 2}, 660)`} onClick={() => handleNodeClick("Virtue", "Power of acting")}>
                        <rect x="-200" y="0" width="400" height="120" rx="8" fill={colors.virtue.fill} stroke={colors.virtue.stroke} strokeWidth="3" />
                        <text x="0" y="50" textAnchor="middle" fontSize="24" fontWeight="900" fill={colors.virtue.text} letterSpacing="1">
                            VIRTUE = POWER
                        </text>
                        <text x="0" y="80" textAnchor="middle" fontSize="14" fill={colors.virtue.text} fontWeight="600">
                            Acting from reason (IVD8)
                        </text>
                    </InteractiveGroup>

                    <line x1={CANVAS_WIDTH / 2} y1="780" x2={CANVAS_WIDTH / 2} y2="840" stroke={colors.virtue.stroke} strokeWidth="3" markerEnd="url(#arrowVirtue)" />

                    {/* Blessedness */}
                    <InteractiveGroup transform={`translate(${CANVAS_WIDTH / 2}, 840)`} onClick={() => handleNodeClick("Blessedness", "Virtue itself")}>
                        <ellipse cx="0" cy="40" rx="240" ry="60" fill={colors.virtue.stroke} stroke={colors.virtue.text} strokeWidth="3" />
                        <text x="0" y="45" textAnchor="middle" fontSize="24" fontWeight="900" fill="white" letterSpacing="1">
                            BLESSEDNESS
                        </text>
                        <text x="0" y="70" textAnchor="middle" fontSize="14" fill="white" fontWeight="600">
                            Virtue itself (VP42)
                        </text>
                    </InteractiveGroup>

                    {/* Side boxes */}
                    <g transform="translate(100, 700)">
                        <rect width="300" height="160" rx="8" fill={colors.bg} stroke={colors.text.light} strokeWidth="2" />
                        <text x="150" y="40" textAnchor="middle" fontSize="18" fontWeight="800" fill={colors.text.main}>THE POWER EQUATION</text>
                        <text x="150" y="70" textAnchor="middle" fontSize="14" fill={colors.text.sub}>More adequate ideas</text>
                        <text x="150" y="95" textAnchor="middle" fontSize="14" fill={colors.text.sub}>= More power = More virtue</text>
                        <text x="150" y="120" textAnchor="middle" fontSize="14" fill={colors.text.sub}>= More joy = Blessedness</text>
                    </g>

                    <g transform="translate(800, 700)">
                        <rect width="300" height="160" rx="8" fill={colors.bg} stroke={colors.text.light} strokeWidth="2" />
                        <text x="150" y="40" textAnchor="middle" fontSize="18" fontWeight="800" fill={colors.text.main}>INTELLECTUAL LOVE</text>
                        <text x="150" y="70" textAnchor="middle" fontSize="14" fill={colors.text.sub}>VP32c: Joy from third kind</text>
                        <text x="150" y="95" textAnchor="middle" fontSize="14" fill={colors.text.sub}>of knowledge + idea of God</text>
                        <text x="150" y="120" textAnchor="middle" fontSize="14" fill={colors.text.sub}>VP36: Mind's love = God's love</text>
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default PowerDiagram;
