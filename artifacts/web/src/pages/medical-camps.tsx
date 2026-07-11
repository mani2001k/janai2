import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ArrowRight, Stethoscope } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

import campBlood from '../../attached_assets/generated_images/camp-blood.jpg';
import campEye from '../../attached_assets/generated_images/camp-eye.jpg';
import campDiabetes from '../../attached_assets/generated_images/camp-diabetes.jpg';

const CAMPS = [
  {
    id: 'camp-1',
    title: 'Mega Blood Donation Drive',
    organizer: 'Red Cross & JanConnect',
    date: 'August 15, 2024',
    time: '09:00 AM - 04:00 PM',
    location: 'Community Hall, Ward 7',
    description: 'Join us for a mega blood donation drive. Every drop counts. Snacks and certificates will be provided to all donors.',
    capacity: 200,
    registered: 145,
    image: campBlood,
    status: 'upcoming',
    category: 'Blood Donation'
  },
  {
    id: 'camp-2',
    title: 'Free Eye Screening',
    organizer: 'Vision Care NGO',
    date: 'August 18, 2024',
    time: '10:00 AM - 02:00 PM',
    location: 'Govt School, Sector 4',
    description: 'Free comprehensive eye check-up for all age groups. Subsidized spectacles will be available for those in need.',
    capacity: 100,
    registered: 100,
    image: campEye,
    status: 'full',
    category: 'Eye Care'
  },
  {
    id: 'camp-3',
    title: 'Diabetes & BP Camp',
    organizer: 'Helping Hands Healthcare',
    date: 'August 22, 2024',
    time: '08:00 AM - 01:00 PM',
    location: 'Park Plaza, Ward 3',
    description: 'Routine check-ups for diabetes and blood pressure. Consultations with senior physicians available on site.',
    capacity: 150,
    registered: 62,
    image: campDiabetes,
    status: 'upcoming',
    category: 'General Health'
  }
];

export default function MedicalCampsPage() {
  const { toast } = useToast();
  const [registeredCamps, setRegisteredCamps] = useState<Set<string>>(new Set());

  const handleRegister = (id: string, title: string) => {
    setRegisteredCamps(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    toast({
      title: 'Registered Successfully!',
      description: `You are now registered for ${title}.`,
    });
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl bg-gradient-to-br from-primary/10 to-chart-2/10 p-8 border border-primary/20"
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-primary mb-3">
            <Stethoscope className="h-5 w-5" />
            <span className="font-semibold tracking-wide uppercase text-sm">Health Initiatives</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">Medical Camps</h1>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed">
            Participate in local health drives, screenings, and donation camps. Early registration is recommended as seats fill up fast.
          </p>
        </div>
        <Button size="lg" className="shrink-0 shadow-lg shadow-primary/20">
          Organize a Camp
        </Button>
      </motion.div>

      {/* Camps List */}
      <div className="space-y-6">
        {CAMPS.map((camp, i) => {
          const isFull = camp.status === 'full';
          const isRegistered = registeredCamps.has(camp.id);
          const percentFull = Math.min(100, Math.round((camp.registered / camp.capacity) * 100));

          return (
            <motion.div
              key={camp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
            >
              <Card className="overflow-hidden border-border/50 transition-all hover:shadow-md glass-card group">
                <div className="flex flex-col md:flex-row h-full">
                  {/* Image Section */}
                  <div className="relative w-full md:w-1/3 h-56 md:h-auto shrink-0 overflow-hidden">
                    <img 
                      src={camp.image} 
                      alt={camp.title} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-md shadow-sm font-semibold">
                        {camp.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 flex flex-col p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold">{camp.title}</h3>
                        <p className="text-sm font-medium text-primary mt-1">{camp.organizer}</p>
                      </div>
                      {isRegistered && (
                        <Badge variant="outline" className="bg-success/10 text-success border-success/30 shrink-0">
                          Registered
                        </Badge>
                      )}
                    </div>

                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed flex-1">
                      {camp.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      <div className="flex items-center gap-2 text-sm text-foreground/80">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {camp.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground/80">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {camp.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground/80 sm:col-span-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {camp.location}
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border/40">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-medium text-muted-foreground flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5" />
                            {camp.registered} / {camp.capacity} Registered
                          </span>
                          <span className="font-bold text-foreground">{percentFull}% Full</span>
                        </div>
                        <div className="h-1.5 w-full bg-accent rounded-full overflow-hidden">
                          <div 
                            className={cn("h-full rounded-full", isFull ? "bg-destructive" : "bg-primary")} 
                            style={{ width: `${percentFull}%` }}
                          />
                        </div>
                      </div>
                      <div className="shrink-0 sm:w-40">
                        {isRegistered ? (
                          <Button className="w-full" variant="secondary" disabled>
                            Ticket Confirmed
                          </Button>
                        ) : isFull ? (
                          <Button className="w-full" variant="outline" disabled>
                            Registration Closed
                          </Button>
                        ) : (
                          <Button className="w-full group/btn" onClick={() => handleRegister(camp.id, camp.title)}>
                            Register Now
                            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}