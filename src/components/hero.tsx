"use client";

import Link from "next/link";
import { ArrowDownRight, Mail, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle Ambient Radial Glow */}
      <div
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-accent/10 blur-[130px] rounded-full -z-10"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-border/80 bg-card/80 backdrop-blur-sm text-xs font-mono text-muted-foreground mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span>Available for new projects & senior roles</span>
        </div>

        {/* Editorial Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.12] mb-6">
          Architecting resilient full-stack systems with{" "}
          <span className="text-accent underline decoration-accent/30 decoration-wavy underline-offset-8">
            precision
          </span>{" "}
          and refined craft.
        </h1>

        {/* Narrative / Bio */}
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
          Hi, I&apos;m a Full-Stack & Frontend Engineer specialized in building
          scalable Next.js applications, robust distributed APIs, and fluid,
          accessible user interfaces that deliver exceptional user journeys.
        </p>

        {/* CTAs & Social Links */}
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium bg-foreground text-background hover:opacity-90 transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Explore Work</span>
            <ArrowDownRight className="w-4 h-4" />
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border border-border bg-card/60 text-foreground hover:bg-card hover:border-accent/40 transition-all duration-200"
          >
            <Mail className="w-4 h-4 text-accent" />
            <span>Get In Touch</span>
          </Link>
          <div className="flex items-center gap-2 ml-auto">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border bg-card/40 text-muted-foreground hover:text-foreground hover:border-accent/40 transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border bg-card/40 text-muted-foreground hover:text-foreground hover:border-accent/40 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Minimal Metric Badges / Engineering Principles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-border/70 font-mono text-xs">
          <div className="p-3 rounded-xl border border-border/60 bg-card/40">
            <span className="text-muted-foreground block mb-1">Architecture</span>
            <span className="font-semibold text-foreground">Clean & Modular</span>
          </div>
          <div className="p-3 rounded-xl border border-border/60 bg-card/40">
            <span className="text-muted-foreground block mb-1">Performance</span>
            <span className="font-semibold text-foreground">99+ Lighthouse</span>
          </div>
          <div className="p-3 rounded-xl border border-border/60 bg-card/40">
            <span className="text-muted-foreground block mb-1">Accessibility</span>
            <span className="font-semibold text-foreground">WCAG 2.1 AA</span>
          </div>
          <div className="p-3 rounded-xl border border-border/60 bg-card/40 flex items-center justify-between">
            <div>
              <span className="text-muted-foreground block mb-1">Stack</span>
              <span className="font-semibold text-accent">Next.js & Node</span>
            </div>
            <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
}
