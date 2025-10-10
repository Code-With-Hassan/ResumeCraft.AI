import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MoveRight, Code, ShieldCheck, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

  return (
    <div className="space-y-16">
      <section className="text-center py-20">
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
            <Card key={index} className="bg-secondary/50 border-primary/20">
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
    </div>
  );
}
