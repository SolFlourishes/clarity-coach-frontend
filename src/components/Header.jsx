import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from "./theme-toggle.tsx"; // Assuming the toggle component is .tsx
import { useTheme } from "../hooks/use-theme"; 

// Brand color variables used for specific accents
const GOLD_ACCENT = 'var(--gold-accent)';
const PRIMARY_TEAL = 'var(--teal-primary)';

const Header = () => {
    // 1. Hook usage to get state (used for styling/conditional rendering if needed)
    const { theme } = useTheme(); 

    // Navigation links (Example, adjust to your actual Clarity Coach links)
    const navItems = [
        { name: "Translate", url: "/translate" },
        { name: "Chat", url: "/chat" },
        // Link back to the new landing page
        { name: "Hearthside Home", url: "https://hearthsideworks.com" } 
    ];
    
    return (
        // Apply dynamic background/text colors via CSS variables
        <header 
            style={{ backgroundColor: 'var(--color-header-bg)', color: 'var(--color-header-text)' }} 
            className="p-4 shadow-md transition duration-300"
        >
            <div className="container mx-auto flex justify-between items-center">
                
                {/* Logo / App Name */}
                <Link 
                    to="/" 
                    className="text-2xl font-serif font-bold tracking-wide" 
                    style={{ color: 'var(--color-header-text)' }}
                >
                    Clarity Coach
                </Link>
                
                {/* Navigation and Theme Toggle */}
                <nav className="flex items-center space-x-6">
                    <ul className="flex space-x-6">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                {/* Use <a> for external link, Link for internal */}
                                {item.url.startsWith('http') ? (
                                    <a 
                                        href={item.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-lg font-sans transition duration-200 hover:text-[color:var(--gold-accent)]"
                                        style={{ color: 'var(--color-header-text)' }}
                                    >
                                        {item.name}
                                    </a>
                                ) : (
                                    <Link 
                                        to={item.url}
                                        className="text-lg font-sans transition duration-200 hover:text-[color:var(--gold-accent)]"
                                        style={{ color: 'var(--color-header-text)' }}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                    
                    {/* Theme Toggle Button */}
                    <ThemeToggle /> 
                </nav>
            </div>
        </header>
    );
};

export { Header }; (and keep const Header = () => { ... })