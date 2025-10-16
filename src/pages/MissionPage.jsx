// src/pages/MissionPage.jsx

import React from 'react';
import { AboutPage } from '../components/StaticPages'; 
import CompanyLayout from '../components/CompanyLayout';

const MissionPage = () => (
    <CompanyLayout>
        {/* We reuse the detailed AboutPage content here */}
        <AboutPage />
    </CompanyLayout>
);

export default MissionPage;