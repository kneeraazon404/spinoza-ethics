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
        <g className="transition-all duration-300 ease-out hover:scale-[1.02] hover:drop-shadow-lg">
            {children}
        </g>
    </g>
);

interface FlowCardProps {
    x: number;
    y: number;
    width: number;
    height: number;
    title: string;
    subtitle: string;
    fill: string;
    stroke: string;
    textFill: string;
    onClick: () => void;
}

interface SubCardProps {
    x: number;
    y: number;
    width: number;
    text: string;
    fill: string;
    stroke: string;
    textFill: string;
    parentX: number;
    parentY: number;
    onClick: () => void;
}

// New Card Component matching Hierarchy style
const FlowCard = ({ x, y, width, height, title, subtitle, fill, stroke, textFill, onClick }: FlowCardProps) => (
    <InteractiveGroup transform={`translate(${x}, ${y})`} onClick={onClick}>
        <rect width={width} height={height} rx="8" fill={fill} stroke={stroke} strokeWidth="3" filter="url(#softShadow)" />
        <text x={width / 2} y={35} textAnchor="middle" fill={textFill} fontSize="20" fontWeight="900" letterSpacing="0.5">
            {title}
        </text>
        <text x={width / 2} y={60} textAnchor="middle" fill={textFill} fontSize="16" fontWeight="500" fontStyle="italic" opacity="0.9">
            {subtitle}
        </text>
    </InteractiveGroup>
);

// SubCard Component
const SubCard = ({ x, y, width, text, fill, stroke, textFill, parentX, parentY, onClick }: SubCardProps) => (
    <g>
        {/* Curved Connector from parent center bottom to subcard top center */}
        <path 
            d={`M ${parentX} ${parentY} C ${parentX} ${y - 15}, ${x + width/2} ${parentY + 15}, ${x + width/2} ${y}`} 
            stroke={stroke} 
            strokeWidth="2" 
            opacity="0.4" 
            fill="none" 
        />
        
        <InteractiveGroup transform={`translate(${x}, ${y})`} onClick={onClick}>
            <rect width={width} height={36} rx="6" fill={fill} stroke={stroke} strokeWidth="1.5" />
            <text x={width / 2} y={23} textAnchor="middle" fill={textFill} fontSize="15" fontWeight="600">
                {text}
            </text>
        </InteractiveGroup>
    </g>
);

const FlowDiagram = () => {
    const { explainConcept } = useSpinoza();

    const handleNodeClick = (title: string, context: string) => {
        explainConcept(title, context);
    };

    const CANVAS_WIDTH = 1600;
    const CANVAS_HEIGHT = 950; // Adjusted height for spacing

    // Palette consistent with Hierarchy
    const C = {
        bg: "#ffffff",
        part1: { stroke: "#a855f7", fill: "#f3e8ff", text: "#6b21a8" }, // God (Purple)
        part2: { stroke: "#4f46e5", fill: "#e0e7ff", text: "#312e81" }, // Mind (Indigo)
        part3: { stroke: "#db2777", fill: "#fce7f3", text: "#831843" }, // Affects (Pink/Rose)
        part4: { stroke: "#ea580c", fill: "#ffedd5", text: "#9a3412" }, // Bondage (Orange)
        part5: { stroke: "#059669", fill: "#d1fae5", text: "#065f46" }, // Freedom (Emerald)
        arrow: { stroke: "#94a3b8" }
    };

    // Bolder arrow style for main connections
    const arrowStyle = { strokeWidth: "2", fill: "none", opacity: "0.8" };

    // Y-COORDINATES (Optimized Layout)
    const Y_HEADER = 30;
    const Y_P1 = 70;
    const Y_P1_SUB = 200;
    const Y_P23 = 350;
    const Y_P23_SUB1 = 480;
    const Y_P23_SUB2 = 540;
    const Y_P45 = 700;
    const Y_P45_SUB1 = 830;
    const Y_P45_SUB2 = 890;

    return (
        <div className="w-full min-h-[950px] relative font-sans overflow-auto" style={{ backgroundColor: C.bg }}>
            {/* HEADER */}
            <div className="absolute top-2 left-10 z-10 pointer-events-none">
                <h2 className="text-slate-400 text-sm font-bold tracking-widest uppercase mb-1.5">
                    ETHICA ORDINE GEOMETRICO DEMONSTRATA
                </h2>
                <h3 className="text-slate-300 text-xs font-semibold tracking-wider uppercase">
                    / THE COMPLETE ARGUMENT FLOW
                </h3>
            </div>

            <div className="w-full max-w-[1600px] mx-auto aspect-auto relative px-4 mt-2">
                <svg viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`} className="w-full h-auto min-h-[950px]">
                    <defs>
                        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                            <feOffset dx="2" dy="3" result="offsetblur" />
                            <feComponentTransfer><feFuncA type="linear" slope="0.1" /></feComponentTransfer>
                            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>

                        <pattern id="globalGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                        </pattern>

                        <linearGradient id="gradGeometric" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#f8fafc" />
                            <stop offset="100%" stopColor="#e2e8f0" />
                        </linearGradient>

                        {/* Smaller, Thinner Arrowhead */}
                        <marker id="arrow" markerWidth="5" markerHeight="3" refX="4" refY="1.5" orient="auto">
                            <path d="M0,0 L5,1.5 L0,3 L0,0" fill={C.arrow.stroke} />
                        </marker>
                    </defs>

                    <rect width="100%" height="100%" fill="url(#globalGrid)" />

                    {/* --- ONTOLOGY HEADERS --- */}
                    <text x="400" y={Y_HEADER} textAnchor="middle" fill={C.part1.stroke} fontSize="16" fontWeight="900" letterSpacing="3" opacity="0.8">SUBSTANCE</text>
                    <text x="800" y={Y_HEADER} textAnchor="middle" fill="#64748b" fontSize="16" fontWeight="900" letterSpacing="3" opacity="0.8">ATTRIBUTES</text>
                    <text x="1200" y={Y_HEADER} textAnchor="middle" fill={C.part3.stroke} fontSize="16" fontWeight="900" letterSpacing="3" opacity="0.8">MODES</text>

                    {/* --- MAIN FLOW CONNECTIONS (Curved Bezier - Bolder) --- */}
                    
                    {/* I -> II */}
                    <path d={`M 800 ${Y_P1 + 90} C 800 ${Y_P23 - 40}, 400 ${Y_P23 - 40}, 400 ${Y_P23}`} stroke={C.arrow.stroke} {...arrowStyle} markerEnd="url(#arrow)" />
                    {/* I -> III */}
                    <path d={`M 800 ${Y_P1 + 90} C 800 ${Y_P23 - 40}, 1200 ${Y_P23 - 40}, 1200 ${Y_P23}`} stroke={C.arrow.stroke} {...arrowStyle} markerEnd="url(#arrow)" />
                    
                    {/* II -> IV */}
                    <path d={`M 400 ${Y_P23_SUB2 + 36} C 400 ${Y_P45 - 50}, 400 ${Y_P45 - 20}, 400 ${Y_P45}`} stroke={C.arrow.stroke} {...arrowStyle} markerEnd="url(#arrow)" />
                    {/* III -> V */}
                    <path d={`M 1200 ${Y_P23_SUB2 + 36} C 1200 ${Y_P45 - 50}, 1200 ${Y_P45 - 20}, 1200 ${Y_P45}`} stroke={C.arrow.stroke} {...arrowStyle} markerEnd="url(#arrow)" />

                    {/* Cross Flows (Interaction) */}
                    <path d={`M 400 ${Y_P23_SUB2 + 36} C 400 ${Y_P45 - 40}, 1200 ${Y_P45 - 40}, 1200 ${Y_P45}`} stroke={C.part5.stroke} strokeWidth="2.5" fill="none" opacity="0.3" strokeDasharray="6,6" />
                    <path d={`M 1200 ${Y_P23_SUB2 + 36} C 1200 ${Y_P45 - 40}, 400 ${Y_P45 - 40}, 400 ${Y_P45}`} stroke={C.part4.stroke} strokeWidth="2.5" fill="none" opacity="0.3" strokeDasharray="6,6" />


                    {/* --- PART I: OF GOD --- */}
                    <FlowCard 
                        x={640} y={Y_P1} width={320} height={90}
                        title="PART I: OF GOD" subtitle="The Foundation of Being"
                        fill={C.part1.fill} stroke={C.part1.stroke} textFill={C.part1.text}
                        onClick={() => handleNodeClick("Part I: Of God", "The foundation of the system")}
                    />
                    {/* Sub Items I - Horizontal Row */}
                    <g>
                        <SubCard x={300} y={Y_P1_SUB} width={180} text="One Infinite Substance" fill="white" stroke={C.part1.stroke} textFill={C.part1.text} parentX={800} parentY={Y_P1 + 90} onClick={() => handleNodeClick("Substance Monism", "Only one substance")} />
                        <SubCard x={500} y={Y_P1_SUB} width={180} text="Causa Sui (Self-Caused)" fill="white" stroke={C.part1.stroke} textFill={C.part1.text} parentX={800} parentY={Y_P1 + 90} onClick={() => handleNodeClick("Causa Sui", "Self-caused")} />
                        <SubCard x={700} y={Y_P1_SUB} width={200} text="Deus sive Natura" fill="white" stroke={C.part1.stroke} textFill={C.part1.text} parentX={800} parentY={Y_P1 + 90} onClick={() => handleNodeClick("Deus sive Natura", "God or Nature")} />
                        <SubCard x={920} y={Y_P1_SUB} width={180} text="Absolute Determinism" fill="white" stroke={C.part1.stroke} textFill={C.part1.text} parentX={800} parentY={Y_P1 + 90} onClick={() => handleNodeClick("Determinism", "No contingency")} />
                        <SubCard x={1120} y={Y_P1_SUB} width={180} text="Critique of Teleology" fill="white" stroke={C.part1.stroke} textFill={C.part1.text} parentX={800} parentY={Y_P1 + 90} onClick={() => handleNodeClick("Critique of Teleology", "No final causes")} />
                    </g>


                    {/* --- PART II: THE MIND --- */}
                    <FlowCard 
                        x={240} y={Y_P23} width={320} height={90}
                        title="PART II: THE MIND" subtitle="Nature & Origin of Mind"
                        fill={C.part2.fill} stroke={C.part2.stroke} textFill={C.part2.text}
                        onClick={() => handleNodeClick("Part II: Of The Mind", "Epistemology")}
                    />
                    {/* Sub Items II */}
                    <g>
                        {/* Row 1 */}
                        <SubCard x={150} y={Y_P23_SUB1} width={160} text="Parallelism (IIP7)" fill="white" stroke={C.part2.stroke} textFill={C.part2.text} parentX={400} parentY={Y_P23 + 90} onClick={() => handleNodeClick("Parallelism", "Order of ideas")} />
                        <SubCard x={330} y={Y_P23_SUB1} width={160} text="Idea of the Body" fill="white" stroke={C.part2.stroke} textFill={C.part2.text} parentX={400} parentY={Y_P23 + 90} onClick={() => handleNodeClick("Idea of Body", "Mind object")} />
                        <SubCard x={510} y={Y_P23_SUB1} width={160} text="Imagination (1st)" fill="white" stroke={C.part2.stroke} textFill={C.part2.text} parentX={400} parentY={Y_P23 + 90} onClick={() => handleNodeClick("Imagination", "1st Kind")} />
                        {/* Row 2 */}
                        <SubCard x={240} y={Y_P23_SUB2} width={160} text="Reason (2nd Kind)" fill="white" stroke={C.part2.stroke} textFill={C.part2.text} parentX={400} parentY={Y_P23 + 90} onClick={() => handleNodeClick("Reason", "2nd Kind")} />
                        <SubCard x={420} y={Y_P23_SUB2} width={160} text="Intuition (3rd Kind)" fill="white" stroke={C.part2.stroke} textFill={C.part2.text} parentX={400} parentY={Y_P23 + 90} onClick={() => handleNodeClick("Intuition", "3rd Kind")} />
                    </g>


                    {/* --- PART III: AFFECTS --- */}
                    <FlowCard 
                        x={1040} y={Y_P23} width={320} height={90}
                        title="PART III: AFFECTS" subtitle="Origin & Nature of Emotions"
                        fill={C.part3.fill} stroke={C.part3.stroke} textFill={C.part3.text}
                        onClick={() => handleNodeClick("Part III: Affects", "Psychology")}
                    />
                    {/* Sub Items III */}
                    <g>
                        {/* Row 1 */}
                        <SubCard x={950} y={Y_P23_SUB1} width={160} text="Conatus (Striving)" fill="white" stroke={C.part3.stroke} textFill={C.part3.text} parentX={1200} parentY={Y_P23 + 90} onClick={() => handleNodeClick("Conatus", "Striving")} />
                        <SubCard x={1130} y={Y_P23_SUB1} width={160} text="Desire (Cupiditas)" fill="white" stroke={C.part3.stroke} textFill={C.part3.text} parentX={1200} parentY={Y_P23 + 90} onClick={() => handleNodeClick("Desire", "Cupiditas")} />
                        <SubCard x={1310} y={Y_P23_SUB1} width={160} text="Joy (Laetitia)" fill="white" stroke={C.part3.stroke} textFill={C.part3.text} parentX={1200} parentY={Y_P23 + 90} onClick={() => handleNodeClick("Joy", "Laetitia")} />
                        {/* Row 2 */}
                        <SubCard x={1040} y={Y_P23_SUB2} width={160} text="Sadness (Tristitia)" fill="white" stroke={C.part3.stroke} textFill={C.part3.text} parentX={1200} parentY={Y_P23 + 90} onClick={() => handleNodeClick("Sadness", "Tristitia")} />
                        <SubCard x={1220} y={Y_P23_SUB2} width={160} text="Imitation of Affects" fill="white" stroke={C.part3.stroke} textFill={C.part3.text} parentX={1200} parentY={Y_P23 + 90} onClick={() => handleNodeClick("Imitation of Affects", "Social psychology")} />
                    </g>


                    {/* --- PART IV: BONDAGE --- */}
                    <FlowCard 
                        x={240} y={Y_P45} width={320} height={90}
                        title="PART IV: BONDAGE" subtitle="Strength of the Emotions"
                        fill={C.part4.fill} stroke={C.part4.stroke} textFill={C.part4.text}
                        onClick={() => handleNodeClick("Part IV: Bondage", "Human Bondage")}
                    />
                    {/* Sub Items IV */}
                    <g>
                        {/* Row 1 */}
                        <SubCard x={150} y={Y_P45_SUB1} width={160} text="Power of Ext. Causes" fill="white" stroke={C.part4.stroke} textFill={C.part4.text} parentX={400} parentY={Y_P45 + 90} onClick={() => handleNodeClick("External Causes", "Power of nature")} />
                        <SubCard x={330} y={Y_P45_SUB1} width={160} text="Good = Useful" fill="white" stroke={C.part4.stroke} textFill={C.part4.text} parentX={400} parentY={Y_P45 + 90} onClick={() => handleNodeClick("Good is Useful", "IV Def 1")} />
                        <SubCard x={510} y={Y_P45_SUB1} width={160} text="Virtue = Power" fill="white" stroke={C.part4.stroke} textFill={C.part4.text} parentX={400} parentY={Y_P45 + 90} onClick={() => handleNodeClick("Virtue is Power", "IV Def 8")} />
                        {/* Row 2 */}
                        <SubCard x={240} y={Y_P45_SUB2} width={160} text="The Free Man" fill="white" stroke={C.part4.stroke} textFill={C.part4.text} parentX={400} parentY={Y_P45 + 90} onClick={() => handleNodeClick("The Free Man", "Model of nature")} />
                        <SubCard x={420} y={Y_P45_SUB2} width={160} text="Social Contract" fill="white" stroke={C.part4.stroke} textFill={C.part4.text} parentX={400} parentY={Y_P45 + 90} onClick={() => handleNodeClick("Social Contract", "Society")} />
                    </g>


                    {/* --- PART V: FREEDOM --- */}
                    <FlowCard 
                        x={1040} y={Y_P45} width={320} height={90}
                        title="PART V: FREEDOM" subtitle="Power of the Intellect"
                        fill={C.part5.fill} stroke={C.part5.stroke} textFill={C.part5.text}
                        onClick={() => handleNodeClick("Part V: Freedom", "Human Freedom")}
                    />
                    {/* Sub Items V */}
                    <g>
                        {/* Row 1 */}
                        <SubCard x={950} y={Y_P45_SUB1} width={160} text="Reason over Affects" fill="white" stroke={C.part5.stroke} textFill={C.part5.text} parentX={1200} parentY={Y_P45 + 90} onClick={() => handleNodeClick("Reason over Affects", "Power of Mind")} />
                        <SubCard x={1130} y={Y_P45_SUB1} width={160} text="Intellectual Love" fill="white" stroke={C.part5.stroke} textFill={C.part5.text} parentX={1200} parentY={Y_P45 + 90} onClick={() => handleNodeClick("Intellectual Love", "Amor Dei Intellectualis")} />
                        <SubCard x={1310} y={Y_P45_SUB1} width={160} text="Eternity of Mind" fill="white" stroke={C.part5.stroke} textFill={C.part5.text} parentX={1200} parentY={Y_P45 + 90} onClick={() => handleNodeClick("Eternity of Mind", "Sub specie aeternitatis")} />
                        {/* Row 2 */}
                        <SubCard x={1040} y={Y_P45_SUB2} width={160} text="Third Kind of Knowledge" fill="white" stroke={C.part5.stroke} textFill={C.part5.text} parentX={1200} parentY={Y_P45 + 90} onClick={() => handleNodeClick("Third Kind of Knowledge", "Intuition")} />
                        <SubCard x={1220} y={Y_P45_SUB2} width={160} text="Blessedness" fill="white" stroke={C.part5.stroke} textFill={C.part5.text} parentX={1200} parentY={Y_P45 + 90} onClick={() => handleNodeClick("Blessedness", "Virtue itself")} />
                    </g>


                    {/* --- TRANSFORMATION ARROW --- */}
                    <path d={`M 570 ${Y_P45 + 45} C 670 ${Y_P45 + 45}, 930 ${Y_P45 + 45}, 1030 ${Y_P45 + 45}`} stroke={C.part5.stroke} strokeWidth="3" markerEnd="url(#arrow)" opacity="0.5" />
                    <text x="800" y={Y_P45 + 35} textAnchor="middle" fill={C.part5.stroke} fontSize="17" fontWeight="800" letterSpacing="1">TRANSFORMATION</text>

                </svg>
            </div>
        </div>
    );
};

export default FlowDiagram;