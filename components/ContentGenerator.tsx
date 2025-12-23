
import React, { useState, useEffect } from 'react';
import { BrandDetails, MarketAnalysis, PostType, GeneratedPost } from '../types';
import { generateContentOptions, generatePostImage, editPostImage } from '../services/geminiService';
import ImageEditorModal from './ImageEditorModal';
import SchedulerModal from './SchedulerModal';

interface Props {
  brand: BrandDetails;
  research: MarketAnalysis;
  postType: PostType;
  onPostsUpdate: (posts: GeneratedPost[]) => void;
  onSchedule: (post: GeneratedPost) => void;
}

const ContentGenerator: React.FC<Props> = ({ brand, research, postType, onPostsUpdate, onSchedule }) => {
  const [posts, setPosts] = useState<GeneratedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<GeneratedPost | null>(null);
  const [schedulingPost, setSchedulingPost] = useState<GeneratedPost | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const options = await generateContentOptions(brand, research, postType);
        setPosts(options);
        onPostsUpdate(options);
        
        // Generate images in parallel
        const updatedPosts = await Promise.all(options.map(async (p) => {
          const img = await generatePostImage(p.imagePrompt);
          return { ...p, imageUrl: img };
        }));
        
        setPosts(updatedPosts);
        onPostsUpdate(updatedPosts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditImage = async (editPrompt: string) => {
    if (!editingPost || !editingPost.imageUrl) return;
    
    try {
      const newImage = await editPostImage(editingPost.imageUrl, editPrompt);
      const updated = posts.map(p => p.id === editingPost.id ? { ...p, imageUrl: newImage } : p);
      setPosts(updated);
      onPostsUpdate(updated);
      setEditingPost(null);
    } catch (err) {
      console.error(err);
      alert("Failed to edit image.");
    }
  };

  const handleScheduled = (post: GeneratedPost, date: string, platforms: string[]) => {
    const updatedPost: GeneratedPost = { ...post, scheduledAt: date, platforms, status: 'scheduled' };
    const updatedPosts = posts.map(p => p.id === post.id ? updatedPost : p);
    setPosts(updatedPosts);
    onPostsUpdate(updatedPosts);
    onSchedule(updatedPost);
    setSchedulingPost(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <h2 className="mt-6 text-2xl font-bold text-slate-800">Generating 6 Post Concepts...</h2>
        <p className="text-slate-500">Writing captions, hashtags, and generating high-quality AI visuals.</p>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Your Generated Content</h2>
        <p className="text-slate-500">6 custom options optimized for growth and brand positioning.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all">
            <div className="relative aspect-square bg-slate-100 flex items-center justify-center">
              {post.imageUrl ? (
                <>
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setEditingPost(post)}
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg hover:bg-indigo-600 hover:text-white transition-all text-slate-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center animate-pulse">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full mb-2"></div>
                  <span className="text-xs text-slate-400 font-medium uppercase">Generating Visual...</span>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase rounded-md">{post.type}</span>
                {post.status === 'scheduled' && (
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase rounded-md">Scheduled</span>
                )}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 truncate">{post.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-3 mb-4">{post.caption}</p>
              
              <div className="flex flex-wrap gap-1 mb-6">
                {post.hashtags.slice(0, 5).map((tag, i) => (
                  <span key={i} className="text-[10px] text-indigo-500 font-medium">#{tag}</span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => {/* View Details */}} 
                  className="py-2 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  View Copy
                </button>
                <button 
                  disabled={post.status === 'scheduled'}
                  onClick={() => setSchedulingPost(post)}
                  className={`py-2 text-sm font-semibold text-white rounded-xl shadow-md transition-all ${post.status === 'scheduled' ? 'bg-slate-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'}`}
                >
                  {post.status === 'scheduled' ? 'Done' : 'Schedule'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingPost && (
        <ImageEditorModal 
          post={editingPost} 
          onClose={() => setEditingPost(null)} 
          onSave={handleEditImage} 
        />
      )}

      {schedulingPost && (
        <SchedulerModal 
          post={schedulingPost} 
          onClose={() => setSchedulingPost(null)} 
          onSchedule={(date, platforms) => handleScheduled(schedulingPost, date, platforms)} 
        />
      )}
    </div>
  );
};

export default ContentGenerator;
