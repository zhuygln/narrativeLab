'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Node } from '@/schema/story';
import { ExternalLink, Calendar, MapPin, X } from 'lucide-react';

interface NodeDetailsSheetProps {
    node?: Node;
    onClose: () => void;
}

export default function NodeDetailsSheet({ node, onClose }: NodeDetailsSheetProps) {
    const getTypeColor = (type: string) => {
        switch (type) {
            case 'event': return 'bg-[#E97451]/10 text-[#E97451] border-[#E97451]/20';
            case 'actor': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'claim': return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'policy': return 'bg-[#6A5ACD]/10 text-[#6A5ACD] border-[#6A5ACD]/20';
            default: return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    return (
        <AnimatePresence>
            {node && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
                    />

                    {/* Bottom Sheet */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 max-h-[85vh] flex flex-col"
                    >
                        {/* Drag Handle Area */}
                        <div className="flex justify-center pt-3 pb-1 w-full" onClick={onClose}>
                            <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
                        </div>

                        <div className="p-6 border-b border-slate-100 relative">
                            <button
                                onClick={onClose}
                                className="absolute right-6 top-6 p-2 bg-slate-50 text-slate-400 hover:text-slate-600 rounded-full transition-colors"
                            >
                                <X size={18} />
                            </button>

                            <div className="mb-4">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getTypeColor(node.type)}`}>
                                    {node.type}
                                </span>
                            </div>

                            <h2 className="text-2xl font-bold font-playfair text-slate-900 leading-tight mb-3 pr-10">
                                {node.title}
                            </h2>

                            <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-sans tracking-wide">
                                {node.date && (
                                    <div className="flex items-center gap-1.5 flex-shrink-0">
                                        <Calendar size={14} />
                                        <time>{new Date(node.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</time>
                                    </div>
                                )}
                                {node.lane && (
                                    <div className="flex items-center gap-1.5 flex-shrink-0">
                                        <MapPin size={14} />
                                        <span>{node.lane}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#FAF7F2]/30">
                            <section>
                                <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2 font-sans">Contextual Summary</h3>
                                <p className="text-slate-700 leading-relaxed text-[15px] font-serif">
                                    {node.summary}
                                </p>
                            </section>

                            {node.sources && node.sources.length > 0 && (
                                <section>
                                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3 font-sans">Evidence & Citations</h3>
                                    <ul className="space-y-4">
                                        {node.sources.map((source, idx) => (
                                            <li key={idx} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="font-bold text-slate-900 text-sm font-sans">{source.publisher}</span>
                                                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-[#6A5ACD] hover:text-indigo-800 transition-colors flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide">
                                                        Source <ExternalLink size={12} />
                                                    </a>
                                                </div>
                                                {source.quote_snippet && (
                                                    <blockquote className="text-sm text-slate-600 font-serif italic border-l-4 border-slate-200 pl-3 py-1 my-3 bg-slate-50">
                                                        "{source.quote_snippet}"
                                                    </blockquote>
                                                )}
                                                {source.date && (
                                                    <div className="text-[11px] text-slate-400 font-sans font-medium mt-2 tracking-wide uppercase">
                                                        Published: {new Date(source.date).toLocaleDateString()}
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {/* Extra padding for safe scrolling at the bottom */}
                            <div className="h-4" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
