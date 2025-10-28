import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Feedback } from '../components/Feedback';
import { Copy, Check, Edit, Save, X, RefreshCw, Lightbulb } from 'lucide-react'; // Added Lightbulb for use
import { useLocation, Link } from 'react-router-dom'; 

// FIX: Corrected paths for internal shared components/utilities
import { useCopyToClipboard } from '../shared/useCopyToClipboard'; 
// import { Feedback } from '../shared/Feedback'; // Assuming Feedback is moved to components/

// FIX: Corrected paths for generic UI components (relative to 'features/')
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from '../shared/card';
import { Button } from '../shared/button';
import { Alert, AlertDescription, AlertTitle } from '../shared/alert';
import { Textarea } from '../shared/textarea';
// --- END FIX ---

const rawApiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const API_BASE_URL = rawApiUrl.replace(/\/\s*$/, "");

const loadingTips = [
    "Average translation time is 5-10 seconds.", "Analyzing tone, subtext, and pragmatic meaning...", "Tip: Providing clear context leads to better translations.", "Did you know? The 'Double Empathy Problem' suggests communication gaps are a two-way street.", "Checking for potential misinterpretations...", "Tip: Indirect communicators often use questions to make suggestions softly.", "Considering how different neurotypes might perceive this message...",
];

// Helper components (SelectorGroup and RadioPillGroup from original snippet)
const SelectorGroup = ({ label, tooltip, children }) => (
    <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
            {label}
            {tooltip && ( <div className="group relative"> <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <div className="absolute bottom-full mb-2 w-64 bg-gray-800 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-gray-700 shadow-lg z-10"> {tooltip} </div> </div> )}
        </label>
        {children}
    </div>
);
const RadioPillGroup = ({ name, value, onChange, options }) => {
    const isSelected = (option) => value === option;
    
    return (
        <div className="flex flex-wrap gap-2">
            {options.map(option => (
                <label 
                    key={option} 
                    className={`px-3 py-1 text-sm rounded-full cursor-pointer transition-colors ${
                        isSelected(option) 
                        ? 'bg-brand-terracotta text-white dark:bg-brand-terracotta-dark' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                >
                    <input 
                        type="radio" 
                        name={name} 
                        value={option} 
                        checked={isSelected(option)} 
                        onChange={() => onChange(option)}
                        className="sr-only"
                    />
                    {option}
                </label>
            ))}
        </div>
    );
};
// --- END Helper components ---


export const TranslatePage = ({ mode = 'draft' }) => {
    // Brand color used for primary heading accent
    const PRIMARY_TEAL = 'var(--teal-primary)';
    
    // --- Original State and Logic Preserved ---
    const generations = ['Boomer', 'Gen X', 'Xennial', 'Millennial', 'Gen Z', 'Gen Alpha', 'unsure'];
    const neurotypes = ['Autism', 'ADHD', 'Neurotypical', 'Unsure'];
    const [isAdvancedMode, setIsAdvancedMode] = useState(false);
    const [senderStyle, setSenderStyle] = useState('let-ai-decide');
    const [receiverStyle, setReceiverStyle] = useState('indirect');
    const [senderNeurotype, setSenderNeurotype] = useState('Unsure');
    const [receiverNeurotype, setReceiverNeurotype] = useState('Unsure');
    const [senderGeneration, setSenderGeneration] = useState('Unsure');
    const [receiverGeneration, setReceiverGeneration] = useState('Unsure');
    const [text, setText] = useState('');
    const [context, setContext] = useState('');
    const [interpretation, setInterpretation] = useState('');
    const [aiResult, setAiResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [currentTip, setCurrentTip] = useState(loadingTips[0]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedResponse, setEditedResponse] = useState('');
    const [docId, setDocId] = useState(null); // Firestore document ID
    const [originalInputs, setOriginalInputs] = useState({});
    const [originalResponse, setOriginalResponse] = useState({});
    const [isCopying, copyToClipboard] = useCopyToClipboard();
    const isDraftMode = mode === 'draft';
    const resultRef = useRef(null);

    // Effect for handling loading tips
    useEffect(() => {
        if (loading) {
            const tipInterval = setInterval(() => {
                setCurrentTip(loadingTips[Math.floor(Math.random() * loadingTips.length)]);
            }, 3000);
            return () => clearInterval(tipInterval);
        } else {
            setCurrentTip(loadingTips[0]);
        }
    }, [loading]);

    // Effect for handling scroll to result
    useEffect(() => {
        if (aiResult && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [aiResult]);

    // Handle form submission and API call
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setLoading(true);
        setAiResult(null);
        setIsEditing(false);
        setDocId(null); 

        const inputs = {
            mode, text, context, interpretation, 
            sender: senderStyle, receiver: receiverStyle, 
            senderNeurotype, receiverNeurotype, senderGeneration, receiverGeneration
        };
        setOriginalInputs(inputs);

        try {
            const endpoint = isDraftMode ? '/api/translate' : '/api/translate'; // Both use /api/translate
            
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputs),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to process request.');
            }

            const data = await response.json();
            setAiResult(data);
            setOriginalResponse(data);
            setEditedResponse(data.response); // Set initial editable response
            setIsSuccess(true);

            // Optional: Save original inputs to Firestore immediately for later feedback matching
            // This is part of the feature set we want to restore/ensure works.
            // You would call a function here to save the initial state to Firestore
            
        } catch (error) {
            console.error('API Error:', error);
            setAiResult({ 
                explanation: `<p><strong>Error:</strong> Failed to connect to the Clarity Coach server. Please check your network or try again later.`,
                response: `<p>Error processing request.</p>`
            });
            setIsSuccess(false);
        } finally {
            setLoading(false);
        }
    }, [mode, text, context, interpretation, senderStyle, receiverStyle, senderNeurotype, receiverNeurotype, senderGeneration, receiverGeneration]);

    // Handle saving the edited version (part of the restored feature set)
    const handleSaveEdit = useCallback(async () => {
        if (!docId) {
             // 1. If no document ID exists, save the original and edited response first
             try {
                const response = await fetch(`${API_BASE_URL}/api/feedback/edit`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ originalInputs, originalResponse, editedResponse }),
                });

                if (!response.ok) throw new Error('Failed to save edit feedback.');
                const data = await response.json();
                setDocId(data.docId); // Save the ID for potential reanalysis
                setIsEditing(false);
                console.log('Saved edited feedback with ID:', data.docId);

            } catch (error) {
                console.error('Error saving edited response:', error);
            }
        } else {
             // 2. If doc ID exists, submit for re-analysis
             try {
                const response = await fetch(`${API_BASE_URL}/api/feedback/reanalysis`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ docId, reanalysisText: editedResponse }),
                });

                if (!response.ok) throw new Error('Failed to submit re-analysis.');
                setIsEditing(false);
                console.log('Submitted re-analysis for doc ID:', docId);

            } catch (error) {
                console.error('Error submitting re-analysis:', error);
            }
        }

    }, [docId, originalInputs, originalResponse, editedResponse]);
    // --- End Original State and Logic Preserved ---
    
    // Theme colors used for primary components
    const TERRACOTTA = 'var(--terracotta-warmth)';
    const BG_LIGHT = 'var(--bg-light)';
    
    // Dynamic text/bg for inputs
    const inputStyle = `w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-[${PRIMARY_TEAL}] 
                        bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                        border-gray-300 dark:border-gray-600`;

    return (
        // 1. Theme-aware container for the entire page content
        <div 
            className="transition duration-500" 
            style={{ 
                backgroundColor: 'var(--color-background)', 
                color: 'var(--color-text)', 
                minHeight: '80vh' 
            }}
        >
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-serif font-bold text-center mb-10" style={{ color: PRIMARY_TEAL }}>
                    {isDraftMode ? 'Draft Your Message' : 'Analyze a Received Message'}
                </h1>

                <div className="max-w-4xl mx-auto">
                    {/* Mode Selector and Advanced Toggle */}
                    <div className="flex justify-center space-x-4 mb-8">
                        <Link to="/translate/draft" className={`px-4 py-2 rounded-lg font-semibold transition-colors ${isDraftMode ? 'bg-brand-terracotta text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>
                            Draft Mode
                        </Link>
                        <Link to="/translate/analyze" className={`px-4 py-2 rounded-lg font-semibold transition-colors ${!isDraftMode ? 'bg-brand-terracotta text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>
                            Analyze Mode
                        </Link>
                    </div>

                    <Card className="shadow-lg p-6" style={{ backgroundColor: 'var(--color-surface)' }}>
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* TEXT INPUTS */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <SelectorGroup label={isDraftMode ? "Draft Text" : "Message Received"} tooltip="The text you want to translate or the message you received.">
                                    <Textarea
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder={isDraftMode ? "I need to postpone the meeting because I have another thing planned..." : "Did you finish that project I mentioned earlier?"}
                                        rows={isDraftMode ? 6 : 4}
                                        className={inputStyle}
                                        required
                                    />
                                </SelectorGroup>

                                <SelectorGroup label={isDraftMode ? "Intent/Context" : "My Interpretation"} tooltip={isDraftMode ? "Why are you writing this message? (e.g., I need to delay the meeting due to burnout)." : "What do you *think* the sender is trying to say? (e.g., They are passive-aggressively asking for a status update)."} >
                                    <Textarea
                                        value={isDraftMode ? context : interpretation}
                                        onChange={(e) => isDraftMode ? setContext(e.target.value) : setInterpretation(e.target.value)}
                                        placeholder={isDraftMode ? "E.g., I want to sound professional but I need a break." : "E.g., They are stressed and need reassurance it's done."}
                                        rows={isDraftMode ? 4 : 3}
                                        className={inputStyle}
                                        required
                                    />
                                </SelectorGroup>
                            </div>

                            {/* ADVANCED SETTINGS TOGGLE */}
                            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isAdvancedMode}
                                        onChange={() => setIsAdvancedMode(!isAdvancedMode)}
                                        className={`w-4 h-4 rounded appearance-none cursor-pointer ${isAdvancedMode ? 'bg-brand-teal' : 'bg-gray-300 dark:bg-gray-600'}`}
                                    />
                                    <span className="text-sm font-medium">Show Advanced Profile Settings</span>
                                </label>
                            </div>

                            {/* ADVANCED SETTINGS */}
                            {isAdvancedMode && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                    {/* Sender Profiles */}
                                    <Card className="p-4" style={{ backgroundColor: 'var(--color-surface-lighter)' }}>
                                        <CardTitle className="text-lg mb-3">Your (Sender) Profile</CardTitle>
                                        <SelectorGroup label="Communication Style">
                                            <RadioPillGroup 
                                                name="senderStyle" 
                                                value={senderStyle} 
                                                onChange={setSenderStyle} 
                                                options={['direct', 'indirect', 'let-ai-decide']} 
                                            />
                                        </SelectorGroup>
                                        <SelectorGroup label="Neurotype" tooltip="Helps the AI understand subtext or preference for literal language." className="mt-4">
                                            <RadioPillGroup 
                                                name="senderNeurotype" 
                                                value={senderNeurotype} 
                                                onChange={setSenderNeurotype} 
                                                options={neurotypes} 
                                            />
                                        </SelectorGroup>
                                        <SelectorGroup label="Generation" className="mt-4">
                                            <RadioPillGroup 
                                                name="senderGeneration" 
                                                value={senderGeneration} 
                                                onChange={setSenderGeneration} 
                                                options={generations} 
                                            />
                                        </SelectorGroup>
                                    </Card>

                                    {/* Receiver Profiles */}
                                    <Card className="p-4" style={{ backgroundColor: 'var(--color-surface-lighter)' }}>
                                        <CardTitle className="text-lg mb-3">{isDraftMode ? 'Receiver Profile' : 'Sender Profile'}</CardTitle>
                                        <SelectorGroup label="Communication Style">
                                            <RadioPillGroup 
                                                name="receiverStyle" 
                                                value={receiverStyle} 
                                                onChange={setReceiverStyle} 
                                                options={['direct', 'indirect', 'let-ai-decide']} 
                                            />
                                        </SelectorGroup>
                                        <SelectorGroup label="Neurotype" tooltip="Helps the AI tailor language for clarity or empathy." className="mt-4">
                                            <RadioPillGroup 
                                                name="receiverNeurotype" 
                                                value={receiverNeurotype} 
                                                onChange={setReceiverNeurotype} 
                                                options={neurotypes} 
                                            />
                                        </SelectorGroup>
                                        <SelectorGroup label="Generation" className="mt-4">
                                            <RadioPillGroup 
                                                name="receiverGeneration" 
                                                value={receiverGeneration} 
                                                onChange={setReceiverGeneration} 
                                                options={generations} 
                                            />
                                        </SelectorGroup>
                                    </Card>
                                </div>
                            )}

                            {/* SUBMIT BUTTON */}
                            <div className="pt-4 flex justify-center">
                                <Button 
                                    type="submit" 
                                    disabled={loading || !text.trim() || (!isDraftMode && !interpretation.trim())}
                                    className="px-8 py-3 text-lg font-bold rounded-full shadow-md transition-colors"
                                    style={{ 
                                        backgroundColor: 'var(--terracotta-warmth)', 
                                        color: 'var(--text-dark)',
                                        opacity: (loading || !text.trim()) ? 0.6 : 1 
                                    }}
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <RefreshCw className="h-4 w-4 animate-spin" />
                                            Processing...
                                        </span>
                                    ) : (
                                        isDraftMode ? 'Generate Clarity Draft' : 'Analyze Message'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Card>

                    {/* RESULTS SECTION */}
                    {loading && (
                        <div className="mt-8 text-center p-6 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-md">
                            <RefreshCw className="h-8 w-8 text-brand-teal animate-spin mx-auto mb-3" style={{ color: PRIMARY_TEAL }} />
                            <p className="text-sm font-semibold" style={{ color: PRIMARY_TEAL }}>{currentTip}</p>
                        </div>
                    )}

                    {aiResult && (
                        <div className="mt-8 space-y-6" ref={resultRef}>
                            
                            {/* REWRITTEN MESSAGE / SUGGESTED RESPONSE CARD */}
                            <Card className="shadow-lg p-6" style={{ backgroundColor: 'var(--color-surface)' }}>
                                <CardHeader>
                                    <CardTitle className="text-xl font-serif font-bold flex items-center gap-2" style={{ color: PRIMARY_TEAL }}>
                                        {isDraftMode ? <Wand2 className="h-5 w-5" /> : <BookA className="h-5 w-5" />}
                                        {isDraftMode ? 'Rewritten Message for Clarity' : 'Suggested Strategic Response'}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {isEditing ? (
                                        <Textarea
                                            value={editedResponse}
                                            onChange={(e) => setEditedResponse(e.target.value)}
                                            rows={8}
                                            className={inputStyle}
                                        />
                                    ) : (
                                        <div dangerouslySetInnerHTML={{ __html: aiResult.response }} 
                                             className="prose prose-lg dark:prose-invert max-w-none" />
                                    )}
                                </CardContent>
                                <CardFooter className="flex justify-end space-x-2">
                                    {isEditing ? (
                                        <>
                                            <Button 
                                                onClick={handleSaveEdit} 
                                                className="bg-brand-teal hover:bg-brand-teal/80 text-white flex items-center gap-1"
                                            >
                                                <Save className="h-4 w-4" /> Save & Re-analyze
                                            </Button>
                                            <Button 
                                                onClick={() => setIsEditing(false)} 
                                                variant="outline"
                                                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                                            >
                                                <X className="h-4 w-4" /> Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button 
                                                onClick={() => copyToClipboard(editedResponse)} 
                                                variant="outline"
                                                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 flex items-center gap-1"
                                            >
                                                {isCopying ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {isCopying ? 'Copied!' : 'Copy'}
                                            </Button>
                                            <Button 
                                                onClick={() => setIsEditing(true)} 
                                                variant="outline"
                                                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 flex items-center gap-1"
                                            >
                                                <Edit className="h-4 w-4" /> Edit & Improve
                                            </Button>
                                        </>
                                    )}
                                </CardFooter>
                            </Card>

                            {/* EXPLANATION / ANALYSIS CARD */}
                            <Card className="shadow-lg p-6" style={{ backgroundColor: 'var(--color-surface)' }}>
                                <CardHeader>
                                    <CardTitle className="text-xl font-serif font-bold flex items-center gap-2" style={{ color: PRIMARY_TEAL }}>
                                        <Lightbulb className="h-5 w-5" />
                                        Clarity Coach Explanation
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {/* Dangerously setting inner HTML here because AI output often includes HTML tags (p, ul, strong) */}
                                    <div 
                                        dangerouslySetInnerHTML={{ __html: aiResult.explanation }} 
                                        className="prose prose-lg dark:prose-invert max-w-none text-brand-charcoal/80 dark:text-gray-300"
                                        style={{ color: 'var(--color-text)' }}
                                    />
                                    {/* Feedback component placeholder */}
                                    <Feedback 
                                        type={isDraftMode ? 'translation' : 'analysis'} 
                                        onFeedbackSubmit={(data) => console.log('Feedback Submitted:', data)} 
                                        isSuccess={isSuccess} 
                                    />
                                </CardContent>
                            </Card>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Exporting as a Named Export to align with App.jsx Named Imports
export { TranslatePage };
