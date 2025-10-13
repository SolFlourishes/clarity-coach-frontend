import React from 'react';

// This is a shared wrapper component to give all static pages the same look and feel.
const ContentPage = ({ children }) => (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800/50 p-6 sm:p-8 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="prose prose-lg dark:prose-invert max-w-none prose-h1:font-serif prose-h1:text-teal-600 dark:prose-h1:text-teal-400 prose-strong:text-terracotta-500 prose-a:text-teal-500 dark:prose-a:text-teal-400 hover:prose-a:text-teal-600 dark:hover:prose-a:text-teal-300">
            {children}
        </div>
    </div>
);

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

export const HowToUsePage = () => (
    <ContentPage>
      <h1>How to Use the Clarity Coach</h1>
      <p className="lead">This guide will help you get the most out of the Beta version by explaining its features and workflows.</p>
      <h2>Core Features: Draft, Analyze, and Chat</h2>
      <h3>Draft a Message</h3>
      <p>Use this mode when you have a thought you need to share effectively.</p>
      <ul>
        <li><strong>What I Mean (Intent):</strong> Enter the core goal of your message.</li>
        <li><strong>What I Wrote (Draft):</strong> Enter your raw thoughts or a rough draft.</li>
        <li>The AI will then explain potential misinterpretations and provide a polished draft.</li>
      </ul>
      <h3>Analyze a Message</h3>
      <p>Use this mode when you receive a message that is confusing or has a hidden meaning.</p>
      <ul>
        <li><strong>What They Wrote:</strong> Paste the message you received.</li>
        <li><strong>What's the Situation? (Context):</strong> Briefly explain the circumstances. This gives the AI crucial context.</li>
        <li><strong>How I Heard It:</strong> Explain how the message made you feel or what you think it means.</li>
        <li>The AI will then analyze the sender's likely intent and suggest a strategic response.</li>
      </ul>
      <h3>Chat with the Coach</h3>
      <p>Use this real-time chat for more complex situations or for practicing your skills.</p>
      <ul>
        <li><strong>Get Real-time Advice:</strong> Describe a challenging situation and get instant, empathetic advice.</li>
        <li><strong>Role-play a Conversation:</strong> Practice a difficult conversation in a safe space.</li>
        <li><strong>Brainstorm Solutions:</strong> Work through a communication problem step-by-step with the AI as your sounding board.</li>
      </ul>

      {/* --- NEW SECTION --- */}
      <h2>Learning from Translations</h2>
      <p>After every translation, you have powerful tools to learn and improve the AI.</p>
      <h3>The Golden Feedback Loop: Edit, Save, and Re-analyze</h3>
      <p>This is the most important feature for improving both your skills and the AI's accuracy.</p>
      <ol>
          <li><strong>Edit:</strong> Click the "Edit this translation" button to make inline changes to the AI's suggested text. Correct any phrasing that doesn't feel right to you.</li>
          <li><strong>Save:</strong> Click "Save" to submit your improved version to our database. This is the "golden" data that will be used to train future versions of the AI.</li>
          <li><strong>Re-analyze My Edit:</strong> After saving, click this button to run your new version back through the AI. It will provide a fresh analysis of your edit, helping you see if your changes improved clarity or accidentally introduced new issues.</li>
      </ol>
      <h3>Copy to Clipboard</h3>
      <p>Use the copy icon in the top-right corner of any text box to quickly copy its contents (with formatting removed) to your clipboard.</p>

    </ContentPage>
);

export const RoadmapPage = () => (
    <ContentPage>
      <h1>Application Roadmap</h1>
      <p className="lead">We believe in transparency. This page outlines our current state and future vision.</p>
      <div className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
          <h2>Current Phase: Beta (v3.0)</h2>
          <p>This version is focused on a robust, decoupled architecture and a full UI redesign in line with Hearthside Works branding.</p>
          <h3>Key Features Implemented</h3>
          <ul>
            <li>Stable backend deployed on Google Cloud Run.</li>
            <li>Redesigned UI with Tailwind CSS.</li>
            <li>All previous Beta 2.1 features re-implemented.</li>
          </ul>
      </div>
      <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
          <h2>Next Phase: Gamma & Beyond</h2>
          <p>The next major steps are building the "Golden Feedback Loop" and implementing premium features.</p>
          <h3>Key Enhancements</h3>
          <ul>
              <li><strong>Golden Feedback Loop:</strong> Allow users to directly edit and save AI-generated text for model training.</li>
              <li><strong>User Accounts (Premium):</strong> Securely save translation history and user preferences.</li>
              <li><strong>RAG Implementation:</strong> Ground AI responses in your curated library of scholarly articles.</li>
          </ul>
      </div>
    </ContentPage>
);

export const ChangeLogPage = () => (
    <ContentPage>
        <h1>Change Log</h1>
        <div className="mb-6">
            <h2>Version 3.0 (Current)</h2>
            <ul>
                <li><strong>Major Architectural Restructure:</strong> Migrated backend from Vercel Serverless to a dedicated Node.js server on Google Cloud Run to ensure stability and eliminate streaming errors.</li>
                <li><strong>Complete UI/UX Redesign:</strong> Rebuilt the entire frontend with Tailwind CSS to align with the Hearthside Works brand guide, improving aesthetics, accessibility, and responsiveness.</li>
                <li><strong>Component Refactor:</strong> Broke the monolithic App.jsx into individual, manageable component files for clarity and maintainability.</li>
                <li><strong>New Feature - Verbose Mode:</strong> Added a "Learn More" option to translation results, providing users with a deeper, educational breakdown of the AI's reasoning and specific word choices.</li>
                {/* --- NEW ITEMS --- */}
                <li><strong>New Feature - Golden Feedback Loop:</strong> Implemented the ability for users to edit, save, and re-analyze AI translations to provide training data and receive feedback on their changes.</li>
                <li><strong>UX Improvement - Copy Buttons:</strong> Added copy-to-clipboard functionality for all user inputs and AI-generated outputs.</li>
                <li>Re-implemented all features from Beta 2.1, including Translate, Analyze, Chat, advanced selectors, and feedback systems.</li>
            </ul>
        </div>
        <div className="mb-6">
            <h2>Version 2.1.1</h2>
            <ul>
                <li><strong>Branding Update:</strong> Updated all branding to reflect the new company name, "Hearthside Works," and the product name, "Clarity Coach."</li>
                <li>Added "Our Commitments" page for Privacy and Accessibility statements.</li>
            </ul>
        </div>
    </ContentPage>
);

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

export const CommitmentsPage = () => (
    <ContentPage>
      <h1>Our Commitments</h1>
      <p className="lead">Trust is the foundation of clear communication. This page outlines our unwavering commitment to your privacy and to making our tools accessible to everyone.</p>
      <h2>Your Privacy is Paramount</h2>
      <h3>Can you see what I type into the translator?</h3>
      <p><strong>No.</strong> The text you enter for translation or analysis is sent securely to the AI for processing and is immediately discarded. It is never stored, and it is never seen by any human at Hearthside Works, LLC. Your conversations and thoughts are your own.</p>
      <h3>What Data Do You Collect?</h3>
      <p>We only store anonymous feedback data (star ratings and comments) to help us identify areas for improvement. This data is completely disconnected from any personal identifiers.</p>
      <h2>Commitment to Accessibility</h2>
      <p>Hearthside Works is dedicated to ensuring the Clarity Coach is accessible to all users. Our goal is to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.</p>
    </ContentPage>
);