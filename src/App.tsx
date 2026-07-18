/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PhoneCall } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Partners from './components/Partners';
import Programs from './components/Programs';
import SkillQuiz from './components/SkillQuiz';
import Testimonials from './components/Testimonials';
import ApplicationForm from './components/ApplicationForm';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import PlacementPartners from './components/PlacementPartners';

export default function App() {
  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans selection:bg-blue-700 selection:text-white">
      {/* Top Floating Header */}
      <Header />

      {/* Main Container content stream */}
      <main>
        {/* Dynamic Editorial Hero section with core metrics */}
        <Hero />

        {/* Placement Partners Marquee */}
        <PlacementPartners variant="marquee" />

        {/* Co-operative ecosystem & certified list targets */}
        <Partners />

        {/* Actionable programs & detailed syllabus listing with filters */}
        <Programs />

        {/* Interactive Strategy Advisory Matcher Quiz */}
        <SkillQuiz />

        {/* Real graduate success transition profiles */}
        <Testimonials />

        {/* Accordion FAQ insights */}
        <FAQ />
        
        {/* Placement Partners List View */}
        <PlacementPartners variant="list" />

        {/* Registration Contact dossier form */}
        <ApplicationForm />
      </main>

      {/* Corporate trust and legal Dynamic Footer */}
      <Footer />

      {/* Floating Call Button */}
      <a 
        href="tel:+918754659759" 
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-blue-700 text-white p-4 rounded-full shadow-lg shadow-blue-700/30 hover:scale-110 hover:bg-blue-600 hover:shadow-blue-700/50 transition-all duration-300 z-50 flex items-center justify-center group"
        aria-label="Call Us"
      >
        <div className="absolute inset-0 rounded-full bg-blue-700 animate-ping opacity-25"></div>
        <PhoneCall size={26} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
        
        <span className="absolute right-full mr-4 bg-gray-50 text-blue-700 text-sm font-mono font-bold px-3 py-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-blue-700/20">
          +91 87546 59759
        </span>
      </a>
    </div>
  );
}

