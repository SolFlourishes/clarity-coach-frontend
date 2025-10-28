import React, { useState, useEffect } from 'react';
import { AppLayout } from './components/AppLayout';
import { HomePage } from './components/HomePage';
import { TranslatePage } from './components/TranslatePage';
import { ChatPage } from './components/ChatPage';
import { AboutPage, HowToUsePage, RoadmapPage, ChangeLogPage, CreditsPage, CommitmentsPage } from './components/StaticPages';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider></ThemeProvider>
{ const App = () => {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');

    const [page, setPage] = useState(getCurrentPage());
    function getCurrentPage() {
        const hash = window.location.hash.slice(1) || '/';
        return hash;
    }
    useEffect(() => {
        const handleHashChange = () => setPage(getCurrentPage());
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const renderPage = () => {
        const [path, param] = page.split('/').filter(Boolean);
        if (path === 'translate' && param) return <TranslatePage mode={param} />;
        if (path === 'chat') return <ChatPage />;

        const staticPages = {
            'about': <AboutPage />, 'how-to-use': <HowToUsePage />, 'roadmap': <RoadmapPage />,
            'changelog': <ChangeLogPage />, 'credits': <CreditsPage />, 'commitments': <CommitmentsPage />,
        };
        return staticPages[path] || <HomePage />;
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen font-sans">
            <AppLayout theme={theme} toggleTheme={toggleTheme}>
                {renderPage()}
            </AppLayout>
        </div>
    );
};
<BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
export default App;