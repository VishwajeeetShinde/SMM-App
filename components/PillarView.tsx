
import React from 'react';
import { MarketAnalysis } from '../types';

interface Props {
  analysis: MarketAnalysis;
  onNext: () => void;
}

const PillarView: React.FC<Props> = ({ analysis, onNext }) => {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Strategy & Market Insights</h2>
          <p className="text-slate-500">Based on search grounding and competitor analysis.</p>
        </div>
        <button 
          onClick={onNext}
          className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          Confirm Strategy
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Market Research Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-4">Competitor Analysis</h4>
            <p className="text-slate-600 leading-relaxed text-sm">{analysis.competitorsAnalysis}</p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <h4 className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-4">Market Opportunities</h4>
            <p className="text-slate-600 leading-relaxed text-sm">{analysis.marketOpportunities}</p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm md:col-span-2">
            <h4 className="text-sm font-bold text-orange-600 uppercase tracking-wider mb-4">Brand Positioning Advice</h4>
            <p className="text-slate-600 leading-relaxed text-sm">{analysis.brandPositioningAdvice}</p>
          </div>
        </div>

        {/* Sources & Links */}
        <div className="p-6 bg-slate-900 rounded-3xl text-white">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Verified Sources</h4>
          <ul className="space-y-4">
            {analysis.sources.map((source, i) => (
              source.web && (
                <li key={i}>
                  <a 
                    href={source.web.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <p className="text-sm font-medium text-slate-200 group-hover:text-indigo-400 truncate transition-colors">{source.web.title}</p>
                    <p className="text-xs text-slate-500 truncate">{source.web.uri}</p>
                  </a>
                </li>
              )
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-6">Suggested Content Pillars</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analysis.contentPillars.map((pillar, i) => (
            <div key={i} className="group p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:border-indigo-500 transition-all cursor-default">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 font-bold">
                {i + 1}
              </div>
              <h5 className="font-bold text-slate-800 mb-2">{pillar.title}</h5>
              <p className="text-sm text-slate-500 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PillarView;
