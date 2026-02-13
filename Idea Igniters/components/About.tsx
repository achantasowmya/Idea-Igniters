
import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">About CurrHub</h2>
      
      <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
        <p className="mb-6">
          GenAI Curriculum Generator is an intelligent curriculum design platform that leverages 
          state-of-the-art Large Language Models (LLMs) to provide comprehensive educational 
          curriculum generation and planning recommendations.
        </p>
        
        <p className="mb-6">
          The platform addresses the challenge of accurate curriculum design by delivering 
          AI-powered insights, detailed course structures, topic recommendations, and 
          semester-wise syllabi. Whether you're a bootcamp founder, a university professor, 
          or an HR lead planning training, CurrHub scales to your needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Why Choose CurrHub?</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="text-indigo-600 font-bold">●</span>
                <span>Industry-aligned learning outcomes</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-indigo-600 font-bold">●</span>
                <span>Logical skill progression analysis</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-indigo-600 font-bold">●</span>
                <span>Flexible duration and intensity</span>
              </li>
            </ul>
          </div>
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Our Technology</h3>
            <p className="text-sm">
              We utilize Gemini's reasoning capabilities to analyze educational parameters and 
              generate accurate course names, descriptions, and credits. The system ensures 
              high-quality guidance through sophisticated educational algorithms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
