"use client";

import React, { useState } from "react";
import { Code2, ShieldCheck, Network } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Card } from "@/components/ui/card-hover-effect";
import { HeroBackground } from "@/components/ui/tweenly-hero-background";

interface SkillItem {
  name: string;
  tag: string;
}

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming & ML",
    icon: Code2,
    skills: [
      { name: "Python", tag: "Language" },
      { name: "C++", tag: "Language" },
      { name: "PyTorch", tag: "Deep learning" },
      { name: "OpenCV", tag: "Vision library" },
      { name: "YOLO", tag: "Detection model" },
      { name: "RF-DETR", tag: "Detection model" },
      { name: "ROS2", tag: "Robotics" },
    ],
  },
  {
    title: "Digital Forensics & Security",
    icon: ShieldCheck,
    skills: [
      { name: "Cilium / eBPF", tag: "Network policy" },
      { name: "Tetragon", tag: "Runtime enforcement" },
      { name: "Kyverno", tag: "Admission control" },
      { name: "Cosign", tag: "Image signing" },
      { name: "Zeek", tag: "Traffic analysis" },
      { name: "DFIR", tag: "Forensics" },
      { name: "nftables", tag: "Host firewall" },
      { name: "OPNsense", tag: "Stateful firewall" },
    ],
  },
  {
    title: "Infra & Networking",
    icon: Network,
    skills: [
      { name: "Linux", tag: "Operating system" },
      { name: "Docker", tag: "Containers" },
      { name: "Kubernetes", tag: "Orchestration" },
      { name: "Ansible", tag: "Automation" },
      { name: "FRRouting", tag: "Routing" },
      { name: "Argo CD", tag: "GitOps" },
    ],
  },
];

export function SkillsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    /* ─────────────────────────────────────────────────────────────
       SECTION 4: TECHNICAL SKILLS — DARK SECTION (Obsidian + Pure White/Grayscale)
       Enhanced with Aceternity Card Hover Effect (gliding backdrop highlight)
    ───────────────────────────────────────────────────────────── */
    <section
      id="skills"
      className="py-24 md:py-32 bg-[#090A0F] text-[#F8FAFC] relative overflow-hidden"
    >
      {/* Subtle Ambient Glow */}
      <div
        className="pointer-events-none absolute top-1/4 -right-40 w-[600px] h-[600px] bg-white/[0.02] blur-[160px] rounded-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -left-40 w-[600px] h-[600px] bg-white/[0.02] blur-[160px] rounded-full"
        aria-hidden="true"
      />

      <HeroBackground
        variant="dots"
        color="#64748B"
        accent="#38BDF8"
        opacity={0.22}
        density={0.85}
        size={1.5}
        mask="radial"
        className="w-full h-full bg-transparent"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-12 pb-8 border-b border-[#1E2333]">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#94A3B8] mb-3">
            04 / TECHNICAL CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#FFFFFF] uppercase mb-4">
            Technical Skills
          </h2>
          <p className="text-sm text-[#94A3B8] max-w-lg leading-relaxed">
            A comprehensive overview of programming languages, deep learning
            frameworks, security tooling, and infrastructure technologies I work
            with.
          </p>
        </div>

        {/* Aceternity Card Hover Effect Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;

            return (
              <div
                key={cat.title}
                className="relative group block p-2 h-full w-full"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Aceternity Hover Background Highlight */}
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.span
                      className="absolute inset-0 h-full w-full bg-[#1E2333]/90 dark:bg-slate-800/[0.8] block rounded-3xl"
                      layoutId="skillsHoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.15 },
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.15, delay: 0.2 },
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Card Body */}
                <Card className="bg-[#11131B] border-[#1E2333] group-hover:border-[#FFFFFF]/40 transition-colors duration-200">
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5 mb-4 pb-4 border-b border-[#1E2333]/80 min-h-[58px]">
                    <div className="w-11 h-11 rounded-xl bg-[#161926] border border-[#262A3A] flex items-center justify-center text-white shrink-0 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl text-[#FFFFFF] tracking-tight leading-snug">
                      {cat.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="divide-y divide-[#1E2333]/80">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-baseline justify-between gap-3 py-2 font-mono text-xs sm:text-sm first:pt-0 last:pb-0"
                      >
                        <span className="text-white font-semibold">
                          {skill.name}
                        </span>
                        <span className="text-[11px] uppercase tracking-wider text-[#94A3B8] font-medium text-right">
                          {skill.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
      </HeroBackground>
    </section>
  );
}
