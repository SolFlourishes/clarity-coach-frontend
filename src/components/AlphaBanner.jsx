import React from 'react';

export const AlphaBanner = ({ onDismiss }) => (
    <div className="relative bg-terracotta-500 text-white p-3 text-center text-sm">
        <p><strong>Welcome to the Clarity Coach Beta!</strong> This is an early version. Your insights are invaluable.</p>
        <button 
            onClick={onDismiss} 
            title="Dismiss" 
            className="absolute top-1/2 right-4 -translate-y-1/2 text-xl"
            aria-label="Dismiss banner"
        >
            &times;
        </button>
    </div>
);