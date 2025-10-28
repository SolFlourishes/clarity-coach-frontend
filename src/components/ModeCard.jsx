import React from 'react';

export const ModeCard = ({ title, description, linkTo }) => (
    <a href={linkTo} className="block bg-white dark:bg-gray-800 p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-md">
        <h3 className="text-2xl font-bold font-serif text-teal-600 dark:text-teal-400 mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
    </a>
);