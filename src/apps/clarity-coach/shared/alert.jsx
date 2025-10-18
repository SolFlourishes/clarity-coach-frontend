// src/apps/clarity-coach/shared/alert.jsx

import React from "react";
import { cn } from "../lib/utils"; // Assuming utils.js has 'cn' for combining class names

// --- 1. Alert Component ---
const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(
      "relative w-full rounded-lg border p-4",
      "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-brand-charcoal dark:text-white", // Basic styling
      "flex items-start", // Added flex for internal alignment
      className
    )}
    {...props}
  />
));
Alert.displayName = "Alert";

// --- 2. AlertTitle Component ---
const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", "text-sm", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

// --- 3. AlertDescription Component ---
const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", "text-gray-600 dark:text-gray-300", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";


// Export all required components as named exports
export { Alert, AlertTitle, AlertDescription };