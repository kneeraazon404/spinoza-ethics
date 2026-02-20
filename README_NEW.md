# Spinoza's Ethics - Interactive Visual Exploration

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwind-css)
![Groq API](https://img.shields.io/badge/Groq-API-f59e0b)

> An interactive, visual journey through Baruch Spinoza's *Ethics*, designed to make his complex metaphysical system accessible and engaging.

## 🎯 Overview

This application visualizes the hierarchy of being, from Substance to Blessedness, using interactive diagrams and AI-powered explanations powered by the Groq API. Explore Spinoza's geometric philosophy through multiple visual perspectives.

### [Live Demo](https://spinoza-ethics.vercel.app)

## ✨ Features

### Interactive Diagrams
- **Hierarchy** - The ontological structure from Substance → Attributes → Modes
- **Flow** - The causal chain from God to finite things
- **Parallelism** - Mind-Body correspondence in Spinoza's system
- **Affects** - The spectrum from bondage to freedom
- **Power & Virtue** - The ethical path to blessedness
- **Complete System** - Integrated view of all relationships
- **Summary** - Comprehensive philosophical overview

### AI-Powered Features
- **Geometric Advisor** - Ask Spinoza philosophical questions in real-time
- **Concept Explanations** - Click on any diagram element for AI-generated insights
- **Smart Context** - AI understands Spinoza's philosophy and modern applications

### User Experience
- 🌓 Dark/Light theme toggle with system preference detection
- 📱 Responsive design (desktop & tablet optimized)
- ⚡ Fast, optimized performance
- ♿ Accessible with proper ARIA labels
- 🎨 Beautiful, modern UI with smooth animations

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Markdown** | [React Markdown](https://github.com/remarkjs/react-markdown) |
| **AI API** | [Groq Cloud](https://groq.com/) (Mixtral-8x7B) |
| **Deployment** | [Vercel](https://vercel.com/) |
| **Code Quality** | ESLint, Prettier, TypeScript Strict Mode |

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0
- **Git**
- **Groq API Key** (free at [console.groq.com/api-keys](https://console.groq.com/api-keys))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/kneeraazon404/spinoza-ethics.git
cd spinoza-ethics

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Edit .env.local and add your Groq API key
NEXT_PUBLIC_GROQ_API_KEY=your_api_key_here
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

## 📁 Project Structure

```
spinoza-ethics/
├── public/                     # Static assets
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/
│   │   │   └── explain/        # AI explanation API route
│   │   ├── layout.tsx          # Root layout + metadata
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Global styles
│   │   ├── robots.ts           # SEO robots.txt
│   │   └── sitemap.ts          # SEO sitemap
│   ├── components/
│   │   ├── diagrams/
│   │   │   ├── HierarchyDiagram.tsx
│   │   │   ├── FlowDiagram.tsx
│   │   │   ├── ParallelismDiagram.tsx
│   │   │   ├── AffectsDiagram.tsx
│   │   │   ├── PowerDiagram.tsx
│   │   │   ├── SystemDiagram.tsx
│   │   │   ├── SummaryView.tsx
│   │   │   └── AboutView.tsx
│   │   ├── GeometricAdvisor.tsx
│   │   └── SpinozaEthicsDiagram.tsx
│   ├── context/
│   │   ├── SpinozaContext.tsx  # AI explanation context
│   │   └── ThemeContext.tsx    # Theme management
│   ├── hooks/
│   │   └── useThemeColors.ts   # Color utility hook
│   ├── lib/
│   │   └── groq.ts             # Groq API integration
│   └── data/
│       └── ethicsSummary.json  # Philosophical content
├── .env.example                # Environment template
├── .gitignore                  # Git ignore rules
├── .prettierrc                 # Code formatting config
├── eslint.config.mjs           # ESLint configuration
├── next.config.ts              # Next.js configuration
├── postcss.config.mjs          # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies & scripts
└── README.md                   # This file
```

## 🔐 Environment Variables

### Required
- `NEXT_PUBLIC_GROQ_API_KEY` - Your Groq API key from [console.groq.com](https://console.groq.com)

### Optional
- `NEXT_PUBLIC_ENVIRONMENT` - Environment indicator (development/production)

## 🌐 API Integration

### Groq AI Integration

The application uses the **Groq API** for AI-powered features:

- **Model**: Llama-3.3-70B-Versatile
- **Max Tokens**: 1024
- **Temperature**: 0.7
- **Error Handling**: Comprehensive error messages for common issues

### API Routes

#### `POST /api/explain`
Generate AI explanations for Spinoza's concepts.

**Request Body:**
```json
{
  "userPrompt": "Explain the concept of Substance",
  "systemPrompt": "You are an expert on Spinoza..."
}
```

**Response:**
```json
{
  "success": true,
  "text": "Substance is..."
}
```

## 📝 Code Quality

### TypeScript
- Strict mode enabled
- Full type safety
- No implicit `any`

### ESLint
- Next.js best practices
- React hooks rules
- TypeScript best practices
- Code quality enforcement

### Prettier
- Consistent code formatting
- 80 character line width
- Single quotes in JavaScript
- Trailing commas

### Pre-commit
Run before committing:
```bash
npm run lint && npm run type-check && npm run format
```

## 🎨 Theme System

The application includes a robust theming system:

- **Light Theme**: Clean, bright interface
- **Dark Theme**: Easy on the eyes
- **System Detection**: Respects OS preference
- **Persistent**: Saves user preference to localStorage
- **CSS Variables**: Easy customization via `--background`, `--text-primary`, etc.

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Push to GitHub, then:
# 1. Connect repository to Vercel
# 2. Add environment variables in Vercel dashboard
# 3. Deploy automatically on push
```

### Manual Deployment

```bash
npm run build
npm start
```

## 📊 Performance

- ⚡ **Fast**: Optimized bundle, lazy loading
- 🎯 **SEO**: Full metadata, structured data (JSON-LD)
- ♿ **Accessible**: WCAG 2.1 compliance, ARIA labels
- 📱 **Responsive**: Mobile-first design
- 🔒 **Secure**: Security headers, input validation

## 🐛 Troubleshooting

### Groq API Issues

**Error: "API key not configured"**
- Check `.env.local` file exists
- Verify `NEXT_PUBLIC_GROQ_API_KEY` is set correctly
- No spaces around the key value

**Error: "Rate limit exceeded"**
- Groq has rate limits for free tier
- Wait a moment and try again
- Consider upgrading Groq plan for production

**Error: "Invalid response format"**
- Check Groq API status at [console.groq.com](https://console.groq.com)
- Verify API key has access to Mixtral model

### Theme Issues

**Dark mode not persisting:**
- Clear localStorage: `localStorage.clear()`
- Check browser privacy settings
- Ensure cookies/storage is enabled

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Credits

- **Inspiration**: Baruch Spinoza's *Ethica Ordine Geometrico Demonstrata* (1677)
- **Development**: Built with Next.js, TypeScript, and Tailwind CSS
- **AI**: Powered by [Groq Cloud](https://groq.com/)
- **Creator**: [kneeraazon](https://kneeraazon.com)

## 📞 Support

- GitHub Issues: [Report bugs](https://github.com/kneeraazon404/spinoza-ethics/issues)
- Email: contact@kneeraazon.com
- Portfolio: [kneeraazon.com](https://kneeraazon.com)

---

**"All things excellent are as difficult as they are rare."** — Spinoza, *Ethics* V, P42 S.
