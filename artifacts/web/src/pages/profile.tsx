import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Mail, MapPin, Briefcase, Award, FileText, CheckCircle2, Star, Edit3, Save, Phone } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/use-auth';
import { roleLabels } from '@/lib/demo-users';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  // Local state for edit form
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+91 98765 43210',
    location: 'Pune, Maharashtra',
    bio: 'Passionate about keeping our city clean and helping others. Always ready for community service.',
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: 'Profile Updated',
      description: 'Your changes have been saved locally.',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!user) return null;

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="overflow-hidden border-border/50 glass-card">
          <div className="h-32 bg-gradient-to-r from-primary/30 via-chart-2/20 to-chart-4/30 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          </div>
          <CardContent className="relative px-6 pb-6 pt-0 sm:px-8 sm:pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 -mt-12 sm:-mt-16">
                <div className="relative group">
                  <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-background shadow-xl">
                    <AvatarFallback className="bg-primary text-3xl font-bold text-white">
                      {user.avatarInitials}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform hover:scale-105 opacity-0 group-hover:opacity-100">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-center sm:text-left mb-2">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{formData.name}</h1>
                  <div className="mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <Badge variant="secondary" className="capitalize px-2 py-0.5 font-semibold text-xs bg-primary/10 text-primary">
                      {roleLabels[user.role]}
                    </Badge>
                    <span className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-3.5 w-3.5" />
                      {formData.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center pb-2">
                {isEditing ? (
                  <Button onClick={handleSave} className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                ) : (
                  <Button variant="outline" onClick={() => setIsEditing(true)} className="gap-2 bg-card">
                    <Edit3 className="h-4 w-4" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Col: Info */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {isEditing ? (
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Edit Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" value={formData.email} disabled className="bg-muted/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" value={formData.location} onChange={handleChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" name="bio" rows={4} value={formData.bio} onChange={handleChange} />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {formData.bio}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/50 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Email</p>
                      <p className="font-medium">{formData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/50 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Phone</p>
                      <p className="font-medium">{formData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/50 text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Role</p>
                      <p className="font-medium capitalize">{roleLabels[user.role]}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Activity / Timeline (Placeholder visual) */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { action: 'Reported an issue', target: 'Broken streetlight on MG Road', date: '2 days ago', icon: FileText, color: 'text-primary' },
                { action: 'Volunteered for', target: 'Community Park Cleanup', date: '1 week ago', icon: Award, color: 'text-success' },
                { action: 'Earned badge', target: 'Active Citizen Level 2', date: '2 weeks ago', icon: Star, color: 'text-warning' },
              ].map((act, i) => {
                const Icon = act.icon;
                return (
                  <div key={i} className="flex gap-4">
                    <div className="relative flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
                        <Icon className={cn("h-4 w-4", act.color)} />
                      </div>
                      {i !== 2 && <div className="absolute top-8 bottom-[-16px] w-px bg-border/60"></div>}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium">{act.action} <span className="text-muted-foreground font-normal">{act.target}</span></p>
                      <p className="text-xs text-muted-foreground mt-0.5">{act.date}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Col: Stats */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-6"
        >
          <Card className="border-border/50 bg-gradient-to-b from-card to-accent/20">
            <CardHeader>
              <CardTitle>Impact Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/50 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Reports Filed</span>
                    <span className="text-xs text-muted-foreground">Community issues</span>
                  </div>
                </div>
                <span className="text-xl font-bold">14</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/50 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Tasks Done</span>
                    <span className="text-xs text-muted-foreground">Volunteering</span>
                  </div>
                </div>
                <span className="text-xl font-bold">8</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/50 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10 text-warning">
                    <Star className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Trust Score</span>
                    <span className="text-xs text-muted-foreground">Platform rating</span>
                  </div>
                </div>
                <span className="text-xl font-bold">92%</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
// Adding missing phone import
import { Phone as PhoneIcon } from 'lucide-react';
