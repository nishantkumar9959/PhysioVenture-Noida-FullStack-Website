"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an external analytics or telemetry service in production
    console.error("ErrorBoundary caught error:", error);
  }, [error]);

  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center px-4 py-12 text-left">
      <div className="w-full max-w-xl bg-card border border-border/80 shadow-md rounded-3xl p-6 sm:p-8 flex flex-col gap-6 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

        {/* Warning Icon & Header */}
        <div className="flex gap-4 items-start border-b border-border/40 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-2xl text-primary tracking-tight">
              Rehabilitation Session Interrupted
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              We encountered a temporary connection glitch while loading this section.
            </p>
          </div>
        </div>

        {/* Error Detail (Safe block for debug context) */}
        <div className="bg-secondary/40 rounded-2xl p-4 border border-border/50">
          <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Diagnosis info</p>
          <p className="text-xs font-mono text-muted-foreground break-all">
            {error.message || "An unexpected application error occurred."}
          </p>
          {error.digest && (
            <p className="text-[10px] font-mono text-muted-foreground/60 mt-1">
              Digest ID: {error.digest}
            </p>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {/* Graceful Retry Mechanism */}
          <Button
            variant="primary"
            onClick={() => reset()}
            className="flex items-center gap-2 justify-center"
          >
            <RefreshCw className="w-4 h-4" /> Retry Loading Page
          </Button>

          {/* Quick Home fallback */}
          <Button variant="outline" asChild>
            <Link href="/" className="flex items-center gap-2 justify-center">
              <Home className="w-4 h-4" /> Return to Home
            </Link>
          </Button>
        </div>

        {/* WhatsApp & Call backup details */}
        <div className="border-t border-border/40 pt-4 text-xs text-muted-foreground flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <span>Need immediate assistance booking?</span>
          <a
            href="tel:+918932082549"
            className="inline-flex items-center gap-1.5 text-accent hover:underline font-semibold"
          >
            <Phone className="w-3.5 h-3.5" /> Call Clinic Support
          </a>
        </div>
      </div>
    </div>
  );
}
