// src/marketing/pages/content/CompanyContent.jsx

import React from 'react';

// This is a shared wrapper component to give all static pages the same look and feel.
const ContentPage = ({ children }) => (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800/50 p-6 sm:p-8 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="prose prose-lg dark:prose-invert max-w-none prose-h1:font-serif prose-h1:text-brand-teal dark:prose-h1:text-teal-400 prose-strong:text-brand-terracotta prose-a:text-brand-teal dark:prose-a:text-teal-400 hover:prose-a:text-teal-600 dark:hover:prose-a:text-teal-300">
            {children}
        </div>
    </div>
);

// MIGRATED CONTENT: This fits best on the /mission route.
export const AboutPage = () => (
    <ContentPage>
        <h1>Hear Me, See Me, Know Me.</h1>
        <p className="lead"><strong>Our Vision:</strong> To create a world where everyone can find their community of understanding—and feel supported, valued, and known.</p>
        <h3>What is "Hearthside Works"?</h3>
        <p>A hearth is the heart of a home—a source of warmth, a place for gathering, and the center of connection. At Hearthside Works, LLC, we build tools that create that same sense of warmth, connection, and understanding in our digital and professional lives.</p>
        <h2>The Clarity Coach: Our Flagship Product</h2>
        <h3>The Challenge: A Costly Communication Gap</h3>
        <p>Have you ever felt like you were speaking a different language than a colleague or friend? This is a common and costly reality. A significant communication gap exists between different neurotypes (e.g., neurodivergent and neurotypical individuals), leading to misunderstanding, lost productivity, and personal distress.</p>
        <p>Existing tools fail to address the core issue: translating the social-pragmatic intent and unspoken subtext that often gets lost between different communication styles.</p>
        <h3>The Solution: A Translator, Analyst & Coach</h3>
        <p>The Clarity Coach is a first-of-its-kind, AI-powered learning platform designed to bridge this gap. It's your personal communication partner.</p>
        <ul>
            <li><strong>As a Translator:</strong> It helps you rephrase your message to be clearly understood by your audience.</li>
            <li><strong>As an Analyst:</strong> It decodes the likely intent behind messages you receive.</li>
            <li><strong>As a Coach:</strong> It provides real-time advice and practice to build your skills.</li>
        </ul>
        <h2>Our Guiding Philosophy</h2>
        <ul>
            <li><strong>Translate Styles, Not People:</strong> We believe in celebrating all communication styles. Our goal is to create a bridge, not to "correct" how someone thinks or speaks.</li>
            <li><strong>Context is Key:</strong> The AI is powerful, but it can't read a room. Always combine its insights with your own judgment.</li>
            <li><strong>Connection is the Goal:</strong> Technology is the means, not the end. The ultimate goal is to foster better human connection.</li>
        </ul>
    </ContentPage>
);

// MIGRATED CONTENT: This fits best on the /credits route.
export const CreditsPage = () => (
    <ContentPage>
      <h1>Credits & Attributions</h1>
      <h2>Founder & Visionary</h2>
      <p>The Clarity Coach was conceived, designed, and guided by the singular vision of <strong>Sol Roberts-Lieb, Ed.D.</strong> This application, including its core workflows and intellectual framework, is the direct result of their dedication to building a tool that fosters empathy and understanding. </p>
      <h2>Development Process</h2>
      <p>This application was developed in a unique, collaborative process where Sol Roberts-Lieb, Ed.D. served as the architect and product lead, providing the core concepts, user stories, real-world examples, and critical feedback that shaped the AI's logic and the application's user-focused design. Technical implementation was assisted by a large language model (Google's Gemini), which acted as a pair programmer and technical consultant under Dr. Roberts-Lieb's direction.</p>
      <h2>Scholarly Foundations</h2>
      <p>The AI's analysis is grounded in established academic concepts from sociology, linguistics, and psychology. Key concepts include:</p>
      <ul>
        <li><strong>The Double Empathy Problem:</strong> A theory by Dr. Damian Milton suggesting that communication breakdowns between autistic and non-autistic people are a two-way issue of mutual misunderstanding.</li>
        <li><strong>High-Context and Low-Context Cultures:</strong> A framework by anthropologist Edward T. Hall explaining how some cultures rely on implicit context while others rely on explicit information.</li>
      </ul>
    </ContentPage>
);

// MIGRATED CONTENT: This fits best on the /commitments route.
export const CommitmentsPage = () => (
    <ContentPage>
      <h1>Our Commitments</h1>
      <p className="lead">Trust is the foundation of clear communication. This page outlines our unwavering commitment to your privacy and to making our tools accessible to everyone.</p>
      <h2>Your Privacy is Paramount</h2>
      <h3>Can you see what I type into the translator?</h3>
      <p><strong>No.</strong> The text you enter for translation or analysis is sent securely to the AI for processing and is immediately discarded. It is never stored, and it is never seen by any human at Hearthside Works, LLC. Your conversations and thoughts are your own.</p>
      <h3>What Data Do You Collect?</h3>
      <p>We only store anonymous feedback data (star ratings, comments, and your "golden" edits) to help us identify areas for improvement. This data is completely disconnected from any personal identifiers.</p>
      <h2>Commitment to Accessibility</h2>
      <p>Hearthside Works is dedicated to ensuring the Clarity Coach is accessible to all users. Our goal is to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.</p>
    </ContentPage>
);