// src/marketing/navigation/CompanyFooter.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const FooterLink = ({ to, text }) => (
    <Link to={to} className="text-brand-charcoal/70 hover:text-brand-terracotta transition-colors font-sans text-sm">
        {text}
    </Link>
);

const CompanyFooter = () => (
    <footer className="bg-white border-t border-gray-200 mt-16 p-6 sm:p-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-brand-charcoal/70 text-sm">
                &copy; {new Date().getFullYear()} Hearthside Works, LLC.
            </p>
            <div className="flex space-x-6">
                <FooterLink to="/mission" text="Our Mission" />
                <FooterLink to="/community" text="Community" />
                <FooterLink to="/commitments" text="Privacy & Commitments" />
                <FooterLink to="/contact" text="Contact Us" />
            </div>
        </div>
    </footer>
);

export default CompanyFooter;