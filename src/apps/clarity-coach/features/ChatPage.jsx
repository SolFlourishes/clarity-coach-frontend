// src/apps/clarity-coach/features/ChatPage.jsx

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageCircleCode, ArrowUp, Zap, BookA, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
// FIX: Corrected paths for internal shared components/utilities
import { useCopyToClipboard } from '../shared/useCopyToClipboard'; 
import { Feedback } from '../shared/Feedback'; 

// FIX: Corrected paths for generic UI components
import { Card, CardContent, CardHeader } from '../shared/card';
import { Button } from '../shared/button';
import { Textarea } from '../shared/textarea';
// --- END FIX ---

const rawApiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const API_BASE_URL = rawApiUrl.replace(/\/$/, "");

// Mock chat history structure
const initialHistory = [
    { type: 'ai', text: "Welcome to the Chat Coach! I'm here to help you practice difficult conversations or get real-time advice. How can I assist you today?" },
];

// Helper function to render messages (reusing UI components)
const ChatMessage = ({ message, onFeedbackSubmit, isSuccess }) => {
    const isAI = message.type === 'ai';
    const messageClass = isAI 
        ? "bg-gray-100 dark:bg-gray-700 rounded-bl-none" 
        : "bg-brand-teal text-white rounded-br-none ml-auto";
    const title = isAI ? 'Clarity Coach' : 'You';

    return (
        <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}>
            <Card className={`max-w-3xl p-4 shadow-md ${messageClass}`}>
                <CardHeader className="p-0 pb-2 flex-row items-center">
                    {isAI ? <Zap className="h-4 w-4 mr-2 text-brand-purple" /> : null}
                    <span className="font-semibold text-sm">{title}</span>
                </CardHeader>
                <CardContent className="p-0 text-base">
                    {message.text}
                </CardContent>
            </Card>
        </div>
    );
};


const ChatPage = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState(initialHistory);
    const [loading, setLoading] = useState(false);
    const chatContainerRef = useRef(null);

    // Scroll to the latest message whenever history updates
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [history]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput('');
        setLoading(true);

        // 1. Add user message to history
        setHistory(prev => [...prev, { type: 'user', text: userMessage }]);

        try {
            const response = await fetch(`${API_BASE_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: userMessage, 
                    history: history, // Send entire context for conversational flow
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // 2. Add AI response to history
            setHistory(prev => [...prev, { type: 'ai', text: data.response || 'Sorry, I lost my train of thought.' }]);
            
        } catch (error) {
            console.error('Chat API Error:', error);
            // 3. Add error message to history
            setHistory(prev => [...prev, { type: 'ai', text: 'Oops! The connection to the Coach was lost. Try again later.' }]);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex flex-col h-[calc(100vh-64px)] max-w-5xl mx-auto p-4">
            
            <header className="text-center py-4 border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-4xl font-serif font-bold text-brand-charcoal dark:text-white flex items-center justify-center gap-2">
                    <MessageCircleCode className="h-8 w-8 text-brand-terracotta" />
                    Chat Coach
                </h1>
                <p className="mt-1 text-lg text-brand-charcoal/80 dark:text-gray-300">
                    Your safe space for practicing tough conversations.
                </p>
            </header>
            
            {/* Chat History Area */}
            <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 space-y-4">
                {history.map((msg, index) => (
                    <ChatMessage 
                        key={index} 
                        message={msg}
                    />
                ))}
                {loading && (
                    <div className="flex justify-start mb-4">
                        <Card className="max-w-xs p-4 bg-gray-100 dark:bg-gray-700 rounded-bl-none shadow-md">
                            <Sparkles className="h-4 w-4 animate-pulse text-brand-teal" />
                            <span className="text-sm ml-2">Coach is thinking...</span>
                        </Card>
                    </div>
                )}
            </div>

            {/* Input Form */}
            <Card className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <form onSubmit={handleSendMessage} className="flex space-x-3">
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message, or describe a scenario..."
                        rows={1}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage(e);
                            }
                        }}
                        className="flex-grow resize-none io-textarea"
                        disabled={loading}
                    />
                    <Button 
                        type="submit" 
                        disabled={!input.trim() || loading}
                        className="bg-brand-terracotta hover:bg-brand-terracotta/90 text-white font-bold px-4 h-10 flex items-center justify-center transition-colors disabled:opacity-50"
                        aria-label="Send message"
                    >
                        <ArrowUp className="h-5 w-5" />
                    </Button>
                </form>
            </Card>
            
        </div>
    );
};

export default ChatPage;