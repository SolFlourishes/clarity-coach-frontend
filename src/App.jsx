import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 1. Core Router Components
// Assuming CompanyPage.jsx is in src/pages/
import CompanyPage from "./pages/CompanyPage"; 
// Assuming the internal app router wrapper is in src/components/
import ClarityCoachAppRoutes from "./components/ClarityCoachAppRoutes"; 

// NEW IMPORT: Contact Page
import ContactPage from "./pages/ContactPage";

// 2. Static Pages moving to the main site (Hearthside Works branding)
// These are the NAMED exports from the StaticPages.jsx file you provided, 
// which is assumed to be in src/components/
import { AboutPage, RoadmapPage, CreditsPage, CommitmentsPage } from './components/StaticPages';

// Simple 404 component for the main site routes
const NotFoundPage = () => (
    <div className="min-h-screen bg-brand-cream p-12 flex flex-col items-center justify-center">
        <h1 className="text-6xl font-serif text-brand-terracotta mb-4">404</h1>
        <h2 className="text-xl font-sans text-brand-charcoal/80">
            A safe place for gathering was not found at this address.
        </h2>
        <a href="/" className="mt-8 text-brand-teal hover:underline font-bold">Return to the Hearth</a>
    </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========================================================== */}
        {/* HEARTHSIDE WORKS: MAIN SITE ROUTES (Company Pages) */}
        {/* ========================================================== */}
        <Route path="/" element={<CompanyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/credits" element={<CreditsPage />} />
        <Route path="/commitments" element={<CommitmentsPage />} />
        <Route path="/contact" element={<ContactPage />} /> {/* <-- NEW CONTACT ROUTE */}

        {/* ========================================================== */}
        {/* CLARITY COACH: NESTED APP ROUTES (/app/*) */}
        {/* This route uses the custom layout and theme logic */}
        {/* ========================================================== */}
        <Route path="/app/*" element={<ClarityCoachAppRoutes />} />
        
        {/* Catch-all for any other path */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;