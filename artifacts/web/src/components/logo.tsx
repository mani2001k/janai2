import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LogoProps {
  to?: string;
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: { box: 'h-7 w-7', icon: 16, text: 'text-base' },
  md: { box: 'h-9 w-9', icon: 20, text: 'text-lg' },
  lg: { box: 'h-11 w-11', icon: 24, text: 'text-2xl' },
};

export function Logo({ to = '/', className, showText = true, size = 'md' }: LogoProps) {
  const s = sizeMap[size];
  return (
    <Link to={to} className={cn('flex items-center gap-2.5 group', className)}>
      <motion.div
        whileHover={{ rotate: -8, scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={cn(
          'relative flex items-center justify-center rounded-xl gradient-primary text-white shadow-lg shadow-primary/30',
          s.box
        )}
      >
        <svg width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="white" strokeWidth="2" strokeLinejoin="round" opacity="0.9" />
          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn('font-bold tracking-tight font-display', s.text)}>
            JanConnect
          </span>
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">
            AI
          </span>
        </div>
      )}
    </Link>
  );
}
