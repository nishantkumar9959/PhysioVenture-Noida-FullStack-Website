"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Turnstile, type TurnstileInstance } from "@/components/ui/turnstile";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      turnstileToken: ""
    }
  });

  const onSubmit = async (data: ContactInput) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit message");
      }

      setSubmitSuccess(true);
      reset();
      turnstileRef.current?.reset();
    } catch (err) {
      console.error("Contact error:", err);
      setSubmitError("Something went wrong while sending your inquiry. Please try again or contact us via WhatsApp.");
      setValue("turnstileToken", "");
      turnstileRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-left">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto flex flex-col gap-3 items-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-primary/10 w-fit">
          <MessageSquare className="w-4 h-4 text-accent" />
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Get In Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-primary tracking-tight">
          Contact Us
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Have general questions about our physical therapy programs or need to inquire about a home visit session? Drop us a line and we'll get back to you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Info Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Contact Details */}
          <div className="bg-secondary/30 rounded-3xl p-6 md:p-8 border border-border/50">
            <h3 className="font-display font-extrabold text-lg text-primary mb-6">Contact Info</h3>

            <div className="space-y-6">
              {/* Service Area */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-accent flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Service Area</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    All sectors in Noida, Greater Noida, and nearby regions.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-accent flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Phone & WhatsApp</h4>
                  <p className="text-xs text-muted-foreground mt-1 font-semibold text-primary">
                    +91 89320 82549
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">Available for calls Mon - Sat (8AM - 8PM)</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-accent flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Email Inquiry</h4>
                  <p className="text-xs text-muted-foreground mt-1 font-semibold text-primary">
                    info@physioventure.in
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-accent flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Operating Hours</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Monday - Saturday: 8:00 AM - 8:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Notice */}
          <div className="bg-primary text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-accent/20 blur-2xl" />
            <h4 className="font-display font-extrabold text-sm uppercase tracking-wider text-accent mb-2">Home Rehabilitation Notice</h4>
            <p className="text-xs text-primary-foreground/95 leading-relaxed">
              Dr. Rohit Verma primarily provides physically-distanced home rehabilitation assessments. If scheduling a clinic visit, please book at least 24 hours in advance.
            </p>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Inquiry Form */}
          <div className="bg-card border border-border shadow-xs rounded-3xl p-6 sm:p-8">
            {submitSuccess ? (
              <div className="text-center flex flex-col items-center gap-4 py-8">
                <div className="w-12 h-12 rounded-full bg-secondary text-accent flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-extrabold text-primary">Message Sent Successfully</h3>
                <p className="text-muted-foreground text-xs max-w-sm">
                  Thank you for writing to us. We will review your message details and Dr. Rohit Verma will get back to you shortly.
                </p>
                <Button variant="outline" className="mt-4" onClick={() => setSubmitSuccess(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form
                // eslint-disable-next-line react-hooks/refs
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >
                <h3 className="font-display font-extrabold text-base text-primary mb-2">Send Us an Inquiry</h3>

                {submitError && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-xl p-4 flex gap-3 items-center">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-xs font-semibold">{submitError}</span>
                  </div>
                )}

                {/* Name */}
                <Input
                  label="Your Name"
                  placeholder="e.g. Vikram Mehta"
                  error={errors.name?.message}
                  {...register("name")}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="e.g. name@example.com"
                    error={errors.email?.message}
                    {...register("email")}
                  />

                  {/* Phone */}
                  <Input
                    label="Phone Number"
                    placeholder="e.g. 9876543210"
                    error={errors.phone?.message}
                    {...register("phone")}
                  />
                </div>

                {/* Message */}
                <Textarea
                  label="Your Message"
                  placeholder="Tell us about the physical symptoms, rehabilitation goals, or details you want to inquire about..."
                  error={errors.message?.message}
                  {...register("message")}
                />

                {/* Security Check */}
                <div className="flex flex-col gap-1.5 my-2">
                  <Turnstile
                    ref={turnstileRef}
                    onSuccess={(token) => setValue("turnstileToken", token, { shouldValidate: true })}
                    onExpire={() => setValue("turnstileToken", "")}
                    onError={() => setValue("turnstileToken", "")}
                  />
                  {errors.turnstileToken && (
                    <span className="text-xs text-destructive font-semibold text-center mt-1">
                      {errors.turnstileToken.message}
                    </span>
                  )}
                </div>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-full mt-2"
                  isLoading={isSubmitting}
                >
                  Send Inquiry Message
                </Button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
