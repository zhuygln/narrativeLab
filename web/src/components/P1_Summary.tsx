'use client';

import React from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Story } from '@/schema/story';

interface P1Props {
    story: Story;
    onSwipeUp: () => void;
    onSwipeDown: () => void;
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
}

export default function P1_Summary({ story, onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight }: P1Props) {

    return (
        <div className="relative w-full h-[100dvh] bg-ivory flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden">

            {/* Navigation Hints */}
            <button onClick={onSwipeUp} className="absolute top-6 left-1/2 -translate-x-1/2 text-slate-400 flex flex-col items-center gap-1 hover:text-slate-700 transition">
                <ChevronUp size={24} />
                <span className="text-xs uppercase tracking-widest font-semibold font-sans">Search</span>
            </button>

            <button onClick={onSwipeLeft} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 flex items-center gap-2 hover:text-slate-700 transition">
                <ChevronLeft size={24} />
                <span className="text-xs uppercase tracking-widest font-semibold font-sans hidden sm:block">Narrative A</span>
            </button>

            <button onClick={onSwipeRight} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 flex items-center gap-2 hover:text-slate-700 transition">
                <span className="text-xs uppercase tracking-widest font-semibold font-sans hidden sm:block">Narrative B</span>
                <ChevronRight size={24} />
            </button>

            <button onClick={onSwipeDown} className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-400 flex flex-col items-center gap-1 hover:text-slate-700 transition animate-bounce">
                <span className="text-xs uppercase tracking-widest font-semibold font-sans">Deep Dive</span>
                <ChevronDown size={24} />
            </button>

            {/* Main Card Content */}
            <div className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[80vh]">
                <div className="w-full h-64 bg-slate-200 relative overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    {/* Placeholder for standard cinematic image -> using CSS gradient for MVP */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-blue/80 to-deep-plum/80" />
                    <h1 className="absolute bottom-6 left-8 right-8 text-3xl md:text-5xl font-playfair font-bold text-white z-20 leading-tight">
                        {story.title}
                    </h1>
                </div>

                <div className="p-8 md:p-10 flex-1 overflow-y-auto">
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-serif">
                        {story.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
