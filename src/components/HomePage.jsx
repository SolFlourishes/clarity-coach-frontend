import React, { useState, useEffect } from 'react';
import { ModeCard } from './ModeCard';

export const HomePage = () => {
    // FIX #2: Inspirational Quotes Added
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
        <div className="text-center py-12 md:py-24 px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold font-serif text-gray-900 dark:text-white mb-6 leading-tight">
                Welcome to the <span className="text-teal-600 dark:text-teal-400">Clarity Coach</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16 leading-relaxed">
                A tool by <strong className="font-semibold text-terracotta-500">Hearthside Works</strong> to help you bridge communication gaps, say what you mean, and understand what others truly mean.
            </p>
            <div className="max-w-3xl mx-auto my-16 p-8 bg-gradient-to-br from-teal-50 to-terracotta-50 dark:from-gray-800/50 dark:to-gray-800/30 rounded-2xl border-2 border-teal-100 dark:border-gray-700 shadow-lg">
                <blockquote className="text-xl md:text-2xl italic text-gray-800 dark:text-gray-200 leading-relaxed">"{quote.text}"</blockquote>
                <cite className="block text-right mt-6 text-gray-600 dark:text-gray-400 font-medium">— {quote.author}</cite>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <ModeCard title="Draft a Message" description="Translate your intent into a clear message tailored for any audience." linkTo="#/translate/draft" />
                <ModeCard title="Analyze a Message" description="Decode the likely intent behind a message you've received." linkTo="#/translate/analyze" />
                <ModeCard title="Chat with the Coach" description="Get real-time advice on navigating a tricky conversation." linkTo="#/chat" />
            </div>
        </div>
    );
};