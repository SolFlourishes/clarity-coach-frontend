import React from 'react';

// Brand color variables
const PRIMARY_TEAL = 'var(--teal-primary)';
const TERRACOTTA = 'var(--terracotta-warmth)';

// This is a shared wrapper component to give all static pages the same modern look and feel.
const ContentPage = ({ children }) => (
    <div 
        className="max-w-4xl mx-auto p-6 sm:p-8 rounded-lg border shadow-lg transition duration-500 my-8"
        // Use dynamic surface color for background and dynamically change border color
        style={{ 
            backgroundColor: 'var(--color-surface)', 
            borderColor: 'var(--color-border)', 
            color: 'var(--color-text)'
        }}
    >
        {/* Prose utility class styles the raw HTML content (headings, paragraphs, lists) */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
            {children}
        </div>
    </div>
);

// --- STATIC PAGE DEFINITIONS ---

export const AboutPage = () => (
    <ContentPage>
        <h1 style={{ color: PRIMARY_TEAL }}>Hear Me, See Me, Know Me.</h1>
        <p className="lead"><strong>Our Vision:</strong> To create a world where everyone can find their community of understanding—and feel supported, valued, and known.</p>
        <h3 style={{ color: PRIMARY_TEAL }}>What is "Hearthside Works"?</h3>
        <p>A hearth is the heart of a home—a source of warmth, a place for gathering, and the center of connection. At Hearthside Works, LLC, we build tools that create that same sense of warmth, connection, and understanding in our digital world. We prioritize emotional safety and professional success as inseparable goals.</p>
        <h3 style={{ color: PRIMARY_TEAL }}>Our Core Ethos</h3>
        <ul>
            <li><strong style={{ color: TERRACOTTA }}>Kith and Kin:</strong> We foster belonging and psychological safety.</li>
            <li><strong style={{ color: TERRACOTTA }}>Purpose Over Profit:</strong> We fuel our mission through the Guardian Model.</li>
        </ul>
    </ContentPage>
);

export const HowToUsePage = () => (
    <ContentPage>
        <h1 style={{ color: PRIMARY_TEAL }}>How to Use Clarity Coach</h1>
        <p className="lead">The Clarity Coach has two primary modes for improving your communication, plus a Chat Coach for practice.</p>
        <h2 style={{ color: TERRACOTTA }}>Draft Mode: Be Heard</h2>
        <p>Use Draft Mode when you have a thought, but need to ensure your literal intent is clearly received by the audience.</p>
        <h2 style={{ color: TERRACOTTA }}>Analyze Mode: See and Be Seen</h2>
        <p>Use Analyze Mode when you receive a message that feels ambiguous, passive, or confusing. The Coach decodes the likely intent, helping you respond strategically.</p>
    </ContentPage>
);

export const RoadmapPage = () => (
    <ContentPage>
        <h1 style={{ color: PRIMARY_TEAL }}>Product Roadmap</h1>
        <p>Our roadmap is focused on developing the **Know Me** phase of our motto—fostering authentic connection.</p>
        <h2 style={{ color: TERRACOTTA }}>Near Term (Next 6 Months)</h2>
        <ul>
            <li>Launch of **Project Cohesion** promotional material (our conceptual sandbox RPG).</li>
            <li>Integration of **Verbose Explanations** to deepen communication theory knowledge.</li>
        </ul>
        <h2 style={{ color: TERRACOTTA }}>Future Development (Long Term)</h2>
        <ul>
            <li>Integration of **Guardian Model** subscription system.</li>
            <li>Development of dynamic **Contact Profiles** for personalized coaching based on your network.</li>
        </ul>
    </ContentPage>
);

export const ChangeLogPage = () => (
    <ContentPage>
        <h1 style={{ color: PRIMARY_TEAL }}>Change Log</h1>
        <h2 style={{ color: TERRACOTTA }}>V3.0.2 - The Stability Update (Current)</h2>
        <ul>
            <li>**Fixed:** Resolved critical deployment and path resolution errors on Vercel.</li>
            <li>**Feature:** Implemented **Modern Theming** with Light/Dark Mode toggle.</li>
            <li>**Feature:** Applied new **Hearthside Works Branding** across all application pages.</li>
        </ul>
    </ContentPage>
);

export const CreditsPage = () => (
    <ContentPage>
        <h1 style={{ color: PRIMARY_TEAL }}>Credits and Technologies</h1>
        <p>Clarity Coach is built on a modern, flexible, and robust stack.</p>
        <h2 style={{ color: TERRACOTTA }}>Core Technologies</h2>
        <ul>
            <li>**AI Engine:** Google Gemini API (gemini-2.5-flash-preview-09-2025)</li>
            <li>**Frontend:** React, Vite, Tailwind CSS</li>
            <li>**Backend:** Node.js (Express) on Google Cloud Run</li>
            <li>**Database:** Google Firestore</li>
            <li>**Deployment:** Vercel</li>
        </ul>
    </ContentPage>
);

export const CommitmentsPage = () => (
    <ContentPage>
      <h1 style={{ color: PRIMARY_TEAL }}>Our Commitments</h1>
      <p className="lead">Trust is the foundation of clear communication. This page outlines our unwavering commitment to your privacy and to making our tools accessible to everyone.</p>
      <h2 style={{ color: TERRACOTTA }}>Your Privacy is Paramount</h2>
      <h3>Can you see what I type into the translator?</h3>
      <p><strong>No.</strong> The text you enter for translation or analysis is sent securely to the AI for processing and is immediately discarded. It is never stored, and it is never seen by any human at Hearthside Works, LLC. Your conversations and thoughts are your own.</p>
      <h3>What Data Do You Collect?</h3>
      <p>We only store anonymous feedback data (star ratings, comments, and your "golden" edits) to help us identify areas for improvement. This data is completely disconnected from any personal identifiers.</p>
      <h2 style={{ color: TERRACOTTA }}>Commitment to Accessibility</h2>
      <p>Hearthside Works is dedicated to ensuring the Clarity Coach is accessible to all users. Our goal is to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.</p>
    </ContentPage>
);

// Named exports for all static pages to align with App.jsx
export { ContentPage };
