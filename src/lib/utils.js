// src/lib/utils.js

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to conditionally combine CSS classes and intelligently merge
 * Tailwind CSS utility classes to avoid conflicts.
 */
// FIX: Removed TypeScript syntax (e.g., : ClassValue[])
export function cn(...inputs) {
    // twMerge handles merging Tailwind classes intelligently
    return twMerge(clsx(inputs));
}