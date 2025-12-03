import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import GeometricAdvisor from "@/components/GeometricAdvisor";
import { SpinozaProvider } from "@/context/SpinozaContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://spinoza-ethics.vercel.app'),
  title: {
    default: "Spinoza's Ethics - Interactive Visual Exploration",
    template: "%s | Spinoza's Ethics",
  },
  description: "Explore Baruch Spinoza's Ethics through interactive diagrams and AI-powered explanations. Visualize the hierarchy of being, attributes, modes, and the path to blessedness.",
  keywords: [
    "Spinoza", "Ethics", "Philosophy", "Interactive", "Visualization", "Diagram",
    "Metaphysics", "Epistemology", "God", "Nature", "Substance",
    "Baruch Spinoza", "Benedict de Spinoza", "Gemini AI", "Artificial Intelligence"
  ],
  authors: [{ name: "Kneerazon" }],
  creator: "Kneerazon",
  publisher: "Kneerazon",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Spinoza's Ethics - Interactive Visual Exploration",
    description: "Explore Baruch Spinoza's Ethics through interactive diagrams and AI-powered explanations.",
    url: 'https://spinoza-ethics.vercel.app',
    siteName: "Spinoza's Ethics Interactive",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: '/og-image.png', // Ensure you add this image to your public folder
        width: 1200,
        height: 630,
        alt: "Spinoza's Ethics Interactive Diagram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spinoza's Ethics - Interactive Visual Exploration",
    description: "Explore Baruch Spinoza's Ethics through interactive diagrams and AI-powered explanations.",
    images: ['/og-image.png'], // Ensure you add this image to your public folder
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    // apple: '/apple-touch-icon.png', // Add if available
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: "Spinoza's Ethics Interactive",
    description: "Interactive visual exploration of Spinoza's Ethics.",
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: 'Kneerazon',
    },
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SpinozaProvider>
          {children}
          <GeometricAdvisor />
        </SpinozaProvider>
      </body>
    </html>
  );
}
