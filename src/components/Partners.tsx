import React, { useState } from 'react';
import { partners } from '../data';
import { BookOpen, GraduationCap, Globe, Cloud, Cpu, ExternalLink, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="h-6 w-6 text-cyan-400 stroke-[2.5]" />,
  BookOpen: <BookOpen className="h-6 w-6 text-cyan-400 stroke-[2.5]" />,
  Globe: <Globe className="h-6 w-6 text-cyan-400 stroke-[2.5]" />,
  Cloud: <Cloud className="h-6 w-6 text-cyan-400 stroke-[2.5]" />,
  Cpu: <Cpu className="h-6 w-6 text-cyan-400 stroke-[2.5] animate-pulse" />
};

export default function Partners() {
  const [selectedPartner, setSelectedPartner] = useState<string | null>(partners[0].id);

  const activePartner = partners.find(p => p.id === selectedPartner) || partners[0];

  return (
    <section className="py-24 bg-slate-950 text-left border-y-2 border-slate-800" id="partners">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 bg-cyan-400/10 px-3.5 py-1.5 rounded-none border-2 border-cyan-400/30">
            Our Cooperative Ecosystem
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white mt-6">
            Elite Academic Partners
          </h2>
          <p className="font-sans text-slate-400 mt-4 font-light leading-relaxed text-base">
            ADMA Ventures works hand-in-hand with leading technological universities and cloud providers. All study curricula are certified, accredited, and co-signed by our corporate network.
          </p>
        </div>

        {/* Tab-like interactive section */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Partner Selector Tiles - Left (5 Column) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs uppercase font-mono tracking-larger text-slate-500 block mb-2 font-black">
              Select Academy Collaborator
            </span>
            <div className="grid grid-cols-1 gap-3">
              {partners.map((partner) => {
                const isSelected = selectedPartner === partner.id;
                return (
                  <button
                    key={partner.id}
                    onClick={() => setSelectedPartner(partner.id)}
                    className={`flex items-center justify-between p-4 rounded-none text-left border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-400 shadow-lg translate-x-1'
                        : 'bg-slate-950 border-slate-850 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-none ${isSelected ? 'bg-cyan-400/15' : 'bg-slate-900'}`}>
                        {iconMap[partner.logoIcon] || <GraduationCap className="h-6 w-6 text-cyan-400" />}
                      </div>
                      <div>
                        <h3 className="font-display font-black uppercase text-slate-100 text-sm tracking-tight">
                          {partner.name}
                        </h3>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold bg-cyan-400/10 px-2 py-0.5 rounded-none mt-1 inline-block">
                          {partner.type}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className={`h-4 w-4 text-slate-500 transition-transform ${isSelected ? 'translate-x-1 text-cyan-400' : ''}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Partner Dynamic Explainer Panel - Right (7 Column) */}
          <div className="lg:col-span-7 bg-slate-900 border-2 border-slate-800 rounded-none p-6 sm:p-8 relative overflow-hidden transition-all duration-300">
            {/* Ambient accent light */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/5 rounded-bl-none pointer-events-none"></div>

            <div className="flex flex-col space-y-6">
              
              {/* Top Banner info */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-block text-[10px] font-mono font-black uppercase tracking-widest text-cyan-400 bg-cyan-400/15 border-2 border-cyan-400/20 px-2.5 py-1 rounded-none mb-3">
                    {activePartner.type} Collaboration Model
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                    {activePartner.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-455 mt-1 uppercase tracking-widest">
                    HQ Region: {activePartner.country}
                  </p>
                </div>
                
                <div className="bg-slate-950 border-2 border-slate-800 p-4 rounded-none font-display font-black text-2xl text-cyan-400 tracking-wider">
                  {activePartner.logoText}
                </div>
              </div>

              {/* Partnership specific custom stats */}
              <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-none border-2 border-slate-850">
                <div>
                  <p className="text-[10px] font-mono uppercase text-slate-500 font-bold">Cooperative Action</p>
                  <p className="text-sm font-black uppercase tracking-tight text-slate-100 mt-1">Dual-Signoff Credentials</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase text-slate-500 font-bold">Sandbox Labs</p>
                  <p className="text-sm font-black uppercase tracking-tight text-slate-100 mt-1">Direct Guided API Sandbox</p>
                </div>
              </div>

              {/* Core Description */}
              <div className="space-y-4">
                <h4 className="font-mono text-xs uppercase tracking-widening text-slate-455 font-black">
                  Institutional Mandate
                </h4>
                <p className="font-sans text-slate-300 text-sm leading-relaxed font-light">
                  {activePartner.description} Our training integrates their sandbox toolkits, theoretical testing blocks, and verified examination papers, meaning candidates achieve both the systemic foresight defined by ADMA Ventures and authentic technical proficiency.
                </p>
              </div>

              {/* Call out */}
              <div className="pt-6 border-t-2 border-slate-850 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 bg-cyan-400"></span>
                  <span className="text-xs font-mono text-slate-300">Curriculae Updated for 2026 Academic Slates</span>
                </div>
                <button 
                  onClick={() => {
                    const el = document.getElementById('apply');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest font-black text-cyan-400 hover:text-cyan-300 transition-all cursor-pointer"
                >
                  Inquire Academic Pathway <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Corporate Partnership Banner */}
        <div className="mt-16 bg-slate-900 border-2 border-slate-800 rounded-none p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="font-display font-black uppercase text-white tracking-tight text-lg">Corporate Sponsor & Employer Network</h4>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl font-light">
              We collaborate with regional tech groups and VC portfolio firms. Your enterprise partners review upskilled developers and project managers for direct employment contracts.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('apply');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="whitespace-nowrap px-6 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-900 rounded-none text-xs font-mono font-black uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
          >
            Become Hiring Partner
          </button>
        </div>

      </div>
    </section>
  );
}
