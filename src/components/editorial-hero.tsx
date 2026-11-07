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
      className="relative w-full min-h-screen bg-[#F0F8FD] text-[#090D16] flex flex-col justify-between overflow-hidden"
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
        className="relative z-10 w-full min-h-screen flex flex-col justify-between flex-1 bg-transparent"
      >
        {/* ─────────────────────────────────────────────────────────────
            1. TOP NAVIGATION BAR
            - Top-Left: Nav Links (HERO, PROJECT, EXPERIENCE, SKILLS, CONTACT)
            - Top-Right: Enlarged 3D Wireframe Forms Interactive Sphere
        ───────────────────────────────────────────────────────────── */}
        <header className="relative z-20 w-full px-4 sm:px-6 md:px-8 lg:px-10 pt-6 sm:pt-8 lg:pt-9 pb-2 flex items-start justify-between gap-6">
        {/* Top-Left: Nav Links */}
        <nav className="flex items-center justify-start gap-4 sm:gap-7 lg:gap-9 text-xs font-bold tracking-[0.22em] text-[#090D16]/80 font-mono overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pt-1">
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

        {/* Top-Right: Enlarged 3D Wireframe Interactive Sphere (Borderless, Seamless Background) */}
        <div className="flex items-center justify-end shrink-0">
          <div
            aria-label="Wireframe 3D Sphere"
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 flex items-center justify-center group hover:scale-105 transition-transform duration-300 border-0 outline-none shadow-none bg-transparent"
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
          2. LEFT RAIL: SOCIAL CONNECTIONS (GH, IN, X, CV)
          - Left-aligned to the far left margin
          - 100% mathematically centered vertically on the viewport
      ───────────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex absolute left-4 sm:left-6 md:left-8 lg:px-2 top-1/2 -translate-y-1/2 z-30 flex-col items-start gap-7 font-mono text-xs font-bold tracking-[0.25em] text-[#090D16]/75 text-left">
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
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 w-full px-4 sm:px-6 md:px-8 lg:pl-20 xl:pl-24 lg:pr-8 xl:pr-12 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-8 pb-8 sm:pb-12 lg:pb-10">
        {/* Left Column: Editorial Portrait Card (Magnified Dominant Scale) */}
        <div className="relative shrink-0 mb-6 lg:mb-0 lg:translate-x-2 xl:translate-x-4 lg:-translate-y-4 xl:-translate-y-8 group">
          <div className="relative w-72 h-[360px] sm:w-80 sm:h-[420px] md:w-96 md:h-[490px] lg:w-[420px] lg:h-[530px] xl:w-[470px] xl:h-[590px] 2xl:w-[560px] 2xl:h-[680px] rounded-2xl sm:rounded-3xl lg:rounded-[36px] overflow-hidden border border-[#BAE6FD] bg-[#090A0F] shadow-2xl transition-all duration-300 group-hover:border-[#0284C7] group-hover:shadow-[0_28px_70px_rgba(2,132,199,0.25)]">
            <Image
              src="/images/natanael-hero.jpg"
              alt="Natanael Sebastian Simanjuntak"
              fill
              sizes="(max-width: 768px) 360px, (max-width: 1200px) 470px, 560px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
        </div>

        {/* Right Column: Summary + Monumental Name */}
        <div className="w-full lg:w-auto flex-1 flex flex-col items-start lg:items-end text-left lg:text-right min-w-0">
          {/* Mobile Social Connections (hanya muncul di layar mobile kecil) */}
          <div className="flex lg:hidden flex-row items-center justify-start gap-6 font-mono text-xs font-bold tracking-[0.25em] text-[#090D16]/75 text-left py-2 mb-2">
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

          {/* Summary Profile Block (Placed Directly Above the Name) */}
          <div className="max-w-md lg:max-w-lg xl:max-w-xl mb-4 lg:mb-5">
            <p className="font-sans text-xs sm:text-sm font-semibold tracking-wider text-[#090D16]/80 leading-relaxed uppercase">
              {roleDescription}
            </p>
          </div>

          {/* Monumental Display Name */}
          <div className="w-full flex flex-col items-start lg:items-end space-y-0.5">
            <div className="flex items-start gap-2 sm:gap-3 leading-none">
              <span className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-light text-[#0284C7] select-none mt-1 sm:mt-2">
                ©
              </span>
              <span className="font-black text-4xl sm:text-6xl md:text-6xl lg:text-[3.8rem] xl:text-[4.7rem] 2xl:text-[6.2rem] tracking-tight uppercase text-[#090D16] leading-[0.88] select-none whitespace-nowrap">
                {firstName}
              </span>
            </div>
            <div className="font-black text-4xl sm:text-6xl md:text-6xl lg:text-[3.8rem] xl:text-[4.7rem] 2xl:text-[6.2rem] tracking-tight uppercase text-[#090D16] leading-[0.88] select-none whitespace-nowrap">
              {middleName}
            </div>
            <div className="font-black text-4xl sm:text-6xl md:text-6xl lg:text-[3.8rem] xl:text-[4.7rem] 2xl:text-[6.2rem] tracking-tight uppercase text-[#090D16] leading-[0.88] select-none whitespace-nowrap">
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
