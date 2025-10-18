// src/marketing/pages/MissionPage.jsx

import React from 'react';
// FIX: Correctly import AboutPage from the sibling 'content/CompanyContent' file
import { AboutPage } from './content/CompanyContent'; 
// NOTE: Assuming you are using named exports as planned.

const MissionPage = () => (
    // Render the content component directly. The layout is provided by the parent router (App.jsx).
    <AboutPage />
);

export default MissionPage;