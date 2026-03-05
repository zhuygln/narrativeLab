'use client';

import React from 'react';
import { ChevronUp, Send } from 'lucide-react';
import { Story } from '@/schema/story';

interface P2Props {
    story: Story;
    onSwipeUp: () => void;
}

export default function P2_Chat({ story, onSwipeUp }: P2Props) {
    return (
        <div className="w-full h-[100dvh] bg-ivory flex flex-col relative">
            {/* Return to summary hint */}
            <button onClick={onSwipeUp} className="absolute top-6 left-1/2 -translate-x-1/2 text-slate-400 flex flex-col items-center gap-1 hover:text-slate-700 transition z-10 bg-ivory/80 backdrop-blur-sm px-4 rounded-full py-1">
                <ChevronUp size={20} />
                <span className="text-xs uppercase tracking-widest font-semibold font-sans">Return to Summary</span>
            </button>

            {/* Header Context */}
            <div className="border-b border-slate-200 bg-white pt-20 pb-4 px-6 shadow-sm">
                <h2 className="text-xl font-playfair font-bold text-slate-900">{story.title}</h2>
                <p className="text-sm font-sans text-slate-500">Ask questions explicitly grounded in the graph.</p>
            </div>

            {/* Chat History Mock */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="flex justify-end">
                    <div className="bg-slate-800 text-white rounded-2xl rounded-tr-sm px-5 py-3 max-w-[85%] font-sans text-[15px]">
                        Why did OpenAI lobby against the strict categorization of GPAI?
                    </div>
                </div>

                <div className="flex justify-start">
                    <div className="bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-tl-sm px-5 py-4 max-w-[85%] font-sans text-[15px] shadow-sm leading-relaxed">
                        According to the <strong>Market</strong> lane of our graph, the <span className="text-burnt-sienna font-medium">OpenAI Lobbying Effort</span> was highly active around June 2023. This is framed by the <strong>Innovation vs Regulation</strong> claim, indicating a structural force where tech companies argued that stringent upstream rules would stifle European technological competitiveness and benefit US incumbents.

                        <div className="mt-3 flex gap-2">
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-slate-100 text-slate-600 border border-slate-200 font-medium">Source: Time Magazine</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-200">
                <div className="max-w-3xl mx-auto relative flex items-center">
                    <input
                        type="text"
                        placeholder="Ask about this narrative..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-full px-5 py-3 pr-12 outline-none focus:ring-2 focus:ring-slate-300 font-sans"
                        disabled
                    />
                    <button className="absolute right-2 p-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition">
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
