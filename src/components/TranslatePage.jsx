import React, { useState, useEffect } from 'react';
import { Feedback } from './Feedback';
import { Copy, Check } from 'lucide-react'; // --- NEW: Import icons ---

const rawApiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const API_BASE_URL = rawApiUrl.replace(/\/$/, "");

const loadingTips = [
    "Average translation time is 5-10 seconds.", "Analyzing tone, subtext, and pragmatic meaning...", "Tip: Providing clear context leads to better translations.", "Did you know? The 'Double Empathy Problem' suggests communication gaps are a two-way street.", "Checking for potential misinterpretations...", "Tip: Indirect communicators often use questions to make suggestions softly.", "Considering how different neurotypes might perceive this message...",
];

export const TranslatePage = ({ mode = 'draft' }) => {
    const generations = ['Boomer', 'Gen X', 'Xennial', 'Millennial', 'Gen Z', 'Gen Alpha', 'unsure'];
    const neurotypes = ['Autism', 'ADHD', 'Neurotypical', 'Unsure'];

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
    
    const [originalInputs, setOriginalInputs] = useState(null);
    const [verboseExplanation, setVerboseExplanation] = useState('');
    const [verboseResponse, setVerboseResponse] = useState('');
    const [isVerboseLoading, setIsVerboseLoading] = useState(null);

    const isDraftMode = mode === 'draft';
    
    useEffect(() => { handleReset(); }, [mode]);

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
        setVerboseExplanation('');
        setVerboseResponse('');
        setOriginalInputs(null);

        try {
            let finalSenderStyle = senderStyle;
            if (senderStyle === 'let-ai-decide') {
                const textForClassification = isDraftMode ? (context || text) : text;
                if (!textForClassification) throw new Error("Please provide text for the AI to analyze your style.");
                const clsRes = await fetch(`${API_BASE_URL}/api/classify-style`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: textForClassification }) });
                if(!clsRes.ok) throw new Error("Could not classify style.");
                const data = await clsRes.json();
                finalSenderStyle = data.style;
            }
            const requestBody = { mode, text, context, interpretation, analyzeContext, sender: finalSenderStyle, receiver: receiverStyle, senderNeurotype, receiverNeurotype, senderGeneration, receiverGeneration };
            setOriginalInputs(requestBody);
            const transRes = await fetch(`${API_BASE_URL}/api/translate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody) });
            if (!transRes.ok) { const errData = await transRes.json(); throw new Error(errData.error || 'An error occurred during translation.'); }
            const data = await transRes.json();
            setAiResponse(data);
        } catch (err) { setError(err.message); } finally { setLoading(false); }
    };
    
    const handleVerboseClick = async (target, generatedText) => {
        if (!originalInputs) {
            setError("Cannot fetch details because the original context is missing.");
            return;
        }
        setIsVerboseLoading(target);
        setError(null);
        try {
            const res = await fetch(`${API_BASE_URL}/api/verbose`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ target, originalInputs, generatedText }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to get verbose details.');
            if (target === 'explanation') setVerboseExplanation(data.verboseContent);
            else setVerboseResponse(data.verboseContent);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsVerboseLoading(null);
        }
    };
    
    const handleReset = () => { 
        setText(''); setContext(''); setInterpretation(''); setAnalyzeContext(''); setError(null); setAiResponse(null); setFeedbackSuccess({ explanation: false, response: false }); setIsAdvancedMode(false); setSenderStyle('let-ai-decide'); setReceiverStyle('indirect'); setSenderNeurotype('Unsure'); setReceiverNeurotype('Unsure'); setSenderGeneration('unsure'); setReceiverGeneration('unsure');
        setVerboseExplanation(''); setVerboseResponse(''); setOriginalInputs(null); setIsVerboseLoading(null);
    };
    
    const handleFeedbackSubmit = async (feedbackData, type) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/feedback/rating`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...feedbackData, mode, timestamp: new Date().toISOString() }) });
            if (!res.ok) throw new Error();
            setFeedbackSuccess(prev => ({ ...prev, [type]: true }));
        } catch (err) { setError('Sorry, could not submit feedback.'); }
    };
    
    return (
    <div>
        <a href="#/" className="text-teal-600 dark:text-teal-400 hover:underline mb-4 inline-block">‹ Back to Modes</a>
        <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2 text-center">{isDraftMode ? 'Draft a Message' : 'Analyze a Message'}</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-3xl mx-auto text-center mb-8">{isDraftMode ? "Clearly defining your intent helps the AI create a more accurate translation." : "Explaining the situation and your interpretation helps the AI understand the communication gap."}</p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className={`grid gap-6 ${isDraftMode ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
                {isDraftMode ? (
                    <>
                        <IOBox title="What I Mean (Intent)" required textValue={context}><textarea value={context} onChange={(e) => setContext(e.target.value)} placeholder="What is the goal of your message?" required /></IOBox>
                        <IOBox title="What I Wrote (Draft)" required textValue={text}><textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="What are your key points or raw thoughts?" required /></IOBox>
                    </>
                ) : (
                    <>
                        <IOBox title="What They Wrote" required textValue={text}><textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste the message you received." required /></IOBox>
                        <IOBox title="What's the Situation? (Context)" textValue={analyzeContext}><textarea value={analyzeContext} onChange={(e) => setAnalyzeContext(e.target.value)} placeholder="e.g., This is my boss, the project is late..." /></IOBox>
                        <IOBox title="How I Heard It" required textValue={interpretation}><textarea value={interpretation} onChange={(e) => setInterpretation(e.target.value)} placeholder="How did this message make you feel or what do you think it means?" required /></IOBox>
                    </>
                )}
            </div>

            <div className="p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectorGroup label="My Communication Style" tooltip="Direct: You say what you mean. Indirect: You use context and subtext."><RadioPillGroup name="sender" value={senderStyle} onChange={setSenderStyle} options={['direct', 'indirect', 'let-ai-decide']} /></SelectorGroup>
                    <SelectorGroup label="Audience's Style"><RadioPillGroup name="receiver" value={receiverStyle} onChange={setReceiverStyle} options={['direct', 'indirect']} /></SelectorGroup>
                </div>
                <div className="text-center"><label className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 cursor-pointer"><input type="checkbox" checked={isAdvancedMode} onChange={() => setIsAdvancedMode(!isAdvancedMode)} className="w-4 h-4 text-teal-600 bg-gray-700 border-gray-600 rounded focus:ring-teal-500" />Show Advanced Options</label></div>
                {isAdvancedMode && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-4 border-t border-gray-300 dark:border-gray-700">
                        <SelectorGroup label="My Neurotype" tooltip="Autism: May prefer direct, literal language. ADHD: May communicate in non-linear ways."><RadioPillGroup name="sender-nt" value={senderNeurotype} onChange={setSenderNeurotype} options={neurotypes} /></SelectorGroup>
                        <SelectorGroup label="Audience's Neurotype"><RadioPillGroup name="receiver-nt" value={receiverNeurotype} onChange={setReceiverNeurotype} options={neurotypes} /></SelectorGroup>
                        <SelectorGroup label="My Generation" tooltip="Gen Z: ~1997-2012, Millennial: ~1981-1996, Gen X: ~1965-1980, Boomer: ~1946-1964"><RadioPillGroup name="sender-gen" value={senderGeneration} onChange={setSenderGeneration} options={generations} /></SelectorGroup>
                        <SelectorGroup label="Audience's Generation"><RadioPillGroup name="receiver-gen" value={receiverGeneration} onChange={setReceiverGeneration} options={generations} /></SelectorGroup>
                    </div>
                )}
            </div>

            <div className="flex justify-center items-center gap-4">
                 <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 disabled:bg-gray-500 dark:disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none" disabled={loading}>
                     {loading ? ( <span className="flex items-center gap-2"> <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> {loadingMessage} </span> ) : 'Translate'}
                 </button>
                 <button type="button" onClick={handleReset} className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold py-3 px-6 rounded-lg transition">Reset</button>
            </div>
        </form>
        
        {error && <div className="mt-6 text-center text-red-500 dark:text-red-400 p-3 bg-red-100 dark:bg-red-900/50 rounded-lg">{error}</div>}

        {aiResponse && (
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col">
                    <CopyButton textToCopy={aiResponse.explanation} />
                    <h3 className="text-lg font-bold font-serif text-teal-600 dark:text-teal-400 mb-2">
                        {isDraftMode ? "How They Might Hear It (Explanation)" : "What They Likely Meant (Explanation)"}
                    </h3>
                    <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none flex-grow" dangerouslySetInnerHTML={{ __html: aiResponse.explanation }} />
                    {!verboseExplanation && (
                        <button onClick={() => handleVerboseClick('explanation', aiResponse.explanation)} disabled={!!isVerboseLoading}
                            className="text-sm text-teal-600 dark:text-teal-400 hover:underline mt-4 disabled:opacity-50"
                            title="Get a more detailed, educational breakdown of this analysis.">
                            {isVerboseLoading === 'explanation' ? 'Loading...' : 'Learn More'}
                        </button>
                    )}
                    {verboseExplanation && (
                        <div className="mt-4 p-4 bg-gray-200 dark:bg-gray-900/70 rounded-lg">
                            <h4 className="font-bold text-terracotta-500 dark:text-terracotta-400 mb-2">Deeper Dive</h4>
                            <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: verboseExplanation }} />
                        </div>
                    )}
                    <Feedback type="explanation" onSubmit={(data) => handleFeedbackSubmit(data, 'explanation')} isSuccess={feedbackSuccess.explanation} />
                </div>
                <div className="relative bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col">
                    <CopyButton textToCopy={aiResponse.response} />
                    <h3 className="text-lg font-bold font-serif text-teal-600 dark:text-teal-400 mb-2">
                        {isDraftMode ? "The Translation (Suggested Draft)" : "The Translation (Suggested Response)"}
                    </h3>
                    <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none flex-grow" dangerouslySetInnerHTML={{ __html: aiResponse.response }} />
                    {!verboseResponse && (
                        <button onClick={() => handleVerboseClick('response', aiResponse.response)} disabled={!!isVerboseLoading}
                            className="text-sm text-teal-600 dark:text-teal-400 hover:underline mt-4 disabled:opacity-50"
                            title="Get a breakdown of why this rewritten version is more effective.">
                            {isVerboseLoading === 'response' ? 'Loading...' : 'Learn More'}
                        </button>
                    )}
                    {verboseResponse && (
                         <div className="mt-4 p-4 bg-gray-200 dark:bg-gray-900/70 rounded-lg">
                            <h4 className="font-bold text-terracotta-500 dark:text-terracotta-400 mb-2">Why This Works</h4>
                           <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: verboseResponse }} />
                        </div>
                    )}
                    <Feedback type="response" onSubmit={(data) => handleFeedbackSubmit(data, 'response')} isSuccess={feedbackSuccess.response} />
                </div>
            </div>
        )}
    </div>
    );
};

// --- NEW: Copy Button Helper Component ---
const CopyButton = ({ textToCopy }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        const stripHtml = (html) => {
            if (!html) return '';
            const doc = new DOMParser().parseFromString(html, 'text/html');
            return doc.body.textContent || "";
        };
        const plainText = stripHtml(textToCopy);

        navigator.clipboard.writeText(plainText).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }).catch(err => console.error('Failed to copy text: ', err));
    };

    return (
        <button
            type="button"
            onClick={handleCopy}
            className="absolute top-3 right-3 p-1.5 bg-gray-200/80 dark:bg-gray-900/50 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            title="Copy to clipboard"
        >
            {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </button>
    );
};

// --- Updated IOBox to accept textValue for the CopyButton ---
const IOBox = ({ title, required, children, textValue }) => (
    <div className="relative bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col h-full">
        <CopyButton textToCopy={textValue} />
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {title} {required && <span className="text-red-500 dark:text-red-400">*</span>}
        </label>
        {React.cloneElement(children, { className: "io-textarea flex-grow w-full min-h-[150px] p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-base font-sans resize-vertical transition focus:outline-none focus:ring-2 focus:ring-teal-500" })}
    </div>
);


const SelectorGroup = ({ label, tooltip, children }) => (
    <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
            {label}
            {tooltip && (
                <div className="group relative">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <div className="absolute bottom-full mb-2 w-64 bg-gray-800 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-gray-700 shadow-lg z-10">
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
            <label key={option} className={`px-3 py-1 text-sm rounded-full cursor-pointer transition-colors ${value === option ? 'bg-teal-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>
                <input type="radio" name={name} value={option} checked={value === option} onChange={e => onChange(e.target.value)} className="hidden" />
                <span className="capitalize">{option.replace('-', ' ')}</span>
            </label>
        ))}
    </div>
);