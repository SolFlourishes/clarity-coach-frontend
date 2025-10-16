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
            
            {/* 1. MAIN COMPANY WEBSITE ROUTES - Wrap all top-level content in CompanyLayout */}
            <Route element={<CompanyLayout />}> 
                
                {/* Index Route - Uses the Company Landing Page content */}
                <Route index element={<CompanyLandingPage />} /> 

                {/* Dedicated Static Pages (Company-level) */}
                <Route path="/mission" element={<MissionPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/commitments" element={<CommitmentsPage />} />
                <Route path="/credits" element={<CreditsPage />} />
            </Route>
            
            {/* 2. CLARITY COACH APPLICATION ROUTES */}
            <Route path="/app/*" element={<ClarityCoachAppRoutes />} />

            {/* 3. FALLBACK 404 Route - (Wrap in a default layout if desired, here just raw text) */}
            {/* ... (rest of 404 route) ... */}
        </Routes>
    );
}

export default App;