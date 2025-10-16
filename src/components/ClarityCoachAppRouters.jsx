import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import { HomePage } from './HomePage';
import { TranslatePage } from './TranslatePage';
import { ChatPage } from './ChatPage';
import { HowToUsePage, ChangeLogPage } from './StaticPages';

// Assuming your NotFoundPage is also defined or needs to be created
const NotFoundPage = () => (
    <div className="flex flex-col items-center justify-center p-12 h-full">
        <h1 className="text-4xl font-serif text-brand-terracotta mb-4">404 - Page Not Found</h1>
        <p className="text-lg">The path you requested does not exist within the Clarity Coach application.</p>
    </div>
);

// This component handles the theme and the AppLayout wrapper for the *nested* routes only.
const ClarityCoachAppRoutes = () => {
    // Retain your theme logic as is
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');

    // We use the <Routes> component *inside* the <AppLayout> wrapper 
    // This allows the layout (sidebar, header, etc.) to be persistent across these pages.
    return (
        <AppLayout theme={theme} toggleTheme={toggleTheme}>
            <Routes>
                {/* /app/ */}
                <Route index element={<HomePage />} />
                
                {/* /app/translate */}
                {/* Note: If your TranslatePage uses the 'mode' parameter, you handle it inside TranslatePage */}
                <Route path="translate/*" element={<TranslatePage />} /> 

                {/* /app/chat */}
                <Route path="chat" element={<ChatPage />} />
                
                {/* App-Specific Static Pages */}
                <Route path="how-to-use" element={<HowToUsePage />} />
                <Route path="changelog" element={<ChangeLogPage />} />

                {/* Catch-all for /app/... routes */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </AppLayout>
    );
};

export default ClarityCoachAppRoutes;
