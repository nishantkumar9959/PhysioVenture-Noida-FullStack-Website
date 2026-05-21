import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, rows = 4, id, ...props }, ref) => {
    const textareaId = id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-xs font-semibold tracking-wider uppercase text-muted-foreground ml-1">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          rows={rows}
          className={cn(
            "flex w-full rounded-xl border border-border bg-card/60 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:border-transparent transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 resize-y min-h-[80px]",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <span className="text-xs text-destructive font-medium ml-1">
            {error}
          </span>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
