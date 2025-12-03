# Spinoza's Ethics - Interactive Visual Exploration

An interactive, visual journey through Baruch Spinoza's *Ethics*, designed to make his complex metaphysical system accessible and engaging. This application visualizes the hierarchy of being, from Substance to Blessedness, using interactive diagrams and AI-powered explanations.

## Features

-   **Interactive Diagrams**: Explore the relationships between Substance, Attributes, and Modes through dynamic visualizations.
    -   **Hierarchy**: The ontological structure of the universe.
    -   **Flow**: The causal flow from God to finite things.
    -   **Parallelism**: The correspondence between Mind and Body.
    -   **Affects**: The transition from human bondage to freedom.
    -   **Power & Virtue**: The ethical implications of Spinoza's system.
-   **Geometric Advisor**: An AI-powered assistant (powered by Gemini) that explains concepts in context, acting as a guide through the geometrical demonstrations.
-   **Responsive Design**: Optimized for both desktop and tablet exploration.

## Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **AI Integration**: [Google Gemini API](https://ai.google.dev/)
-   **Language**: TypeScript

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/spinoza-ethics.git
    cd spinoza-ethics
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    Create a `.env.local` file in the root directory and add your Gemini API key:
    ```env
    NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/).

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Add the `NEXT_PUBLIC_GEMINI_API_KEY` environment variable in the Vercel project settings.
4.  Deploy!

## License

[MIT](LICENSE)
