"use client";

import { useEffect, useRef, useState } from "react";
import { Shield, Check } from "lucide-react";

interface TurnstileProps {
  onSuccess: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  theme?: "light" | "dark" | "auto";
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact";
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string | HTMLElement) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

export function Turnstile({
  onSuccess,
  onExpire,
  onError,
  theme = "auto"
}: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY;
  const isPlaceholder = !siteKey || siteKey === "PLACEHOLDER_SITE_KEY";

  const [isDemoMode, setIsDemoMode] = useState(isPlaceholder);
  const [demoVerified, setDemoVerified] = useState(false);
  const [demoVerifying, setDemoVerifying] = useState(false);

  useEffect(() => {
    if (isPlaceholder) {
      return;
    }

    let script = document.getElementById("cloudflare-turnstile-script") as HTMLScriptElement | null;
    let widgetId: string | null = null;
    const currentRef = containerRef.current;

    const initializeTurnstile = () => {
      if (currentRef && window.turnstile) {
        try {
          widgetId = window.turnstile.render(currentRef, {
            sitekey: siteKey || "",
            callback: (token) => {
              onSuccess(token);
            },
            "expired-callback": () => {
              if (onExpire) onExpire();
            },
            "error-callback": () => {
              if (onError) onError();
            },
            theme: theme,
            size: "normal"
          });
        } catch (e) {
          console.error("Turnstile render error:", e);
          setIsDemoMode(true);
        }
      }
    };

    if (!script) {
      script = document.createElement("script");
      script.id = "cloudflare-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = initializeTurnstile;
    } else {
      if (window.turnstile) {
        initializeTurnstile();
      } else {
        script.addEventListener("load", initializeTurnstile);
      }
    }

    return () => {
      if (currentRef && window.turnstile && widgetId) {
        try {
          window.turnstile.remove(widgetId);
        } catch {
          // Ignore removal errors on unmount
        }
      }
    };
  }, [siteKey, isPlaceholder, onSuccess, onExpire, onError, theme]);

  // Handle human verification click in Demo Mode
  const handleDemoVerify = () => {
    if (demoVerified || demoVerifying) return;
    setDemoVerifying(true);
    
    // Simulate a brief verification latency (700ms)
    setTimeout(() => {
      setDemoVerifying(false);
      setDemoVerified(true);
      onSuccess("mock-turnstile-token");
    }, 700);
  };

  // 1. Premium Glassmorphic Demo Verification Box (Fallback)
  if (isDemoMode) {
    return (
      <div 
        className="w-full max-w-[300px] h-[65px] bg-secondary/30 dark:bg-card/40 border border-border/50 rounded-2xl px-4 flex items-center justify-between transition-all duration-300 shadow-xs backdrop-blur-xs select-none mx-auto"
        style={{ contentVisibility: "auto" }}
      >
        <button
          type="button"
          onClick={handleDemoVerify}
          className={`flex items-center gap-3 text-left transition-all duration-200 cursor-pointer ${
            demoVerified ? "pointer-events-none" : "hover:opacity-85"
          }`}
        >
          <div 
            className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all duration-300 ${
              demoVerified 
                ? "bg-accent border-accent text-white" 
                : "border-muted-foreground/30 bg-card"
            }`}
          >
            {demoVerifying && (
              <svg className="animate-spin h-3.5 w-3.5 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {demoVerified && <Check className="w-4 h-4 stroke-[3]" />}
          </div>
          <div>
            <p className="text-[11px] font-bold text-primary tracking-wide">
              {demoVerified ? "Verification Successful" : demoVerifying ? "Verifying..." : "Verify you are human"}
            </p>
            <p className="text-[9px] text-muted-foreground">Demo Mode Security Check</p>
          </div>
        </button>

        <div className="flex flex-col items-end opacity-60">
          <Shield className="w-5 h-5 text-accent" />
          <span className="text-[8px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">Turnstile</span>
        </div>
      </div>
    );
  }

  // 2. Real Cloudflare Turnstile Container with CLS protection (Fixed size)
  return (
    <div 
      className="w-full max-w-[300px] min-h-[65px] h-[65px] flex items-center justify-center mx-auto" 
      style={{ contentVisibility: "auto" }}
    >
      <div 
        ref={containerRef} 
        className="turnstile-widget" 
        data-size="normal"
      />
    </div>
  );
}
