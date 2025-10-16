// src/pages/MissionPage.jsx (Re-linked content correctly)

import React from 'react';
// Import the content component directly (assuming it's a named export in StaticPages.jsx)
import { AboutPage } from '../components/StaticPages'; 

// MissionPage now returns the content directly, relying on App.jsx to provide the layout.
const MissionPage = () => <AboutPage />;

export default MissionPage;