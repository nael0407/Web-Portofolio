import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Full-Stack Developer & Software Engineer | Portfolio",
  description:
    "Clean, minimalist, and high-performance portfolio showcasing full-stack systems, modern web apps, and engineering craft.",
  keywords: [
    "Full-Stack Developer",
    "Frontend Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}
    >
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
