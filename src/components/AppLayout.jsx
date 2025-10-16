// src/components/AppLayout.jsx

import React from 'react';
// Import dependencies as needed

const AppLayout = ({ theme, toggleTheme, children }) => {
    // Your existing AppLayout component logic (header, navigation, etc.)
    return (
        <div className={`app-container min-h-screen ${theme}`}>
            {/* Header/Navigation component that likely uses toggleTheme */}
            {/* <Header toggleTheme={toggleTheme} /> */} 

            <main className="w-full">
                {children}
            </main>

            {/* Footer component */}
            {/* <Footer /> */} 
        </div>
    );
};

// CRITICAL FIX: Change to DEFAULT EXPORT
export default AppLayout;
