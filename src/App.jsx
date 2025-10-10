import React, { useState, useEffect, useRef } from 'react';

// --- Configuration ---
// UPDATED: This now reads from the environment variable set in Vercel.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// --- Main App Component ---
// This component handles routing and the main layout.
const App = () => {
    const [page, setPage] = useState(getCurrentPage());

    function getCurrentPage() {
        const hash = window.location.hash.slice(1);
        // Default to home page if hash is empty or just a slash
        return (hash === '/' || hash === '') ? 'home' : hash;
    }

    useEffect(() => {
        const handleHashChange = () => {
            setPage(getCurrentPage());
        };
        window.addEventListener('hashchange', handleHashChange);
        // Set initial page on load
        setPage(getCurrentPage()); 
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // Simple Hash-based Router
    const renderPage = () => {
        const [path, param] = page.split('/').filter(Boolean);
        
        if (path === 'home') {
            return <HomePage />;
        }
        if (path === 'translate' && param) {
            return <TranslatePage mode={param} />;
        }
        if (path === 'chat') {
            return <ChatPage />;
        }
        
        // Static Pages
        const staticPages = {
            'about': <AboutPage />,
            'how-to-use': <HowToUsePage />,
            'roadmap': <RoadmapPage />,
            'changelog': <ChangeLogPage />,
            'enhancements': <EnhancementsPage />,
            'credits': <CreditsPage />,
            'commitments': <CommitmentsPage />,
        };
        return staticPages[path] || <HomePage />; // Fallback to HomePage
    };

    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen font-sans">
            <AppLayout>
                {renderPage()}
            </AppLayout>
        </div>
    );
};

// --- Layout Components ---

const AppLayout = ({ children }) => {
    const [showBanner, setShowBanner] = useState(true);

    return (
        <div className="flex flex-col min-h-screen">
            {showBanner && <AlphaBanner onDismiss={() => setShowBanner(false)} />}
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
            <FeedbackModal />
            <Footer />
        </div>
    );
};

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    
    const navLinks = [
        { href: '#/how-to-use', text: 'How to Use' },
        { href: '#/about', text: 'About' },
        { href: '#/roadmap', text: 'Roadmap' },
        { href: '#/changelog', text: 'Change Log' },
        { href: '#/credits', text: 'Credits' },
        { href: '#/commitments', text: 'Our Commitments' },
    ];

    return (
        <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <a href="#/" className="flex items-center gap-3 text-white no-underline">
                         <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-teal-600">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                         </div>
                        <div className="flex items-baseline gap-2">
                             <span className="text-xl font-serif font-bold text-white">Hearthside Works</span>
                             <span className="text-sm font-light text-gray-400">/ Clarity Coach</span>
                        </div>
                    </a>
                    <nav className="hidden md:flex items-center space-x-6">
                        <a href="#/translate/draft" className="text-gray-300 hover:text-teal-400 transition-colors">Translate</a>
                        <a href="#/chat" className="text-gray-300 hover:text-teal-400 transition-colors">Chat</a>
                        <div className="relative">
                            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-300 hover:text-teal-400 transition-colors flex items-center">
                                More
                                <svg className={`w-4 h-4 ml-1 transition-transform ${menuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 border border-gray-700" onMouseLeave={() => setMenuOpen(false)}>
                                    {navLinks.map(link => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-300 hover:bg-teal-600 hover:text-white">{link.text}</a>)}
                                </div>
                            )}
                        </div>
                    </nav>
                     <div className="md:hidden">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-300 hover:text-teal-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                        </button>
                         {menuOpen && (
                            <div className="absolute top-16 right-0 left-0 w-full bg-gray-800 p-4" onClick={() => setMenuOpen(false)}>
                               <a href="#/translate/draft" className="block py-2 text-gray-300 hover:text-teal-400">Translate</a>
                               <a href="#/chat" className="block py-2 text-gray-300 hover:text-teal-400">Chat</a>
                                {navLinks.map(link => <a key={link.href} href={link.href} className="block py-2 text-gray-300 hover:text-teal-400">{link.text}</a>)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

const Footer = () => {
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
            if (!response.ok) throw new Error('Subscription failed');
            setMessage('Success! Thanks for subscribing.');
            setEmail('');
        } catch (error) {
            setMessage('Failed to subscribe. Please try again.');
        }
    };

    return (
        <footer className="bg-gray-800/30 border-t border-gray-700">
            <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                         <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Hearthside Works, LLC. All Rights Reserved.</p>
                         <a href="#/commitments" className="text-sm text-gray-400 hover:text-teal-400">Our Commitments (Privacy & Accessibility)</a>
                    </div>
                    <div>
                        <h2 className="mb-2 text-sm font-semibold text-gray-300 uppercase">Stay Updated</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" required className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5" />
                             <button type="submit" className="text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Subscribe</button>
                        </form>
                        {message && <p className="mt-2 text-sm text-gray-400">{message}</p>}
                    </div>
                </div>
            </div>
        </footer>
    );
};

const AlphaBanner = ({ onDismiss }) => (
    <div className="relative bg-terracotta-500 text-white p-3 text-center text-sm">
        <p><strong>Welcome to the Clarity Coach Beta!</strong> This is an early version. Your insights are invaluable.</p>
        <button onClick={onDismiss} className="absolute top-1/2 right-4 -translate-y-1/2 text-xl">&times;</button>
    </div>
);


// --- Page Components ---

const HomePage = () => {
    return (
        <div className="text-center py-10 md:py-20">
            <h1 className="text-4xl md:text-6xl font-extrabold font-serif text-white mb-4 leading-tight">
                Welcome to the <span className="text-teal-400">Clarity Coach</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                A tool by <strong className="font-semibold">Hearthside Works</strong> to help you bridge communication gaps, say what you mean, and understand what others truly mean.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <ModeCard 
                    title="Draft a Message" 
                    description="Translate your intent into a clear message tailored for any audience." 
                    linkTo="#/translate/draft" 
                />
                <ModeCard 
                    title="Analyze a Message" 
                    description="Decode the likely intent behind a message you've received." 
                    linkTo="#/translate/analyze" 
                />
                <ModeCard 
                    title="Chat with the Coach" 
                    description="Get real-time advice on navigating a tricky conversation." 
                    linkTo="#/chat" 
                />
            </div>
        </div>
    );
};

const loadingTips = [
    "Average translation time is 5-10 seconds.", "Analyzing tone, subtext, and pragmatic meaning...", "Tip: Providing clear context leads to better translations.", "Did you know? The 'Double Empathy Problem' suggests communication gaps are a two-way street.", "Checking for potential misinterpretations...", "Tip: Indirect communicators often use questions to make suggestions softly.", "Considering how different neurotypes might perceive this message...",
];

const TranslatePage = ({ mode = 'draft' }) => {
    const [isAdvancedMode, setIsAdvancedMode] = useState(false);
    const [senderStyle, setSenderStyle] = useState('let-ai-decide');
    const [receiverStyle, setReceiverStyle] = useState('indirect');
    const [senderNeurotype, setSenderNeurotype] = useState('Unsure');
    const [receiverNeurotype, setReceiverNeurotype] = useState('Unsure');
    const [senderGeneration, setSenderGeneration] = useState('unsure');
    const [receiverGeneration, setReceiverGeneration] = useState('unsure');
    const [text, setText] = useState('');
    const [context, setContext] = useState('');
    const [interpretation, setInterpretation] = useState('');
    const [analyzeContext, setAnalyzeContext] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [aiResponse, setAiResponse] = useState(null);
    const [feedbackSuccess, setFeedbackSuccess] = useState({ explanation: false, response: false });
    const [loadingMessage, setLoadingMessage] = useState(loadingTips[0]);

    const isDraftMode = mode === 'draft';
    
    useEffect(() => {
       handleReset();
    }, [mode]);

    useEffect(() => {
        let interval;
        if (loading) {
            interval = setInterval(() => {
                setLoadingMessage(prev => {
                    const currentIndex = loadingTips.indexOf(prev);
                    const nextIndex = (currentIndex + 1) % loadingTips.length;
                    return loadingTips[nextIndex];
                });
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [loading]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setAiResponse(null);
        setFeedbackSuccess({ explanation: false, response: false });
        
        try {
            let finalSenderStyle = senderStyle;
            if (senderStyle === 'let-ai-decide') {
                const textForClassification = isDraftMode ? (context || text) : text;
                if (!textForClassification) {
                    throw new Error("Please provide text for the AI to analyze your style.");
                }
                const classificationResponse = await fetch(`${API_BASE_URL}/api/classify-style`, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: textForClassification })
                });
                if(!classificationResponse.ok) throw new Error("Could not classify style.");
                const data = await classificationResponse.json();
                finalSenderStyle = data.style;
            }

            const requestBody = {
                mode, text, context, interpretation, analyzeContext,
                sender: finalSenderStyle, receiver: receiverStyle,
                senderNeurotype, receiverNeurotype, senderGeneration, receiverGeneration
            };

            const translateResponse = await fetch(`${API_BASE_URL}/api/translate`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });

            if (!translateResponse.ok) {
                 const errData = await translateResponse.json();
                 throw new Error(errData.error || 'An error occurred during translation.');
            }
            
            const data = await translateResponse.json();
            setAiResponse(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleReset = () => {
        setText(''); setContext(''); setInterpretation(''); setAnalyzeContext(''); setError(null);
        setAiResponse(null); setFeedbackSuccess({ explanation: false, response: false });
        setIsAdvancedMode(false); setSenderStyle('let-ai-decide'); setReceiverStyle('indirect');
        setSenderNeurotype('Unsure'); setReceiverNeurotype('Unsure');
        setSenderGeneration('unsure'); setReceiverGeneration('unsure');
    };
    
    const handleFeedbackSubmit = async (feedbackData, type) => {
        try {
            await fetch(`${API_BASE_URL}/api/feedback/rating`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...feedbackData, mode, timestamp: new Date().toISOString() })
            });
            setFeedbackSuccess(prev => ({ ...prev, [type]: true }));
        } catch (err) {
            setError('Sorry, could not submit feedback.');
        }
    };
    
    return (
      <div>
        <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2">{isDraftMode ? 'Draft a Message' : 'Analyze a Message'}</h1>
        <p className="text-gray-400 max-w-3xl mx-auto text-center mb-8">{isDraftMode ? "Clearly defining your intent helps the AI create a more accurate translation." : "Explaining the situation and your interpretation helps the AI understand the communication gap."}</p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* --- Input Boxes --- */}
            <div className={`grid gap-6 ${isDraftMode ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
                {isDraftMode ? (
                    <>
                        <IOBox title="What I Mean (Intent)" required>
                            <textarea value={context} onChange={(e) => setContext(e.target.value)} placeholder="What is the goal of your message?" required className="io-textarea" />
                        </IOBox>
                        <IOBox title="What I Wrote (Draft)" required>
                            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="What are your key points or raw thoughts?" required className="io-textarea" />
                        </IOBox>
                    </>
                ) : (
                    <>
                        <IOBox title="What They Wrote" required>
                             <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste the message you received." required className="io-textarea" />
                        </IOBox>
                        <IOBox title="What's the Situation? (Context)">
                             <textarea value={analyzeContext} onChange={(e) => setAnalyzeContext(e.target.value)} placeholder="e.g., This is my boss, the project is late..." className="io-textarea" />
                        </IOBox>
                        <IOBox title="How I Heard It" required>
                            <textarea value={interpretation} onChange={(e) => setInterpretation(e.target.value)} placeholder="How did this message make you feel or what do you think it means?" required className="io-textarea" />
                        </IOBox>
                    </>
                )}
            </div>

            {/* --- Selectors --- */}
            <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectorGroup label="My Communication Style" tooltip="Direct: You say what you mean. Indirect: You use context and subtext.">
                        <RadioPillGroup name="sender" value={senderStyle} onChange={setSenderStyle} options={['direct', 'indirect', 'let-ai-decide']} />
                    </SelectorGroup>
                     <SelectorGroup label="Audience's Style">
                        <RadioPillGroup name="receiver" value={receiverStyle} onChange={setReceiverStyle} options={['direct', 'indirect']} />
                    </SelectorGroup>
                </div>
                <div className="text-center">
                    <label className="flex items-center justify-center gap-2 text-sm text-gray-400 cursor-pointer">
                        <input type="checkbox" checked={isAdvancedMode} onChange={() => setIsAdvancedMode(!isAdvancedMode)} className="w-4 h-4 text-teal-600 bg-gray-700 border-gray-600 rounded focus:ring-teal-500" />
                        Show Advanced Options
                    </label>
                </div>
                 {isAdvancedMode && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-4 border-t border-gray-700">
                        <SelectorGroup label="My Neurotype" tooltip="Autism: May prefer direct, literal language. ADHD: May communicate in non-linear ways.">
                           <RadioPillGroup name="sender-nt" value={senderNeurotype} onChange={setSenderNeurotype} options={['Autism', 'ADHD', 'Neurotypical', 'Unsure']} />
                        </SelectorGroup>
                         <SelectorGroup label="Audience's Neurotype">
                           <RadioPillGroup name="receiver-nt" value={receiverNeurotype} onChange={setReceiverNeurotype} options={['Autism', 'ADHD', 'Neurotypical', 'Unsure']} />
                        </SelectorGroup>
                        <SelectorGroup label="My Generation" tooltip="Gen Z: ~1997-2012, Millennial: ~1981-1996, Gen X: ~1965-1980, Boomer: ~1946-1964">
                            <RadioPillGroup name="sender-gen" value={senderGeneration} onChange={setSenderGeneration} options={['Gen Z', 'Millennial', 'Gen X', 'Boomer', 'unsure']} />
                        </SelectorGroup>
                         <SelectorGroup label="Audience's Generation">
                           <RadioPillGroup name="receiver-gen" value={receiverGeneration} onChange={setReceiverGeneration} options={['Gen Z', 'Millennial', 'Gen X', 'Boomer', 'unsure']} />
                        </SelectorGroup>
                    </div>
                )}
            </div>

            {/* --- Action Buttons --- */}
             <div className="flex justify-center items-center gap-4">
                 <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none" disabled={loading}>
                     {loading ? (
                         <span className="flex items-center gap-2">
                             <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                             {loadingMessage}
                         </span>
                     ) : 'Translate'}
                 </button>
                 <button type="button" onClick={handleReset} className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-bold py-3 px-6 rounded-lg transition">Reset</button>
             </div>
        </form>
        
        {error && <div className="mt-6 text-center text-red-400 p-3 bg-red-900/50 rounded-lg">{error}</div>}

        {aiResponse && (
            <div className="mt-12 pt-8 border-t border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-6">
                <IOBox title={isDraftMode ? "How They Might Hear It (Explanation)" : "What They Likely Meant (Explanation)"}>
                    <div className="prose prose-invert max-w-none prose-sm sm:prose-base" dangerouslySetInnerHTML={{ __html: aiResponse.explanation }} />
                    <Feedback type="explanation" onSubmit={(data) => handleFeedbackSubmit(data, 'explanation')} isSuccess={feedbackSuccess.explanation} />
                </IOBox>
                <IOBox title={isDraftMode ? "The Translation (Suggested Draft)" : "The Translation (Suggested Response)"}>
                    <div className="prose prose-invert max-w-none prose-sm sm:prose-base" dangerouslySetInnerHTML={{ __html: aiResponse.response }} />
                    <Feedback type="response" onSubmit={(data) => handleFeedbackSubmit(data, 'response')} isSuccess={feedbackSuccess.response} />
                </IOBox>
            </div>
        )}
      </div>
    );
};

const ChatPage = () => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    setHistory([{ role: 'model', content: '<p>Hi there! I\'m the Clarity Coach. How can I help you navigate a communication challenge today?</p><p>You can ask for advice, role-play a conversation, or brainstorm solutions.</p>' }]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

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
      if (!response.ok) throw new Error();
      const data = await response.json();
      setHistory(prev => [...prev, { role: 'model', content: data.reply }]);
    } catch (error) {
      setHistory(prev => [...prev, { role: 'model', content: '<p>Sorry, I seem to be having trouble connecting. Please try again.</p>' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[75vh] bg-gray-800 rounded-lg border border-gray-700 shadow-xl">
        <h1 className="text-xl font-semibold p-4 border-b border-gray-700 font-serif">Chat with the Coach</h1>
        <div className="flex-grow p-4 overflow-y-auto space-y-4">
            {history.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div 
                        className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg prose prose-invert prose-sm break-words ${msg.role === 'user' ? 'bg-teal-600 text-white' : 'bg-gray-700'}`} 
                        dangerouslySetInnerHTML={{ __html: msg.content }} 
                    />
                </div>
            ))}
            {loading && (
                <div className="flex justify-start">
                    <div className="p-3 rounded-lg bg-gray-700 flex items-center space-x-1.5">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    </div>
                </div>
            )}
            <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700 flex gap-2">
            <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Describe your situation..." 
                disabled={loading}
                className="flex-grow bg-gray-700 border border-gray-600 text-white rounded-lg p-2 focus:ring-teal-500 focus:border-teal-500"
            />
            <button type="submit" disabled={loading || !input.trim()} className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed">
                Send
            </button>
        </form>
    </div>
  );
};


// --- UI Helper Components ---

const ModeCard = ({ title, description, linkTo }) => (
    <a href={linkTo} className="block bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-teal-500 hover:-translate-y-1 transition-transform shadow-lg">
        <h3 className="text-xl font-bold font-serif text-teal-400 mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </a>
);

const IOBox = ({ title, required, children }) => (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col h-full">
        <label className="block mb-2 text-sm font-medium text-gray-300">
            {title} {required && <span className="text-red-400">*</span>}
        </label>
        {children}
    </div>
);

const SelectorGroup = ({ label, tooltip, children }) => (
    <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-1">
            {label}
            {tooltip && (
                <div className="group relative">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <div className="absolute bottom-full mb-2 w-64 bg-gray-900 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-gray-700 shadow-lg z-10">
                        {tooltip}
                    </div>
                </div>
            )}
        </label>
        {children}
    </div>
);

const RadioPillGroup = ({ name, value, onChange, options }) => (
    <div className="flex flex-wrap gap-2">
        {options.map(option => (
            <label key={option} className={`px-3 py-1 text-sm rounded-full cursor-pointer transition-colors ${value === option ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                <input type="radio" name={name} value={option} checked={value === option} onChange={e => onChange(e.target.value)} className="hidden" />
                <span className="capitalize">{option.replace('-', ' ')}</span>
            </label>
        ))}
    </div>
);

const Feedback = ({ type, onSubmit, isSuccess }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hover, setHover] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating > 0 && !isSuccess) {
            onSubmit({ [`${type}Rating`]: rating, [`${type}Comment`]: comment });
        }
    };

    if (isSuccess) {
        return <div className="mt-4 text-center text-sm text-green-400">Thank you for your rating!</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4 pt-4 border-t border-dashed border-gray-600 space-y-3">
            <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                        <button type="button" key={ratingValue}
                            className={`text-2xl transition-colors ${ratingValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-600 hover:text-gray-500'}`}
                            onClick={() => setRating(ratingValue)}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(0)}
                            aria-label={`${ratingValue} out of 5 stars`}
                        >
                            &#9733;
                        </button>
                    );
                })}
            </div>
             <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="How could this be improved?" className="io-textarea text-sm" />
             <button type="submit" disabled={rating === 0} className="w-full text-center bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm font-bold py-2 px-4 rounded-lg disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed">
                Rate this {type}
            </button>
        </form>
    );
};

const FeedbackModal = () => {
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
            if (!response.ok) throw new Error();
            setStatus('Thank you! Your feedback has been sent.');
            setMessage(''); setEmail('');
            setTimeout(() => { setIsOpen(false); setStatus(''); }, 3000);
        } catch (error) {
            setStatus('Failed to send. Please try again later.');
        }
    };

    if (!isOpen) {
        return <button onClick={() => setIsOpen(true)} className="fixed bottom-5 right-5 bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold py-3 px-5 rounded-full shadow-lg transition-transform transform hover:scale-105 z-50">Feedback</button>;
    }
    
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
                <div className="p-6 relative">
                     <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">&times;</button>
                     <h2 className="text-xl font-bold font-serif mb-2">General Feedback</h2>
                     <p className="text-sm text-gray-400 mb-4">Have a suggestion, bug report, or a question? Let us know!</p>
                     {status ? <p className="text-center text-green-400">{status}</p> : (
                         <form onSubmit={handleSubmit} className="space-y-4">
                             <div>
                                 <label htmlFor="subject" className="block mb-1 text-sm font-medium text-gray-300">Subject</label>
                                 <select id="subject" value={subject} onChange={e => setSubject(e.target.value)} className="modal-input">
                                     <option value="general">General Suggestion</option>
                                     <option value="bug">Bug Report</option>
                                     <option value="question">Question</option>
                                 </select>
                             </div>
                             <div>
                                  <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-300">Your Email (Optional)</label>
                                 <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="So we can reply to you" className="modal-input" />
                             </div>
                             <div>
                                 <label htmlFor="message" className="block mb-1 text-sm font-medium text-gray-300">Message</label>
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


// --- Static Page Components ---
// All content is preserved from the original files per UR1.1

const ContentPage = ({ children }) => (
    <div className="max-w-3xl mx-auto bg-gray-800/50 p-6 sm:p-8 rounded-lg border border-gray-700">
        <div className="prose prose-invert prose-lg max-w-none prose-h1:font-serif prose-h1:text-teal-400 prose-strong:text-terracotta-400 prose-a:text-teal-400 hover:prose-a:text-teal-300">
            {children}
        </div>
    </div>
);

const AboutPage = () => (
    <ContentPage>
        <h1>Hear Me, See Me, Know Me.</h1>
        <p className="lead"><strong>Our Vision:</strong> To create a world where everyone can find their community of understanding—and feel supported, valued, and known.</p>
        <h3>What is "Hearthside Works"?</h3>
        <p>A hearth is the heart of a home—a source of warmth, a place for gathering, and the center of connection. At Hearthside Works, LLC, we build tools that create that same sense of warmth, connection, and understanding in our digital and professional lives.</p>
        <h2>The Clarity Coach: Our Flagship Product</h2>
        <h3>The Challenge: A Costly Communication Gap</h3>
        <p>Have you ever felt like you were speaking a different language than a colleague or friend? This is a common and costly reality. A significant communication gap exists between different neurotypes (e.g., neurodivergent and neurotypical individuals), leading to misunderstanding, lost productivity, and personal distress.</p>
        <p>Existing tools fail to address the core issue: translating the social-pragmatic intent and unspoken subtext that often gets lost between different communication styles.</p>
        <h3>The Solution: A Translator, Analyst & Coach</h3>
        <p>The Clarity Coach is a first-of-its-kind, AI-powered learning platform designed to bridge this gap. It's your personal communication partner.</p>
        <ul>
            <li><strong>As a Translator:</strong> It helps you rephrase your message to be clearly understood by your audience.</li>
            <li><strong>As an Analyst:</strong> It decodes the likely intent behind messages you receive.</li>
            <li><strong>As a Coach:</strong> It provides real-time advice and practice to build your skills.</li>
        </ul>
        <h2>Our Guiding Philosophy</h2>
        <ul>
            <li><strong>Translate Styles, Not People:</strong> We believe in celebrating all communication styles. Our goal is to create a bridge, not to "correct" how someone thinks or speaks.</li>
            <li><strong>Context is Key:</strong> The AI is powerful, but it can't read a room. Always combine its insights with your own judgment.</li>
            <li><strong>Connection is the Goal:</strong> Technology is the means, not the end. The ultimate goal is to foster better human connection.</li>
        </ul>
    </ContentPage>
);

const HowToUsePage = () => (
    <ContentPage>
      <h1>How to Use the Clarity Coach</h1>
      <p className="lead">This guide will help you get the most out of the Beta version by explaining its features and workflows.</p>
      <h2>Core Features: Draft, Analyze, and Chat</h2>
      <h3>Draft a Message</h3>
      <p>Use this mode when you have a thought you need to share effectively.</p>
      <ul>
        <li><strong>What I Mean (Intent):</strong> Enter the core goal of your message.</li>
        <li><strong>What I Wrote (Draft):</strong> Enter your raw thoughts or a rough draft.</li>
        <li>The AI will then explain potential misinterpretations and provide a polished draft.</li>
      </ul>
      <h3>Analyze a Message</h3>
      <p>Use this mode when you receive a message that is confusing or has a hidden meaning.</p>
      <ul>
        <li><strong>What They Wrote:</strong> Paste the message you received.</li>
        <li><strong>What's the Situation? (Context):</strong> Briefly explain the circumstances. This gives the AI crucial context.</li>
        <li><strong>How I Heard It:</strong> Explain how the message made you feel or what you think it means.</li>
        <li>The AI will then analyze the sender's likely intent and suggest a strategic response.</li>
      </ul>
      <h3>Chat with the Coach</h3>
      <p>Use this real-time chat for more complex situations or for practicing your skills.</p>
      <ul>
        <li><strong>Get Real-time Advice:</strong> Describe a challenging situation and get instant, empathetic advice.</li>
        <li><strong>Role-play a Conversation:</strong> Practice a difficult conversation in a safe space.</li>
        <li><strong>Brainstorm Solutions:</strong> Work through a communication problem step-by-step with the AI as your sounding board.</li>
      </ul>
    </ContentPage>
);

const RoadmapPage = () => (
    <ContentPage>
      <h1>Application Roadmap</h1>
      <p className="lead">We believe in transparency. This page outlines our current state and future vision.</p>
      <div className="p-4 bg-gray-700/50 rounded-lg">
          <h2>Current Phase: Beta (v3.0)</h2>
          <p>This version is focused on a robust, decoupled architecture and a full UI redesign in line with Hearthside Works branding.</p>
          <h3>Key Features Implemented</h3>
          <ul>
            <li>Stable backend deployed on Google Cloud Run.</li>
            <li>Redesigned UI with Tailwind CSS.</li>
            <li>All previous Beta 2.1 features re-implemented.</li>
          </ul>
      </div>
      <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
          <h2>Next Phase: Gamma & Beyond</h2>
          <p>The next major steps are building the "Golden Feedback Loop" and implementing premium features.</p>
          <h3>Key Enhancements</h3>
          <ul>
              <li><strong>Golden Feedback Loop:</strong> Allow users to directly edit and save AI-generated text for model training.</li>
              <li><strong>User Accounts (Premium):</strong> Securely save translation history and user preferences.</li>
              <li><strong>RAG Implementation:</strong> Ground AI responses in your curated library of scholarly articles.</li>
          </ul>
      </div>
    </ContentPage>
);

const ChangeLogPage = () => (
    <ContentPage>
        <h1>Change Log</h1>
        <div className="mb-6">
            <h2>Version 3.0 (Current)</h2>
            <ul>
                <li><strong>Major Architectural Restructure:</strong> Migrated backend from Vercel Serverless to a dedicated Node.js server on Google Cloud Run to ensure stability and eliminate streaming errors.</li>
                <li><strong>Complete UI/UX Redesign:</strong> Rebuilt the entire frontend with Tailwind CSS to align with the Hearthside Works brand guide, improving aesthetics, accessibility, and responsiveness.</li>
                <li><strong>Codebase Consolidation:</strong> Refactored the entire React application into a single, robust component file for simplified deployment and maintenance.</li>
                <li>Re-implemented all features from Beta 2.1, including Translate, Analyze, Chat, advanced selectors, and feedback systems.</li>
            </ul>
        </div>
        <div className="mb-6">
            <h2>Version 2.1.1</h2>
            <ul>
                <li><strong>Branding Update:</strong> Updated all branding to reflect the new company name, "Hearthside Works," and the product name, "Clarity Coach."</li>
                <li>Added "Our Commitments" page for Privacy and Accessibility statements.</li>
            </ul>
        </div>
    </ContentPage>
);

const CreditsPage = () => (
    <ContentPage>
      <h1>Credits & Attributions</h1>
      <h2>Founder & Visionary</h2>
      <p>The Clarity Coach was conceived, designed, and guided by the singular vision of <strong>Sol Roberts-Lieb, Ed.D.</strong> This application, including its core workflows and intellectual framework, is the direct result of their dedication to building a tool that fosters empathy and understanding. </p>
      <h2>Development Process</h2>
      <p>This application was developed in a unique, collaborative process where Sol Roberts-Lieb, Ed.D. served as the architect and product lead, providing the core concepts, user stories, real-world examples, and critical feedback that shaped the AI's logic and the application's user-focused design. Technical implementation was assisted by a large language model (Google's Gemini), which acted as a pair programmer and technical consultant under Dr. Roberts-Lieb's direction.</p>
      <h2>Scholarly Foundations</h2>
      <p>The AI's analysis is grounded in established academic concepts from sociology, linguistics, and psychology. Key concepts include:</p>
      <ul>
        <li><strong>The Double Empathy Problem:</strong> A theory by Dr. Damian Milton suggesting that communication breakdowns between autistic and non-autistic people are a two-way issue of mutual misunderstanding.</li>
        <li><strong>High-Context and Low-Context Cultures:</strong> A framework by anthropologist Edward T. Hall explaining how some cultures rely on implicit context while others rely on explicit information.</li>
      </ul>
    </ContentPage>
);

const CommitmentsPage = () => (
    <ContentPage>
      <h1>Our Commitments</h1>
      <p className="lead">Trust is the foundation of clear communication. This page outlines our unwavering commitment to your privacy and to making our tools accessible to everyone.</p>
      <h2>Your Privacy is Paramount</h2>
      <h3>Can you see what I type into the translator?</h3>
      <p><strong>No.</strong> The text you enter for translation or analysis is sent securely to the AI for processing and is immediately discarded. It is never stored, and it is never seen by any human at Hearthside Works, LLC. Your conversations and thoughts are your own.</p>
      <h3>What Data Do You Collect?</h3>
      <p>We only store anonymous feedback data (star ratings and comments) to help us identify areas for improvement. This data is completely disconnected from any personal identifiers.</p>
      <h2>Commitment to Accessibility</h2>
      <p>Hearthside Works is dedicated to ensuring the Clarity Coach is accessible to all users. Our goal is to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.</p>
    </ContentPage>
);

const EnhancementsPage = () => (
     <ContentPage>
        <h1>Proposed Future Enhancements</h1>
        <p className="lead">Our Goal: To evolve from a powerful communicator into a truly personalized, context-aware communication partner.</p>
        <h2>Pillar 1: Content-First Intelligence</h2>
        <p>Focus on communication styles ("Direct" vs. "Indirect") rather than identity labels.</p>
        <h2>Pillar 2: Building the AI Brain</h2>
        <p>Allow users to directly edit and improve AI suggestions via the "Golden Feedback Loop", providing the highest quality training data.</p>
        <h2>Pillar 3: Behavioral & Situational Decoding</h2>
        <p>Help decode non-verbal actions and situations with The Behavioral Translator.</p>
        <h2>Pillar 4: Hyper-Personalization</h2>
        <p>Save history and create profiles for people you communicate with regularly using Secure User Accounts & "Key Contacts" Profiles.</p>
        <h2>Pillar 5: Platform Expansion & Skill Building</h2>
        <p>Bring the Coach directly into your workflow with a Mobile App & Browser Extension, and engage in real-time practice with a Conversation Simulator.</p>
    </ContentPage>
);

export default App;
