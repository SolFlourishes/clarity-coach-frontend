// src/components/ClarityCoachAppRoutes.jsx

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// CRITICAL FIX: Unifying imports to consistently use DEFAULT imports for main components.
import AppLayout from './AppLayout'; 
import HomePage from './HomePage'; 
import TranslatePage from './TranslatePage'; 
import ChatPage from './ChatPage'; 

// Static pages use NAMED exports from the StaticPages.jsx file.
import { HowToUsePage, ChangeLogPage, RoadmapPage } from './StaticPages'; // <-- ADDED RoadmapPage

// Simple 404 component for failed nested routes
const NotFoundPage = () => (
    <div className="flex flex-col items-center justify-center p-12 h-full">
        <h1 className="text-4xl font-serif text-brand-terracotta mb-4">404 - App Page Not Found</h1>
        <p className="text-lg">The requested feature page does not exist within the Clarity Coach application.</p>
    </div>
);

/**
 * ClarityCoachAppRoutes serves as the entry point for the /app/* routes.
 * It manages the app-wide state (like theme) and provides the persistent
 * layout structure (AppLayout) for all internal application pages.
 */
const ClarityCoachAppRoutes = () => {
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
                <Route path="translate/draft" element={<TranslatePage mode="draft" />} /> {/* Explicit Draft route */}
                <Route path="translate/analyze" element={<TranslatePage mode="analyze" />} /> {/* Explicit Analyze route */}
                <Route path="chat" element={<ChatPage />} />
                
                {/* App-Specific Static Pages that are nested under /app */}
                <Route path="how-to-use" element={<HowToUsePage />} />
                <Route path="changelog" element={<ChangeLogPage />} />
                <Route path="roadmap" element={<RoadmapPage />} /> {/* <-- ADDED ROUTE */}

                {/* Catch-all for failed nested routes */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </AppLayout>
    );
};

export default ClarityCoachAppRoutes;