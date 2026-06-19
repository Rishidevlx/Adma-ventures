import React, { useState } from 'react';
import { programs } from '../data';
import { Award, Brain, Target, Shield, Landmark, Sparkles, ArrowRight, Play, RefreshCw, Smartphone } from 'lucide-react';

const questions = [
  {
    id: 1,
    text: 'What is your current occupational background?',
    options: [
      { text: 'Non-technical career (e.g. Sales, Logistics, Admin, Hospitality)', value: 'reskil', weight: { 'ai-intel': 1, 'cloud-cyber': 3, 'digital-transform': 2 } },
      { text: 'Junior / Mid technical specialist (Software, Tech Support, IT)', value: 'upskil', weight: { 'ai-intel': 3, 'cloud-cyber': 1, 'digital-transform': 2 } },
      { text: 'Corporate manager, supervisor, or product consultant', value: 'lead', weight: { 'ai-intel': 2, 'cloud-cyber': 1, 'digital-transform': 3 } },
      { text: 'Academic student or early graduate searching for focus', value: 'student', weight: { 'ai-intel': 2, 'cloud-cyber': 3, 'digital-transform': 2 } }
    ]
  },
  {
    id: 2,
    text: 'What is your primary career acceleration goal?',
    options: [
      { text: 'Pivot quickly into high-paying engineering or dev roles', value: 'pivot', weight: { 'ai-intel': 1, 'cloud-cyber': 3, 'digital-transform': 1 } },
      { text: 'Integrate generative AI techniques into my present company workspace', value: 'ai_focus', weight: { 'ai-intel': 3, 'cloud-cyber': 1, 'digital-transform': 2 } },
      { text: 'Advance to senior leadership directing product roadmap decisions', value: 'mgmt', weight: { 'ai-intel': 2, 'cloud-cyber': 1, 'digital-transform': 3 } }
    ]
  },
  {
    id: 3,
    text: 'Which technology domain sounds most fascinating?',
    options: [
      { text: 'Automated Language Models, Agentic Workflows & Neural Networks', value: 'ai', weight: { 'ai-intel': 3, 'cloud-cyber': 1, 'digital-transform': 2 } },
      { text: 'Secure Servers, Cloud Container APIs & Cyber Defenses', value: 'systems', weight: { 'ai-intel': 1, 'cloud-cyber': 3, 'digital-transform': 1 } },
      { text: 'Business Analytics, SQL Dashboarding & Agile Lean execution', value: 'business', weight: { 'ai-intel': 1, 'cloud-cyber': 1, 'digital-transform': 3 } }
    ]
  },
  {
    id: 4,
    text: 'What is your preferred educational delivery structure?',
    options: [
      { text: '100% Online self-paced with micro-certifications', value: 'pacing_online', weight: { 'ai-intel': 2, 'cloud-cyber': 1, 'digital-transform': 3 } },
      { text: 'Intensely immersive cohort bootcamp with live project reviews', value: 'pacing_bootcamp', weight: { 'ai-intel': 1, 'cloud-cyber': 3, 'digital-transform': 1 } },
      { text: 'Hybrid schedule: weekly evening meetings + offline labs', value: 'pacing_hybrid', weight: { 'ai-intel': 3, 'cloud-cyber': 2, 'digital-transform': 2 } }
    ]
  }
];

export default function SkillQuiz() {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0: intro, 1-4: quiz questions, 5: results page
  const [scores, setScores] = useState<Record<string, number>>({
    'ai-intel': 0,
    'cloud-cyber': 0,
    'digital-transform': 0
  });
  const [answers, setAnswers] = useState<number[]>([]);

  const startQuiz = () => {
    setScores({ 'ai-intel': 0, 'cloud-cyber': 0, 'digital-transform': 0 });
    setAnswers([]);
    setCurrentStep(1);
  };

  const handleAnswerSelect = (optionWeight: Record<string, number>) => {
    setScores((prev) => ({
      'ai-intel': prev['ai-intel'] + (optionWeight['ai-intel'] || 0),
      'cloud-cyber': prev['cloud-cyber'] + (optionWeight['cloud-cyber'] || 0),
      'digital-transform': prev['digital-transform'] + (optionWeight['digital-transform'] || 0)
    }));
    
    setAnswers((prev) => [...prev, currentStep]);

    if (currentStep < questions.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCurrentStep(5); // results
    }
  };

  const getRecommendedProgram = () => {
    let highestScore = -1;
    let recommendedId = 'ai-intel';
    
    Object.entries(scores).forEach(([id, score]) => {
      const numericScore = score as number;
      if (numericScore > highestScore) {
        highestScore = numericScore;
        recommendedId = id;
      }
    });

    return programs.find((p) => p.id === recommendedId) || programs[0];
  };

  const handleApplyRecommended = (programId: string) => {
    const applySection = document.getElementById('apply');
    if (applySection) {
      applySection.scrollIntoView({ behavior: 'smooth' });
      
      const selectEl = document.getElementById('form-program-select') as HTMLSelectElement;
      if (selectEl) {
        selectEl.value = programId;
        const event = new Event('change', { bubbles: true });
        selectEl.dispatchEvent(event);
      }
    }
  };

  const recommendedProgram = getRecommendedProgram();

  return (
    <section className="py-24 bg-slate-950 border-t-2 border-slate-800 text-left relative" id="quiz">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-400/5 rounded-none blur-[140px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro header */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-extrabold bg-cyan-400/10 px-3 py-1.5 rounded-none border-2 border-cyan-400/20">
            Advisory Machine
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-white mt-6 tracking-tighter">
            Personalized Reskilling Strategy
          </h2>
          <p className="font-sans text-slate-400 mt-4 text-base max-w-2xl mx-auto font-light leading-relaxed">
            Unsure whether an advanced artificial intelligence track or a cloud networks pivot fits your occupational foundation? Run the quick strategist analyzer below for a direct syllabus directive.
          </p>
        </div>

        {/* Dynamic Quiz Card */}
        <div className="bg-slate-900 border-2 border-slate-850 rounded-none p-6 sm:p-10 shadow-2xl relative overflow-hidden min-h-[420px] flex flex-col justify-between">
          
          {/* Progress bar */}
          {currentStep >= 1 && currentStep <= questions.length && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-950">
              <div
                className="h-full bg-cyan-400 transition-all duration-300"
                style={{ width: `${(currentStep / questions.length) * 100}%` }}
              ></div>
            </div>
          )}

          {/* Core Steps Content */}
          {currentStep === 0 ? (
            /* Intro state */
            <div className="text-center py-8 flex flex-col items-center space-y-6">
              <div className="bg-cyan-400/10 border-2 border-cyan-400/20 p-4 rounded-none text-cyan-400">
                <Brain className="h-10 w-10 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                  Evaluate Career Delta in 60 Sec
                </h3>
                <p className="text-sm text-slate-400 max-w-md mt-2 leading-relaxed font-light">
                  Our algorithm processes your industry experience background and occupational goals, mapping them directly to certified curriculum frameworks from AWS and Stanford collaborations.
                </p>
              </div>
              <button
                onClick={startQuiz}
                className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono text-xs uppercase tracking-wider font-black py-4 px-8 rounded-none transition-all shadow-md flex items-center gap-2 cursor-pointer mt-2"
              >
                Start Strategy Analyzer <Play className="h-4 w-4 fill-current" />
              </button>
            </div>
          ) : currentStep <= questions.length ? (
            /* Question active states */
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-mono text-slate-455 font-bold">
                <span>STAGE {currentStep} OF {questions.length}</span>
                <span className="text-cyan-400 uppercase font-black">PROGRESS: {Math.round((currentStep / questions.length) * 100)}%</span>
              </div>

              <div>
                <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white leading-tight">
                  {questions[currentStep - 1].text}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {questions[currentStep - 1].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(option.weight)}
                    className="flex text-left items-start p-4 rounded-none border-2 border-slate-800 hover:border-cyan-400 bg-slate-950 hover:bg-slate-900 text-sm font-sans text-slate-300 hover:text-white cursor-pointer transition-all hover:translate-x-1"
                  >
                    <span className="bg-slate-900 border-2 border-slate-800 h-6 w-6 rounded-none flex items-center justify-center font-mono text-[10px] text-slate-400 shrink-0 font-black mr-3 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Results page state (currentStep === 5) */
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-950">
                <div className="flex items-center gap-3">
                  <div className="bg-cyan-400/10 p-2.5 rounded-none text-cyan-400 border border-cyan-400/20">
                    <Sparkles className="h-5 w-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest font-black">Calculation Complete</span>
                    <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">Your Direct Training Directive</h3>
                  </div>
                </div>
                <button
                  onClick={startQuiz}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-black uppercase text-slate-400 hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Re-run Strategy
                </button>
              </div>

              {/* Recommended Program Spotlight Box */}
              <div className="bg-slate-950 rounded-none border-2 border-cyan-400 p-5 sm:p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-400/5 rounded-none pointer-events-none"></div>
                
                <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-400/15 px-2.5 py-1 rounded-none border-2 border-cyan-400/20 font-black">
                      Excellent Match (98% Alignment Score)
                    </span>
                    <h4 className="font-display text-2xl font-black uppercase text-white mt-3.5 leading-none">
                      {recommendedProgram.title}
                    </h4>
                    <p className="text-xs font-mono text-slate-455 mt-1 uppercase tracking-widest font-black">
                      {recommendedProgram.subtitle}
                    </p>
                  </div>
                  
                  <div className="text-left sm:text-right bg-slate-900 border-2 border-slate-800 rounded-none py-2 px-4 self-stretch sm:self-auto flex sm:flex-col justify-between items-center sm:items-end">
                    <span className="text-[9px] font-mono text-slate-455 uppercase font-black">Salary Boost Impact</span>
                    <span className="text-lg font-display font-black text-cyan-400">+{recommendedProgram.salaryIncreaseEstimate}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed mb-6">
                  {recommendedProgram.description}
                </p>

                {/* Stepping stone course highlight */}
                <div className="bg-slate-900 p-4 rounded-none border-2 border-slate-800 text-xs">
                  <p className="font-mono uppercase text-[10px] text-slate-500 font-black mb-1.5">Recommended First Step Course:</p>
                  <p className="font-black uppercase tracking-tight text-slate-200 text-sm mb-1">{recommendedProgram.courses[0].title}</p>
                  <p className="font-sans text-slate-400 font-light leading-relaxed mb-2">{recommendedProgram.courses[0].description}</p>
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-cyan-400 font-bold">
                    <span className="bg-slate-950 px-2 py-0.5 border border-slate-850 rounded-none uppercase">Format: {recommendedProgram.courses[0].format}</span>
                    <span className="hidden sm:inline text-slate-700">•</span>
                    <span>Duration: {recommendedProgram.courses[0].duration}</span>
                  </div>
                </div>
              </div>

              {/* Strategy Advice note & Action Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="max-w-md">
                  <p className="text-xs text-slate-455 leading-relaxed font-light">
                    Our advisors will co-design a personalized pathway covering potential financial sponsorship opportunities for the <strong>{recommendedProgram.title}</strong> based on your quiz slates.
                  </p>
                </div>
                
                <button
                  onClick={() => handleApplyRecommended(recommendedProgram.id)}
                  className="bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-mono text-xs uppercase tracking-wider font-black py-4 px-8 rounded-none shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  Apply Recommendation <ArrowRight className="h-4 w-4 stroke-[3]" />
                </button>
              </div>
            </div>
          )}

          {/* Micro Footer validation indicator */}
          <div className="mt-6 pt-4 border-t-2 border-slate-950 flex justify-between items-center text-[10px] font-mono text-slate-600">
            <span>Core weights audited by Stanford Collaborates</span>
            <span>Version: ADMA-M2-2026</span>
          </div>

        </div>

      </div>
    </section>
  );
}
