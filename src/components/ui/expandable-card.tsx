"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { useOutsideClick } from "@/hooks/use-outside-click";

export interface ExpandableProjectCard {
  id: string;
  title: string;
  description: string;
  category?: string;
  year?: string;
  src: string;
  ctaText?: string;
  ctaLink?: string;
  repoLink?: string;
  tags?: string[];
  content: () => React.ReactNode;
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
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
    </motion.svg>
  );
};

interface ExpandableCardsProps {
  cards: ExpandableProjectCard[];
}

export function ExpandableCards({ cards }: ExpandableCardsProps) {
  const [active, setActive] = useState<ExpandableProjectCard | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md h-full w-full z-40"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-50 p-4 sm:p-6 overflow-y-auto">
            <motion.button
              key={`close-button-${active.id}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-4 right-4 sm:top-6 sm:right-6 items-center justify-center bg-[#181B26] border border-[#2A324B] hover:bg-[#252B3B] text-[#FFFFFF] rounded-full h-9 w-9 z-10 cursor-pointer shadow-xl transition-colors"
              onClick={() => setActive(null)}
              aria-label="Close modal"
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-[640px] max-h-[90vh] flex flex-col bg-[#11131B] border border-[#1E2333] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
            >
              <motion.div
                layoutId={`image-${active.id}-${id}`}
                className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={active.src}
                  alt={active.title}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11131B] via-transparent to-transparent opacity-90" />
                {active.year && (
                  <div className="absolute top-4 left-4 font-mono text-xs text-[#FFFFFF] px-3 py-1 rounded-md bg-[#090A0F]/80 backdrop-blur-md border border-[#1E2333]">
                    {active.year}
                  </div>
                )}
              </motion.div>

              <div className="p-6 sm:p-8 flex flex-col flex-1 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#2A324B_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#2A324B] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E2333] shrink-0">
                  <div>
                    {active.category && (
                      <span className="font-mono text-xs uppercase tracking-wider text-[#94A3B8] block mb-1">
                        {active.category}
                      </span>
                    )}
                    <motion.h3
                      layoutId={`title-${active.id}-${id}`}
                      className="text-2xl font-bold tracking-tight text-[#FFFFFF]"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.id}-${id}`}
                      className="text-sm text-[#94A3B8] mt-1"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    {active.ctaLink && (
                      <motion.a
                        layoutId={`button-${active.id}-${id}`}
                        href={active.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs rounded-full font-bold uppercase tracking-wider bg-[#FFFFFF] text-[#090D16] hover:bg-[#E2E8F0] transition-colors shadow-sm"
                      >
                        <span>{active.ctaText || "Visit"}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </motion.a>
                    )}
                    {active.repoLink && (
                      <a
                        href={active.repoLink}
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

                <div className="pt-6 relative flex-1">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[#94A3B8] text-sm leading-relaxed flex flex-col gap-4"
                  >
                    {active.content()}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Grid of 4 Expandable Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto w-full">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.id}-${id}`}
            key={card.id}
            onClick={() => setActive(card)}
            className="group p-5 sm:p-6 flex flex-col justify-between rounded-2xl border border-[#1E2333] bg-[#11131B] hover:bg-[#151822] hover:border-[#FFFFFF]/40 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="flex gap-4 flex-col w-full">
              <motion.div
                layoutId={`image-${card.id}-${id}`}
                className="relative h-56 sm:h-64 w-full overflow-hidden rounded-xl bg-[#181B26]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.src}
                  alt={card.title}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11131B]/80 via-transparent to-transparent pointer-events-none" />
                {card.year && (
                  <div className="absolute top-3 right-3 font-mono text-[11px] text-[#FFFFFF] px-2.5 py-1 rounded-md bg-[#090A0F]/80 backdrop-blur-md border border-[#1E2333]">
                    {card.year}
                  </div>
                )}
              </motion.div>

              <div>
                {card.category && (
                  <div className="font-mono text-xs uppercase tracking-wider text-[#94A3B8] mb-1">
                    {card.category}
                  </div>
                )}
                <motion.h3
                  layoutId={`title-${card.id}-${id}`}
                  className="text-lg sm:text-xl font-bold tracking-tight text-[#FFFFFF] group-hover:text-[#F8FAFC] transition-colors"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.id}-${id}`}
                  className="text-xs sm:text-sm text-[#94A3B8] mt-1 line-clamp-2 leading-relaxed"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#1E2333] flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {card.tags?.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#181B26] text-[#E2E8F0] border border-[#2A324B]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-xs font-mono font-medium text-[#94A3B8] group-hover:text-[#FFFFFF] inline-flex items-center gap-1 transition-colors">
                Expand Project →
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
