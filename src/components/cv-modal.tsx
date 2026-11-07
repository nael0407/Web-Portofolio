"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Download, ExternalLink, FileText, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useMounted } from "@/hooks/use-mounted";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CvModal({ isOpen, onClose }: CvModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const mounted = useMounted();

  useOutsideClick(modalRef, () => {
    if (isOpen) onClose();
  });

  // ESC key and strict html/body scroll lock
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
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
  }, [isOpen, onClose]);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Curriculum Vitae Preview"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer z-[9998]"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative w-full max-w-5xl h-[calc(100%-1.5rem)] sm:h-[calc(100%-2.5rem)] my-auto bg-[#090D16] border border-[#BAE6FD] rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_rgba(2,132,199,0.2)] flex flex-col overflow-hidden z-[9999] text-[#090D16]"
          >
            {/* ─────────────────────────────────────────────────────────────
                TOP TOOLBAR: MIDNIGHT INK & ICE BLUE
            ───────────────────────────────────────────────────────────── */}
            <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-[#BAE6FD] bg-[#F0F8FD] shrink-0 text-[#090D16]">
              {/* Document Identity */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#0284C7]/15 border border-[#BAE6FD] flex items-center justify-center text-[#0284C7] shrink-0 shadow-sm">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-[#090D16] tracking-wide truncate">
                    Natanael Sebastian Simanjuntak
                  </h3>
                  <p className="font-mono text-[10px] sm:text-[11px] text-[#0284C7] font-semibold tracking-wider uppercase">
                    Curriculum Vitae • PDF
                  </p>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-2">
                <a
                  href="/Natanael_Sebastian_Simanjuntak_CV.pdf"
                  download="Natanael_Sebastian_Simanjuntak_CV.pdf"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#090D16] hover:bg-[#0284C7] text-white text-xs font-mono font-semibold transition-all hover:scale-[1.02] cursor-pointer shadow-sm"
                  title="Download PDF"
                >
                  <Download className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#E0F2FE] text-[#090D16] border border-[#BAE6FD] hover:border-[#0284C7] text-xs font-mono font-semibold transition-all cursor-pointer shadow-sm"
                  title="Open PDF in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span className="hidden sm:inline">Open Tab</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-xl bg-white hover:bg-[#E0F2FE] border border-[#BAE6FD] hover:border-[#0284C7] flex items-center justify-center text-[#090D16]/75 hover:text-[#090D16] transition-colors cursor-pointer shadow-sm"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ─────────────────────────────────────────────────────────────
                MAIN BODY: PDF EMBED
            ───────────────────────────────────────────────────────────── */}
            <div className="flex-1 w-full h-full overflow-hidden relative bg-[#090A0F]">
              <iframe
                src="/cv.pdf#toolbar=1&navpanes=0"
                title="Natanael Sebastian Simanjuntak — Curriculum Vitae"
                className="w-full h-full border-0 block"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
