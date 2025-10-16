
'use client';

import { useState, FormEvent, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useCollection, WithId, useMemoFirebase } from '@/firebase';
import { addDoc, collection, serverTimestamp, query, orderBy } from 'firebase/firestore';


type BlogPost = {
  title: string;
  content: string;
  authorId: string;
  createdAt: any;
};

type BlogPostWithId = WithId<BlogPost>;

export default function AdminPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  const blogPostsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'blogPosts'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: blogPosts, isLoading } = useCollection<BlogPost>(blogPostsQuery);

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) {
      toast({
        title: 'Error',
        description: 'Please fill out all fields.',
        variant: 'destructive',
      });
      return;
    }

    if (!user) {
      toast({
        title: 'Authentication Error',
        description: 'You must be logged in to create a post.',
        variant: 'destructive',
      });
      return;
    }

    if (!firestore) {
       toast({
        title: 'Database Error',
        description: 'Firestore is not available.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await addDoc(collection(firestore, 'blogPosts'), {
        title: newPost.title,
        content: newPost.content,
        authorId: user.uid,
        createdAt: serverTimestamp(),
      });

      toast({
        title: 'Blog Post Added!',
        description: `The post "${newPost.title}" has been saved.`,
      });

      setNewPost({ title: '', content: '' });
    } catch (error) {
      console.error('Error adding document: ', error);
      toast({
        title: 'Error',
        description: 'There was an error saving the post.',
        variant: 'destructive',
      });
    }
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
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="The full content of the blog post..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  rows={6}
                />
              </div>
              <Button type="submit" className="w-full glow-on-hover" disabled={!user}>
                {user ? 'Add Post' : 'Log in to Add Post'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-secondary/30 border-primary/10">
          <CardHeader>
            <CardTitle>Existing Blog Posts</CardTitle>
            <CardDescription>This is a read-only view of current posts from the database.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4">
              {isLoading && <p>Loading posts...</p>}
              {blogPosts && blogPosts.map((post: BlogPostWithId) => (
                <div key={post.id} className="p-3 border rounded-md bg-background/50">
                  <h4 className="font-semibold">{post.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {post.createdAt?.toDate().toLocaleDateString()}
                  </p>
                  <p className="text-sm mt-1 truncate">{post.content}</p>
                </div>
              ))}
              {!isLoading && blogPosts?.length === 0 && (
                <p className="text-muted-foreground text-center">No blog posts yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
