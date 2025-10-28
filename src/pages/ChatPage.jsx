import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp, RefreshCw, Zap, BookA, MessageCircleCode } from 'lucide-react'; // Ensure all icons are imported
// FIX: Corrected paths for generic UI components
import { Card, CardContent, CardHeader } from '../shared/card';
import { Button } from '../shared/button';
import { Textarea } from '../shared/textarea';
// --- END FIX ---


// This configuration will be moved to a central place later
const rawApiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const API_BASE_URL = rawApiUrl.replace(/\/\s*$/, "");

// Mock chat history structure
const initialHistory = [
    { role: 'model', content: "<p>Hi there! I'm the **Clarity Coach**. How can I help you navigate a communication challenge today?</p><p>You can ask for advice, role-play a conversation, or brainstorm solutions.</p>" },
];

// Helper function to render messages (reusing UI components)
const ChatMessage = ({ message }) => {
    const isAI = message.role === 'model';
    const backgroundStyle = {
        backgroundColor: isAI ? 'var(--color-surface)' : 'var(--teal-primary)',
        color: isAI ? 'var(--color-text)' : 'var(--bg-light)',
        border: isAI ? '1px solid var(--border)' : 'none',
    };
    const icon = isAI ? <MessageCircleCode className="h-5 w-5" /> : <Zap className="h-5 w-5" />;

    return (
        <div className={`flex mb-4 ${isAI ? 'justify-start' : 'justify-end'}`}>
            <Card className={`max-w-xl p-4 shadow-md transition duration-300 rounded-2xl ${isAI ? 'rounded-tl-none' : 'rounded-br-none'}`} style={backgroundStyle}>
                <CardHeader className="flex flex-row items-center space-x-2 p-0 mb-2 border-b border-white/20">
                    {icon}
                    <h4 className="font-semibold text-sm">{isAI ? 'Clarity Coach' : 'You'}</h4>
                </CardHeader>
                <CardContent className="p-0">
                    {/* Rendered markdown/HTML content from API */}
                    <div dangerouslySetInnerHTML={{ __html: message.content }} className="prose dark:prose-invert max-w-none text-base" />
                </CardContent>
            </Card>
        </div>
    );
};


export const ChatPage = () => {
  const [history, setHistory] = useState(initialHistory);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  
  // Theme color for primary elements
  const PRIMARY_TEAL = 'var(--teal-primary)';
  const TERRACOTTA = 'var(--terracotta-warmth)';

  // Initial history load (removed the empty initial effect)
  
  // Scroll to bottom on history change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    // Build the history structure expected by the backend
    const apiHistory = history.map(msg => ({ 
        role: msg.role === 'ai' ? 'model' : 'user', 
        content: msg.content.replace(/<\/?p>/g, '') // Clean up HTML tags for API 
    }));
    
    const newUserMessage = { role: 'user', content: input };
    const newHistory = [...history, newUserMessage];
    setHistory(newHistory);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ history: [...apiHistory, newUserMessage] })
      });
      
      if (!response.ok) throw new Error('API Error: Failed to get chat response.');
      
      const data = await response.json();
      const modelResponse = { role: 'model', content: data.reply };
      setHistory(prev => [...prev, modelResponse]);

    } catch (error) {
      console.error('Chat API Error:', error);
      const errorResponse = { role: 'model', content: `<p><strong>Error:</strong> Sorry, the coach is unavailable. Please check your API connection.</p>` };
      setHistory(prev => [...prev, errorResponse]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div 
        className="flex flex-col h-[80vh] mx-auto p-4 rounded-lg shadow-xl transition duration-500 max-w-4xl" 
        style={{ 
            backgroundColor: 'var(--color-surface)', 
            color: 'var(--color-text)', 
            minHeight: '80vh' 
        }}
    >
        {/* Chat Messages Container */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {history.map((msg, index) => (
                <ChatMessage key={index} message={msg} />
            ))}

            {/* Loading Indicator */ }
            {loading && (
                <div className="flex justify-start mb-4">
                    <div className="p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-1.5"
                         style={{ backgroundColor: 'var(--color-surface)' }}>
                        <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: TERRACOTTA, animationDelay: '-0.3s' }}></div>
                        <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: TERRACOTTA, animationDelay: '-0.15s' }}></div>
                        <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: TERRACOTTA }}></div>
                    </div>
                </div>
            )}
            <div ref={chatEndRef} />
        </div>
        
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2" 
              style={{ backgroundColor: 'var(--color-surface)' }}>
            <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message, or describe a scenario..."
                rows={1}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                    }
                }}
                className="flex-grow resize-none p-2 rounded-lg border focus:ring-2"
                style={{ 
                    backgroundColor: 'var(--color-background)', 
                    color: 'var(--color-text)',
                    borderColor: 'var(--border)',
                    resize: 'none'
                }}
                disabled={loading}
            />
            <Button 
                type="submit" 
                disabled={!input.trim() || loading}
                className="font-bold px-4 h-10 flex items-center justify-center transition-colors disabled:opacity-50 rounded-lg"
                style={{ backgroundColor: TERRACOTTA, color: 'var(--text-dark)' }}
                aria-label="Send message"
            >
                <ArrowUp className="h-5 w-5" />
            </Button>
        </form>
    </div>
  );
};

// Exporting as a Named Export to align with App.jsx Named Imports
export { ChatPage };
