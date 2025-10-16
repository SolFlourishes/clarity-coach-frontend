// src/components/HearthArch.jsx
import React from 'react';

const HearthArch = ({ className = '', ...props }) => {
  return (
    <svg
      viewBox="0 0 100 50"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
      aria-label="Hearthside Works Logo"
    >
      <path
        d="M 10 50 A 40 40 0 0 1 90 50"
        stroke="currentColor"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default HearthArch;