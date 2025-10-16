// src/components/TranslatePage.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Feedback } from './Feedback'; // Assuming Feedback is a named export
import { Copy, Check, Edit, Save, X, RefreshCw } from 'lucide-react';

const rawApiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const API_BASE_URL = rawApiUrl.replace(/\/\$/, "");

const loadingTips = [
    "Average translation time is 5-10 seconds.", "Analyzing tone, subtext, and pragmatic meaning...", "Tip: Providing clear context leads to better translations.", "Did you know? The 'Double Empathy Problem' suggests communication gaps are a two-way street.", "Checking for potential misinterpretations...", "Tip: Indirect communicators often use questions to make suggestions softly.", "Considering how different neurotypes might perceive this message...",
];

// Replaced original export const TranslatePage = ...
const TranslatePage = ({ mode = 'draft' }) => {
    const generations = ['Boomer', 'Gen X', 'Xennial', 'Millennial', 'Gen Z', 'Gen Alpha', 'unsure'];
    const neurotypes = ['Autism', 'ADHD', 'Neurotypical', 'Unsure'];
    const [isAdvancedMode, setIsAdvancedMode] = useState(false);
    const [senderStyle, setSenderStyle] = useState('let-ai-decide');
    const [receiverStyle, setReceiverStyle] = useState('indirect');
    const [senderNeurotype, setSenderNeurotype] = useState('Unsure');
    const [receiverNeurotype, setReceiverNeurotype] = useState('Unsure');
    const [senderGeneration, setSenderGeneration] = useState('unsure');
    const [receiverGeneration, setReceiverGeneration] = useState('unsure');
    const [input, setInput] = useState('');
    const [context, setContext] = useState('');
    const [rawOutput, setRawOutput] = useState('');
    const [editedOutput, setEditedOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [savedOutput, setSavedOutput] = useState(null);
    const [copyStatus, setCopyStatus] = useState(null);
    const inputRef = useRef(null);

    const isAnalyzeMode = mode === 'analyze';

    useEffect(() => {
        // Automatically scroll to input/output areas when loading changes
        if (!loading && inputRef.current) {
            inputRef.current.focus();
        }
    }, [loading]);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopyStatus(text);
        setTimeout(() => setCopyStatus(null), 2000);
    };

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        setLoading(true);
        setRawOutput('');
        setEditedOutput('');
        setSavedOutput(null);

        const payload = isAnalyzeMode ? {
            mode: 'analyze',
            message: input,
            context: context,
            senderStyle, receiverStyle, senderNeurotype, receiverNeurotype, senderGeneration, receiverGeneration
        } : {
            mode: 'draft',
            intent: input,
            context: context,
            senderStyle, receiverStyle, senderNeurotype, receiverNeurotype, senderGeneration, receiverGeneration
        };

        try {
            const response = await fetch(`${API_BASE_URL}/api/translate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            setRawOutput(data.translation || data.analysis || "Error: Could not process request.");
        } catch (error) {
            console.error('API Error:', error);
            setRawOutput("Error: Failed to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!editedOutput.trim()) return;

        const payload = {
            input: input,
            context: context,
            output: editedOutput,
            // Include original metadata for context
            metadata: {
                mode: isAnalyzeMode ? 'analyze' : 'draft',
                senderStyle, receiverStyle, senderNeurotype, receiverNeurotype, senderGeneration, receiverGeneration
            }
        };

        setEditing(false); // Lock the edit area
        setLoading(true); // Show saving state

        try {
            const response = await fetch(`${API_BASE_URL}/api/feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                setSavedOutput(editedOutput);
                // After saving, immediately analyze the saved version
                setRawOutput("Re-analyzing your 'Golden Edit'...");
                
                const reAnalyzePayload = isAnalyzeMode ? {
                    mode: 'analyze',
                    message: editedOutput,
                    context: 'Analyze this SAVED edit for clarity.',
                    senderStyle, receiverStyle, senderNeurotype, receiverNeurotype, senderGeneration, receiverGeneration
                } : {
                    mode: 'draft',
                    intent: editedOutput,
                    context: 'Analyze this SAVED edit for clarity.',
                    senderStyle, receiverStyle, senderNeurotype, receiverNeurotype, senderGeneration, receiverGeneration
                };

                const reAnalyzeResponse = await fetch(`${API_BASE_URL}/api/translate`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(reAnalyzePayload),
                });
                const reAnalyzeData = await reAnalyzeResponse.json();
                setRawOutput(reAnalyzeData.translation || reAnalyzeData.analysis || "Re-analysis failed.");

            } else {
                alert("Failed to save feedback.");
            }
        } catch (error) {
            console.error('Feedback Error:', error);
            alert("Network error while saving feedback.");
        } finally {
            setLoading(false);
        }
    };

    const SelectorGroup = ({ label, tooltip, children }) => (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                {label}
                {tooltip && ( <div className="group relative"> <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <div className="absolute bottom-full mb-2 w-64 bg-gray-800 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-gray-700 shadow-lg z-10"> {tooltip} </div> </div> )}
            </label>
            {children}
        </div>
    );
    const RadioPillGroup = ({ name, value, onChange, options }) => (
        <div className="flex flex-wrap gap-2">
            {options.map(option => (
                <label key={option} className={`px-3 py-1 text-sm rounded-full cursor-pointer transition-colors ${value === option ? 'bg-teal-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                    <input
                        type="radio"
                        name={name}
                        value={option}
                        checked={value === option}
                        onChange={() => onChange(option)}
                        className="sr-only"
                    />
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                </label>
            ))}
        </div>
    );

    return (
        <div className="p-4 sm:p-8 space-y-8 max-w-4xl mx-auto">
            <h1 className={`text-4xl font-serif font-bold ${isAnalyzeMode ? 'text-brand-teal' : 'text-brand-purple'} mb-4`}>
                {isAnalyzeMode ? 'Analyze a Message' : 'Draft a Message'}
            </h1>
            <p className="text-brand-charcoal/80">
                {isAnalyzeMode
                    ? "Paste a message you received to decode its likely intent, subtext, and potential misunderstandings."
                    : "Enter the core intent of your message and your rough draft to get a clearer, more effective translation."}
            </p>

            <form onSubmit={handleGenerate} className="space-y-6">
                {/* Primary Input */}
                <SelectorGroup label={isAnalyzeMode ? "What They Wrote (Message to Analyze)" : "What I Mean (Core Intent)"} tooltip={isAnalyzeMode ? "Paste the exact message you received." : "What is the single most important goal of this communication?"}>
                    <textarea
                        ref={inputRef}
                        rows="4"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        required
                        className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg p-3 focus:ring-brand-teal focus:border-brand-teal"
                        placeholder={isAnalyzeMode ? "Paste message here..." : "e.g., 'I need you to complete the report by Friday.'"}
                        disabled={loading}
                    ></textarea>
                </SelectorGroup>

                {/* Context Input */}
                <SelectorGroup label="Context (Optional but recommended)" tooltip="Briefly describe the relationship, current situation, or any relevant background.">
                    <textarea
                        rows="2"
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg p-3 focus:ring-brand-teal focus:border-brand-teal"
                        placeholder="e.g., 'We are overdue on this project, and my boss is stressed.'..."
                        disabled={loading}
                    ></textarea>
                </SelectorGroup>

                {/* Advanced Toggles */}
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <button type="button" onClick={() => setIsAdvancedMode(!isAdvancedMode)} className="text-sm font-semibold text-brand-terracotta hover:text-brand-terracotta/80 flex items-center">
                        Advanced Communication Styles <ArrowRight className={`ml-2 h-4 w-4 transition-transform ${isAdvancedMode ? 'rotate-90' : 'rotate-0'}`} />
                    </button>
                    {isAdvancedMode && (
                        <div className="mt-4 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <SelectorGroup label="My/Sender's Communication Style" tooltip="How do I/the sender usually communicate?">
                                    <RadioPillGroup name="senderStyle" value={senderStyle} onChange={setSenderStyle} options={['let-ai-decide', 'direct', 'indirect', 'soft', 'formal']} />
                                </SelectorGroup>
                                <SelectorGroup label="Their/Receiver's Style Preference" tooltip="How does the receiver prefer to receive messages?">
                                    <RadioPillGroup name="receiverStyle" value={receiverStyle} onChange={setReceiverStyle} options={['let-ai-decide', 'direct', 'indirect', 'soft', 'formal']} />
                                </SelectorGroup>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <SelectorGroup label="My/Sender's Neurotype" tooltip="Knowing this helps the AI understand the core communication difference.">
                                    <RadioPillGroup name="senderNeurotype" value={senderNeurotype} onChange={setSenderNeurotype} options={neurotypes} />
                                </SelectorGroup>
                                <SelectorGroup label="Their/Receiver's Neurotype" tooltip="Knowing this helps the AI understand the core communication difference.">
                                    <RadioPillGroup name="receiverNeurotype" value={receiverNeurotype} onChange={setReceiverNeurotype} options={neurotypes} />
                                </SelectorGroup>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <SelectorGroup label="My/Sender's Generation" tooltip="A brief hint to contextualize common communication habits.">
                                    <RadioPillGroup name="senderGeneration" value={senderGeneration} onChange={setSenderGeneration} options={generations} />
                                </SelectorGroup>
                                <SelectorGroup label="Their/Receiver's Generation" tooltip="A brief hint to contextualize common communication habits.">
                                    <RadioPillGroup name="receiverGeneration" value={receiverGeneration} onChange={setReceiverGeneration} options={generations} />
                                </SelectorGroup>
                            </div>
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className={`w-full text-white font-bold py-3 px-4 rounded-lg transition-colors ${loading ? 'bg-gray-400' : 'bg-brand-teal hover:bg-brand-teal/90'}`}
                >
                    {loading ? (
                        <div className="flex justify-center items-center gap-3">
                            <div className="w-4 h-4 border-2 border-t-2 border-t-white border-brand-teal rounded-full animate-spin"></div>
                            {loadingTips[Math.floor(Math.random() * loadingTips.length)]}
                        </div>
                    ) : isAnalyzeMode ? 'Analyze Message' : 'Generate Clarity'}
                </button>
            </form>

            {/* Output Section */}
            {(rawOutput || loading) && (
                <div className="space-y-6 pt-4">
                    <h2 className="text-2xl font-serif text-brand-charcoal font-bold">{isAnalyzeMode ? 'AI Analysis' : 'Generated Translation'}</h2>
                    
                    {/* The main AI output area */}
                    <div className="relative bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                        {/* Copy Button */}
                        <button 
                            onClick={() => handleCopy(editedOutput || rawOutput)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-brand-teal transition-colors"
                            title="Copy to clipboard"
                        >
                            {copyStatus ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                        </button>
                        
                        {/* Edit Button / Save Button */}
                        {rawOutput && (
                            <button 
                                onClick={() => editing ? handleSave() : setEditing(true)}
                                className={`absolute top-3 right-12 text-sm font-semibold transition-colors ${editing ? 'text-brand-purple hover:text-brand-purple/80' : 'text-brand-terracotta hover:text-brand-terracotta/80'}`}
                                title={editing ? "Save 'Golden' Translation" : "Edit to improve AI"}
                            >
                                {editing ? <Save className="w-5 h-5 inline-block mr-1" /> : <Edit className="w-5 h-5 inline-block mr-1" />}
                                {editing ? 'Save Edit' : 'Edit'}
                            </button>
                        )}

                        {/* Text Area */}
                        <textarea
                            rows={editing ? 8 : 6}
                            value={editing ? editedOutput : rawOutput}
                            onChange={(e) => setEditedOutput(e.target.value)}
                            readOnly={!editing}
                            className={`w-full resize-none bg-transparent rounded-lg p-0 border-none focus:ring-0 ${editing ? 'cursor-text' : 'cursor-default'} ${editing ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
                            placeholder="Awaiting generation..."
                        />
                        
                        {/* Status/Feedback section */}
                        {savedOutput && (
                            <div className="mt-4 p-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded text-sm">
                                <Check className="w-4 h-4 inline-block mr-1" />
                                Your "Golden Edit" has been saved and is being used to train the AI.
                            </div>
                        )}
                        {loading && (
                            <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 flex items-center justify-center rounded-lg">
                                <div className="animate-pulse text-brand-teal font-semibold">
                                    Thinking...
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Feedback Widget */}
                    {rawOutput && !loading && (
                        <Feedback 
                            onSave={handleSave} 
                            onReAnalyze={() => { 
                                if (editedOutput) {
                                    setRawOutput(editedOutput); 
                                    setEditing(false); 
                                    handleGenerate(new Event('submit')); // Re-run generate with the edited output
                                }
                            }} 
                            isAnalyzeMode={isAnalyzeMode}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

// CRITICAL FIX: Set to default export to resolve build errors.
export default TranslatePage;