import React, { useState } from 'react';
import { Mail, Phone, User, Send, CheckCircle2, ClipboardCheck, MapPin, Search, BookOpen } from 'lucide-react';

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    name: '',
    contactNo: '',
    educationalQualification: '',
    mailId: '',
    currentPlaceOfResidence: '',
    lookingFor: '',
    upskillCourse: '',
    consent: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mailId || !formData.contactNo) {
      setErrorMessage('Please output your core contact specifications (Name, Mail id, Contact no.).');
      return;
    }

    setIsLoading(true);

    // Simulate database queue submission
    setTimeout(() => {
      // Create a random high-fidelity application ID
      const randHex = Math.random().toString(16).substring(2, 7).toUpperCase();
      const code = `ADM-APP-2026-${randHex}`;
      
      setApplicationId(code);
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <section className="py-24 bg-gray-50 border-t-2 border-slate-850 text-left" id="apply">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left instructions column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-blue-700 font-extrabold bg-blue-700/10 px-3.5 py-1.5 rounded-none border-2 border-blue-700/25">
              Secure Enrollment Gate
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tighter text-blue-800 mt-4 leading-none">
              Dossier Registration
            </h2>
            <p className="font-sans text-slate-600 text-base font-light leading-relaxed">
              Take the first structural step toward corporate certification. Complete this initial registration dossier to allocate your cohort position and apply for corporate grant sponsorship options.
            </p>

            {/* Checklist items list with cyan ticks */}
            <div className="space-y-4 pt-6 border-t-2 border-gray-200">
              
              <div className="flex items-start gap-3">
                <div className="bg-blue-700/10 p-1.5 rounded-none text-blue-700 mt-0.5 shrink-0 border border-blue-700/20">
                  <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest font-black text-blue-800">No Upfront Commitment</h4>
                  <p className="text-xs text-slate-600 font-light mt-1">Your initial dossier submits an eligibility audit. No monetary payment is required to start.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-700/10 p-1.5 rounded-none text-blue-700 mt-0.5 shrink-0 border border-blue-700/20">
                  <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest font-black text-blue-800">Branded Sandbox Induction</h4>
                  <p className="text-xs text-slate-600 font-light mt-1">Approved applications instantly trigger sandbox invitation links affiliated with our cloud partners AWS and Google.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-700/10 p-1.5 rounded-none text-blue-700 mt-0.5 shrink-0 border border-blue-700/20">
                  <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest font-black text-blue-800">12-Hour Strategic Turnaround</h4>
                  <p className="text-xs text-slate-600 font-light mt-1">Our curriculum allocation directors coordinate with you via phone to verify prerequisites and schedule starts.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right interactive form card columns (7 cols) */}
          <div className="lg:col-span-12 lg:col-span-7">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-xl relative">
              
              {/* Submission loading cover */}
              {isLoading && (
                <div className="absolute inset-0 bg-slate-955/95 z-30 rounded-none flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 border-4 border-blue-700 border-t-transparent rounded-none animate-spin"></div>
                  <p className="font-mono text-xs text-blue-700 uppercase tracking-widest font-black">Registering Academic Dossier...</p>
                </div>
              )}

              {!isSubmitted ? (
                /* Main interactive form state */
                <form onSubmit={handleSubmit} className="space-y-6" id="dossier-form">
                  <h3 className="font-display text-2xl font-black uppercase tracking-tight text-blue-800 border-b-2 border-slate-900 pb-3">
                    Submit Candidate Coordinates
                  </h3>

                  {errorMessage && (
                    <div className="bg-red-500/10 border-2 border-red-500/35 p-3 font-mono text-xs text-red-400 font-bold uppercase rounded-none">
                      Warning: {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="flex flex-col text-left">
                      <label htmlFor="name" className="text-xs font-mono text-slate-450 uppercase tracking-widest mb-1.5 font-black">
                        Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 h-4.5 w-4.5 stroke-[2.5]" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your Name"
                          className="w-full bg-gray-50 border-2 border-gray-200 hover:border-gray-300 focus:border-blue-700 rounded-none py-3 pl-11 pr-4 text-slate-200 text-sm focus:outline-none transition-all placeholder:text-slate-600 font-sans"
                        />
                      </div>
                    </div>

                    {/* Contact no. */}
                    <div className="flex flex-col text-left">
                      <label htmlFor="contactNo" className="text-xs font-mono text-slate-450 uppercase tracking-widest mb-1.5 font-black">
                        Contact no. *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 h-4.5 w-4.5 stroke-[2.5]" />
                        <input
                          type="tel"
                          id="contactNo"
                          name="contactNo"
                          required
                          value={formData.contactNo}
                          onChange={handleInputChange}
                          placeholder="Your Contact No."
                          className="w-full bg-gray-50 border-2 border-gray-200 hover:border-gray-300 focus:border-blue-700 rounded-none py-3 pl-11 pr-4 text-slate-200 text-sm focus:outline-none transition-all placeholder:text-slate-600 font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Mail id */}
                    <div className="flex flex-col text-left">
                      <label htmlFor="mailId" className="text-xs font-mono text-slate-450 uppercase tracking-widest mb-1.5 font-black">
                        Mail id *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 h-4.5 w-4.5 stroke-[2.5]" />
                        <input
                          type="email"
                          id="mailId"
                          name="mailId"
                          required
                          value={formData.mailId}
                          onChange={handleInputChange}
                          placeholder="Your Mail id"
                          className="w-full bg-gray-50 border-2 border-gray-200 hover:border-gray-300 focus:border-blue-700 rounded-none py-3 pl-11 pr-4 text-slate-200 text-sm focus:outline-none transition-all placeholder:text-slate-600 font-sans"
                        />
                      </div>
                    </div>

                    {/* Their current place of residence */}
                    <div className="flex flex-col text-left">
                      <label htmlFor="currentPlaceOfResidence" className="text-xs font-mono text-slate-455 uppercase tracking-widest mb-1.5 font-black">
                        Current place of residence
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 h-4.5 w-4.5 stroke-[2.5]" />
                        <input
                          type="text"
                          id="currentPlaceOfResidence"
                          name="currentPlaceOfResidence"
                          value={formData.currentPlaceOfResidence}
                          onChange={handleInputChange}
                          placeholder="City, Country"
                          className="w-full bg-gray-50 border-2 border-gray-200 hover:border-gray-300 focus:border-blue-700 rounded-none py-3 pl-11 pr-4 text-slate-200 text-sm focus:outline-none transition-all placeholder:text-slate-600 font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Educational qualification */}
                    <div className="flex flex-col text-left">
                      <label htmlFor="educationalQualification" className="text-xs font-mono text-slate-450 uppercase tracking-widest mb-1.5 font-black">
                        Educational qualification
                      </label>
                      <div className="relative">
                        <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 h-4.5 w-4.5 stroke-[2.5]" />
                        <input
                          type="text"
                          id="educationalQualification"
                          name="educationalQualification"
                          value={formData.educationalQualification}
                          onChange={handleInputChange}
                          placeholder="E.g. B.Tech, MBA"
                          className="w-full bg-gray-50 border-2 border-gray-200 hover:border-gray-300 focus:border-blue-700 rounded-none py-3 pl-11 pr-4 text-slate-200 text-sm focus:outline-none transition-all placeholder:text-slate-600 font-sans"
                        />
                      </div>
                    </div>

                    {/* What are they looking for? */}
                    <div className="flex flex-col text-left">
                      <label htmlFor="lookingFor" className="text-xs font-mono text-slate-450 uppercase tracking-widest mb-1.5 font-black">
                        What are you looking for?
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 h-4.5 w-4.5 stroke-[2.5]" />
                        <input
                          type="text"
                          id="lookingFor"
                          name="lookingFor"
                          value={formData.lookingFor}
                          onChange={handleInputChange}
                          placeholder="E.g. Career switch, Skill upgrade"
                          className="w-full bg-gray-50 border-2 border-gray-200 hover:border-gray-300 focus:border-blue-700 rounded-none py-3 pl-11 pr-4 text-slate-200 text-sm focus:outline-none transition-all placeholder:text-slate-600 font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Q:Do you wish to upskill by taking up an online course? */}
                  <div className="flex flex-col text-left">
                    <label htmlFor="upskillCourse" className="text-xs font-mono text-slate-450 uppercase tracking-widest mb-1.5 font-black">
                      Q: Do you wish to upskill by taking up an online course?
                    </label>
                    <select
                      id="upskillCourse"
                      name="upskillCourse"
                      value={formData.upskillCourse}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border-2 border-gray-200 focus:border-blue-700 rounded-none py-3 px-4 text-slate-200 text-sm focus:outline-none transition-all font-sans cursor-pointer"
                    >
                      <option value="" disabled>Select course</option>
                      <option value="US CMA">US CMA</option>
                      <option value="US CPA">US CPA</option>
                      <option value="US EA">US EA</option>
                      <option value="UK ACCA">UK ACCA</option>
                      <option value="GCC School">GCC School</option>
                      <optgroup label="Crio.do">
                        <option value="Fellowship Program in Software Development with AI">Fellowship Program in Software Development with AI</option>
                        <option value="Fellowship Program in QA Automation with AI (SDET)">Fellowship Program in QA Automation with AI (SDET)</option>
                        <option value="Fellowship Program in NextGen Data Analytics & Data Science with AI">Fellowship Program in NextGen Data Analytics & Data Science with AI</option>
                        <option value="Fellowship Program in System Design">Fellowship Program in System Design</option>
                        <option value="SkillIQ Full Stack Development Program">SkillIQ Full Stack Development Program</option>
                        <option value="SkillIQ Data Analytics & Data Science Program">SkillIQ Data Analytics & Data Science Program</option>
                        <option value="Crio SkillIQ Gen-AI Powered QA Automation Program">Crio SkillIQ Gen-AI Powered QA Automation Program</option>
                      </optgroup>
                      <optgroup label="Skill-lync">
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Electrical / EV Engineering">Electrical / EV Engineering</option>
                        <option value="Embedded Systems">Embedded Systems</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                        <option value="Electrical Engineering">Electrical Engineering</option>
                        <option value="Computer Science / Software">Computer Science / Software</option>
                        <option value="Data Analytics & Data Science">Data Analytics & Data Science</option>
                        <option value="Aerospace Engineering">Aerospace Engineering</option>
                      </optgroup>
                    </select>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start text-left pt-2">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      required
                      checked={formData.consent}
                      onChange={handleCheckboxChange}
                      className="mt-1 h-5 w-5 rounded-none bg-gray-50 border-2 border-gray-200 text-blue-700 focus:ring-0 accent-blue-700 cursor-pointer"
                    />
                    <label htmlFor="consent" className="ml-3 text-xs text-slate-600 font-light leading-relaxed">
                      I authorize ADMA Ventures Academy and its partner institutions to contact me regarding class openings, admissions slates, and career placement resources. *
                    </label>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full bg-blue-700 hover:bg-blue-600 text-slate-955 font-mono font-black text-xs uppercase tracking-wider py-4 rounded-none shadow-md hover:shadow-blue-700/15 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Engage Pathway Submission <Send className="h-4 w-4 stroke-[2.5]" />
                  </button>

                </form>
              ) : (
                /* Application Success state */
                <div className="py-6 sm:py-8 text-center space-y-6 flex flex-col items-center animate-in fade-in duration-300">
                  <div className="bg-blue-700/10 border-2 border-blue-700/30 p-4 rounded-none text-blue-700 shadow-md">
                    <ClipboardCheck className="h-12 w-12 stroke-[2.5]" />
                  </div>
                  
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono uppercase bg-blue-700/15 text-blue-700 px-3 py-1.5 rounded-none border-2 border-blue-700/20 font-black">
                      Submission Registered
                    </span>
                    <h3 className="font-display text-3xl font-black uppercase text-blue-800 tracking-tight">
                      Academic Dossier Active
                    </h3>
                    <p className="text-sm text-slate-600 max-w-sm mx-auto font-light leading-relaxed">
                      Thank you, <strong>{formData.name}</strong>. Your vocational orientation strategy profile is securely compiled. We have allocated a tentative placement slot:
                    </p>
                  </div>

                  {/* Curated pathway verification ticket container */}
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-none p-5 text-left w-full space-y-3 font-mono text-xs max-w-lg shadow-inner">
                    <div className="flex justify-between items-center text-[10px] border-b-2 border-slate-950 pb-2.5">
                      <span className="text-slate-500 font-extrabold">SECURITY REFERENCE PROFILE</span>
                      <span className="text-blue-700 font-black tracking-widest">{applicationId}</span>
                    </div>

                    <div className="space-y-2.5 text-slate-700 pt-1">
                      <div>
                        <span className="text-slate-500 text-[10px] uppercase font-black block">Selected Course</span>
                        <span className="text-slate-900 font-extrabold font-sans mt-0.5 inline-block">{formData.upskillCourse}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase font-black block">Contact No</span>
                          <span className="text-slate-200 mt-0.5 inline-block font-bold">{formData.contactNo}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase font-black block">Residence</span>
                          <span className="text-blue-700 font-black mt-0.5 inline-block">{formData.currentPlaceOfResidence || 'N/A'}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] uppercase font-black block">Secure Channel</span>
                        <span className="text-slate-700 truncate font-sans text-xs tracking-normal mt-0.5 inline-block">{formData.mailId}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t-2 border-slate-950 text-[10px] text-slate-455 leading-relaxed font-light">
                      * System: Initial co-branded AWS Sandbox validation keys are queuing. An educational advisor will trigger direct outreach to <strong>{formData.contactNo}</strong> inside 12 hours.
                    </div>
                  </div>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-mono font-black uppercase tracking-wider text-slate-450 hover:text-slate-900 underline underline-offset-4 cursor-pointer"
                  >
                    Submit another application dossier
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Moving Logo Slider */}
        <div className="mt-20 pt-10 overflow-hidden relative border-t-2 border-gray-200/60">
          <p className="text-center font-mono text-[10px] uppercase tracking-widest text-slate-500 font-extrabold mb-8 relative z-20">
            Educational Partnerships & Affiliations
          </p>
          <div className="relative group">

            
            <div className="flex w-[200%] animate-marquee">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex w-1/2 justify-around items-center">
                  <a href="https://skill-lync.com/" target="_blank" rel="noreferrer" className="flex items-center justify-center opacity-50 hover:opacity-100 transition-all duration-300 hover:scale-105 px-8">
                    <img src="/logos/skill-lync.png" alt="Skill-Lync" className="h-12 object-contain filter drop-shadow-md bg-white/5 rounded-md p-1" onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.nextElementSibling?.classList.remove('hidden') }} />
                    <span className="hidden font-display text-2xl font-black text-slate-900 tracking-widest uppercase">SKILL-LYNC</span>
                  </a>
                  <a href="https://www.crio.do/" target="_blank" rel="noreferrer" className="flex items-center justify-center opacity-50 hover:opacity-100 transition-all duration-300 hover:scale-105 px-8">
                    <img src="/logos/crio.png" alt="Crio.Do" className="h-12 object-contain filter drop-shadow-md bg-white/5 rounded-md p-1" onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.nextElementSibling?.classList.remove('hidden') }} />
                    <span className="hidden font-display text-2xl font-black text-slate-900 tracking-widest">Crio.Do</span>
                  </a>
                  <a href="https://www.kcglobed.com/" target="_blank" rel="noreferrer" className="flex items-center justify-center opacity-50 hover:opacity-100 transition-all duration-300 hover:scale-105 px-8">
                    <img src="/logos/kcglobed.png" alt="KC Globed" className="h-12 object-contain filter drop-shadow-md bg-white/5 rounded-md p-1" onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.nextElementSibling?.classList.remove('hidden') }} />
                    <span className="hidden font-display text-2xl font-black text-slate-900 tracking-widest">KC Globed</span>
                  </a>
                  <a href="https://www.skilledura.com/" target="_blank" rel="noreferrer" className="flex items-center justify-center opacity-50 hover:opacity-100 transition-all duration-300 hover:scale-105 px-8">
                    <img src="/logos/skilledura.png" alt="Skilledura" className="h-12 object-contain filter drop-shadow-md bg-white/5 rounded-md p-1" onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.nextElementSibling?.classList.remove('hidden') }} />
                    <span className="hidden font-display text-2xl font-black text-slate-900 tracking-widest">Skilledura</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
