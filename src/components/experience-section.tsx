"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Calendar, ArrowUpRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useMounted } from "@/hooks/use-mounted";
import { HeroBackground } from "@/components/ui/tweenly-hero-background";

interface ExperienceData {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  eyebrow: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  lede: string;
  collapsedPoints: string[];
  roleDescription: string;
  metrics: { label: string; value: string; unit: string }[];
  delivered: {
    title: string;
    bodyBeforeBold?: string;
    bold1?: string;
    bodyMiddle1?: string;
    bold2?: string;
    bodyMiddle2?: string;
    bold3?: string;
    bodyEnd?: string;
  }[];
  stack: string[];
}

const ROBOTICS_EXPERIENCE: ExperienceData = {
  id: "gadjah-mada-robotics",
  role: "Computer Vision Engineer",
  company: "Gadjah Mada Robotics Team",
  period: "Nov 2025 — Present",
  location: "Universitas Gadjah Mada",
  eyebrow: "Gadjah Mada Robotics Team",
  image: "/images/robotics-experience.jpg",
  imageAlt: "Humanoid robot perception testing by Gadjah Mada Robotics Team",
  imageCaption: "Humanoid Robot Platform · Vision & Perception Test",
  lede: "Perception for a humanoid robot: finding the ball and reading the field from a live camera feed.",
  collapsedPoints: [
    "Ball detection: RF-DETR (Large), fine-tuned through Roboflow, reaches 97.7% mAP@50 with 97.1% precision and 97.0% recall on a held-out split of a 2,684-image multi-ball dataset. A YOLO detector was trained alongside it.",
    "Field segmentation: YOLO segmentation trained on 10,233 annotated images across venues and lighting runs at about 12 FPS, and was benchmarked against RF-DETR Small.",
  ],
  roleDescription:
    "I build the computer vision modules in the humanoid robot's ROS2 perception pipeline: a detector that finds balls, and a segmentation model that identifies the playing field and boundary lines from the live camera feed. Both are trained on annotated datasets with RF-DETR and YOLO.",
  metrics: [
    { label: "Ball detection", value: "97.7%", unit: "mAP@50" },
    { label: "Field segmentation", value: "~12", unit: "FPS inference" },
  ],
  delivered: [
    {
      title: "Ball detection:",
      bodyBeforeBold: " RF-DETR (Large), fine-tuned through Roboflow, reaches ",
      bold1: "97.7% mAP@50",
      bodyMiddle1: " with ",
      bold2: "97.1% precision",
      bodyMiddle2: " and ",
      bold3: "97.0% recall",
      bodyEnd: " on a held-out split of a 2,684-image multi-ball dataset. A YOLO detector was trained alongside it.",
    },
    {
      title: "Field segmentation:",
      bodyBeforeBold: " YOLO segmentation trained on ",
      bold1: "10,233 annotated images",
      bodyMiddle1: " across venues and lighting runs at about ",
      bold2: "12 FPS",
      bodyMiddle2: ", and was benchmarked against RF-DETR Small.",
    },
  ],
  stack: ["Python", "ROS2", "RF-DETR", "YOLO", "Roboflow", "OpenCV"],
};

export function ExperienceSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const mounted = useMounted();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal with Escape key and lock body/html scroll
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    }
    if (isExpanded) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isExpanded]);

  // Close modal when clicking outside
  useOutsideClick(modalRef, () => {
    if (isExpanded) setIsExpanded(false);
  });

  return (
    /* ─────────────────────────────────────────────────────────────
       SECTION 3: EXPERIENCE — LIGHT SECTION (Midnight Ink + Ice Blue)
       Both collapsed card and expanded modal strictly use Midnight Ink + Ice Blue
    ───────────────────────────────────────────────────────────── */
    <section
      id="experience"
      className="py-24 md:py-32 bg-[#E6F3FA] text-[#090D16] relative overflow-hidden"
    >
      {/* Ambient Ice Blue Glow */}
      <div
        className="pointer-events-none absolute top-1/3 -right-40 w-[600px] h-[600px] bg-[#BAE6FD]/30 blur-[150px] rounded-full"
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
        {/* Section Header */}
        <div className="mb-16 pb-8 border-b border-[#BAE6FD]">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#0284C7] mb-3">
            03 / TRACK RECORD
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#090D16] uppercase mb-4">
            Work Experience
          </h2>
          <p className="text-sm text-[#090D16]/75 max-w-lg leading-relaxed">
            Engineering roles where I build computer vision pipelines, perception
            models, and real-time robotic systems.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l border-[#BAE6FD] pl-6 sm:pl-10">
          <div className="relative group">
            {/* Timeline Indicator Dot */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-7 w-3.5 h-3.5 rounded-full border-2 border-[#E6F3FA] bg-[#0284C7] group-hover:scale-125 transition-transform" />

            {/* Clickable Card (Before Expand) */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setIsExpanded(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsExpanded(true);
                }
              }}
              className="w-full text-left rounded-2xl border border-[#BAE6FD] bg-[#FFFFFF] p-6 sm:p-8 shadow-sm hover:border-[#0284C7] hover:shadow-lg transition-all duration-300 cursor-pointer block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
              aria-label={`Expand details for ${ROBOTICS_EXPERIENCE.role} at ${ROBOTICS_EXPERIENCE.company}`}
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
                <div className="space-y-1">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#0284C7] font-semibold">
                    {ROBOTICS_EXPERIENCE.eyebrow}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#090D16] group-hover:text-[#0284C7] transition-colors flex items-center gap-2">
                    {ROBOTICS_EXPERIENCE.role}
                    <ArrowUpRight className="w-4 h-4 text-[#0284C7] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#090D16]/70 shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>{ROBOTICS_EXPERIENCE.period}</span>
                </div>
              </div>

              {/* Lede text */}
              <p className="text-sm text-[#090D16]/80 mb-5 leading-relaxed font-medium">
                {ROBOTICS_EXPERIENCE.lede}
              </p>

              {/* Requested exact points before expand */}
              <div className="space-y-3 mb-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 sm:p-5">
                <ul className="space-y-3">
                  <li className="text-xs sm:text-sm text-[#090D16]/85 flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#0284C7] font-bold select-none mt-0.5">
                      ›
                    </span>
                    <span>
                      <strong className="text-[#090D16] font-semibold">Ball detection:</strong>{" "}
                      RF-DETR (Large), fine-tuned through Roboflow, reaches{" "}
                      <strong className="text-[#090D16] font-semibold">97.7% mAP@50</strong> with{" "}
                      <strong className="text-[#090D16] font-semibold">97.1% precision</strong> and{" "}
                      <strong className="text-[#090D16] font-semibold">97.0% recall</strong> on a held-out split of a 2,684-image multi-ball dataset. A YOLO detector was trained alongside it.
                    </span>
                  </li>
                  <li className="text-xs sm:text-sm text-[#090D16]/85 flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#0284C7] font-bold select-none mt-0.5">
                      ›
                    </span>
                    <span>
                      <strong className="text-[#090D16] font-semibold">Field segmentation:</strong>{" "}
                      YOLO segmentation trained on{" "}
                      <strong className="text-[#090D16] font-semibold">10,233 annotated images</strong> across venues and lighting runs at about{" "}
                      <strong className="text-[#090D16] font-semibold">12 FPS</strong>, and was benchmarked against RF-DETR Small.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Action Prompt & Stack */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#BAE6FD]/60">
                <div className="flex flex-wrap gap-2">
                  {ROBOTICS_EXPERIENCE.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded text-xs font-mono bg-[#F0F8FF] text-[#090D16] border border-[#BAE6FD]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider text-[#0284C7] group-hover:translate-x-0.5 transition-transform">
                  <span>EXPAND REPORT & PHOTO</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </HeroBackground>

      {/* ─────────────────────────────────────────────────────────────
         EXPANDED MODAL (Portalled to document.body, z-[9999])
      ───────────────────────────────────────────────────────────── */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {isExpanded && (
            <div className="fixed inset-0 z-[9999] overflow-hidden">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsExpanded(false)}
                className="fixed inset-0 bg-[#090D16]/65 backdrop-blur-md h-full w-full z-[9998] cursor-pointer"
              />

              {/* Modal Container */}
              <div className="fixed inset-0 grid place-items-center z-[9999] p-4 sm:p-6 overflow-y-auto">
                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.05 } }}
                  className="flex fixed top-4 right-4 sm:top-6 sm:right-6 items-center justify-center bg-[#FFFFFF] border border-[#BAE6FD] hover:bg-[#F0F8FD] hover:border-[#0284C7] text-[#090D16] rounded-full h-9 w-9 z-[10000] cursor-pointer shadow-xl transition-colors"
                  onClick={() => setIsExpanded(false)}
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4 text-[#090D16]" />
                </motion.button>

                {/* Modal Body: Two-Column Split (Left: Robot Photo, Right: Explanations) in Midnight Ink + Ice Blue */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 16 }}
                  transition={{ type: "spring", damping: 25, stiffness: 320 }}
                  ref={modalRef}
                  className="relative z-[9999] w-full max-w-[940px] max-h-[92vh] flex flex-col md:flex-row bg-[#FFFFFF] border border-[#BAE6FD] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-[#0284C7]/15"
                >
              {/* LEFT COLUMN: Photo Sent by User */}
              <div className="relative w-full md:w-[42%] lg:w-[40%] shrink-0 bg-[#F0F8FD] flex flex-col justify-between overflow-hidden border-b md:border-b-0 md:border-r border-[#BAE6FD]">
                <div className="relative h-64 sm:h-80 md:h-full w-full overflow-hidden min-h-[300px] md:min-h-[500px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ROBOTICS_EXPERIENCE.image}
                    alt={ROBOTICS_EXPERIENCE.imageAlt}
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Bottom Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF]/90 via-transparent to-transparent opacity-60 md:opacity-50" />

                  {/* Caption badge at bottom left of photo */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#FFFFFF]/95 backdrop-blur-md border border-[#BAE6FD] shadow-md">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-[#0284C7] font-bold">
                      Humanoid Robotics
                    </p>
                    <p className="text-xs text-[#090D16] mt-0.5 font-medium">
                      Perception & Hardware Testing on Grass Venue
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Full Project Explanation in Midnight Ink + Ice Blue */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-[#090D16]">
                {/* Header */}
                <div className="space-y-2">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#0284C7] font-semibold">
                    {ROBOTICS_EXPERIENCE.eyebrow}
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#090D16]">
                    {ROBOTICS_EXPERIENCE.role}
                  </h2>
                  <p className="text-sm sm:text-base text-[#090D16]/80 leading-relaxed font-medium">
                    {ROBOTICS_EXPERIENCE.lede}
                  </p>
                </div>

                <hr className="border-0 border-t border-[#BAE6FD]" />

                {/* The role */}
                <section className="space-y-2">
                  <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-[#090D16] font-bold">
                    The role
                  </h3>
                  <p className="text-sm sm:text-[15px] text-[#090D16]/80 leading-relaxed">
                    {ROBOTICS_EXPERIENCE.roleDescription}
                  </p>
                </section>

                {/* Two Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {ROBOTICS_EXPERIENCE.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#F0F8FD] border border-[#BAE6FD] flex flex-col gap-1.5"
                    >
                      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#0284C7] font-semibold">
                        {m.label}
                      </span>
                      <div className="text-2xl font-bold tracking-tight text-[#090D16] font-mono">
                        {m.value}{" "}
                        <span className="text-xs font-sans font-medium text-[#090D16]/70">
                          {m.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* What I delivered */}
                <section className="space-y-2.5">
                  <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-[#090D16] font-bold">
                    What I delivered
                  </h3>
                  <ul className="space-y-3 pl-4 list-disc text-sm text-[#090D16]/85 leading-relaxed marker:text-[#0284C7]">
                    {ROBOTICS_EXPERIENCE.delivered.map((item, idx) => (
                      <li key={idx}>
                        <strong className="text-[#090D16] font-bold">
                          {item.title}
                        </strong>
                        {item.bodyBeforeBold}
                        {item.bold1 && (
                          <strong className="text-[#090D16] font-bold">
                            {item.bold1}
                          </strong>
                        )}
                        {item.bodyMiddle1}
                        {item.bold2 && (
                          <strong className="text-[#090D16] font-bold">
                            {item.bold2}
                          </strong>
                        )}
                        {item.bodyMiddle2}
                        {item.bold3 && (
                          <strong className="text-[#090D16] font-bold">
                            {item.bold3}
                          </strong>
                        )}
                        {item.bodyEnd}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Foot: Stack Badges */}
                <div className="pt-2 border-t border-[#BAE6FD] flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#090D16] font-bold mr-1">
                    Stack
                  </span>
                  {ROBOTICS_EXPERIENCE.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs text-[#090D16] border border-[#BAE6FD] bg-[#F0F8FD] rounded-md px-2.5 py-1 font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )}
    </section>
  );
}
