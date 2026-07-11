import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageSquare, Share2, HandHeart, MoreHorizontal, Clock } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

import feedPothole from '../../attached_assets/generated_images/feed-pothole.jpg';
import feedCleanup from '../../attached_assets/generated_images/feed-cleanup.jpg';
import feedCamp from '../../attached_assets/generated_images/feed-camp.jpg';

const initialPosts = [
  {
    id: 1,
    author: 'Municipal Corp',
    initials: 'MC',
    role: 'admin',
    time: '2 hours ago',
    category: 'Infrastructure',
    content: 'Our team is currently repairing the large pothole reported on MG Road. Traffic will be diverted for the next 4 hours. Thank you for your patience!',
    image: feedPothole,
    likes: 124,
    comments: 18,
    action: null,
    likedByMe: false,
  },
  {
    id: 2,
    author: 'Seva Foundation',
    initials: 'SF',
    role: 'ngo',
    time: '5 hours ago',
    category: 'Sanitation',
    content: 'Join us for a massive community cleanup drive this weekend at Central Park! We need volunteers to help distribute supplies and coordinate groups.',
    image: feedCleanup,
    likes: 342,
    comments: 45,
    action: 'Volunteer',
    likedByMe: true,
  },
  {
    id: 3,
    author: 'Vision Care NGO',
    initials: 'VC',
    role: 'ngo',
    time: '1 day ago',
    category: 'Medical',
    content: 'Successfully concluded our eye screening camp today. Over 150 elderly residents received free check-ups and reading glasses. A big thanks to all volunteers!',
    image: feedCamp,
    likes: 512,
    comments: 89,
    action: null,
    likedByMe: false,
  },
];

const categoryStyles: Record<string, string> = {
  Infrastructure: 'bg-primary/15 text-primary border-primary/20',
  Sanitation: 'bg-success/15 text-success border-success/20',
  Medical: 'bg-chart-4/15 text-chart-4 border-chart-4/20',
  Safety: 'bg-destructive/15 text-destructive border-destructive/20',
};

export default function CommunityFeedPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState(initialPosts);

  const toggleLike = (postId: number) => {
    setPosts(current =>
      current.map(p => {
        if (p.id === postId) {
          const wasLiked = p.likedByMe;
          return {
            ...p,
            likedByMe: !wasLiked,
            likes: wasLiked ? p.likes - 1 : p.likes + 1,
          };
        }
        return p;
      })
    );
  };

  const handleVolunteer = () => {
    toast({
      title: 'Volunteer Request Sent!',
      description: 'The organizer will contact you shortly.',
    });
  };

  const handleShare = () => {
    toast({
      title: 'Link Copied',
      description: 'Post link copied to clipboard.',
    });
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Community Feed</h1>
        <p className="text-sm text-muted-foreground">
          Stay updated with the latest happenings, reports, and events in your community.
        </p>
      </motion.div>

      {/* New Post Input (Visual only) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="glass-card overflow-hidden">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarFallback className="gradient-primary text-xs font-semibold text-white">
                  {user?.avatarInitials ?? 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex h-10 w-full items-center rounded-full bg-accent/40 px-4 text-sm text-muted-foreground transition-colors hover:bg-accent/60 cursor-pointer">
                  Share an update or report an issue...
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Feed List */}
      <div className="space-y-6">
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
          >
            <Card className="overflow-hidden border-border/50 shadow-sm transition-all hover:shadow-md">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-accent text-sm font-bold text-accent-foreground">
                        {post.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{post.author}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {post.time}
                        </span>
                        <span>·</span>
                        <span className="capitalize">{post.role}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-4 pt-2">
                <Badge variant="outline" className={cn('mb-3 text-xs', categoryStyles[post.category] || 'bg-muted')}>
                  {post.category}
                </Badge>
                <p className="text-sm leading-relaxed text-foreground/90">
                  {post.content}
                </p>
                {post.image && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-border/40">
                    <img src={post.image} alt="Post media" className="h-auto w-full object-cover max-h-[400px]" />
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex flex-col border-t border-border/40 p-0">
                <div className="flex w-full items-center justify-between px-4 py-2">
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleLike(post.id)}
                      className={cn('gap-2', post.likedByMe && 'text-chart-5 hover:text-chart-5')}
                    >
                      <Heart className={cn('h-4 w-4', post.likedByMe && 'fill-current')} />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    {post.action && (
                      <Button size="sm" className="gap-2 bg-primary/10 text-primary hover:bg-primary/20 shadow-none" onClick={handleVolunteer}>
                        <HandHeart className="h-4 w-4" />
                        {post.action}
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}