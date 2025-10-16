// src/pages/CompanyPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import HearthArch from '../components/HearthArch';
import { Button } from '@/components/ui/button'; 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const CompanyPage = () => {
    // Component for the navigation links in the footer
    const FooterLink = ({ to, text }) => (
        <Link to={to} className="text-brand-charcoal/70 hover:text-brand-terracotta transition-colors font-sans text-sm">
            {text}
        </Link>
    );

    return (
        <div className="flex flex-col min-h-screen bg-brand-cream text-brand-charcoal">
            
            {/* --- NEW HEADER BAR --- */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo and Brand Name */}
                        <Link to="/" className="flex items-center gap-2">
                            <HearthArch className="w-8 h-4 text-brand-terracotta" />
                            <span className="font-serif text-xl font-bold text-brand-charcoal">Hearthside Works</span>
                        </Link>
                        
                        {/* Desktop Navigation Links */}
                        <nav className="flex space-x-6">
                            <Link to="/about" className="text-brand-charcoal/80 hover:text-brand-teal font-sans text-sm font-semibold">About</Link>
                            <Link to="/commitments" className="text-brand-charcoal/80 hover:text-brand-teal font-sans text-sm font-semibold">Commitments</Link>
                            <Link to="/app" className="text-brand-teal hover:text-brand-teal/80 font-sans text-sm font-bold">Open Clarity Coach</Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="w-full max-w-4xl mx-auto flex-grow px-4 sm:px-6">
                
                {/* Hero Section */}
                <section className="text-center my-16 py-12">
                    <HearthArch className="w-32 h-16 text-brand-terracotta mx-auto mb-6" />
                    <h1 className="text-5xl sm:text-6xl font-bold font-serif text-brand-charcoal tracking-tight">
                        Hearthside Works
                    </h1>
                    <h2 className="text-2xl font-serif text-brand-terracotta mt-4">
                        "Hear Me, See Me, Know Me."
                    </h2>
                    <p className="max-w-3xl mx-auto mt-6 text-xl text-brand-charcoal/90 leading-relaxed font-sans">
                        We build tools that create **warmth, connection, and understanding**. 
                        Our philosophy is built on the metaphor of the hearth—a safe, central place for gathering and mutual understanding.
                    </p>
                </section>

                {/* Product Card Section (Existing functionality) */}
                <section className="my-16">
                    <Card className="w-full shadow-2xl border-brand-teal/30">
                        <CardHeader className="text-center bg-brand-teal/5 rounded-t-lg">
                            <CardTitle className="text-3xl text-brand-teal font-serif">Clarity Coach</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 flex flex-col items-center">
                            <p className="mb-8 max-w-prose text-brand-charcoal/90">
                                Our flagship product: A communication tool designed to help you speak with intention and listen with empathy.
                            </p>
                            <Link to="/app">
                                <Button className="bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-base py-6 px-10 shadow-lg hover:shadow-xl">
                                    Open Clarity Coach <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </section>
            </main>
            
            {/* --- UPDATED FOOTER --- */}
            <footer className="bg-white border-t border-gray-200 mt-16 p-6 sm:p-8">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                    <p className="text-brand-charcoal/70 text-sm">
                        &copy; {new Date().getFullYear()} Hearthside Works, LLC.
                    </p>
                    <div className="flex space-x-6">
                        {/* Footer links to the new dedicated pages */}
                        <FooterLink to="/commitments" text="Our Commitments" />
                        <FooterLink to="/about" text="About Us" />
                        <FooterLink to="/contact" text="Contact Us" />
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CompanyPage;