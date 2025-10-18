// src/apps/clarity-coach/ClarityCoachRouter.jsx

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

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
                {/* /app/ - Should land on the core app's home page (Mode Cards) */}
                <Route index element={<HomePage />} />
                
                {/* Core Functional Pages - Passing 'mode' prop to TranslatePage */}
                <Route path="translate/draft" element={<TranslatePage mode="draft" />} /> 
                <Route path="translate/analyze" element={<TranslatePage mode="analyze" />} /> 
                <Route path="chat" element={<ChatPage />} />
                
                {/* App-Specific Static Pages that are nested under /app */}
                <Route path="how-to-use" element={<HowToUsePage />} />
                <Route path="changelog" element={<ChangeLogPage />} />
                <Route path="roadmap" element={<RoadmapPage />} /> 

                {/* Catch-all for failed nested routes */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </AppLayout>
    );
};

export default ClarityCoachRouter;