// src/apps/clarity-coach/shared/ModeCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
// FIX: Correct the import path to access the Card components in the sibling 'ui' folder
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from './ui/card'; // <-- CORRECTED PATH

const ModeCard = ({ mode }) => (
    <Link to={mode.path} className="block group">
        <Card className={`h-full transition-all duration-300 transform group-hover:scale-[1.03] group-hover:shadow-xl border-4 ${mode.borderColor} dark:bg-gray-800/80`}>
            <CardHeader>
                <div className={`p-3 w-12 h-12 flex items-center justify-center rounded-full text-white ${mode.iconBgClass} mb-4`}>
                    {mode.icon}
                </div>
                <CardTitle className="text-xl font-serif text-brand-charcoal dark:text-white group-hover:text-brand-terracotta transition-colors">
                    {mode.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-base text-brand-charcoal/70 dark:text-gray-300">
                    {mode.description}
                </CardDescription>
            </CardContent>
        </Card>
    </Link>
);

export default ModeCard;