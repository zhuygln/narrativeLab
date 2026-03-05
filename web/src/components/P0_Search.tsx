'use client';

import React, { useState } from 'react';
import { Search, Mic, Link as LinkIcon } from 'lucide-react';

interface P0Props {
    onSearch: (query: string) => void;
}

export default function P0_Search({ onSearch }: P0Props) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[100dvh] px-6 bg-ivory">
            <div className="w-full max-w-md space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-playfair font-bold text-slate-900 tracking-tight">Narrative Lab</h1>
                    <p className="text-slate-500 font-sans tracking-wide">Context before conclusion.</p>
                </div>

                <form onSubmit={handleSubmit} className="relative w-full shadow-sm rounded-full bg-white flex items-center px-4 py-3 border border-slate-200">
                    <Search size={20} className="text-slate-400 mr-3 shrink-0" />
                    <input
                        type="text"
                        className="flex-1 bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 font-sans"
                        placeholder="Search an event, paste a URL..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="flex items-center gap-3 shrink-0 ml-3 border-l border-slate-200 pl-3">
                        <button type="button" className="text-slate-400 hover:text-slate-600 transition-colors"><Mic size={20} /></button>
                        <button type="button" className="text-slate-400 hover:text-slate-600 transition-colors"><LinkIcon size={20} /></button>
                    </div>
                </form>

                <div className="flex justify-center flex-wrap gap-4">
                    <button
                        type="button"
                        onClick={() => onSearch('The Road to the EU AI Act')}
                        className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-md transition-colors font-sans"
                    >
                        I'm Feeling Lucky
                    </button>
                </div>
            </div>
        </div>
    );
}
