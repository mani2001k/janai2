import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  X,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Image as ImageIcon,
  Type,
  Send,
  ThumbsUp,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';

interface ReportData {
  id: string;
  title: string;
  category: string;
  priority: string;
  location: string;
  description: string;
  imageData: string | null;
  createdAt: string;
  reportedBy: string;
}

const STORAGE_KEY = 'janconnect-reports';

const categories = [
  { value: 'infrastructure', label: 'Infrastructure', icon: '🏗️' },
  { value: 'sanitation', label: 'Sanitation', icon: '🧹' },
  { value: 'safety', label: 'Safety', icon: '⚠️' },
  { value: 'medical', label: 'Medical', icon: '🏥' },
  { value: 'other', label: 'Other', icon: '📋' },
];

const priorities = [
  { value: 'low', label: 'Low', color: 'text-muted-foreground' },
  { value: 'medium', label: 'Medium', color: 'text-warning' },
  { value: 'high', label: 'High', color: 'text-destructive' },
];

export default function ReportIssuePage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [recentReports, setRecentReports] = useState<ReportData[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const validate = useCallback((): boolean => {
    const next: Record<string, string> = {};
    if (!title.trim()) next.title = 'Title is required';
    else if (title.trim().length < 5) next.title = 'Title must be at least 5 characters';
    if (!category) next.category = 'Please select a category';
    if (!priority) next.priority = 'Please select a priority';
    if (!location.trim()) next.location = 'Location is required';
    else if (location.trim().length < 3) next.location = 'Location is too short';
    if (!description.trim()) next.description = 'Description is required';
    else if (description.trim().length < 10) next.description = 'Description must be at least 10 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [title, category, priority, location, description]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrors((p) => ({ ...p, image: 'Please select an image file' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((p) => ({ ...p, image: 'Image must be under 5MB' }));
      return;
    }
    setErrors((p) => {
      const copy = { ...p };
      delete copy.image;
      return copy;
    });
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast({
        variant: 'destructive',
        title: 'Please fix the errors',
        description: 'Some fields need your attention before submitting.',
      });
      return;
    }

    setSubmitting(true);
    // Simulate a brief network delay for UX
    await new Promise((r) => setTimeout(r, 800));

    const report: ReportData = {
      id: `rpt-${Date.now()}`,
      title: title.trim(),
      category,
      priority,
      location: location.trim(),
      description: description.trim(),
      imageData: imagePreview,
      createdAt: new Date().toISOString(),
      reportedBy: user?.name ?? 'Anonymous',
    };

    const updated = [report, ...recentReports].slice(0, 20);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setRecentReports(updated);
    } catch {
      // localStorage might be full from image data — store without image
      const withoutImage = { ...report, imageData: null };
      const fallback = [withoutImage, ...recentReports].slice(0, 20);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fallback));
      setRecentReports(fallback);
    }

    setSubmitting(false);

    // Reset form
    setTitle('');
    setCategory('');
    setPriority('');
    setLocation('');
    setDescription('');
    setImagePreview(null);
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = '';

    toast({
      title: 'Report submitted successfully!',
      description: `"${report.title}" has been logged. AI is routing it to the right team.`,
    });
  };

  const categoryLabel = (val: string) =>
    categories.find((c) => c.value === val)?.label ?? val;

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Report an Issue</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Submit a community issue with a photo and location. AI will categorize and route it automatically.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="lg:col-span-2"
        >
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Issue Details</CardTitle>
              <CardDescription>Fill in the details below. All fields are required.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="flex items-center gap-1.5">
                    <Type className="h-3.5 w-3.5 text-muted-foreground" /> Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g. Pothole on MG Road near signal"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (errors.title) setErrors((p) => ({ ...p, title: '' }));
                    }}
                    className={cn(errors.title && 'border-destructive')}
                  />
                  {errors.title && (
                    <p className="flex items-center gap-1 text-xs text-destructive">
                      <AlertCircle className="h-3 w-3" /> {errors.title}
                    </p>
                  )}
                </div>

                {/* Category + Priority */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={category}
                      onValueChange={(v) => {
                        setCategory(v);
                        if (errors.category) setErrors((p) => ({ ...p, category: '' }));
                      }}
                    >
                      <SelectTrigger className={cn(errors.category && 'border-destructive')}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            <span className="mr-1.5">{c.icon}</span> {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="flex items-center gap-1 text-xs text-destructive">
                        <AlertCircle className="h-3 w-3" /> {errors.category}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={priority}
                      onValueChange={(v) => {
                        setPriority(v);
                        if (errors.priority) setErrors((p) => ({ ...p, priority: '' }));
                      }}
                    >
                      <SelectTrigger className={cn(errors.priority && 'border-destructive')}>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            <span className={cn('font-medium', p.color)}>{p.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.priority && (
                      <p className="flex items-center gap-1 text-xs text-destructive">
                        <AlertCircle className="h-3 w-3" /> {errors.priority}
                      </p>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" /> Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g. MG Road, near traffic signal, Ward 7"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      if (errors.location) setErrors((p) => ({ ...p, location: '' }));
                    }}
                    className={cn(errors.location && 'border-destructive')}
                  />
                  {errors.location && (
                    <p className="flex items-center gap-1 text-xs text-destructive">
                      <AlertCircle className="h-3 w-3" /> {errors.location}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the issue in detail. When did you notice it? How is it affecting the community?"
                    rows={4}
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      if (errors.description) setErrors((p) => ({ ...p, description: '' }));
                    }}
                    className={cn(errors.description && 'border-destructive')}
                  />
                  <div className="flex items-center justify-between">
                    {errors.description ? (
                      <p className="flex items-center gap-1 text-xs text-destructive">
                        <AlertCircle className="h-3 w-3" /> {errors.description}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span className="text-xs text-muted-foreground">{description.length} chars</span>
                  </div>
                </div>

                {/* Image upload */}
                <div className="space-y-2">
                  <Label>Photo (optional)</Label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  <AnimatePresence mode="wait">
                    {imagePreview ? (
                      <motion.div
                        key="preview"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative overflow-hidden rounded-xl border border-border"
                      >
                        <img
                          src={imagePreview}
                          alt="Issue preview"
                          className="h-48 w-full object-cover sm:h-56"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-md transition-colors hover:bg-destructive hover:text-white"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </motion.div>
                    ) : (
                      <motion.button
                        key="upload"
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={cn(
                          'flex h-32 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-colors hover:border-primary hover:bg-accent/30',
                          errors.image ? 'border-destructive' : 'border-border'
                        )}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                          <Camera className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-sm font-medium">Click to upload a photo</span>
                        <span className="text-xs text-muted-foreground">PNG, JPG up to 5MB</span>
                      </motion.button>
                    )}
                  </AnimatePresence>
                  {errors.image && (
                    <p className="flex items-center gap-1 text-xs text-destructive">
                      <AlertCircle className="h-3 w-3" /> {errors.image}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    Your report will be saved locally and routed by AI.
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setTitle('');
                        setCategory('');
                        setPriority('');
                        setLocation('');
                        setDescription('');
                        setImagePreview(null);
                        setErrors({});
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      disabled={submitting}
                    >
                      Clear
                    </Button>
                    <Button type="submit" disabled={submitting}>
                      {submitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="mr-2 h-4 w-4" />
                      )}
                      Submit Report
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar: Recent reports */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-4"
        >
          <Card className="border-border/50">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base">Your Recent Reports</CardTitle>
                <CardDescription>{recentReports.length} saved locally</CardDescription>
              </div>
              <Badge variant="secondary">{recentReports.length}</Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentReports.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border py-8 text-center">
                  <ImageIcon className="h-5 w-5 text-muted-foreground" />
                  <p className="text-sm font-medium">No reports yet</p>
                  <p className="text-xs text-muted-foreground">Submitted reports will appear here.</p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {recentReports.slice(0, 8).map((report) => (
                    <motion.div
                      key={report.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="rounded-xl border border-border/40 p-3 transition-colors hover:bg-accent/30"
                    >
                      <div className="flex items-start gap-2.5">
                        {report.imageData ? (
                          <img
                            src={report.imageData}
                            alt={report.title}
                            className="h-10 w-10 shrink-0 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent">
                            <ImageIcon className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{report.title}</p>
                          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                            <span className="capitalize">{categoryLabel(report.category)}</span>
                            <span>·</span>
                            <span className="capitalize">{report.priority}</span>
                            <span>·</span>
                            <span>{report.location}</span>
                          </div>
                        </div>
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </CardContent>
          </Card>

          {/* Tips card */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Reporting Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { icon: Camera, text: 'Add a clear photo to help teams assess the issue quickly.' },
                { icon: MapPin, text: 'Be specific with location — landmarks and ward numbers help.' },
                { icon: ThumbsUp, text: 'Reports with more upvotes get prioritized by AI routing.' },
              ].map((tip, i) => {
                const Icon = tip.icon;
                return (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <p className="pt-1 text-xs text-muted-foreground">{tip.text}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
