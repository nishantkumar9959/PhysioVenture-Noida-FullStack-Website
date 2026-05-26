"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw, Phone } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("GlobalError caught critical layout crash:", error);
  }, [error]);

  return (
    <html lang="en-IN">
      <head>
        <title>Critical Error | PhysioVenture Noida</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{
        margin: 0,
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: "hsl(160 15% 98%)",
        color: "hsl(160 84% 8%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px"
      }}>
        <div style={{
          backgroundColor: "#ffffff",
          border: "1px solid hsl(160 15% 88%)",
          borderRadius: "24px",
          padding: "32px",
          width: "100%",
          maxWidth: "480px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
          textAlign: "left"
        }}>
          {/* Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            borderBottom: "1px solid hsl(160 15% 88%)",
            paddingBottom: "16px",
            marginBottom: "20px"
          }}>
            <div style={{
              backgroundColor: "rgba(220, 38, 38, 0.1)",
              color: "#dc2626",
              borderRadius: "16px",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <AlertCircle style={{ width: "24px", height: "24px" }} />
            </div>
            <div>
              <h1 style={{
                margin: 0,
                fontSize: "20px",
                fontWeight: 800,
                color: "hsl(160 84% 12%)"
              }}>
                System Crash Caught
              </h1>
              <p style={{
                margin: "4px 0 0 0",
                fontSize: "12px",
                color: "hsl(160 20% 40%)"
              }}>
                A critical system layout error has occurred.
              </p>
            </div>
          </div>

          {/* Details */}
          <div style={{
            backgroundColor: "hsl(160 20% 92%)",
            padding: "16px",
            borderRadius: "16px",
            border: "1px solid hsl(160 15% 88%)",
            marginBottom: "24px"
          }}>
            <p style={{
              margin: 0,
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "hsl(160 84% 12%)"
            }}>
              Diagnostics log
            </p>
            <p style={{
              margin: "6px 0 0 0",
              fontFamily: "monospace",
              fontSize: "11px",
              color: "hsl(160 20% 40%)",
              wordBreak: "break-all"
            }}>
              {error?.message || "Critical layout rendering fail."}
            </p>
          </div>

          {/* Action Trigger */}
          <button
            onClick={() => reset()}
            style={{
              width: "100%",
              height: "44px",
              backgroundColor: "hsl(160 84% 12%)",
              color: "#ffffff",
              border: "none",
              borderRadius: "9999px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "opacity 0.2s"
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <RefreshCw style={{ width: "16px", height: "16px" }} />
            Force Re-initialize System
          </button>

          {/* Fallback support contact */}
          <div style={{
            borderTop: "1px solid hsl(160 15% 88%)",
            marginTop: "24px",
            paddingTop: "16px",
            fontSize: "12px",
            color: "hsl(160 20% 40%)",
            display: "flex",
            justifyContent: "between",
            alignItems: "center"
          }}>
            <span>Please contact clinic support:</span>
            <a
              href="tel:+918932082549"
              style={{
                color: "hsl(160 60% 45%)",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                marginLeft: "auto"
              }}
            >
              <Phone style={{ width: "14px", height: "14px" }} /> Call Clinic
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
