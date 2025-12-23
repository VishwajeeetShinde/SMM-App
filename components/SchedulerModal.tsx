
import React, { useState } from 'react';
import { GeneratedPost } from '../types';

interface Props {
  post: GeneratedPost;
  onClose: () => void;
  onSchedule: (date: string, platforms: string[]) => void;
}

const SchedulerModal: React.FC<Props> = ({ post, onClose, onSchedule }) => {
  const [date, setDate] = useState("");
  const [platforms, setPlatforms] = useState<string[]>(['Instagram', 'LinkedIn']);
  
  const availablePlatforms = ['Instagram', 'Facebook', 'X', 'Threads', 'LinkedIn'];

  const togglePlatform = (p: string) => {
    setPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-800">Schedule Post</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Select Date & Time</label>
            <input 
              required
              type="datetime-local" 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700">Optimize for Platforms</label>
            <div className="grid grid-cols-2 gap-2">
              {availablePlatforms.map(p => (
                <button
                  key={p}
                  onClick={() => togglePlatform(p)}
                  className={`p-3 text-sm font-medium rounded-xl border transition-all ${platforms.includes(p) ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm' : 'bg-white border-slate-200 text-slate-500'}`}
                >
                  {p}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 italic">Images will be auto-resized for each selected platform's aspect ratio requirements.</p>
          </div>

          <button 
            disabled={!date || platforms.length === 0}
            onClick={() => onSchedule(date, platforms)}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg transition-all"
          >
            Confirm & Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchedulerModal;
