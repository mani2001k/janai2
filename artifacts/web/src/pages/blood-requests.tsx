import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, AlertTriangle, Clock, MapPin, Phone, CheckCircle2, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const REQUESTS = [
  {
    id: 'req-1',
    patient: 'Suresh Patil',
    bloodGroup: 'O-',
    units: 3,
    hospital: 'Ruby Hall Clinic',
    location: 'Pune Station, Pune',
    urgency: 'critical',
    requiredBy: 'Today, 06:00 PM',
    contactPerson: 'Amit Patil',
    status: 'open',
    postedAt: '1h ago',
  },
  {
    id: 'req-2',
    patient: 'Kavita Sharma',
    bloodGroup: 'A+',
    units: 1,
    hospital: 'Jehangir Hospital',
    location: 'Sassoon Road, Pune',
    urgency: 'urgent',
    requiredBy: 'Tomorrow, 10:00 AM',
    contactPerson: 'Rahul Sharma',
    status: 'open',
    postedAt: '3h ago',
  },
  {
    id: 'req-3',
    patient: 'Aarav Desai',
    bloodGroup: 'B+',
    units: 2,
    hospital: 'Sahyadri Super Speciality',
    location: 'Deccan Gymkhana, Pune',
    urgency: 'critical',
    requiredBy: 'Today, 09:00 PM',
    contactPerson: 'Blood Bank',
    status: 'open',
    postedAt: '4h ago',
  },
  {
    id: 'req-4',
    patient: 'Meera Iyer',
    bloodGroup: 'AB-',
    units: 1,
    hospital: 'Aditya Birla Memorial',
    location: 'Thergaon, Pune',
    urgency: 'moderate',
    requiredBy: 'Aug 20, 12:00 PM',
    contactPerson: 'Nitin Iyer',
    status: 'fulfilled',
    postedAt: '1d ago',
  },
];

const urgencyStyles: Record<string, string> = {
  critical: 'bg-destructive/15 text-destructive border-destructive/30',
  urgent: 'bg-warning/15 text-warning border-warning/30',
  moderate: 'bg-primary/15 text-primary border-primary/30',
};

const urgencyLevels = { critical: 1, urgent: 2, moderate: 3 };

export default function BloodRequestsPage() {
  const { toast } = useToast();
  const [filter, setFilter] = useState<'all' | 'critical'>('all');

  const sortedRequests = useMemo(() => {
    let reqs = [...REQUESTS];
    if (filter === 'critical') {
      reqs = reqs.filter(r => r.urgency === 'critical');
    }
    // Sort by status (open first), then urgency
    return reqs.sort((a, b) => {
      if (a.status === 'fulfilled' && b.status !== 'fulfilled') return 1;
      if (a.status !== 'fulfilled' && b.status === 'fulfilled') return -1;
      return urgencyLevels[a.urgency as keyof typeof urgencyLevels] - urgencyLevels[b.urgency as keyof typeof urgencyLevels];
    });
  }, [filter]);

  const handleRespond = (id: string, group: string) => {
    toast({
      title: 'Response Registered',
      description: `Thank you for volunteering to donate ${group} blood. The coordinator has been notified.`,
    });
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl flex items-center gap-2">
            <Droplet className="h-6 w-6 text-destructive fill-destructive" />
            Urgent Blood Requests
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Real-time emergency blood requirements in your city.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('all')}
          >
            All Requests
          </Button>
          <Button 
            variant={filter === 'critical' ? 'destructive' : 'outline'} 
            size="sm"
            onClick={() => setFilter('critical')}
          >
            Critical Only
          </Button>
        </div>
      </motion.div>

      {/* List */}
      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {sortedRequests.map((req, i) => {
            const isFulfilled = req.status === 'fulfilled';
            return (
              <motion.div
                key={req.id}
                layout
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Card className={cn(
                  "overflow-hidden border-border/50 transition-all",
                  isFulfilled ? "opacity-60 bg-muted/30" : "hover:shadow-md glass-card",
                  req.urgency === 'critical' && !isFulfilled && "border-destructive/30 shadow-destructive/5"
                )}>
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      {/* Left: Blood Group Badge */}
                      <div className={cn(
                        "flex sm:w-32 flex-col items-center justify-center p-6 border-b sm:border-b-0 sm:border-r border-border/50",
                        isFulfilled ? "bg-muted" : "bg-destructive/5"
                      )}>
                        <div className={cn(
                          "flex h-16 w-16 items-center justify-center rounded-2xl shadow-inner",
                          isFulfilled ? "bg-muted-foreground/20 text-muted-foreground" : "bg-destructive text-white"
                        )}>
                          <span className="text-2xl font-bold font-mono tracking-tighter">{req.bloodGroup}</span>
                        </div>
                        <span className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {req.units} Unit{req.units > 1 ? 's' : ''}
                        </span>
                      </div>

                      {/* Right: Details */}
                      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-lg font-bold">{req.patient}</h3>
                              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1 text-foreground/80">
                                  <MapPin className="h-3.5 w-3.5" /> {req.hospital}
                                </span>
                                <span>·</span>
                                <span>{req.location}</span>
                              </div>
                            </div>
                            <div className="flex shrink-0 flex-col items-end gap-2">
                              {isFulfilled ? (
                                <Badge variant="secondary" className="bg-success/15 text-success border-success/30">
                                  <CheckCircle2 className="mr-1 h-3 w-3" /> Fulfilled
                                </Badge>
                              ) : (
                                <Badge variant="outline" className={cn('capitalize', urgencyStyles[req.urgency])}>
                                  {req.urgency === 'critical' && <AlertTriangle className="mr-1 h-3 w-3" />}
                                  {req.urgency}
                                </Badge>
                              )}
                              <span className="text-xs text-muted-foreground">{req.postedAt}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4 text-sm font-medium">
                            <div className="flex items-center gap-1.5 text-warning">
                              <Clock className="h-4 w-4" />
                              Req: {req.requiredBy}
                            </div>
                          </div>
                          
                          <div className="shrink-0 flex items-center gap-3">
                            {!isFulfilled && (
                              <>
                                <Button variant="outline" className="gap-2 bg-card">
                                  <Phone className="h-4 w-4 text-muted-foreground" />
                                  Contact
                                </Button>
                                <Button className="gap-2 shadow-lg shadow-destructive/20" variant="destructive" onClick={() => handleRespond(req.id, req.bloodGroup)}>
                                  <Droplet className="h-4 w-4 fill-current" />
                                  Respond
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {sortedRequests.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No blood requests match your filter.
          </div>
        )}
      </div>
    </div>
  );
}