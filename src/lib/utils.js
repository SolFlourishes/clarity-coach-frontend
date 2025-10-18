// src/lib/utils.js

// OLD: import { type ClassValue, clsx } from "clsx";

// FIX: Import only the executable 'clsx' function
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to conditionally combine CSS classes and intelligently merge
 * Tailwind CSS utility classes to avoid conflicts.
 * * NOTE: The 'inputs' variable implicitly accepts ClassValue types.
 */
export function cn(...inputs) {
    // twMerge handles merging Tailwind classes intelligently
    return twMerge(clsx(inputs));
}

// You can delete the line about 'type ClassValue' from the parameter list as well if it's there
// If your file has: export function cn(...inputs: ClassValue[])
// Change it to: export function cn(...inputs)