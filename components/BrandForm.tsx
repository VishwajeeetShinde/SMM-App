
import React, { useState } from 'react';
import { BrandDetails } from '../types';

interface Props {
  onSubmit: (details: BrandDetails) => void;
}

const BrandForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<BrandDetails>({
    name: '',
    industry: '',
    targetAudience: '',
    tone: 'Professional & Friendly',
    uniqueValueProp: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200 p-8 md:p-12 border border-slate-100">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Build Your Brand Identity</h2>
        <p className="text-slate-500">Tell us about your brand so our AI can perform targeted market research.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Brand Name</label>
            <input 
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="e.g. EcoSpark"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Industry</label>
            <input 
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="e.g. Sustainable Energy"
              value={formData.industry}
              onChange={e => setFormData({...formData, industry: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 ml-1">Target Audience</label>
          <input 
            required
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="e.g. Eco-conscious homeowners aged 25-45"
            value={formData.targetAudience}
            onChange={e => setFormData({...formData, targetAudience: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 ml-1">Tone of Voice</label>
          <select 
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            value={formData.tone}
            onChange={e => setFormData({...formData, tone: e.target.value})}
          >
            <option>Professional & Friendly</option>
            <option>Witty & Sarcastic</option>
            <option>Inspirational & Uplifting</option>
            <option>Minimalist & Elegant</option>
            <option>Bold & Aggressive</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 ml-1">Unique Value Proposition</label>
          <textarea 
            required
            rows={3}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
            placeholder="What makes you special?"
            value={formData.uniqueValueProp}
            onChange={e => setFormData({...formData, uniqueValueProp: e.target.value})}
          />
        </div>

        <button 
          type="submit"
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition-all transform hover:-translate-y-1"
        >
          Research Market & Competitors
        </button>
      </form>
    </div>
  );
};

export default BrandForm;
