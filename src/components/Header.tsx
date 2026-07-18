import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, GraduationCap } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass =
    'font-sans text-sm font-semibold text-slate-600 hover:text-blue-700 transition-colors duration-200 relative group';

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm'
          : 'bg-white/70 backdrop-blur-sm border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group shrink-0" id="brand-logo">
            <div className="bg-blue-700 p-2 rounded-lg text-white shadow-md group-hover:bg-blue-600 transition-colors">
              <GraduationCap className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-black text-xl tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                ADMA <span className="text-blue-700">VENTURES</span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 mt-0.5">
                Academy & Upskilling
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10" id="desktop-nav">
            <a href="#partners" className={navLinkClass}>
              Academic Partners
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-700 rounded-full group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#programs" className={navLinkClass}>
              Learning Tracks
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-700 rounded-full group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#quiz" className={navLinkClass + ' flex items-center gap-1.5'}>
              Career Matcher
              <span className="bg-blue-700 text-white text-[9px] px-1.5 py-0.5 rounded font-mono font-black uppercase">
                AI
              </span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-700 rounded-full group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#testimonials" className={navLinkClass}>
              Stories
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-700 rounded-full group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#faq" className={navLinkClass}>
              FAQ
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-700 rounded-full group-hover:w-full transition-all duration-300" />
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="#apply"
              className="text-slate-700 hover:text-blue-700 font-sans text-sm font-semibold transition-colors duration-200 px-1"
              id="header-secondary-btn"
            >
              Partner Inquiry
            </a>
            <a
              href="#apply"
              className="bg-blue-700 hover:bg-blue-600 text-white font-sans text-sm font-bold py-2.5 px-5 rounded-lg shadow-md hover:shadow-blue-700/30 active:scale-[0.98] transition-all flex items-center gap-1.5"
              id="header-primary-btn"
            >
              Apply Now <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg animate-in fade-in slide-in-from-top duration-200">
          <div className="px-4 py-4 space-y-1">
            {[
              { href: '#partners', label: 'Academic Partners' },
              { href: '#programs', label: 'Learning Tracks' },
              { href: '#quiz', label: 'Career Matcher' },
              { href: '#testimonials', label: 'Stories' },
              { href: '#faq', label: 'FAQ' },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                {label}
              </a>
            ))}
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2 mt-3">
              <a
                href="#apply"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center text-slate-700 font-sans text-sm font-semibold py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Partner Inquiry
              </a>
              <a
                href="#apply"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center bg-blue-700 text-white font-sans text-sm font-bold py-2.5 rounded-lg shadow-md transition-colors hover:bg-blue-600"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
