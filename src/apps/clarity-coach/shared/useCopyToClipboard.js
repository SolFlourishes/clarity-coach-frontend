// src/apps/clarity-coach/shared/useCopyToClipboard.js

import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook to handle copying text to the clipboard.
 * Returns a tuple: [copyState, copyFunction]
 * copyState: true if last copy was successful, false if not, null initially
 */
export function useCopyToClipboard() {
    const [isCopied, setIsCopied] = useState(null);

    const copy = useCallback(async (text) => {
        if (text == null) {
            setIsCopied(false);
            return false;
        }

        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            return true;
        } catch (error) {
            console.error('Failed to copy text: ', error);
            setIsCopied(false);
            return false;
        }
    }, []);

    // Clear the 'isCopied' state after a brief period
    useEffect(() => {
        if (isCopied) {
            const timeout = setTimeout(() => {
                setIsCopied(null);
            }, 1500);
            return () => clearTimeout(timeout);
        }
    }, [isCopied]);

    // Returns a simple tuple: [function] and an unused copy state.
    // The component only needs the function, so we export just the function.
    return [isCopied, copy];
}