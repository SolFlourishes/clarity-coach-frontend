    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
          colors: {
            'teal': {
              400: '#2dd4bf',
              500: '#14b8a6',
              600: '#0d9488', // Primary Action per Brand Guide (approximated from #007B8C)
              700: '#0f766e',
              800: '#115e59',
              900: '#134e4a'
            },
            'terracotta': {
              400: '#f8b49e',
              500: '#E28A6D', // Secondary Warmth per Brand Guide
              600: '#d46a4d',
              700: '#b85133'
            },
            'gold': '#FFC72C', // Accent/Growth per Brand Guide
             gray: {
              100: '#F9FAFB', // Soft Off-White Background per Brand Guide
              300: '#d1d5db',
              400: '#9ca3af',
              500: '#6b7280',
              600: '#4b5563',
              700: '#374151',
              800: '#1F2937', // Dark Warm Gray Text per Brand Guide
              900: '#111827'
            },
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'], // Body & Interface Text per Brand Guide
            serif: ['Merriweather', 'serif'], // Headings & Titles per Brand Guide
          },
        },
      },
      plugins: [
        require('@tailwindcss/typography'),
      ],
    }
    
