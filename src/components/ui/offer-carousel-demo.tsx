"use client";

import { OfferCarousel, type Offer } from "@/components/ui/offer-carousel";

// Sample data for the carousel
const sampleOffers: Offer[] = [
  {
    id: 1,
    imageSrc: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Artificial Intelligence and Foundation Models",
    tag: "AI & ML",
    title: "AWS Certified AI Practitioner",
    description: "Validates fundamentals of AI/ML, generative AI, foundation models, and cloud AI architecture.",
    brandLogoSrc: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230284C7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z'/></svg>",
    brandName: "Amazon Web Services",
    promoCode: "AWS-AIP • 2026",
    href: "/cv.pdf",
  },
  {
    id: 2,
    imageSrc: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Networking Infrastructure and Routers",
    tag: "Networking",
    title: "CCNA: Introduction to Networks",
    description: "Validates IP addressing, subnetting, Ethernet switching, routing, and network security protocols.",
    brandLogoSrc: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230284C7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect width='20' height='8' x='2' y='14' rx='2'/><path d='M6 18h.01'/><path d='M10 18h.01'/><path d='M15 10v4'/><path d='M9 10v4'/><path d='M12 6v8'/></svg>",
    brandName: "Cisco Systems",
    promoCode: "CCNA-ITN • 2026",
    href: "/cv.pdf",
  },
  {
    id: 3,
    imageSrc: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Cloud Native Global Infrastructure",
    tag: "Cloud Native",
    title: "AWS Academy Cloud Web App Builder",
    description: "Validates cloud-native web application infrastructure on AWS compute, VPC, storage, and databases.",
    brandLogoSrc: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230284C7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z'/><path d='M6 6h10'/><path d='M6 10h10'/></svg>",
    brandName: "AWS Academy",
    promoCode: "AWS-ACADEMY • 2026",
    href: "/cv.pdf",
  },
];

// The demo component
export default function OfferCarouselDemo() {
  return (
    <div className="w-full min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-6xl">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Verified Credentials</h2>
        <OfferCarousel offers={sampleOffers} />
      </div>
    </div>
  );
}
