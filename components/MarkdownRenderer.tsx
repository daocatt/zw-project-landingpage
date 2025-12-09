import React from 'react';

// A lightweight custom renderer to simulate markdown parsing without heavy external deps
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split('\n');

  return (
    <div className="space-y-4 text-slate-700 leading-relaxed">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={index} className="h-2" />;

        // Image: ![alt](src) - Simple regex check for standalone images
        const imageMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (imageMatch) {
            return (
                <div key={index} className="my-6">
                    <img 
                        src={imageMatch[2]} 
                        alt={imageMatch[1]} 
                        className="rounded-lg shadow-md max-w-full mx-auto"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                    {imageMatch[1] && <p className="text-center text-sm text-slate-500 mt-2 italic">{imageMatch[1]}</p>}
                </div>
            );
        }

        if (trimmed.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold text-slate-900 mt-8 mb-4">{trimmed.substring(2)}</h1>;
        }
        if (trimmed.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-semibold text-slate-900 mt-6 mb-3">{trimmed.substring(3)}</h2>;
        }
        if (trimmed.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-semibold text-slate-800 mt-4 mb-2">{trimmed.substring(4)}</h3>;
        }
        if (trimmed.startsWith('- ')) {
          return (
            <div key={index} className="flex items-start ml-4">
              <span className="mr-2 text-indigo-500">•</span>
              <span>{parseInline(trimmed.substring(2))}</span>
            </div>
          );
        }
        if (trimmed.startsWith('> ')) {
          return (
            <blockquote key={index} className="border-l-4 border-indigo-500 pl-4 italic text-slate-600 my-4">
              {parseInline(trimmed.substring(2))}
            </blockquote>
          );
        }
        // Paragraph
        return <p key={index} className="mb-2">{parseInline(trimmed)}</p>;
      })}
    </div>
  );
};

// Helper to handle bold (**text**)
const parseInline = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

export default MarkdownRenderer;