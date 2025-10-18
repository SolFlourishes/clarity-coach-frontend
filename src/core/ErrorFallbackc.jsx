// src/core/ErrorFallback.jsx

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI:
      return (
        <div style={{ padding: '40px', backgroundColor: '#fee2e2', border: '2px solid #ef4444', color: '#991b1b', fontFamily: 'sans-serif' }}>
          <h2>❌ Application Failed to Render</h2>
          <p>A critical error occurred while loading the main layout or component.</p>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
            <summary style={{ fontWeight: 'bold', cursor: 'pointer' }}>Error Details (Click to expand)</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <p style={{ marginTop: '15px', fontWeight: 'bold' }}>This is likely an issue with the last component rendered (Header, Footer, or a UI element).</p>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;