// D:\Projects\clarity-coach-frontend\src\components\AppLayout.jsx

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import HearthArch from './HearthArch';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';

const AppLayout = ({ theme, toggleTheme, children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Common classes for navigation links for consistent styling
    const navLinkClasses = "text-brand-charcoal/80 dark:text-gray-300 hover:text-brand-teal dark:hover:text-brand-teal font-sans font-semibold transition-colors px-3 py-2 rounded-md text-sm";
    const activeNavLinkClasses = "text-brand-teal bg-brand-teal/10 dark:bg-brand-teal/20";

    // Reusable navigation links component for both desktop and mobile
    const navLinks = (
        <>
            {/* NavLink to the core app's homepage - /app */}
            <NavLink 
                to="/app" 
                className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} 
                onClick={() => setIsMenuOpen(false)}
                end
            >
                Home
            </NavLink>
            {/* NavLink to the Translate (Draft) mode - /app/translate/draft */}
            <NavLink 
                to="/app/translate/draft" 
                className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
                onClick={() => setIsMenuOpen(false)}
            >
                Translate
            </NavLink>
             {/* NavLink to the Analyze mode - /app/translate/analyze */}
            <NavLink 
                to="/app/translate/analyze" 
                className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
                onClick={() => setIsMenuOpen(false)}
            >
                Analyze
            </NavLink>
            {/* NavLink to the Chat Coach mode - /app/chat */}
            <NavLink 
                to="/app/chat" 
                className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
                onClick={() => setIsMenuOpen(false)}
            >
                Chat Coach
            </NavLink>
            
            {/* "More" Dropdown Menu */}
            <div className="relative group">
                <span className={`${navLinkClasses} cursor-pointer flex items-center`}>
                    More
                    <ChevronDown className="w-4 h-4 ml-1" />
                </span>
                <div 
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible z-20"
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    {/* --- Company Pages (Root Routes) --- */}
                    <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm text-brand-charcoal/80 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">About Hearthside</Link>
                    <Link to="/commitments" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm text-brand-charcoal/80 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Our Commitments</Link>
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm text-brand-charcoal/80 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Contact Us</Link>
                    <Link to="/credits" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm text-brand-charcoal/80 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Credits</Link>

                    <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                    
                    {/* --- App-Specific Static Pages (Nested Routes) --- */}
                    <Link to="/app/how-to-use" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm text-brand-charcoal/80 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">How to Use</Link>
                    <Link to="/app/roadmap" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm text-brand-charcoal/80 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Roadmap</Link>
                    <Link to="/app/changelog" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm text-brand-charcoal/80 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Change Log</Link>
                </div>
            </div>
        </>
    );

    return (
        <div className={`app-container min-h-screen bg-brand-cream dark:bg-gray-900 text-brand-charcoal dark:text-gray-200`}>
            <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo and Brand Name - FIX: Links to App Home when inside the App */}
                        <Link to="/app" className="flex items-center gap-2 flex-shrink-0">
                            <HearthArch className="w-8 h-4 text-brand-terracotta" />
                            <span className="font-serif text-xl font-bold text-brand-charcoal dark:text-white">Clarity Coach</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-6">
                            {navLinks}
                        </nav>

                        {/* Theme Toggle and Mobile Menu Button */}
                        <div className="flex items-center gap-2">
                            <Button onClick={toggleTheme} variant="ghost" size="icon" aria-label="Toggle theme">
                                {theme === 'dark' ? <Sun className="h-5 w-5 text-brand-charcoal/70 dark:text-gray-300" /> : <Moon className="h-5 w-5 text-brand-charcoal/70 dark:text-gray-300" />}
                            </Button>
                            <div className="md:hidden">
                                <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="ghost" size="icon" aria-label="Open menu">
                                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-start">
                            {navLinks}
                        </nav>
                    </div>
                )}
            </header>

            <main className="w-full">
                {children}
            </main>
        </div>
    );
};

export default AppLayout;