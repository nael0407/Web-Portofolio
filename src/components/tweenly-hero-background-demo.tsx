"use client";

import { HeroBackground } from "@/components/ui/tweenly-hero-background";

export default function TweenlyHeroBackgroundDemo() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <HeroBackground
        variant="dots"
        mask="radial"
        className="min-h-[480px] rounded-3xl border border-border/40"
      >
        <div className="relative z-10 grid min-h-[480px] place-items-center text-center p-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Build something beautiful
          </h1>
        </div>
      </HeroBackground>
    </div>
  );
}

