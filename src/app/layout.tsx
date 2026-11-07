import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ZoomController } from "@/components/zoom-controller";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.4,
  minimumScale: 1.4,
  maximumScale: 5.0,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "Natanael Sebastian Simanjuntak — Portfolio",
  description:
    "Portfolio of Natanael Sebastian Simanjuntak — AI, Network Security & Forensics, Cloud-Native Infrastructure, and Robotics Perception.",
  keywords: [
    "Natanael Sebastian Simanjuntak",
    "Computer Vision",
    "Deep Learning",
    "Network Security",
    "Digital Forensics",
    "Kubernetes",
    "Cloud Infrastructure",
    "Next.js",
  ],
  authors: [
    {
      name: "Natanael Sebastian Simanjuntak",
      url: "https://github.com/nael0407",
    },
  ],
  openGraph: {
    title: "Natanael Sebastian Simanjuntak — Portfolio",
    description:
      "Engineering portfolio of Natanael Sebastian Simanjuntak — AI, Network Security & Forensics, and Cloud-Native Infrastructure.",
    type: "website",
  },
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
        <ZoomController />
        {children}
      </body>
    </html>
  );
}
