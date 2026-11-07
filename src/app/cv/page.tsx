import type { Metadata } from "next";
import Link from "next/link";
import { Download, ExternalLink, ArrowLeft, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Natanael Sebastian Simanjuntak — Curriculum Vitae",
  description:
    "Curriculum Vitae of Natanael Sebastian Simanjuntak — AI, Network Security, Forensics, and Cloud Infrastructure.",
};

export default function CvPage() {
  return (
    <main className="fixed inset-0 bg-[#090D16] text-[#090D16] flex flex-col overflow-hidden">
      {/* Top Header: Midnight Ink & Ice Blue */}
      <header className="w-full px-4 sm:px-8 py-3.5 border-b border-[#BAE6FD] bg-[#F0F8FD] flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#E0F2FE] text-xs font-mono font-semibold text-[#090D16] border border-[#BAE6FD] hover:border-[#0284C7] transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>Back to Portfolio</span>
          </Link>
          <div className="h-4 w-px bg-[#BAE6FD]" />
          <div className="flex items-center gap-2 text-xs font-mono text-[#090D16] font-bold">
            <FileText className="w-4 h-4 text-[#0284C7]" />
            <span>Natanael Sebastian Simanjuntak — CV</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/Natanael_Sebastian_Simanjuntak_CV.pdf"
            download="Natanael_Sebastian_Simanjuntak_CV.pdf"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#090D16] hover:bg-[#0284C7] text-white text-xs font-mono font-semibold transition-all hover:scale-[1.02] shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Download PDF</span>
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-[#E0F2FE] text-[#090D16] border border-[#BAE6FD] hover:border-[#0284C7] text-xs font-mono font-semibold transition-all shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>Open in Tab</span>
          </a>
        </div>
      </header>

      {/* Full-height PDF viewer bounded inside viewport */}
      <div className="flex-1 w-full h-full relative overflow-hidden bg-[#090A0F]">
        <iframe
          src="/cv.pdf#toolbar=1&navpanes=0"
          title="Natanael Sebastian Simanjuntak — Curriculum Vitae"
          className="w-full h-full border-0 block"
        />
      </div>
    </main>
  );
}

