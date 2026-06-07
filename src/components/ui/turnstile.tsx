"use client";

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import Script from "next/script";
import { Shield, Check } from "lucide-react";

interface TurnstileProps {
  onSuccess: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  theme?: "light" | "dark" | "auto";
}

export interface TurnstileInstance {
  reset: () => void;
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
  }
}

export const Turnstile = forwardRef<TurnstileInstance, TurnstileProps>(({
  onSuccess,
  onExpire,
  onError,
  theme = "auto"
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  
  const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY;
  const isPlaceholder = !siteKey || siteKey === "PLACEHOLDER_SITE_KEY";
  const isProduction = process.env.NODE_ENV === "production";
  const showConfigError = isPlaceholder && isProduction;

  const [scriptReady, setScriptReady] = useState(false);
  const [scriptFailed, setScriptFailed] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(!isProduction && isPlaceholder);
  const [demoVerified, setDemoVerified] = useState(false);
  const [demoVerifying, setDemoVerifying] = useState(false);

  // Keep references to the latest callbacks to avoid triggering the useEffect dependency array
  const onSuccessRef = useRef(onSuccess);
  const onExpireRef = useRef(onExpire);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onExpireRef.current = onExpire;
    onErrorRef.current = onError;
  });

  useEffect(() => {
    if (isProduction) {
      setIsDemoMode(false);
    } else {
      setIsDemoMode(isPlaceholder || scriptFailed);
    }
  }, [isPlaceholder, scriptFailed, isProduction]);

  useEffect(() => {
    if (!isPlaceholder && window.turnstile) {
      setScriptReady(true);
    }
  }, [isPlaceholder]);

  // Expose the reset function to parent components imperatively
  useImperativeHandle(ref, () => ({
    reset: () => {
      if (isDemoMode) {
        setDemoVerified(false);
        setDemoVerifying(false);
      } else if (window.turnstile) {
        try {
          if (widgetIdRef.current) {
            window.turnstile.reset(widgetIdRef.current);
          } else {
            window.turnstile.reset();
          }
        } catch (e) {
          console.error("Failed to reset Turnstile widget:", e);
        }
      }
    }
  }), [isDemoMode]);

  useEffect(() => {
    if (isPlaceholder || !scriptReady || !containerRef.current || !window.turnstile) {
      return;
    }

    const currentRef = containerRef.current;

    try {
      if (widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
      currentRef.innerHTML = "";

      widgetIdRef.current = window.turnstile.render(currentRef, {
        sitekey: siteKey || "",
        callback: (token) => {
          onSuccessRef.current(token);
        },
        "expired-callback": () => {
          if (onExpireRef.current) onExpireRef.current();
        },
        "error-callback": () => {
          if (onErrorRef.current) onErrorRef.current();
        },
        theme,
        size: "normal"
      });
    } catch (e) {
      console.error("Turnstile render error:", e);
      setScriptFailed(true);
    }

    return () => {
      if (window.turnstile && widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        } catch {
          // Ignore removal errors on unmount
        }
      }
    };
  }, [siteKey, isPlaceholder, scriptReady, theme]);

  // Handle human verification click in Demo Mode
  const handleDemoVerify = () => {
    if (demoVerified || demoVerifying) return;
    setDemoVerifying(true);
    
    // Simulate a brief verification latency (700ms)
    setTimeout(() => {
      setDemoVerifying(false);
      setDemoVerified(true);
      onSuccessRef.current("mock-turnstile-token");
    }, 700);
  };

  if (showConfigError || (isProduction && (scriptFailed || isDemoMode))) {
    // Log the configuration error to the console for developer troubleshooting
    if (showConfigError) {
      console.error(
        "Turnstile Configuration Error: NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY is missing in this build. " +
        "Please add it to your Cloudflare Pages build environment and redeploy."
      );
    }

    return (
      <div
        className="w-full max-w-[320px] min-h-[65px] rounded-2xl border border-secondary/80 bg-secondary/35 px-4 py-3 mx-auto text-center flex flex-col items-center justify-center gap-1.5"
        style={{ contentVisibility: "auto" }}
      >
        <div className="flex items-center gap-1.5 text-primary">
          <Shield className="w-4 h-4 text-accent" />
          <span className="text-[11px] font-bold tracking-wide">Security Check Unavailable</span>
        </div>
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          Please contact us directly at <span className="font-semibold text-primary">+91 89320 82549</span> via Call or WhatsApp to request an appointment.
        </p>
      </div>
    );
  }

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
    <>
      <Script
        id="cloudflare-turnstile-script"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
        onError={() => {
          console.error("Failed to load Cloudflare Turnstile script.");
          setScriptFailed(true);
        }}
      />
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
    </>
  );
});

Turnstile.displayName = "Turnstile";
