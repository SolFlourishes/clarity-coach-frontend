import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; 
import { ThemeProvider } from './context/theme-provider.tsx'; // For Dark/Light Mode
import { BrowserRouter } from 'react-router-dom'; // 👈 CRITICAL: Provides Router Context

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      {/* The BrowserRouter wrapper MUST be here to provide context to the Routes/Links in App.jsx */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);