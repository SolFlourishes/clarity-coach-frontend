import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, ChevronDown } from 'lucide-react';

export const Header = ({ theme, toggleTheme }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        // --- NEW: Function to handle Escape key press ---
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown); // Add keydown listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown); // Clean up listener
        };
    }, []);

    const morePages = [
        { href: '/#about', label: 'About' },
        { href: '/#how-to-use', label: 'How to Use' },
        { href: '/#roadmap', label: 'Roadmap' },
        { href: '/#changelog', label: 'Change Log' },
        { href: '/#credits', label: 'Credits' },
        { href: '/#commitments', label: 'Our Commitments' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                <a href="/#" className="text-xl font-black tracking-wider text-teal-600 dark:text-teal-400 hover:text-teal-700 transition duration-150">
                    CLARITY COACH
                </a>
                <div className="flex items-center space-x-6">
                    <a href="/#translate/draft" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition duration-150">
                        Draft Mode
                    </a>
                    <a href="/#translate/analyze" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition duration-150">
                        Analyze Mode
                    </a>
                    <a href="/#chat" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition duration-150">
                        Chat
                    </a>
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition duration-150"
                        >
                            More <ChevronDown className="h-4 w-4 ml-1" />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1">
                                {morePages.map((page) => (
                                    <a
                                        key={page.href}
                                        href={page.href}
                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        {page.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 focus:outline-none"
                        aria-label="Toggle light and dark mode" // --- FIX #2 ---
                    >
                        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                </div>
            </nav>
        </header>
    );
};