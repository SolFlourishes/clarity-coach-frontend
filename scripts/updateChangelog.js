// File: scripts/updateChangelog.js
const fs = require('fs');
const path = require('path');

const changelogPath = path.resolve(__dirname, '../src/components/StaticPages.jsx');
const packageJsonPath = path.resolve(__dirname, '../package.json');

// Get the new version and the commit message from npm's environment variables
const newVersion = process.env.npm_package_version;
const message = process.argv[2] || 'General updates and improvements.'; // Default message

if (!newVersion) {
    console.error('Error: Could not find new version number.');
    process.exit(1);
}

try {
    let content = fs.readFileSync(changelogPath, 'utf8');

    // Find the current version block to add the new item
    const currentVersionRegex = /(<h2>Version .*? \(Current\)<\/h2>\s*<ul>)/;
    const match = content.match(currentVersionRegex);

    if (match) {
        const newItem = `                <li>${message}</li>`;
        const updatedContent = content.replace(currentVersionRegex, `$1\n${newItem}`);
        
        fs.writeFileSync(changelogPath, updatedContent, 'utf8');
        console.log(`✅ Successfully updated Change Log in StaticPages.jsx for v${newVersion}.`);
    } else {
        console.warn('⚠️  Could not find the "Current" version block in the changelog. Manual update required.');
    }
} catch (error) {
    console.error('Failed to update changelog:', error);
    process.exit(1);
}