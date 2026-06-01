import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const display = Sora({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display-sora" });

export const metadata: Metadata = {
  title: "Denner França — Portfolio",
  description: "Tech Lead & Fullstack Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${display.variable} font-sans antialiased bg-bg text-text`}>
        {children}
      </body>
    </html>
  );
}
