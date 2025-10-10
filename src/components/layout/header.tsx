import Link from 'next/link';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="py-4 px-4 md:px-8 border-b bg-card">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-2xl font-bold font-headline transition-opacity hover:opacity-80">
          <div className="p-2 bg-primary rounded-lg">
            <FileText className="text-primary-foreground h-6 w-6" />
          </div>
          <span>ResumeCraft AI</span>
        </Link>
        <Button variant="ghost">Log In</Button>
      </div>
    </header>
  );
}
