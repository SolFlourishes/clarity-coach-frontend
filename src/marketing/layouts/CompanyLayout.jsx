// src/marketing/layouts/CompanyLayout.jsx

import React from 'react';
import CompanyHeader from '../navigation/CompanyHeader'; 
import CompanyFooter from '../navigation/CompanyFooter'; 

const CompanyLayout = ({ children }) => (
    <div className="flex flex-col min-h-screen bg-brand-cream text-brand-charcoal">
        <CompanyHeader />
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {children} // <-- DELETE THIS COMMENT AND ANY SPACES BEFORE IT
        </main>
        <CompanyFooter />
    </div>
);

export default CompanyLayout;// src/marketing/layouts/CompanyLayout.jsx

import React from 'react';
import CompanyHeader from '../navigation/CompanyHeader'; // <-- The suspected failure point
import CompanyFooter from '../navigation/CompanyFooter'; 

const CompanyLayout = ({ children }) => {
    // CRITICAL FIX: Check if the imported component is actually a function (a valid React Component)
    if (typeof CompanyHeader !== 'function') {
        return (
            <div style={{ padding: '20px', backgroundColor: 'red', color: 'white' }}>
                FATAL ERROR: CompanyHeader failed to load or is not a valid component.
                Please check imports inside CompanyHeader.jsx.
            </div>
        );
    }
    
    return (
        <div className="flex flex-col min-h-screen bg-brand-cream text-brand-charcoal">
            <CompanyHeader />
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {children}
            </main>
            <CompanyFooter />
        </div>
    );
};

export default CompanyLayout;