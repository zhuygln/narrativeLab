'use client';

import React from 'react';
import { Node } from '@/schema/story';
import { ExternalLink, Calendar, MapPin, Tag } from 'lucide-react';

interface StoryPanelProps {
    node?: Node;
    onClose?: () => void;
}

export default function StoryPanel({ node, onClose }: StoryPanelProps) {
    if (!node) {
        return (
            <div className="h-full flex items-center justify-center p-8 text-center text-slate-400 bg-white border-l border-slate-200">
                <div className="space-y-4">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                        <Tag size={24} className="text-slate-300" />
                    </div>
                    <p className="text-lg font-medium text-slate-500">No node selected</p>
                    <p className="text-sm">Click a node on the timeline to view details, context, and citations.</p>
                </div>
            </div>
        );
    }

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'event': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'actor': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'claim': return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'policy': return 'bg-violet-100 text-violet-800 border-violet-200';
            default: return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    return (
        <div className="h-full flex flex-col bg-white border-l border-slate-200 shadow-lg overflow-hidden animate-in slide-in-from-right-8 duration-300">
            <div className="p-6 border-b border-slate-100">
                <div className="flex justify-between items-start mb-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border uppercase tracking-wider ${getTypeColor(node.type)}`}>
                        {node.type}
                    </span>
                    {onClose && (
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                            &times;
                        </button>
                    )}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-3">
                    {node.title}
                </h2>

                <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium">
                    {node.date && (
                        <div className="flex items-center gap-1.5">
                            <Calendar size={16} />
                            <time>{new Date(node.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                        </div>
                    )}
                    {node.lane && (
                        <div className="flex items-center gap-1.5">
                            <MapPin size={16} />
                            <span>{node.lane}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <section>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Summary</h3>
                    <p className="text-slate-700 leading-relaxed text-[15px]">
                        {node.summary}
                    </p>
                </section>

                {node.sources && node.sources.length > 0 && (
                    <section>
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Citations & Evidence</h3>
                        <ul className="space-y-4">
                            {node.sources.map((source, idx) => (
                                <li key={idx} className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-semibold text-slate-900 text-sm">{source.publisher}</span>
                                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 text-xs font-medium">
                                            Source <ExternalLink size={12} />
                                        </a>
                                    </div>
                                    {source.quote_snippet && (
                                        <blockquote className="text-sm text-slate-600 italic border-l-2 border-slate-300 pl-3 py-1 my-2">
                                            "{source.quote_snippet}"
                                        </blockquote>
                                    )}
                                    {source.date && (
                                        <div className="text-xs text-slate-400 mt-2">
                                            {new Date(source.date).toLocaleDateString()}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    );
}
