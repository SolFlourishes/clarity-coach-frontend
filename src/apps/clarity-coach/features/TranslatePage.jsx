// src/apps/clarity-coach/features/TranslatePage.jsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Copy, Sparkles, Wand2, ArrowRight, BookA, Info, Settings, XCircle, Plus, Search, Check, Save, MessageSquareText } from 'lucide-react';
// FIX: Corrected paths for internal shared components/utilities
import { useCopyToClipboard } from '../shared/useCopyToClipboard'; 
import { Feedback } from '../shared/Feedback';

// FIX: Corrected paths for generic UI components (relative to 'features/')
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from '../../apps/clarity-coach/shared/';
import { Button } from '../../shared/button';
import { Alert, AlertDescription, AlertTitle } from '../../shared/alert';
import { Textarea } from '../../shared/textarea';
// --- END FIX ---


// Mock API configuration (Should ideally be imported from src/lib/config)
const rawApiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const API_BASE_URL = rawApiUrl.replace(/\/$/, "");

// Helper function to render loading spinner
const LoadingSpinner = () => (
    <div className="flex items-center space-x-2 text-brand-teal">
        <Sparkles className="h-4 w-4 animate-pulse" />
        <span className="text-sm">Processing...</span>
    </div>
);


// Helper function to render a prose block (Improved for clean copy)
const ProseOutput = ({ title, content, type, isEditing, editedText, setEditedText }) => {
    const [_, copy] = useCopyToClipboard();
    const canCopy = content && content.trim().length > 0;
    const currentText = isEditing ? editedText : content;

    return (
        <Card className={`relative dark:bg-gray-800/80 transition-colors ${type === 'translation' ? 'border-brand-teal border-t-4' : 'border-l-4 border-gray-400'}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium flex items-center gap-1 ${type === 'translation' ? 'text-brand-teal' : 'text-gray-500 dark:text-gray-400'}`}>
                    {title}
                </CardTitle>
                {canCopy && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copy(currentText)}
                        className="text-gray-500 hover:text-brand-teal dark:text-gray-400 dark:hover:text-brand-teal"
                        aria-label={`Copy ${type}`}
                        title="Copy to Clipboard"
                    >
                        <Copy className="h-4 w-4" />
                    </Button>
                )}
            </CardHeader>
            <CardContent>
                {isEditing ? (
                    <Textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        rows={5}
                        className="w-full io-textarea border-brand-terracotta"
                        placeholder="Edit the translation here..."
                    />
                ) : (
                    <div className="prose prose-sm dark:prose-invert max-w-none text-brand-charcoal/90 dark:text-gray-200">
                        <p>{content || '[Generating response...]'}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};


const TranslatePage = ({ mode }) => {
    const location = useLocation();
    const currentMode = mode || location.pathname.split('/').pop();
    const isDraftMode = currentMode === 'draft';

    // --- State Management for Inputs and Outputs ---
    const [draftText, setDraftText] = useState(''); // Input 1: What I Wrote / What They Wrote
    const [intentText, setIntentText] = useState(''); // Input 2: What I Mean / Context
    const [analysisText, setAnalysisText] = useState(''); // Input 3 (Analyze Only): My Interpretation
    
    const [aiResult, setAiResult] = useState({
        translation: '',
        explanation: '',
        intent: '',
        originalDraft: '',
    });

    const [loading, setLoading] = useState(false);
    const [isVerbose, setIsVerbose] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTranslation, setEditedTranslation] = useState('');
    const [isSuccess, setIsSuccess] = useState(false); // For user feedback submission success

    const outputRef = useRef(null);

    // UX: Scroll to output after a successful API call
    useEffect(() => {
        if (aiResult.translation && outputRef.current) {
            outputRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [aiResult.translation]);

    // UX: Clear non-mode-relevant state when switching modes
    useEffect(() => {
        setAiResult({ translation: '', explanation: '', intent: '', originalDraft: '' });
        setAnalysisText('');
        setLoading(false);
        setIsEditing(false);
        setIsSuccess(false);
    }, [currentMode]);


    // --- Handlers for Core Logic ---

    const handleSubmit = async (isReanalyze = false) => {
        if (loading) return;
        
        // Use edited text for re-analysis, otherwise use the main draft input
        const draftToSend = isReanalyze ? editedTranslation : draftText;

        // Basic input validation
        if (!draftToSend.trim() || !intentText.trim()) {
            alert("Please provide both the Primary text and the Context/Intent.");
            return;
        }

        setLoading(true);
        setIsSuccess(false);
        setAiResult({ translation: '', explanation: 'Processing...', intent: '' });

        const endpoint = isReanalyze || !isDraftMode ? 'analyze' : 'translate';
        const payload = {
            draft: draftToSend,
            intent: intentText,
            analysis: analysisText, // Only used by the 'analyze' endpoint
            mode: isDraftMode ? 'draft' : 'analyze',
            isVerbose: isVerbose,
            isReanalyze: isReanalyze,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/api/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (isReanalyze) {
                // Special handling for re-analysis results
                setAiResult(prev => ({
                    ...prev,
                    explanation: `<div class="border-l-4 border-brand-terracotta pl-4 mb-4">
                                    <p class="font-bold text-lg">Re-analysis of Your Edit:</p>
                                    <p>${data.explanation}</p>
                                </div>
                                <div class="mt-6">
                                    <p class="font-bold">Original Analysis:</p>
                                    ${prev.explanation}
                                </div>`
                }));
            } else {
                // Initial translation/analysis result
                setAiResult({
                    translation: data.translation || 'No translation provided.',
                    explanation: data.explanation || 'No explanation provided.',
                    intent: data.intent || '',
                    originalDraft: draftText, // Save original input for saving edits
                });
                setEditedTranslation(data.translation || ''); // Initialize edited text
            }
            
        } catch (error) {
            console.error('API Error:', error);
            setAiResult({ 
                translation: '', 
                explanation: `<p class="text-red-500">Error: Could not connect to the API. ${error.message}</p>`, 
                intent: '' 
            });
        } finally {
            setLoading(false);
            setIsEditing(false); // Exit edit mode after submission/re-analysis
        }
    };

    // Handler for the "Golden Edit" feature
    const handleSaveEdit = async () => {
        if (loading || editedTranslation.trim() === '') return;
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/save-edit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    originalDraft: aiResult.originalDraft,
                    userEdit: editedTranslation, 
                    mode: isDraftMode ? 'translate' : 'analyze',
                    timestamp: new Date().toISOString()
                }),
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setIsSuccess(true); // Flag successful submission for UX feedback
            alert('Your suggested edit has been saved successfully!');

        } catch (error) {
            console.error('Save Edit Error:', error);
            alert('Failed to save edit.');
        } finally {
            setLoading(false);
            setIsEditing(false);
        }
    };

    // Function to simplify component text for copy/paste
    const primaryLabel = isDraftMode ? "What I Meant (Intent)" : "What They Wrote (Message)";
    const secondaryLabel = isDraftMode ? "What I Wrote (Draft)" : "What's the Situation? (Context)";
    const buttonEnabled = draftText.trim().length > 0 && intentText.trim().length > 0;


    // ---------------------------------------------------
    // --- Render Logic (UI Structure) ---
    // ---------------------------------------------------

    const headerText = isDraftMode ? 'Translate: Draft a Message' : 'Analyze: Decode a Message';
    const headerDescription = isDraftMode 
        ? 'Rephrase your complex intent into a clear, intentional, polished message.' 
        : 'Discover the sender\'s likely intent and underlying subtext of a confusing message.';
    
    return (
        <div className="p-4 md:p-8 space-y-8 max-w-6xl mx-auto">
            
            {/* Header Section */}
            <header className="text-center">
                <h1 className="text-4xl font-serif font-bold text-brand-charcoal dark:text-white flex items-center justify-center gap-2">
                    {isDraftMode ? <Wand2 className="h-8 w-8 text-brand-purple" /> : <Search className="h-8 w-8 text-brand-teal" />}
                    {headerText}
                </h1>
                <p className="mt-2 text-lg text-brand-charcoal/80 dark:text-gray-300">
                    {headerDescription}
                </p>
                <Alert className="mt-4 max-w-lg mx-auto">
                    <BookA className="h-4 w-4 text-brand-terracotta" />
                    <AlertTitle>Learning Tip!</AlertTitle>
                    <AlertDescription>
                        Use the **Chat Coach** for real-time practice or read the <Link to="/app/how-to-use" className="text-brand-teal hover:underline">How to Use guide</Link> for detailed workflows.
                    </AlertDescription>
                </Alert>
            </header>
            
            {/* Input & Controls Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Input Fields Column */}
                <div className="space-y-6">
                    {/* Primary Input (What I Mean / What They Wrote) */}
                    <Card className="dark:bg-gray-800/80">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center space-x-2">
                                <span>{primaryLabel}</span>
                                <Info className="h-4 w-4 text-gray-400" title={isDraftMode ? "What is the core meaning or emotion you want to convey?" : "Paste the message you received exactly as written."} />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                value={draftText}
                                onChange={(e) => setDraftText(e.target.value)}
                                placeholder={isDraftMode ? "E.g., I need a clear date for when the project plan will be complete." : "E.g., I saw your email, but I'm swamped. Will circle back tomorrow."}
                                rows={isDraftMode ? 5 : 8}
                                className="w-full io-textarea"
                            />
                        </CardContent>
                    </Card>
                    
                    {/* Secondary Input (Draft / Context) */}
                    <Card className="dark:bg-gray-800/80">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center space-x-2">
                                <span>{secondaryLabel}</span>
                                <Info className="h-4 w-4 text-gray-400" title={isDraftMode ? "The actual text you wrote, even if it's messy." : "Briefly describe the context of the message (e.g., 'This is a boss who rarely responds to my emails.')."} />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                value={intentText}
                                onChange={(e) => setIntentText(e.target.value)}
                                placeholder={isDraftMode ? "E.g., 'Ping me back once the project plan is complete.'" : "E.g., 'My boss sent this on a Friday afternoon after I asked for a project update.'" }
                                rows={isDraftMode ? 5 : 8}
                                className="w-full io-textarea"
                            />
                        </CardContent>
                    </Card>

                    {/* Additional field for Analyze Mode: User's interpretation */}
                    {!isDraftMode && (
                        <Card className="dark:bg-gray-800/80">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center space-x-2">
                                    <span>My Interpretation (Optional)</span>
                                    <Info className="h-4 w-4 text-gray-400" title="How did the message make you feel, or what do you suspect the hidden meaning is? This helps the AI calibrate its response." />
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Textarea
                                    value={analysisText}
                                    onChange={(e) => setAnalysisText(e.target.value)}
                                    placeholder="E.g., I feel like they're annoyed with me or trying to push off my request."
                                    rows={5}
                                    className="w-full io-textarea"
                                />
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Controls and Output Column */}
                <div className="space-y-6">
                    
                    {/* Controls Card */}
                    <Card className="dark:bg-gray-800/80">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center space-x-2">
                                <Settings className="h-5 w-5" />
                                <span>Engine Settings</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="text-sm font-medium">
                                    Verbose Mode (Deeper Analysis)
                                    <Info className="h-3 w-3 inline-block ml-1 text-gray-400 align-text-top" title="Enabling this provides more detailed psychological and linguistic breakdown in the explanation section." />
                                </div>
                                <Button 
                                    variant="outline" 
                                    size="icon" 
                                    onClick={() => setIsVerbose(!isVerbose)}
                                    className={`transition-colors ${isVerbose ? 'bg-brand-teal text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                                    title={isVerbose ? "Disable Verbose Mode" : "Enable Verbose Mode"}
                                >
                                    {isVerbose ? <Check className="h-4 w-4" /> : <Lightbulb className="h-4 w-4" />}
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2">
                            <Button 
                                onClick={() => handleSubmit(false)} // Pass false for isReanalyze on main submit
                                disabled={!buttonEnabled || loading}
                                className="w-full bg-brand-terracotta hover:bg-brand-terracotta/90 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
                            >
                                {loading ? <LoadingSpinner /> : (
                                    <>
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        {isDraftMode ? 'Generate Translation' : 'Run Analysis'}
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Output Section */}
                    {aiResult.explanation && (
                        <div ref={outputRef} className="space-y-6">
                            
                            {/* AI Translation / Suggested Message */}
                            {isDraftMode && (
                                <ProseOutput 
                                    title="Clarity Coach Translation"
                                    content={aiResult.translation}
                                    type="translation"
                                    isEditing={isEditing}
                                    editedText={editedTranslation}
                                    setEditedText={setEditedTranslation}
                                />
                            )}
                            
                            {/* AI Intent (Analyze Mode Output) */}
                            {!isDraftMode && aiResult.intent && (
                                <ProseOutput 
                                    title="Sender's Likely Intent (Clarity Coach)"
                                    content={aiResult.intent}
                                    type="intent"
                                />
                            )}
                            
                            {/* Edit Controls for Draft Mode */}
                            {isDraftMode && aiResult.translation && (
                                <CardFooter className="flex flex-col gap-2 p-0">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="text-sm font-semibold text-brand-charcoal dark:text-white flex items-center gap-2">
                                             <MessageSquareText className="h-4 w-4 text-brand-teal"/> Improve the AI:
                                        </div>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => setIsEditing(!isEditing)}
                                            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-brand-charcoal dark:text-white"
                                        >
                                            {isEditing ? (
                                                <>
                                                    <XCircle className="h-4 w-4 mr-2" /> Cancel Edit
                                                </>
                                            ) : (
                                                <>
                                                    <Plus className="h-4 w-4 mr-2" /> Edit Translation
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                    
                                    {isEditing && (
                                        <>
                                            <Button 
                                                onClick={handleSaveEdit}
                                                disabled={editedTranslation.trim().length === 0 || loading}
                                                className="w-full bg-brand-terracotta hover:bg-brand-terracotta/90 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
                                            >
                                                <Save className="mr-2 h-4 w-4" /> Save Edit (Golden Feedback Loop)
                                            </Button>
                                            <Button 
                                                onClick={() => handleSubmit(true)} // Pass true for isReanalyze
                                                disabled={editedTranslation.trim().length === 0 || loading}
                                                variant="outline"
                                                className="w-full text-brand-teal border-brand-teal hover:bg-brand-teal/5 dark:hover:bg-brand-teal/20"
                                            >
                                                <Search className="mr-2 h-4 w-4" /> Re-analyze My Edit
                                            </Button>
                                        </>
                                    )}
                                </CardFooter>
                            )}

                            {/* AI Explanation / Breakdown (Secondary Output) */}
                            <Card className="dark:bg-gray-800/80 border-l-4 border-brand-teal">
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium flex items-center gap-1 text-brand-teal">
                                        <Lightbulb className="h-4 w-4" />
                                        Clarity Coach Explanation
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {/* Dangerously setting inner HTML here because AI output often includes HTML tags (p, ul, strong) */}
                                    <div 
                                        dangerouslySetInnerHTML={{ __html: aiResult.explanation }} 
                                        className="prose prose-sm dark:prose-invert max-w-none text-brand-charcoal/80 dark:text-gray-300"
                                    />
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

export default TranslatePage;