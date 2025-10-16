// D:\Projects\clarity-coach-frontend\src\App.jsx

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Layout and Router for the internal Clarity Coach App (uses AppLayout internally)
import ClarityCoachAppRoutes from './components/ClarityCoachAppRoutes';
// The layout component for all the app pages
import AppLayout from './components/AppLayout'; 

// Company Pages (Live under /)
import CompanyPage from './pages/CompanyPage'; // This is the Company Landing Page
import ContactPage from './pages/ContactPage';
// Static pages (using named exports) - used by both the App and the Company Site
import { 
    AboutPage, 
    CommitmentsPage, 
    CreditsPage, 
    HowToUsePage, 
    RoadmapPage,
    ChangeLogPage
} from './components/StaticPages'; 


// Simple Layout wrapper for the non-app pages (no theme toggle, standard header/footer)
const CompanyLayout = ({ children }) => (
    <div className="flex flex-col min-h-screen bg-brand-cream text-brand-charcoal">
        {/* The CompanyPage component already contains its own header/footer as designed */}
        {children}
    </div>
);


function App() {
    return (
        <Routes>
            {/* 1. MAIN COMPANY WEBSITE ROUTES (Uses the CompanyPage wrapper for its structure) */}
            
            {/* Root / Landing Page */}
            <Route index element={<CompanyPage />} /> 

            {/* Dedicated Static Pages (Company-level) - These use the base layout defined in CompanyPage, 
                so we wrap them in CompanyLayout and use the StaticPages content. */}
            <Route path="/about" element={<CompanyLayout><AboutPage /></CompanyLayout>} />
            <Route path="/commitments" element={<CompanyLayout><CommitmentsPage /></CompanyLayout>} />
            <Route path="/contact" element={<CompanyLayout><ContactPage /></CompanyLayout>} />
            <Route path="/credits" element={<CompanyLayout><CreditsPage /></CompanyLayout>} />
            
            {/* 2. CLARITY COACH APPLICATION ROUTES (Everything under /app/*) */}
            <Route path="/app/*" element={<ClarityCoachAppRoutes />} />

            {/* 3. FALLBACK 404 Route */}
            <Route path="*" element={
                <div className="flex flex-col items-center justify-center min-h-screen bg-brand-cream dark:bg-gray-900">
                    <h1 className="text-5xl font-serif text-brand-terracotta mb-4">404 - Page Not Found</h1>
                    <Link to="/" className="text-brand-teal hover:underline">Return to Home</Link>
                </div>
            } />
        </Routes>
    );
}

export default App;