# Spinoza's Ethics - Interactive Visual Exploration

An interactive, visual journey through Baruch Spinoza's *Ethics*, designed to make his complex metaphysical system accessible and engaging. This application visualizes the hierarchy of being, from Substance to Blessedness, using interactive diagrams and AI-powered explanations.

## Features

- **Interactive Diagrams**: Explore the relationships between Substance, Attributes, and Modes through dynamic visualizations.
  - **Hierarchy**: The ontological structure of the universe.
  - **Flow**: The causal flow from God to finite things.
  - **Parallelism**: The correspondence between Mind and Body.
  - **Affects**: The transition from human bondage to freedom.
  - **Power & Virtue**: The ethical implications of Spinoza's system.
- **Geometric Advisor**: An AI-powered assistant that explains concepts in context, acting as a guide through the geometrical demonstrations.
- **Responsive Design**: Optimized for both desktop and tablet exploration.
- **Dark/Light Theme**: Toggle between light and dark modes for comfortable viewing.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Integration**: [Groq Cloud](https://groq.com/) with Llama 3.3 70B
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Groq API key (free at https://console.groq.com/api-keys)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kneeraazon404/spinoza-ethics.git
   cd spinoza-ethics
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── diagrams/         # Diagram components
│   ├── GeometricAdvisor.tsx
│   └── SpinozaEthicsDiagram.tsx
├── context/              # React Context providers
│   ├── SpinozaContext.tsx
│   └── ThemeContext.tsx
├── data/                 # Static data files
│   └── ethicsSummary.json
├── hooks/                # Custom React hooks
│   └── useThemeColors.ts
└── lib/                  # Utility functions
    └── groq.ts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/).

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Add the `GROQ_API_KEY` environment variable in Vercel project settings.
4. Deploy!

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GROQ_API_KEY` | Your Groq Cloud API key | Yes |

## License

[MIT](LICENSE)

## Acknowledgments

- Baruch Spinoza for his timeless philosophical work *Ethics*
- [Groq](https://groq.com/) for fast, free-tier AI inference
- [Next.js](https://nextjs.org/) team for the excellent framework
