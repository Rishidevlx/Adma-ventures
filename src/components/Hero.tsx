import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Trophy, Sparkles, ShieldCheck, GraduationCap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 bg-slate-900 border-b border-slate-800 overflow-hidden" id="hero">
      {/* Visual background atmospheric lights */}
      <div className="absolute top-0 left-1/4 w-[45rem] h-[35rem] bg-cyan-400/5 rounded-full blur-[140px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-10 right-10 w-[35rem] h-[35rem] bg-slate-850/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content Column */}
          <div className="lg:col-span-8 flex flex-col space-y-6 text-left">
            
            {/* Tag/Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-slate-950 border-2 border-slate-850 rounded-none py-1.5 px-3.5 w-fit"
            >
              <span className="flex h-2 w-2 rounded-none bg-cyan-400"></span>
              <span className="font-mono text-xs text-slate-300 uppercase tracking-widest font-black">
                Reskilling & Upskilling Initiative 2026
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-[56px] sm:text-[90px] md:text-[110px] lg:text-[120px] leading-[0.85] font-black uppercase tracking-tighter text-white"
              id="hero-headline"
            >
              RE-SKILL.<br />
              <span className="text-cyan-400">
                UP-SKILL.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed font-light mt-4"
              id="hero-lead"
            >
              <strong>ADMA Ventures Academy</strong> connects elite professionals with renowned global academic institutions to bridge the talent gap through intensive, outcome-driven training frameworks.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
              id="hero-actions"
            >
              <a
                href="#programs"
                className="px-8 py-4 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-display font-black text-lg uppercase tracking-tight transition-all flex items-center gap-2 rounded-none"
              >
                Enroll Today <ArrowRight className="h-5 w-5 stroke-[3]" />
              </a>
              <a
                href="#apply"
                className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-slate-950 font-display font-black text-lg uppercase tracking-tight transition-all flex items-center gap-2 rounded-none"
              >
                Partner With Us
              </a>
            </motion.div>

            {/* Institutional Endorsement Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="pt-8 border-t border-slate-800/80 flex items-center gap-4 text-xs font-mono text-slate-400 text-left"
            >
              <span className="uppercase tracking-widest text-cyan-400 font-black">CO-DEVELOPED BY:</span>
              <div className="flex flex-wrap gap-x-4 gap-y-1 items-center opacity-80">
                <span>AWS Academy</span>
                <span className="text-slate-700 font-bold">•</span>
                <span>Stanford Collaborations</span>
                <span className="text-slate-705 font-bold">•</span>
                <span>Munich Tech</span>
              </div>
            </motion.div>

          </div>

          {/* Hero Right Visuals Column with high contrast info boxes */}
          <div className="lg:col-span-4 relative">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-8 pb-4 border-l-2 border-slate-800 pl-8 text-left"
              id="hero-stats-card"
            >
              <div>
                <span className="block text-cyan-400 font-mono text-xs mb-1.5 uppercase tracking-widest font-black">Status</span>
                <span className="text-3xl font-display font-black text-white uppercase tracking-tighter">Active Admissions</span>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed font-light">
                  Cohort 24B starts next academic slate. Select seats allocated for regional corporate sponsors.
                </p>
              </div>

              <div>
                <span className="block text-cyan-400 font-mono text-xs mb-1.5 uppercase tracking-widest font-black">Network Horizon</span>
                <span className="text-3xl font-display font-black text-white uppercase tracking-tighter">5k Graduates</span>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed font-light">
                  Direct connection loops to high-paying venture jobs in engineering, AI orchestrations, and cloud architecture.
                </p>
              </div>

              <div>
                <span className="block text-cyan-400 font-mono text-xs mb-1.5 uppercase tracking-widest font-black">Co-Accreditation</span>
                <span className="text-3xl font-display font-black text-white uppercase tracking-tighter">Certified Sandbox</span>
                <p className="text-slate-400 text-xs mt-2 leading-normal font-mono font-bold text-slate-500 uppercase">
                  Dual Degree Verification standard ISO-ADM-2026
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
