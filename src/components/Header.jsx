import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, ChevronDown } from 'lucide-react';

export const Header = ({ theme, toggleTheme }) => {
    // State to manage whether the dropdown is open or closed
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // Ref to detect clicks outside the dropdown menu
    const dropdownRef = useRef(null);

    // This effect adds an event listener to close the dropdown if you click outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
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
        <header className="fixed top-0 left-0 right-0 z-50 bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                {/* Branding / Home Link */}
                <a href="/#" className="text-xl font-black tracking-wider text-purple-600 dark:text-purple-400 hover:text-purple-700 transition duration-150">
                    CLARITY COACH
                </a>

                {/* Main Navigation Links */}
                <div className="flex items-center space-x-6">
                    <a href="/#translate/draft" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition duration-150">
                        Draft Mode
                    </a>
                    <a href="/#translate/analyze" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition duration-150">
                        Analyze Mode
                    </a>
                    <a href="/#chat" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition duration-150">
                        Chat
                    </a>

                    {/* "More" Dropdown Button and Menu */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition duration-150"
                        >
                            More <ChevronDown className="h-4 w-4 ml-1" />
                        </button>
                        
                        {/* Conditionally render the dropdown menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1">
                                {morePages.map((page) => (
                                    <a
                                        key={page.href}
                                        href={page.href}
                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        onClick={() => setIsDropdownOpen(false)} // Close menu on click
                                    >
                                        {page.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Light/Dark Mode Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 focus:outline-none"
                        aria-label="Toggle light and dark mode"
                    >
                        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                </div>
            </nav>
        </header>
    );
};