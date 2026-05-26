import { Activity } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center px-4 py-12">
      {/* Branded Loading Spinner */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-secondary/80 text-primary border border-border shadow-xs">
          <Activity className="w-8 h-8 text-accent animate-pulse" />
          <span className="absolute inset-0 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
        </div>
        <div>
          <h2 className="font-display font-extrabold text-lg text-primary tracking-tight">
            Physio<span className="text-accent">Venture</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-1">Preparing your clinical space...</p>
        </div>
      </div>

      {/* Skeleton Content slots for layout consistency */}
      <div className="w-full max-w-3xl mt-12 space-y-6 animate-pulse" aria-hidden="true">
        <div className="h-6 w-1/3 bg-muted rounded-md" />
        <div className="h-32 bg-muted/60 rounded-2xl border border-border/40" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-40 bg-muted/40 rounded-xl border border-border/40" />
          <div className="h-40 bg-muted/40 rounded-xl border border-border/40" />
          <div className="h-40 bg-muted/40 rounded-xl border border-border/40" />
        </div>
      </div>
    </div>
  );
}
