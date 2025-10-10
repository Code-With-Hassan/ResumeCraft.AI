import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'ResumeCraft AI - Build Your Perfect Resume',
  description: 'Use AI to craft the perfect resume. Get content improvement suggestions, ATS checks, and professional templates to land your dream job.',
  keywords: ['resume builder', 'AI resume', 'resume templates', 'ATS checker', 'career', 'job application'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <Header />
        <main className="flex-1 w-full container mx-auto p-4 md:p-8">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
