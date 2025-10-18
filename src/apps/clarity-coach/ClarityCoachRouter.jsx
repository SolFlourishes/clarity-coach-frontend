// src/apps/clarity-coach/ClarityCoachRouter.jsx

import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// 1. LAYOUT
import AppLayout from './AppLayout'; 

// 2. CORE FEATURES (from the 'features' subfolder)
import HomePage from './features/HomePage'; 
import TranslatePage from './features/TranslatePage'; 
import ChatPage from './features/ChatPage'; 

// 3. APP-SPECIFIC STATIC CONTENT (from external 'marketing' folder)
import { HowToUsePage, ChangeLogPage, RoadmapPage } from './shared/AppDocs';

// Simple 404 component for failed nested routes
const NotFoundPage = () => (
    <div className="flex flex-col items-center justify-center p-12 h-full">
        <h1 className="text-4xl font-serif text-brand-terracotta mb-4">404 - App Page Not Found</h1>
        <p className="text-lg">The requested feature page does not exist within the Clarity Coach application.</p>
    </div>
);

/**
 * ClarityCoachRouter serves as the entry point for the /app/* routes.
 * It provides the persistent AppLayout shell and defines all internal app routes.
 */
const ClarityCoachRouter = () => {
    // Retain your theme management logic
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
    
    useEffect(() => {
        // Toggle dark/light class on the HTML element
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');

    return (
        <AppLayout theme={theme} toggleTheme={toggleTheme}>
            <Routes>
                {/* 1. App Landing Page */}
                <Route index element={<HomePage />} />
                
                {/* 2. CORE FUNCTIONAL PAGES - Use nested path for simplicity */}
                {/* FIX: Use a wildcard (*) on the 'translate' path to catch both /draft and /analyze */}
                <Route path="translate/*" element={<TranslatePage />} /> 
                <Route path="chat" element={<ChatPage />} />

                {/* 3. APP DOCUMENTATION PAGES */}
                <Route path="how-to-use" element={<HowToUsePage />} />
                {/* ... (rest of the static routes) ... */}

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </AppLayout>
    );
};

export default ClarityCoachRouter;