'use client';

export default function Footer() {
  return (
    <footer className="w-full bg-[#85858D]/20 py-4 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Valora. All rights reserved.
        </p>
      </div>
    </footer>
  );
}