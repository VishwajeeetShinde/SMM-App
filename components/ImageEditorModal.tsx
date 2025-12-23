
import React, { useState } from 'react';
import { GeneratedPost } from '../types';

interface Props {
  post: GeneratedPost;
  onClose: () => void;
  onSave: (editPrompt: string) => void;
}

const ImageEditorModal: React.FC<Props> = ({ post, onClose, onSave }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    await onSave(prompt);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-800">Edit Post Visual</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="aspect-square w-48 mx-auto rounded-2xl overflow-hidden shadow-inner bg-slate-50 border border-slate-100">
            <img src={post.imageUrl} alt="Original" className="w-full h-full object-cover" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">What would you like to change?</label>
              <textarea 
                required
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm resize-none"
                placeholder="e.g. Add a retro filter, change the background to a beach, or make the colors more vibrant..."
                rows={3}
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
              />
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-4 font-bold rounded-xl text-white shadow-lg transition-all ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]'}`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  AI Processing...
                </span>
              ) : 'Apply AI Edit'}
            </button>
          </form>
          
          <div className="p-4 bg-indigo-50 rounded-2xl">
            <p className="text-xs text-indigo-700 leading-relaxed">
              <strong>Tip:</strong> Be specific! Gemini 2.5 Flash Image works best with descriptive instructions about colors, objects, or mood.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditorModal;
