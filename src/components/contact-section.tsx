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
       SECTION 6: CONTACT & FOOTER — DARK SECTION (Obsidian)
       Latar: Obsidian canvas (#090A0F)
       Surface: #11131B
       Border: #1E2333 / #2A324B
       Teks: #F8FAFC / #94A3B8
       Aksen: Cyan / Blue (#38BDF8)
    ───────────────────────────────────────────────────────────── */
    <footer id="contact" className="py-24 md:py-32 bg-[#090A0F] text-[#F8FAFC] relative overflow-hidden">
      {/* Ambient Obsidian / Cyan Glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-[#38BDF8]/10 blur-[150px] rounded-full -z-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-0 right-1/4 w-[450px] h-[250px] bg-[#38BDF8]/5 blur-[120px] rounded-full -z-0"
        aria-hidden="true"
      />

      <HeroBackground
        variant="dots"
        color="#64748B"
        accent="#38BDF8"
        opacity={0.18}
        density={0.85}
        size={1.5}
        mask="radial"
        className="w-full h-full bg-transparent"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="rounded-3xl border border-[#1E2333] bg-[#11131B] p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl mb-16">
            {/* Subtle Gradient Highlights */}
            <div
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#38BDF8]/10 blur-3xl rounded-full"
              aria-hidden="true"
            />

            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#38BDF8] mb-5">
              <Mail className="w-3.5 h-3.5" />
              <span>06 / INITIATE CONTACT</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#FFFFFF] max-w-xl mx-auto mb-6 leading-tight uppercase">
              Let&apos;s build something remarkable together.
            </h2>

            <p className="text-[#94A3B8] text-sm sm:text-base max-w-lg mx-auto mb-10 leading-relaxed">
              Whether you have an upcoming AI project, a challenging network security or robotics problem,
              or are looking to collaborate, I&apos;d love to connect.
            </p>

            {/* Interactive Copy Email Action */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-mono bg-[#181B26] hover:bg-[#1E2333] text-[#F8FAFC] border border-[#2A324B] hover:border-[#38BDF8] transition-all duration-200 cursor-pointer group shadow-sm"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#38BDF8]" />
                    <span className="text-[#38BDF8] font-sans text-xs font-bold">Copied to clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#38BDF8] group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">{email}</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider bg-[#F8FAFC] text-[#090D16] hover:bg-[#E2E8F0] transition-colors shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Send Direct Email</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Bottom Bar: Socials & CV */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-8 border-t border-[#1E2333] text-xs font-mono text-[#94A3B8]">
            <a
              href="https://github.com/nael0407"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#FFFFFF] transition-colors"
            >
              <GithubIcon className="w-4 h-4 text-[#38BDF8]" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/natanael-simanjuntak"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#FFFFFF] transition-colors"
            >
              <LinkedinIcon className="w-4 h-4 text-[#38BDF8]" />
              <span>LinkedIn</span>
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#FFFFFF] transition-colors"
            >
              <FileText className="w-4 h-4 text-[#38BDF8]" />
              <span>Curriculum Vitae</span>
            </a>
          </div>
        </div>
      </HeroBackground>
    </footer>
  );
}
