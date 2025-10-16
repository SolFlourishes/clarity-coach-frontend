// src/components/AppLayout.jsx

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import HearthArch from './HearthArch';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Menu, X } from 'lucide-react';

const AppLayout = ({ theme, toggleTheme, children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinkClasses = "text-brand-charcoal/70 hover:text-brand-teal font-sans font-semibold transition-colors";
    const activeNavLinkClasses = "text-brand-teal";

    const navLinks = (
        <>
            <NavLink to="/app" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} end>Home</NavLink>
            <NavLink to="/app/translate/draft" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Translate</NavLink>
            <NavLink to="/app/chat" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Chat Coach</NavLink>
            <div className="relative group">
                <span className={`${navLinkClasses} cursor-pointer`}>More</span>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible z-20">
                    <Link to="/about" className="block px-4 py-2 text-sm text-brand-charcoal/80 hover:bg-gray-100 dark:hover:bg-gray-700">About</Link>
                    <Link to="/app/how-to-use" className="block px-4 py-2 text-sm text-brand-charcoal/80 hover:bg-gray-100 dark:hover:bg-gray-700">How to Use</Link>
                    <Link to="/roadmap" className="block px-4 py-2 text-sm text-brand-charcoal/80 hover:bg-gray-100 dark:hover:bg-gray-700">Roadmap</Link>
                    <Link to="/app/changelog" className="block px-4 py-2 text-sm text-brand-charcoal/80 hover:bg-gray-100 dark:hover:bg-gray-700">Change Log</Link>
                    <Link to="/credits" className="block px-4 py-2 text-sm text-brand-charcoal/80 hover:bg-gray-100 dark:hover:bg-gray-700">Credits</Link>
                    <Link to="/commitments" className="block px-4 py-2 text-sm text-brand-charcoal/80 hover:bg-gray-100 dark:hover:bg-gray-700">Our Commitments</Link>
                </div>
            </div>
        </>
    );

    return (
        <div className={`app-container min-h-screen bg-brand-cream dark:bg-gray-900 text-brand-charcoal dark:text-gray-100`}>
            <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo and Brand Name */}
                        <Link to="/" className="flex items-center gap-2">
                            <HearthArch className="w-8 h-4 text-brand-terracotta" />
                            <span className="font-serif text-xl font-bold text-brand-charcoal dark:text-white">Hearthside Works</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {navLinks}
                        </nav>

                        {/* Theme Toggle and Mobile Menu Button */}
                        <div className="flex items-center gap-4">
                            <Button onClick={toggleTheme} variant="ghost" size="icon" aria-label="Toggle theme">
                                {theme === 'dark' ? <Sun className="h-5 w-5 text-brand-charcoal/70" /> : <Moon className="h-5 w-5 text-brand-charcoal/70" />}
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
                    <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
                        <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
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
```

### Next Steps

1.  **Apply the code:** Replace the content of your `src/components/AppLayout.jsx` file with the code above.
2.  **Commit and Push:**
    ```bash
    git add .
    git commit -m "FEAT: Build out full AppLayout with header and navigation"
    git push origin dev
    

