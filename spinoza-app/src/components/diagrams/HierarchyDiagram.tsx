import React from 'react';
import { useSpinoza } from '@/context/SpinozaContext';

const SpinozaHierarchy = () => {
    const { explainConcept } = useSpinoza();

    const handleNodeClick = (title: string, context: string) => {
        explainConcept(title, context);
    };

    const CANVAS_WIDTH = 1400;
    const CANVAS_HEIGHT = 1200;

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
                    / Ethics Demonstrated in Geometrical Order
                </h3>
            </div>
            <div className="w-full max-w-[1600px] mx-auto aspect-[14/12] relative px-4">
                <svg viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`} preserveAspectRatio="xMidYMid meet" className="w-full h-full">
                    <defs>
                        <marker id="arrowThought" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 L0,0" className="fill-indigo-700" />
                        </marker>
                        <marker id="arrowExtension" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 L0,0" className="fill-rose-700" />
                        </marker>
                        <marker id="dot" markerWidth="8" markerHeight="8" refX="4" refY="4">
                            <circle cx="4" cy="4" r="3" className="fill-rose-700" />
                        </marker>
                    </defs>

                    {/* Side Labels */}
                    <text x="40" y="600" textAnchor="middle" className="fill-slate-500 text-base font-extrabold tracking-[1.5px] opacity-40 select-none" style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}>
                        NATURA NATURANS / Active Nature
                    </text>
                    <text x={CANVAS_WIDTH - 40} y="600" textAnchor="middle" className="fill-slate-500 text-base font-extrabold tracking-[1.5px] opacity-40 select-none" style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}>
                        NATURA NATURATA / Passive Nature
                    </text>

                    {/* SUBSTANCE */}
                    <InteractiveGroup transform={`translate(${CANVAS_WIDTH / 2}, 100)`} onClick={() => handleNodeClick("Substance", "God or Nature")}>
                        <rect x="-300" y="-50" width="600" height="180" rx="6" className="fill-purple-100 stroke-purple-700 stroke-[4px]" />
                        <text textAnchor="middle" y="10" className="fill-purple-900 text-[28px] font-black tracking-[1.5px]">SUBSTANCE</text>
                        <text textAnchor="middle" y="45" className="fill-purple-800 text-lg font-semibold italic">God / Nature (Deus sive Natura)</text>
                        <g transform="translate(0, 95)">
                            <text textAnchor="middle" className="fill-slate-500 text-sm font-bold">
                                One • Infinite • Self-caused • Necessarily Exists
                            </text>
                        </g>
                    </InteractiveGroup>

                    {/* Connection lines from Substance to Attributes */}
                    <line x1={CANVAS_WIDTH / 2} y1="230" x2="350" y2="270" className="stroke-purple-700 stroke-2 opacity-50" markerEnd="url(#arrowThought)" />
                    <line x1={CANVAS_WIDTH / 2} y1="230" x2="1050" y2="270" className="stroke-purple-700 stroke-2 opacity-50" markerEnd="url(#arrowExtension)" />

                    {/* Expresses Labels */}
                    <text x="450" y="210" className="fill-slate-500 text-base font-bold">expresses</text>
                    <text x="900" y="210" className="fill-slate-500 text-base font-bold">expresses</text>

                    {/* Infinite attributes indicator */}
                    <path d={`M${CANVAS_WIDTH / 2 - 30} 195 H ${CANVAS_WIDTH / 2 + 30}`} className="fill-none stroke-slate-400 stroke-2" strokeDasharray="6 6" />
                    <InteractiveGroup transform={`translate(${CANVAS_WIDTH / 2}, 210)`} onClick={() => handleNodeClick("Infinite Attributes", "God consists of infinite attributes")}>
                        <text textAnchor="middle" className="fill-slate-400 text-xs font-black tracking-widest">infinite unknown attributes</text>
                    </InteractiveGroup>

                    {/* ATTRIBUTES */}
                    <g transform="translate(350, 320)">
                        <InteractiveGroup onClick={() => handleNodeClick("Attribute of Thought", "God's essence expressed as thought")}>
                            <rect x="-210" y="-50" width="420" height="130" rx="6" className="fill-indigo-100 stroke-indigo-700 stroke-[4px]" />
                            <text textAnchor="middle" y="5" className="fill-indigo-900 text-[22px] font-black tracking-widest">ATTRIBUTE: THOUGHT</text>
                            <text textAnchor="middle" y="35" className="fill-indigo-700 text-sm font-bold">Infinite • Eternal • Conceived through itself</text>
                            <text textAnchor="middle" y="60" className="fill-indigo-700 text-[13px] font-semibold italic">All mental phenomena</text>
                        </InteractiveGroup>
                    </g>
                    <g transform="translate(1050, 320)">
                        <InteractiveGroup onClick={() => handleNodeClick("Attribute of Extension", "God's essence expressed as extension")}>
                            <rect x="-210" y="-50" width="420" height="130" rx="6" className="fill-rose-100 stroke-rose-700 stroke-[4px]" />
                            <text textAnchor="middle" y="5" className="fill-rose-900 text-[22px] font-black tracking-widest">ATTRIBUTE: EXTENSION</text>
                            <text textAnchor="middle" y="35" className="fill-rose-700 text-sm font-bold">Infinite • Eternal • Conceived through itself</text>
                            <text textAnchor="middle" y="60" className="fill-rose-700 text-[13px] font-semibold italic">All physical phenomena</text>
                        </InteractiveGroup>
                    </g>

                    {/* Ellipsis and Infinite Text */}
                    <text x="80" y="325" className="fill-slate-500 text-[28px] font-light">...</text>
                    <text x={CANVAS_WIDTH - 80} y="325" className="fill-slate-500 text-[28px] font-light">...</text>
                    <text x="70" y="365" className="fill-slate-500 text-[13px] font-semibold">infinite</text>
                    <text x={CANVAS_WIDTH - 70} y="365" className="fill-slate-500 text-[13px] font-semibold">infinite</text>

                    {/* Lines to modes */}
                    <line x1="350" y1="400" x2="350" y2="440" className="stroke-indigo-700 stroke-2" markerEnd="url(#arrowThought)" />
                    <line x1="1050" y1="400" x2="1050" y2="440" className="stroke-rose-700 stroke-2" markerEnd="url(#arrowExtension)" />

                    {/* MODES OF THOUGHT */}
                    <g transform="translate(350, 0)">
                        <g transform="translate(0, 480)">
                            <InteractiveGroup onClick={() => handleNodeClick("Infinite Intellect", "Immediate infinite mode of thought")}>
                                <rect x="-170" y="-40" width="340" height="80" rx="6" className="fill-white stroke-indigo-700 stroke-[3px]" strokeDasharray="8 4" />
                                <text textAnchor="middle" y="5" className="fill-indigo-900 text-base font-extrabold">Infinite Immediate Mode</text>
                                <text textAnchor="middle" y="30" className="fill-indigo-900 text-[13px] font-semibold italic">(Infinite Intellect)</text>
                            </InteractiveGroup>
                        </g>
                        <line x1="0" y1="520" x2="0" y2="560" className="stroke-indigo-700 stroke-2" markerEnd="url(#arrowThought)" />
                        <g transform="translate(0, 600)">
                            <InteractiveGroup onClick={() => handleNodeClick("Infinite Chains of Ideas", "Mediate infinite mode of thought")}>
                                <rect x="-170" y="-40" width="340" height="80" rx="6" className="fill-white stroke-indigo-700 stroke-[3px]" strokeDasharray="8 4" />
                                <text textAnchor="middle" y="5" className="fill-indigo-900 text-base font-extrabold">Infinite Mediate Modes</text>
                                <text textAnchor="middle" y="30" className="fill-indigo-900 text-[13px] font-semibold italic">(Chains of Ideas)</text>
                            </InteractiveGroup>
                        </g>
                        <line x1="0" y1="640" x2="0" y2="740" className="stroke-indigo-700 stroke-2" markerEnd="url(#arrowThought)" />
                        <g transform="translate(0, 840)">
                            <InteractiveGroup onClick={() => handleNodeClick("Finite Modes of Thought", "Individual ideas")}>
                                <rect x="-210" y="-100" width="420" height="260" rx="6" className="fill-white stroke-indigo-700 stroke-[4px]" />
                                <text textAnchor="middle" y="-60" className="fill-indigo-700 text-lg font-black tracking-widest">FINITE MODES</text>
                                <text textAnchor="middle" y="-30" className="fill-indigo-900 text-sm font-bold">Individual minds • Ideas</text>
                                <text textAnchor="middle" y="-5" className="fill-indigo-900 text-sm font-bold">Beliefs • Desires • Emotions</text>
                            </InteractiveGroup>
                            <g transform="translate(0, 80)">
                                <InteractiveGroup onClick={() => handleNodeClick("Human Mind", "Idea of the human body")}>
                                    <rect x="-160" y="-40" width="320" height="80" rx="6" className="fill-indigo-100 stroke-indigo-700 stroke-[4px]" />
                                    <text textAnchor="middle" y="5" className="fill-indigo-900 text-xl font-black tracking-[0.5px]">HUMAN MIND</text>
                                    <text textAnchor="middle" y="32" className="fill-indigo-900 text-[13px] font-semibold italic">= idea of body (IIP13)</text>
                                </InteractiveGroup>
                            </g>
                        </g>
                    </g>

                    {/* MODES OF EXTENSION */}
                    <g transform="translate(1050, 0)">
                        <g transform="translate(0, 480)">
                            <InteractiveGroup onClick={() => handleNodeClick("Motion and Rest", "Immediate infinite mode of extension")}>
                                <rect x="-170" y="-40" width="340" height="80" rx="6" className="fill-white stroke-rose-700 stroke-[3px]" strokeDasharray="8 4" />
                                <text textAnchor="middle" y="5" className="fill-rose-900 text-base font-extrabold">Infinite Immediate Mode</text>
                                <text textAnchor="middle" y="30" className="fill-rose-900 text-[13px] font-semibold italic">(Motion & Rest)</text>
                            </InteractiveGroup>
                        </g>
                        <line x1="0" y1="520" x2="0" y2="560" className="stroke-rose-700 stroke-2" markerEnd="url(#arrowExtension)" />
                        <g transform="translate(0, 600)">
                            <InteractiveGroup onClick={() => handleNodeClick("Face of the Whole Universe", "Mediate infinite mode of extension")}>
                                <rect x="-170" y="-40" width="340" height="80" rx="6" className="fill-white stroke-rose-700 stroke-[3px]" strokeDasharray="8 4" />
                                <text textAnchor="middle" y="5" className="fill-rose-900 text-base font-extrabold">Infinite Mediate Modes</text>
                                <text textAnchor="middle" y="30" className="fill-rose-900 text-[13px] font-semibold italic">(Face of Universe)</text>
                            </InteractiveGroup>
                        </g>
                        <line x1="0" y1="640" x2="0" y2="740" className="stroke-rose-700 stroke-2" markerEnd="url(#arrowExtension)" />
                        <g transform="translate(0, 840)">
                            <InteractiveGroup onClick={() => handleNodeClick("Finite Modes of Extension", "Individual bodies")}>
                                <rect x="-210" y="-100" width="420" height="260" rx="6" className="fill-white stroke-rose-700 stroke-[4px]" />
                                <text textAnchor="middle" y="-60" className="fill-rose-700 text-lg font-black tracking-widest">FINITE MODES</text>
                                <text textAnchor="middle" y="-30" className="fill-rose-900 text-sm font-bold">Individual bodies • Objects</text>
                                <text textAnchor="middle" y="-5" className="fill-rose-900 text-sm font-bold">Physical states • Movements</text>
                            </InteractiveGroup>
                            <g transform="translate(0, 80)">
                                <InteractiveGroup onClick={() => handleNodeClick("Human Body", "Complex physical individual")}>
                                    <rect x="-160" y="-40" width="320" height="80" rx="6" className="fill-rose-100 stroke-rose-700 stroke-[4px]" />
                                    <text textAnchor="middle" y="5" className="fill-rose-900 text-xl font-black tracking-[0.5px]">HUMAN BODY</text>
                                    <text textAnchor="middle" y="32" className="fill-rose-900 text-[13px] font-semibold italic">= complex individual</text>
                                </InteractiveGroup>
                            </g>
                        </g>
                    </g>

                    {/* Parallelism Connection */}
                    <path d="M 560 880 L 840 880" className="stroke-rose-700 stroke-[3px]" strokeDasharray="6 6" markerStart="url(#dot)" markerEnd="url(#dot)" />

                    <InteractiveGroup transform="translate(700, 860)" onClick={() => handleNodeClick("Parallelism", "One thing expressed in two ways")}>
                        <rect x="-120" y="0" width="240" height="50" rx="6" className="fill-white stroke-rose-700 stroke-[3px]" />
                        <text x="0" y="30" textAnchor="middle" className="fill-rose-900 text-base font-black tracking-[0.5px]">
                            PARALLELISM (IIP7)
                        </text>
                    </InteractiveGroup>

                    <text x="700" y="930" textAnchor="middle" className="fill-slate-500 text-sm font-semibold italic">
                        One thing expressed in two ways
                    </text>

                    {/* Bottom reference */}
                    <g transform="translate(700, 1080)">
                        <text textAnchor="middle" className="fill-slate-500 text-[13px] font-semibold opacity-70">
                            IP14: Besides God, no substance • IP15: Whatever is, is in God • IIP7: Order of ideas = Order of things
                        </text>
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default SpinozaHierarchy;