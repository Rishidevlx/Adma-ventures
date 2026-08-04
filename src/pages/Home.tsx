import React from 'react';
import Hero from '../components/Hero';
import Partners from '../components/Partners';
import Programs from '../components/Programs';
import SkillQuiz from '../components/SkillQuiz';
import Testimonials from '../components/Testimonials';
import ApplicationForm from '../components/ApplicationForm';
import FAQ from '../components/FAQ';
import PlacementPartners from '../components/PlacementPartners';

export default function Home() {
  return (
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
  );
}
