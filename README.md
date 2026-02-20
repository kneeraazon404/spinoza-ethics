# Spinoza's Ethics - Interactive Visual Exploration

An interactive, visual journey through Baruch Spinoza's *Ethics*, designed to make his complex metaphysical system accessible and engaging. This application visualizes the hierarchy of being, from Substance to Blessedness, using interactive diagrams and AI-powered explanations.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwind-css)
![Groq](https://img.shields.io/badge/Groq-API-f59e0b?logo=groq)

## Features

- **Interactive Diagrams** - Explore the relationships between Substance, Attributes, and Modes through dynamic visualizations
  - **Hierarchy** - The ontological structure of the universe
  - **Flow** - The causal flow from God to finite things
  - **Parallelism** - The correspondence between Mind and Body
  - **Affects** - The transition from human bondage to freedom
  - **Power & Virtue** - The ethical implications of Spinoza's system
- **Geometric Advisor** - AI-powered assistant that explains concepts in Spinoza's geometric style
- **Dark/Light Theme** - Toggle between themes for comfortable viewing
- **Responsive Design** - Optimized for desktop and tablet

## Live Demo

[https://spinoza-ethics.vercel.app](https://spinoza-ethics.vercel.app)

## Sample Images 
<img width="2077" height="1364" alt="consultation" src="https://github.com/user-attachments/assets/90f1df33-10cc-4bf6-94f4-c6b11d726a98" /> <img width="1961" height="1125" alt="image" src="https://github.com/user-attachments/assets/fe15f5e5-7629-4698-a994-6f659f7d8741" />
<img width="2120" height="1346" alt="image" src="https://github.com/user-attachments/assets/6964755c-301d-4902-861a-eff80cccae10" />


## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v4 |
| Icons | [Lucide React](https://lucide.dev/) |
| AI | [Groq Cloud](https://groq.com/) + Llama 3.3 70B |
| Deployment | [Vercel](https://vercel.com/) |

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Git
- Groq API key (free at [console.groq.com/api-keys](https://console.groq.com/api-keys))

### Installation

```bash
# Clone the repository
git clone https://github.com/kneeraazon404/spinoza-ethics.git
cd spinoza-ethics

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local and add your Groq API key
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key_here
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
spinoza-ethics/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout + metadata
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Global styles
│   │   ├── robots.ts           # SEO robots.txt
│   │   └── sitemap.ts          # SEO sitemap
│   ├── components/
│   │   ├── diagrams/           # Diagram components
│   │   │   ├── HierarchyDiagram.tsx
│   │   │   ├── FlowDiagram.tsx
│   │   │   ├── ParallelismDiagram.tsx
│   │   │   ├── AffectsDiagram.tsx
│   │   │   ├── PowerDiagram.tsx
│   │   │   ├── SummaryView.tsx
│   │   │   └── AboutView.tsx
│   │   ├── GeometricAdvisor.tsx
│   │   └── SpinozaEthicsDiagram.tsx
│   ├── context/
│   │   ├── SpinozaContext.tsx  # AI explanation context
│   │   └── ThemeContext.tsx    # Theme provider
│   ├── data/
│   │   └── ethicsSummary.json  # Content data
│   ├── hooks/
│   │   └── useThemeColors.ts   # Theme colors hook
│   └── lib/
│       └── groq.ts             # Groq API client
├── public/                     # Static assets
├── .env.example                # Environment template
├── .env.local                  # Local environment (gitignored)
├── package.json
├── tsconfig.json
└── README.md
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Add environment variable `NEXT_PUBLIC_GROQ_API_KEY` in Vercel settings
4. Deploy

### Environment Variables for Production

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GROQ_API_KEY` | Groq Cloud API key | Yes |

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Baruch Spinoza** (1632-1677) for his timeless philosophical work *Ethics*
- [Groq](https://groq.com/) for fast, free-tier AI inference
- [Next.js](https://nextjs.org/) team for the excellent framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first styling

---

Built with ❤️ for philosophy enthusiasts
