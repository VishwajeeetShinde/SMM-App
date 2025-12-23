
import React from 'react';
import { PostType } from '../types';

interface Props {
  onSelect: (type: PostType) => void;
}

const PostTypeSelector: React.FC<Props> = ({ onSelect }) => {
  const types: { label: PostType; description: string; icon: string }[] = [
    { label: 'Single Image', description: 'Impactful visuals with short descriptions.', icon: '📸' },
    { label: 'Carousel', description: 'Best for education and step-by-step guides.', icon: '📑' },
    { label: 'Continuation Carousel', description: 'Stories that flow from slide to slide.', icon: '🔄' },
    { label: 'Infographic', description: 'Data-driven, shareable knowledge.', icon: '📊' },
    { label: 'Guide', description: 'Deep dives into specific brand topics.', icon: '📖' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Select Your Content Format</h2>
        <p className="text-slate-500">What kind of posts should we generate for you today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {types.map((t) => (
          <button
            key={t.label}
            onClick={() => onSelect(t.label)}
            className="group p-8 bg-white border border-slate-200 rounded-3xl text-left hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-50 transition-all"
          >
            <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform">{t.icon}</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{t.label}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{t.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostTypeSelector;
