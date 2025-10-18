// src/pages/ContactPage.jsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Briefcase, ChevronDown } from 'lucide-react';
import HearthArch from '../shared/HearthArch';

const ContactPage = () => (
    <div className="flex flex-col items-center min-h-screen bg-brand-cream p-8">
        <HearthArch className="w-16 h-8 text-brand-terracotta mt-8 mb-4" />
        <Card className="w-full max-w-md shadow-lg border-brand-terracotta/20">
            <CardHeader>
                <CardTitle className="text-3xl font-serif text-brand-charcoal/90">Get in Touch</CardTitle>
                <p className="text-brand-charcoal/70 text-sm">Hearthside Works, LLC</p>
            </CardHeader>
            <CardContent className="space-y-6 text-brand-charcoal">
                <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-brand-teal" />
                        <span className="font-semibold">General Support</span>
                    </div>
                    <a href="mailto:support@hearthsideworks.com" className="ml-8 block text-brand-teal hover:underline font-sans">support@hearthsideworks.com</a>
                </div>
                
                <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                        <Briefcase className="h-5 w-5 text-brand-teal" />
                        <span className="font-semibold">Business Inquiries</span>
                    </div>
                    <a href="mailto:bizdev@hearthsideworks.com" className="ml-8 block text-brand-teal hover:underline font-sans">bizdev@hearthsideworks.com</a>
                </div>

                <p className="text-sm text-brand-charcoal/70 pt-4">We are primarily an online operation. For more details on privacy and legal matters, please see our Commitments page.</p>
            </CardContent>
        </Card>
    </div>
);

export default ContactPage;