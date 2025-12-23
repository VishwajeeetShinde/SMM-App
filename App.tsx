
import React, { useState, useCallback } from 'react';
import { AppStep, BrandDetails, MarketAnalysis, PostType, GeneratedPost } from './types';
import BrandForm from './components/BrandForm';
import MarketResearchView from './components/MarketResearchView';
import PillarView from './components/PillarView';
import PostTypeSelector from './components/PostTypeSelector';
import ContentGenerator from './components/ContentGenerator';
import Scheduler from './components/Scheduler';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('brand');
  const [brand, setBrand] = useState<BrandDetails | null>(null);
  const [research, setResearch] = useState<MarketAnalysis | null>(null);
  const [selectedPostType, setSelectedPostType] = useState<PostType | null>(null);
  const [generatedPosts, setGeneratedPosts] = useState<GeneratedPost[]>([]);
  const [scheduledPosts, setScheduledPosts] = useState<GeneratedPost[]>([]);

  const handleBrandSubmit = (details: BrandDetails) => {
    setBrand(details);
    setStep('research');
  };

  const handleResearchComplete = (analysis: MarketAnalysis) => {
    setResearch(analysis);
    setStep('pillars');
  };

  const handlePillarsAccepted = () => {
    setStep('typeSelection');
  };

  const handleTypeSelected = (type: PostType) => {
    setSelectedPostType(type);
    setStep('generation');
  };

  const handlePostsGenerated = (posts: GeneratedPost[]) => {
    setGeneratedPosts(posts);
  };

  const handleSchedulePost = (post: GeneratedPost) => {
    setScheduledPosts(prev => [...prev, post]);
  };

  const goToDashboard = () => setStep('dashboard');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
             <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">SocialNexus <span className="text-indigo-600">AI</span></h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <button onClick={() => setStep('brand')} className={`text-sm font-medium ${step === 'brand' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'}`}>New Strategy</button>
          <button onClick={goToDashboard} className={`text-sm font-medium ${step === 'dashboard' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'}`}>My Posts ({scheduledPosts.length})</button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 mt-8">
        <div className="step-transition">
          {step === 'brand' && <BrandForm onSubmit={handleBrandSubmit} />}
          {step === 'research' && brand && (
            <MarketResearchView brand={brand} onComplete={handleResearchComplete} />
          )}
          {step === 'pillars' && research && (
            <PillarView analysis={research} onNext={handlePillarsAccepted} />
          )}
          {step === 'typeSelection' && (
            <PostTypeSelector onSelect={handleTypeSelected} />
          )}
          {step === 'generation' && brand && research && selectedPostType && (
            <ContentGenerator 
              brand={brand} 
              research={research} 
              postType={selectedPostType} 
              onPostsUpdate={handlePostsGenerated}
              onSchedule={handleSchedulePost}
            />
          )}
          {step === 'dashboard' && (
            <Dashboard posts={scheduledPosts} onNew={() => setStep('brand')} />
          )}
        </div>
      </main>

      {/* Footer Navigation (Mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-slate-200 px-6 py-3 flex justify-around">
        <button onClick={() => setStep('brand')} className="flex flex-col items-center gap-1">
          <div className={`p-1 ${step === 'brand' ? 'text-indigo-600' : 'text-slate-400'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 8v8m-4-4h8"/></svg>
          </div>
          <span className="text-[10px] font-medium">Create</span>
        </button>
        <button onClick={goToDashboard} className="flex flex-col items-center gap-1">
          <div className={`p-1 ${step === 'dashboard' ? 'text-indigo-600' : 'text-slate-400'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h.01M3 20h.01M21 20h.01M3 4h18M3 12h18M3 16h18"/></svg>
          </div>
          <span className="text-[10px] font-medium">Posts</span>
        </button>
      </div>
    </div>
  );
};

export default App;
