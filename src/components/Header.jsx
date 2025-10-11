// File: Header.jsx (FULL CONTENT)
import React from 'react';
import { Moon, Sun } from 'lucide-react'; // Assuming you use Lucide icons

export const Header = ({ theme, toggleTheme }) => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                {/* Branding / Home Link */}
                <a href="/#" className="text-xl font-black tracking-wider text-purple-600 dark:text-purple-400 hover:text-purple-700 transition duration-150">
                    CLARITY COACH
                </a>

                {/* Navigation Links (Includes Back to Modes Link logic) */}
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
                    <a href="/#about" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition duration-150">
                        About
                    </a>

                    {/* Light/Dark Mode Toggle (Fixes Task 6) */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 focus:outline-none"
                        aria-label="Toggle light and dark mode"
                    >
                        {theme === 'dark' ? (
                            <Sun className="h-5 w-5" /> 
                        ) : (
                            <Moon className="h-5 w-5" /> 
                        )}
                    </button>
                </div>
            </nav>
        </header>
    );
};