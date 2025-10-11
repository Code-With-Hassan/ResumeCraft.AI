import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MoveRight, Code, ShieldCheck, FileText, Bot, PenSquare, DownloadCloud, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Home() {
  const features = [
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: 'AI-Powered Content',
      description: 'Generate compelling resume content with our advanced AI.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: 'ATS-Optimized',
      description: 'Ensure your resume gets past automated screeners.',
    },
    {
      icon: <Code className="w-8 h-8 text-primary" />,
      title: 'Futuristic Templates',
      description: 'Choose from a variety of sleek, modern templates.',
    },
  ];

  const steps = [
    {
      icon: <PenSquare className="w-10 h-10 text-primary" />,
      title: '1. Input Your Data',
      description: 'Fill in your personal, educational, and professional history into our intuitive form.',
    },
    {
      icon: <Bot className="w-10 h-10 text-primary" />,
      title: '2. Enhance with AI',
      description: 'Use our AI-powered tools to refine descriptions, optimize for keywords, and perfect your content.',
    },
    {
      icon: <DownloadCloud className="w-10 h-10 text-primary" />,
      title: '3. Export & Apply',
      description: 'Select a template, preview your final resume, and download it to start applying for jobs.',
    },
  ];

  const testimonials = [
    {
      name: 'Alex Rivera',
      title: 'Software Engineer',
      avatar: 'AR',
      testimonial: 'ResumeCraft AI transformed my resume. The AI suggestions were spot-on and helped me land interviews at top tech companies. A must-have tool for any job seeker.',
    },
    {
      name: 'Samantha Chen',
      title: 'UX Designer',
      avatar: 'SC',
      testimonial: 'The templates are stunning and modern. I was able to create a beautiful, professional resume in minutes that truly stands out. I\'ve gotten so many compliments on it!',
    },
    {
        name: 'David Patel',
        title: 'Data Scientist',
        avatar: 'DP',
        testimonial: 'The ATS checker is a game-changer. I finally understood why my applications weren\'t getting through. After a few tweaks suggested by the AI, I started getting responses.',
    },
  ];

  return (
    <div className="space-y-24 md:space-y-32">
      <section className="text-center pt-12 md:pt-20">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Engineer Your Career&apos;s Future
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Harness the power of AI to build a resume that transcends the ordinary.
          Our futuristic tools and templates will set you apart.
        </p>
        <Link href="/builder">
          <Button size="lg" className="glow-on-hover">
            Start Building
            <MoveRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-secondary/50 border-primary/20 hover:border-primary/50 transition-colors duration-300">
              <CardHeader className="flex flex-row items-center gap-4">
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">How It Works</h2>
            <p className="text-lg text-muted-foreground mt-2">Create your perfect resume in three simple steps.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4">
              <div className="mb-4 p-4 bg-primary/20 rounded-full glow">{step.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">From the Community</h2>
            <p className="text-lg text-muted-foreground mt-2">See what users are saying about ResumeCraft AI.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-secondary/50 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                        <AvatarFallback className="bg-primary/30 font-bold">{testimonial.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                </div>
                <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                </div>
                <blockquote className="text-muted-foreground italic border-l-2 border-primary pl-4">
                    {testimonial.testimonial}
                </blockquote>
              </CardContent>
            </Card>
            ))}
        </div>
      </section>
      
      <section className="text-center py-16 bg-secondary/30 rounded-lg">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Ready to Launch Your Career?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Don't let your resume get lost in the pile. Build a resume that demands attention.
        </p>
        <Link href="/builder">
          <Button size="lg" className="glow-on-hover">
            Create My Resume Now
            <MoveRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
