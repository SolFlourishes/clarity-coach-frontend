import React, { useState } from 'react';

export const Feedback = ({ type, onSubmit, isSuccess }) => {
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
        return <div className="mt-4 text-center text-sm text-green-500 dark:text-green-400">Thank you for your rating!</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4 pt-4 border-t border-dashed border-gray-300 dark:border-gray-600 space-y-3">
            <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                        <button
                            type="button"
                            key={ratingValue}
                            className={`text-2xl transition-colors ${ratingValue <= (hover || rating) ? 'text-gold' : 'text-gray-400 dark:text-gray-600 hover:text-gray-500'}`}
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
            {/* FIX #10: Larger feedback text box */}
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How could this be improved?"
                className="io-textarea text-sm min-h-[100px]"
            />
            <button
                type="submit"
                disabled={rating === 0}
                className="w-full text-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-bold py-2 px-4 rounded-lg disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-500 disabled:cursor-not-allowed"
            >
                Rate this {type}
            </button>
        </form>
    );
};