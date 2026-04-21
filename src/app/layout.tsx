import type { Metadata } from "next";
import { Titillium_Web, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { FavoritesProvider } from "@/context/FavoritesContext";

const titilliumWeb = Titillium_Web({
  weight: ["200", "300", "400", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-titillium-web",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "F1 2026 | Live Scrollytelling Hub",
  description: "Immersive, real-time telemetry and information hub for the Formula 1 2026 season.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${titilliumWeb.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <FavoritesProvider>
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only fixed top-4 left-4 z-[100] bg-ferrari text-white px-4 py-2 font-mono text-xs uppercase font-bold"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content">
            {children}
          </main>
        </FavoritesProvider>
      </body>
    </html>
  );
}
