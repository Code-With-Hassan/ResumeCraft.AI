import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { AuthProvider } from '@/lib/auth';
import { fontBody, fontHeadline } from '@/app/fonts';
import { cn } from '@/lib/utils';

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
      <body className={cn("font-body antialiased bg-background text-foreground", fontHeadline.variable, fontBody.variable)}>
        <AuthProvider>
          <Header />
          <main className="flex-1 w-full container mx-auto p-4 md:p-8">
            {children}
          </main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
