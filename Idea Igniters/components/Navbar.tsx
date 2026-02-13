
import React from 'react';
import { AppSection } from '../types';

interface NavbarProps {
  currentSection: AppSection;
  setSection: (section: AppSection) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentSection, setSection }) => {
  const navItems = [
    { label: 'Home', id: AppSection.HOME },
    { label: 'Generator', id: AppSection.GENERATOR },
    { label: 'About', id: AppSection.ABOUT },
    { label: 'Contact', id: AppSection.CONTACT },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => setSection(AppSection.HOME)}
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-3 shadow-indigo-200 shadow-lg group-hover:scale-110 transition-transform">
              C
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">CurrHub</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentSection === item.id 
                    ? 'text-indigo-600' 
                    : 'text-slate-600 hover:text-indigo-500'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <button className="text-slate-600 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
