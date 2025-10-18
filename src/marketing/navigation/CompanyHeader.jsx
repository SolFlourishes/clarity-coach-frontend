import React from 'react';
import { Link } from 'react-router-dom';
// FIX: Ensure this path is absolutely correct relative to the navigation/ folder
import HearthArch from '../shared/HearthArch'; 
import { Button } from '@/components/ui/button';

const CompanyHeader = () => {
    return (
        <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo and Brand Name (Links to Company Home) */}
                    <Link to="/" className="flex items-center gap-2">
                        <HearthArch className="w-10 h-6 text-brand-terracotta" />
                        <span className="font-serif text-2xl font-bold text-brand-charcoal">Hearthside Works</span>
                    </Link>
                    
                    {/* Desktop Navigation Links */}
                    <nav className="flex items-center space-x-6">
                        {/* New Company Nav Links */}
                        <Link to="/mission" className="text-brand-charcoal/80 hover:text-brand-teal font-sans text-base font-semibold">Our Mission</Link>
                        <Link to="/app" className="text-brand-charcoal/80 hover:text-brand-teal font-sans text-base font-semibold">Clarity Coach</Link>
                        <Link to="/community" className="text-brand-charcoal/80 hover:text-brand-teal font-sans text-base font-semibold">Community</Link>
                        <Link to="/support" className="text-brand-charcoal/80 hover:text-brand-teal font-sans text-base font-semibold">Support Us</Link>
                        
                        {/* Login Button Placeholder */}
                        <Button variant="outline" className="bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-sm h-10 px-6">
                            Login
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default CompanyHeader;