
import React from 'react';
import { Curriculum, Course } from '../types';

interface CurriculumDisplayProps {
  curriculum: Curriculum;
}

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
  <div className={`bg-white border-2 rounded-[2.5rem] p-10 shadow-sm hover:shadow-2xl transition-all relative overflow-hidden group border-slate-50 hover:border-indigo-100`}>
    {/* Difficulty Badge */}
    <div className="flex justify-between items-start mb-8">
      <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
        course.difficulty === 'Hard' ? 'bg-red-500 text-white' : course.difficulty === 'Easy' ? 'bg-emerald-500 text-white' : 'bg-indigo-500 text-white'
      }`}>
        {course.difficulty} Focus
      </div>
      <span className="bg-slate-900 text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-tighter">
        {course.code || 'MOD'}
      </span>
    </div>
    
    <div className="mb-8">
      <h4 className="text-3xl font-black text-slate-800 leading-tight mb-4 group-hover:text-indigo-600 transition-colors">{course.name}</h4>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
        <div 
          className={`h-full transition-all duration-1000 ease-out ${
            course.difficulty === 'Hard' ? 'bg-gradient-to-r from-red-400 to-pink-500' : 'bg-gradient-to-r from-emerald-400 to-teal-500'
          }`} 
          style={{ width: course.difficulty === 'Hard' ? '85%' : '40%' }}
        ></div>
      </div>
    </div>
    
    {/* TIME BREAKDOWN SECTION - CLEAR & BOLD */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div className="bg-indigo-600 p-4 rounded-[1.5rem] text-center text-white shadow-lg shadow-indigo-100">
        <div className="text-[9px] font-black text-indigo-200 uppercase tracking-widest mb-1">Daily Budget</div>
        <div className="text-xl font-black">{course.dailyHoursPerSubject}h</div>
        <div className="text-[8px] opacity-70 font-bold uppercase mt-1">Per Day</div>
      </div>
      <div className="bg-slate-50 p-4 rounded-[1.5rem] text-center border border-slate-200">
        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Time Line</div>
        <div className="text-xl font-black text-slate-800">{course.estimatedDaysToComplete}d</div>
        <div className="text-[8px] opacity-70 font-bold uppercase mt-1">Duration</div>
      </div>
      <div className="bg-emerald-600 p-4 rounded-[1.5rem] text-center text-white shadow-lg shadow-emerald-100">
        <div className="text-[9px] font-black text-emerald-100 uppercase tracking-widest mb-1">Total Effort</div>
        <div className="text-xl font-black">{course.totalSessionHours}h</div>
        <div className="text-[8px] opacity-70 font-bold uppercase mt-1">Full Session</div>
      </div>
    </div>

    <div className="flex items-center gap-3 mb-8 bg-slate-900 px-6 py-4 rounded-2xl shadow-xl shadow-slate-100">
      <div className="text-2xl">📚</div>
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none">Curriculum</span>
        <span className="text-lg font-black text-white">{course.lessonsCount} Structured Lessons</span>
      </div>
    </div>

    <p className="text-slate-500 text-sm mb-10 leading-relaxed font-medium">
      {course.description}
    </p>

    {/* Winning Strategy: Clear Cut & Prominent */}
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-[2rem] mb-10 shadow-2xl shadow-indigo-200 transform group-hover:scale-[1.02] transition-transform">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-indigo-600 text-xl shadow-lg">⚡</div>
        <h5 className="text-[10px] font-black text-indigo-200 uppercase tracking-[0.2em] mb-0 leading-none">Personal Strategy</h5>
      </div>
      <p className="text-md text-white leading-relaxed font-bold border-l-4 border-indigo-400 pl-4 py-1 italic">
        "{course.recommendedStudyStrategy}"
      </p>
    </div>

    <div>
      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Key Pillar Topics</h5>
      <div className="flex flex-wrap gap-2">
        {course.topics.map((topic, idx) => (
          <span key={idx} className="bg-white text-slate-800 px-4 py-2 rounded-xl border-2 border-slate-50 text-xs font-black hover:border-indigo-500 hover:text-indigo-600 transition-all cursor-default">
            {topic}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export const CurriculumDisplay: React.FC<CurriculumDisplayProps> = ({ curriculum }) => {
  const handlePrint = () => window.print();

  return (
    <div className="space-y-16 animate-in fade-in duration-700 pb-24">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600"></div>
        <div className="space-y-6 flex-grow">
          <div className="inline-flex items-center gap-3 bg-slate-900 text-white px-6 py-2.5 rounded-full shadow-2xl">
            <span className="text-xl">📊</span>
            <span className="font-black uppercase tracking-[0.2em] text-[10px]">Strategic Syllabus</span>
          </div>
          <div>
            <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-4">
              {curriculum.skill}
            </h2>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3 bg-indigo-50 px-5 py-3 rounded-2xl border border-indigo-100">
                <span className="text-2xl font-black text-indigo-600">{curriculum.semesters.length}</span>
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-tight">Mastery<br/>Phases</span>
              </div>
              <div className="flex items-center gap-3 bg-orange-600 text-white px-5 py-3 rounded-2xl border border-orange-100 shadow-xl shadow-orange-100">
                <span className="text-2xl font-black">{curriculum.dailyHours}h</span>
                <span className="text-[10px] font-black text-orange-200 uppercase tracking-widest leading-tight">Total Daily<br/>Budget</span>
              </div>
              <div className="flex items-center gap-3 bg-emerald-50 px-5 py-3 rounded-2xl border border-emerald-100">
                <span className="text-2xl font-black text-emerald-600">~{curriculum.timeDistributionSummary.estimatedTotalDays}d</span>
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest leading-tight">Total<br/>Timeline</span>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={handlePrint}
          className="lg:self-center px-12 py-6 bg-indigo-600 text-white rounded-[2rem] font-black hover:bg-slate-900 transition-all flex items-center gap-4 shadow-[0_20px_50px_rgba(99,102,241,0.3)] group"
        >
          <span className="text-2xl group-hover:scale-125 transition-transform">📄</span>
          <span className="uppercase tracking-[0.2em] text-xs">Download Study Kit</span>
        </button>
      </div>

      {/* Global Strategy Callout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-[60px] rounded-full group-hover:bg-indigo-500/40 transition-all"></div>
          <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
            Critical Path: Hard Subjects
          </h4>
          <p className="text-2xl font-black leading-tight">
            {curriculum.timeDistributionSummary.hardSubjectAllocation}
          </p>
        </div>
        <div className="bg-white border-4 border-emerald-50 p-10 rounded-[3rem] shadow-xl relative group">
          <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            Efficiency Mode: Easy Subjects
          </h4>
          <p className="text-2xl font-black text-slate-800 leading-tight">
            {curriculum.timeDistributionSummary.easySubjectAllocation}
          </p>
        </div>
      </div>

      {/* Course Phases */}
      <div className="space-y-32">
        {curriculum.semesters.map((semester) => (
          <div key={semester.number}>
            <div className="flex items-center gap-10 mb-16">
              <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 text-white w-20 h-20 rounded-[2rem] flex items-center justify-center font-black text-3xl shadow-2xl shadow-indigo-200 rotate-6 transform hover:rotate-0 transition-transform">
                {semester.number}
              </div>
              <div>
                <h3 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">
                  Phase 0{semester.number}
                </h3>
                <p className="text-indigo-400 font-black uppercase text-xs tracking-[0.4em] mt-1">Foundational Sprint</p>
              </div>
              <div className="flex-grow border-b-8 border-dotted border-slate-100 ml-10"></div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
              {semester.courses.map((course, idx) => (
                <CourseCard key={idx} course={course} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Final Project Highlight */}
      <div className="bg-slate-900 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.2)]">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/50 to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-block bg-indigo-500 text-[10px] font-black px-6 py-2 rounded-full mb-10 tracking-[0.3em] uppercase shadow-lg">
            Final Graduation Challenge
          </div>
          <h3 className="text-6xl font-black mb-8 leading-none tracking-tighter">{curriculum.capstoneProject.title}</h3>
          <p className="text-indigo-100 text-xl mb-14 font-medium leading-relaxed max-w-2xl mx-auto opacity-90">
            {curriculum.capstoneProject.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {curriculum.capstoneProject.outcomes.map((outcome, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4 bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all group">
                <span className="text-4xl group-hover:scale-125 transition-transform duration-500">✅</span>
                <span className="text-xs font-black uppercase tracking-widest leading-tight text-white/80">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
