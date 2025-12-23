
import React from 'react';
import { GeneratedPost } from '../types';

interface Props {
  posts: GeneratedPost[];
  onNew: () => void;
}

const Dashboard: React.FC<Props> = ({ posts, onNew }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Content Calendar</h2>
          <p className="text-slate-500">Tracking your scheduled and published AI-generated content.</p>
        </div>
        <button 
          onClick={onNew}
          className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Create New Content
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-200 border-dashed rounded-3xl">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-200 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800">No posts scheduled yet</h3>
          <p className="text-slate-500 mt-2">Generate some content to see it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
               <div className="aspect-[4/3] relative">
                  <img src={post.imageUrl} className="w-full h-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">{post.type}</p>
                    <h4 className="font-bold truncate">{post.title}</h4>
                  </div>
               </div>
               <div className="p-6">
                 <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-slate-500">Scheduled for</span>
                    <span className="text-sm font-bold text-indigo-600">{new Date(post.scheduledAt || "").toLocaleDateString()} at {new Date(post.scheduledAt || "").toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                 </div>
                 <div className="flex gap-2">
                    {post.platforms?.map(p => (
                      <div key={p} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold">{p}</div>
                    ))}
                 </div>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
