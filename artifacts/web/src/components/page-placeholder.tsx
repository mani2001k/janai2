import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface PagePlaceholderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
}

export function PagePlaceholder({ title, description, icon: Icon, badge }: PagePlaceholderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-1 items-center justify-center p-6"
    >
      <Card className="relative w-full max-w-2xl overflow-hidden border-border/50 glass-card">
        <div className="gradient-mesh pointer-events-none absolute inset-0 opacity-60" />
        <CardContent className="relative flex flex-col items-center gap-6 px-8 py-16 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' }}
            className="flex h-20 w-20 items-center justify-center rounded-2xl gradient-primary text-white shadow-xl shadow-primary/30"
          >
            <Icon className="h-9 w-9" strokeWidth={1.8} />
          </motion.div>
          <div className="space-y-2">
            {badge && (
              <span className="mb-3 inline-flex items-center rounded-full border border-border/60 bg-accent/50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                {badge}
              </span>
            )}
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
            <p className="max-w-md text-sm text-muted-foreground sm:text-base">{description}</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-dashed border-border/60 bg-muted/40 px-4 py-2 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Coming soon — module under active development
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
