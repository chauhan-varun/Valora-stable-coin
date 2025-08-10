'use client';

import { useTheme } from './ThemeProvider';

export default function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer className="w-full bg-[#000000]/20 py-4 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Valora. All rights reserved.
        </p>
      </div>
    </footer>
  );
}