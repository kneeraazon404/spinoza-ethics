import React from 'react';
import { useSpinoza } from '@/context/SpinozaContext';

const InteractiveGroup = ({
    children,
    onClick,
    className = "cursor-pointer transition-all duration-300 hover:opacity-80",
    transform
}: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    transform?: string;
}) => (
    <g
        onClick={onClick}
        className={className}
        transform={transform}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                onClick?.();
            }
        }}
    >
        {children}
    </g>
);

const PowerDiagram = () => {
    const { explainConcept } = useSpinoza();

    const handleNodeClick = (title: string, context: string) => {
        explainConcept(title, context);
    };

    const CANVAS_WIDTH = 1200;
    const CANVAS_HEIGHT = 1000;

    // Standardized Palette
    const C = {
        bg: "#ffffff",
        god: { stroke: "#a855f7", fill: "#f3e8ff", text: "#6b21a8" }, // Purple
        mind: { stroke: "#4f46e5", fill: "#e0e7ff", text: "#312e81" }, // Indigo
        affects: { stroke: "#db2777", fill: "#fce7f3", text: "#831843" }, // Pink
        bondage: { stroke: "#ea580c", fill: "#ffedd5", text: "#9a3412" }, // Orange
        freedom: { stroke: "#059669", fill: "#d1fae5", text: "#065f46" }, // Emerald
        text: { primary: "#1f2937", secondary: "#4b5563", muted: "#94a3b8" }
    };

    return (
        <div className="w-full min-h-screen relative font-sans overflow-hidden" style={{ backgroundColor: C.bg }}>
            {/* HEADER */}
            <div className="absolute top-4 left-8 z-10 pointer-events-none">
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
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                        </pattern>

                        {/* Soft Shadow */}
                        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                            <feOffset dx="2" dy="3" result="offsetblur" />
                            <feComponentTransfer>
                                <feFuncA type="linear" slope="0.1" />
                            </feComponentTransfer>
                            <feMerge>
                                <feMergeNode />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        {/* Gradients */}
                        <linearGradient id="gradPower" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={C.god.fill} />
                            <stop offset="100%" stopColor="#d8b4fe" />
                        </linearGradient>
                        <linearGradient id="gradConatus" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={C.mind.fill} />
                            <stop offset="100%" stopColor="#c7d2fe" />
                        </linearGradient>
                        <linearGradient id="gradAffects" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={C.affects.fill} />
                            <stop offset="100%" stopColor="#fbcfe8" />
                        </linearGradient>
                        <linearGradient id="gradJoy" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={C.freedom.fill} />
                            <stop offset="100%" stopColor="#bbf7d0" />
                        </linearGradient>
                        <linearGradient id="gradSadness" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={C.bondage.fill} />
                            <stop offset="100%" stopColor="#fed7aa" />
                        </linearGradient>
                        <linearGradient id="gradKnowledge" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={C.mind.fill} />
                            <stop offset="100%" stopColor="#c7d2fe" />
                        </linearGradient>
                        <linearGradient id="gradInadequate" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={C.bondage.fill} />
                            <stop offset="100%" stopColor="#fed7aa" />
                        </linearGradient>
                        <linearGradient id="gradReason" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#fef3c7" />
                            <stop offset="100%" stopColor="#fde68a" />
                        </linearGradient>
                        <linearGradient id="gradIntuition" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={C.freedom.fill} />
                            <stop offset="100%" stopColor="#bbf7d0" />
                        </linearGradient>
                        <linearGradient id="gradVirtue" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={C.freedom.fill} />
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

                        <marker id="arrow" markerWidth="5" markerHeight="3" refX="4" refY="1.5" orient="auto">
                            <path d="M0,0 L5,1.5 L0,3 L0,0" fill="#94a3b8" />
                        </marker>
                        <marker id="arrowVirtue" markerWidth="5" markerHeight="3" refX="4" refY="1.5" orient="auto">
                            <path d="M0,0 L5,1.5 L0,3 L0,0" fill={C.freedom.stroke} />
                        </marker>
                    </defs>

                    {/* Background Grid */}
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Title */}
                    <text x={CANVAS_WIDTH / 2} y="25" textAnchor="middle" fontSize="22" fontWeight="800" fill={C.text.primary} letterSpacing="0.5">
                        From Conatus to Blessedness: The Power Equation
                    </text>

                    {/* God's Essence/Power */}
                    <InteractiveGroup transform={`translate(${CANVAS_WIDTH / 2}, 120)`} onClick={() => handleNodeClick("God's Power", "Infinite productive power")}>
                        <rect x="-240" y="-70" width="480" height="140" rx="8" fill="url(#gradPower)" fillOpacity="0.9" stroke={C.god.stroke} strokeWidth="3" filter="url(#softShadow)" />
                        <text x="0" y="10" textAnchor="middle" fontSize="20" fontWeight="800" letterSpacing="1" fill={C.god.text}>
                            GOD&apos;S ESSENCE = GOD&apos;S POWER
                        </text>
                        <text x="0" y="35" textAnchor="middle" fontSize="14" fontWeight="600" fontStyle="italic" fill={C.god.text}>
                            Infinite productive power (IP34)
                        </text>
                    </InteractiveGroup>

                    <path d={`M ${CANVAS_WIDTH / 2} 190 C ${CANVAS_WIDTH / 2} 210, ${CANVAS_WIDTH / 2} 230, ${CANVAS_WIDTH / 2} 250`} stroke={C.god.stroke} strokeWidth="2" fill="none" opacity="0.8" markerEnd="url(#arrow)" />

                    {/* Conatus */}
                    <InteractiveGroup transform={`translate(${CANVAS_WIDTH / 2}, 250)`} onClick={() => handleNodeClick("Conatus", "Striving to persevere")}>
                        <rect x="-180" y="0" width="360" height="100" rx="8" fill="url(#gradConatus)" stroke={C.mind.stroke} strokeWidth="2" filter="url(#softShadow)" />
                        <text x="0" y="35" textAnchor="middle" fontSize="18" fontWeight="800" letterSpacing="1" fill={C.mind.text}>
                            CONATUS
                        </text>
                        <text x="0" y="57" textAnchor="middle" fontSize="14" fontWeight="600" fill={C.mind.text}>
                            Each thing&apos;s striving = its essence (IIIP7)
                        </text>
                        <text x="0" y="75" textAnchor="middle" fontSize="12" fontWeight="500" fontStyle="italic" fill={C.mind.text}>
                            Finite expression of God&apos;s power
                        </text>
                    </InteractiveGroup>

                    {/* Split to affects and knowledge */}
                    <path d={`M ${CANVAS_WIDTH / 2 - 100} 350 C ${CANVAS_WIDTH / 2 - 100} 380, 300 380, 300 420`} stroke={C.mind.stroke} strokeWidth="2" fill="none" opacity="0.8" markerEnd="url(#arrow)" />
                    <path d={`M ${CANVAS_WIDTH / 2 + 100} 350 C ${CANVAS_WIDTH / 2 + 100} 380, 900 380, 900 420`} stroke={C.mind.stroke} strokeWidth="2" fill="none" opacity="0.8" markerEnd="url(#arrow)" />

                    {/* Affects branch */}
                    <g transform="translate(100, 420)">
                        <InteractiveGroup onClick={() => handleNodeClick("Affects", "Transitions in power")}>
                            <rect width="400" height="180" rx="8" fill="url(#gradAffects)" stroke={C.affects.stroke} strokeWidth="2" filter="url(#softShadow)" />
                            <text x="200" y="40" textAnchor="middle" fontSize="18" fontWeight="800" letterSpacing="1" fill={C.affects.text}>AFFECTS</text>
                            <text x="200" y="65" textAnchor="middle" fontSize="14" fontWeight="600" fill={C.affects.text}>Transitions in power</text>
                        </InteractiveGroup>

                        <g transform="translate(30, 85)">
                            <rect width="160" height="80" rx="8" fill="url(#gradJoy)" stroke={C.freedom.stroke} strokeWidth="1.5" filter="url(#softShadow)" />
                            <text x="80" y="30" textAnchor="middle" fontSize="14" fontWeight="800" fill={C.freedom.text}>JOY</text>
                            <text x="80" y="48" textAnchor="middle" fontSize="12" fontWeight="600" fill={C.freedom.text}>↑ Power</text>
                            <text x="80" y="62" textAnchor="middle" fontSize="10" fontWeight="500" fill={C.freedom.text}>Greater perfection</text>
                        </g>

                        <g transform="translate(210, 85)">
                            <rect width="160" height="80" rx="8" fill="url(#gradSadness)" stroke={C.bondage.stroke} strokeWidth="1.5" filter="url(#softShadow)" />
                            <text x="80" y="30" textAnchor="middle" fontSize="14" fontWeight="800" fill={C.bondage.text}>SADNESS</text>
                            <text x="80" y="48" textAnchor="middle" fontSize="12" fontWeight="600" fill={C.bondage.text}>↓ Power</text>
                            <text x="80" y="62" textAnchor="middle" fontSize="10" fontWeight="500" fill={C.bondage.text}>Lesser perfection</text>
                        </g>
                    </g>

                    {/* Knowledge branch */}
                    <g transform="translate(700, 420)">
                        <InteractiveGroup onClick={() => handleNodeClick("Knowledge", "Degrees of understanding")}>
                            <rect width="400" height="180" rx="8" fill="url(#gradKnowledge)" stroke={C.mind.stroke} strokeWidth="2" filter="url(#softShadow)" />
                            <text x="200" y="40" textAnchor="middle" fontSize="18" fontWeight="800" letterSpacing="1" fill={C.mind.text}>KNOWLEDGE</text>
                            <text x="200" y="65" textAnchor="middle" fontSize="14" fontWeight="600" fill={C.mind.text}>Degrees of understanding</text>
                        </InteractiveGroup>

                        <g transform="translate(20, 85)">
                            <rect width="110" height="80" rx="8" fill="url(#gradInadequate)" stroke={C.bondage.stroke} strokeWidth="1.5" filter="url(#softShadow)" />
                            <text x="55" y="30" textAnchor="middle" fontSize="12" fontWeight="800" fill={C.bondage.text}>Inadequate</text>
                            <text x="55" y="50" textAnchor="middle" fontSize="10" fontWeight="600" fill={C.bondage.text}>Imagination</text>
                            <text x="55" y="65" textAnchor="middle" fontSize="10" fontWeight="600" fill={C.bondage.text}>↓ Power</text>
                        </g>

                        <g transform="translate(145, 85)">
                            <rect width="110" height="80" rx="8" fill="url(#gradReason)" stroke="#d97706" strokeWidth="1.5" filter="url(#softShadow)" />
                            <text x="55" y="30" textAnchor="middle" fontSize="12" fontWeight="800" fill="#92400e">Adequate</text>
                            <text x="55" y="50" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">Reason</text>
                            <text x="55" y="65" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">↑ Power</text>
                        </g>

                        <g transform="translate(270, 85)">
                            <rect width="110" height="80" rx="8" fill="url(#gradIntuition)" stroke={C.freedom.stroke} strokeWidth="1.5" filter="url(#softShadow)" />
                            <text x="55" y="30" textAnchor="middle" fontSize="12" fontWeight="800" fill={C.freedom.text}>Adequate</text>
                            <text x="55" y="50" textAnchor="middle" fontSize="10" fontWeight="600" fill={C.freedom.text}>Intuition</text>
                            <text x="55" y="65" textAnchor="middle" fontSize="10" fontWeight="600" fill={C.freedom.text}>↑↑ Power</text>
                        </g>
                    </g>

                    {/* Converge to Virtue */}
                    <path d="M 300 600 C 300 640, 500 640, 500 680" stroke={C.freedom.stroke} strokeWidth="2" fill="none" opacity="0.8" markerEnd="url(#arrowVirtue)" />
                    <path d="M 900 600 C 900 640, 700 640, 700 680" stroke={C.freedom.stroke} strokeWidth="2" fill="none" opacity="0.8" markerEnd="url(#arrowVirtue)" />

                    <InteractiveGroup transform={`translate(${CANVAS_WIDTH / 2}, 680)`} onClick={() => handleNodeClick("Virtue", "Power of acting")}>
                        <rect x="-200" y="0" width="400" height="120" rx="8" fill="url(#gradVirtue)" stroke={C.freedom.stroke} strokeWidth="2" filter="url(#softShadow)" />
                        <text x="0" y="40" textAnchor="middle" fontSize="18" fontWeight="800" letterSpacing="1" fill={C.freedom.text}>
                            VIRTUE = POWER
                        </text>
                        <text x="0" y="65" textAnchor="middle" fontSize="14" fontWeight="600" fill={C.freedom.text}>
                            Acting from reason = Self-determination (IVD8)
                        </text>
                        <text x="0" y="85" textAnchor="middle" fontSize="12" fontWeight="500" fontStyle="italic" fill={C.freedom.text}>
                            Maximum capacity to exist and act
                        </text>
                    </InteractiveGroup>

                    <path d={`M ${CANVAS_WIDTH / 2} 800 C ${CANVAS_WIDTH / 2} 820, ${CANVAS_WIDTH / 2} 840, ${CANVAS_WIDTH / 2} 860`} stroke={C.freedom.stroke} strokeWidth="2" fill="none" opacity="0.8" markerEnd="url(#arrowVirtue)" />

                    {/* Blessedness */}
                    <InteractiveGroup transform={`translate(${CANVAS_WIDTH / 2}, 860)`} onClick={() => handleNodeClick("Blessedness", "Virtue itself")}>
                        <rect x="-240" y="-20" width="480" height="120" rx="8" fill="url(#gradBlessedness)" stroke="#14532d" strokeWidth="2" filter="url(#softShadow)" />
                        <text x="0" y="45" textAnchor="middle" fontSize="20" fontWeight="800" letterSpacing="1" fill="white">
                            BLESSEDNESS
                        </text>
                        <text x="0" y="70" textAnchor="middle" fontSize="14" fontWeight="600" fill="white">
                            Not reward for virtue, but virtue itself (VP42)
                        </text>
                    </InteractiveGroup>

                    {/* Side boxes */}
                    <g transform="translate(100, 720)">
                        <rect width="300" height="160" rx="8" fill="url(#gradBox)" stroke="#94a3b8" strokeWidth="1.5" />
                        <text x="150" y="40" textAnchor="middle" fontSize="16" fontWeight="800" fill={C.text.primary}>THE POWER EQUATION</text>
                        <text x="150" y="70" textAnchor="middle" fontSize="14" fontWeight="500" fill={C.text.secondary}>More adequate ideas</text>
                        <text x="150" y="95" textAnchor="middle" fontSize="14" fontWeight="500" fill={C.text.secondary}>= More power = More virtue</text>
                        <text x="150" y="120" textAnchor="middle" fontSize="14" fontWeight="500" fill={C.text.secondary}>= More joy</text>
                        <text x="150" y="140" textAnchor="middle" fontSize="14" fontWeight="500" fill={C.text.secondary}>= More blessedness</text>
                    </g>

                    <g transform="translate(800, 720)">
                        <rect width="300" height="160" rx="8" fill="url(#gradBox)" stroke="#94a3b8" strokeWidth="1.5" />
                        <text x="150" y="40" textAnchor="middle" fontSize="16" fontWeight="800" fill={C.text.primary}>INTELLECTUAL LOVE</text>
                        <text x="150" y="70" textAnchor="middle" fontSize="14" fontWeight="500" fill={C.text.secondary}>VP32c: Joy from third kind</text>
                        <text x="150" y="95" textAnchor="middle" fontSize="14" fontWeight="500" fill={C.text.secondary}>of knowledge + idea of God</text>
                        <text x="150" y="120" textAnchor="middle" fontSize="14" fontWeight="500" fill={C.text.secondary}>VP36: Mind&apos;s love =</text>
                        <text x="150" y="140" textAnchor="middle" fontSize="14" fontWeight="500" fill={C.text.secondary}>God&apos;s self-love</text>
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default PowerDiagram;
