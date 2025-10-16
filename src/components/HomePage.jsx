// src/components/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import ModeCard from './ModeCard'; 
import { ArrowRight, MessageSquareText, Lightbulb, TrendingUp } from 'lucide-react';
import HearthArch from './HearthArch';
import { Button } from '@/components/ui/button';

// --- Mode Card Configuration Data ---
const MODES = [
    {
        title: "Translate",
        path: "/app/translate/draft",
        description: "Rephrase complex thoughts into clear, intentional messages for any audience.",
        // Maps to Tertiary Accent (Purple) - Insightful
        borderColor: "border-brand-purple",
        icon: <MessageSquareText className="h-6 w-6" />,
        iconBgClass: "bg-brand-purple"
    },
    {
        title: "Analyze",
        path: "/app/translate/analyze",
        description: "Decode messages you receive to understand the sender's likely intent and context.",
        // Maps to Primary Accent (Teal) - Clear and Confident
        borderColor: "border-brand-teal",
        icon: <Lightbulb className="h-6 w-6" />,
        iconBgClass: "bg-brand-teal"
    },
    {
        title: "Chat Coach",
        path: "/app/chat",
        description: "Practice difficult conversations and receive real-time, empathetic guidance.",
        // Maps to Secondary Accent (Terracotta) - Warmth and Human connection
        borderColor: "border-brand-terracotta",
        icon: <TrendingUp className="h-6 w-6" />,
        iconBgClass: "bg-brand-terracotta"
    },
];
// ------------------------------------


const HomePage = () => {
    // Assuming AppLayout handles the outer container (bg-brand-cream)
    return (
        <div className="p-4 sm:p-8 max-w-6xl mx-auto">
            <header className="mb-10 text-center">
                <HearthArch className="w-16 h-8 text-brand-terracotta mx-auto mb-2" />
                <h1 className="text-4xl font-serif text-brand-charcoal font-bold">
                    Clarity Coach
                </h1>
                <p className="mt-2 text-lg font-sans text-brand-charcoal/80">
                    Your personal guide to communication, based on the ethos of **"Hear Me, See Me, Know Me."**
                </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {MODES.map((mode, index) => (
                    <ModeCard key={index} mode={mode} />
                ))}
            </section>
            
            {/* Link back to the main company site */}
            <div className="mt-12 text-center">
                <Link to="/about">
                    <Button variant="ghost" className="text-brand-charcoal/70 hover:bg-brand-cream/50">
                        Learn more about Hearthside Works <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;