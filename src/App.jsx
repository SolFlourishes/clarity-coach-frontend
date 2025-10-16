// D:\Projects\clarity-coach-frontend\src\App.jsx (CORRECTED)

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Layouts
import ClarityCoachAppRoutes from './components/ClarityCoachAppRoutes'; 
import CompanyLayout from './components/CompanyLayout'; 

// Company Pages (Live under /)
import CompanyLandingPage from './pages/CompanyPage'; 
import ContactPage from './pages/ContactPage'; 
import MissionPage from './pages/MissionPage'; 
import CommunityPage from './pages/CommunityPage'; 
import SupportPage from './pages/SupportPage'; 

// Static content - we import the raw pages but wrap them with CompanyLayout
import { CommitmentsPage, CreditsPage } from './components/StaticPages'; 


function App() {
    // Helper function to apply the CompanyLayout wrapper cleanly
    const withCompanyLayout = (Component) => <CompanyLayout>{Component}</CompanyLayout>;

    return (
        <Routes>
            
            {/* 1. MAIN COMPANY WEBSITE ROUTES - Wrap each root component in CompanyLayout */}
            {/* Root / Landing Page */}
            <Route index element={withCompanyLayout(<CompanyLandingPage />)} /> 

            {/* Dedicated Static Pages (Company-level) */}
            <Route path="/mission" element={withCompanyLayout(<MissionPage />)} />
            <Route path="/community" element={withCompanyLayout(<CommunityPage />)} />
            <Route path="/support" element={withCompanyLayout(<SupportPage />)} />
            <Route path="/contact" element={withCompanyLayout(<ContactPage />)} />
            
            {/* Reusing content from StaticPages, wrapped in the new layout */}
            <Route path="/commitments" element={withCompanyLayout(<CommitmentsPage />)} />
            <Route path="/credits" element={withCompanyLayout(<CreditsPage />)} />
            
            {/* 2. CLARITY COACH APPLICATION ROUTES */}
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