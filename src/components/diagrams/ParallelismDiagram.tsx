import React from 'react';
import { useSpinoza } from '@/context/SpinozaContext';

const ParallelismDiagram = () => {
    const { explainConcept } = useSpinoza();

    const handleNodeClick = (title: string, context: string) => {
        explainConcept(title, context);
    };

    const colors = {
        bg: "#f8fafc",
        text: { main: "#1e293b", sub: "#475569", light: "#94a3b8" },
        thought: { fill: "#e0e7ff", stroke: "#4338ca", text: "#312e81" },
        extension: { fill: "#ffe4e6", stroke: "#be123c", text: "#881337" },
        substance: { fill: "#f3e8ff", stroke: "#7e22ce", text: "#581c87" },
        neutral: { fill: "#f1f5f9", stroke: "#94a3b8", text: "#475569" },
        parallelism: { stroke: "#ec4899", text: "#be185d", fill: "#fce7f3" }
    };

    const CANVAS_WIDTH = 1400;
    const CANVAS_HEIGHT = 1100;
    const COLUMN_WIDTH = 480;

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
                    Ethica: Ordo et Connexio
                </h2>
                <h3 className="text-slate-300 text-xs font-medium tracking-wider uppercase">
                    / Mind-Body Parallelism: One Thing, Two Ways
                </h3>
            </div>

            <div className="w-full max-w-[1600px] mx-auto aspect-[14/11] relative px-4">
                <svg viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`} preserveAspectRatio="xMidYMid meet" className="w-full h-full">
                    <defs>
                        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 L0,0" fill={colors.text.light} />
                        </marker>
                        <marker id="arrowThought" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 L0,0" fill={colors.thought.stroke} />
                        </marker>
                        <marker id="arrowExtension" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 L0,0" fill={colors.extension.stroke} />
                        </marker>
                    </defs>

                    {/* Substance at Top */}
                    <InteractiveGroup onClick={() => handleNodeClick("Substance", "God or Nature")}>
                        <ellipse cx={CANVAS_WIDTH / 2} cy="80" rx="240" ry="70" fill={colors.substance.fill} stroke={colors.substance.stroke} strokeWidth="4" />
                        <text x={CANVAS_WIDTH / 2} y="75" textAnchor="middle" fontSize="28" fontWeight="900" fill={colors.substance.text} letterSpacing="1.5">
                            SUBSTANCE
                        </text>
                        <text x={CANVAS_WIDTH / 2} y="105" textAnchor="middle" fontSize="16" fill={colors.substance.text} fontWeight="600" fontStyle="italic">
                            One Infinite Reality
                        </text>
                    </InteractiveGroup>

                    {/* Attributes */}
                    <line x1={CANVAS_WIDTH / 2} y1="150" x2="340" y2="220" stroke={colors.text.light} strokeWidth="2" markerEnd="url(#arrow)" />
                    <line x1={CANVAS_WIDTH / 2} y1="150" x2="1060" y2="220" stroke={colors.text.light} strokeWidth="2" markerEnd="url(#arrow)" />

                    <InteractiveGroup transform="translate(100, 220)" onClick={() => handleNodeClick("Attribute of Thought", "Mental expression of substance")}>
                        <rect width={COLUMN_WIDTH} height="120" rx="8" fill={colors.thought.fill} stroke={colors.thought.stroke} strokeWidth="4" />
                        <text x={COLUMN_WIDTH / 2} y="50" textAnchor="middle" fontSize="24" fontWeight="900" fill={colors.thought.text} letterSpacing="1">ATTRIBUTE OF THOUGHT</text>
                        <text x={COLUMN_WIDTH / 2} y="80" textAnchor="middle" fontSize="16" fill={colors.thought.text} fontWeight="600">GOD as Thinking Thing</text>
                    </InteractiveGroup>

                    <InteractiveGroup transform="translate(820, 220)" onClick={() => handleNodeClick("Attribute of Extension", "Physical expression of substance")}>
                        <rect width={COLUMN_WIDTH} height="120" rx="8" fill={colors.extension.fill} stroke={colors.extension.stroke} strokeWidth="4" />
                        <text x={COLUMN_WIDTH / 2} y="50" textAnchor="middle" fontSize="24" fontWeight="900" fill={colors.extension.text} letterSpacing="1">ATTRIBUTE OF EXTENSION</text>
                        <text x={COLUMN_WIDTH / 2} y="80" textAnchor="middle" fontSize="16" fill={colors.extension.text} fontWeight="600">GOD as Extended Thing</text>
                    </InteractiveGroup>

                    {/* Infinite Modes */}
                    <line x1="340" y1="340" x2="340" y2="400" stroke={colors.thought.stroke} strokeWidth="2" markerEnd="url(#arrowThought)" />
                    <line x1="1060" y1="340" x2="1060" y2="400" stroke={colors.extension.stroke} strokeWidth="2" markerEnd="url(#arrowExtension)" />

                    <InteractiveGroup transform="translate(160, 400)" onClick={() => handleNodeClick("Infinite Intellect", "Infinite mode of thought")}>
                        <rect width="360" height="80" rx="6" fill="white" stroke={colors.thought.stroke} strokeWidth="2" strokeDasharray="8,4" />
                        <text x="180" y="35" textAnchor="middle" fontSize="18" fontWeight="800" fill={colors.thought.text}>Infinite Immediate Mode</text>
                        <text x="180" y="58" textAnchor="middle" fontSize="14" fill={colors.thought.text}>(Infinite Intellect, Laws of Thought)</text>
                    </InteractiveGroup>

                    <InteractiveGroup transform="translate(880, 400)" onClick={() => handleNodeClick("Motion and Rest", "Infinite mode of extension")}>
                        <rect width="360" height="80" rx="6" fill="white" stroke={colors.extension.stroke} strokeWidth="2" strokeDasharray="8,4" />
                        <text x="180" y="35" textAnchor="middle" fontSize="18" fontWeight="800" fill={colors.extension.text}>Infinite Immediate Mode</text>
                        <text x="180" y="58" textAnchor="middle" fontSize="14" fill={colors.extension.text}>(Motion & Rest, Laws of Physics)</text>
                    </InteractiveGroup>

                    {/* Causal Chains */}
                    <line x1="340" y1="480" x2="340" y2="540" stroke={colors.thought.stroke} strokeWidth="2" markerEnd="url(#arrowThought)" />
                    <line x1="1060" y1="480" x2="1060" y2="540" stroke={colors.extension.stroke} strokeWidth="2" markerEnd="url(#arrowExtension)" />

                    <InteractiveGroup transform="translate(160, 540)" onClick={() => handleNodeClick("Causal Chains of Ideas", "Mediate infinite mode of thought")}>
                        <rect width="360" height="60" rx="6" fill={colors.thought.fill} stroke={colors.thought.stroke} strokeWidth="2" />
                        <text x="180" y="35" textAnchor="middle" fontSize="16" fontWeight="700" fill={colors.thought.text}>Causal Chains of Ideas</text>
                    </InteractiveGroup>

                    <InteractiveGroup transform="translate(880, 540)" onClick={() => handleNodeClick("Causal Chains of Bodies", "Mediate infinite mode of extension")}>
                        <rect width="360" height="60" rx="6" fill={colors.extension.fill} stroke={colors.extension.stroke} strokeWidth="2" />
                        <text x="180" y="35" textAnchor="middle" fontSize="16" fontWeight="700" fill={colors.extension.text}>Causal Chains of Bodies</text>
                    </InteractiveGroup>

                    {/* Finite Modes */}
                    <line x1="340" y1="600" x2="340" y2="660" stroke={colors.thought.stroke} strokeWidth="2" markerEnd="url(#arrowThought)" />
                    <line x1="1060" y1="600" x2="1060" y2="660" stroke={colors.extension.stroke} strokeWidth="2" markerEnd="url(#arrowExtension)" />

                    <InteractiveGroup transform="translate(100, 660)" onClick={() => handleNodeClick("Finite Modes of Thought", "Individual ideas")}>
                        <rect width={COLUMN_WIDTH} height="120" rx="8" fill={colors.thought.fill} stroke={colors.thought.stroke} strokeWidth="3" />
                        <text x={COLUMN_WIDTH / 2} y="35" textAnchor="middle" fontSize="20" fontWeight="900" fill={colors.thought.text}>Finite Ideas</text>
                        <text x={COLUMN_WIDTH / 2} y="60" textAnchor="middle" fontSize="14" fill={colors.thought.text}>Idea₁ → Idea₂ → Idea₃ → ...</text>
                        <text x={COLUMN_WIDTH / 2} y="85" textAnchor="middle" fontSize="14" fill={colors.thought.text} fontStyle="italic">Mental causation complete within thought</text>
                    </InteractiveGroup>

                    <InteractiveGroup transform="translate(820, 660)" onClick={() => handleNodeClick("Finite Modes of Extension", "Individual bodies")}>
                        <rect width={COLUMN_WIDTH} height="120" rx="8" fill={colors.extension.fill} stroke={colors.extension.stroke} strokeWidth="3" />
                        <text x={COLUMN_WIDTH / 2} y="35" textAnchor="middle" fontSize="20" fontWeight="900" fill={colors.extension.text}>Finite Bodies</text>
                        <text x={COLUMN_WIDTH / 2} y="60" textAnchor="middle" fontSize="14" fill={colors.extension.text}>Body₁ → Body₂ → Body₃ → ...</text>
                        <text x={COLUMN_WIDTH / 2} y="85" textAnchor="middle" fontSize="14" fill={colors.extension.text} fontStyle="italic">Physical causation complete within extension</text>
                    </InteractiveGroup>

                    {/* Human Mind/Body */}
                    <line x1="340" y1="780" x2="340" y2="840" stroke={colors.thought.stroke} strokeWidth="2" markerEnd="url(#arrowThought)" />
                    <line x1="1060" y1="780" x2="1060" y2="840" stroke={colors.extension.stroke} strokeWidth="2" markerEnd="url(#arrowExtension)" />

                    <InteractiveGroup transform="translate(100, 840)" onClick={() => handleNodeClick("Human Mind", "Idea of the body")}>
                        <rect width={COLUMN_WIDTH} height="160" rx="8" fill={colors.thought.stroke} stroke={colors.thought.text} strokeWidth="4" />
                        <text x={COLUMN_WIDTH / 2} y="45" textAnchor="middle" fontSize="24" fontWeight="900" fill="white" letterSpacing="1">HUMAN MIND</text>
                        <text x={COLUMN_WIDTH / 2} y="75" textAnchor="middle" fontSize="16" fill="white" fontWeight="600">= Idea of Human Body</text>
                        <text x={COLUMN_WIDTH / 2} y="105" textAnchor="middle" fontSize="14" fill="white">• Adequate Ideas (actions)</text>
                        <text x={COLUMN_WIDTH / 2} y="125" textAnchor="middle" fontSize="14" fill="white">• Inadequate Ideas (passions)</text>
                    </InteractiveGroup>

                    <InteractiveGroup transform="translate(820, 840)" onClick={() => handleNodeClick("Human Body", "Physical object")}>
                        <rect width={COLUMN_WIDTH} height="160" rx="8" fill={colors.extension.stroke} stroke={colors.extension.text} strokeWidth="4" />
                        <text x={COLUMN_WIDTH / 2} y="45" textAnchor="middle" fontSize="24" fontWeight="900" fill="white" letterSpacing="1">HUMAN BODY</text>
                        <text x={COLUMN_WIDTH / 2} y="75" textAnchor="middle" fontSize="16" fill="white" fontWeight="600">= Complex Physical Individual</text>
                        <text x={COLUMN_WIDTH / 2} y="105" textAnchor="middle" fontSize="14" fill="white">• Body's affections</text>
                        <text x={COLUMN_WIDTH / 2} y="125" textAnchor="middle" fontSize="14" fill="white">• Physical states & motions</text>
                    </InteractiveGroup>

                    {/* Parallelism Connection */}
                    <line x1="580" y1="280" x2="820" y2="280" stroke={colors.parallelism.stroke} strokeWidth="2" strokeDasharray="8,4" opacity="0.6" />
                    <line x1="520" y1="440" x2="880" y2="440" stroke={colors.parallelism.stroke} strokeWidth="2" strokeDasharray="8,4" opacity="0.6" />
                    <line x1="520" y1="570" x2="880" y2="570" stroke={colors.parallelism.stroke} strokeWidth="2" strokeDasharray="8,4" opacity="0.6" />
                    <line x1="580" y1="720" x2="820" y2="720" stroke={colors.parallelism.stroke} strokeWidth="2" strokeDasharray="8,4" opacity="0.6" />

                    {/* Main parallelism arrow */}
                    <line x1="580" y1="920" x2="820" y2="920" stroke={colors.parallelism.stroke} strokeWidth="4" strokeDasharray="12,6" />
                    <circle cx="580" cy="920" r="8" fill={colors.parallelism.stroke} />
                    <circle cx="820" cy="920" r="8" fill={colors.parallelism.stroke} />

                    {/* Central explanation */}
                    <rect x="580" y="900" width="240" height="40" rx="6" fill={colors.parallelism.stroke} />
                    <text x="700" y="925" textAnchor="middle" fontSize="16" fontWeight="900" fill="white" letterSpacing="1">PARALLELISM</text>

                    <text x="700" y="960" textAnchor="middle" fontSize="14" fill={colors.text.main} fontWeight="700">One thing, two ways (IIP7)</text>

                    {/* No Causal Interaction */}
                    <g transform="translate(700, 660)">
                        <circle r="35" fill="white" stroke={colors.parallelism.stroke} strokeWidth="2" />
                        <line x1="-22" y1="-22" x2="22" y2="22" stroke={colors.parallelism.stroke} strokeWidth="3" />
                        <line x1="22" y1="-22" x2="-22" y2="22" stroke={colors.parallelism.stroke} strokeWidth="3" />
                        <text x="0" y="55" textAnchor="middle" fontSize="12" fill={colors.parallelism.text} fontWeight="800">NO CAUSAL</text>
                        <text x="0" y="70" textAnchor="middle" fontSize="12" fill={colors.parallelism.text} fontWeight="800">INTERACTION</text>
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default ParallelismDiagram;
