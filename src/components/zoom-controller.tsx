"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { ZoomIn, ZoomOut, Lock, RotateCcw } from "lucide-react";

const MIN_ZOOM = 1.4; // 140% minimum scale
const MAX_ZOOM = 3.0; // 300% maximum scale
const STEP = 0.1;

export function ZoomController() {
  const [zoom, setZoom] = useState<number>(MIN_ZOOM);
  const [showIndicator, setShowIndicator] = useState<boolean>(false);
  const [indicatorMessage, setIndicatorMessage] = useState<string>("");
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const zoomRef = useRef<number>(MIN_ZOOM);

  // Keep zoomRef synchronized with zoom state
  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  const triggerIndicator = useCallback((msg?: string) => {
    if (msg) {
      setIndicatorMessage(msg);
    }
    setShowIndicator(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => {
      setShowIndicator(false);
      setIndicatorMessage("");
    }, 2400);
  }, []);

  const applyZoom = useCallback(
    (newZoomValue: number, reason?: string) => {
      // Clamped strictly to MIN_ZOOM (1.4)
      const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(newZoomValue.toFixed(2))));
      zoomRef.current = clamped;
      setZoom(clamped);

      // Apply zoom to documentElement
      if (typeof document !== "undefined") {
        document.documentElement.style.zoom = `${Math.round(clamped * 100)}%`;
      }

      if (clamped <= MIN_ZOOM && reason === "min-hit") {
        triggerIndicator("Batas Minimum 140%");
      } else {
        triggerIndicator();
      }
    },
    [triggerIndicator]
  );

  const handleZoomIn = useCallback(() => {
    const next = Math.min(MAX_ZOOM, Number((zoomRef.current + STEP).toFixed(2)));
    applyZoom(next);
  }, [applyZoom]);

  const handleZoomOut = useCallback(() => {
    if (zoomRef.current <= MIN_ZOOM + 0.001) {
      triggerIndicator("Batas Minimum 140%");
      return;
    }
    const next = Math.max(MIN_ZOOM, Number((zoomRef.current - STEP).toFixed(2)));
    applyZoom(next, next <= MIN_ZOOM ? "min-hit" : undefined);
  }, [applyZoom, triggerIndicator]);

  const handleResetZoom = useCallback(() => {
    applyZoom(MIN_ZOOM, "min-hit");
  }, [applyZoom]);

  useEffect(() => {
    // 1. Initial enforcement of 140%
    if (typeof document !== "undefined") {
      document.documentElement.style.zoom = `${Math.round(MIN_ZOOM * 100)}%`;
    }

    // 2. Keyboard listener for Ctrl/Cmd shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrMeta = e.ctrlKey || e.metaKey;
      if (!isCtrlOrMeta) return;

      const isMinus =
        e.key === "-" ||
        e.key === "_" ||
        e.code === "Minus" ||
        e.code === "NumpadSubtract" ||
        e.keyCode === 189 ||
        e.keyCode === 109;

      const isPlus =
        e.key === "+" ||
        e.key === "=" ||
        e.code === "Equal" ||
        e.code === "NumpadAdd" ||
        e.keyCode === 187 ||
        e.keyCode === 107;

      const isZero =
        e.key === "0" ||
        e.code === "Digit0" ||
        e.code === "Numpad0" ||
        e.keyCode === 48 ||
        e.keyCode === 96;

      if (isMinus) {
        e.preventDefault();
        e.stopPropagation();
        if (zoomRef.current <= MIN_ZOOM + 0.001) {
          triggerIndicator("Batas Minimum 140% (Tidak Bisa Zoom Out)");
        } else {
          handleZoomOut();
        }
      } else if (isPlus) {
        e.preventDefault();
        e.stopPropagation();
        handleZoomIn();
      } else if (isZero) {
        e.preventDefault();
        e.stopPropagation();
        handleResetZoom();
      }
    };

    // 3. Wheel listener for Ctrl + Scroll / Pinch-to-zoom
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        if (e.deltaY > 0) {
          // Zooming out
          if (zoomRef.current <= MIN_ZOOM + 0.001) {
            triggerIndicator("Batas Minimum 140%");
          } else {
            const next = Math.max(MIN_ZOOM, Number((zoomRef.current - 0.05).toFixed(2)));
            applyZoom(next, next <= MIN_ZOOM ? "min-hit" : undefined);
          }
        } else if (e.deltaY < 0) {
          // Zooming in
          const next = Math.min(MAX_ZOOM, Number((zoomRef.current + 0.05).toFixed(2)));
          applyZoom(next);
        }
      }
    };

    // 4. Touch pinch listener for mobile / trackpads
    let initialTouchDistance = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialTouchDistance = Math.hypot(dx, dy);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && initialTouchDistance > 0) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentDistance = Math.hypot(dx, dy);
        // Distance decreasing means pinch-to-zoom out
        if (currentDistance < initialTouchDistance && zoomRef.current <= MIN_ZOOM + 0.001) {
          e.preventDefault();
          triggerIndicator("Batas Minimum 140%");
        }
      }
    };

    // 5. Browser-menu zoom detector & floor guard
    // If user changes browser zoom below 100% via browser menu, compensate dynamically
    const checkBrowserZoomFloor = () => {
      if (typeof window === "undefined") return;
      // Approximate browser zoom via outerWidth/innerWidth
      const ratio = window.outerWidth && window.innerWidth ? window.outerWidth / window.innerWidth : 1;
      if (ratio < 0.98) {
        // Browser was zoomed out below 100%
        const compensated = Math.max(MIN_ZOOM, Number((MIN_ZOOM / ratio).toFixed(2)));
        if (compensated !== zoomRef.current) {
          applyZoom(compensated);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false, capture: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("resize", checkBrowserZoomFloor);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", checkBrowserZoomFloor);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [applyZoom, handleZoomIn, handleZoomOut, handleResetZoom, triggerIndicator]);

  const isAtMinZoom = zoom <= MIN_ZOOM + 0.001;
  const isAtMaxZoom = zoom >= MAX_ZOOM - 0.001;

  return (
    <>
      {/* Floating Zoom Control Pill (Bottom-Right, Elegant Midnight Ink & Ice Blue) */}
      <div
        className={`fixed bottom-5 right-5 z-50 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#090D16]/90 backdrop-blur-md border border-[#BAE6FD]/40 text-[#F0F8FD] shadow-[0_10px_30px_rgba(9,13,22,0.4)] transition-all duration-300 ${
          showIndicator ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2 pointer-events-none hover:opacity-100 hover:pointer-events-auto"
        }`}
        aria-label="Zoom Level Control"
      >
        {/* Zoom Out Button (Disabled when at 140% minimum) */}
        <button
          type="button"
          onClick={handleZoomOut}
          disabled={isAtMinZoom}
          aria-label="Zoom out"
          title={isAtMinZoom ? "140% adalah batas zoom minimum" : "Zoom out"}
          className={`p-1 rounded-full transition-all duration-200 ${
            isAtMinZoom
              ? "opacity-30 text-[#94A3B8] cursor-not-allowed"
              : "hover:bg-[#1E2333] hover:text-[#38BDF8] active:scale-95 text-[#F0F8FD]"
          }`}
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        {/* Current Zoom Percentage & Minimum Badge */}
        <div className="flex items-center gap-1 px-1.5 font-mono text-[11px] font-bold tracking-wider select-none">
          {isAtMinZoom && <Lock className="w-2.5 h-2.5 text-[#38BDF8]" />}
          <span className={isAtMinZoom ? "text-[#38BDF8]" : "text-[#F0F8FD]"}>
            {Math.round(zoom * 100)}%
          </span>
          {isAtMinZoom && (
            <span className="text-[9px] uppercase tracking-widest text-[#BAE6FD]/80 font-sans ml-0.5 font-semibold">
              (MIN)
            </span>
          )}
        </div>

        {/* Zoom In Button (Always active up to 300%) */}
        <button
          type="button"
          onClick={handleZoomIn}
          disabled={isAtMaxZoom}
          aria-label="Zoom in"
          title="Zoom in"
          className={`p-1 rounded-full transition-all duration-200 ${
            isAtMaxZoom
              ? "opacity-30 text-[#94A3B8] cursor-not-allowed"
              : "hover:bg-[#1E2333] hover:text-[#38BDF8] active:scale-95 text-[#F0F8FD]"
          }`}
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        {/* Reset Button (Visible only when zoomed in beyond 140%) */}
        {!isAtMinZoom && (
          <button
            type="button"
            onClick={handleResetZoom}
            aria-label="Reset zoom to 140%"
            title="Reset ke default 140%"
            className="p-1 ml-0.5 rounded-full hover:bg-[#1E2333] hover:text-[#38BDF8] active:scale-95 text-[#94A3B8] transition-all duration-200"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Temporary Toast Banner when user hits minimum */}
      {indicatorMessage && (
        <div className="fixed bottom-16 right-5 z-50 pointer-events-none transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#090D16]/95 border border-[#38BDF8]/60 text-[#F0F8FD] font-mono text-xs font-bold tracking-wider shadow-[0_10px_25px_rgba(2,132,199,0.3)] backdrop-blur-md">
            <Lock className="w-3.5 h-3.5 text-[#38BDF8] animate-pulse" />
            <span>{indicatorMessage}</span>
          </div>
        </div>
      )}
    </>
  );
}
