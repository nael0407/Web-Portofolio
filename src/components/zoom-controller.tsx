"use client";

import { useEffect, useRef, useCallback } from "react";

const MIN_ZOOM = 1.4; // 140% minimum scale
const MAX_ZOOM = 3.0; // 300% maximum scale
const STEP = 0.1;

export function ZoomController() {
  const zoomRef = useRef<number>(MIN_ZOOM);

  const applyZoom = useCallback((newZoomValue: number) => {
    // Clamped strictly to MIN_ZOOM (1.4)
    const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(newZoomValue.toFixed(2))));
    zoomRef.current = clamped;

    // Apply zoom to documentElement silently without any notifications
    if (typeof document !== "undefined") {
      document.documentElement.style.zoom = `${Math.round(clamped * 100)}%`;
    }
  }, []);

  const handleZoomIn = useCallback(() => {
    const next = Math.min(MAX_ZOOM, Number((zoomRef.current + STEP).toFixed(2)));
    applyZoom(next);
  }, [applyZoom]);

  const handleZoomOut = useCallback(() => {
    if (zoomRef.current <= MIN_ZOOM + 0.001) {
      // At minimum 140%: silently do nothing (cannot zoom out below 140%)
      return;
    }
    const next = Math.max(MIN_ZOOM, Number((zoomRef.current - STEP).toFixed(2)));
    applyZoom(next);
  }, [applyZoom]);

  const handleResetZoom = useCallback(() => {
    applyZoom(MIN_ZOOM);
  }, [applyZoom]);

  useEffect(() => {
    // 1. Initial silent enforcement of 140%
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
          // At floor 140%: block zoom out silently
          return;
        }
        handleZoomOut();
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
            return;
          }
          const next = Math.max(MIN_ZOOM, Number((zoomRef.current - 0.05).toFixed(2)));
          applyZoom(next);
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
        }
      }
    };

    // 5. Browser-menu zoom detector & floor guard
    const checkBrowserZoomFloor = () => {
      if (typeof window === "undefined") return;
      const ratio = window.outerWidth && window.innerWidth ? window.outerWidth / window.innerWidth : 1;
      if (ratio < 0.98) {
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
    };
  }, [applyZoom, handleZoomIn, handleZoomOut, handleResetZoom]);

  // Silent operation: no visual notifications or popups rendered to screen
  return null;
}

