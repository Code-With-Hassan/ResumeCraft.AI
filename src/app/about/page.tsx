import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Code } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">About ResumeCraft AI</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          We are pioneers in AI-driven career tools, dedicated to helping you build the future you deserve.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <Card className="bg-secondary/30 border-primary/10">
          <CardHeader>
            <div className="mx-auto bg-primary/20 text-primary p-3 rounded-full w-fit glow">
              <Target className="w-8 h-8" />
            </div>
            <CardTitle className="mt-4">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To empower job seekers with intelligent, intuitive, and innovative tools that give them a competitive edge in the modern job market.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-secondary/30 border-primary/10">
          <CardHeader>
            <div className="mx-auto bg-primary/20 text-primary p-3 rounded-full w-fit glow">
              <Users className="w-8 h-8" />
            </div>
            <CardTitle className="mt-4">Our Team</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              A diverse group of AI researchers, developers, and career coaches united by a passion for technology and human potential.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-secondary/30 border-primary/10">
          <CardHeader>
            <div className="mx-auto bg-primary/20 text-primary p-3 rounded-full w-fit glow">
              <Code className="w-8 h-8" />
            </div>
            <CardTitle className="mt-4">Our Technology</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Leveraging state-of-the-art language models and machine learning algorithms to provide unparalleled resume analysis and enhancement.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
