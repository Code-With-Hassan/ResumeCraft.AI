import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Key, User } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-20rem)]">
      <Card className="w-full max-w-md mx-auto bg-secondary/30 border-primary/10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Create an Account</CardTitle>
          <CardDescription>Join ResumeCraft AI and start building your future.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
             <div className="space-y-2 relative">
              <Label htmlFor="name">Name</Label>
              <User className="absolute left-3 top-9 h-5 w-5 text-muted-foreground" />
              <Input id="name" placeholder="Your Name" className="pl-10" required />
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="email">Email</Label>
              <Mail className="absolute left-3 top-9 h-5 w-5 text-muted-foreground" />
              <Input id="email" type="email" placeholder="Your Email" className="pl-10" required />
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Key className="absolute left-3 top-9 h-5 w-5 text-muted-foreground" />
              <Input id="password" type="password" placeholder="Create a Password" className="pl-10" required />
            </div>
            <Button type="submit" className="w-full glow-on-hover">
              Sign Up
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
