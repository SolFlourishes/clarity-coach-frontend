// src/components/ModeCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

// This component now accepts a 'mode' object which contains the styling specifics
const ModeCard = ({ mode }) => {
    // Determine the class for the accent border at the top
    const borderClass = `border-t-4 ${mode.borderColor}`; 

    return (
        <Link to={mode.path} className="block h-full transition-shadow duration-300 hover:shadow-xl">
            <Card className={`h-full ${borderClass} rounded-t-none shadow-lg border-b-0 border-l-0 border-r-0`}>
                <CardContent className="p-6">
                    <div className={`w-12 h-12 ${mode.iconBgClass} text-white flex items-center justify-center rounded-full mb-4`}>
                        {mode.icon}
                    </div>
                    <CardTitle className="text-xl font-serif text-brand-charcoal">
                        {mode.title}
                    </CardTitle>
                    <p className="mt-2 text-sm text-brand-charcoal/70 font-sans">
                        {mode.description}
                    </p>
                    <div className="mt-4 flex items-center text-brand-teal font-semibold text-sm">
                        Go to Mode <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default ModeCard;