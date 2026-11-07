"use client";

import React from "react";
import { Award, CheckCircle2, Sparkles, Network, Cloud } from "lucide-react";
import { motion } from "motion/react";
import { HeroBackground } from "@/components/ui/tweenly-hero-background";

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issuerBadge: string;
  year: string;
  category: string;
  code: string;
  icon: React.ElementType;
  description: string;
  skills: string[];
  credentialStatus: string;
}

const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "aws-ai-practitioner",
    title: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services (AWS)",
    issuerBadge: "AWS",
    year: "2026",
    category: "Artificial Intelligence & ML",
    code: "AWS-AIP",
    icon: Sparkles,
    description:
      "Validates comprehensive fundamentals of machine learning models, generative AI architectures, foundation models, responsible AI governance, and deployment of cloud AI workloads.",
    skills: [
      "AI/ML Fundamentals",
      "Generative AI",
      "Foundation Models",
      "Responsible AI",
      "AWS Bedrock & SageMaker",
    ],
    credentialStatus: "Active Credential",
  },
  {
    id: "cisco-ccna-itn",
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco Systems",
    issuerBadge: "Cisco",
    year: "2026",
    category: "Network Engineering",
    code: "CCNA-ITN",
    icon: Network,
    description:
      "Validates core networking architectures, IPv4 and IPv6 addressing and variable-length subnetting, Ethernet switching operations, router configuration, and enterprise network security fundamentals.",
    skills: [
      "IP Addressing & Subnetting",
      "Ethernet Switching",
      "Routing Protocols",
      "Network Security",
      "OSI & TCP/IP Models",
    ],
    credentialStatus: "Active Credential",
  },
  {
    id: "aws-academy-cloud-web-app",
    title: "AWS Academy Cloud Web Application Builder",
    issuer: "AWS Academy",
    issuerBadge: "AWS Academy",
    year: "2026",
    category: "Cloud Architecture & DevOps",
    code: "AWS-ACADEMY",
    icon: Cloud,
    description:
      "Validates the design, deployment, and operation of scalable, fault-tolerant, and highly-available cloud-native web application infrastructures leveraging AWS compute, storage, and VPC networks.",
    skills: [
      "Cloud-Native Infrastructure",
      "EC2 & Lambda Compute",
      "VPC Networking",
      "S3 & Storage",
      "High Availability",
    ],
    credentialStatus: "Active Credential",
  },
];

export function CertificationsSection() {
  return (
    /* ─────────────────────────────────────────────────────────────
       SECTION 5: CERTIFICATIONS — LIGHT SECTION (Midnight Ink + Ice Blue)
       Latar: Ice Blue canvas (#E6F3FA)
       Teks: Midnight Ink (#090D16)
       Aksen: Ice Blue (#0284C7 / #BAE6FD / #E0F2FE)
    ───────────────────────────────────────────────────────────── */
    <section
      id="certifications"
      className="py-24 md:py-32 bg-[#E6F3FA] text-[#090D16] relative overflow-hidden"
    >
      {/* Ambient Ice Blue Glow Auras */}
      <div
        className="pointer-events-none absolute top-1/3 -left-40 w-[600px] h-[600px] bg-[#BAE6FD]/35 blur-[150px] rounded-full -z-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -right-40 w-[550px] h-[550px] bg-[#E0F2FE]/50 blur-[140px] rounded-full -z-0"
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          {/* Section Header */}
          <div className="mb-14 pb-8 border-b border-[#BAE6FD]">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#0284C7] mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>05 / VERIFIED CREDENTIALS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#090D16] uppercase">
              Certifications
            </h2>
          </div>

          {/* 3-Column Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {CERTIFICATIONS.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-[#FFFFFF] border border-[#BAE6FD] p-6 sm:p-7 shadow-lg shadow-[#0284C7]/5 hover:shadow-2xl hover:shadow-[#0284C7]/15 hover:border-[#0284C7] transition-all duration-300"
                >
                  {/* Subtle Top Card Glow on Hover */}
                  <div
                    className="pointer-events-none absolute -inset-px rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#0284C7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 space-y-5">
                    {/* Top Row: Icon + Badges */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#F0F8FD] border border-[#BAE6FD] text-[#0284C7] flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:bg-[#0284C7] group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold text-[#0284C7] px-2.5 py-1 rounded-lg bg-[#F0F8FD] border border-[#BAE6FD]">
                          {cert.issuerBadge}
                        </span>
                        <span className="font-mono text-[11px] text-[#090D16]/60 px-2 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                          {cert.year}
                        </span>
                      </div>
                    </div>

                    {/* Category & Title */}
                    <div className="space-y-1.5">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#0284C7] font-semibold block">
                        {cert.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#090D16] group-hover:text-[#0284C7] transition-colors leading-snug">
                        {cert.title}
                      </h3>
                      <p className="text-xs font-medium text-[#090D16]/65">
                        Issued by {cert.issuer}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] text-[#090D16]/80 leading-relaxed pt-1">
                      {cert.description}
                    </p>

                    {/* Skill Tags */}
                    <div className="pt-2">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#090D16]/60 mb-2 font-bold">
                        Competencies Verified:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#F0F8FD] text-[#090D16] border border-[#BAE6FD]/80 group-hover:border-[#BAE6FD] transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Foot: Active Status Indicator */}
                  <div className="relative z-10 pt-5 mt-5 border-t border-[#BAE6FD]/70 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-[#0284C7] font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-[#0284C7]" />
                      <span>{cert.credentialStatus}</span>
                    </div>

                    <span className="text-[11px] text-[#090D16]/50 uppercase tracking-wider font-semibold">
                      {cert.code}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </HeroBackground>
    </section>
  );
}
