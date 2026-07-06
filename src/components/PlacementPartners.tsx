import React from 'react';

interface PlacementPartnersProps {
  variant?: 'marquee' | 'list';
}

const partners = [
  "Coindsyz", "BOSCH", "ALLSEC TECH", "AVASOFT", "WNS", "TCS", "HCL", "DCUBE", 
  "TECH MAHINDRA", "CTS", "WIPRO", "INFOSYS", "HEXAWARE", "SHLOKLABS", "PLINTRON", 
  "LINKEDIN", "WESTERN DIGITAL", "JANES", "ORACLE", "CAPGEMINI", "INSIGHT SOFTWARE", 
  "ICICI", "KGISL", "RND Soft", "Global logic", "Nielsen IQ"
];

export default function PlacementPartners({ variant = 'marquee' }: PlacementPartnersProps) {
  if (variant === 'marquee') {
    return (
      <div className="bg-slate-950 border-y-2 border-slate-900 py-6 overflow-hidden flex flex-col relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-4 text-center">
          <h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tighter text-white">
            Companies of Choice
          </h3>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee flex whitespace-nowrap items-center group-hover:[animation-play-state:paused]">
            {[...partners, ...partners].map((partner, index) => (
              <span 
                key={index} 
                className="mx-6 text-xl md:text-2xl font-display font-black text-slate-600 uppercase tracking-tighter hover:text-white transition-colors duration-300"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // List variant
  return (
    <div className="bg-slate-900 py-16 border-t-2 border-slate-800" id="placement-partners">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-extrabold bg-cyan-400/10 px-3.5 py-1.5 rounded-none border-2 border-cyan-400/30 mb-6 inline-block">
         Companies of Choice
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white mt-4 mb-10">
          Our Hiring Network
        </h2>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="bg-slate-950 border border-slate-800 px-4 py-2 hover:border-cyan-400 hover:bg-slate-900 transition-all cursor-default shadow-sm"
            >
              <span className="font-sans font-bold text-slate-300 text-sm md:text-base tracking-wide uppercase">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
