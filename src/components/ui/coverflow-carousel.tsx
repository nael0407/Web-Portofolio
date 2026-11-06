"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { GithubIcon } from "@/components/icons";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export interface CoverflowSlide {
  id?: string;
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  description?: string;
  category?: string;
  year?: string;
  meta?: { label: string; value: string }[];
  tags?: string[];
  ctaText?: string;
  ctaLink?: string;
  repoLink?: string;
  content?: () => React.ReactNode;
}

export interface CoverflowCarouselProps {
  slides: CoverflowSlide[];
  /** Degrees the first neighbour tilts. */
  rotate?: number;
  /** How far the first neighbour recedes, as a fraction of card width. */
  depth?: number;
  /** Viewer distance as a multiple of card width — smaller is a wider lens. */
  perspective?: number;
  /** Exponent on distance. Below 1 the rake eases off as cards travel out. */
  falloff?: number;
  /** Opacity lost per step from the centre. */
  fade?: number;
  /** Any CSS length. Everything else is derived from it, so the rake scales. */
  cardWidth?: string;
  /** Space between cards, as a fraction of card width. */
  gap?: number;
  loop?: boolean;
  showCaption?: boolean;
  showPagination?: boolean;
  showNavigation?: boolean;
  /** Whether pressing a card expands into a detailed modal */
  expandable?: boolean;
  /** Sliding animation speed factor per frame. Higher = faster slide. Default: 0.32 */
  speed?: number;
  onCardClick?: (slide: CoverflowSlide, index: number) => void;
  /** Names the carousel for assistive tech. */
  label?: string;
  className?: string;
  cardClassName?: string;
}

export const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
};

export function CoverflowCarousel({
  slides,
  rotate = 44,
  depth = 0.6,
  perspective = 3,
  falloff = 0.56,
  fade = 0.1,
  cardWidth = "clamp(240px, 32vw, 380px)",
  gap = 0.05,
  loop = true,
  showCaption = true,
  showPagination = true,
  showNavigation = true,
  expandable = true,
  speed = 0.32,
  onCardClick,
  label = "Production systems carousel",
  className,
  cardClassName,
}: CoverflowCarouselProps) {
  const count = slides.length;

  const frameRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  /** Fractional card index at the centre. The single source of truth. */
  const posRef = React.useRef(0);
  /** Where the current settle is headed. */
  const targetRef = React.useRef(0);
  const widthRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);

  const dragRef = React.useRef<{
    id: number;
    startX: number;
    startY: number;
    pos: number;
    v: number;
    t: number;
    captured: boolean;
  } | null>(null);
  const justDraggedRef = React.useRef(false);

  const [selected, setSelected] = React.useState(0);
  const [activeModal, setActiveModal] = React.useState<CoverflowSlide | null>(
    null,
  );
  const modalRef = React.useRef<HTMLDivElement>(null);

  // Close modal on outside click
  useOutsideClick(modalRef, () => {
    if (activeModal) setActiveModal(null);
  });

  // ESC key and body scroll lock
  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveModal(null);
      }
    }

    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeModal]);

  /** Nearest whole card, folded back into 0..count-1. */
  const indexAt = React.useCallback(
    (pos: number) => ((Math.round(pos) % count) + count) % count,
    [count],
  );

  // Paint straight to the DOM for 60 FPS performance
  const paint = React.useCallback(() => {
    const width = widthRef.current;
    if (!width) return;
    const pitch = width * (1 + gap);
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      let offset = index - pos;
      if (loop) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }

      const distance = Math.abs(offset);
      const ramp = Math.pow(distance, falloff);
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset);

      card.style.transform =
        `translateX(calc(-50% + ${offset * pitch}px)) ` +
        `translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`;

      const edge = loop ? Math.min(1, Math.max(0, count / 2 - distance)) : 1;
      card.style.opacity = String(Math.max(0, 1 - fade * distance) * edge);
      card.style.zIndex = String(100 - Math.round(distance));
    });
  }, [count, depth, fade, falloff, gap, loop, rotate]);

  const settle = React.useCallback(
    (target: number) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      targetRef.current = target;
      setSelected(indexAt(target));

      const step = () => {
        const remaining = target - posRef.current;
        if (Math.abs(remaining) < 0.0008) {
          posRef.current = target;
          paint();
          rafRef.current = null;
          return;
        }
        posRef.current += remaining * speed;
        paint();
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [indexAt, paint, speed],
  );

  const clamp = React.useCallback(
    (pos: number) => (loop ? pos : Math.max(0, Math.min(count - 1, pos))),
    [count, loop],
  );

  const goTo = React.useCallback(
    (index: number) => {
      const target = loop
        ? index + Math.round((targetRef.current - index) / count) * count
        : index;
      settle(clamp(target));
    },
    [clamp, count, loop, settle],
  );

  const nudge = React.useCallback(
    (by: number) => settle(clamp(Math.round(targetRef.current) + by)),
    [clamp, settle],
  );

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    targetRef.current = posRef.current;
    dragRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      pos: posRef.current,
      v: 0,
      t: performance.now(),
      captured: false,
    };
    justDraggedRef.current = false;
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;

    // Only initiate drag capture if pointer moved beyond threshold
    if (!drag.captured) {
      if (Math.hypot(dx, dy) > 6) {
        drag.captured = true;
        justDraggedRef.current = true;
        try {
          event.currentTarget.setPointerCapture(event.pointerId);
        } catch {
          // ignore
        }
      } else {
        return;
      }
    }

    const pitch = widthRef.current * (1 + gap);
    if (!pitch) return;

    const now = performance.now();
    const previous = posRef.current;
    posRef.current = clamp(drag.pos - dx / pitch);
    drag.v = ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000;
    drag.t = now;

    const index = indexAt(posRef.current);
    if (index !== selected) setSelected(index);
    paint();
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    if (drag.captured) {
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        // ignore
      }
      const carried = Math.max(-2, Math.min(2, drag.v * 0.18));
      settle(clamp(Math.round(posRef.current + carried)));

      // Grace period to prevent triggering onClick right after a swipe
      setTimeout(() => {
        justDraggedRef.current = false;
      }, 100);
    }

    dragRef.current = null;
  };

  const handleCardClick = (slide: CoverflowSlide, index: number) => {
    goTo(index);
    if (onCardClick) {
      onCardClick(slide, index);
    }
    if (expandable) {
      setActiveModal(slide);
    }
  };

  // Card width drives pitch, depth and perspective
  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const card = cardRefs.current[0];
      if (!card) return;
      widthRef.current = card.offsetWidth;
      paint();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  React.useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const active = slides[selected];

  return (
    <div
      className={cn("w-full relative", className)}
      style={{ ["--cf-card" as string]: cardWidth }}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      {/* ─────────────────────────────────────────────────────────────
         ACETERNITY EXPANDABLE MODAL (When any card is clicked/pressed)
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md h-full w-full z-40"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 grid place-items-center z-50 p-4 sm:p-6 overflow-y-auto">
            {/* Close Button */}
            <motion.button
              key={`close-button-${activeModal.id || activeModal.title}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.05 } }}
              className="flex absolute top-4 right-4 sm:top-6 sm:right-6 items-center justify-center bg-[#181B26] border border-[#2A324B] hover:bg-[#252B3B] text-[#FFFFFF] rounded-full h-9 w-9 z-10 cursor-pointer shadow-xl transition-colors"
              onClick={() => setActiveModal(null)}
              aria-label="Close modal"
            >
              <CloseIcon />
            </motion.button>

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", damping: 25, stiffness: 320 }}
              ref={modalRef}
              className="w-full max-w-[720px] max-h-[92vh] flex flex-col bg-[#11131B] border border-[#1E2333] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Header Image */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden shrink-0 bg-[#181B26]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeModal.src}
                  alt={activeModal.alt || activeModal.title || "Project image"}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11131B] via-transparent to-transparent opacity-90" />
                {activeModal.year && (
                  <div className="absolute top-4 left-4 font-mono text-xs text-[#FFFFFF] px-3 py-1 rounded-md bg-[#090A0F]/80 backdrop-blur-md border border-[#1E2333]">
                    {activeModal.year}
                  </div>
                )}
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 flex flex-col flex-1 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#2A324B_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#2A324B] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#1E2333] shrink-0">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    {activeModal.category && (
                      <span className="font-mono text-xs uppercase tracking-wider text-[#94A3B8] block">
                        {activeModal.category}
                      </span>
                    )}
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FFFFFF]">
                      {activeModal.title}
                    </h3>
                    {(activeModal.subtitle || activeModal.description) && (
                      <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-2xl pt-0.5">
                        {activeModal.subtitle || activeModal.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0 pt-1">
                    {activeModal.ctaLink && (
                      <a
                        href={activeModal.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs rounded-full font-bold uppercase tracking-wider bg-[#FFFFFF] text-[#090D16] hover:bg-[#E2E8F0] transition-colors shadow-sm"
                      >
                        <span>{activeModal.ctaText || "Live Demo"}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {activeModal.repoLink && (
                      <a
                        href={activeModal.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs rounded-full font-bold uppercase tracking-wider bg-[#181B26] text-[#94A3B8] hover:text-[#FFFFFF] border border-[#2A324B] transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Content Slot / Architecture Details */}
                {activeModal.content ? (
                  <div className="pt-6 relative flex-1 text-[#94A3B8] text-sm leading-relaxed flex flex-col gap-4">
                    {activeModal.content()}
                  </div>
                ) : activeModal.meta && activeModal.meta.length > 0 ? (
                  <div className="pt-6 relative flex-1">
                    <dl className="grid grid-cols-2 gap-3">
                      {activeModal.meta.map((m) => (
                        <div
                          key={m.label}
                          className="p-3 rounded-xl bg-[#181B26] border border-[#2A324B]"
                        >
                          <dt className="text-[11px] font-mono uppercase text-[#94A3B8]">
                            {m.label}
                          </dt>
                          <dd className="text-sm sm:text-base font-bold text-white mt-1">
                            {m.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
         3D COVERFLOW FRAME
      ───────────────────────────────────────────────────────────── */}
      <div className="relative">
        <div
          ref={frameRef}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              nudge(-1);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              nudge(1);
            } else if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              if (active) setActiveModal(active);
            }
          }}
          className="cursor-grab overflow-hidden py-10 outline-none ring-ring focus-visible:ring-2 active:cursor-grabbing"
          style={{
            perspective: `calc(var(--cf-card) * ${perspective})`,
            touchAction: "pan-y",
          }}
        >
          <div
            className="relative select-none"
            style={{
              height: "var(--cf-card)",
              transformStyle: "preserve-3d",
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id || index}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}`}
                className={cn(
                  "absolute left-1/2 top-0 aspect-square overflow-hidden rounded-2xl bg-[#11131B] shadow-2xl will-change-transform cursor-pointer group select-none transition-shadow",
                  cardClassName,
                )}
                style={{ width: "var(--cf-card)" }}
                onClick={() => {
                  if (justDraggedRef.current) return;
                  handleCardClick(slide, index);
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.src}
                  alt={slide.alt}
                  draggable={false}
                  className="h-full w-full select-none object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Top-Right Year Pill */}
                {slide.year && (
                  <div className="absolute top-3 right-3 font-mono text-[10px] text-white px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 pointer-events-none">
                    {slide.year}
                  </div>
                )}

                {/* Bottom Overlay with Category, Title & Expand Prompt */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4 pointer-events-none">
                  <div className="flex items-end justify-between gap-2">
                    <div className="min-w-0">
                      {slide.category && (
                        <div className="font-mono text-[10px] uppercase text-[#94A3B8] truncate mb-0.5">
                          {slide.category}
                        </div>
                      )}
                      <div className="text-xs sm:text-sm font-bold text-white truncate">
                        {slide.title}
                      </div>
                    </div>
                    <span className="font-mono text-[10px] shrink-0 font-medium text-white bg-white/20 backdrop-blur-md px-2 py-1 rounded border border-white/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-md">
                      Expand ↗
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Navigation Buttons */}
        {showNavigation && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => nudge(-1)}
              className="absolute left-2 sm:left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-[#11131B]/80 hover:bg-[#1E2333] border border-[#2A324B] p-2.5 text-white backdrop-blur-md transition-all shadow-xl hover:scale-105 cursor-pointer"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => nudge(1)}
              className="absolute right-2 sm:right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-[#11131B]/80 hover:bg-[#1E2333] border border-[#2A324B] p-2.5 text-white backdrop-blur-md transition-all shadow-xl hover:scale-105 cursor-pointer"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {/* Caption & Quick Expand Button below Carousel */}
      {showCaption && active?.title && (
        <div
          key={selected}
          className="mt-2 flex flex-col items-center px-6 duration-300 animate-in fade-in"
        >
          <div className="flex items-center gap-3">
            <p className="text-base sm:text-lg font-bold tracking-tight text-white">
              {active.title}
            </p>
            {active.year && (
              <span className="font-mono text-[10px] text-[#94A3B8] px-2 py-0.5 rounded bg-[#181B26] border border-[#2A324B]">
                {active.year}
              </span>
            )}
          </div>
          {active.subtitle && (
            <p className="mt-1 text-xs sm:text-sm text-[#94A3B8] text-center max-w-md">
              {active.subtitle}
            </p>
          )}

          {/* Quick Expand Button under Caption */}
          <button
            type="button"
            onClick={() => setActiveModal(active)}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-medium text-[#FFFFFF] bg-[#181B26] border border-[#2A324B] hover:bg-[#252B3B] hover:border-white/50 transition-all cursor-pointer shadow-sm group"
          >
            <span>Click card or click here to expand</span>
            <span className="text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              ↗
            </span>
          </button>
        </div>
      )}

      {/* Pagination Dots */}
      {showPagination && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selected}
              onClick={() => goTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                index === selected
                  ? "w-6 bg-white"
                  : "w-2 bg-[#2A324B] hover:bg-[#94A3B8]",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
