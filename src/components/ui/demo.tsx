"use client";
import { ThemeProvider as LibraryDemoThemeProvider } from "next-themes";
import { HeroBackground } from "@/components/ui/tweenly-hero-background";

export function Demo() {
  return (
    <HeroBackground
      mask="radial"
      className="min-h-[480px]"
    >
      <div className="relative z-10 grid min-h-[480px] place-items-center text-center">
        <h1 className="text-5xl font-semibold tracking-tight">Build something beautiful</h1>
      </div>
    </HeroBackground>
  );
}

function SourceSpecimen() {
  return <Demo />;
}

export default function LibraryRegistryPreview() {
  return (
    <LibraryDemoThemeProvider defaultTheme="dark" enableSystem={false}>
      <div
        data-component-demo
        data-demo-theme="dark"
        data-theme="dark"
        className="dark"
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
        <div className="relative w-full min-w-0 max-w-5xl min-h-[400px] flex items-center justify-center">
          <SourceSpecimen />
        </div>
      </div>
    </LibraryDemoThemeProvider>
  );
}
