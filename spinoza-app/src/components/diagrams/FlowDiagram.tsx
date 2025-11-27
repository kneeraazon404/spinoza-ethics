import React, { useState } from 'react';
import { useSpinoza } from '@/context/SpinozaContext';

const FlowDiagram = () => {
    const { explainConcept } = useSpinoza();

    const handleNodeClick = (title: string, context: string) => {
        explainConcept(title, context);
    };

    const colors = {
        bg: "#f8fafc",
        part1: { fill: "#f3e8ff", stroke: "#7e22ce", text: "#581c87" },
        part2: { fill: "#e0e7ff", stroke: "#4338ca", text: "#312e81" },
        part3: { fill: "#ffe4e6", stroke: "#be123c", text: "#881337" },
        part4: { fill: "#ffedd5", stroke: "#c2410c", text: "#7c2d12" },
        part5: { fill: "#dcfce7", stroke: "#15803d", text: "#14532d" },
        geometric: { fill: "#f1f5f9", stroke: "#64748b", text: "#334155" },
        arrow: "#94a3b8"
    };

    const CANVAS_WIDTH = 1200;
    const CANVAS_HEIGHT = 1400;
    const CARD_WIDTH = 340;
    const CARD_HEIGHT = 280;

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
                    Ethica Ordine Geometrico Demonstrata
                </h2>
                <h3 className="text-slate-300 text-xs font-medium tracking-wider uppercase">
                    / The Complete Argument Flow
                </h3>
            </div>

            <div className="w-full max-w-[1600px] mx-auto aspect-[12/14] relative px-4">
                <svg viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`} preserveAspectRatio="xMidYMid meet" className="w-full h-full">
                    <defs>
                        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 L0,0" fill={colors.arrow} />
                        </marker>
                    </defs>

                    {/* Three Levels of Being */}
                    <text x="180" y="50" textAnchor="middle" fontSize="16" fontWeight="900" fill={colors.part1.text} letterSpacing="1.5" opacity="0.5">SUBSTANCE</text>
                    <text x="600" y="50" textAnchor="middle" fontSize="16" fontWeight="900" fill={colors.part2.text} letterSpacing="1.5" opacity="0.5">ATTRIBUTES</text>
                    <text x="1020" y="50" textAnchor="middle" fontSize="16" fontWeight="900" fill={colors.part3.text} letterSpacing="1.5" opacity="0.5">MODES</text>

                    {/* PART I: GOD */}
                    <InteractiveGroup transform="translate(430, 100)" onClick={() => handleNodeClick("Part I: Of God", "The foundation of the system")}>
                        <rect width={CARD_WIDTH} height={CARD_HEIGHT} rx="8" fill={colors.part1.fill} stroke={colors.part1.stroke} strokeWidth="4" />
                        <text x={CARD_WIDTH / 2} y="45" textAnchor="middle" fontSize="24" fontWeight="900" fill={colors.part1.text} letterSpacing="1.5">PART I: GOD</text>
                        <text x={CARD_WIDTH / 2} y="70" textAnchor="middle" fontSize="16" fontWeight="700" fill={colors.part1.text} fontStyle="italic">Substance & Nature</text>

                        <g transform="translate(30, 110)">
                            <text y="0" fontSize="14" fontWeight="700" fill={colors.part1.text}>• One Infinite Substance (D6)</text>
                            <text y="30" fontSize="14" fontWeight="700" fill={colors.part1.text}>• Causa Sui (Self-Caused) (D1)</text>
                            <text y="60" fontSize="14" fontWeight="700" fill={colors.part1.text}>• God = Nature (Deus sive Natura)</text>
                            <text y="90" fontSize="14" fontWeight="700" fill={colors.part1.text}>• Determinism (IP32)</text>
                            <text y="120" fontSize="14" fontWeight="700" fill={colors.part1.text}>• No Teleology (Appendix)</text>
                        </g>
                    </InteractiveGroup>

                    {/* PART II: MIND */}
                    <InteractiveGroup transform="translate(120, 460)" onClick={() => handleNodeClick("Part II: Of The Mind", "Nature and origin of the mind")}>
                        <rect width={CARD_WIDTH} height={CARD_HEIGHT} rx="8" fill={colors.part2.fill} stroke={colors.part2.stroke} strokeWidth="4" />
                        <text x={CARD_WIDTH / 2} y="45" textAnchor="middle" fontSize="24" fontWeight="900" fill={colors.part2.text} letterSpacing="1.5">PART II: MIND</text>
                        <text x={CARD_WIDTH / 2} y="70" textAnchor="middle" fontSize="16" fontWeight="700" fill={colors.part2.text} fontStyle="italic">Knowledge & Ideas</text>

                        <g transform="translate(30, 110)">
                            <text y="0" fontSize="14" fontWeight="700" fill={colors.part2.text}>• Parallelism (IIP7)</text>
                            <text y="30" fontSize="14" fontWeight="700" fill={colors.part2.text}>• Idea of the Body (IIP13)</text>
                            <text y="60" fontSize="14" fontWeight="700" fill={colors.part2.text}>• Three Kinds of Knowledge:</text>
                            <text y="90" fontSize="14" fontWeight="700" fill={colors.part2.text} x="15">- Imagination (Inadequate)</text>
                            <text y="120" fontSize="14" fontWeight="700" fill={colors.part2.text} x="15">- Reason (Common Notions)</text>
                            <text y="150" fontSize="14" fontWeight="700" fill={colors.part2.text} x="15">- Intuition (Essence)</text>
                        </g>
                    </InteractiveGroup>

                    {/* PART III: AFFECTS */}
                    <InteractiveGroup transform="translate(740, 460)" onClick={() => handleNodeClick("Part III: Of The Affects", "Origin and nature of emotions")}>
                        <rect width={CARD_WIDTH} height={CARD_HEIGHT} rx="8" fill={colors.part3.fill} stroke={colors.part3.stroke} strokeWidth="4" />
                        <text x={CARD_WIDTH / 2} y="45" textAnchor="middle" fontSize="24" fontWeight="900" fill={colors.part3.text} letterSpacing="1.5">PART III: AFFECTS</text>
                        <text x={CARD_WIDTH / 2} y="70" textAnchor="middle" fontSize="16" fontWeight="700" fill={colors.part3.text} fontStyle="italic">Psychology & Emotions</text>

                        <g transform="translate(30, 110)">
                            <text y="0" fontSize="14" fontWeight="700" fill={colors.part3.text}>• Conatus (Striving) (IIIP6)</text>
                            <text y="30" fontSize="14" fontWeight="700" fill={colors.part3.text}>• Primary Affects:</text>
                            <text y="60" fontSize="14" fontWeight="700" fill={colors.part3.text} x="15">- Desire (Cupiditas)</text>
                            <text y="90" fontSize="14" fontWeight="700" fill={colors.part3.text} x="15">- Joy (Laetitia)</text>
                            <text y="120" fontSize="14" fontWeight="700" fill={colors.part3.text} x="15">- Sadness (Tristitia)</text>
                            <text y="150" fontSize="14" fontWeight="700" fill={colors.part3.text}>• Imitation of Affects</text>
                        </g>
                    </InteractiveGroup>

                    {/* PART IV: BONDAGE */}
                    <InteractiveGroup transform="translate(120, 820)" onClick={() => handleNodeClick("Part IV: Of Human Bondage", "Strength of the emotions")}>
                        <rect width={CARD_WIDTH} height={CARD_HEIGHT} rx="8" fill={colors.part4.fill} stroke={colors.part4.stroke} strokeWidth="4" />
                        <text x={CARD_WIDTH / 2} y="45" textAnchor="middle" fontSize="24" fontWeight="900" fill={colors.part4.text} letterSpacing="1.5">PART IV: BONDAGE</text>
                        <text x={CARD_WIDTH / 2} y="70" textAnchor="middle" fontSize="16" fontWeight="700" fill={colors.part4.text} fontStyle="italic">Ethics & Strength</text>

                        <g transform="translate(30, 110)">
                            <text y="0" fontSize="14" fontWeight="700" fill={colors.part4.text}>• Power of External Causes</text>
                            <text y="30" fontSize="14" fontWeight="700" fill={colors.part4.text}>• Good = Useful (IVD1)</text>
                            <text y="60" fontSize="14" fontWeight="700" fill={colors.part4.text}>• Virtue = Power (IVD8)</text>
                            <text y="90" fontSize="14" fontWeight="700" fill={colors.part4.text}>• The Free Man (IVP67-73)</text>
                            <text y="120" fontSize="14" fontWeight="700" fill={colors.part4.text}>• Social Contract</text>
                        </g>
                    </InteractiveGroup>

                    {/* PART V: FREEDOM */}
                    <InteractiveGroup transform="translate(740, 820)" onClick={() => handleNodeClick("Part V: Of Human Freedom", "Power of the intellect")}>
                        <rect width={CARD_WIDTH} height={CARD_HEIGHT} rx="8" fill={colors.part5.fill} stroke={colors.part5.stroke} strokeWidth="4" />
                        <text x={CARD_WIDTH / 2} y="45" textAnchor="middle" fontSize="24" fontWeight="900" fill={colors.part5.text} letterSpacing="1.5">PART V: FREEDOM</text>
                        <text x={CARD_WIDTH / 2} y="70" textAnchor="middle" fontSize="16" fontWeight="700" fill={colors.part5.text} fontStyle="italic">Salvation & Blessedness</text>

                        <g transform="translate(30, 110)">
                            <text y="0" fontSize="14" fontWeight="700" fill={colors.part5.text}>• Power of Reason over Affects</text>
                            <text y="30" fontSize="14" fontWeight="700" fill={colors.part5.text}>• Intellectual Love of God</text>
                            <text y="60" fontSize="14" fontWeight="700" fill={colors.part5.text}>• Eternity of the Mind (VP23)</text>
                            <text y="90" fontSize="14" fontWeight="700" fill={colors.part5.text}>• Third Kind of Knowledge</text>
                            <text y="120" fontSize="14" fontWeight="700" fill={colors.part5.text}>• Blessedness (Beatitudo)</text>
                        </g>
                    </InteractiveGroup>

                    {/* CONNECTIONS */}
                    {/* I -> II */}
                    <path d="M 600 380 L 290 460" stroke={colors.arrow} strokeWidth="2" markerEnd="url(#arrow)" fill="none" />
                    {/* I -> III */}
                    <path d="M 600 380 L 910 460" stroke={colors.arrow} strokeWidth="2" markerEnd="url(#arrow)" fill="none" />
                    {/* II -> IV */}
                    <path d="M 290 740 L 290 820" stroke={colors.arrow} strokeWidth="2" markerEnd="url(#arrow)" fill="none" />
                    {/* III -> IV */}
                    <path d="M 910 740 L 290 820" stroke={colors.arrow} strokeWidth="2" markerEnd="url(#arrow)" fill="none" />
                    {/* II -> V */}
                    <path d="M 290 740 L 910 820" stroke={colors.arrow} strokeWidth="2" markerEnd="url(#arrow)" fill="none" />
                    {/* III -> V */}
                    <path d="M 910 740 L 910 820" stroke={colors.arrow} strokeWidth="2" markerEnd="url(#arrow)" fill="none" />

                    {/* GEOMETRIC METHOD */}
                    <InteractiveGroup transform={`translate(${CANVAS_WIDTH / 2}, 1230)`} onClick={() => handleNodeClick("Geometric Method", "Mos Geometricus")}>
                        <ellipse cx="0" cy="0" rx="280" ry="60" fill={colors.geometric.fill} stroke={colors.geometric.stroke} strokeWidth="3" />
                        <text x="0" y="-8" textAnchor="middle" fill={colors.geometric.text} fontSize="20" fontWeight="900" letterSpacing="1">GEOMETRIC METHOD</text>
                        <text x="0" y="20" textAnchor="middle" fill={colors.geometric.text} fontSize="14" fontWeight="700">Each part follows with mathematical necessity</text>
                    </InteractiveGroup>

                </svg>
            </div>
        </div>
    );
};

export default FlowDiagram;