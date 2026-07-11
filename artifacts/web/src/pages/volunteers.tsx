import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Award, CheckCircle2, UserPlus, SlidersHorizontal, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const VOLUNTEERS = [
  {
    id: 'vol-1',
    name: 'Priya Menon',
    initials: 'PM',
    avatar: null,
    rating: 4.9,
    tasks: 42,
    skills: ['First Aid', 'Event Management', 'Teaching'],
    availability: 'Weekends',
    location: 'Ward 7, Pune',
    status: 'available',
  },
  {
    id: 'vol-2',
    name: 'Karan Verma',
    initials: 'KV',
    avatar: null,
    rating: 4.7,
    tasks: 18,
    skills: ['Logistics', 'Driving', 'Heavy Lifting'],
    availability: 'Evenings',
    location: 'Sector 4, Pune',
    status: 'available',
  },
  {
    id: 'vol-3',
    name: 'Anita Singh',
    initials: 'AS',
    avatar: null,
    rating: 5.0,
    tasks: 89,
    skills: ['Medical Doctor', 'Counseling', 'First Aid'],
    availability: 'On Call',
    location: 'City Center, Pune',
    status: 'busy',
  },
  {
    id: 'vol-4',
    name: 'Rahul Kumar',
    initials: 'RK',
    avatar: null,
    rating: 4.5,
    tasks: 12,
    skills: ['Social Media', 'Content Writing', 'Photography'],
    availability: 'Flexible',
    location: 'Baner, Pune',
    status: 'available',
  },
  {
    id: 'vol-5',
    name: 'Neha Patel',
    initials: 'NP',
    avatar: null,
    rating: 4.8,
    tasks: 34,
    skills: ['Elderly Care', 'Cooking', 'Teaching'],
    availability: 'Weekdays',
    location: 'Kothrud, Pune',
    status: 'available',
  },
  {
    id: 'vol-6',
    name: 'Vikram Joshi',
    initials: 'VJ',
    avatar: null,
    rating: 4.6,
    tasks: 27,
    skills: ['Plumbing', 'Carpentry', 'Repair'],
    availability: 'Weekends',
    location: 'Viman Nagar, Pune',
    status: 'busy',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function VolunteersPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');

  const filteredVolunteers = useMemo(() => {
    return VOLUNTEERS.filter(v => 
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.skills.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
      v.location.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleConnect = (name: string) => {
    toast({
      title: 'Connection Request Sent',
      description: `You have asked to connect with ${name}.`,
    });
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Community Volunteers</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Connect with skilled individuals ready to help make a difference.
          </p>
        </div>
        <div className="flex w-full sm:w-auto items-center gap-2">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, skill, or location..."
              className="pl-9 bg-card"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 bg-card">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Stats/Filters */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        <Badge variant="secondary" className="px-3 py-1.5 text-xs font-medium cursor-pointer hover:bg-accent">
          All ({VOLUNTEERS.length})
        </Badge>
        <Badge variant="outline" className="px-3 py-1.5 text-xs font-medium cursor-pointer hover:bg-accent text-success border-success/30">
          Available ({VOLUNTEERS.filter(v => v.status === 'available').length})
        </Badge>
        <Badge variant="outline" className="px-3 py-1.5 text-xs font-medium cursor-pointer hover:bg-accent">
          Medical Skills
        </Badge>
        <Badge variant="outline" className="px-3 py-1.5 text-xs font-medium cursor-pointer hover:bg-accent">
          Logistics
        </Badge>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence>
          {filteredVolunteers.map((vol) => (
            <motion.div key={vol.id} variants={item} layout>
              <Card className="group overflow-hidden border-border/50 hover:shadow-lg hover:shadow-primary/5 transition-all h-full flex flex-col relative">
                <div className={cn(
                  "absolute top-0 left-0 w-full h-1", 
                  vol.status === 'available' ? 'bg-success' : 'bg-warning'
                )} />
                <CardContent className="p-5 flex-1 flex flex-col">
                  <div className="flex items-start justify-between">
                    <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-chart-2/20 text-primary font-bold">
                        {vol.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-1 bg-accent/50 px-2 py-1 rounded-md">
                      <Star className="h-3 w-3 fill-warning text-warning" />
                      <span className="text-xs font-bold">{vol.rating}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="font-semibold text-lg">{vol.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {vol.location}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {vol.skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="text-[10px] px-1.5 py-0 font-medium">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 flex items-center justify-between text-sm">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Tasks Done</span>
                      <span className="font-bold flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-success" /> {vol.tasks}
                      </span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-xs text-muted-foreground">Availability</span>
                      <span className="font-medium">{vol.availability}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-5" 
                    variant={vol.status === 'available' ? 'default' : 'secondary'}
                    onClick={() => handleConnect(vol.name)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredVolunteers.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center">
          <p className="text-muted-foreground">No volunteers found matching your search.</p>
        </motion.div>
      )}
    </div>
  );
}