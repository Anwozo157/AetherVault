import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  TrendingUp,
  ChevronRight,
  ChevronLeft,
  Activity,
  Clock,
  Layers,
  Cpu,
  Database,
  CheckCircle2,
  AlertOctagon,
  ArrowRight,
  Users,
  Sparkles,
} from 'lucide-react';

interface InvestorPitchDeckProps {
  onLaunchDemo: () => void;
}

export default function InvestorPitchDeck({ onLaunchDemo }: InvestorPitchDeckProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Cover / Vision
    {
      id: 'vision',
      badge: 'AEGIS CORE LABS • INVESTOR BRIEFING',
      title: 'AetherVault',
      subtitle: 'The Next-Generation Autonomous Multi-Cloud Disaster Recovery Engine',
      content: (
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-aether-cyan/20 to-aether-green/20 border border-white/20 p-2 shadow-2xl mb-6">
            <img
              src="./aethervault-logo.jpeg"
              alt="AetherVault Logo"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Near-Zero-Downtime Resilience. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-aether-cyan to-aether-green">
              Engineered for Enterprise.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mb-8 leading-relaxed">
            Built to cut multi-million-dollar outage risk, targeting an RPO measured in seconds,
            low-cost pilot-light standby, and one-click cross-cloud failover.
          </p>

          <div className="grid grid-cols-3 gap-4 w-full text-left bg-white/[0.02] border border-white/5 rounded-2xl p-4 sm:p-6 mb-8">
            <div>
              <p className="text-[10px] font-mono uppercase text-zinc-500">Market TAM</p>
              <p className="text-xl sm:text-2xl font-bold text-white font-mono">$16.1B</p>
              <p className="text-[11px] text-aether-green">16.2% CAGR to 2032</p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase text-zinc-500">Target RPO</p>
              <p className="text-xl sm:text-2xl font-bold text-white font-mono">Seconds</p>
              <p className="text-[11px] text-aether-cyan">Continuous Mirror</p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase text-zinc-500">Idle Cost</p>
              <p className="text-xl sm:text-2xl font-bold text-white font-mono">Storage-only</p>
              <p className="text-[11px] text-purple-400">Pilot-Light Arch</p>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 2: The Problem
    {
      id: 'problem',
      badge: 'THE ENTERPRISE CRISIS',
      title: 'The $14,000/Minute Downtime Crisis',
      subtitle: 'Legacy Disaster Recovery is slow, expensive, and fails when needed most.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto my-auto">
          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-4">
                <AlertOctagon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Astronomical Losses</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                EMA's 2024 field research (415 IT leaders) puts the average cost of unplanned IT
                downtime at <strong>$14,056 per minute</strong>. ITIC's 2024 survey of 1,000+ firms
                found one hour costs over $300,000 for more than 90% of mid-size and large
                enterprises.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-red-500/10">
              <span className="text-2xl font-bold font-mono text-red-400">$14,056/min</span>
              <p className="text-[10px] font-mono text-zinc-500">
                Avg Unplanned Downtime (EMA 2024)
              </p>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Wasteful Standby Costs</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Traditional "Hot Standby" architectures force enterprises to duplicate 100% of their
                idle compute infrastructure, paying for servers that sit unused until disaster
                strikes. Flexera's 2026 survey finds organizations estimate 29% of their cloud spend
                is wasted.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10">
              <span className="text-2xl font-bold font-mono text-amber-300">29%</span>
              <p className="text-[10px] font-mono text-zinc-500">
                Of Cloud Spend Wasted (Flexera 2026)
              </p>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Human Error in Outages</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Uptime Institute's 2025 outage analysis found 85% of human-error outages stem from
                procedures not being followed or being flawed: exactly where manual runbooks break
                down under pressure.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10">
              <span className="text-2xl font-bold font-mono text-aether-cyan">85%</span>
              <p className="text-[10px] font-mono text-zinc-500">
                Human-Error Outages Tied to Procedures (Uptime 2025)
              </p>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 3: The Solution
    {
      id: 'solution',
      badge: 'THE AETHERVAULT PARADIGM',
      title: 'Autonomous Multi-Cloud Resilience',
      subtitle: 'Combining zero-idle storage economics with one-click failover certainty.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto my-auto items-center">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-aether-green/10 flex items-center justify-center text-aether-green shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Continuous Block-Level Replication</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Planned AWS Elastic Disaster Recovery integration: continuous block-level
                  replication with a target RPO of seconds and minimal standby compute.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-aether-cyan/10 flex items-center justify-center text-aether-cyan shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Dynamic Multi-Cloud Hydration</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Designed for failover across clouds: route from primary nodes to GCP us-central1,
                  AWS us-west-2, or Azure East US 2. The demo shows the simulated flow.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Consumer-Grade Command Center HUD</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Three.js 3D global telemetry, procedural audio feedback, and accidental-click
                  prevention provide C-suite confidence during live incidents.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-aether-panel border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-aether-cyan/20 to-aether-green/20 border border-aether-green/30 flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-aether-green" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Interactive Demo Available Now</h4>
            <p className="text-xs text-zinc-400 mb-6">
              Try the interactive demo (simulated data) on this device or any phone right now.
            </p>
            <button
              onClick={onLaunchDemo}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-aether-cyan to-aether-green text-black font-mono font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <span>Launch Interactive Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ),
    },

    // Slide 4: Market Opportunity
    {
      id: 'market',
      badge: 'MARKET SIZE & TIMING',
      title: 'A $16B Market Growing to $46B',
      subtitle:
        'Explosive cloud migration and tightening compliance standards are forcing modernization.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto my-auto">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-center flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono uppercase text-aether-cyan tracking-widest mb-1">
                Total Addressable
              </p>
              <h3 className="text-4xl font-extrabold font-mono text-white mb-2">$16.1B</h3>
              <p className="text-xs text-zinc-400">
                Global Disaster Recovery as a Service (DRaaS) market in 2025, projected to reach
                $46.1B by 2032.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-zinc-500">
              16.2% CAGR 2025–2032 (MarketsandMarkets, Jan 2026)
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-center flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono uppercase text-aether-green tracking-widest mb-1">
                Serviceable Addressable
              </p>
              <h3 className="text-4xl font-extrabold font-mono text-white mb-2">$4.2B</h3>
              <p className="text-xs text-zinc-400">
                Mid-market and Enterprise companies with strict multi-cloud compliance mandates
                (Fintech, Healthtech, Carrier Telecom). Internal estimate.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-zinc-500">
              High-margin enterprise SaaS contracts
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-center flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono uppercase text-purple-400 tracking-widest mb-1">
                Target Initial SOM
              </p>
              <h3 className="text-4xl font-extrabold font-mono text-white mb-2">$120M</h3>
              <p className="text-xs text-zinc-400">
                Initial wedge targeting cloud-native AWS & GCP enterprises seeking automated DR
                without costly secondary cold clusters.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-zinc-500">
              Assumption: 1,500 accounts × $80k ARR
            </div>
          </div>
        </div>
      ),
    },

    // Slide 5: Business Model
    {
      id: 'business-model',
      badge: 'COMMERCIAL STRATEGY',
      title: 'Predictable Enterprise SaaS + Usage',
      subtitle: 'Proposed pricing and packaging. Features marked roadmap are not yet built.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto my-auto">
          {/* Foundation Tier */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                STANDARD
              </span>
              <h3 className="text-xl font-bold text-white mt-2 mb-1">Foundation</h3>
              <p className="text-2xl font-mono font-bold text-aether-cyan mb-4">
                $2,500 <span className="text-xs font-normal text-zinc-500">/ mo</span>
              </p>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-aether-green" /> Up to 25 Protected
                  Workloads
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-aether-green" /> AWS DRS Staging
                  Integration (roadmap)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-aether-green" /> 3D HUD & Mobile
                  Controls
                </li>
              </ul>
            </div>
            <p className="text-[10px] font-mono text-zinc-500 mt-6 pt-3 border-t border-white/5">
              Target: Mid-Market SaaS
            </p>
          </div>

          {/* Enterprise Pro Tier */}
          <div className="bg-gradient-to-b from-aether-cyan/10 to-transparent border border-aether-cyan/30 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative">
            <span className="absolute -top-3 right-6 bg-aether-cyan text-black text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full">
              CORE PRODUCT
            </span>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-aether-cyan/10 text-aether-cyan">
                RECOMMENDED
              </span>
              <h3 className="text-xl font-bold text-white mt-2 mb-1">Enterprise Pro</h3>
              <p className="text-2xl font-mono font-bold text-white mb-4">
                $7,500 <span className="text-xs font-normal text-zinc-500">/ mo</span>
              </p>
              <ul className="space-y-2 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-aether-green" /> Unlimited Workloads &
                  Volumes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-aether-green" /> Multi-Cloud Routing
                  (AWS/GCP/Azure, roadmap)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-aether-green" /> Chaos Testing (roadmap)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-aether-green" /> Contractual RTO SLA
                </li>
              </ul>
            </div>
            <p className="text-[10px] font-mono text-zinc-400 mt-6 pt-3 border-t border-white/10">
              Target: Series B+ to Fortune 500
            </p>
          </div>

          {/* Sovereign Tier */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300">
                CUSTOM
              </span>
              <h3 className="text-xl font-bold text-white mt-2 mb-1">Sovereign Cloud</h3>
              <p className="text-2xl font-mono font-bold text-purple-300 mb-4">
                $25,000+ <span className="text-xs font-normal text-zinc-500">/ mo</span>
              </p>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-aether-green" /> Dedicated VPC &
                  Air-Gapped Nodes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-aether-green" /> mmWave / Carrier Direct
                  Connect (roadmap)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-aether-green" /> Custom On-Premises BGP
                  Peering (roadmap)
                </li>
              </ul>
            </div>
            <p className="text-[10px] font-mono text-zinc-500 mt-6 pt-3 border-t border-white/5">
              Target: Telcos, Defense, Banks
            </p>
          </div>
        </div>
      ),
    },

    // Slide 6: Founder & Execution Edge
    {
      id: 'leadership',
      badge: 'FOUNDING LEADERSHIP',
      title: 'Network Infrastructure Engineering DNA',
      subtitle:
        'Built by an engineer who has deployed mission-critical backhaul links under the highest pressure.',
      content: (
        <div className="max-w-3xl mx-auto my-auto bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-aether-cyan/30 to-aether-green/30 border border-white/20 flex items-center justify-center text-2xl font-bold font-mono text-white shrink-0">
              AN
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold text-white">Antonio Nwozo</h3>
              <p className="text-sm font-mono text-aether-cyan">
                Founder & Lead Cloud Architect • Aegis Core Labs
              </p>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                RF and wireless network engineer with 100+ end-to-end high-capacity deployments.
                Delivered broadcast connectivity for the{' '}
                <strong>2025 Presidential Inauguration</strong> (Associated Press, Telemundo and
                other global networks), multi-link 10 Gb networks for UFC 250 at the White House,
                and a 6-mile, ~4 Gbps wireless backhaul between Virginia and DC. Now applying Linux,
                AWS, Terraform and Kubernetes to cloud resilience.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-white/5 pt-4 text-left">
            <div className="bg-black/40 p-3 rounded-xl border border-white/5">
              <p className="text-[10px] font-mono text-zinc-500">Core Expertise</p>
              <p className="text-xs font-semibold text-white mt-0.5">DevOps Engineer</p>
            </div>
            <div className="bg-black/40 p-3 rounded-xl border border-white/5">
              <p className="text-[10px] font-mono text-zinc-500">Track Record</p>
              <p className="text-xs font-semibold text-white mt-0.5">100+ High-Capacity Links</p>
            </div>
            <div className="bg-black/40 p-3 rounded-xl border border-white/5">
              <p className="text-[10px] font-mono text-zinc-500">Cloud & Automation</p>
              <p className="text-xs font-semibold text-white mt-0.5">
                AWS • Terraform • Kubernetes
              </p>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 7: Roadmap & Next Steps
    {
      id: 'roadmap',
      badge: 'ROADMAP & EXECUTION',
      title: 'Milestones & Investment Horizon',
      subtitle: 'Clear technical milestones from prototype to pilot.',
      content: (
        <div className="max-w-4xl mx-auto my-auto flex flex-col justify-between">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/[0.02] border border-aether-green/30 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-aether-green font-bold">
                  PHASE 1 • COMPLETE
                </span>
                <CheckCircle2 className="w-4 h-4 text-aether-green" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Interactive 3D HUD</h4>
              <p className="text-[11px] text-zinc-400">
                Three.js orbital globe, procedural audio synthesizer, and zero-cost GitHub Pages
                mobile deployment.
              </p>
            </div>

            <div className="bg-white/[0.02] border border-aether-cyan/30 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-aether-cyan font-bold">
                  PHASE 2 • COMPLETE
                </span>
                <Activity className="w-4 h-4 text-aether-cyan" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Simulated DR Telemetry</h4>
              <p className="text-[11px] text-zinc-400">
                Simulated AWS DRS and CloudWatch-style dashboard, block replication matrix, audit
                log stream, and abortable failover workflow.
              </p>
            </div>

            <div className="bg-white/[0.02] border border-white/10 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-zinc-400 font-bold">
                  PHASE 3 • TARGET MARCH 2027
                </span>
                <Clock className="w-4 h-4 text-zinc-500" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Design Partner Pilots</h4>
              <p className="text-[11px] text-zinc-400">
                Recruiting 3 anchor fintech/carrier design partners; live AWS Elastic Disaster
                Recovery integration for pilots, then AWS Marketplace listing.
              </p>
            </div>

            <div className="bg-white/[0.02] border border-white/10 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-purple-400 font-bold">
                  PHASE 4 • [date TBD]
                </span>
                <TrendingUp className="w-4 h-4 text-purple-400" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Pre-Seed / Seed Round</h4>
              <p className="text-[11px] text-zinc-400">
                Institutional seed financing to expand core engineering, enterprise sales, and
                multi-cloud certifications.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={onLaunchDemo}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-aether-cyan to-aether-green text-black font-mono font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(0,240,255,0.3)] inline-flex items-center gap-2"
            >
              <span>Test Live 3D Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ),
    },
  ];

  const current = slides[currentSlide];

  return (
    <div className="w-full max-w-5xl flex flex-col flex-grow justify-between py-2 sm:py-6 relative z-10">
      {/* Slide Header Indicator */}
      <div className="w-full flex items-center justify-between mb-4 border-b border-white/5 pb-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-aether-cyan/10 text-aether-cyan border border-aether-cyan/20">
            {current.badge}
          </span>
          <span className="text-xs font-mono text-zinc-500">
            Slide {currentSlide + 1} of {slides.length}
          </span>
        </div>

        {/* Slide Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
            disabled={currentSlide === 0}
            aria-label="Previous slide"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-zinc-300 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1))}
            disabled={currentSlide === slides.length - 1}
            aria-label="Next slide"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-zinc-300 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide Body */}
      <div className="flex-grow flex flex-col justify-center min-h-[460px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col justify-center"
          >
            {/* Title & Subtitle */}
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {current.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">{current.subtitle}</p>
            </div>

            {/* Slide Interactive Content */}
            {current.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Footer Stepper */}
      <div className="w-full flex items-center justify-center gap-2 mt-6 pt-4 border-t border-white/5">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === currentSlide
                ? 'w-8 bg-gradient-to-r from-aether-cyan to-aether-green'
                : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
