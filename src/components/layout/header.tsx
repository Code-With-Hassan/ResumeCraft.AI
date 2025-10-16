
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/builder', label: 'Builder' },
];

const NavLink = ({ href, label, onClick }: { href: string; label: string, onClick?: () => void }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'transition-colors text-muted-foreground hover:text-foreground',
        isActive && 'text-primary font-semibold'
      )}
    >
      {label}
    </Link>
  );
};

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      user.getIdTokenResult().then((idTokenResult) => {
        const isAdminClaim = !!idTokenResult.claims.admin;
        setIsAdmin(isAdminClaim);
      });
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const logout = async () => {
    await signOut(auth);
  };

  const getInitials = (name: string | null) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  const allNavLinks = isAdmin ? [...navLinks, { href: '/admin', label: 'Admin' }] : navLinks;

  return (
    <header className="py-4 px-4 md:px-8 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 text-2xl font-bold font-headline transition-opacity hover:opacity-80"
        >
          <div className="p-2 bg-primary text-primary-foreground rounded-lg glow">
            <FileText className="h-6 w-6" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            ResumeCraft AI
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {allNavLinks.map(link => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
            {!isUserLoading && user ? (
              <>
                 <span className="text-sm font-medium">Welcome, {user.displayName}!</span>
                 <Avatar className="h-9 w-9">
                   <AvatarFallback className="bg-primary/20 font-bold">{getInitials(user.displayName)}</AvatarFallback>
                 </Avatar>
                <Button variant="ghost" onClick={logout} size="icon" aria-label="Log out">
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : !isUserLoading && (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
                <Button className="glow-on-hover" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
        </div>
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-6 mt-8">
                {allNavLinks.map(link => (
                  <NavLink key={link.href} {...link} onClick={() => setIsSheetOpen(false)}/>
                ))}
                 <div className="flex flex-col gap-4 mt-4 border-t pt-6">
                  {!isUserLoading && user ? (
                    <>
                      <div className="flex items-center gap-3">
                         <Avatar>
                           <AvatarFallback className="bg-primary/20 font-bold">{getInitials(user.displayName)}</AvatarFallback>
                         </Avatar>
                         <span className="font-semibold">{user.displayName}</span>
                      </div>
                      <Button variant="outline" onClick={() => { logout(); setIsSheetOpen(false); }}>Log Out</Button>
                    </>
                  ) : !isUserLoading && (
                    <>
                      <Button variant="outline" asChild>
                        <Link href="/login" onClick={() => setIsSheetOpen(false)}>Log In</Link>
                      </Button>
                      <Button className="glow-on-hover" asChild>
                         <Link href="/signup" onClick={() => setIsSheetOpen(false)}>Sign Up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
