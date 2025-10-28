import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; 
import { ThemeProvider } from './context/theme-provider.tsx'; // NEW IMPORT
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap the core application with ThemeProvider to enable global theme state */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);