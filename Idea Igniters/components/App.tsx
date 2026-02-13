
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CurriculumForm } from './components/CurriculumForm';
import { CurriculumDisplay } from './components/CurriculumDisplay';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { generateCurriculum } from './services/geminiService';
import { AppSection, GeneratorInputs, Curriculum } from './types';

const App: React.FC = () => {
  const [section, setSection] = useState<AppSection>(AppSection.HOME);
  const [loading, setLoading] = useState(false);
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (inputs: GeneratorInputs) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateCurriculum(inputs);
      setCurriculum(result);
      // Scroll to top of results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setError('Failed to generate curriculum. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderSection = () => {
    switch (section) {
      case AppSection.HOME:
        return <Hero onStart={() => setSection(AppSection.GENERATOR)} />;
      case AppSection.GENERATOR:
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <CurriculumForm onGenerate={handleGenerate} isLoading={loading} />
                
                {error && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 text-sm">
                    <span className="text-lg">⚠️</span>
                    <p>{error}</p>
                  </div>
                )}
                
                {!curriculum && !loading && !error && (
                  <div className="mt-8 bg-slate-900 p-8 rounded-3xl text-center text-white">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                      🚀
                    </div>
                    <h3 className="text-xl font-bold mb-2">Build Your Vision</h3>
                    <p className="text-slate-400 text-sm mb-6">Create industry-aligned curricula with AI in seconds.</p>
                    <div className="flex flex-col gap-2 text-xs text-slate-500 uppercase font-black tracking-widest">
                      <span>✓ AI-Powered Design</span>
                      <span>✓ Flexible Durations</span>
                      <span>✓ Industry-Focused</span>
                      <span>✓ Export Ready</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="lg:col-span-8">
                {curriculum ? (
                  <CurriculumDisplay curriculum={curriculum} />
                ) : (
                  <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-100/50 rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center text-slate-400">
                    <svg className="w-20 h-20 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-lg font-medium">No curriculum generated yet.</p>
                    <p className="text-sm">Enter the details on the left to start generating your custom learning path.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case AppSection.ABOUT:
        return <About />;
      case AppSection.CONTACT:
        return <Contact />;
      default:
        return <Hero onStart={() => setSection(AppSection.GENERATOR)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentSection={section} setSection={setSection} />
      
      <main className="flex-grow">
        {renderSection()}
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 print:hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold mr-2 text-sm">C</div>
            <span className="text-lg font-bold text-slate-800">CurrHub</span>
          </div>
          <p className="text-slate-500 text-sm mb-8">
            © {new Date().getFullYear()} SmartBridge SkillWallet - GenAI Curriculum Generator. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 text-slate-400">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
