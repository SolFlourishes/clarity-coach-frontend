// src/lib/utils.js

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to conditionally combine CSS classes and intelligently merge
 * Tailwind CSS utility classes to avoid conflicts.
 * @param {ClassValue[]} inputs - List of class names or conditional class objects.
 * @returns {string} - The merged class string.
 */
export function cn(...inputs: ClassValue[]) {
    // twMerge handles merging Tailwind classes intelligently
    return twMerge(clsx(inputs));
}