"use client";

import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 380);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-300 ${
        scrolled
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <nav className="pointer-events-auto flex items-center justify-between gap-4 md:gap-8 px-5 py-2.5 rounded-full border border-white/20 bg-[#090D16]/90 text-[#F8FAFC] backdrop-blur-xl shadow-2xl transition-all duration-300 max-w-xl w-full">
        {/* Brand Monogram */}
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-[#FFFFFF] hover:text-[#38BDF8] transition-colors group"
        >
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#181B26] text-[#38BDF8] border border-[#2A324B] group-hover:scale-105 transition-transform">
            <Code2 className="w-3.5 h-3.5" />
          </span>
          <span className="hidden sm:inline-block font-bold tracking-wider">NATANAEL</span>
          <span className="inline-block sm:hidden font-bold">NSS</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-mono font-medium text-[#94A3B8]">
          <Link
            href="#projects"
            className="px-2.5 py-1.5 rounded-full hover:text-[#FFFFFF] hover:bg-[#181B26] transition-colors"
          >
            PROJECT
          </Link>
          <Link
            href="#skills"
            className="px-2.5 py-1.5 rounded-full hover:text-[#FFFFFF] hover:bg-[#181B26] transition-colors"
          >
            SKILLS
          </Link>
          <Link
            href="#experience"
            className="px-2.5 py-1.5 rounded-full hover:text-[#FFFFFF] hover:bg-[#181B26] transition-colors"
          >
            EXPERIENCE
          </Link>
          <Link
            href="#contact"
            className="px-2.5 py-1.5 rounded-full hover:text-[#FFFFFF] hover:bg-[#181B26] transition-colors"
          >
            CONTACT
          </Link>
        </div>

        {/* Action */}
        <div className="flex items-center">
          <Link
            href="#contact"
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#FFFFFF] text-[#090D16] hover:bg-[#38BDF8] hover:text-[#090D16] transition-colors shadow-sm"
          >
            <span>Hire</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
