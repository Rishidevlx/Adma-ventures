import React from 'react';
import { testimonials } from '../data';
import { Quote, Sparkles, ArrowRight, Star } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-900 border-t-2 border-slate-800 text-left" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-extrabold bg-cyan-400/10 px-3.5 py-1.5 rounded-none border-2 border-cyan-400/30">
            Student Outcomes
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white mt-6">
            Transformative Career Trajectories
          </h2>
          <p className="font-sans text-slate-400 mt-4 text-base font-light leading-relaxed">
            Real graduates who bridged their capabilities gaps via ADMA Ventures networks. Read how our collaborative bootcamps and sandbox architectures empowered their professional pivots.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-slate-950 border-2 border-slate-850 rounded-none p-6 sm:p-8 flex flex-col justify-between hover:border-cyan-400 transition-all group relative overflow-hidden"
            >
              {/* Quote icon watermark */}
              <Quote className="absolute top-6 right-6 h-12 w-12 text-slate-800/10 group-hover:text-cyan-400/5 transition-colors" />

              <div className="space-y-4">
                {/* Visual Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-cyan-400 text-cyan-400" />
                  ))}
                </div>

                {/* Main Quote story text */}
                <p className="font-sans text-sm text-slate-300 leading-relaxed font-light italic">
                  "{t.story}"
                </p>
              </div>

              {/* Author Info footer */}
              <div className="mt-8 pt-6 border-t-2 border-slate-900 flex items-center gap-4">
                {/* Custom Avatar container */}
                <div className={`h-11 w-11 rounded-none ${t.avatarBg} text-slate-950 font-display font-black text-sm flex items-center justify-center shrink-0 shadow-md`}>
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>

                <div className="text-left select-none">
                  <h4 className="font-display font-black uppercase text-sm text-white tracking-tight">{t.name}</h4>
                  <p className="text-xs text-slate-400 font-light truncate max-w-[160px]">{t.role} at <span className="text-cyan-400 font-bold">{t.company}</span></p>
                  
                  {/* Reskilling career transition delta */}
                  <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono text-slate-550 font-bold">
                    <span className="line-through">{t.prevRole}</span>
                    <ArrowRight className="h-2.5 w-2.5 text-cyan-400 stroke-[2.5]" />
                    <span className="text-slate-350 font-black uppercase text-[9px] bg-slate-900 px-1 py-0.5 border border-slate-850">{t.role.split(' ')[1] || t.role}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Outcomes Summary Call-Out */}
        <div className="mt-16 bg-slate-950 border-2 border-slate-855 rounded-none p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-left space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 bg-cyan-400"></span>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-black">Cohorts Open: Summer 2026</span>
            </div>
            <h3 className="font-display font-black uppercase text-white tracking-tight text-xl sm:text-2xl">Are you ready to write your own pivot narrative?</h3>
            <p className="text-xs sm:text-sm text-slate-400 font-light max-w-2xl leading-relaxed">
              Our partner networks co-designed specifically for beginners looking to reskill are reserving applications for next quarter's educational batches. Secure your space with an advisory session.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('apply');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="whitespace-nowrap bg-cyan-400 hover:bg-cyan-300 text-slate-955 font-mono font-black text-xs uppercase tracking-wider py-4 px-8 rounded-none transition-all shrink-0 cursor-pointer"
          >
            Initiate My Transition
          </button>
        </div>

      </div>
    </section>
  );
}
