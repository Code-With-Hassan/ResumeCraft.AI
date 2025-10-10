import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: 'The Rise of the AI-Crafted Resume',
    date: 'October 26, 2023',
    excerpt: 'Discover how artificial intelligence is revolutionizing the job application process and what it means for your resume.',
  },
  {
    id: 2,
    title: '5 Keywords Every Tech Resume Needs in 2024',
    date: 'October 22, 2023',
    excerpt: 'Stay ahead of the curve. We break down the essential keywords to get your resume noticed by top tech recruiters.',
  },
  {
    id: 3,
    title: 'Beating the Bots: A Guide to ATS Optimization',
    date: 'October 18, 2023',
    excerpt: 'Applicant Tracking Systems can be a barrier. Learn the strategies to ensure your resume always makes it to a human reader.',
  },
];

export default function BlogsPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">From Our Data Core</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Insights, trends, and intelligence from the front lines of career technology.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map(post => (
          <Card key={post.id} className="bg-secondary/30 border-primary/10 flex flex-col">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <p className="text-sm text-muted-foreground pt-1">{post.date}</p>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{post.excerpt}</p>
            </CardContent>
            <CardFooter>
              <Link href="#" className="flex items-center text-primary font-semibold hover:underline">
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
