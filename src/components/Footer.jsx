import React, { useState } from 'react';

const rawApiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const API_BASE_URL = rawApiUrl.replace(/\/$/, "");
// --- NEW: Read the version from the environment variable ---
const appVersion = import.meta.env.VITE_APP_VERSION || '3.0.2';

export const Footer = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
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
        <footer className="bg-gradient-to-br from-gray-50 to-teal-50/30 dark:from-gray-800/30 dark:to-gray-900/30 border-t border-gray-200 dark:border-gray-700">
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="md:flex md:justify-between md:items-start">
                    <div className="mb-8 md:mb-0">
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">&copy; {new Date().getFullYear()} Hearthside Works, LLC. All Rights Reserved.</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Beta v{appVersion}</p>
                        <a href="#/commitments" className="inline-block mt-3 text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors">Our Commitments (Privacy & Accessibility)</a>
                    </div>
                    <div>
                        <h2 className="mb-3 text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">Stay Updated</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" required className="bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 block w-full px-4 py-2.5 transition-all" />
                            <button type="submit" className="text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800 font-semibold rounded-xl text-sm px-6 py-2.5 text-center transition-all hover:shadow-lg">Subscribe</button>
                        </form>
                        {message && <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 font-medium">{message}</p>}
                    </div>
                </div>
            </div>
        </footer>
    );
};