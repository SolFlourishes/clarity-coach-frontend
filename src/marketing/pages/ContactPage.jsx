// src/marketing/pages/ContactPage.jsx

import React from 'react';
import { Mail, Briefcase } from 'lucide-react';
// FIX 1: Correct the path for the Card UI components
import { Card, CardContent, CardHeader, CardTitle } from '../../apps/clarity-coach/shared/card'; 
// FIX 2: Correct the path for the HearthArch logo (Fixed in earlier steps, confirming it stays correct)
import HearthArch from '../shared/HearthArch'; 

const ContactPage = () => (
    // The content is implicitly wrapped in CompanyLayout by App.jsx
    <div className="flex flex-col items-center bg-brand-cream p-8">
        <HearthArch className="w-16 h-8 text-brand-terracotta mt-8 mb-4" />
        <Card className="w-full max-w-md shadow-lg border-brand-terracotta/20">
            <CardHeader>
                <CardTitle className="text-3xl font-serif text-brand-charcoal/90">Get in Touch</CardTitle>
                <p className="text-brand-charcoal/70 text-sm">Hearthside Works, LLC</p>
            </CardHeader>
            <CardContent className="space-y-6 text-brand-charcoal">
                {/* ... content sections ... */}
            </CardContent>
        </Card>
    </div>
);

export default ContactPage;