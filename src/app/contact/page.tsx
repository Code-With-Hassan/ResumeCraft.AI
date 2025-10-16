import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, User } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Connect with Us</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Have questions, feedback, or partnership inquiries? Drop us a line.
        </p>
      </section>

      <Card className="max-w-2xl mx-auto bg-secondary/30 border-primary/10">
        <CardContent className="p-8">
          <form className="space-y-6">
            <div className="space-y-2 relative">
              <Label htmlFor="name">Name</Label>
              <User className="absolute left-3 top-9 h-5 w-5 text-muted-foreground" />
              <Input id="name" placeholder="Your Name" className="pl-10" />
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="email">Email</Label>
              <Mail className="absolute left-3 top-9 h-5 w-5 text-muted-foreground" />
              <Input id="email" type="email" placeholder="Your Email" className="pl-10" />
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="message">Message</Label>
               <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Textarea id="message" placeholder="Your message..." rows={6} className="pl-10 pt-2" />
            </div>
            <Button type="submit" className="w-full glow-on-hover">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
