// src/apps/clarity-coach/features/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, MessageCircleCode, ScanText, Lightbulb, Zap } from 'lucide-react';
// FIX 1: ModeCard path must go UP one directory (from features/ to clarity-coach/) then INTO shared/
import ModeCard from '../shared/ModeCard'; 
// FIX 2: HearthArch path must go out THREE directories to reach marketing/shared/
import HearthArch from '../../../marketing/shared/HearthArch';

// Configuration for the three main modes on the Clarity Coach home page
const modes = [
    {
        title: "Translate (Draft Mode)",
        description: "Rephrase complex thoughts into clear, intentional messages for any audience.",
        icon: <Zap className="h-6 w-6" />,
        iconBgClass: "bg-brand-purple",
        borderColor: "border-brand-purple",
        path: "/app/translate/draft"
    },
    {
        title: "Analyze (Decoder Mode)",
        description: "Decode messages you receive to understand the sender's likely intent and context.",
        icon: <ScanText className="h-6 w-6" />,
        iconBgClass: "bg-brand-teal",
        borderColor: "border-brand-teal",
        path: "/app/translate/analyze"
    },
    {
        title: "Chat Coach",
        description: "Practice difficult conversations and receive real-time, empathetic guidance.",
        icon: <MessageCircleCode className="h-6 w-6" />,
        iconBgClass: "bg-brand-terracotta",
        borderColor: "border-brand-terracotta",
        path: "/app/chat"
    }
];

const HomePage = () => {
    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-12">
            {/* NEW: Hero Section for visual appeal and branding */}
            <header className="text-center py-12 bg-white dark:bg-gray-900 shadow-md rounded-xl border border-gray-200 dark:border-gray-700">
                <HearthArch className="w-16 h-8 text-brand-terracotta mx-auto mb-4" />
                <h1 className="text-5xl font-serif font-bold text-brand-charcoal dark:text-white">Clarity Coach</h1>
                <p className="mt-2 text-lg text-brand-charcoal/80 dark:text-gray-300 max-w-2xl mx-auto">
                    Your personal guide to communication, built on the metaphor of a safe, central hearth.
                </p>
            </header>

            {/* Mode Cards - Main feature navigation */}
            <section className="pt-4">
                <h2 className="text-3xl font-serif text-brand-charcoal dark:text-white mb-6 text-center">Select a Mode</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {modes.map((mode, index) => (
                        <ModeCard key={index} mode={mode} />
                    ))}
                </div>
            </section>
            
            {/* Secondary Navigation/Call to Action */}
            <section className="pt-8 text-center border-t border-gray-200 dark:border-gray-700">
                <Link to="/mission" className="inline-flex items-center text-brand-teal dark:text-brand-teal hover:text-brand-teal/80 font-semibold transition-colors">
                    <Lightbulb className="h-5 w-5 mr-2" />
                    Explore the Hearthside Works Mission
                </Link>
            </section>
        </div>
    );
};

export default HomePage;