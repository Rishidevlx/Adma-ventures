import React, { useState, useEffect } from 'react';
import { Award, Heart, Shield, GraduationCap, Clock, Globe } from 'lucide-react';

export default function Footer() {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to readable local system time (e.g. HH:MM:SS AM/PM)
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-white text-left border-t-2 border-gray-200 pt-16 pb-12 relative overflow-hidden" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b-2 border-slate-900">
          
          {/* Footer Logo & Brand Block (5 cols) */}
          <div className="md:col-span-12 lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="bg-blue-700 p-2 rounded-none text-slate-950 border border-cyan-450 shadow-sm">
                <GraduationCap className="h-5 w-5 stroke-[2.5]" />
              </div>
              <span className="font-display font-black text-xl tracking-tight text-slate-900 uppercase">
                ADMA <span className="font-light text-slate-450">VENTURES</span>
              </span>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm font-light">
              ADMA Ventures is an integrated capital, advisory, and corporate education enterprise. We partner with vetted global institutions to deliver accelerated, co-branded cohort training for ambitious developers and product managers.
            </p>

            {/* Dynamic Status/Time Bar */}
            <div className="pt-2">
              <div className="inline-flex flex-wrap items-center gap-x-4 gap-y-1.5 bg-gray-50 border-2 border-gray-200 px-3.5 py-1.5 rounded-none">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-700 font-bold">
                  <Clock className="h-3.5 w-3.5 text-blue-700 stroke-[2.5]" />
                  <span>Interactive System Time:</span>
                  <span className="text-slate-900 font-black tabular-nums">{currentTime || '10:15:22'}</span>
                </div>
                <div className="hidden sm:inline-block h-3.5 w-[1px] bg-white"></div>
                <span className="text-[10px] font-mono uppercase bg-blue-700/10 text-blue-700 px-2 py-0.5 rounded-none border border-blue-700/25 font-black">
                  Intake Active 2026
                </span>
              </div>
            </div>
          </div>

          {/* Quick links Columns (7 cols total: 3 cols per nav group or similar) */}
          <div className="md:col-span-12 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Nav Column 1 */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-mono tracking-wider text-slate-600 font-extrabold pb-1 border-b border-slate-900">Core Paths</h4>
              <ul className="space-y-2 text-xs text-slate-450 font-medium">
                <li><a href="#programs" className="hover:text-blue-700 transition-colors">AI & Cognitive Systems</a></li>
                <li><a href="#programs" className="hover:text-blue-700 transition-colors">Cloud Networks & DevOps</a></li>
                <li><a href="#programs" className="hover:text-blue-700 transition-colors">Digital Leadership</a></li>
                <li><a href="#programs" className="hover:text-blue-700 transition-colors">Venture Roadmaps</a></li>
              </ul>
            </div>

            {/* Nav Column 2 */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-mono tracking-wider text-slate-600 font-extrabold pb-1 border-b border-slate-900">Ecosystem</h4>
              <ul className="space-y-2 text-xs text-slate-450 font-medium">
                <li><a href="#partners" className="hover:text-blue-700 transition-colors">Partner Universities</a></li>
                <li><a href="#partners" className="hover:text-blue-700 transition-colors">Industry Tech Alliances</a></li>
                <li><a href="#testimonials" className="hover:text-blue-700 transition-colors">Grad Success Narratives</a></li>
                <li><a href="#apply" className="hover:text-blue-700 transition-colors">Admissions Portal</a></li>
              </ul>
            </div>

            {/* Nav Column 3 */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <h4 className="text-xs uppercase font-mono tracking-wider text-slate-600 font-extrabold pb-1 border-b border-slate-900">Trust Guarantee</h4>
              <div className="space-y-3 text-xs text-slate-600 font-bold">
                <div className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-blue-700 stroke-[2]" />
                  <span className="font-semibold text-slate-700">Official Accreditation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-blue-700 stroke-[2]" />
                  <span className="font-semibold text-slate-700">Co-Branded Degrees</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Meta Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-slate-550">
          <div>
            <span className="block mb-1">© 2026 ADMA Ventures Inc. All academic curricula are co-branded by and property of their respective partner universities.</span>
            <span>Developed By <a href="https://lykspire.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-600 hover:underline transition-all font-bold">lykspire</a></span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span>Engineering Education Standards</span>
            <Globe className="h-3.5 w-3.5 text-slate-600" />
            <span>ISO Security Certified</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
