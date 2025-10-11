import React from 'react';

export const ModeCard = ({ title, description, linkTo }) => (
    <a href={linkTo} className="block bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-400 hover:-translate-y-1 transition-transform shadow-lg">
        <h3 className="text-xl font-bold font-serif text-teal-600 dark:text-teal-400 mb-2">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </a>
);