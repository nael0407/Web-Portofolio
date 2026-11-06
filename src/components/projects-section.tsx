"use client";

import React from "react";
import {
  CoverflowCarousel,
  type CoverflowSlide,
} from "@/components/ui/coverflow-carousel";
import { HeroBackground } from "@/components/ui/tweenly-hero-background";

const PROJECTS_DATA: CoverflowSlide[] = [
  {
    id: "tetris",
    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=800&fit=crop&q=80&auto=format",
    alt: "Tetris Deep RL Research neural network and environment benchmark",
    title: "Tetris Deep RL Research",
    subtitle:
      "A controlled study of why Tetris agents learn from hand-crafted features and fail completely on the raw board.",
    category: "Reinforcement learning",
    year: "Research",
    repoLink: "https://github.com/nael0407/Tetris_DRL",
    tags: ["Python", "PyTorch", "Gymnasium", "Numba", "NumPy", "rliable"],
    content: () => (
      <div className="space-y-6">
        {/* The project */}
        <div className="space-y-2">
          <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-white">
            The project
          </h4>
          <p className="text-sm sm:text-[15px] text-[#94A3B8] leading-relaxed">
            A controlled study of what makes reinforcement learning work on Tetris: the learning algorithm, or the way the board is represented. I wrote the environment from scratch, then trained gradient-free (CEM) and value-based (DQN-style) agents on two inputs, four hand-crafted Dellacherie features and the raw 200-cell board, in a 2 × 2 factorial design scored with IQM and bootstrap confidence intervals.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-4 rounded-xl bg-[#161926] border border-[#262A3A] flex flex-col gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#94A3B8]">
              Best agent
            </span>
            <div className="text-2xl font-bold tracking-tight text-white font-mono">
              55,169 <span className="text-xs font-sans font-medium text-[#94A3B8]">IQM score</span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#161926] border border-[#262A3A] flex flex-col gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#94A3B8]">
              Environment speed
            </span>
            <div className="text-2xl font-bold tracking-tight text-white font-mono">
              &gt;25,000 <span className="text-xs font-sans font-medium text-[#94A3B8]">steps/sec</span>
            </div>
          </div>
        </div>

        {/* What it found */}
        <div className="space-y-2.5">
          <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-white">
            What it found
          </h4>
          <ul className="space-y-2.5 text-sm sm:text-[15px] text-[#94A3B8] leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-white select-none mt-0.5">•</span>
              <span>
                On Dellacherie features, CEM clears about <b className="text-white font-semibold">499 lines per game</b>, roughly <b className="text-white font-semibold">138×</b> a linear TD(0) baseline and <b className="text-white font-semibold">89.8%</b> of the hand-tuned literature heuristic. On the raw board, both algorithms score <b className="text-white font-semibold">zero</b>.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-white select-none mt-0.5">•</span>
              <span>
                Linear probes on a trained network&apos;s first hidden layer recover board geometry on held-out data: <b className="text-white font-semibold">R² = 0.958</b> for aggregate height and <b className="text-white font-semibold">0.886</b> for holes.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-white select-none mt-0.5">•</span>
              <span>
                A Numba-accelerated Gymnasium environment runs about <b className="text-white font-semibold">24× faster</b> than the NumPy version on CPU, with 66 passing tests and a benchmark script anyone can rerun.
              </span>
            </li>
          </ul>
        </div>

        {/* Foot: Scope & Stack */}
        <div className="pt-4 border-t border-[#1E2333] space-y-3">
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-white font-semibold mr-2">Scope</span>
            One game and board size, 5 seeds per configuration.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-white font-semibold mr-1">Stack</span>
            {["Python", "PyTorch", "Gymnasium", "Numba", "NumPy", "rliable"].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded text-xs font-mono bg-[#161926] text-[#E2E8F0] border border-[#262A3A]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "datacenter",
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&q=80&auto=format",
    alt: "Data Center Spine-Leaf network and DFIR forensic pipeline",
    title: "Data Center Microsegmentation & DFIR Lab",
    subtitle:
      "A virtualized 14-node data center that contains lateral movement, then preserves the evidence of it.",
    category: "Network security and forensics",
    year: "Infra Lab",
    repoLink:
      "https://github.com/nael0407/DataCenter_Network_MicroSegmentation_-_Lateral_Movement_Hunting",
    tags: ["FRRouting", "EVPN/VXLAN", "OPNsense", "nftables", "Ansible", "Zeek", "NetworkX", "KVM"],
    content: () => (
      <div className="space-y-6">
        {/* The project */}
        <div className="space-y-2">
          <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-white">
            The project
          </h4>
          <p className="text-sm sm:text-[15px] text-[#94A3B8] leading-relaxed">
            A 14-VM data center on KVM: a Spine-Leaf EVPN/VXLAN fabric on FRRouting, an OPNsense stateful firewall, and host-level nftables policies deployed with Ansible. Six attack scenarios, including chained SSH pivots and database exfiltration, run against a flat baseline and then against the hardened network. A forensic pipeline then collects and preserves the evidence.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-4 rounded-xl bg-[#161926] border border-[#262A3A] flex flex-col gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#94A3B8]">
              Exposed endpoints
            </span>
            <div className="text-2xl font-bold tracking-tight text-white font-mono">
              −85.71% <span className="text-xs font-sans font-medium text-[#94A3B8]">14 → 2</span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#161926] border border-[#262A3A] flex flex-col gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#94A3B8]">
              Fabric failover
            </span>
            <div className="text-2xl font-bold tracking-tight text-white font-mono">
              &lt;100 ms <span className="text-xs font-sans font-medium text-[#94A3B8]">no packet loss</span>
            </div>
          </div>
        </div>

        {/* What it showed */}
        <div className="space-y-2.5">
          <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-white">
            What it showed
          </h4>
          <ul className="space-y-2.5 text-sm sm:text-[15px] text-[#94A3B8] leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-white select-none mt-0.5">•</span>
              <span>
                All <b className="text-white font-semibold">3 of 3</b> chained SSH pivots are blocked, and <b className="text-white font-semibold">0 of 42</b> simulated customer records reach the attacker&apos;s C2 server.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-white select-none mt-0.5">•</span>
              <span>
                The fabric switches <b className="text-white font-semibold">81.85 Gbps</b> within a zone (iperf3) and <b className="text-white font-semibold">2.91 Gbps</b> through the stateful firewall. Link-failure and spine-crash tests lose no packets at a 100 ms probe interval.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-white select-none mt-0.5">•</span>
              <span>
                Live host triage follows RFC 3227 and averages <b className="text-white font-semibold">2.36 s</b> staged in RAM. Evidence handling is ISO/IEC 27037-aligned, with a chain-of-custody manifest, SHA-256 and SHA-512 hashes, a read-only vault and an integrity checker.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-white select-none mt-0.5">•</span>
              <span>
                Zeek logs and a NetworkX graph model flag <b className="text-white font-semibold">56 of 56</b> injected lateral-movement events, with no false alarms on legitimate application traffic.
              </span>
            </li>
          </ul>
        </div>

        {/* Foot: Scope & Stack */}
        <div className="pt-4 border-t border-[#1E2333] space-y-3">
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-white font-semibold mr-2">Scope</span>
            Virtualized lab, not production hardware. The 30 s triage figure is an industry target, not a measured competitor.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-white font-semibold mr-1">Stack</span>
            {["FRRouting", "EVPN/VXLAN", "OPNsense", "nftables", "Ansible", "Zeek", "NetworkX", "KVM"].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded text-xs font-mono bg-[#161926] text-[#E2E8F0] border border-[#262A3A]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "kubernetes",
    src: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&h=800&fit=crop&q=80&auto=format",
    alt: "Hardened Kubernetes Platform multi-layer security architecture",
    title: "Hardened Kubernetes Platform",
    subtitle:
      "A zero-trust k3s cluster that stops attacks at the network, admission and kernel layers, managed through GitOps.",
    category: "Cloud-native security",
    year: "Cluster Lab",
    repoLink: "https://github.com/nael0407/k8s-hardened-platform",
    tags: ["k3s", "Cilium", "Tetragon", "Kyverno", "Cosign", "Argo CD"],
    content: () => (
      <div className="space-y-6">
        {/* The project */}
        <div className="space-y-2">
          <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-white">
            The project
          </h4>
          <p className="text-sm sm:text-[15px] text-[#94A3B8] leading-relaxed">
            A 3-node k3s cluster, one control plane and two workers, defended in three layers: Cilium eBPF default-deny network policy, Kyverno and Cosign admission control, and Tetragon runtime enforcement inside the kernel. Argo CD keeps the whole platform declared in Git. One script attacks the cluster and checks that each layer responds.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-4 rounded-xl bg-[#161926] border border-[#262A3A] flex flex-col gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#94A3B8]">
              Automated checks
            </span>
            <div className="text-2xl font-bold tracking-tight text-white font-mono">
              9/9 <span className="text-xs font-sans font-medium text-[#94A3B8]">passing</span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#161926] border border-[#262A3A] flex flex-col gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#94A3B8]">
              Defense layers
            </span>
            <div className="text-2xl font-bold tracking-tight text-white font-mono">
              3 <span className="text-xs font-sans font-medium text-[#94A3B8]">network, admission, kernel</span>
            </div>
          </div>
        </div>

        {/* What it enforces */}
        <div className="space-y-2.5">
          <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-white">
            What it enforces
          </h4>
          <ul className="space-y-2.5 text-sm sm:text-[15px] text-[#94A3B8] leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-white select-none mt-0.5">•</span>
              <span>
                The 9 checks are <b className="text-white font-semibold">6 attack scenarios</b> mapped to MITRE ATT&amp;CK and <b className="text-white font-semibold">3 control checks</b>: legitimate traffic still flows, a benign command is not blocked, and every GitOps app reports healthy.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-white select-none mt-0.5">•</span>
              <span>
                Privileged and hostPID pods are <b className="text-white font-semibold">rejected at admission</b>, unsigned images fail Cosign verification, and mutable image tags are rewritten to immutable digests.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-white select-none mt-0.5">•</span>
              <span>
                Tetragon <b className="text-white font-semibold">kills the process in the kernel</b> (SIGKILL, exit 137) when it reads the ServiceAccount token or starts a shell. Unauthorized pod-to-pod traffic is dropped, while frontend to backend traffic still returns HTTP 200.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-white select-none mt-0.5">•</span>
              <span>
                An Argo CD App-of-Apps with self-heal and prune enabled keeps the cluster matching Git.
              </span>
            </li>
          </ul>
        </div>

        {/* Foot: Scope & Stack */}
        <div className="pt-4 border-t border-[#1E2333] space-y-3">
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-white font-semibold mr-2">Scope</span>
            One unsigned-image test and one benign-command test. Self-healing was verified manually, and kernel kill latency was not benchmarked.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-white font-semibold mr-1">Stack</span>
            {["k3s", "Cilium", "Tetragon", "Kyverno", "Cosign", "Argo CD"].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded text-xs font-mono bg-[#161926] text-[#E2E8F0] border border-[#262A3A]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "wifi",
    src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=800&fit=crop&q=80&auto=format",
    alt: "WiFi Network Performance Simulator real-time WLAN canvas",
    title: "WiFi Network Performance Simulator",
    subtitle:
      "An interactive WLAN simulator that shows why prioritizing real-time traffic matters during a download storm.",
    category: "Network simulation",
    year: "Interactive",
    ctaText: "Live Demo",
    ctaLink: "https://wifi-simulation.vercel.app/",
    repoLink: "https://github.com/nael0407/Wifi-Simulation",
    tags: ["JavaScript", "React 18", "Tailwind CSS", "Recharts", "Canvas", "Vercel"],
    content: () => (
      <div className="space-y-6">
        {/* The project */}
        <div className="space-y-2">
          <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-white">
            The project
          </h4>
          <p className="text-sm sm:text-[15px] text-[#94A3B8] leading-relaxed">
            A discrete-time simulation of a WLAN with six traffic classes (messaging, file transfer, web, streaming, transactions and collaboration) whose arrivals follow a non-homogeneous Poisson process. The engine is checked against queueing theory, then used to compare a Best Effort network with a GPS/WFQ scheduler, with path loss, shadow fading and Shannon-Hartley capacity bounds. It runs live in the browser.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-4 rounded-xl bg-[#161926] border border-[#262A3A] flex flex-col gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#94A3B8]">
              Collaboration throughput
            </span>
            <div className="text-2xl font-bold tracking-tight text-white font-mono">
              +299.6% <span className="text-xs font-sans font-medium text-[#94A3B8]">vs Best Effort</span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#161926] border border-[#262A3A] flex flex-col gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#94A3B8]">
              Blocking vs Erlang-B
            </span>
            <div className="text-2xl font-bold tracking-tight text-white font-mono">
              0.20% / 0.21% <span className="text-xs font-sans font-medium text-[#94A3B8]">light load</span>
            </div>
          </div>
        </div>

        {/* What it showed */}
        <div className="space-y-2.5">
          <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-white">
            What it showed
          </h4>
          <ul className="space-y-2.5 text-sm sm:text-[15px] text-[#94A3B8] leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-white select-none mt-0.5">•</span>
              <span>
                At light load (ρ = 0.59, K = 30) simulated blocking is <b className="text-white font-semibold">0.20%</b> against <b className="text-white font-semibold">0.21%</b> from Erlang-B, with <b className="text-white font-semibold">8–19%</b> deviation under overload, over 5-run Monte Carlo.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-white select-none mt-0.5">•</span>
              <span>
                In a bulk-download storm, WFQ lifts collaboration throughput by <b className="text-white font-semibold">299.6%</b> (10.12 to 40.44 Mbps) and transaction throughput by <b className="text-white font-semibold">470.7%</b> (13.99 to 79.84 Mbps) compared with Best Effort.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-white select-none mt-0.5">•</span>
              <span>
                The engine runs about <b className="text-white font-semibold">35,000 steps/sec</b> at K = 100. The React and Canvas front end renders at <b className="text-white font-semibold">60+ FPS</b> at K = 30, and the live site scores 100/100 on Lighthouse Best Practices.
              </span>
            </li>
          </ul>
        </div>

        {/* Foot: Scope & Stack */}
        <div className="pt-4 border-t border-[#1E2333] space-y-3">
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-white font-semibold mr-2">Scope</span>
            Frame rate falls to the mid-50s at higher capacities (K around 60 to 80).
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-white font-semibold mr-1">Stack</span>
            {["JavaScript", "React 18", "Tailwind CSS", "Recharts", "Canvas", "Vercel"].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded text-xs font-mono bg-[#161926] text-[#E2E8F0] border border-[#262A3A]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

export function ProjectsSection() {
  return (
    /* ─────────────────────────────────────────────────────────────
       SECTION 2: PROJECTS — DARK SECTION (Obsidian + Pure White/Grayscale ONLY)
       Latar: Obsidian pekat (#090A0F)
       Teks: Pure White (#FFFFFF / #F8FAFC) & Metallic Slate (#94A3B8)
       Aksen: Border (#1E2333 / #2A324B), 3D Coverflow Carousel with Expandable Modal
    ───────────────────────────────────────────────────────────── */
    <section id="projects" className="py-24 md:py-32 bg-[#090A0F] text-[#F8FAFC] relative overflow-hidden">
      {/* Subtle Background Radial Gradients */}
      <div
        className="pointer-events-none absolute top-1/4 -left-40 w-[600px] h-[600px] bg-white/[0.02] blur-[160px] rounded-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -right-40 w-[600px] h-[600px] bg-white/[0.02] blur-[160px] rounded-full"
        aria-hidden="true"
      />

      <HeroBackground
        variant="dots"
        color="#64748B"
        accent="#38BDF8"
        opacity={0.22}
        density={0.85}
        size={1.5}
        mask="radial"
        className="w-full h-full bg-transparent"
      >
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-[#1E2333]">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#94A3B8] mb-3">
                02 / SELECTED WORK
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#FFFFFF] uppercase">
                Selected Projects
              </h2>
            </div>
            <p className="text-sm text-[#94A3B8] max-w-md leading-relaxed">
              Four projects across reinforcement learning, network security,
              cloud-native infrastructure, and simulation. Click any card to expand deep architectural details.
            </p>
          </div>

          {/* 3D Coverflow Carousel with Expandable Modal */}
          <div className="w-full my-4">
            <CoverflowCarousel
              slides={PROJECTS_DATA}
              showCaption={true}
              showNavigation={true}
              showPagination={true}
              expandable={true}
              speed={0.34}
              cardWidth="clamp(240px, 32vw, 380px)"
              cardClassName="border border-[#1E2333] shadow-2xl hover:border-[#FFFFFF]/60 transition-all duration-300"
              className="text-[#F8FAFC]"
            />
          </div>
        </div>
      </HeroBackground>
    </section>
  );
}
