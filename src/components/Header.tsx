import React, { useState, useEffect } from 'react';
import { Award, Menu, X, ArrowUpRight, GraduationCap } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/95 border-b border-slate-800 shadow-xl'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group" id="brand-logo">
            <div className="bg-cyan-400 p-2 rounded-sm text-slate-900 shadow-md group-hover:scale-105 transition-transform">
              <GraduationCap className="h-6 w-6 stroke-[3]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-2xl tracking-tighter text-white group-hover:text-cyan-400 transition-colors">
                ADMA <span className="text-cyan-400 font-light">VENTURES</span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-400 -mt-1 font-black">
                Academy & Upskilling
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" id="desktop-nav">
            <a
              href="#partners"
              className="font-sans text-xs font-black uppercase tracking-widest text-slate-300 hover:text-cyan-400 transition-colors"
            >
              Academic Partners
            </a>
            <a
              href="#programs"
              className="font-sans text-xs font-black uppercase tracking-widest text-slate-300 hover:text-cyan-400 transition-colors"
            >
              Learning Tracks
            </a>
            <a
              href="#quiz"
              className="font-sans text-xs font-black uppercase tracking-widest text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              Career Matcher
              <span className="bg-cyan-400/10 text-cyan-400 text-[9px] px-1.5 py-0.5 rounded-sm uppercase font-mono font-black border border-cyan-400/30">
                Quiz
              </span>
            </a>
            <a
              href="#testimonials"
              className="font-sans text-xs font-black uppercase tracking-widest text-slate-300 hover:text-cyan-400 transition-colors"
            >
              Stories
            </a>
            <a
              href="#faq"
              className="font-sans text-xs font-black uppercase tracking-widest text-slate-300 hover:text-cyan-400 transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* Header Action */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#apply"
              className="bg-transparent hover:bg-slate-800 text-white font-sans text-xs uppercase tracking-wider font-extrabold py-3 px-5 rounded-none transition-colors border-2 border-slate-700 hover:border-slate-500 flex items-center gap-1"
              id="header-secondary-btn"
            >
              Partner Inquiry
            </a>
            <a
              href="#apply"
              className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-sans text-xs uppercase tracking-wider font-black py-3 px-6 rounded-none shadow-md hover:shadow-cyan-400/20 active:scale-[0.98] transition-all flex items-center gap-1"
              id="header-primary-btn"
            >
              Apply Program <ArrowUpRight className="h-4 w-4 stroke-[3]" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-400 hover:text-white p-2 rounded-none hover:bg-slate-800 transition-colors"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/98 backdrop-blur-lg border-b border-slate-800 animate-in fade-in slide-in-from-top duration-200">
          <div className="px-4 pt-2 pb-6 space-y-3">
            <a
              href="#partners"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-none text-sm font-black uppercase tracking-widest text-slate-300 hover:bg-slate-900 hover:text-cyan-400 transition-colors"
            >
              Academic Partners
            </a>
            <a
              href="#programs"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-none text-sm font-black uppercase tracking-widest text-slate-300 hover:bg-slate-900 hover:text-cyan-400 transition-colors"
            >
              Learning Tracks
            </a>
            <a
              href="#quiz"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-none text-sm font-black uppercase tracking-widest text-slate-300 hover:bg-slate-900 hover:text-cyan-400 transition-colors animate-pulse"
            >
              Career Matcher Quiz
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-none text-sm font-black uppercase tracking-widest text-slate-300 hover:bg-slate-900 hover:text-cyan-400 transition-colors"
            >
              Stories
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-none text-sm font-black uppercase tracking-widest text-slate-300 hover:bg-slate-900 hover:text-cyan-400 transition-colors"
            >
              FAQ
            </a>
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3 px-3">
              <a
                href="#apply"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center bg-slate-900 text-white font-sans text-xs uppercase tracking-wider font-extrabold py-3 rounded-none border-2 border-slate-800"
              >
                Partner Inquiry
              </a>
              <a
                href="#apply"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center bg-cyan-400 text-slate-950 font-sans text-xs uppercase tracking-wider font-black py-3 rounded-none shadow-md"
              >
                Apply Program
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
