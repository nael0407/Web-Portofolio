"use client";
/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Tag } from "lucide-react";
import { cn } from "@/lib/utils"; // Your utility for merging Tailwind classes

// Define the type for a single offer item
export interface Offer {
  id: string | number;
  imageSrc: string;
  imageAlt: string;
  tag: string;
  title: string;
  description: string;
  brandLogoSrc: string;
  brandName: string;
  promoCode?: string;
  href: string;
}

// Props for the OfferCard component
export interface OfferCardProps {
  offer: Offer;
  className?: string;
}

// The individual card component with hover animation
const OfferCard = React.forwardRef<HTMLAnchorElement, OfferCardProps>(({ offer, className }, ref) => (
  <motion.a
    ref={ref}
    href={offer.href}
    target={offer.href.startsWith("http") || offer.href.endsWith(".pdf") ? "_blank" : undefined}
    rel={offer.href.startsWith("http") || offer.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
    className={cn(
      "relative flex-shrink-0 w-[300px] sm:w-[320px] h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden group snap-start bg-[#FFFFFF] border border-[#BAE6FD] shadow-lg shadow-[#0284C7]/5 hover:shadow-2xl hover:shadow-[#0284C7]/15 hover:border-[#0284C7] transition-all duration-300 block",
      className
    )}
    whileHover={{ y: -8 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    style={{ perspective: "1000px" }}
  >
    {/* Background Image */}
    <div className="relative w-full h-1/2 overflow-hidden bg-[#090A0F]">
      <img
        src={offer.imageSrc}
        alt={offer.imageAlt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      {offer.tag && (
        <div className="absolute top-3 right-3 font-mono text-[10px] font-bold text-white px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/20">
          {offer.tag}
        </div>
      )}
    </div>

    {/* Card Content */}
    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#FFFFFF] p-5 flex flex-col justify-between text-[#090D16]">
      <div className="space-y-1.5">
        {/* Tag */}
        <div className="flex items-center text-xs font-mono font-semibold text-[#0284C7]">
          <Tag className="w-3.5 h-3.5 mr-1.5 text-[#0284C7]" />
          <span>{offer.tag}</span>
        </div>
        {/* Title & Description */}
        <h3 className="text-base sm:text-lg font-bold text-[#090D16] group-hover:text-[#0284C7] transition-colors leading-snug line-clamp-2">
          {offer.title}
        </h3>
        <p className="text-xs text-[#090D16]/75 line-clamp-2 leading-relaxed">
          {offer.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[#BAE6FD]/80">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={offer.brandLogoSrc}
            alt={`${offer.brandName} logo`}
            className="w-8 h-8 rounded-full bg-[#F0F8FD] p-1 border border-[#BAE6FD] object-contain shrink-0"
          />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#090D16] truncate">
              {offer.brandName}
            </p>
            {offer.promoCode && (
              <p className="text-[11px] font-mono text-[#0284C7] font-semibold truncate">
                {offer.promoCode}
              </p>
            )}
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#F0F8FD] border border-[#BAE6FD] flex items-center justify-center text-[#090D16] transform transition-transform duration-300 group-hover:rotate-[-45deg] group-hover:bg-[#0284C7] group-hover:text-white group-hover:border-[#0284C7] shadow-sm shrink-0">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  </motion.a>
));
OfferCard.displayName = "OfferCard";

// Props for the OfferCarousel component
export interface OfferCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  offers: Offer[];
  cardClassName?: string;
}

// The main carousel component with scroll functionality
const OfferCarousel = React.forwardRef<HTMLDivElement, OfferCarouselProps>(
  ({ offers, className, cardClassName, ...props }, ref) => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
      if (scrollContainerRef.current) {
        const { current } = scrollContainerRef;
        const scrollAmount = current.clientWidth * 0.8; // Scroll by 80% of the container width
        current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    };

    return (
      <div ref={ref} className={cn("relative w-full group", className)} {...props}>
        {/* Left Scroll Button */}
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute top-1/2 -translate-y-1/2 -left-2 sm:-left-5 z-20 w-10 h-10 rounded-full bg-[#FFFFFF]/95 hover:bg-[#FFFFFF] backdrop-blur-md border border-[#BAE6FD] hover:border-[#0284C7] shadow-xl flex items-center justify-center text-[#090D16] hover:text-[#0284C7] opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer hover:scale-105"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-1 sm:px-2"
        >
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} className={cardClassName} />
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute top-1/2 -translate-y-1/2 -right-2 sm:-right-5 z-20 w-10 h-10 rounded-full bg-[#FFFFFF]/95 hover:bg-[#FFFFFF] backdrop-blur-md border border-[#BAE6FD] hover:border-[#0284C7] shadow-xl flex items-center justify-center text-[#090D16] hover:text-[#0284C7] opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer hover:scale-105"
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  }
);
OfferCarousel.displayName = "OfferCarousel";

export { OfferCarousel, OfferCard };
