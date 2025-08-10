'use client';

import { useEffect } from 'react';

export function ThemeScript() {
  useEffect(() => {
    // This runs only on the client
    const savedTheme = localStorage.getItem('dsc-theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return null;
}

// This is a separate component that gets rendered in the head
export function ThemeInitScript() {
  // This script runs immediately during page load, before React hydration
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var savedTheme = localStorage.getItem('dsc-theme');
              var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              
              if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (e) {
              console.error('Theme initialization failed:', e);
            }
          })();
        `,
      }}
    />
  );
}
