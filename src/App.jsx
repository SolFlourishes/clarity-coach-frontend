// D:\Projects\clarity-coach-frontend\src\App.jsx

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Layouts
import ClarityCoachAppRoutes from './components/ClarityCoachAppRoutes'; 
import CompanyLayout from './components/CompanyLayout'; // <--- NEW IMPORT

// Company Pages (Live under /)
import CompanyLandingPage from './pages/CompanyPage'; // This is the Company Landing Page
import ContactPage from './pages/ContactPage'; 
import MissionPage from './pages/MissionPage'; // <--- NEW IMPORT
import CommunityPage from './pages/CommunityPage'; // <--- NEW IMPORT
import SupportPage from './pages/SupportPage'; // <--- NEW IMPORT

// Static content - we import the raw pages but wrap them with CompanyLayout
import { CommitmentsPage, CreditsPage } from './components/StaticPages'; 


function App() {
    return (
        <Routes>
            
            {/* 1. MAIN COMPANY WEBSITE ROUTES */}
            <Route index element={<CompanyLandingPage />} /> 

            {/* Dedicated Static Pages, wrapped in the new Company Layout */}
            <Route path="/mission" element={<CompanyLayout><MissionPage /></CompanyLayout>} />
            <Route path="/community" element={<CompanyLayout><CommunityPage /></CompanyLayout>} />
            <Route path="/support" element={<CompanyLayout><SupportPage /></CompanyLayout>} />
            <Route path="/contact" element={<CompanyLayout><ContactPage /></CompanyLayout>} />
            
            {/* Reusing content from StaticPages, wrapped in the new layout */}
            <Route path="/commitments" element={<CompanyLayout><CommitmentsPage /></CompanyLayout>} />
            <Route path="/credits" element={<CompanyLayout><CreditsPage /></CompanyLayout>} />
            
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