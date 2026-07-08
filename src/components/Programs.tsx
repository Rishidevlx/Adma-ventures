import React, { useState } from 'react';
import { programs, partners } from '../data';
import { Cpu, Shield, TrendingUp, Clock, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="h-6 w-6 text-cyan-400 stroke-[2.5]" />,
  Shield: <Shield className="h-6 w-6 text-cyan-400 stroke-[2.5]" />,
  TrendingUp: <TrendingUp className="h-6 w-6 text-cyan-400 stroke-[2.5]" />,
  Layers: <Layers className="h-6 w-6 text-cyan-400 stroke-[2.5]" />
};

export default function Programs() {
  const [selectedProgramId, setSelectedProgramId] = useState<string>('top-courses');

  const getPartnerName = (partnerId: string) => {
    return partners.find(p => p.id === partnerId)?.name || 'Academic Partner';
  };

  const getPartnerLogoText = (partnerId: string) => {
    return partners.find(p => p.id === partnerId)?.logoText || 'ADMA';
  };

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
    <section className="py-24 bg-slate-900 text-left border-b-2 border-slate-800" id="programs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-extrabold bg-cyan-400/10 px-3.5 py-1.5 rounded-none border-2 border-cyan-400/30">
              Cooperative Curricula
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white mt-6">
              Upskilling & Reskilling Tracks
            </h2>
            <p className="font-sans text-slate-400 mt-4 font-light leading-relaxed">
              Drawn from direct corporate demand, our training models represent the intersection of computational mastery, agile governance, and cloud-native architecture. Choose a system that fits your experience horizon.
            </p>
          </div>

          {/* Level Filter Controls */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {programs.map((program) => (
              <button
                key={program.id}
                onClick={() => setSelectedProgramId(program.id)}
                className={`px-4 py-2 rounded-none text-xs font-mono font-black tracking-wider transition-colors cursor-pointer border-2 ${
                  program.id !== 'kcglobed-courses' ? 'uppercase' : ''
                } ${
                  selectedProgramId === program.id
                    ? 'bg-cyan-400 border-cyan-400 text-slate-950'
                    : 'bg-slate-950 text-slate-400 hover:text-white border-slate-850'
                }`}
              >
                {program.title}
              </button>
            ))}
          </div>
        </div>

        {/* Active Program Listing */}
        <div className="space-y-6">
          <div className="bg-slate-950 border-2 border-cyan-400 shadow-2xl transition-all duration-300 rounded-none">
            {/* Main Program Header Row */}
            <div className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4 text-left">
                <div className={`bg-slate-900 p-4 rounded-none border-2 border-slate-800 shadow-inner shrink-0 flex items-center justify-center min-h-[72px] ${getProviderLogo(activeProgram.id) ? 'w-40' : 'w-[72px]'}`}>
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
                    {iconMap[activeProgram.iconName] || <BookOpen className="h-6 w-6 text-cyan-400 stroke-[2.5]" />}
                  </div>
                </div>
                <div>
                  <h3 className={`font-display font-black text-2xl text-white tracking-tight ${activeProgram.id !== 'kcglobed-courses' ? 'uppercase' : ''}`}>
                    {activeProgram.title}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400 font-extrabold uppercase tracking-widest mt-1">
                    {activeProgram.subtitle} • {activeProgram.courses.length} Course{activeProgram.courses.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Summary badge */}
              <div className="flex items-center gap-4 self-stretch md:self-auto justify-between md:justify-end border-t-2 md:border-none pt-4 md:pt-0 mt-2 md:mt-0 border-slate-850">
                <div className="flex flex-col text-left md:text-right">
                  <span className="text-[10px] font-mono uppercase text-slate-550 font-bold">Est. Salary Delta</span>
                  <span className="text-xl font-display font-black text-cyan-400">+{activeProgram.salaryIncreaseEstimate}</span>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="border-t-2 border-slate-850 bg-slate-900/50 px-6 sm:px-8 pb-8 pt-6">
              {/* Program description */}
              <div className="mb-8">
                <h4 className="font-mono text-xs uppercase tracking-widest text-slate-450 font-black mb-2">Program Overview</h4>
                <p className="font-sans text-slate-350 text-sm max-w-4xl font-light leading-relaxed">
                  {activeProgram.description} Below are the certified learning blocks structure in cooperation with our designated institutions.
                </p>
              </div>

              {/* Associated Courses List */}
              <div className="grid md:grid-cols-2 gap-6">
                {activeProgram.courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-slate-950 border-2 border-slate-855 rounded-none p-5 hover:border-slate-705 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Course Metadata top bar */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[9px] font-mono uppercase text-cyan-400 font-black bg-cyan-400/10 border-2 border-cyan-400/20 px-2.5 py-0.5 rounded-none">
                          {course.level}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-slate-450 font-mono font-bold">
                          <Clock className="h-3.5 w-3.5 text-slate-500" />
                          <span>{course.duration}</span>
                        </div>
                      </div>

                      {/* Course Title */}
                      <h5 className="font-display font-black uppercase text-white text-base leading-tight mb-2">
                        {course.title}
                      </h5>

                      {/* Partner endorsement */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-[9px] font-mono bg-slate-900 text-slate-300 px-1.5 py-0.5 rounded-none border border-slate-800 font-extrabold uppercase">
                          {getPartnerLogoText(course.partnerId)}
                        </span>
                        <span className="text-[11px] font-sans text-slate-455 font-medium truncate">
                          Partner: {getPartnerName(course.partnerId)}
                        </span>
                      </div>

                      {/* Course Description */}
                      <p className="text-xs text-slate-350 font-light leading-relaxed mb-4">
                        {course.description}
                      </p>
                    </div>

                    {/* Skills & Footer */}
                    <div>
                      <div className="border-t-2 border-slate-900 pt-4 mt-2">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 font-black block mb-2">
                          Skills Acquired:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {course.skillsAcquired.map((skill, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-slate-900 text-slate-300 font-mono px-2 py-0.5 rounded-none border border-slate-800"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Course tags badges */}
                      <div className="mt-4 flex flex-wrap gap-1 opacity-80">
                        {course.tags.map((tag, idx) => (
                          <span key={idx} className="text-[9px] text-cyan-400 font-mono tracking-tight font-bold">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions and application booster */}
              <div className="mt-8 pt-6 border-t-2 border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950 p-4 rounded-none border-2 border-slate-850">
                <div className="text-left py-1">
                  <p className="text-xs font-black uppercase tracking-tight text-slate-100">Ready to invest in this pathway?</p>
                  <p className="text-[11px] text-slate-400 font-light mt-0.5">Cohorts are limited to 24 students to guarantee direct instructor mentoring and verified industry interviews.</p>
                </div>
                <button
                  onClick={() => {
                    const contactEl = document.getElementById('apply');
                    if (contactEl) {
                      contactEl.scrollIntoView({ behavior: 'smooth' });
                      // Preselect this course if needed by triggering form change
                      const formProgramSelect = document.getElementById('form-program-select') as HTMLSelectElement;
                      if (formProgramSelect) {
                        formProgramSelect.value = activeProgram.id;
                        // trigger change event manually to update React state if applicable
                        const event = new Event('change', { bubbles: true });
                        formProgramSelect.dispatchEvent(event);
                      }
                    }
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-955 font-mono font-black text-xs uppercase tracking-wider rounded-none shrink-0 transition-all shadow-md cursor-pointer"
                >
                  Enroll in this Track
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
