import React, { useState } from 'react';
import { motion } from 'motion/react';
import { programs, partners } from '../data';
import { Cpu, Shield, TrendingUp, Clock, BookOpen, Layers } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="h-6 w-6 text-blue-700 stroke-[2.5]" />,
  Shield: <Shield className="h-6 w-6 text-blue-700 stroke-[2.5]" />,
  TrendingUp: <TrendingUp className="h-6 w-6 text-blue-700 stroke-[2.5]" />,
  Layers: <Layers className="h-6 w-6 text-blue-700 stroke-[2.5]" />
};

export default function Programs() {
  const [selectedProgramId, setSelectedProgramId] = useState<string>('top-courses');

  const getPartnerName = (partnerId: string) =>
    partners.find(p => p.id === partnerId)?.name || 'Academic Partner';

  const getPartnerLogoText = (partnerId: string) =>
    partners.find(p => p.id === partnerId)?.logoText || 'ADMA';

  const activeProgram = programs.find(p => p.id === selectedProgramId) || programs[0];

  const getProviderLogo = (id: string) => {
    switch (id) {
      case 'crio-courses': return '/logos/crio.png';
      case 'kcglobed-courses': return '/logos/kcglobed.png';
      case 'skilledura-courses': return '/logos/skilledura.png';
      case 'skill-lync-courses': return '/logos/skill-lync.png';
      default: return null;
    }
  };

  return (
    <section className="py-24 bg-gray-50 text-left border-b border-gray-200" id="programs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-blue-700 font-extrabold bg-blue-700/10 px-3.5 py-1.5 rounded-lg border border-blue-700/30">
              Cooperative Curricula
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tighter text-blue-800 mt-6">
              Upskilling & Reskilling Tracks
            </h2>
            <p className="font-sans text-lg text-slate-600 mt-4 font-light leading-relaxed">
              Drawn from direct corporate demand, our training models represent the intersection of computational mastery, agile governance, and cloud-native architecture.
            </p>
          </div>

          {/* Level Filter Controls */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {programs.map((program) => (
              <button
                key={program.id}
                onClick={() => setSelectedProgramId(program.id)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-black tracking-wider transition-all cursor-pointer border ${
                  program.id !== 'kcglobed-courses' ? 'uppercase' : ''
                } ${
                  selectedProgramId === program.id
                    ? 'bg-blue-700 border-blue-700 text-white shadow-md shadow-blue-700/20'
                    : 'bg-white text-slate-600 hover:text-blue-700 border-gray-200 hover:border-blue-300'
                }`}
              >
                {program.title}
              </button>
            ))}
          </div>
        </div>

        {/* Active Program Listing */}
        <motion.div
          key={selectedProgramId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg transition-all duration-300 overflow-hidden">
            {/* Main Program Header Row */}
            <div className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4 text-left">
                <div className={`bg-gray-50 p-4 rounded-xl border border-gray-200 shrink-0 flex items-center justify-center min-h-[72px] ${getProviderLogo(activeProgram.id) ? 'w-40' : 'w-[72px]'}`}>
                  {getProviderLogo(activeProgram.id) ? (
                    <img
                      src={getProviderLogo(activeProgram.id)!}
                      alt={activeProgram.title}
                      className="w-full h-full max-h-[40px] object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={getProviderLogo(activeProgram.id) ? 'hidden' : 'block'}>
                    {iconMap[activeProgram.iconName] || <BookOpen className="h-6 w-6 text-blue-700 stroke-[2.5]" />}
                  </div>
                </div>
                <div>
                  <h3 className={`font-display font-black text-2xl text-slate-900 tracking-tight ${activeProgram.id !== 'kcglobed-courses' ? 'uppercase' : ''}`}>
                    {activeProgram.title}
                  </h3>
                  <p className="text-xs font-mono text-blue-700 font-extrabold uppercase tracking-widest mt-1">
                    {activeProgram.subtitle} • {activeProgram.courses.length} Course{activeProgram.courses.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Summary badge */}
              <div className="flex items-center gap-4 self-stretch md:self-auto justify-between md:justify-end border-t md:border-none pt-4 md:pt-0 mt-2 md:mt-0 border-gray-100">
                <div className="flex flex-col text-left md:text-right">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">Est. Salary Delta</span>
                  <span className="text-xl font-display font-black text-blue-700">+{activeProgram.salaryIncreaseEstimate}</span>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="border-t border-gray-100 bg-gray-50/70 px-6 sm:px-8 pb-8 pt-6">
              {/* Program description */}
              <div className="mb-8">
                <h4 className="font-mono text-sm uppercase tracking-widest text-slate-500 font-black mb-2">Program Overview</h4>
                <p className="font-sans text-slate-700 text-base max-w-4xl font-light leading-relaxed">
                  {activeProgram.description} Below are the certified learning blocks structure in cooperation with our designated institutions.
                </p>
              </div>

              {/* Associated Courses List */}
              <div className="grid md:grid-cols-2 gap-5">
                {activeProgram.courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      {/* Course Metadata top bar */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[9px] font-mono uppercase text-blue-700 font-black bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md">
                          {course.level}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono font-bold">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{course.duration}</span>
                        </div>
                      </div>

                      {/* Course Title */}
                      <h5 className="font-display font-black uppercase text-slate-900 text-base leading-tight mb-2">
                        {course.title}
                      </h5>

                      {/* Partner endorsement */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-[9px] font-mono bg-gray-50 text-slate-600 px-1.5 py-0.5 rounded border border-gray-200 font-extrabold uppercase">
                          {getPartnerLogoText(course.partnerId)}
                        </span>
                        <span className="text-[11px] font-sans text-slate-500 font-medium truncate">
                          Partner: {getPartnerName(course.partnerId)}
                        </span>
                      </div>

                      {/* Course Description */}
                      <p className="text-sm text-slate-600 font-light leading-relaxed mb-4">
                        {course.description}
                      </p>
                    </div>

                    {/* Skills & Footer */}
                    <div>
                      <div className="border-t border-gray-100 pt-4 mt-2">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-black block mb-2">
                          Skills Acquired:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {course.skillsAcquired.map((skill, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-gray-50 text-slate-600 font-mono px-2 py-0.5 rounded border border-gray-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Course tags badges */}
                      <div className="mt-3 flex flex-wrap gap-1 opacity-70">
                        {course.tags.map((tag, idx) => (
                          <span key={idx} className="text-[9px] text-blue-600 font-mono tracking-tight font-bold">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions and application booster */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <div className="text-left py-1">
                  <p className="text-sm font-black uppercase tracking-tight text-slate-900">Ready to invest in this pathway?</p>
                  <p className="text-xs text-slate-500 font-light mt-1">Cohorts are limited to 24 students to guarantee direct instructor mentoring and verified industry interviews.</p>
                </div>
                <button
                  onClick={() => {
                    const contactEl = document.getElementById('apply');
                    if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 bg-blue-700 hover:bg-blue-600 text-white font-mono font-black text-xs uppercase tracking-wider rounded-xl shrink-0 transition-all shadow-md hover:shadow-blue-700/20 cursor-pointer"
                >
                  Enroll in this Track
                </button>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
