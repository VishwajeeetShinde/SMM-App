
import React, { useEffect, useState } from 'react';
import { BrandDetails, MarketAnalysis } from '../types';
import { performMarketResearch } from '../services/geminiService';

interface Props {
  brand: BrandDetails;
  onComplete: (analysis: MarketAnalysis) => void;
}

const MarketResearchView: React.FC<Props> = ({ brand, onComplete }) => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Analyzing your industry...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const runResearch = async () => {
      try {
        setStatus("Scanning competitor trends...");
        const result = await performMarketResearch(brand);
        setStatus("Identifying market opportunities...");
        onComplete(result);
      } catch (err: any) {
        console.error(err);
        setError("Market research failed. This could be due to API limits or network issues.");
        setLoading(false);
      }
    };
    runResearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="max-w-md mx-auto text-center p-8 bg-red-50 border border-red-200 rounded-3xl">
        <div className="text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </div>
        <h3 className="text-lg font-bold text-red-800">Research Error</h3>
        <p className="text-red-600 mb-6">{error}</p>
        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-red-600 text-white rounded-full">Try Again</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative">
        <div className="w-32 h-32 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
           <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-indigo-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>
      <h2 className="mt-8 text-2xl font-bold text-slate-800">{status}</h2>
      <p className="mt-2 text-slate-500 max-w-sm text-center">Using Gemini Search Grounding to get real-time data from the web.</p>
      
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
        {['Competitors', 'Market Sentiment', 'Trending Topics', 'Gap Analysis'].map((item, i) => (
          <div key={item} className={`p-4 rounded-2xl border flex items-center gap-3 transition-opacity duration-1000 ${loading ? 'opacity-50' : 'opacity-100'}`} style={{transitionDelay: `${i * 200}ms`}}>
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></div>
            <span className="text-sm font-medium text-slate-600">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketResearchView;
