import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import blogPostsData from '@/lib/blog-posts.json';

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
        {blogPostsData.posts.map(post => (
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
