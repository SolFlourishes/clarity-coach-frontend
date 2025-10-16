// src/pages/SupportPage.jsx (Placeholder)

import React from 'react';
import CompanyLayout from '../components/CompanyLayout';
import { Link } from 'react-router-dom';

const SupportPage = () => (
    <CompanyLayout>
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-5xl font-serif text-brand-terracotta mb-4">Support Hearthside Works</h1>
            <p className="text-xl text-brand-charcoal/80">We are currently a small, founder-led company. Your support helps us keep the servers running and the project growing.</p>
            <p className="mt-4 text-lg">Ways you can help:</p>
            <ul className="list-disc ml-6 mt-2">
                <li>Submit "Golden Edits" using the feedback loop in the Clarity Coach app.</li>
                <li>Share the Clarity Coach with a friend or colleague.</li>
                <li>Reach out with a business or investment inquiry on our <Link to="/contact" className="text-brand-teal hover:underline">Contact Page</Link>.</li>
            </ul>
        </div>
    </CompanyLayout>
);

export default SupportPage;