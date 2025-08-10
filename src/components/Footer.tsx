'use client';

import { useTheme } from './ThemeProvider';

export default function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer className={`border-t border-border py-6 mt-auto ${theme === 'dark' ? 'bg-[#171720]/70 backdrop-blur-md' : ''}`}>
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-6 mb-4">
          <a 
            href="#" 
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Documentation
          </a>
          <a 
            href="#" 
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            GitHub
          </a>
          <a 
            href="#" 
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Community
          </a>
        </div>
        <p className="text-sm text-muted-foreground animate-slideInUp">
          © {new Date().getFullYear()} Valora. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
