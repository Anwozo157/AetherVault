import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, TrendingUp, ChevronRight, ChevronLeft, Activity, Clock,
  Layers, Cpu, Database, CheckCircle2, AlertOctagon,
  ArrowRight, Users, Sparkles
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
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#00F0FF]/20 to-[#00FF9D]/20 border border-white/20 p-2 shadow-2xl mb-6">
            <img 
              src="./aethervault-logo.jpeg" 
              alt="AetherVault Logo" 
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Zero-Downtime Resilience. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#00FF9D]">
              Engineered for Enterprise.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mb-8 leading-relaxed">
            Eliminating multi-million dollar outage risks with sub-second RPO, pilot-light zero-idle cloud storage, and single-click autonomous cross-cloud failover.
          </p>

          <div className="grid grid-cols-3 gap-4 w-full text-left bg-white/[0.02] border border-white/5 rounded-2xl p-4 sm:p-6 mb-8">
            <div>
              <p className="text-[10px] font-mono uppercase text-zinc-500">Market TAM</p>
              <p className="text-xl sm:text-2xl font-bold text-white font-mono">$15.8B</p>
              <p className="text-[11px] text-[#00FF9D]">22.4% CAGR</p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase text-zinc-500">Target RPO</p>
              <p className="text-xl sm:text-2xl font-bold text-white font-mono">&lt; 0.1s</p>
              <p className="text-[11px] text-[#00F0FF]">Continuous Mirror</p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase text-zinc-500">Idle Cost</p>
              <p className="text-xl sm:text-2xl font-bold text-white font-mono">~$0.00</p>
              <p className="text-[11px] text-purple-400">Pilot-Light Arch</p>
            </div>
          </div>
        </div>
      )
    },

    // Slide 2: The Problem
    {
      id: 'problem',
      badge: 'THE ENTERPRISE CRISIS',
      title: 'The $9,000/Minute Downtime Crisis',
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
                Gartner reports the average enterprise downtime cost is <strong>$540,000 per hour</strong> ($9,000/min), risking SEC penalties, SLA fines, and brand destruction.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-red-500/10">
              <span className="text-2xl font-bold font-mono text-red-400">$783,000</span>
              <p className="text-[10px] font-mono text-zinc-500">Avg Outage Incident Cost</p>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Wasteful Standby Costs</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Traditional "Hot Standby" architectures force enterprises to duplicate 100% of their idle compute infrastructure, burning tens of thousands per month on unused servers.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10">
              <span className="text-2xl font-bold font-mono text-amber-300">60% Waste</span>
              <p className="text-[10px] font-mono text-zinc-500">Unused Idle Compute Spend</p>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Human Error in Outages</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                74% of disaster recovery failures stem from manual runbooks, DNS misconfigurations, and panicking SRE teams during live cutovers.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10">
              <span className="text-2xl font-bold font-mono text-[#00F0FF]">74% Failure</span>
              <p className="text-[10px] font-mono text-zinc-500">Caused by Manual Runbooks</p>
            </div>
          </div>
        </div>
      )
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
              <div className="w-10 h-10 rounded-lg bg-[#00FF9D]/10 flex items-center justify-center text-[#00FF9D] shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Continuous Sub-Second Replication</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Block-level journal mirroring (AWS DRS integration) captures delta changes continuously with RPO under 0.1s and zero compute running costs.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#00F0FF]/10 flex items-center justify-center text-[#00F0FF] shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Dynamic Multi-Cloud Hydration</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Failover seamlessly across clouds: route from primary nodes to GCP us-central1, AWS us-west-2, or Azure East US 2 on demand.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Apple-Grade Command Center HUD</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Three.js 3D global telemetry, procedural audio feedback, and accidental-click prevention provide C-suite confidence during live incidents.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#0B0F17] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00F0FF]/20 to-[#00FF9D]/20 border border-[#00FF9D]/30 flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-[#00FF9D]" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Live Demo Available Now</h4>
            <p className="text-xs text-zinc-400 mb-6">
              You can test the actual live engine on this device or any phone right now.
            </p>
            <button
              onClick={onLaunchDemo}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#00FF9D] text-black font-mono font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <span>Launch Live Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )
    },

    // Slide 4: Market Opportunity
    {
      id: 'market',
      badge: 'MARKET SIZE & TIMING',
      title: 'A $15.8B High-Growth Market',
      subtitle: 'Explosive cloud migration and tightening compliance standards are forcing modernization.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto my-auto">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-center flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono uppercase text-[#00F0FF] tracking-widest mb-1">Total Addressable</p>
              <h3 className="text-4xl font-extrabold font-mono text-white mb-2">$15.8B</h3>
              <p className="text-xs text-zinc-400">
                Global Cloud Disaster Recovery & High-Availability Market by 2028.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-zinc-500">
              22.4% Annual CAGR (MarketsandMarkets)
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-center flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono uppercase text-[#00FF9D] tracking-widest mb-1">Serviceable Addressable</p>
              <h3 className="text-4xl font-extrabold font-mono text-white mb-2">$4.2B</h3>
              <p className="text-xs text-zinc-400">
                Mid-market and Enterprise companies with strict multi-cloud compliance mandates (Fintech, Healthtech, Carrier Telecom).
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-zinc-500">
              High-margin enterprise SaaS contracts
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-center flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono uppercase text-purple-400 tracking-widest mb-1">Target Initial SOM</p>
              <h3 className="text-4xl font-extrabold font-mono text-white mb-2">$120M</h3>
              <p className="text-xs text-zinc-400">
                Initial wedge targeting cloud-native AWS & GCP enterprises seeking automated DR without costly secondary cold clusters.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-zinc-500">
              1,500 enterprise accounts @ $80k ARR
            </div>
          </div>
        </div>
      )
    },

    // Slide 5: Business Model
    {
      id: 'business-model',
      badge: 'COMMERCIAL STRATEGY',
      title: 'Predictable Enterprise SaaS + Usage',
      subtitle: 'Clear, high-margin unit economics aligned with customer savings.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto my-auto">
          {/* Foundation Tier */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400">STANDARD</span>
              <h3 className="text-xl font-bold text-white mt-2 mb-1">Foundation</h3>
              <p className="text-2xl font-mono font-bold text-[#00F0FF] mb-4">$2,500 <span className="text-xs font-normal text-zinc-500">/ mo</span></p>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00FF9D]" /> Up to 25 Protected Workloads</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00FF9D]" /> AWS DRS Staging Integration</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00FF9D]" /> 3D HUD & Mobile Controls</li>
              </ul>
            </div>
            <p className="text-[10px] font-mono text-zinc-500 mt-6 pt-3 border-t border-white/5">Target: Mid-Market SaaS</p>
          </div>

          {/* Enterprise Pro Tier */}
          <div className="bg-gradient-to-b from-[#00F0FF]/10 to-transparent border border-[#00F0FF]/30 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative">
            <span className="absolute -top-3 right-6 bg-[#00F0FF] text-black text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full">
              CORE PRODUCT
            </span>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00F0FF]/10 text-[#00F0FF]">RECOMMENDED</span>
              <h3 className="text-xl font-bold text-white mt-2 mb-1">Enterprise Pro</h3>
              <p className="text-2xl font-mono font-bold text-white mb-4">$7,500 <span className="text-xs font-normal text-zinc-500">/ mo</span></p>
              <ul className="space-y-2 text-xs text-zinc-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00FF9D]" /> Unlimited Workloads & Volumes</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00FF9D]" /> Multi-Cloud Routing (AWS/GCP/Azure)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00FF9D]" /> eBPF Real-Time Chaos Testing</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00FF9D]" /> 99.999% Failover RTO Guarantee</li>
              </ul>
            </div>
            <p className="text-[10px] font-mono text-zinc-400 mt-6 pt-3 border-t border-white/10">Target: Series B+ to Fortune 500</p>
          </div>

          {/* Sovereign Tier */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300">CUSTOM</span>
              <h3 className="text-xl font-bold text-white mt-2 mb-1">Sovereign Cloud</h3>
              <p className="text-2xl font-mono font-bold text-purple-300 mb-4">$25,000+ <span className="text-xs font-normal text-zinc-500">/ mo</span></p>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00FF9D]" /> Dedicated VPC & Air-Gapped Nodes</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00FF9D]" /> mmWave / Carrier Direct Connect</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00FF9D]" /> Custom On-Premises BGP Peering</li>
              </ul>
            </div>
            <p className="text-[10px] font-mono text-zinc-500 mt-6 pt-3 border-t border-white/5">Target: Telcos, Defense, Banks</p>
          </div>
        </div>
      )
    },

    // Slide 6: Founder & Execution Edge
    {
      id: 'leadership',
      badge: 'FOUNDING LEADERSHIP',
      title: 'Infrastructure & Carrier Engineering DNA',
      subtitle: 'Built by engineers who have deployed mission-critical backhaul links under the highest pressure.',
      content: (
        <div className="max-w-3xl mx-auto my-auto bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#00F0FF]/30 to-[#00FF9D]/30 border border-white/20 flex items-center justify-center text-2xl font-bold font-mono text-white shrink-0">
              AN
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold text-white">Antonio Nwozo</h3>
              <p className="text-sm font-mono text-[#00F0FF]">Founder & Lead Cloud Architect • Aegis Core Labs</p>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Carrier-grade telecommunications and enterprise cloud engineer with extensive real-world experience designing mission-critical connectivity for the <strong>2025 Presidential Inauguration</strong>, multi-gigabit mmWave wireless backhauls, and enterprise data lake architectures.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-white/5 pt-4 text-left">
            <div className="bg-black/40 p-3 rounded-xl border border-white/5">
              <p className="text-[10px] font-mono text-zinc-500">Core Expertise</p>
              <p className="text-xs font-semibold text-white mt-0.5">Carrier mmWave & BGP</p>
            </div>
            <div className="bg-black/40 p-3 rounded-xl border border-white/5">
              <p className="text-[10px] font-mono text-zinc-500">Cloud Specialization</p>
              <p className="text-xs font-semibold text-white mt-0.5">AWS DRS & Multi-Region</p>
            </div>
            <div className="bg-black/40 p-3 rounded-xl border border-white/5">
              <p className="text-[10px] font-mono text-zinc-500">Design Philosophy</p>
              <p className="text-xs font-semibold text-white mt-0.5">Zero-Idle Pilot Light</p>
            </div>
          </div>
        </div>
      )
    },

    // Slide 7: Roadmap & Next Steps
    {
      id: 'roadmap',
      badge: 'ROADMAP & EXECUTION',
      title: 'Milestones & Investment Horizon',
      subtitle: 'Clear technical milestones executing across 2026.',
      content: (
        <div className="max-w-4xl mx-auto my-auto flex flex-col justify-between">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/[0.02] border border-[#00FF9D]/30 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-[#00FF9D] font-bold">PHASE 1 • COMPLETE</span>
                <CheckCircle2 className="w-4 h-4 text-[#00FF9D]" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Interactive 3D HUD</h4>
              <p className="text-[11px] text-zinc-400">
                Three.js orbital globe, procedural audio synthesizer, and zero-cost GitHub Pages mobile deployment.
              </p>
            </div>

            <div className="bg-white/[0.02] border border-[#00F0FF]/30 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-[#00F0FF] font-bold">PHASE 2 • CURRENT</span>
                <Activity className="w-4 h-4 text-[#00F0FF]" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">AWS DRS Telemetry</h4>
              <p className="text-[11px] text-zinc-400">
                CloudWatch synthetic canary monitoring, EBS block replication matrix, and live audit event log streaming.
              </p>
            </div>

            <div className="bg-white/[0.02] border border-white/10 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-zinc-400 font-bold">PHASE 3 • Q3 2026</span>
                <Clock className="w-4 h-4 text-zinc-500" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Design Partner Pilots</h4>
              <p className="text-[11px] text-zinc-400">
                Deployment with 3 anchor fintech/carrier design partners under pilot SLAs and AWS Marketplace listing.
              </p>
            </div>

            <div className="bg-white/[0.02] border border-white/10 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-purple-400 font-bold">PHASE 4 • Q4 2026</span>
                <TrendingUp className="w-4 h-4 text-purple-400" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Pre-Seed / Seed Round</h4>
              <p className="text-[11px] text-zinc-400">
                Institutional seed financing to expand core engineering, enterprise sales, and multi-cloud certifications.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={onLaunchDemo}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#00FF9D] text-black font-mono font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(0,240,255,0.3)] inline-flex items-center gap-2"
            >
              <span>Test Live 3D Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )
    }
  ];

  const current = slides[currentSlide];

  return (
    <div className="w-full max-w-5xl flex flex-col flex-grow justify-between py-2 sm:py-6 relative z-10">
      {/* Slide Header Indicator */}
      <div className="w-full flex items-center justify-between mb-4 border-b border-white/5 pb-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20">
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
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-zinc-300 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1))}
            disabled={currentSlide === slides.length - 1}
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
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{current.title}</h2>
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
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === currentSlide 
                ? 'w-8 bg-gradient-to-r from-[#00F0FF] to-[#00FF9D]' 
                : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
