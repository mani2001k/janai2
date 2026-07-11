import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`relative overflow-hidden rounded-full ${className ?? ''}`}
      aria-label="Toggle theme"
    >
      <motion.div
        key={theme}
        initial={{ y: -20, opacity: 0, rotate: -90 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex items-center justify-center"
      >
        {isDark ? <Moon className="h-[1.15rem] w-[1.15rem]" /> : <Sun className="h-[1.15rem] w-[1.15rem]" />}
      </motion.div>
    </Button>
  );
}
