// src/apps/clarity-coach/shared/textarea.jsx

import React from "react";
import { cn } from "../../../lib/utils";// Assuming utils.js has 'cn' for combining class names

// This defines the shared styling for Textarea, similar to other UI components
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                "flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                "resize-none io-textarea bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white", // Custom styling used in your pages
                className
            )}
            ref={ref}
            {...props}
        />
    )
})
Textarea.displayName = "Textarea";

// The ChatPage needs a named export, so we provide one here
export { Textarea };