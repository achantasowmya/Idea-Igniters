
import React, { useState } from 'react';
import { GeneratorInputs, SubjectDetail } from '../types';

interface CurriculumFormProps {
  onGenerate: (inputs: GeneratorInputs) => void;
  isLoading: boolean;
}

export const CurriculumForm: React.FC<CurriculumFormProps> = ({ onGenerate, isLoading }) => {
  const [step, setStep] = useState(1);
  const [skill, setSkill] = useState('');
  const [courseLevel, setCourseLevel] = useState('');
  const [subjectInput, setSubjectInput] = useState('');
  const [subjects, setSubjects] = useState<SubjectDetail[]>([]);
  const [dailyHours, setDailyHours] = useState(4);
  const [completionGoal, setCompletionGoal] = useState('');
  const [industryFocus, setIndustryFocus] = useState('');

  const addSubjects = () => {
    const names = subjectInput.split(',').map(s => s.trim()).filter(s => s.length > 0);
    const newSubjects: SubjectDetail[] = names.map(name => ({
      name,
      difficulty: 'Medium',
      lessons: 10
    }));
    setSubjects([...subjects, ...newSubjects]);
    setSubjectInput('');
  };

  const updateSubject = (index: number, updates: Partial<SubjectDetail>) => {
    const updated = [...subjects];
    updated[index] = { ...updated[index], ...updates };
    setSubjects(updated);
  };

  const removeSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      skill,
      courseLevel,
      subjects,
      dailyHours,
      completionGoal,
      industryFocus
    });
  };

  const totalSteps = 5;

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden max-w-4xl mx-auto transition-all duration-500">
      {/* Dynamic Progress Bar */}
      <div className="flex h-3 w-full bg-slate-100">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-700 ease-out shadow-[0_0_20px_rgba(99,102,241,0.5)]" 
          style={{ width: `${(step / totalSteps) * 100}%` }}
        ></div>
      </div>

      <div className="p-8 sm:p-14">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Build Your Path</h2>
            <p className="text-indigo-500 font-bold uppercase tracking-[0.2em] text-xs">Phase {step} of {totalSteps}</p>
          </div>
          <div className="hidden sm:flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 font-black text-2xl shadow-inner">
            {step}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10 min-h-[350px]">
          {/* Step 1: Skill / Domain */}
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-500">
              <div className="bg-indigo-600 p-1.5 rounded-3xl inline-block shadow-lg mb-2">
                <span className="text-white font-black px-4 py-1 uppercase text-[10px] tracking-widest">Entry Point</span>
              </div>
              <label className="block text-3xl font-black text-slate-800 tracking-tight">What is the core Skill or Domain?</label>
              <input
                type="text" required placeholder="e.g., Artificial Intelligence, Modern Design"
                className="w-full px-8 py-6 rounded-3xl bg-indigo-50 border-4 border-transparent focus:border-indigo-400 focus:bg-white outline-none transition-all text-2xl font-bold placeholder:text-indigo-200"
                value={skill} onChange={(e) => setSkill(e.target.value)}
                autoFocus
              />
              <p className="text-slate-400 font-medium">Be specific to get a more accurate study structure.</p>
            </div>
          )}

          {/* Step 2: Course Level */}
          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-500">
              <div className="bg-purple-600 p-1.5 rounded-3xl inline-block shadow-lg mb-2">
                <span className="text-white font-black px-4 py-1 uppercase text-[10px] tracking-widest">Target Tier</span>
              </div>
              <label className="block text-3xl font-black text-slate-800 tracking-tight">Define the Course Title or Level.</label>
              <input
                type="text" required placeholder="e.g., Senior Engineer Track, Mastery Prep"
                className="w-full px-8 py-6 rounded-3xl bg-purple-50 border-4 border-transparent focus:border-purple-400 focus:bg-white outline-none transition-all text-2xl font-bold placeholder:text-purple-200"
                value={courseLevel} onChange={(e) => setCourseLevel(e.target.value)}
                autoFocus
              />
              <p className="text-slate-400 font-medium">This helps us adjust the complexity of the generated lessons.</p>
            </div>
          )}

          {/* Step 3: Subjects + Difficulty + Lessons */}
          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">
              <div className="bg-emerald-500 p-1.5 rounded-3xl inline-block shadow-lg mb-2">
                <span className="text-white font-black px-4 py-1 uppercase text-[10px] tracking-widest">Content Mapping</span>
              </div>
              <label className="block text-3xl font-black text-slate-800 tracking-tight">Break it down into Subjects.</label>
              
              <div className="flex gap-4">
                <input
                  type="text" placeholder="Add multiple (comma separated)"
                  className="flex-grow px-8 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-400 outline-none transition-all font-bold"
                  value={subjectInput} onChange={(e) => setSubjectInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSubjects())}
                />
                <button type="button" onClick={addSubjects} className="px-10 py-5 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100">ADD</button>
              </div>

              <div className="grid grid-cols-1 gap-4 max-h-[320px] overflow-y-auto pr-4 custom-scrollbar">
                {subjects.map((sub, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-[2rem] border-2 border-slate-50 shadow-sm hover:shadow-md transition-all group">
                    <span className="flex-grow font-black text-xl text-slate-800">{sub.name}</span>
                    <div className="flex items-center gap-6">
                      <div className="flex bg-slate-100 p-1 rounded-2xl">
                        {(['Easy', 'Medium', 'Hard'] as const).map(d => (
                          <button
                            key={d} type="button"
                            onClick={() => updateSubject(idx, { difficulty: d })}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                              sub.difficulty === d 
                                ? d === 'Hard' ? 'bg-red-500 text-white shadow-lg shadow-red-100' : d === 'Easy' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-indigo-500 text-white shadow-lg shadow-indigo-100'
                                : 'text-slate-400 hover:text-slate-600'
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] font-black text-slate-300 uppercase mb-1">Lessons</label>
                        <input
                          type="number" className="w-20 px-3 py-2 bg-slate-50 border rounded-xl text-center font-black"
                          value={sub.lessons} onChange={(e) => updateSubject(idx, { lessons: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                      <button type="button" onClick={() => removeSubject(idx)} className="text-slate-200 hover:text-red-500 transition-colors text-xl">✕</button>
                    </div>
                  </div>
                ))}
                {subjects.length === 0 && (
                  <div className="text-center py-10 border-4 border-dashed border-slate-100 rounded-[2rem]">
                    <p className="text-slate-300 font-bold">No subjects added yet. Let's start building!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Time per Day */}
          {step === 4 && (
            <div className="space-y-10 animate-in slide-in-from-right-8 fade-in duration-500">
              <div className="bg-orange-500 p-1.5 rounded-3xl inline-block shadow-lg mb-2">
                <span className="text-white font-black px-4 py-1 uppercase text-[10px] tracking-widest">Time Commitment</span>
              </div>
              <label className="block text-3xl font-black text-slate-800 tracking-tight">How many hours per day?</label>
              
              <div className="bg-slate-50 p-12 rounded-[3rem] text-center relative">
                <input
                  type="range" min="1" max="16" step="0.5"
                  className="w-full h-4 bg-orange-100 rounded-full appearance-none cursor-pointer accent-orange-600"
                  value={dailyHours} onChange={(e) => setDailyHours(parseFloat(e.target.value))}
                />
                <div className="mt-10 flex items-center justify-center gap-4">
                  <div className="text-[8rem] leading-none font-black text-orange-600 tracking-tighter drop-shadow-xl">{dailyHours}</div>
                  <div className="flex flex-col items-start">
                    <span className="text-2xl font-black text-orange-400 uppercase">Hours</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Per Study Day</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Industry Preference</label>
                  <input
                    type="text" placeholder="e.g., Fintech, Startups"
                    className="w-full px-6 py-4 rounded-2xl bg-teal-50 border-2 border-transparent focus:border-teal-400 outline-none transition-all font-bold"
                    value={industryFocus} onChange={(e) => setIndustryFocus(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Goal for completion */}
          {step === 5 && (
            <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500 text-center">
              <div className="bg-pink-500 p-1.5 rounded-3xl inline-block shadow-lg mb-2">
                <span className="text-white font-black px-4 py-1 uppercase text-[10px] tracking-widest">The Finish Line</span>
              </div>
              <label className="block text-3xl font-black text-slate-800 tracking-tight">What is your Goal Duration?</label>
              
              <div className="max-w-xl mx-auto space-y-8">
                <input
                  type="text" required placeholder="e.g., 30 Days Challenge"
                  className="w-full px-10 py-12 rounded-[2.5rem] bg-pink-50 border-4 border-pink-100 focus:border-pink-500 focus:bg-white outline-none transition-all text-4xl font-black text-center placeholder:text-pink-200 shadow-inner"
                  value={completionGoal} onChange={(e) => setCompletionGoal(e.target.value)}
                  autoFocus
                />
                <div className="grid grid-cols-2 gap-4">
                  {['Intensive (2 Weeks)', 'Standard (3 Months)', 'Fast Track (45 Days)', 'Self-Paced'].map(tag => (
                    <button 
                      key={tag} type="button" 
                      onClick={() => setCompletionGoal(tag)} 
                      className="px-6 py-4 bg-white border-2 border-pink-100 text-pink-600 rounded-2xl text-xs font-black hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all uppercase tracking-widest"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-12 border-t border-slate-50 flex justify-between items-center">
            <div className="flex-1">
              {step > 1 && (
                <button 
                  type="button" 
                  onClick={() => setStep(step - 1)} 
                  className="px-8 py-4 text-slate-300 font-black hover:text-indigo-600 transition-all uppercase tracking-[0.2em] text-xs flex items-center gap-2 group"
                >
                  <span className="group-hover:-translate-x-1 transition-transform">←</span> Previous
                </button>
              )}
            </div>
            
            <div className="flex-1 flex justify-end">
              {step < totalSteps ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={step === 3 && subjects.length === 0}
                  className="px-12 py-5 bg-slate-900 text-white rounded-3xl font-black hover:bg-indigo-600 transition-all shadow-2xl uppercase tracking-[0.2em] text-xs flex items-center gap-3 active:scale-95 disabled:bg-slate-200"
                >
                  Continue <span className="text-lg">→</span>
                </button>
              ) : (
                <button
                  type="submit" disabled={isLoading || subjects.length === 0}
                  className={`px-16 py-6 rounded-[2rem] font-black text-white shadow-[0_20px_50px_rgba(99,102,241,0.4)] transition-all flex items-center justify-center gap-4 uppercase tracking-[0.3em] text-sm ${
                    isLoading ? 'bg-slate-300' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 active:scale-95'
                  }`}
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      GENERATE MASTERPLAN <span className="text-xl">✨</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
