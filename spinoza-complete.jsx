import React, { useState } from 'react';
import { Info, Zap, Brain, Heart, Crown, Network } from 'lucide-react';

const SpinozaEthicsDiagram = () => {
  const [activeView, setActiveView] = useState('hierarchy');

  const views = [
    { id: 'hierarchy', name: 'Hierarchy', icon: Network },
    { id: 'flow', name: '5 Parts', icon: Zap },
    { id: 'parallelism', name: 'Parallelism', icon: Brain },
    { id: 'affects', name: 'Affects', icon: Heart },
    { id: 'power', name: 'Power→Virtue', icon: Crown },
    { id: 'system', name: 'Complete', icon: Info }
  ];

  const HierarchyDiagram = () => (
    <svg width="100%" height="750" viewBox="0 0 1000 750">
      <defs>
        <linearGradient id="substanceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
        <linearGradient id="thoughtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4facfe" />
          <stop offset="100%" stopColor="#00f2fe" />
        </linearGradient>
        <linearGradient id="extGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fa709a" />
          <stop offset="100%" stopColor="#fee140" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0,0 0,6 9,3" fill="#4facfe" />
        </marker>
        <marker id="arrowOrange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0,0 0,6 9,3" fill="#fa709a" />
        </marker>
      </defs>

      {/* Substance */}
      <rect x="250" y="30" width="500" height="90" rx="15" fill="url(#substanceGrad)" stroke="#5a4bba" strokeWidth="3" filter="url(#glow)" />
      <text x="500" y="60" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">SUBSTANCE</text>
      <text x="500" y="85" textAnchor="middle" fill="white" fontSize="16" fontStyle="italic">God / Nature (Deus sive Natura)</text>
      <text x="500" y="108" textAnchor="middle" fill="white" fontSize="11">One • Infinite • Self-caused • Necessarily Exists</text>

      {/* Connections */}
      <line x1="400" y1="120" x2="250" y2="190" stroke="#667eea" strokeWidth="4" opacity="0.6" />
      <line x1="600" y1="120" x2="750" y2="190" stroke="#667eea" strokeWidth="4" opacity="0.6" />
      <text x="310" y="155" fill="#667eea" fontSize="14" fontWeight="600">expresses</text>
      <text x="640" y="155" fill="#667eea" fontSize="14" fontWeight="600">expresses</text>

      {/* Thought Attribute */}
      <rect x="50" y="190" width="350" height="100" rx="12" fill="url(#thoughtGrad)" stroke="#0088cc" strokeWidth="3" />
      <text x="225" y="225" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">ATTRIBUTE: THOUGHT</text>
      <text x="225" y="250" textAnchor="middle" fill="white" fontSize="12">Infinite • Eternal • Conceived through itself</text>
      <text x="225" y="270" textAnchor="middle" fill="white" fontSize="11" fontStyle="italic">All mental phenomena</text>

      {/* Extension Attribute */}
      <rect x="600" y="190" width="350" height="100" rx="12" fill="url(#extGrad)" stroke="#ff6b6b" strokeWidth="3" />
      <text x="775" y="225" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">ATTRIBUTE: EXTENSION</text>
      <text x="775" y="250" textAnchor="middle" fill="white" fontSize="12">Infinite • Eternal • Conceived through itself</text>
      <text x="775" y="270" textAnchor="middle" fill="white" fontSize="11" fontStyle="italic">All physical phenomena</text>

      {/* Ellipsis */}
      <text x="15" y="240" fill="#667eea" fontSize="18">...</text>
      <text x="960" y="240" fill="#fa709a" fontSize="18">...</text>
      <text x="5" y="265" fill="#667eea" fontSize="9">infinite</text>
      <text x="960" y="265" fill="#fa709a" fontSize="9">infinite</text>

      {/* Mode chains */}
      <line x1="225" y1="290" x2="225" y2="330" stroke="#4facfe" strokeWidth="3" markerEnd="url(#arrowBlue)" />
      <line x1="775" y1="290" x2="775" y2="330" stroke="#fa709a" strokeWidth="3" markerEnd="url(#arrowOrange)" />

      {/* Modes of Thought */}
      <g>
        <rect x="75" y="330" width="300" height="350" rx="10" fill="#e7f5ff" stroke="#4facfe" strokeWidth="2" />
        <text x="225" y="358" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#1971c2">MODES OF THOUGHT</text>

        <ellipse cx="225" cy="395" rx="110" ry="30" fill="#74c0fc" stroke="#1971c2" strokeWidth="1.5" />
        <text x="225" y="398" textAnchor="middle" fontSize="11" fill="#1971c2" fontWeight="600">Infinite Immediate</text>
        <text x="225" y="410" textAnchor="middle" fontSize="9" fill="#1971c2">(Infinite Intellect)</text>

        <path d="M 225 425 L 225 445" stroke="#4facfe" strokeWidth="2" markerEnd="url(#arrowBlue)" />

        <rect x="110" y="445" width="230" height="35" rx="5" fill="#a5d8ff" stroke="#1971c2" strokeWidth="1" />
        <text x="225" y="467" textAnchor="middle" fontSize="10" fill="#1971c2" fontWeight="600">Infinite Mediate Modes</text>

        <path d="M 225 480 L 225 500" stroke="#4facfe" strokeWidth="2" markerEnd="url(#arrowBlue)" />

        <rect x="95" y="500" width="260" height="155" rx="8" fill="#339af0" stroke="#1864ab" strokeWidth="2" />
        <text x="225" y="525" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">Finite Modes</text>
        <text x="225" y="548" textAnchor="middle" fontSize="11" fill="white">Individual minds • Ideas</text>
        <text x="225" y="565" textAnchor="middle" fontSize="11" fill="white">Beliefs • Desires • Emotions</text>

        <rect x="105" y="585" width="240" height="60" rx="6" fill="#1864ab" stroke="#0c4a6e" strokeWidth="2" />
        <text x="225" y="610" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white">HUMAN MIND</text>
        <text x="225" y="630" textAnchor="middle" fontSize="10" fill="white" fontStyle="italic">= idea of body (IIP13)</text>
      </g>

      {/* Modes of Extension */}
      <g>
        <rect x="625" y="330" width="300" height="350" rx="10" fill="#fff5f5" stroke="#fa709a" strokeWidth="2" />
        <text x="775" y="358" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#c92a2a">MODES OF EXTENSION</text>

        <ellipse cx="775" cy="395" rx="110" ry="30" fill="#ffc078" stroke="#c92a2a" strokeWidth="1.5" />
        <text x="775" y="398" textAnchor="middle" fontSize="11" fill="#c92a2a" fontWeight="600">Infinite Immediate</text>
        <text x="775" y="410" textAnchor="middle" fontSize="9" fill="#c92a2a">(Motion & Rest)</text>

        <path d="M 775 425 L 775 445" stroke="#fa709a" strokeWidth="2" markerEnd="url(#arrowOrange)" />

        <rect x="660" y="445" width="230" height="35" rx="5" fill="#ffc9c9" stroke="#c92a2a" strokeWidth="1" />
        <text x="775" y="467" textAnchor="middle" fontSize="10" fill="#c92a2a" fontWeight="600">Infinite Mediate Modes</text>

        <path d="M 775 480 L 775 500" stroke="#fa709a" strokeWidth="2" markerEnd="url(#arrowOrange)" />

        <rect x="645" y="500" width="260" height="155" rx="8" fill="#ff8787" stroke="#c92a2a" strokeWidth="2" />
        <text x="775" y="525" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">Finite Modes</text>
        <text x="775" y="548" textAnchor="middle" fontSize="11" fill="white">Individual bodies • Objects</text>
        <text x="775" y="565" textAnchor="middle" fontSize="11" fill="white">Physical states • Movements</text>

        <rect x="655" y="585" width="240" height="60" rx="6" fill="#c92a2a" stroke="#7d1a1a" strokeWidth="2" />
        <text x="775" y="610" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white">HUMAN BODY</text>
        <text x="775" y="630" textAnchor="middle" fontSize="10" fill="white" fontStyle="italic">= complex individual</text>
      </g>

      {/* Parallelism */}
      <defs>
        <marker id="arrowBoth" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <circle cx="4" cy="4" r="3" fill="#e64980" />
        </marker>
      </defs>
      <line x1="345" y1="615" x2="655" y2="615" stroke="#e64980" strokeWidth="4" strokeDasharray="8,4"
        markerStart="url(#arrowBoth)" markerEnd="url(#arrowBoth)" />
      <rect x="445" y="600" width="110" height="30" rx="5" fill="#e64980" filter="url(#glow)" />
      <text x="500" y="620" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">PARALLELISM</text>

      {/* Labels */}
      <g opacity="0.7">
        <text x="15" y="90" fontSize="12" fontWeight="bold" fill="#667eea">Natura</text>
        <text x="15" y="105" fontSize="12" fontWeight="bold" fill="#667eea">Naturans</text>
        <line x1="10" y1="50" x2="10" y2="120" stroke="#667eea" strokeWidth="2" />

        <text x="15" y="480" fontSize="12" fontWeight="bold" fill="#4facfe">Natura</text>
        <text x="15" y="495" fontSize="12" fontWeight="bold" fill="#4facfe">Naturata</text>
        <line x1="10" y1="340" x2="10" y2="670" stroke="#4facfe" strokeWidth="2" />
      </g>

      {/* Key propositions */}
      <rect x="50" y="700" width="900" height="35" rx="5" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="1" />
      <text x="500" y="720" textAnchor="middle" fontSize="10" fill="#495057" fontStyle="italic">
        IP14: Besides God, no substance • IP15: Whatever is, is in God • IIP7: Order of ideas = Order of things
      </text>
    </svg>
  );

  const FlowDiagram = () => (
    <svg width="100%" height="900" viewBox="0 0 1100 900">
      <defs>
        <linearGradient id="p1" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#667eea" /><stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
        <linearGradient id="p2" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#f093fb" /><stop offset="100%" stopColor="#f5576c" />
        </linearGradient>
        <linearGradient id="p3" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#4facfe" /><stop offset="100%" stopColor="#00f2fe" />
        </linearGradient>
        <linearGradient id="p4" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#fa709a" /><stop offset="100%" stopColor="#fee140" />
        </linearGradient>
        <linearGradient id="p5" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#30cfd0" /><stop offset="100%" stopColor="#330867" />
        </linearGradient>
      </defs>

      {/* Title */}
      <text x="550" y="35" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#343a40">
        Logical Progression Through The Ethics
      </text>

      {/* Part I */}
      <g transform="translate(50, 70)">
        <rect width="180" height="140" rx="10" fill="url(#p1)" filter="url(#glow)" stroke="#5a4bba" strokeWidth="2" />
        <text x="90" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">PART I</text>
        <text x="90" y="50" textAnchor="middle" fill="white" fontSize="11" fontStyle="italic">Concerning God</text>
        <text x="90" y="72" textAnchor="middle" fill="white" fontSize="10">• One Substance (IP14)</text>
        <text x="90" y="88" textAnchor="middle" fill="white" fontSize="10">• God = Nature</text>
        <text x="90" y="104" textAnchor="middle" fill="white" fontSize="10">• No Contingency (IP29)</text>
        <text x="90" y="120" textAnchor="middle" fill="white" fontSize="10">• Determinism (IP32)</text>
      </g>

      <polygon points="230,140 260,140 245,160" fill="#667eea" />
      <text x="265" y="150" fontSize="10" fill="#667eea" fontWeight="bold">THEREFORE</text>

      {/* Part II */}
      <g transform="translate(290, 70)">
        <rect width="180" height="140" rx="10" fill="url(#p2)" filter="url(#glow)" stroke="#c9226d" strokeWidth="2" />
        <text x="90" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">PART II</text>
        <text x="90" y="50" textAnchor="middle" fill="white" fontSize="11" fontStyle="italic">Mind & Knowledge</text>
        <text x="90" y="72" textAnchor="middle" fill="white" fontSize="10">• Mind = Idea of Body</text>
        <text x="90" y="88" textAnchor="middle" fill="white" fontSize="10">• Parallelism (IIP7)</text>
        <text x="90" y="104" textAnchor="middle" fill="white" fontSize="10">• 3 Kinds of Knowledge</text>
        <text x="90" y="120" textAnchor="middle" fill="white" fontSize="10">• No Free Will (IIP48)</text>
      </g>

      <polygon points="470,140 500,140 485,160" fill="#f093fb" />
      <text x="505" y="150" fontSize="10" fill="#f093fb" fontWeight="bold">THEREFORE</text>

      {/* Part III */}
      <g transform="translate(530, 70)">
        <rect width="180" height="140" rx="10" fill="url(#p3)" filter="url(#glow)" stroke="#0088cc" strokeWidth="2" />
        <text x="90" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">PART III</text>
        <text x="90" y="50" textAnchor="middle" fill="white" fontSize="11" fontStyle="italic">The Affects</text>
        <text x="90" y="72" textAnchor="middle" fill="white" fontSize="10">• Conatus = Essence</text>
        <text x="90" y="88" textAnchor="middle" fill="white" fontSize="10">• Joy / Sadness / Desire</text>
        <text x="90" y="104" textAnchor="middle" fill="white" fontSize="10">• Active vs Passive</text>
        <text x="90" y="120" textAnchor="middle" fill="white" fontSize="10">• Naturalistic Ethics</text>
      </g>

      <polygon points="710,140 740,140 725,160" fill="#4facfe" />
      <text x="745" y="150" fontSize="10" fill="#4facfe" fontWeight="bold">THEREFORE</text>

      {/* Arrows down */}
      <path d="M 380 210 Q 380 250 310 280" stroke="#f093fb" strokeWidth="3" fill="none" strokeDasharray="5,5" />
      <path d="M 620 210 Q 620 250 550 280" stroke="#4facfe" strokeWidth="3" fill="none" strokeDasharray="5,5" />

      {/* Part IV */}
      <g transform="translate(190, 280)">
        <rect width="220" height="160" rx="10" fill="url(#p4)" filter="url(#glow)" stroke="#d9480f" strokeWidth="2" />
        <text x="110" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">PART IV</text>
        <text x="110" y="50" textAnchor="middle" fill="white" fontSize="11" fontStyle="italic">Human Bondage</text>
        <text x="110" y="75" textAnchor="middle" fill="white" fontSize="10">• Slavery to Passions</text>
        <text x="110" y="92" textAnchor="middle" fill="white" fontSize="10">• Reason's Weakness</text>
        <text x="110" y="109" textAnchor="middle" fill="white" fontSize="10">• Virtue = Power (IVd8)</text>
        <text x="110" y="126" textAnchor="middle" fill="white" fontSize="10">• Highest Good:</text>
        <text x="110" y="143" textAnchor="middle" fill="white" fontSize="10">Knowledge of God (IVP28)</text>
      </g>

      <polygon points="410,440 440,440 425,460" fill="#fa709a" />
      <text x="445" y="450" fontSize="10" fill="#fa709a" fontWeight="bold">THEREFORE</text>

      {/* Part V */}
      <g transform="translate(460, 280)">
        <rect width="220" height="160" rx="10" fill="url(#p5)" filter="url(#glow)" stroke="#0c4a6e" strokeWidth="2" />
        <text x="110" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">PART V</text>
        <text x="110" y="50" textAnchor="middle" fill="white" fontSize="11" fontStyle="italic">Human Freedom</text>
        <text x="110" y="75" textAnchor="middle" fill="white" fontSize="10">• Understanding Frees</text>
        <text x="110" y="92" textAnchor="middle" fill="white" fontSize="10">• Intuitive Knowledge</text>
        <text x="110" y="109" textAnchor="middle" fill="white" fontSize="10">• Intellectual Love of God</text>
        <text x="110" y="126" textAnchor="middle" fill="white" fontSize="10">• Eternity of Mind</text>
        <text x="110" y="143" textAnchor="middle" fill="white" fontSize="10">• Blessedness = Virtue</text>
      </g>

      {/* Bottom summary paths */}
      <g transform="translate(80, 520)">
        <rect width="450" height="90" rx="10" fill="#ff6b6b" opacity="0.85" filter="url(#glow)" />
        <text x="225" y="30" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">PATH OF BONDAGE</text>
        <text x="225" y="55" textAnchor="middle" fill="white" fontSize="12">
          Ignorance → Inadequate Ideas → Passions
        </text>
        <text x="225" y="75" textAnchor="middle" fill="white" fontSize="12">
          → Bondage → Suffering
        </text>
      </g>

      <g transform="translate(570, 520)">
        <rect width="450" height="90" rx="10" fill="#51cf66" opacity="0.85" filter="url(#glow)" />
        <text x="225" y="30" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">PATH OF LIBERATION</text>
        <text x="225" y="55" textAnchor="middle" fill="white" fontSize="12">
          Understanding → Adequate Ideas → Actions
        </text>
        <text x="225" y="75" textAnchor="middle" fill="white" fontSize="12">
          → Freedom → Blessedness
        </text>
      </g>

      {/* Geometric method */}
      <ellipse cx="550" cy="690" rx="200" ry="60" fill="#4a90e2" opacity="0.9" filter="url(#glow)" />
      <text x="550" y="680" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
        GEOMETRIC METHOD
      </text>
      <text x="550" y="705" textAnchor="middle" fill="white" fontSize="11">
        Each part follows with mathematical necessity
      </text>

      {/* Knowledge progression */}
      <g transform="translate(100, 780)">
        <rect width="900" height="80" rx="8" fill="#f8f9fa" stroke="#868e96" strokeWidth="2" />
        <text x="450" y="25" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#495057">
          Three Kinds of Knowledge → Three Levels of Being
        </text>
        <text x="150" y="50" textAnchor="middle" fontSize="11" fill="#e03131" fontWeight="600">IMAGINATION</text>
        <text x="150" y="66" textAnchor="middle" fontSize="9" fill="#e03131">Inadequate • Bondage</text>
        <text x="450" y="50" textAnchor="middle" fontSize="11" fill="#fd7e14" fontWeight="600">REASON</text>
        <text x="450" y="66" textAnchor="middle" fontSize="9" fill="#fd7e14">Adequate • Power</text>
        <text x="750" y="50" textAnchor="middle" fontSize="11" fill="#2b8a3e" fontWeight="600">INTUITION</text>
        <text x="750" y="66" textAnchor="middle" fontSize="9" fill="#2b8a3e">Sub specie aeternitatis • Freedom</text>

        <path d="M 230 58 L 370 58" stroke="#495057" strokeWidth="2" markerEnd="url(#arrow)" />
        <path d="M 530 58 L 670 58" stroke="#495057" strokeWidth="2" markerEnd="url(#arrow)" />
      </g>

      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0,0 0,6 9,3" fill="#495057" />
        </marker>
      </defs>
    </svg>
  );

  const ParallelismDiagram = () => (
    <svg width="100%" height="700" viewBox="0 0 1000 700">
      {/* Title */}
      <text x="500" y="30" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#343a40">
        Mind-Body Parallelism: One Thing, Two Ways
      </text>

      {/* Left: Thought */}
      <g transform="translate(80, 70)">
        <rect width="350" height="550" rx="12" fill="#e7f5ff" stroke="#4dabf7" strokeWidth="3" />
        <text x="175" y="35" textAnchor="middle" fontSize="19" fontWeight="bold" fill="#1864ab">
          ATTRIBUTE OF THOUGHT
        </text>

        <ellipse cx="175" cy="85" rx="130" ry="38" fill="#4dabf7" opacity="0.9" />
        <text x="175" y="92" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white">
          GOD as Thinking Thing
        </text>

        <line x1="175" y1="123" x2="175" y2="155" stroke="#4dabf7" strokeWidth="3" />

        <rect x="60" y="155" width="230" height="65" rx="6" fill="#a5d8ff" stroke="#1971c2" strokeWidth="2" />
        <text x="175" y="182" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1864ab">
          Infinite Immediate Mode
        </text>
        <text x="175" y="202" textAnchor="middle" fontSize="10" fill="#1864ab" fontStyle="italic">
          (Infinite Intellect, Laws of Thought)
        </text>

        <line x1="175" y1="220" x2="175" y2="245" stroke="#4dabf7" strokeWidth="3" />

        <rect x="60" y="245" width="230" height="45" rx="5" fill="#74c0fc" stroke="#1971c2" strokeWidth="1.5" />
        <text x="175" y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1864ab">
          Causal Chains of Ideas
        </text>

        <line x1="175" y1="290" x2="175" y2="315" stroke="#4dabf7" strokeWidth="3" />

        <rect x="60" y="315" width="230" height="85" rx="6" fill="#339af0" stroke="#1864ab" strokeWidth="2" />
        <text x="175" y="340" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white">
          Finite Ideas
        </text>
        <text x="175" y="362" textAnchor="middle" fontSize="11" fill="white">
          Idea₁ → Idea₂ → Idea₃ → ...
        </text>
        <text x="175" y="382" textAnchor="middle" fontSize="9" fill="white" fontStyle="italic">
          Mental causation complete within thought
        </text>

        <line x1="175" y1="400" x2="175" y2="425" stroke="#1864ab" strokeWidth="4" />

        <rect x="45" y="425" width="260" height="110" rx="8" fill="#1864ab" stroke="#0c4a6e" strokeWidth="3" filter="url(#glow)" />
        <text x="175" y="458" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">
          HUMAN MIND
        </text>
        <text x="175" y="480" textAnchor="middle" fontSize="12" fill="white">
          = Idea of Human Body
        </text>
        <text x="175" y="502" textAnchor="middle" fontSize="10" fill="white">• Adequate Ideas (actions)</text>
        <text x="175" y="520" textAnchor="middle" fontSize="10" fill="white">• Inadequate Ideas (passions)</text>
      </g>

      {/* Right: Extension */}
      <g transform="translate(570, 70)">
        <rect width="350" height="550" rx="12" fill="#fff4e6" stroke="#fd7e14" strokeWidth="3" />
        <text x="175" y="35" textAnchor="middle" fontSize="19" fontWeight="bold" fill="#d9480f">
          ATTRIBUTE OF EXTENSION
        </text>

        <ellipse cx="175" cy="85" rx="130" ry="38" fill="#fd7e14" opacity="0.9" />
        <text x="175" y="92" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white">
          GOD as Extended Thing
        </text>

        <line x1="175" y1="123" x2="175" y2="155" stroke="#fd7e14" strokeWidth="3" />

        <rect x="60" y="155" width="230" height="65" rx="6" fill="#ffc078" stroke="#d9480f" strokeWidth="2" />
        <text x="175" y="182" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#d9480f">
          Infinite Immediate Mode
        </text>
        <text x="175" y="202" textAnchor="middle" fontSize="10" fill="#d9480f" fontStyle="italic">
          (Motion & Rest, Laws of Physics)
        </text>

        <line x1="175" y1="220" x2="175" y2="245" stroke="#fd7e14" strokeWidth="3" />

        <rect x="60" y="245" width="230" height="45" rx="5" fill="#ff922b" stroke="#d9480f" strokeWidth="1.5" />
        <text x="175" y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill="#d9480f">
          Causal Chains of Bodies
        </text>

        <line x1="175" y1="290" x2="175" y2="315" stroke="#fd7e14" strokeWidth="3" />

        <rect x="60" y="315" width="230" height="85" rx="6" fill="#ff8787" stroke="#c92a2a" strokeWidth="2" />
        <text x="175" y="340" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white">
          Finite Bodies
        </text>
        <text x="175" y="362" textAnchor="middle" fontSize="11" fill="white">
          Body₁ → Body₂ → Body₃ → ...
        </text>
        <text x="175" y="382" textAnchor="middle" fontSize="9" fill="white" fontStyle="italic">
          Physical causation complete within extension
        </text>

        <line x1="175" y1="400" x2="175" y2="425" stroke="#c92a2a" strokeWidth="4" />

        <rect x="45" y="425" width="260" height="110" rx="8" fill="#c92a2a" stroke="#7d1a1a" strokeWidth="3" filter="url(#glow)" />
        <text x="175" y="458" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">
          HUMAN BODY
        </text>
        <text x="175" y="480" textAnchor="middle" fontSize="12" fill="white">
          = Complex Physical Individual
        </text>
        <text x="175" y="502" textAnchor="middle" fontSize="10" fill="white">• Body's affections</text>
        <text x="175" y="520" textAnchor="middle" fontSize="10" fill="white">• Physical states & motions</text>
      </g>

      {/* Parallelism connections */}
      <line x1="430" y1="120" x2="570" y2="120" stroke="#e64980" strokeWidth="2.5" strokeDasharray="6,3" opacity="0.7" />
      <line x1="430" y1="188" x2="570" y2="188" stroke="#e64980" strokeWidth="2.5" strokeDasharray="6,3" opacity="0.7" />
      <line x1="430" y1="268" x2="570" y2="268" stroke="#e64980" strokeWidth="2.5" strokeDasharray="6,3" opacity="0.7" />
      <line x1="430" y1="357" x2="570" y2="357" stroke="#e64980" strokeWidth="2.5" strokeDasharray="6,3" opacity="0.7" />

      {/* Main parallelism arrow */}
      <line x1="430" y1="480" x2="570" y2="480" stroke="#e64980" strokeWidth="5" strokeDasharray="10,5" />
      <circle cx="430" cy="480" r="8" fill="#e64980" />
      <circle cx="570" cy="480" r="8" fill="#e64980" />

      {/* Central explanation */}
      <rect x="430" y="460" width="140" height="80" rx="8" fill="#e64980" filter="url(#glow)" />
      <text x="500" y="485" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">
        PARALLELISM
      </text>
      <text x="500" y="505" textAnchor="middle" fontSize="10" fill="white">
        One thing expressed
      </text>
      <text x="500" y="522" textAnchor="middle" fontSize="10" fill="white">
        in two ways (IIP7)
      </text>

      {/* No interaction X */}
      <g transform="translate(475, 310)">
        <circle r="25" fill="white" stroke="#e64980" strokeWidth="2.5" />
        <line x1="-17" y1="-17" x2="17" y2="17" stroke="#e64980" strokeWidth="3.5" />
        <line x1="17" y1="-17" x2="-17" y2="17" stroke="#e64980" strokeWidth="3.5" />
        <text x="0" y="50" textAnchor="middle" fontSize="10" fill="#e64980" fontWeight="bold">
          NO CAUSAL
        </text>
        <text x="0" y="63" textAnchor="middle" fontSize="10" fill="#e64980" fontWeight="bold">
          INTERACTION
        </text>
      </g>

      {/* Bottom explanation */}
      <rect x="100" y="650" width="800" height="40" rx="6" fill="#f8f9fa" stroke="#adb5bd" strokeWidth="2" />
      <text x="500" y="675" textAnchor="middle" fontSize="11" fill="#343a40" fontWeight="600">
        "The order and connection of ideas is the same as the order and connection of things" (IIP7)
      </text>
    </svg>
  );

  const AffectsDiagram = () => (
    <svg width="100%" height="800" viewBox="0 0 1100 800">
      <text x="550" y="35" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#343a40">
        From Bondage to Freedom Through Understanding
      </text>

      {/* Central Conatus */}
      <ellipse cx="550" cy="100" rx="150" ry="50" fill="#4c6ef5" opacity="0.9" filter="url(#glow)" />
      <text x="550" y="95" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">CONATUS</text>
      <text x="550" y="115" textAnchor="middle" fontSize="11" fill="white">Striving to persevere = Essence (IIIP7)</text>

      {/* Left path - Bondage */}
      <g transform="translate(70, 200)">
        <rect width="400" height="500" rx="12" fill="#ffe3e3" stroke="#fa5252" strokeWidth="3" />
        <text x="200" y="35" textAnchor="middle" fontSize="19" fontWeight="bold" fill="#c92a2a">
          PATH OF BONDAGE
        </text>

        <rect x="50" y="60" width="300" height="80" rx="8" fill="#ffc9c9" stroke="#fa5252" strokeWidth="2" />
        <text x="200" y="85" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#c92a2a">
          INADEQUATE IDEAS
        </text>
        <text x="200" y="105" textAnchor="middle" fontSize="10" fill="#7d1a1a">
          Confused • Partial • From external causes
        </text>
        <text x="200" y="122" textAnchor="middle" fontSize="9" fill="#7d1a1a" fontStyle="italic">
          First kind of knowledge (imagination)
        </text>

        <path d="M 200 140 L 200 170" stroke="#fa5252" strokeWidth="3" markerEnd="url(#arrowRed)" />

        <rect x="50" y="170" width="300" height="140" rx="8" fill="#ff6b6b" stroke="#c92a2a" strokeWidth="2" />
        <text x="200" y="195" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">
          PASSIVE AFFECTS
        </text>
        <text x="200" y="215" textAnchor="middle" fontSize="11" fill="white">
          (Passions)
        </text>
        <text x="200" y="235" textAnchor="middle" fontSize="10" fill="white">
          • Joy from external causes
        </text>
        <text x="200" y="252" textAnchor="middle" fontSize="10" fill="white">
          • Sadness from external causes
        </text>
        <text x="200" y="269" textAnchor="middle" fontSize="10" fill="white">
          • Desire from imagination
        </text>
        <text x="200" y="290" textAnchor="middle" fontSize="9" fill="white" fontStyle="italic">
          Love, Hate, Hope, Fear, Anger...
        </text>

        <path d="M 200 310 L 200 340" stroke="#c92a2a" strokeWidth="3" markerEnd="url(#arrowRed)" />

        <rect x="50" y="340" width="300" height="140" rx="8" fill="#c92a2a" stroke="#7d1a1a" strokeWidth="2" filter="url(#glow)" />
        <text x="200" y="365" textAnchor="middle" fontSize="15" fontWeight="bold" fill="white">
          BONDAGE
        </text>
        <text x="200" y="390" textAnchor="middle" fontSize="11" fill="white">
          • Determined by external causes
        </text>
        <text x="200" y="408" textAnchor="middle" fontSize="11" fill="white">
          • Fluctuating emotions
        </text>
        <text x="200" y="426" textAnchor="middle" fontSize="11" fill="white">
          • See better, do worse (IVPreface)
        </text>
        <text x="200" y="444" textAnchor="middle" fontSize="11" fill="white">
          • Slavery to transient goods
        </text>
        <text x="200" y="462" textAnchor="middle" fontSize="11" fill="white">
          • Suffering & conflict
        </text>
      </g>

      {/* Right path - Freedom */}
      <g transform="translate(630, 200)">
        <rect width="400" height="500" rx="12" fill="#d3f9d8" stroke="#51cf66" strokeWidth="3" />
        <text x="200" y="35" textAnchor="middle" fontSize="19" fontWeight="bold" fill="#2b8a3e">
          PATH OF FREEDOM
        </text>

        <rect x="50" y="60" width="300" height="80" rx="8" fill="#b2f2bb" stroke="#51cf66" strokeWidth="2" />
        <text x="200" y="85" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#2b8a3e">
          ADEQUATE IDEAS
        </text>
        <text x="200" y="105" textAnchor="middle" fontSize="10" fill="#2f4f2f">
          Clear & distinct • Complete • From our nature
        </text>
        <text x="200" y="122" textAnchor="middle" fontSize="9" fill="#2f4f2f" fontStyle="italic">
          Second & third kinds of knowledge
        </text>

        <path d="M 200 140 L 200 170" stroke="#51cf66" strokeWidth="3" markerEnd="url(#arrowGreen)" />

        <rect x="50" y="170" width="300" height="140" rx="8" fill="#69db7c" stroke="#2b8a3e" strokeWidth="2" />
        <text x="200" y="195" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">
          ACTIVE AFFECTS
        </text>
        <text x="200" y="215" textAnchor="middle" fontSize="11" fill="white">
          (Actions)
        </text>
        <text x="200" y="235" textAnchor="middle" fontSize="10" fill="white">
          • Active joy from understanding
        </text>
        <text x="200" y="252" textAnchor="middle" fontSize="10" fill="white">
          • Active desire from reason
        </text>
        <text x="200" y="269" textAnchor="middle" fontSize="10" fill="white">
          • Tenacity & Nobility (IIIP59)
        </text>
        <text x="200" y="290" textAnchor="middle" fontSize="9" fill="white" fontStyle="italic">
          Intellectual love, Self-esteem...
        </text>

        <path d="M 200 310 L 200 340" stroke="#2b8a3e" strokeWidth="3" markerEnd="url(#arrowGreen)" />

        <rect x="50" y="340" width="300" height="140" rx="8" fill="#2b8a3e" stroke="#1a5a1a" strokeWidth="2" filter="url(#glow)" />
        <text x="200" y="365" textAnchor="middle" fontSize="15" fontWeight="bold" fill="white">
          FREEDOM
        </text>
        <text x="200" y="390" textAnchor="middle" fontSize="11" fill="white">
          • Self-determined through knowledge
        </text>
        <text x="200" y="408" textAnchor="middle" fontSize="11" fill="white">
          • Stable emotions
        </text>
        <text x="200" y="426" textAnchor="middle" fontSize="11" fill="white">
          • Virtue = Power (IVd8)
        </text>
        <text x="200" y="444" textAnchor="middle" fontSize="11" fill="white">
          • Love of eternal goods
        </text>
        <text x="200" y="462" textAnchor="middle" fontSize="11" fill="white">
          • Blessedness & peace
        </text>
      </g>

      {/* Transformation arrow */}
      <path d="M 470 450 L 630 450" stroke="#845ef7" strokeWidth="5" markerEnd="url(#arrowPurple)" strokeDasharray="10,5" />
      <rect x="470" y="410" width="160" height="80" rx="8" fill="#845ef7" filter="url(#glow)" />
      <text x="550" y="435" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">
        TRANSFORMATION
      </text>
      <text x="550" y="455" textAnchor="middle" fontSize="9" fill="white">
        VP3: Clear idea of affect
      </text>
      <text x="550" y="470" textAnchor="middle" fontSize="9" fill="white">
        transforms passion → action
      </text>

      {/* Connection from conatus */}
      <path d="M 450 120 Q 270 160 270 260" stroke="#fa5252" strokeWidth="3" fill="none" strokeDasharray="5,5" />
      <path d="M 650 120 Q 830 160 830 260" stroke="#51cf66" strokeWidth="3" fill="none" strokeDasharray="5,5" />

      {/* Bottom note */}
      <rect x="150" y="740" width="800" height="45" rx="6" fill="#f8f9fa" stroke="#adb5bd" strokeWidth="2" />
      <text x="550" y="765" textAnchor="middle" fontSize="11" fill="#343a40" fontWeight="600">
        Both paths are determined. Freedom ≠ Indetermination, but Self-Determination through Knowledge.
      </text>

      <defs>
        <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0,0 0,6 9,3" fill="#fa5252" />
        </marker>
        <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0,0 0,6 9,3" fill="#51cf66" />
        </marker>
        <marker id="arrowPurple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0,0 0,6 9,3" fill="#845ef7" />
        </marker>
      </defs>
    </svg>
  );

  const PowerDiagram = () => (
    <svg width="100%" height="750" viewBox="0 0 1000 750">
      <text x="500" y="35" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#343a40">
        From Conatus to Blessedness: The Power Equation
      </text>

      {/* God's Essence/Power */}
      <ellipse cx="500" cy="100" rx="180" ry="55" fill="#667eea" opacity="0.9" filter="url(#glow)" />
      <text x="500" y="95" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">
        GOD'S ESSENCE = GOD'S POWER
      </text>
      <text x="500" y="115" textAnchor="middle" fontSize="11" fill="white">
        Infinite productive power (IP34)
      </text>

      <line x1="500" y1="155" x2="500" y2="195" stroke="#667eea" strokeWidth="3" />

      {/* Conatus */}
      <rect x="350" y="195" width="300" height="90" rx="10" fill="#4dabf7" stroke="#1971c2" strokeWidth="2" filter="url(#glow)" />
      <text x="500" y="230" textAnchor="middle" fontSize="17" fontWeight="bold" fill="white">
        CONATUS
      </text>
      <text x="500" y="252" textAnchor="middle" fontSize="12" fill="white">
        Each thing's striving = its essence (IIIP7)
      </text>
      <text x="500" y="270" textAnchor="middle" fontSize="10" fill="white" fontStyle="italic">
        Finite expression of God's power
      </text>

      {/* Split to affects and knowledge */}
      <line x1="400" y1="285" x2="250" y2="340" stroke="#4dabf7" strokeWidth="2.5" />
      <line x1="600" y1="285" x2="750" y2="340" stroke="#4dabf7" strokeWidth="2.5" />

      {/* Affects branch */}
      <g transform="translate(50, 340)">
        <rect width="300" height="140" rx="10" fill="#ffc078" stroke="#fd7e14" strokeWidth="2" />
        <text x="150" y="30" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#d9480f">
          AFFECTS
        </text>
        <text x="150" y="48" textAnchor="middle" fontSize="10" fill="#7d2d0f">
          Transitions in power
        </text>
        <rect x="20" y="60" width="120" height="60" rx="5" fill="#51cf66" stroke="#2b8a3e" strokeWidth="1.5" />
        <text x="80" y="80" textAnchor="middle" fontSize="11" fontWeight="600" fill="white">JOY</text>
        <text x="80" y="98" textAnchor="middle" fontSize="9" fill="white">↑ Power</text>
        <text x="80" y="112" textAnchor="middle" fontSize="9" fill="white">Greater perfection</text>

        <rect x="160" y="60" width="120" height="60" rx="5" fill="#ff6b6b" stroke="#c92a2a" strokeWidth="1.5" />
        <text x="220" y="80" textAnchor="middle" fontSize="11" fontWeight="600" fill="white">SADNESS</text>
        <text x="220" y="98" textAnchor="middle" fontSize="9" fill="white">↓ Power</text>
        <text x="220" y="112" textAnchor="middle" fontSize="9" fill="white">Lesser perfection</text>
      </g>

      {/* Knowledge branch */}
      <g transform="translate(650, 340)">
        <rect width="300" height="140" rx="10" fill="#a5d8ff" stroke="#4dabf7" strokeWidth="2" />
        <text x="150" y="30" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1864ab">
          KNOWLEDGE
        </text>
        <text x="150" y="48" textAnchor="middle" fontSize="10" fill="#0c4a6e">
          Degrees of understanding
        </text>
        <rect x="10" y="60" width="85" height="60" rx="5" fill="#ff6b6b" stroke="#c92a2a" strokeWidth="1.5" />
        <text x="52" y="80" textAnchor="middle" fontSize="9" fontWeight="600" fill="white">Inadequate</text>
        <text x="52" y="98" textAnchor="middle" fontSize="8" fill="white">Imagination</text>
        <text x="52" y="112" textAnchor="middle" fontSize="8" fill="white">↓ Power</text>

        <rect x="107" y="60" width="85" height="60" rx="5" fill="#ffd43b" stroke="#f59f00" strokeWidth="1.5" />
        <text x="150" y="80" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7d4f00">Adequate</text>
        <text x="150" y="98" textAnchor="middle" fontSize="8" fill="#7d4f00">Reason</text>
        <text x="150" y="112" textAnchor="middle" fontSize="8" fill="#7d4f00">↑ Power</text>

        <rect x="205" y="60" width="85" height="60" rx="5" fill="#51cf66" stroke="#2b8a3e" strokeWidth="1.5" />
        <text x="247" y="80" textAnchor="middle" fontSize="9" fontWeight="600" fill="white">Adequate</text>
        <text x="247" y="98" textAnchor="middle" fontSize="8" fill="white">Intuition</text>
        <text x="247" y="112" textAnchor="middle" fontSize="8" fill="white">↑↑ Power</text>
      </g>

      {/* Converge to Virtue */}
      <line x1="200" y1="480" x2="400" y2="540" stroke="#69db7c" strokeWidth="2.5" />
      <line x1="800" y1="480" x2="600" y2="540" stroke="#69db7c" strokeWidth="2.5" />

      <rect x="350" y="540" width="300" height="90" rx="10" fill="#37b24d" stroke="#2b8a3e" strokeWidth="2" filter="url(#glow)" />
      <text x="500" y="570" textAnchor="middle" fontSize="17" fontWeight="bold" fill="white">
        VIRTUE = POWER
      </text>
      <text x="500" y="592" textAnchor="middle" fontSize="11" fill="white">
        Acting from reason = Self-determination (IVd8)
      </text>
      <text x="500" y="612" textAnchor="middle" fontSize="10" fill="white" fontStyle="italic">
        Maximum capacity to exist and act
      </text>

      <line x1="500" y1="630" x2="500" y2="660" stroke="#37b24d" strokeWidth="3" />

      {/* Blessedness */}
      <ellipse cx="500" cy="695" rx="190" ry="50" fill="#2b8a3e" opacity="0.95" filter="url(#glow)" />
      <text x="500" y="690" textAnchor="middle" fontSize="17" fontWeight="bold" fill="white">
        BLESSEDNESS
      </text>
      <text x="500" y="710" textAnchor="middle" fontSize="11" fill="white">
        Not reward for virtue, but virtue itself (VP42)
      </text>

      {/* Side boxes */}
      <rect x="50" y="575" width="250" height="130" rx="8" fill="#f8f9fa" stroke="#868e96" strokeWidth="2" />
      <text x="175" y="600" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#495057">
        THE POWER EQUATION
      </text>
      <text x="175" y="625" textAnchor="middle" fontSize="10" fill="#495057">
        More adequate ideas
      </text>
      <text x="175" y="642" textAnchor="middle" fontSize="10" fill="#495057">
        = More power = More virtue
      </text>
      <text x="175" y="659" textAnchor="middle" fontSize="10" fill="#495057">
        = More joy
      </text>
      <text x="175" y="676" textAnchor="middle" fontSize="10" fill="#495057">
        = More blessedness
      </text>

      <rect x="700" y="575" width="250" height="130" rx="8" fill="#f8f9fa" stroke="#868e96" strokeWidth="2" />
      <text x="825" y="600" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#495057">
        INTELLECTUAL LOVE
      </text>
      <text x="825" y="625" textAnchor="middle" fontSize="10" fill="#495057">
        VP32c: Joy from third kind
      </text>
      <text x="825" y="642" textAnchor="middle" fontSize="10" fill="#495057">
        of knowledge + idea of God
      </text>
      <text x="825" y="659" textAnchor="middle" fontSize="10" fill="#495057">
        VP36: Mind's love =
      </text>
      <text x="825" y="676" textAnchor="middle" fontSize="10" fill="#495057">
        God's self-love
      </text>
    </svg>
  );

  const SystemDiagram = () => (
    <svg width="100%" height="1000" viewBox="0 0 1200 1000">
      <text x="600" y="35" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#212529">
        The Complete System of Spinoza's Ethics
      </text>

      {/* Layer 1: Metaphysics */}
      <rect x="50" y="60" width="1100" height="140" rx="10" fill="#e7f5ff" stroke="#4dabf7" strokeWidth="3" />
      <text x="100" y="88" fontSize="16" fontWeight="bold" fill="#1971c2">METAPHYSICS</text>

      <ellipse cx="340" cy="125" rx="90" ry="40" fill="#667eea" opacity="0.9" />
      <text x="340" y="125" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white">SUBSTANCE</text>
      <text x="340" y="140" textAnchor="middle" fontSize="9" fill="white">One God/Nature</text>

      <rect x="480" y="95" width="140" height="60" rx="6" fill="#4dabf7" />
      <text x="550" y="120" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">Thought</text>
      <text x="550" y="138" textAnchor="middle" fontSize="9" fill="white">Attribute</text>

      <rect x="640" y="95" width="140" height="60" rx="6" fill="#fa709a" />
      <text x="710" y="120" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">Extension</text>
      <text x="710" y="138" textAnchor="middle" fontSize="9" fill="white">Attribute</text>

      <rect x="800" y="95" width="140" height="60" rx="6" fill="#d3d3d3" />
      <text x="870" y="120" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#666">∞ Others</text>
      <text x="870" y="138" textAnchor="middle" fontSize="9" fill="#666">Unknown</text>

      <text x="1000" y="125" fontSize="10" fill="#1971c2">IP14, IP15, IP29</text>

      {/* Layer 2: Epistemology */}
      <rect x="50" y="220" width="1100" height="120" rx="10" fill="#fff5f5" stroke="#fa709a" strokeWidth="3" />
      <text x="100" y="248" fontSize="16" fontWeight="bold" fill="#c92a2a">EPISTEMOLOGY</text>

      <rect x="150" y="260" width="270" height="60" rx="6" fill="#ff6b6b" />
      <text x="285" y="282" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">1st Kind: IMAGINATION</text>
      <text x="285" y="300" textAnchor="middle" fontSize="9" fill="white">Inadequate • Confused • Error</text>

      <rect x="465" y="260" width="270" height="60" rx="6" fill="#ffd43b" />
      <text x="600" y="282" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7d4f00">2nd Kind: REASON</text>
      <text x="600" y="300" textAnchor="middle" fontSize="9" fill="#7d4f00">Adequate • Common notions</text>

      <rect x="780" y="260" width="270" height="60" rx="6" fill="#51cf66" />
      <text x="915" y="282" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">3rd Kind: INTUITION</text>
      <text x="915" y="300" textAnchor="middle" fontSize="9" fill="white">Adequate • Essence grasp</text>

      {/* Layer 3: Psychology */}
      <rect x="50" y="360" width="1100" height="180" rx="10" fill="#fff9db" stroke="#f59f00" strokeWidth="3" />
      <text x="100" y="388" fontSize="16" fontWeight="bold" fill="#e67700">PSYCHOLOGY</text>

      <ellipse cx="280" cy="445" rx="80" ry="35" fill="#4c6ef5" opacity="0.9" />
      <text x="280" y="445" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">CONATUS</text>
      <text x="280" y="460" textAnchor="middle" fontSize="8" fill="white">Essence</text>

      <rect x="400" y="400" width="280" height="90" rx="6" fill="#ffc9c9" stroke="#fa5252" strokeWidth="2" />
      <text x="540" y="422" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#c92a2a">PASSIVE AFFECTS</text>
      <text x="540" y="440" textAnchor="middle" fontSize="9" fill="#7d1a1a">From inadequate ideas</text>
      <text x="540" y="458" textAnchor="middle" fontSize="9" fill="#7d1a1a">Joy, Sadness, Desire + derivatives</text>
      <text x="540" y="476" textAnchor="middle" fontSize="9" fill="#7d1a1a">→ BONDAGE</text>

      <rect x="720" y="400" width="280" height="90" rx="6" fill="#b2f2bb" stroke="#51cf66" strokeWidth="2" />
      <text x="860" y="422" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2b8a3e">ACTIVE AFFECTS</text>
      <text x="860" y="440" textAnchor="middle" fontSize="9" fill="#1a5a1a">From adequate ideas</text>
      <text x="860" y="458" textAnchor="middle" fontSize="9" fill="#1a5a1a">Active joy, Active desire</text>
      <text x="860" y="476" textAnchor="middle" fontSize="9" fill="#1a5a1a">→ FREEDOM</text>

      <line x1="360" y1="445" x2="400" y2="445" stroke="#fa5252" strokeWidth="2" />
      <line x1="360" y1="445" x2="720" y2="445" stroke="#51cf66" strokeWidth="2" />

      {/* Layer 4: Ethics */}
      <rect x="50" y="560" width="540" height="380" rx="10" fill="#ffe3e3" stroke="#fa5252" strokeWidth="3" />
      <text x="100" y="590" fontSize="16" fontWeight="bold" fill="#c92a2a">BONDAGE PATH</text>

      <rect x="100" y="610" width="440" height="70" rx="6" fill="#ffc9c9" />
      <text x="320" y="635" textAnchor="middle" fontSize="11" fontWeight="600" fill="#c92a2a">Inadequate Ideas</text>
      <text x="320" y="653" textAnchor="middle" fontSize="9" fill="#7d1a1a">Confused perception • External causes</text>

      <path d="M 320 680 L 320 710" stroke="#fa5252" strokeWidth="3" />

      <rect x="100" y="710" width="440" height="70" rx="6" fill="#ff8787" />
      <text x="320" y="735" textAnchor="middle" fontSize="11" fontWeight="600" fill="white">Passions</text>
      <text x="320" y="753" textAnchor="middle" fontSize="9" fill="white">Determined by fortune • Fluctuating</text>

      <path d="M 320 780 L 320 810" stroke="#c92a2a" strokeWidth="3" />

      <rect x="100" y="810" width="440" height="100" rx="6" fill="#c92a2a" />
      <text x="320" y="840" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white">BONDAGE</text>
      <text x="320" y="862" textAnchor="middle" fontSize="10" fill="white">Weakness • See better, do worse</text>
      <text x="320" y="880" textAnchor="middle" fontSize="10" fill="white">Slavery to transient goods</text>
      <text x="320" y="898" textAnchor="middle" fontSize="10" fill="white">Suffering • Conflict</text>

      {/* Liberation path */}
      <rect x="610" y="560" width="540" height="380" rx="10" fill="#d3f9d8" stroke="#51cf66" strokeWidth="3" />
      <text x="660" y="590" fontSize="16" fontWeight="bold" fill="#2b8a3e">LIBERATION PATH</text>

      <rect x="660" y="610" width="440" height="70" rx="6" fill="#b2f2bb" />
      <text x="880" y="635" textAnchor="middle" fontSize="11" fontWeight="600" fill="#2b8a3e">Adequate Ideas</text>
      <text x="880" y="653" textAnchor="middle" fontSize="9" fill="#1a5a1a">Clear & distinct • From our nature</text>

      <path d="M 880 680 L 880 710" stroke="#51cf66" strokeWidth="3" />

      <rect x="660" y="710" width="440" height="70" rx="6" fill="#69db7c" />
      <text x="880" y="735" textAnchor="middle" fontSize="11" fontWeight="600" fill="white">Actions</text>
      <text x="880" y="753" textAnchor="middle" fontSize="9" fill="white">Self-determined • Stable emotions</text>

      <path d="M 880 780 L 880 810" stroke="#2b8a3e" strokeWidth="3" />

      <rect x="660" y="810" width="440" height="70" rx="6" fill="#37b24d" />
      <text x="880" y="840" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white">VIRTUE = POWER</text>
      <text x="880" y="862" textAnchor="middle" fontSize="10" fill="white">Acting from reason • Self-determination</text>

      <path d="M 880 880 L 880 905" stroke="#2b8a3e" strokeWidth="3" />

      <ellipse cx="880" cy="925" rx="140" ry="30" fill="#2b8a3e" opacity="0.95" />
      <text x="880" y="930" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">BLESSEDNESS</text>

      {/* Transformation arrow */}
      <path d="M 540 750 L 610 750" stroke="#845ef7" strokeWidth="5" markerEnd="url(#arrowPurple)" />
      <rect x="510" y="720" width="130" height="60" rx="6" fill="#845ef7" />
      <text x="575" y="745" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">TRANSFORM</text>
      <text x="575" y="762" textAnchor="middle" fontSize="8" fill="white">Understanding</text>

      {/* Connecting themes */}
      <g opacity="0.3">
        <line x1="340" y1="125" x2="600" y2="280" stroke="#4dabf7" strokeWidth="2" strokeDasharray="5,5" />
        <line x1="600" y1="320" x2="540" y2="400" stroke="#ffd43b" strokeWidth="2" strokeDasharray="5,5" />
        <line x1="915" y1="320" x2="860" y2="400" stroke="#51cf66" strokeWidth="2" strokeDasharray="5,5" />
      </g>

      {/* Key insights */}
      <rect x="50" y="960" width="550" height="30" rx="5" fill="#f8f9fa" stroke="#adb5bd" strokeWidth="1" />
      <text x="325" y="980" textAnchor="middle" fontSize="10" fill="#495057" fontWeight="600">
        Everything in God → Mind = Idea of Body → Conatus → Affects → Bondage or Freedom
      </text>

      <rect x="620" y="960" width="530" height="30" rx="5" fill="#f8f9fa" stroke="#adb5bd" strokeWidth="1" />
      <text x="885" y="980" textAnchor="middle" fontSize="10" fill="#495057" fontWeight="600">
        Freedom through Knowledge → Blessedness = Virtue itself (VP42)
      </text>
    </svg>
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Spinoza's Ethics
          </h1>
          <p className="text-xl text-gray-600">Interactive Visual Exploration</p>
          <p className="text-sm text-gray-500 mt-2">
            From Substance to Blessedness: A Complete Philosophical System
          </p>
        </div>

        {/* View tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {views.map(view => {
            const Icon = view.icon;
            return (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${activeView === view.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                  }`}
              >
                <Icon size={20} />
                {view.name}
              </button>
            );
          })}
        </div>

        {/* Diagram container */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 overflow-auto">
          {activeView === 'hierarchy' && <HierarchyDiagram />}
          {activeView === 'flow' && <FlowDiagram />}
          {activeView === 'parallelism' && <ParallelismDiagram />}
          {activeView === 'affects' && <AffectsDiagram />}
          {activeView === 'power' && <PowerDiagram />}
          {activeView === 'system' && <SystemDiagram />}
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p className="italic">
            "All things excellent are as difficult as they are rare." - Ethics V, Scholium to P42
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpinozaEthicsDiagram;
