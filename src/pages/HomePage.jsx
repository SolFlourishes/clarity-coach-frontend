import React, { useState, useEffect } from 'react';
import { ModeCard } from '../components/ModeCard';

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
        <div className="text-center py-10 md:py-20">
            <h1 className="text-4xl md:text-6xl font-extrabold font-serif text-gray-900 dark:text-white mb-4 leading-tight">
                Welcome to the <span className="text-teal-500 dark:text-teal-400">Clarity Coach</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
                A tool by <strong className="font-semibold text-terracotta-500">Hearthside Works</strong> to help you bridge communication gaps, say what you mean, and understand what others truly mean.
            </p>
            <div className="max-w-3xl mx-auto my-12 p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <blockquote className="text-xl italic text-gray-700 dark:text-gray-300">"{quote.text}"</blockquote>
                <cite className="block text-right mt-4 text-gray-500 dark:text-gray-400">- {quote.author}</cite>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <ModeCard title="Draft a Message" description="Translate your intent into a clear message tailored for any audience." linkTo="#/translate/draft" />
                <ModeCard title="Analyze a Message" description="Decode the likely intent behind a message you've received." linkTo="#/translate/analyze" />
                <ModeCard title="Chat with the Coach" description="Get real-time advice on navigating a tricky conversation." linkTo="#/chat" />
            </div>
        </div>
    );
};