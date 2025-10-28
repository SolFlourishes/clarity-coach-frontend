import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Analytics } from '@vercel/analytics/react';

export const AppLayout = ({ children, theme, toggleTheme }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-teal-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300">Skip to main content</a>
            {/* --- NEW: Beta Banner Added --- */}
            <div className="bg-yellow-400 dark:bg-yellow-600 text-center py-2 px-4 text-sm text-black dark:text-white font-semibold">
                Clarity Coach is currently in Beta. Your feedback is valuable in shaping its future!
            </div>

            <Header theme={theme} toggleTheme={toggleTheme} />
            <main id="main-content" className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8" role="main">
                {children}
            </main>
            <Footer />
            <Analytics />
        </div>
    );
};