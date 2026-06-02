import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/LangProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const display = Sora({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display-sora" });

export const metadata: Metadata = {
  metadataBase: new URL('https://denner-franca.vercel.app'),
  title: 'Denner França — Tech Lead & Fullstack Engineer',
  description: 'Portfólio de Denner França: Tech Lead e desenvolvedor fullstack (TypeScript, Python, React, Next.js, NestJS, Django). Arquitetura de software, APIs, web e mobile.',
  keywords: ['Denner França', 'Tech Lead', 'Fullstack', 'TypeScript', 'Python', 'Next.js', 'NestJS', 'Django'],
  authors: [{ name: 'Denner Bismarck de Lucena França' }],
  openGraph: {
    title: 'Denner França — Tech Lead & Fullstack Engineer',
    description: 'Arquitetura de software, APIs, web e mobile. Pragmático, direto e de bom humor.',
    type: 'website', locale: 'pt_BR',
  },
  twitter: { card: 'summary_large_image', title: 'Denner França — Tech Lead & Fullstack Engineer' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${display.variable} font-sans antialiased bg-bg text-text`}>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
