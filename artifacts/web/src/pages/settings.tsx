import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/theme-provider';
import { useToast } from '@/hooks/use-toast';
import { 
  Bell, 
  Shield, 
  Moon, 
  Sun, 
  Monitor, 
  Smartphone, 
  Mail, 
  Lock, 
  Eye, 
  Globe,
  Save,
  Check,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  // Local state for toggles
  const [settings, setSettings] = useState({
    emailNotifs: true,
    pushNotifs: true,
    smsNotifs: false,
    publicProfile: true,
    showLocation: true,
    twoFactor: false,
    language: 'en',
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: 'Settings Saved',
        description: 'Your preferences have been updated successfully.',
      });
    }, 600);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account preferences, notifications, and privacy.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Sidebar (Desktop) */}
        <motion.div 
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="md:col-span-1 hidden md:flex flex-col gap-1 sticky top-24 h-fit"
        >
          <Button variant="secondary" className="justify-start">
            <Bell className="mr-2 h-4 w-4" /> Notifications
          </Button>
          <Button variant="ghost" className="justify-start">
            <Shield className="mr-2 h-4 w-4" /> Privacy & Security
          </Button>
          <Button variant="ghost" className="justify-start">
            <Monitor className="mr-2 h-4 w-4" /> Appearance
          </Button>
          <Button variant="ghost" className="justify-start">
            <Globe className="mr-2 h-4 w-4" /> Language
          </Button>
        </motion.div>

        {/* Content Area */}
        <div className="md:col-span-3 space-y-6">
          
          {/* Appearance Section */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-primary" />
                  <CardTitle>Appearance</CardTitle>
                </div>
                <CardDescription>Customize how JanConnect looks on your device.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex flex-col items-center justify-center rounded-xl border-2 p-4 transition-all hover:bg-accent/50 ${theme === 'light' ? 'border-primary bg-primary/5 shadow-sm' : 'border-border bg-card'}`}
                  >
                    <Sun className={`h-8 w-8 mb-2 ${theme === 'light' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="text-sm font-medium">Light</span>
                  </button>
                  
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex flex-col items-center justify-center rounded-xl border-2 p-4 transition-all hover:bg-accent/50 ${theme === 'dark' ? 'border-primary bg-primary/5 shadow-sm' : 'border-border bg-card'}`}
                  >
                    <Moon className={`h-8 w-8 mb-2 ${theme === 'dark' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="text-sm font-medium">Dark</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications Section */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <CardTitle>Notifications</CardTitle>
                </div>
                <CardDescription>Choose how you want to be updated about community activities.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive daily summaries and urgent alerts via email.</p>
                  </div>
                  <Switch checked={settings.emailNotifs} onCheckedChange={() => handleToggle('emailNotifs')} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get real-time updates in your browser or device.</p>
                  </div>
                  <Switch checked={settings.pushNotifs} onCheckedChange={() => handleToggle('pushNotifs')} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">SMS Alerts</Label>
                    <p className="text-sm text-muted-foreground">Only for critical emergency and blood requests.</p>
                  </div>
                  <Switch checked={settings.smsNotifs} onCheckedChange={() => handleToggle('smsNotifs')} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Privacy & Security Section */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle>Privacy & Security</CardTitle>
                </div>
                <CardDescription>Manage your data visibility and account protection.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base flex items-center gap-2"><Eye className="h-4 w-4" /> Public Profile</Label>
                    <p className="text-sm text-muted-foreground">Allow other community members to see your profile.</p>
                  </div>
                  <Switch checked={settings.publicProfile} onCheckedChange={() => handleToggle('publicProfile')} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base flex items-center gap-2"><MapPin className="h-4 w-4" /> Show Location</Label>
                    <p className="text-sm text-muted-foreground">Share your general area (Ward/Sector) on your profile.</p>
                  </div>
                  <Switch checked={settings.showLocation} onCheckedChange={() => handleToggle('showLocation')} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base flex items-center gap-2"><Lock className="h-4 w-4 text-warning" /> Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                  </div>
                  <Switch checked={settings.twoFactor} onCheckedChange={() => handleToggle('twoFactor')} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Language & Region */}
          <motion.div
             initial={{ opacity: 0, y: 16 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <CardTitle>Language & Region</CardTitle>
                </div>
                <CardDescription>Set your preferred language for the interface.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={settings.language} onValueChange={(val) => setSettings(p => ({...p, language: val}))}>
                    <SelectTrigger className="w-full sm:w-[240px]">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English (US)</SelectItem>
                      <SelectItem value="hi">Hindi (हिंदी)</SelectItem>
                      <SelectItem value="mr">Marathi (मराठी)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 border-t border-border/50 py-4 flex justify-end">
                <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                  {isSaving ? <span className="animate-spin text-lg">⟳</span> : <Save className="h-4 w-4" />}
                  {isSaving ? 'Saving...' : 'Save All Preferences'}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  );
}