// src/apps/clarity-coach/shared/Feedback.jsx

import React, { useState } from 'react';
import { Star, Send, Loader2, Check } from 'lucide-react';
// FIX: Corrected paths for generic UI components
import { 
    Card, 
    CardContent, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from './card'; 
import { Button } from './button';
import { Textarea } from './textarea';
// --- END FIX ---

const rawApiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const API_BASE_URL = rawApiUrl.replace(/\/$/, "");

export const Feedback = ({ type, onFeedbackSubmit, isSuccess }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [status, setStatus] = useState('');
    const [isSent, setIsSent] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

    // Show the form automatically if the core action (translate/analyze) was successful
    useEffect(() => {
        if (isSuccess && !isSent) {
            setIsFormVisible(true);
        }
    }, [isSuccess, isSent]);

    const handleRating = (newRating) => {
        setRating(newRating);
        if (!isFormVisible) setIsFormVisible(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');

        const payload = {
            rating: rating,
            comment: comment,
            type: type, // 'translation' or 'analysis'
            timestamp: new Date().toISOString(),
        };

        try {
            // Optional: Call parent onSubmit function for immediate component logic
            if (onFeedbackSubmit) {
                onFeedbackSubmit(payload);
            }
            
            // API Call to submit feedback
            const response = await fetch(`${API_BASE_URL}/api/feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to send feedback.');
            }

            setStatus('Thank you for your feedback!');
            setIsSent(true);
            setRating(0);
            setComment('');
            
        } catch (error) {
            console.error('Feedback Submission Error:', error);
            setStatus('Failed to submit. Please try again.');
        }
    };

    if (!isFormVisible && !isSuccess) {
        return (
            <Button variant="ghost" className="mt-4 text-brand-teal hover:bg-brand-teal/10 dark:text-brand-teal dark:hover:bg-brand-teal/20" onClick={() => setIsFormVisible(true)}>
                <Star className="w-4 h-4 mr-2" /> Rate this Result
            </Button>
        );
    }
    
    return (
        <Card className="mt-6 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50">
            <CardHeader>
                <CardTitle className="text-md font-serif text-brand-charcoal dark:text-white">Rate the {type}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-1 justify-center py-2">
                    {[1, 2, 3, 4, 5].map((starIndex) => (
                        <Star
                            key={starIndex}
                            className={`w-6 h-6 cursor-pointer transition-colors ${
                                starIndex <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400 dark:text-gray-600'
                            }`}
                            onClick={() => handleRating(starIndex)}
                            fill={starIndex <= rating ? 'currentColor' : 'none'}
                        />
                    ))}
                </div>
                
                {isSent ? (
                    <div className="text-center text-brand-teal mt-4 font-semibold flex items-center justify-center">
                        <Check className="w-5 h-5 mr-2"/> {status}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                        <Textarea 
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Optional: Tell us how we can improve this result."
                            rows={3}
                            className="w-full io-textarea text-sm"
                        />
                        <Button 
                            type="submit" 
                            disabled={rating === 0 || status === 'Sending...'}
                            className="w-full bg-brand-terracotta hover:bg-brand-terracotta/90 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
                        >
                            {status === 'Sending...' ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2 h-4 w-4" /> Submit Feedback
                                </>
                            )}
                        </Button>
                    </form>
                )}
            </CardContent>
            <CardFooter className="text-center text-xs text-gray-500 dark:text-gray-400">
                Your feedback is anonymous and crucial for training the next generation of our AI.
            </CardFooter>
        </Card>
    );
};