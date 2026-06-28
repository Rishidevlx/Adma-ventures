import React, { useState } from 'react';
import { programs } from '../data';
import { Brain, Sparkles, ArrowRight, Play, RefreshCw, Loader2, MessageSquare } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export default function SkillQuiz() {
  const [isStarted, setIsStarted] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startQuiz = () => {
    setIsStarted(true);
    setAiResponse(null);
    setUserInput('');
    setError(null);
  };

  const resetAnalyzer = () => {
    setIsStarted(false);
    setAiResponse(null);
    setUserInput('');
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!userInput.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);

    try {
      const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error("API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file or Vercel environment variables.");
      }

      const ai = new GoogleGenAI({ apiKey: apiKey });
      
      // We extract course titles and descriptions from our programs array to give the AI context.
      const availableCoursesContext = programs.flatMap(p => 
        p.courses.map(c => `- ${c.title}: ${c.description}`)
      ).join('\n');

      const systemPrompt = `You are a helpful and expert career advisor for ADMA Ventures.
Your goal is to analyze the user's background, skills, and goals, and recommend ONE of the following courses that best fits them.

Available Courses:
${availableCoursesContext}

Guidelines:
1. Be encouraging, professional, and clear.
2. Directly address the user's input.
3. Recommend ONLY ONE course from the list above that fits best.
4. Explain WHY you are recommending it based on their input.
5. Format your response neatly with simple paragraphs and a clear heading for the recommendation. Do not use complex markdown like tables, just plain text with line breaks and asterisks for bolding.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: systemPrompt + '\n\nUser Input:\n' + userInput }] }
        ]
      });

      if (response.text) {
        setAiResponse(response.text);
      } else {
        throw new Error("No response received from the AI.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while analyzing your profile. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Helper to safely render bold text if AI returns asterisks
  const renderFormattedText = (text: string) => {
    return text.split('\n').map((paragraph, i) => {
      if (!paragraph.trim()) return <br key={i} />;
      
      // Simple bold replacement (**text**)
      const parts = paragraph.split(/(\*\*.*?\*\*)/g);
      
      return (
        <p key={i} className="mb-3 leading-relaxed">
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j} className="text-white font-bold">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

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
            Not sure which path to take? Tell our AI career advisor about your background, skills, and goals, and we'll instantly recommend the perfect track for you.
          </p>
        </div>

        {/* Dynamic AI Chat Card */}
        <div className="bg-slate-900 border-2 border-slate-850 rounded-none p-6 sm:p-10 shadow-2xl relative overflow-hidden min-h-[420px] flex flex-col">
          
          {!isStarted ? (
            /* Intro state */
            <div className="text-center py-8 flex flex-col items-center justify-center h-full space-y-6 flex-1">
              <div className="bg-cyan-400/10 border-2 border-cyan-400/20 p-4 rounded-none text-cyan-400">
                <Brain className="h-10 w-10 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                  Evaluate Career Delta in 60 Sec
                </h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto mt-2 leading-relaxed font-light">
                  Our advanced AI processes your industry experience and occupational goals, mapping them directly to the most suitable curriculum framework.
                </p>
              </div>
              <button
                onClick={startQuiz}
                className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono text-xs uppercase tracking-wider font-black py-4 px-8 rounded-none transition-all shadow-md flex items-center gap-2 cursor-pointer mt-4"
              >
                Start Strategy Analyzer <Play className="h-4 w-4 fill-current" />
              </button>
            </div>
          ) : isAnalyzing ? (
            /* Loading State */
            <div className="flex flex-col items-center justify-center flex-1 space-y-6 py-12">
              <Loader2 className="h-14 w-14 text-cyan-400 animate-spin" />
              <h3 className="font-display text-2xl font-black uppercase text-white tracking-widest animate-pulse text-center">
                Analyzing perfect strategy...
              </h3>
              <p className="text-slate-400 text-sm font-mono uppercase tracking-widest">Please wait while our AI reviews your profile</p>
            </div>
          ) : aiResponse ? (
            /* Result State */
            <div className="flex flex-col h-full flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-950 mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-cyan-400/10 p-2.5 rounded-none text-cyan-400 border border-cyan-400/20">
                    <Sparkles className="h-5 w-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest font-black">Analysis Complete</span>
                    <h3 className="font-display text-xl font-black uppercase text-white tracking-tight">Your Direct Training Directive</h3>
                  </div>
                </div>
                <button
                  onClick={resetAnalyzer}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-black uppercase text-slate-400 hover:text-white transition-colors cursor-pointer self-start sm:self-auto shrink-0"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Re-run Strategy
                </button>
              </div>

              {/* AI Output Render */}
              <div className="bg-slate-950 rounded-none border-2 border-cyan-400/50 p-6 sm:p-8 flex-1 overflow-y-auto">
                <div className="text-slate-300 text-sm sm:text-base font-light">
                  {renderFormattedText(aiResponse)}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <a
                  href="#apply"
                  className="bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-mono text-xs uppercase tracking-wider font-black py-4 px-8 rounded-none shadow-md transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  Apply Recommendation <ArrowRight className="h-4 w-4 stroke-[3]" />
                </a>
              </div>
            </div>
          ) : (
            /* Input State */
            <div className="flex flex-col h-full flex-1 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="h-6 w-6 text-cyan-400" />
                <h3 className="font-display text-xl font-black uppercase text-white tracking-tight">
                  Tell us about yourself
                </h3>
              </div>
              
              <p className="text-slate-400 text-sm font-light">
                Describe your current role, background, interests, and what you want to achieve. The more details you provide, the better our AI can match you with the right course.
              </p>

              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="E.g., I have 3 years of experience in retail sales, but I've always been interested in computers. I want to transition into tech, specifically something related to building websites or managing data..."
                className="w-full bg-slate-950 border-2 border-slate-800 focus:border-cyan-400 outline-none rounded-none p-5 text-slate-200 min-h-[200px] resize-y font-sans font-light placeholder:text-slate-600 transition-colors"
              />

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-4">
                  {error}
                </div>
              )}

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={resetAnalyzer}
                  className="text-xs font-mono text-slate-500 hover:text-slate-300 uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAnalyze}
                  disabled={!userInput.trim()}
                  className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono text-xs uppercase tracking-wider font-black py-3.5 px-8 rounded-none shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Analyze My Profile <Sparkles className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
