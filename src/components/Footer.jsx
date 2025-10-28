import React from 'react';

const Footer = () => {
    // Brand color variable used for the link accent
    const PRIMARY_TEAL = 'var(--teal-primary)';

    return (
        <footer 
            // Use dynamic surface color for background and text color for text
            style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }} 
            className="p-6 mt-auto border-t border-gray-700 transition duration-300"
        >
            <div className="container mx-auto text-center text-sm">
                <p className="mb-1">&copy; {new Date().getFullYear()} Hearthside Works, LLC. All rights reserved.</p>
                <p>Motto: Hear Me, See Me, Know Me.</p>
                <p className="mt-2">
                    <a href="mailto:info@hearthsideworks.com" className="hover:underline" style={{ color: PRIMARY_TEAL }}>
                        Contact Us
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;