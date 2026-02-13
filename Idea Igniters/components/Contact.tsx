
import React from 'react';

export const Contact: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 animate-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Get In Touch</h2>
        <p className="text-slate-500">Have questions or feedback? We'd love to hear from you!</p>
      </div>

      <form className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
            <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="john@example.com" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Subject</label>
          <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Curriculum Partnership" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Message</label>
          <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your message here..."></textarea>
        </div>
        <button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
          Send Message
        </button>
      </form>
    </div>
  );
};
