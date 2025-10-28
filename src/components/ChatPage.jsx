import React, { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '../config';

export const ChatPage = () => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    setHistory([{ role: 'model', content: '<p>Hi there! I\'m the Clarity Coach. How can I help you navigate a communication challenge today?</p><p>You can ask for advice, role-play a conversation, or brainstorm solutions.</p>' }]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const newHistory = [...history, { role: 'user', content: input }];
    setHistory(newHistory);
    setInput('');
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ history: newHistory })
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "The server had an issue connecting.");
      }
      const data = await response.json();
      setHistory(prev => [...prev, { role: 'model', content: data.reply }]);
    } catch (error) {
      setHistory(prev => [...prev, { role: 'model', content: `<p>Sorry, I seem to be having trouble connecting. The server reported: ${error.message}</p>` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <a href="#/" className="text-teal-600 dark:text-teal-400 hover:underline mb-4 inline-block">‹ Back to Modes</a>
        <div className="max-w-3xl mx-auto flex flex-col h-[75vh] bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-xl">
            <h1 className="text-xl font-semibold p-4 border-b border-gray-200 dark:border-gray-700 font-serif text-gray-900 dark:text-white">Chat with the Coach</h1>
            <div className="flex-grow p-4 overflow-y-auto space-y-4" role="log" aria-live="polite" aria-atomic="false">
                {history.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div 
                            className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg prose prose-sm dark:prose-invert break-words ${msg.role === 'user' ? 'bg-teal-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`} 
                            dangerouslySetInnerHTML={{ __html: msg.content }} 
                        />
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center space-x-1.5">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2" aria-label="Chat message form">
                <label htmlFor="chat-input" className="sr-only">Describe your situation</label>
                <input
                    id="chat-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe your situation..."
                    disabled={loading}
                    aria-label="Describe your situation"
                    className="flex-grow bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none"
                />
                <button type="submit" disabled={loading || !input.trim()} className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-500 dark:disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-teal-300" aria-label="Send message">
                    Send
                </button>
            </form>
        </div>
    </div>
  );
};