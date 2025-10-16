
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import blogPostsData from '@/lib/blog-posts.json';

type BlogPost = {
  id: number;
  title: string;
  date: string;
  excerpt: string;
};

export default function AdminPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(blogPostsData.posts);
  const [newPost, setNewPost] = useState({ title: '', excerpt: '' });
  const { toast } = useToast();

  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.excerpt) {
      toast({
        title: 'Error',
        description: 'Please fill out all fields.',
        variant: 'destructive',
      });
      return;
    }

    const newBlogPost: BlogPost = {
      id: blogPosts.length + 1,
      title: newPost.title,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      excerpt: newPost.excerpt,
    };

    // In a real app, you'd send this to a server.
    // For now, we'll just update the state and log it.
    const updatedBlogPosts = [...blogPosts, newBlogPost];
    setBlogPosts(updatedBlogPosts);
    console.log('Updated blog posts:', updatedBlogPosts);

    // This is where you would typically write back to the JSON file,
    // which is a server-side operation and not possible from the client.
    // We are simulating the addition of the blog post.
    toast({
      title: 'Blog Post Added (Simulated)',
      description: `The post "${newPost.title}" has been added to the local view.`,
    });

    setNewPost({ title: '', excerpt: '' });
  };

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Admin Panel</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Manage your website's content here.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-secondary/30 border-primary/10">
          <CardHeader>
            <CardTitle>Add New Blog Post</CardTitle>
            <CardDescription>Create a new post to be displayed on the blogs page.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddBlog} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Blog Post Title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  placeholder="A short summary of the blog post..."
                  value={newPost.excerpt}
                  onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full glow-on-hover">
                Add Post
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-secondary/30 border-primary/10">
          <CardHeader>
            <CardTitle>Existing Blog Posts</CardTitle>
            <CardDescription>This is a read-only view of current posts.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4">
              {blogPosts.map((post) => (
                <div key={post.id} className="p-3 border rounded-md bg-background/50">
                  <h4 className="font-semibold">{post.title}</h4>
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                  <p className="text-sm mt-1">{post.excerpt}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
