import React from 'react';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
import { Analytics } from '@vercel/analytics/react';

export const AppLayout = ({ children, theme, toggleTheme }) => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* --- NEW: Beta Banner Added --- */}
            <div className="bg-yellow-400 dark:bg-yellow-600 text-center py-2 px-4 text-sm text-black dark:text-white font-semibold">
                Clarity Coach is currently in Beta. Your feedback is valuable in shaping its future!
            </div>

            <Header theme={theme} toggleTheme={toggleTheme} />
            <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                {children}
            </main>
            <Footer />
            <Analytics />
        </div>
    );
};