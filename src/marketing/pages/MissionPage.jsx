// src/marketing/pages/MissionPage.jsx

import React from 'react';
// FIX: Correctly import AboutPage from the new content location
import { AboutPage } from './content/CompanyContent'; 
// Removed import CompanyLayout from ...

const MissionPage = () => (
    // FIX: Render the content component directly.
    <AboutPage />
);

export default MissionPage;