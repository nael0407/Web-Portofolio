"use client";

import React from "react";
import { Award } from "lucide-react";
import { HeroBackground } from "@/components/ui/tweenly-hero-background";
import { OfferCarousel, type Offer } from "@/components/ui/offer-carousel";

const CERTIFICATION_OFFERS: Offer[] = [
  {
    id: "aws-ai-practitioner",
    imageSrc: "/images/certifications/aws-ai-practitioner.png",
    imageAlt: "AWS Certified AI Practitioner Credly Badge",
    imageFit: "contain",
    tag: "AI & ML",
    title: "AWS Certified AI Practitioner",
    description:
      "Validates foundational AI/ML concepts, generative AI models, prompt engineering, and secure deployment on AWS cloud infrastructure.",
    brandLogoSrc:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230284C7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z'/></svg>",
    brandName: "Amazon Web Services",
    promoCode: "Verify on Credly ↗",
    href: "https://www.credly.com/badges/6811176e-fd78-4ce2-a3bc-bf2a9b5f071b/public_url",
  },
  {
    id: "aws-cloud-web-app",
    imageSrc: "/images/certifications/aws-cloud-web-app.png",
    imageAlt: "AWS Academy Cloud Web Application Builder Credly Badge",
    imageFit: "contain",
    tag: "Cloud Native",
    title: "Cloud Web Application Builder",
    description:
      "Validates designing, building, and deploying resilient, scalable cloud-native web architectures utilizing AWS compute, VPC, and storage.",
    brandLogoSrc:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230284C7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z'/><path d='M6 6h10'/><path d='M6 10h10'/></svg>",
    brandName: "AWS Academy",
    promoCode: "Verify on Credly ↗",
    href: "https://www.credly.com/badges/d5e02aa5-043f-455c-b6d1-756473ea0567/public_url",
  },
  {
    id: "cisco-ccna-itn",
    imageSrc: "/images/certifications/cisco-ccna-itn.png",
    imageAlt: "Cisco CCNA Introduction to Networks Credly Badge",
    imageFit: "contain",
    tag: "Networking",
    title: "CCNA: Introduction to Networks",
    description:
      "Validates foundational networking architectures, IPv4/IPv6 variable-length subnetting, Ethernet switching, routing, and network security.",
    brandLogoSrc:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230284C7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect width='20' height='8' x='2' y='14' rx='2'/><path d='M6 18h.01'/><path d='M10 18h.01'/><path d='M15 10v4'/><path d='M9 10v4'/><path d='M12 6v8'/></svg>",
    brandName: "Cisco Networking Academy",
    promoCode: "Verify on Credly ↗",
    href: "https://www.credly.com/badges/c26b3ad0-723a-41e0-8581-0513001a25cc/public_url",
  },
];

export function CertificationsSection() {
  return (
    /* ─────────────────────────────────────────────────────────────
       SECTION 5: CERTIFICATIONS — LIGHT SECTION (Midnight Ink + Ice Blue)
       Latar: Ice Blue canvas (#E6F3FA)
       Teks: Midnight Ink (#090D16)
       Aksen: Ice Blue (#0284C7 / #BAE6FD / #E0F2FE)
       Showcase: OfferCarousel with Official Verified Credly Badges
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
          {/* Section Header (Minimalist & Clean: No Subtitle, No Pill) */}
          <div className="mb-12 pb-8 border-b border-[#BAE6FD]">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#0284C7] mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>05 / VERIFIED CREDENTIALS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#090D16] uppercase">
              Certifications
            </h2>
          </div>

          {/* Interactive OfferCarousel with Verified Credly Badges */}
          <div className="w-full">
            <OfferCarousel offers={CERTIFICATION_OFFERS} />
          </div>
        </div>
      </HeroBackground>
    </section>
  );
}
