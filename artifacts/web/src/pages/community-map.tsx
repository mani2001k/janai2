import { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter,
  MapPin,
  ThumbsUp,
  AlertTriangle,
} from 'lucide-react';
import {
  mapMarkers,
  categoryConfig,
  type MapMarker,
  type MarkerCategory,
} from '@/lib/map-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

/* ---------- Custom marker icons ---------- */

function createDivIcon(category: MarkerCategory, status: MapMarker['status']) {
  const cfg = categoryConfig[category];
  const ringColor =
    status === 'resolved'
      ? '#22c55e'
      : status === 'in-progress'
        ? '#f59e0b'
        : cfg.color;
  return L.divIcon({
    className: 'community-marker',
    html: `<div style="position:relative;width:36px;height:36px;">
      <div style="
        width:32px;height:32px;border-radius:50% 50% 50% 0;
        background:${cfg.color};transform:rotate(-45deg);
        border:2px solid ${ringColor};
        box-shadow:0 2px 8px rgba(0,0,0,0.25);
        display:flex;align-items:center;justify-content:center;
      ">
        <span style="transform:rotate(45deg);font-size:14px;">${cfg.icon}</span>
      </div>
      ${status === 'resolved' ? '<div style="position:absolute;top:-2px;right:-2px;width:14px;height:14px;border-radius:50%;background:#22c55e;border:2px solid white;display:flex;align-items:center;justify-content:center;"><svg width=\"8\" height=\"8\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"white\" stroke-width=\"4\"><path d=\"M5 13l4 4L19 7\"/></svg></div>' : ''}
    </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -32],
  });
}

/* ---------- Fly-to controller ---------- */

function FlyToController({ target }: { target: { lat: number; lng: number } | null }) {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo([target.lat, target.lng], 15, { duration: 1.2 });
    }
  }, [target, map]);
  return null;
}

/* ---------- Status helpers ---------- */

const statusStyles: Record<string, string> = {
  open: 'bg-muted text-muted-foreground',
  'in-progress': 'bg-warning/15 text-warning',
  resolved: 'bg-success/15 text-success',
};

const priorityStyles: Record<string, string> = {
  high: 'bg-destructive/15 text-destructive',
  medium: 'bg-warning/15 text-warning',
  low: 'bg-muted text-muted-foreground',
};

const allCategories = Object.keys(categoryConfig) as MarkerCategory[];

/* ---------- Component ---------- */

export default function CommunityMapPage() {
  const [activeCategories, setActiveCategories] = useState<Set<MarkerCategory>>(
    new Set(allCategories)
  );
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [flyTarget, setFlyTarget] = useState<{ lat: number; lng: number } | null>(null);

  const toggleCategory = (cat: MarkerCategory) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const selectAll = () => setActiveCategories(new Set(allCategories));
  const clearAll = () => setActiveCategories(new Set());

  const visibleMarkers = useMemo(
    () => mapMarkers.filter((m) => activeCategories.has(m.category)),
    [activeCategories]
  );

  const handleListItemClick = (marker: MapMarker) => {
    setSelectedMarker(marker);
    setFlyTarget({ lat: marker.lat, lng: marker.lng });
  };

  const stats = useMemo(() => {
    const open = visibleMarkers.filter((m) => m.status === 'open').length;
    const inProgress = visibleMarkers.filter((m) => m.status === 'in-progress').length;
    const resolved = visibleMarkers.filter((m) => m.status === 'resolved').length;
    return { total: visibleMarkers.length, open, inProgress, resolved };
  }, [visibleMarkers]);

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Community Map</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Explore issues, resources, and volunteer activity near you.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-card px-3 py-1.5 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-muted-foreground" /> {stats.open} open
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-warning" /> {stats.inProgress} active
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-success" /> {stats.resolved} resolved
            </span>
          </div>
        </div>
      </motion.div>

      {/* Filter bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="flex flex-col gap-3 rounded-xl border border-border/50 bg-card p-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filters</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {allCategories.map((cat) => {
            const cfg = categoryConfig[cat];
            const active = activeCategories.has(cat);
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={cn(
                  'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all',
                  active
                    ? 'border-transparent text-white shadow-sm'
                    : 'border-border text-muted-foreground hover:border-foreground/30'
                )}
                style={active ? { backgroundColor: cfg.color } : undefined}
              >
                <span>{cfg.icon}</span>
                {cfg.label}
              </button>
            );
          })}
          <div className="ml-1 flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={selectAll} className="h-7 px-2 text-xs">
              All
            </Button>
            <Button variant="ghost" size="sm" onClick={clearAll} className="h-7 px-2 text-xs">
              None
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Map + sidebar layout */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="relative h-[500px] overflow-hidden rounded-2xl border border-border/50 shadow-lg sm:h-[600px]">
            <MapContainer
              center={[18.5204, 73.8567]}
              zoom={13}
              scrollWheelZoom
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {visibleMarkers.map((marker) => (
                <Marker
                  key={marker.id}
                  position={[marker.lat, marker.lng]}
                  icon={createDivIcon(marker.category, marker.status)}
                  eventHandlers={{
                    click: () => setSelectedMarker(marker),
                  }}
                >
                  <Popup>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <span>{categoryConfig[marker.category].icon}</span>
                        <span className="font-semibold text-sm">{marker.title}</span>
                      </div>
                      <p className="text-xs text-gray-500">{marker.description}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-medium">{marker.reportedBy}</span>
                        <span className="text-gray-400">·</span>
                        <span>{marker.time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <ThumbsUp className="h-3 w-3" /> {marker.upvotes} upvotes
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
              <FlyToController target={flyTarget} />
            </MapContainer>

            {/* Map overlay legend */}
            <div className="pointer-events-none absolute bottom-4 left-4 z-[1000] rounded-lg border border-border/50 bg-background/90 p-3 shadow-lg backdrop-blur-md">
              <p className="mb-2 text-xs font-semibold text-muted-foreground">Legend</p>
              <div className="space-y-1">
                {allCategories.map((cat) => {
                  const cfg = categoryConfig[cat];
                  return (
                    <div key={cat} className="flex items-center gap-2 text-xs">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: cfg.color }}
                      />
                      <span>{cfg.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Marker list sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">
              {visibleMarkers.length} marker{visibleMarkers.length !== 1 ? 's' : ''}
            </p>
            <Button variant="ghost" size="sm" className="text-xs">
              <MapPin className="mr-1.5 h-3.5 w-3.5" /> Reset view
            </Button>
          </div>

          <div className="no-scrollbar max-h-[540px] space-y-2 overflow-y-auto pr-1 sm:max-h-[640px]">
            <AnimatePresence mode="popLayout">
              {visibleMarkers.map((marker) => {
                const cfg = categoryConfig[marker.category];
                const isSelected = selectedMarker?.id === marker.id;
                return (
                  <motion.div
                    key={marker.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      className={cn(
                        'cursor-pointer border-border/50 transition-all hover:shadow-md',
                        isSelected && 'border-primary ring-1 ring-primary/30'
                      )}
                      onClick={() => handleListItemClick(marker)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start gap-2.5">
                          <div
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm"
                            style={{ backgroundColor: `${cfg.color}20` }}
                          >
                            {cfg.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">{marker.title}</p>
                            <p className="mt-0.5 truncate text-xs text-muted-foreground">
                              {marker.reportedBy} · {marker.time}
                            </p>
                            <div className="mt-2 flex flex-wrap items-center gap-1.5">
                              <Badge
                                variant="secondary"
                                className={cn('h-5 capitalize', statusStyles[marker.status])}
                              >
                                {marker.status.replace('-', ' ')}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={cn('h-5 capitalize', priorityStyles[marker.priority])}
                              >
                                {marker.priority}
                              </Badge>
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <ThumbsUp className="h-3 w-3" /> {marker.upvotes}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {visibleMarkers.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border py-12 text-center">
                <AlertTriangle className="h-6 w-6 text-muted-foreground" />
                <p className="text-sm font-medium">No markers match your filters</p>
                <p className="text-xs text-muted-foreground">Try enabling more categories.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
