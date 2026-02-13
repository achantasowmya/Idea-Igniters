
import React from 'react';
import { AppSection } from '../types';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6">
          Transform Skills into <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Syllabus</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl mx-auto">
          GenAI Curriculum Generator is an intelligent design platform that creates logical course progressions, detailed topic plans, and learning outcomes in minutes.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={onStart}
            className="rounded-full bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-xl hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all transform hover:scale-105 active:scale-95"
          >
            Get Started Free
          </button>
          <a href="#features" className="text-sm font-semibold leading-6 text-white hover:text-indigo-300 transition-colors">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            { title: 'Lightning Fast', desc: 'Generate complete syllabi in seconds with advanced AI models.', icon: '⚡' },
            { title: 'Precision Focused', desc: 'Industry-aligned curricula tailored to your specific goals.', icon: '🎯' },
            { title: 'Structured Learning', desc: 'Logical semester-wise organization of courses and credits.', icon: '📚' }
          ].map((feature, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
