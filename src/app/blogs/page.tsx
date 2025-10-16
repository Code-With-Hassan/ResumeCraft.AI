
'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { collection, query, orderBy } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { useCollection, WithId } from '@/firebase';

type BlogPost = {
  title: string;
  content: string;
  createdAt: any;
};

type BlogPostWithId = WithId<BlogPost>;

export default function BlogsPage() {
  const blogPostsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'blogPosts'), orderBy('createdAt', 'desc'));
  }, []);

  const { data: blogPosts, isLoading } = useCollection<BlogPost>(blogPostsQuery);

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">From Our Data Core</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Insights, trends, and intelligence from the front lines of career technology.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading && Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="bg-secondary/30 border-primary/10 flex flex-col">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-1/2 animate-pulse mt-2"></div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="h-4 bg-muted rounded w-full animate-pulse mb-2"></div>
              <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
            </CardContent>
            <CardFooter>
                <div className="h-5 bg-muted rounded w-1/3 animate-pulse"></div>
            </CardFooter>
          </Card>
        ))}
        {blogPosts && blogPosts.map((post: BlogPostWithId) => (
          <Card key={post.id} className="bg-secondary/30 border-primary/10 flex flex-col">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <p className="text-sm text-muted-foreground pt-1">
                {post.createdAt?.toDate().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground line-clamp-3">{post.content}</p>
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
