import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout.jsx';
// Import your necessary page components here
import TranslatePage from './pages/TranslatePage.jsx'; 
import ChatPage from './pages/ChatPage.jsx';
// Import any other required components like NotFound
// import NotFoundPage from './pages/NotFoundPage.jsx'; 

const App = () => {
    return (
        // App logic contains the Routes and uses AppLayout to wrap navigation/pages
        <Routes>
            <Route path="/" element={<AppLayout />}>
                {/* Default route for the app landing page */}
                <Route index element={<TranslatePage />} />
                
                {/* Core Clarity Coach Features */}
                <Route path="translate" element={<TranslatePage />} />
                <Route path="chat" element={<ChatPage />} />
                
                {/* Add other specific Clarity Coach routes here */}
                {/* Example: <Route path="profile" element={<ProfilePage />} /> */}
                
                {/* Fallback route */}
                {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Route>
        </Routes>
    );
};

export default App;