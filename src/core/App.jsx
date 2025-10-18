// src/core/App.jsx

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// FIX: Imports confirmed correct after all migrations

// Layouts & Nav
import CompanyLayout from '../marketing/layouts/CompanyLayout'; 

// Application Router
import ClarityCoachRouter from '../apps/clarity-coach/ClarityCoachRouter'; 
import ErrorBoundary from './ErrorFallback.jsx'; // Assuming ErrorFallback is committed

// Company Pages (Live under /)
import CompanyLandingPage from '../marketing/pages/CompanyPage'; 
import ContactPage from '../marketing/pages/ContactPage'; 
import MissionPage from '../marketing/pages/MissionPage'; 
import CommunityPage from '../marketing/pages/CommunityPage'; 
import SupportPage from '../marketing/pages/SupportPage'; 

// Static content
import { CommitmentsPage, CreditsPage, AboutPage } from '../marketing/pages/content/CompanyContent'; 


function App() {
    // Helper function to apply the CompanyLayout wrapper cleanly
    const withCompanyLayout = (Component) => <CompanyLayout>{Component}</CompanyLayout>;

    return (
        <ErrorBoundary>
        <Routes>
            
            {/* 1. MAIN COMPANY WEBSITE ROUTES - Wrap each root component in CompanyLayout */}
            {/* Index Route / Landing Page */}
            <Route index element={withCompanyLayout(<CompanyLandingPage />)} /> 

            {/* Dedicated Static Pages (Company-level) */}
            <Route path="/mission" element={withCompanyLayout(<MissionPage />)} />
            <Route path="/community" element={withCompanyLayout(<CommunityPage />)} />
            <Route path="/support" element={withCompanyLayout(<SupportPage />)} />
            <Route path="/contact" element={withCompanyLayout(<ContactPage />)} />
            
            {/* Reusing content from CompanyContent */}
            <Route path="/commitments" element={withCompanyLayout(<CommitmentsPage />)} />
            <Route path="/credits" element={withCompanyLayout(<CreditsPage />)} />
            
            {/* 2. CLARITY COACH APPLICATION ROUTES */}
            <Route path="/app/*" element={<ClarityCoachRouter />} />

            {/* 3. FALLBACK 404 Route */}
            <Route path="*" element={
                <div className="flex flex-col items-center justify-center min-h-screen bg-brand-cream dark:bg-gray-900">
                    <h1 className="text-5xl font-serif text-brand-terracotta mb-4">404 - Page Not Found</h1>
                    <Link to="/" className="text-brand-teal hover:underline">Return to Home</Link>
                </div>
            } />
        </Routes>
        </ErrorBoundary>
    );
}

export default App;