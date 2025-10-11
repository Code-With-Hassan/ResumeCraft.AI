import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Key } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-20rem)]">
      <Card className="w-full max-w-md mx-auto bg-secondary/30 border-primary/10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Welcome Back</CardTitle>
          <CardDescription>Log in to access your dashboard and resume tools.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2 relative">
              <Label htmlFor="email">Email</Label>
              <Mail className="absolute left-3 top-9 h-5 w-5 text-muted-foreground" />
              <Input id="email" type="email" placeholder="Your Email" className="pl-10" required />
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Key className="absolute left-3 top-9 h-5 w-5 text-muted-foreground" />
              <Input id="password" type="password" placeholder="Your Password" className="pl-10" required />
            </div>
            <Button type="submit" className="w-full glow-on-hover">
              Log In
            </Button>
             <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
