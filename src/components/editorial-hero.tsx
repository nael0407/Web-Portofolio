"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import WireframeForms from "@/components/ui/wireframe-forms";
import { HeroBackground } from "@/components/ui/tweenly-hero-background";
import { CvModal } from "@/components/cv-modal";

interface EditorialHeroProps {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  roleDescription?: string;
  imageSrc?: string;
}

export function EditorialHero({
  firstName = "NATANAEL",
  middleName = "SEBASTIAN",
  lastName = "SIMANJUNTAK",
  roleDescription = "I'M WORKING ACROSS AI, NETWORK SECURITY AND FORENSICS, AND CLOUD-NATIVE INFRASTRUCTURE. I ALSO WORK ON DEEP LEARNING COMPUTER VISION FOR A HUMANOID ROBOT.",
}: EditorialHeroProps) {
  const [isCvOpen, setIsCvOpen] = useState(false);

  return (
    /* ─────────────────────────────────────────────────────────────
       SECTION 1: HERO — LIGHT SECTION (Midnight Ink + Ice Blue)
       - Top-left: Nav links (HERO, PROJECT, EXPERIENCE, SKILLS, CONTACT).
       - Top-right: Interactive 3D WireframeForms sphere.
       - Social rail (GH, IN, CV): Left-aligned & vertically centered.
       - Summary profile: Tepat di atas teks Nama.
       - Nama lengkap (Natanael Sebastian Simanjuntak): Tipografi monumental.
    ───────────────────────────────────────────────────────────── */
    <section
      id="hero"
      className="relative w-full h-[calc(100vh/1.4)] min-h-[460px] max-h-[920px] flex flex-col justify-between overflow-hidden bg-[#F0F8FD] text-[#090D16]"
    >
      {/* Subtle Ambient Ice Blue Glow Auras */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[650px] h-[650px] bg-[#BAE6FD]/40 blur-[160px] rounded-full -z-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 w-[550px] h-[550px] bg-[#E0F2FE]/50 blur-[150px] rounded-full -z-0"
        aria-hidden="true"
      />

      <HeroBackground
        variant="dots"
        color="#090D16"
        accent="#0284C7"
        opacity={0.14}
        density={0.85}
        size={1.5}
        mask="fade-bottom"
        className="relative z-10 w-full h-full flex flex-col justify-between flex-1 bg-transparent"
      >
        {/* ─────────────────────────────────────────────────────────────
            1. TOP NAVIGATION BAR
            - Top-Left: Nav Links (HERO, PROJECT, EXPERIENCE, SKILLS, CONTACT)
            - Top-Right: 3D Wireframe Forms Interactive Sphere (Pinned, Compact)
        ───────────────────────────────────────────────────────────── */}
        <header className="relative z-20 w-full px-4 sm:px-6 md:px-8 lg:px-10 pt-3 sm:pt-4 pb-1 sm:pb-2 flex items-center justify-between gap-4 shrink-0">
          {/* Top-Left: Nav Links */}
          <nav className="flex items-center justify-start gap-3 sm:gap-5 md:gap-7 text-xs font-bold tracking-[0.2em] text-[#090D16]/80 font-mono overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-1">
            <Link
              href="#hero"
              className="text-[#090D16] hover:text-[#0284C7] transition-colors whitespace-nowrap"
            >
              HERO
            </Link>
            <Link
              href="#projects"
              className="text-[#090D16]/65 hover:text-[#090D16] transition-colors whitespace-nowrap"
            >
              PROJECT
            </Link>
            <Link
              href="#experience"
              className="text-[#090D16]/65 hover:text-[#090D16] transition-colors whitespace-nowrap"
            >
              EXPERIENCE
            </Link>
            <Link
              href="#skills"
              className="text-[#090D16]/65 hover:text-[#090D16] transition-colors whitespace-nowrap"
            >
              SKILLS
            </Link>
            <Link
              href="#contact"
              className="text-[#090D16]/65 hover:text-[#090D16] transition-colors whitespace-nowrap"
            >
              CONTACT
            </Link>
          </nav>

          {/* Top-Right: Wireframe Interactive Sphere (Sleek, Non-intrusive) */}
          <div className="flex items-center justify-end shrink-0">
            <div
              aria-label="Wireframe 3D Sphere"
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] flex items-center justify-center border-0 outline-none shadow-none bg-transparent"
            >
              <WireframeForms
                variant="sphere"
                mode="light"
                background="transparent"
                speed={1.5}
                size={0.9}
                length={1}
                className="w-full h-full pointer-events-none"
              />
            </div>
          </div>
        </header>

        {/* ─────────────────────────────────────────────────────────────
            2. LEFT RAIL: SOCIAL CONNECTIONS (GH, IN, CV)
            - Visible from 500px screens upwards to prevent layout jumps on zoom
            - 100% mathematically centered vertically
        ───────────────────────────────────────────────────────────── */}
        <div className="hidden min-[500px]:flex absolute left-3 sm:left-5 md:left-6 top-1/2 -translate-y-1/2 z-30 flex-col items-start gap-4 sm:gap-5 font-mono text-xs font-bold tracking-[0.25em] text-[#090D16]/75 text-left">
          <a
            href="https://github.com/nael0407"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0284C7] transition-colors py-1 text-left"
            aria-label="GitHub"
          >
            GH
          </a>
          <a
            href="https://www.linkedin.com/in/natanael-simanjuntak"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0284C7] transition-colors py-1 text-left"
            aria-label="LinkedIn"
          >
            IN
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              setIsCvOpen(true);
            }}
            className="hover:text-[#0284C7] transition-colors py-1 text-left cursor-pointer"
            aria-label="View Curriculum Vitae"
          >
            CV
          </a>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. HERO MAIN BODY (Portrait on Left, Summary & Name on Right)
            - Fluid responsive 2-column flexbox from 500px screens upwards
            - Proportional viewport-relative dimensions that never push off-screen
        ───────────────────────────────────────────────────────────── */}
        <div className="relative z-10 flex-1 w-full px-4 sm:px-6 md:px-8 pl-4 min-[500px]:pl-16 sm:pl-18 md:pl-20 lg:pl-24 pr-4 sm:pr-6 md:pr-8 lg:pr-10 flex flex-col min-[500px]:flex-row items-center min-[500px]:items-end justify-between gap-4 sm:gap-6 pb-4 sm:pb-6 md:pb-8 min-h-0">
          {/* Left Column: Editorial Portrait Card (Fluid Viewport Bounds) */}
          <div className="relative shrink-0 mb-3 min-[500px]:mb-0 group">
            <div className="relative h-[clamp(270px,45vh,430px)] aspect-[4/5] rounded-2xl sm:rounded-3xl lg:rounded-[30px] overflow-hidden border border-[#BAE6FD] bg-[#090A0F] shadow-2xl transition-all duration-300 group-hover:border-[#0284C7] group-hover:shadow-[0_20px_50px_rgba(2,132,199,0.25)]">
              <Image
                src="/images/natanael-hero.jpg"
                alt="Natanael Sebastian Simanjuntak"
                fill
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 440px"
                className="object-cover object-top scale-[1.45] origin-[50%_18%] transition-transform duration-500 group-hover:scale-[1.5]"
                priority
              />
            </div>
          </div>

          {/* Right Column: Summary + Monumental Name */}
          <div className="w-full min-[500px]:w-auto flex-1 flex flex-col items-start min-[500px]:items-end text-left min-[500px]:text-right min-w-0">
            {/* Mobile Social Connections (only visible below 500px breakpoint) */}
            <div className="flex min-[500px]:hidden flex-row items-center justify-start gap-6 font-mono text-xs font-bold tracking-[0.25em] text-[#090D16]/75 text-left py-2 mb-2">
              <a
                href="https://github.com/nael0407"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0284C7] transition-colors"
              >
                GH
              </a>
              <a
                href="https://www.linkedin.com/in/natanael-simanjuntak"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0284C7] transition-colors"
              >
                IN
              </a>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  setIsCvOpen(true);
                }}
                className="hover:text-[#0284C7] transition-colors cursor-pointer"
                aria-label="View Curriculum Vitae"
              >
                CV
              </a>
            </div>

            {/* Summary Profile Block (Fluid max-width, directly above Name) */}
            <div className="max-w-md md:max-w-lg mb-2 sm:mb-3">
              <p className="font-sans text-[clamp(10px,0.95vw,12px)] font-semibold tracking-wider text-[#090D16]/80 leading-relaxed uppercase">
                {roleDescription}
              </p>
            </div>

            {/* Monumental Display Name (Continuous Fluid Clamp — Never Jumps) */}
            <div className="w-full flex flex-col items-start min-[500px]:items-end space-y-0.5">
              <div className="flex items-start gap-1.5 sm:gap-2 leading-none">
                <span className="font-serif text-[clamp(1.2rem,2.2vw,2.5rem)] font-light text-[#0284C7] select-none mt-0.5">
                  ©
                </span>
                <span className="font-black text-[clamp(1.6rem,3.2vw,3.8rem)] tracking-tight uppercase text-[#090D16] leading-[0.88] select-none whitespace-nowrap">
                  {firstName}
                </span>
              </div>
              <div className="font-black text-[clamp(1.6rem,3.2vw,3.8rem)] tracking-tight uppercase text-[#090D16] leading-[0.88] select-none whitespace-nowrap">
                {middleName}
              </div>
              <div className="font-black text-[clamp(1.6rem,3.2vw,3.8rem)] tracking-tight uppercase text-[#090D16] leading-[0.88] select-none whitespace-nowrap">
                {lastName}
              </div>
            </div>
          </div>
        </div>
      </HeroBackground>

      {/* Interactive Curriculum Vitae Modal */}
      <CvModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />
    </section>
  );
}
