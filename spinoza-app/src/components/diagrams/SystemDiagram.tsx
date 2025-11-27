import React from 'react';
import { useSpinoza } from '@/context/SpinozaContext';

const SystemDiagram = () => {
    const { explainConcept } = useSpinoza();

    const handleNodeClick = (title: string, context: string) => {
        explainConcept(title, context);
    };

    const colors = {
        bg: "#f8fafc",
        meta: { fill: "#f3e8ff", stroke: "#7e22ce", text: "#581c87" },
        epist: { fill: "#e0e7ff", stroke: "#4338ca", text: "#312e81" },
        psych: { fill: "#fff7ed", stroke: "#ea580c", text: "#9a3412" },
        ethics: { fill: "#dcfce7", stroke: "#16a34a", text: "#14532d" },
        joy: { fill: "#dcfce7", stroke: "#16a34a", text: "#14532d" },
        sadness: { fill: "#fee2e2", stroke: "#dc2626", text: "#7f1d1d" },
        neutral: { fill: "#f1f5f9", stroke: "#94a3b8", text: "#475569" },
        bondage: { fill: "#fee2e2", stroke: "#dc2626", text: "#7f1d1d" },
        freedom: { fill: "#dcfce7", stroke: "#16a34a", text: "#14532d" }
    };

    const CANVAS_WIDTH = 1200;
    const CANVAS_HEIGHT = 1600;
    const LAYER_HEIGHT = 280;

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
                    Ethica: Totius Systematis Conspectus
                </h2>
                <h3 className="text-slate-300 text-xs font-medium tracking-wider uppercase">
                    / The Complete System View
                </h3>
            </div>

            <div className="w-full max-w-[1600px] mx-auto aspect-[12/16] relative px-4">
                <svg viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`} preserveAspectRatio="xMidYMid meet" className="w-full h-full">
                    <defs>
                        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 L0,0" fill={colors.neutral.stroke} />
                        </marker>
                        <marker id="arrowPurple" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 L0,0" fill="#845ef7" />
                        </marker>
                    </defs>

                    {/* Layer Backgrounds */}
                    <rect x="0" y="0" width={CANVAS_WIDTH} height={LAYER_HEIGHT} fill={colors.meta.fill} opacity="0.3" />
                    <rect x="0" y={LAYER_HEIGHT} width={CANVAS_WIDTH} height={LAYER_HEIGHT} fill={colors.epist.fill} opacity="0.3" />
                    <rect x="0" y={LAYER_HEIGHT * 2} width={CANVAS_WIDTH} height={LAYER_HEIGHT} fill={colors.psych.fill} opacity="0.3" />
                    <rect x="0" y={LAYER_HEIGHT * 3} width={CANVAS_WIDTH} height={CANVAS_HEIGHT - (LAYER_HEIGHT * 3)} fill={colors.bg} opacity="1" />

                    {/* Layer Labels */}
                    <text x="50" y="60" fontSize="24" fontWeight="900" fill={colors.meta.text} letterSpacing="1">METAPHYSICS</text>
                    <text x="50" y={LAYER_HEIGHT + 60} fontSize="24" fontWeight="900" fill={colors.epist.text} letterSpacing="1">EPISTEMOLOGY</text>
                    <text x="50" y={LAYER_HEIGHT * 2 + 60} fontSize="24" fontWeight="900" fill={colors.psych.text} letterSpacing="1">PSYCHOLOGY</text>

                    {/* Layer 1: Metaphysics */}
                    <InteractiveGroup transform={`translate(${CANVAS_WIDTH / 2 - 200}, 100)`} onClick={() => handleNodeClick("Substance", "God or Nature")}>
                        <ellipse cx="0" cy="0" rx="160" ry="60" fill={colors.meta.fill} stroke={colors.meta.stroke} strokeWidth="3" />
                        <text x="0" y="10" textAnchor="middle" fontSize="20" fontWeight="900" fill={colors.meta.text}>SUBSTANCE</text>
                        <text x="0" y="35" textAnchor="middle" fontSize="14" fill={colors.meta.text}>One God/Nature</text>
                    </InteractiveGroup>

                    <g transform={`translate(${CANVAS_WIDTH / 2 + 100}, 80)`}>
                        <rect width="180" height="60" rx="6" fill={colors.epist.fill} stroke={colors.epist.stroke} strokeWidth="2" />
                        <text x="90" y="35" textAnchor="middle" fontSize="16" fontWeight="bold" fill={colors.epist.text}>Thought</text>
                    </g>

                    <g transform={`translate(${CANVAS_WIDTH / 2 + 300}, 80)`}>
                        <rect width="180" height="60" rx="6" fill={colors.psych.fill} stroke={colors.psych.stroke} strokeWidth="2" />
                        <text x="90" y="35" textAnchor="middle" fontSize="16" fontWeight="bold" fill={colors.psych.text}>Extension</text>
                    </g>

                    {/* Layer 2: Epistemology */}
                    <g transform={`translate(100, ${LAYER_HEIGHT + 100})`}>
                        <InteractiveGroup onClick={() => handleNodeClick("Imagination", "First kind of knowledge")}>
                            <rect width="300" height="80" rx="8" fill={colors.sadness.fill} stroke={colors.sadness.stroke} strokeWidth="2" />
                            <text x="150" y="35" textAnchor="middle" fontSize="16" fontWeight="800" fill={colors.sadness.text}>1st Kind: IMAGINATION</text>
                            <text x="150" y="60" textAnchor="middle" fontSize="12" fill={colors.sadness.text}>Inadequate • Confused</text>
                        </InteractiveGroup>
                    </g>

                    <g transform={`translate(450, ${LAYER_HEIGHT + 100})`}>
                        <InteractiveGroup onClick={() => handleNodeClick("Reason", "Second kind of knowledge")}>
                            <rect width="300" height="80" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
                            <text x="150" y="35" textAnchor="middle" fontSize="16" fontWeight="800" fill="#92400e">2nd Kind: REASON</text>
                            <text x="150" y="60" textAnchor="middle" fontSize="12" fill="#92400e">Adequate • Common notions</text>
                        </InteractiveGroup>
                    </g>

                    <g transform={`translate(800, ${LAYER_HEIGHT + 100})`}>
                        <InteractiveGroup onClick={() => handleNodeClick("Intuition", "Third kind of knowledge")}>
                            <rect width="300" height="80" rx="8" fill={colors.joy.fill} stroke={colors.joy.stroke} strokeWidth="2" />
                            <text x="150" y="35" textAnchor="middle" fontSize="16" fontWeight="800" fill={colors.joy.text}>3rd Kind: INTUITION</text>
                            <text x="150" y="60" textAnchor="middle" fontSize="12" fill={colors.joy.text}>Adequate • Essence grasp</text>
                        </InteractiveGroup>
                    </g>

                    {/* Layer 3: Psychology */}
                    <InteractiveGroup transform={`translate(200, ${LAYER_HEIGHT * 2 + 100})`} onClick={() => handleNodeClick("Conatus", "Essence")}>
                        <ellipse cx="0" cy="0" rx="140" ry="50" fill={colors.psych.fill} stroke={colors.psych.stroke} strokeWidth="3" />
                        <text x="0" y="10" textAnchor="middle" fontSize="20" fontWeight="900" fill={colors.psych.text}>CONATUS</text>
                        <text x="0" y="35" textAnchor="middle" fontSize="14" fill={colors.psych.text}>Essence</text>
                    </InteractiveGroup>

                    <InteractiveGroup transform={`translate(450, ${LAYER_HEIGHT * 2 + 60})`} onClick={() => handleNodeClick("Passive Affects", "Passions")}>
                        <rect width="300" height="80" rx="8" fill={colors.sadness.fill} stroke={colors.sadness.stroke} strokeWidth="2" />
                        <text x="150" y="35" textAnchor="middle" fontSize="16" fontWeight="800" fill={colors.sadness.text}>PASSIVE AFFECTS</text>
                        <text x="150" y="60" textAnchor="middle" fontSize="12" fill={colors.sadness.text}>From inadequate ideas</text>
                    </InteractiveGroup>

                    <InteractiveGroup transform={`translate(800, ${LAYER_HEIGHT * 2 + 60})`} onClick={() => handleNodeClick("Active Affects", "Actions")}>
                        <rect width="300" height="80" rx="8" fill={colors.joy.fill} stroke={colors.joy.stroke} strokeWidth="2" />
                        <text x="150" y="35" textAnchor="middle" fontSize="16" fontWeight="800" fill={colors.joy.text}>ACTIVE AFFECTS</text>
                        <text x="150" y="60" textAnchor="middle" fontSize="12" fill={colors.joy.text}>From adequate ideas</text>
                    </InteractiveGroup>

                    {/* Layer 4: Ethics (Bondage & Liberation) */}
                    <g transform={`translate(50, ${LAYER_HEIGHT * 3 + 20})`}>
                        <rect width="520" height="600" rx="12" fill={colors.bondage.fill} stroke={colors.bondage.stroke} strokeWidth="3" />
                        <text x="260" y="40" textAnchor="middle" fontSize="20" fontWeight="900" fill={colors.bondage.text}>BONDAGE PATH</text>

                        {/* Inadequate Ideas */}
                        <rect x="60" y="60" width="400" height="80" rx="6" fill="#fca5a5" stroke={colors.bondage.stroke} strokeWidth="1" />
                        <text x="260" y="90" textAnchor="middle" fontSize="16" fontWeight="700" fill={colors.bondage.text}>Inadequate Ideas</text>
                        <text x="260" y="110" textAnchor="middle" fontSize="12" fill={colors.bondage.text}>Confused perception • External causes</text>

                        <line x1="260" y1="140" x2="260" y2="180" stroke={colors.bondage.stroke} strokeWidth="2" markerEnd="url(#arrow)" />

                        {/* Passions */}
                        <rect x="60" y="180" width="400" height="80" rx="6" fill="#f87171" stroke={colors.bondage.stroke} strokeWidth="1" />
                        <text x="260" y="210" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Passions</text>
                        <text x="260" y="230" textAnchor="middle" fontSize="12" fill="white">Determined by fortune • Fluctuating</text>

                        <line x1="260" y1="260" x2="260" y2="300" stroke={colors.bondage.stroke} strokeWidth="2" markerEnd="url(#arrow)" />

                        {/* Bondage */}
                        <rect x="60" y="300" width="400" height="120" rx="6" fill={colors.bondage.stroke} />
                        <text x="260" y="330" textAnchor="middle" fontSize="18" fontWeight="900" fill="white">BONDAGE</text>
                        <text x="260" y="355" textAnchor="middle" fontSize="12" fill="white">Weakness • See better, do worse</text>
                        <text x="260" y="375" textAnchor="middle" fontSize="12" fill="white">Slavery to transient goods</text>
                        <text x="260" y="395" textAnchor="middle" fontSize="12" fill="white">Suffering • Conflict</text>
                    </g>

                    <g transform={`translate(630, ${LAYER_HEIGHT * 3 + 20})`}>
                        <rect width="520" height="600" rx="12" fill={colors.freedom.fill} stroke={colors.freedom.stroke} strokeWidth="3" />
                        <text x="260" y="40" textAnchor="middle" fontSize="20" fontWeight="900" fill={colors.freedom.text}>LIBERATION PATH</text>

                        {/* Adequate Ideas */}
                        <rect x="60" y="60" width="400" height="80" rx="6" fill="#86efac" stroke={colors.freedom.stroke} strokeWidth="1" />
                        <text x="260" y="90" textAnchor="middle" fontSize="16" fontWeight="700" fill={colors.freedom.text}>Adequate Ideas</text>
                        <text x="260" y="110" textAnchor="middle" fontSize="12" fill={colors.freedom.text}>Clear & distinct • From our nature</text>

                        <line x1="260" y1="140" x2="260" y2="180" stroke={colors.freedom.stroke} strokeWidth="2" markerEnd="url(#arrow)" />

                        {/* Actions */}
                        <rect x="60" y="180" width="400" height="80" rx="6" fill="#4ade80" stroke={colors.freedom.stroke} strokeWidth="1" />
                        <text x="260" y="210" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Actions</text>
                        <text x="260" y="230" textAnchor="middle" fontSize="12" fill="white">Self-determined • Stable emotions</text>

                        <line x1="260" y1="260" x2="260" y2="300" stroke={colors.freedom.stroke} strokeWidth="2" markerEnd="url(#arrow)" />

                        {/* Virtue */}
                        <rect x="60" y="300" width="400" height="80" rx="6" fill={colors.freedom.stroke} />
                        <text x="260" y="330" textAnchor="middle" fontSize="18" fontWeight="900" fill="white">VIRTUE = POWER</text>
                        <text x="260" y="355" textAnchor="middle" fontSize="12" fill="white">Acting from reason • Self-determination</text>

                        <line x1="260" y1="380" x2="260" y2="420" stroke={colors.freedom.stroke} strokeWidth="2" markerEnd="url(#arrow)" />

                        {/* Blessedness */}
                        <g transform="translate(260, 460)">
                            <ellipse cx="0" cy="0" rx="160" ry="40" fill={colors.freedom.stroke} opacity="0.95" />
                            <text x="0" y="10" textAnchor="middle" fontSize="20" fontWeight="900" fill="white">BLESSEDNESS</text>
                        </g>
                    </g>

                    {/* Transformation Arrow */}
                    <path d={`M 570 ${LAYER_HEIGHT * 3 + 220} L 630 ${LAYER_HEIGHT * 3 + 220}`} stroke="#845ef7" strokeWidth="3" markerEnd="url(#arrowPurple)" />
                    <rect x="540" y={LAYER_HEIGHT * 3 + 180} width="120" height="30" rx="4" fill="#845ef7" />
                    <text x="600" y={LAYER_HEIGHT * 3 + 200} textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">TRANSFORM</text>

                    {/* Connections between layers */}
                    <line x1="400" y1="160" x2="250" y2={LAYER_HEIGHT + 140} stroke={colors.neutral.stroke} strokeWidth="2" strokeDasharray="6,4" opacity="0.5" />
                    <line x1="600" y1="160" x2="950" y2={LAYER_HEIGHT + 140} stroke={colors.neutral.stroke} strokeWidth="2" strokeDasharray="6,4" opacity="0.5" />

                </svg>
            </div>
        </div>
    );
};

export default SystemDiagram;
