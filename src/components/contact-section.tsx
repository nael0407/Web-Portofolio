"use client";

import { useState } from "react";
import { Mail, Copy, Check, ArrowUpRight, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { HeroBackground } from "@/components/ui/tweenly-hero-background";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "natansimanjuntak17@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    /* ─────────────────────────────────────────────────────────────
       SECTION 5: CONTACT & FOOTER — LIGHT SECTION (Midnight Ink + Ice Blue ONLY)
       Latar: Ice Blue canvas (#E6F3FA)
       Teks: Midnight Ink (#090D16)
       Aksen: Ice Blue (#0284C7 / #BAE6FD / #E0F2FE)
    ───────────────────────────────────────────────────────────── */
    <footer id="contact" className="py-24 md:py-32 bg-[#E6F3FA] text-[#090D16] relative overflow-hidden">
      {/* Ambient Ice Blue Glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#BAE6FD]/40 blur-[140px] rounded-full -z-0"
        aria-hidden="true"
      />

      <HeroBackground
        variant="dots"
        color="#090D16"
        accent="#0284C7"
        opacity={0.14}
        density={0.85}
        size={1.5}
        mask="radial"
        className="w-full h-full bg-transparent"
      >
        <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="rounded-3xl border border-[#BAE6FD] bg-[#FFFFFF] p-8 sm:p-14 text-center relative overflow-hidden shadow-xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#0284C7] mb-5">
            <Mail className="w-3.5 h-3.5" />
            <span>05 / INITIATE CONTACT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#090D16] max-w-xl mx-auto mb-6 leading-tight uppercase">
            Let&apos;s build something remarkable together.
          </h2>

          <p className="text-[#090D16]/75 text-sm sm:text-base max-w-lg mx-auto mb-10 leading-relaxed">
            Whether you have an upcoming project, a challenging engineering problem,
            or are looking to hire a senior full-stack engineer, I&apos;d love to connect.
          </p>

          {/* Interactive Copy Email Action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-mono bg-[#F0F8FF] hover:bg-[#E0F2FE] text-[#090D16] border border-[#BAE6FD] hover:border-[#0284C7] transition-all duration-200 cursor-pointer group shadow-sm"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#0284C7]" />
                  <span className="text-[#0284C7] font-sans text-xs font-bold">Copied to clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#0284C7] group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">{email}</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider bg-[#090D16] text-[#FFFFFF] hover:bg-[#0284C7] transition-colors shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Send Direct Email</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Bar: Socials & CV */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-8 border-t border-[#BAE6FD] text-xs font-mono text-[#090D16]/80">
          <a
            href="https://github.com/nael0407"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#0284C7] transition-colors"
          >
            <GithubIcon className="w-4 h-4 text-[#0284C7]" />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/natanael-simanjuntak"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#0284C7] transition-colors"
          >
            <LinkedinIcon className="w-4 h-4 text-[#0284C7]" />
            <span>LinkedIn</span>
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#0284C7] transition-colors"
          >
            <FileText className="w-4 h-4 text-[#0284C7]" />
            <span>Curriculum Vitae</span>
          </a>
        </div>
      </div>
      </HeroBackground>
    </footer>
  );
}
