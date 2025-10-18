// src/marketing/pages/CompanyPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../apps/clarity-coach/shared/button'; // Corrected path
import { ArrowRight } from 'lucide-react';
// FIX: Removed import CompanyLayout from '../layouts/CompanyLayout';

const CompanyLandingPage = () => {
    return (
        // FIX: Only return the content section. The layout is applied by App.jsx.
        <section className="text-center my-16 py-12">
            <h2 className="text-2xl font-serif text-brand-terracotta mt-4">
                Building tools for warmth, connection, and understanding.
            </h2>
            <p className="max-w-3xl mx-auto mt-6 text-xl text-brand-charcoal/90 leading-relaxed font-sans">
                **Hearthside Works** creates AI-powered solutions to bridge communication gaps for a more empathetic world.
            </p>
            <Link to="/app" className="mt-8 inline-block">
                <Button className="bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-base py-6 px-10 shadow-lg hover:shadow-xl">
                    Open Clarity Coach <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </Link>
        </section>
    );
};

export default CompanyLandingPage;