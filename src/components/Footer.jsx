import React, { useState } from 'react';

// This configuration will be moved to a central place later
const rawApiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const API_BASE_URL = rawApiUrl.replace(/\/$/, "");

export const Footer = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const version = "3.0.1"; // The current version number

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Subscribing...');
        try {
            const response = await fetch(`${API_BASE_URL}/api/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Subscription failed');
            }
            setMessage('Success! Thanks for subscribing.');
            setEmail('');
        } catch (error) {
            setMessage(`Failed to subscribe. ${error.message}`);
        }
    };

    return (
        <footer className="bg-gray-100 dark:bg-gray-800/30 border-t border-gray-200 dark:border-gray-700">
            <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <p className="text-sm text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} Hearthside Works, LLC. All Rights Reserved.</p>
                        {/* --- Version Number Added Here --- */}
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Beta v{version}</p>
                        <a href="#/commitments" className="text-sm text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">Our Commitments (Privacy & Accessibility)</a>
                    </div>
                    <div>
                        <h2 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase">Stay Updated</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" required className="bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5" />
                            <button type="submit" className="text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Subscribe</button>
                        </form>
                        {message && <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{message}</p>}
                    </div>
                </div>
            </div>
        </footer>
    );
};