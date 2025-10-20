
'use client';

import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { fontBody, fontHeadline } from '@/app/fonts';
import { cn } from '@/lib/utils';
import { FirebaseClientProvider } from '@/firebase';
import { useEffect } from 'react';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DISABLE_DEV_TOOLS === 'true') {
      const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        // Disable F12
        if (e.key === 'F12') {
          e.preventDefault();
        }
        // Disable Ctrl+Shift+I
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
          e.preventDefault();
        }
        // Disable Ctrl+Shift+J
        if (e.ctrlKey && e.shiftKey && e.key === 'J') {
          e.preventDefault();
        }
        // Disable Ctrl+U
        if (e.ctrlKey && e.key === 'U') {
          e.preventDefault();
        }
      };

      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, []);

  return (
    <html lang="en" className="dark">
      <body className={cn("font-body antialiased bg-background text-foreground", fontHeadline.variable, fontBody.variable)}>
        <FirebaseClientProvider>
          <Header />
          <main className="flex-1 w-full container mx-auto p-4 md:p-8">
            {children}
          </main>
          <Footer />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
