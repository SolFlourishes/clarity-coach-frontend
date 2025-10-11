import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { AlphaBanner } from './AlphaBanner';
import { FeedbackModal } from './FeedbackModal';

export const AppLayout = ({ children, theme, toggleTheme }) => {
    const [showBanner, setShowBanner] = useState(true);
    return (
        <div className="flex flex-col min-h-screen">
            {showBanner && <AlphaBanner onDismiss={() => setShowBanner(false)} />}
            <Header theme={theme} toggleTheme={toggleTheme} />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
            <FeedbackModal />
            <Footer />
        </div>
    );
};