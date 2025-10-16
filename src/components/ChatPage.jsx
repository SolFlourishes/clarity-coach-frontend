// src/components/ChatPage.jsx

import React, { useState, useEffect, useRef } from 'react';

// This configuration will be moved to a central place later
const rawApiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const API_BASE_URL = rawApiUrl.replace(/\/\$/, "");

// Replaced original export const ChatPage = ...
const ChatPage = () => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Initial message when component mounts
  useEffect(() => {
    setHistory([{ role: 'model', content: '<p>Hi there! I\'m the Clarity Coach. How can I help you navigate a communication challenge today?</p><p>You can ask for advice, role-play a conversation, or brainstorm solutions.</p>' }]);
  }, []);

  // Auto-scroll to the bottom on new messages or loading state change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    // Optimistic UI update
    const newHistory = [...history, { role: 'user', content: input }];
    setHistory(newHistory);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ history: newHistory }), // Send entire conversation history
      });
      
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Update history with AI's response
      setHistory(prevHistory => [...prevHistory, { role: 'model', content: data.response }]);

    } catch (error) {
      console.error('Chat API Error:', error);
      setHistory(prevHistory => [...prevHistory, { role: 'model', content: `<p class="text-red-500">Error: Could not connect to the Chat Coach. Please check the API server address.</p>` }]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = (message, index) => {
      const isUser = message.role === 'user';
      const bgColor = isUser ? 'bg-brand-purple/10 dark:bg-brand-purple/20' : 'bg-brand-cream/50 dark:bg-gray-800';
      const alignment = isUser ? 'self-end' : 'self-start';

      return (
          <div key={index} className={`max-w-[80%] my-1 p-3 rounded-xl ${bgColor} ${alignment} shadow-sm`}>
              <div 
                  dangerouslySetInnerHTML={{ __html: message.content }} 
                  className={`prose prose-sm dark:prose-invert max-w-none 
                    ${isUser ? 'prose-p:text-brand-charcoal/90 dark:prose-p:text-white' : 'prose-p:text-brand-charcoal/80 dark:prose-p:text-gray-300'}`}
              />
          </div>
      );
  };

  return (
      <div className="flex flex-col h-full bg-white dark:bg-gray-900 max-w-4xl mx-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl">
          <header className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-serif text-brand-terracotta font-bold">Chat Coach</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your real-time, empathetic guide.</p>
          </header>
          
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {history.map(renderMessage)}
              
              {/* Typing indicator */}
              {loading && (
                  <div className="self-start max-w-[80%] my-1 p-3 rounded-xl bg-brand-cream/50 dark:bg-gray-800 shadow-sm flex items-center">
                      <div className="w-12 h-6 bg-gray-100 dark:bg-gray-700 flex items-center space-x-1.5">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      </div>
                  </div>
              )}
              <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
              <input 
                  type="text" 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  placeholder="Describe your situation or ask a question..." 
                  disabled={loading}
                  className="flex-grow bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg p-2 focus:ring-brand-teal focus:border-brand-teal"
              />
              <button 
                  type="submit" 
                  disabled={loading || !input.trim()} 
                  className="bg-brand-teal hover:bg-brand-teal/90 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-400"
              >
                  Send
              </button>
          </form>
      </div>
  );
};

// CRITICAL FIX: Set to default export to resolve build errors.
export default ChatPage;