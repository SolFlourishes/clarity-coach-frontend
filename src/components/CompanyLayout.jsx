// src/components/CompanyLayout.jsx

import React from 'react';
import CompanyHeader from './CompanyHeader'; // NEW HEADER
import CompanyFooter from './CompanyFooter'; // NEW FOOTER

const CompanyLayout = ({ children }) => (
    <div className="flex flex-col min-h-screen bg-brand-cream text-brand-charcoal">
        <CompanyHeader />
        {/* THIS SECTION RENDERS THE PAGE CONTENT */}
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {children}
        </main>
        <CompanyFooter />
    </div>
);

export default CompanyLayout;