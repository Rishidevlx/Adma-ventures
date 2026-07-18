import React, { useState } from 'react';
import { faqItems } from '../data';
import { Plus, Minus, ArrowUpRight, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Partnerships', 'Curriculum', 'Job Support', 'Admissions'];

  const filteredFaqs = activeCategory === 'All'
    ? faqItems
    : faqItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-200 text-left" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-700 font-black bg-blue-700/10 px-3 py-1.5 rounded-none border-2 border-blue-700/20">
            Admissions FAQs
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-blue-800 mt-6 tracking-tighter">
            Curriculum & Enrollment Insights
          </h2>
          <p className="font-sans text-slate-600 mt-4 text-base max-w-2xl mx-auto font-light leading-relaxed">
            Everything you need to know about credentials, financial sponsorships, and how co-designed sandboxes operate.
          </p>
        </div>

        {/* Category Toggles */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIdx(null); // Close any open faq on category transition
              }}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-black uppercase tracking-wider transition-colors cursor-pointer border ${
                activeCategory === cat
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'bg-white text-slate-600 hover:text-blue-700 border-gray-200 hover:border-blue-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordions List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:border-blue-200"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-start gap-3.5">
                     <HelpCircle className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" />
                    <h3 className="font-display font-black uppercase text-blue-800 text-sm sm:text-base leading-tight tracking-tight">
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`h-8 w-8 rounded-none bg-gray-50 border-2 border-gray-200 flex items-center justify-center text-slate-600 shrink-0 transition-all ${isOpen ? 'rotate-180 text-blue-700 border-blue-700' : ''}`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
                    <p className="font-sans text-sm text-slate-700 font-light leading-relaxed pl-8">
                      {faq.answer}
                    </p>
                    {/* Tiny category metadata badge */}
                    <div className="pl-8 pt-4">
                      <span className="text-[10px] font-mono whitespace-nowrap text-slate-550 uppercase tracking-widest bg-gray-50 px-2.5 py-1 rounded-none border border-gray-200">
                        Classified: {faq.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Dynamic Partner Contact callbox */}
        <div className="mt-16 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left py-1">
            <h4 className="font-display font-black uppercase text-blue-800 text-sm tracking-tight">Have an institution partnership proposal?</h4>
            <p className="text-xs text-slate-600 mt-1 font-light">
              We periodically expand our academic slates to accept specialized technical curriculums. Let’s collaborate.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('apply');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="whitespace-nowrap inline-flex items-center gap-1.5 text-xs font-mono font-black uppercase text-blue-700 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Contact Partner Division <ArrowUpRight className="h-4 w-4 stroke-[3]" />
          </button>
        </div>

      </div>
    </section>
  );
}
