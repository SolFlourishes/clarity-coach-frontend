import React, { useState } from 'react';

// This configuration will be moved to a central place later
const rawApiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const API_BASE_URL = rawApiUrl.replace(/\/$/, "");

export const FeedbackModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [subject, setSubject] = useState('general');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');
        try {
            const response = await fetch(`${API_BASE_URL}/api/contact`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject, message, email, timestamp: new Date().toISOString() })
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Failed to send feedback.');
            }
            setStatus('Thank you! Your feedback has been sent.');
            setMessage(''); setEmail('');
            setTimeout(() => { setIsOpen(false); setStatus(''); }, 3000);
        } catch (error) {
            setStatus(`Failed to send. ${error.message}`);
        }
    };

    if (!isOpen) {
        return <button onClick={() => setIsOpen(true)} className="fixed bottom-5 right-5 bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold py-3 px-5 rounded-full shadow-lg transition-transform transform hover:scale-105 z-50">Feedback</button>;
    }
    
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-700">
                <div className="p-6 relative">
                     <button onClick={() => setIsOpen(false)} title="Close" className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 dark:hover:text-white text-2xl">&times;</button>
                     <h2 className="text-xl font-bold font-serif mb-2 text-gray-900 dark:text-white">General Feedback</h2>
                     <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Have a suggestion, bug report, or a question? Let us know!</p>
                     {status ? <p className="text-center text-green-500 dark:text-green-400">{status}</p> : (
                         <form onSubmit={handleSubmit} className="space-y-4">
                             <div>
                                 <label htmlFor="subject" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                                 <select id="subject" value={subject} onChange={e => setSubject(e.target.value)} className="modal-input">
                                     <option value="general">General Suggestion</option>
                                     <option value="bug">Bug Report</option>
                                     <option value="question">Question</option>
                                 </select>
                             </div>
                             <div>
                                  <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Your Email (Optional)</label>
                                 <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="So we can reply to you" className="modal-input" />
                             </div>
                             <div>
                                 <label htmlFor="message" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                                 <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} required rows="4" placeholder="Describe your feedback..." className="modal-input" />
                             </div>
                             <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg">Send Feedback</button>
                         </form>
                     )}
                </div>
            </div>
        </div>
    );
};