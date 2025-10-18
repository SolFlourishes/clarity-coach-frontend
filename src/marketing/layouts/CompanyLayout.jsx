// src/marketing/layouts/CompanyLayout.jsx (Restoring full functionality)

import React from 'react';
import CompanyHeader from '../navigation/CompanyHeader'; 
import CompanyFooter from '../navigation/CompanyFooter'; 

const CompanyLayout = ({ children }) => (
    // RESTORE THE ORIGINAL WRAPPER STRUCTURE
    <div className="flex flex-col min-h-screen bg-brand-cream text-brand-charcoal">
        <CompanyHeader />
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {children} // <-- THIS WILL NOW RENDER YOUR PAGE CONTENT (e.g., CompanyPage.jsx)
        </main>
        <CompanyFooter />
    </div>
);

export default CompanyLayout;