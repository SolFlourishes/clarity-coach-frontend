import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ModeCard } from '../components/ModeCard'; // Assuming ModeCard exists
import HearthArch from '../../marketing/shared/HearthArch'; // Assuming HearthArch exists

// Brand colors and dynamic variables
const PRIMARY_TEAL = 'var(--teal-primary)';
const TERRACOTTA = 'var(--terracotta-warmth)';
const TEXT_COLOR_DARK = 'var(--text-dark)';

// Configuration for the three main modes on the Clarity Coach home page
const modes = [
    {
        title: "Draft a Message",
        description: "Rephrase complex thoughts into clear, intentional messages for any audience.",
        icon: 'Zap', // Assuming icons are passed as strings or rendered inside ModeCard
        color: PRIMARY_TEAL,
        path: "/translate"
    },
    {
        title: "Analyze a Message",
        description: "Decode messages you receive to understand the sender's likely intent and context.",
        icon: 'ScanText',
        color: TERRACOTTA,
        path: "/translate/analyze"
    },
    {
        title: "Chat Coach",
        description: "Practice difficult conversations and receive real-time, empathetic guidance.",
        icon: 'MessageCircleCode',
        color: PRIMARY_TEAL,
        path: "/chat"
    },
];

export const HomePage = () => {
    // FIX #2: Inspirational Quotes Added (Original Logic Preserved)
    const quotes = [
        { text: "The single biggest problem in communication is the illusion that it has taken place.", author: "George Bernard Shaw" },
        { text: "To effectively communicate, we must realize that we are all different in the way we perceive the world and use this understanding as a guide to our communication with others.", author: "Tony Robbins" },
        { text: "The most important thing in communication is hearing what isn't said.", author: "Peter Drucker" }
    ];
    const [quote, setQuote] = useState({ text: "", author: "" });
    
    useEffect(() => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, []);

    return (
        <div className="container mx-auto px-4 py-10 md:py-20 transition duration-500" style={{ color: 'var(--color-text)' }}>
            
            {/* Header / Hero Section */}
            <header className="text-center mb-12">
                {/* HearthArch is likely an SVG component that needs styling */}
                {/* Assuming HearthArch component uses SVG/Lucide logic internally */}
                {/* <HearthArch className="w-16 h-8 mx-auto mb-4" style={{ color: TERRACOTTA }} /> */}

                <h1 className="text-4xl md:text-6xl font-extrabold font-serif mb-4 leading-tight">
                    Welcome to the <span style={{ color: PRIMARY_TEAL }}>Clarity Coach</span>
                </h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12">
                    A tool by <strong style={{ color: TERRACOTTA }}>Hearthside Works</strong> to help you bridge communication gaps, say what you mean, and understand what others truly mean.
                </p>
            </header>

            {/* Inspirational Quote Card (Original Logic Preserved, now themed) */}
            <div 
                className="max-w-3xl mx-auto my-12 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg"
                style={{ backgroundColor: 'var(--color-surface)' }}
            >
                <blockquote className="text-xl italic">"{quote.text}"</blockquote>
                <cite className="block text-right mt-4 text-sm" style={{ color: TERRACOTTA }}>- {quote.author}</cite>
            </div>
            
            {/* Mode Cards - Main feature navigation */}
            <section className="pt-4">
                <h2 className="text-3xl font-serif mb-6 text-center" style={{ color: PRIMARY_TEAL }}>Select a Mode</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {/* Assuming ModeCard logic is external, relying on its import */}
                    {modes.map((mode, index) => (
                        <ModeCard 
                            key={index} 
                            title={mode.title} 
                            description={mode.description} 
                            linkTo={mode.path} 
                            icon={mode.icon} 
                            color={mode.color}
                        />
                    ))}
                </div>
            </section>
            
            {/* Secondary Navigation/Call to Action */}
            <section className="pt-8 text-center border-t border-gray-200 dark:border-gray-700 mt-12">
                <Link to="/about" className="inline-flex items-center font-semibold transition-colors" style={{ color: PRIMARY_TEAL }}>
                    Learn About Our Mission and Kith →
                </Link>
            </section>
            
        </div>
    );
};

// Exporting as a Named Export to align with App.jsx Named Imports
export { HomePage };
