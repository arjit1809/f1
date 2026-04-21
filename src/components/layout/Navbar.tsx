"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Standings", href: "/#standings" },
    { name: "Calendar", href: "/#calendar" },
    { name: "Drivers", href: "/drivers" },
    { name: "Teams", href: "/teams" },
    { name: "History", href: "/history" },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-black/80 backdrop-blur-lg py-4 border-b border-white/10" : "bg-transparent py-6"}`}>
      <nav className="max-w-7xl mx-auto px-6 md:px-20 flex justify-between items-center">
        <Link href="/" className="font-heading text-2xl font-black text-white tracking-tighter">
          F1<span className="text-ferrari">2026</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="font-mono text-sm uppercase tracking-widest text-silver hover:text-white transition-colors focus-visible:outline-white focus-visible:outline-offset-4"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/races" 
            className="px-6 py-2 bg-white text-black font-heading font-bold text-sm uppercase rounded-sm hover:bg-ferrari hover:text-white transition-all focus-visible:ring-2 focus-visible:ring-ferrari focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            LIVE HUB
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-3 min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? "CLOSE" : "MENU"}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-b border-white/10 p-10 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-heading text-3xl font-bold uppercase text-white"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
