"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Clock, Phone, AlertCircle, CheckCircle2, Sparkles, MapPin } from "lucide-react";
import { appointmentSchema, type AppointmentInput } from "@/lib/validation";
import { SERVICES_DATA } from "@/lib/services-data";
import { ServiceCombobox } from "@/components/service-combobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Turnstile, type TurnstileInstance } from "@/components/ui/turnstile";

export default function Book() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset
  } = useForm<AppointmentInput>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patient_name: "",
      email: "",
      phone: "",
      service_id: "",
      preferred_date: "",
      preferred_time_slot: "morning",
      additional_notes: "",
      turnstileToken: ""
    }
  });

  // Set default service selection
  useEffect(() => {
    if (SERVICES_DATA && SERVICES_DATA.length > 0) {
      setValue("service_id", SERVICES_DATA[0].slug);
    }
  }, [setValue]);

  const onSubmit = async (data: AppointmentInput) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to schedule appointment");
      }

      setSubmitSuccess(true);
      reset();
      turnstileRef.current?.reset();
    } catch (err) {
      console.error("Booking error:", err);
      setSubmitError("Something went wrong while booking. Please try again or contact us via WhatsApp.");
      setValue("turnstileToken", "");
      turnstileRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto flex flex-col gap-3 items-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 w-fit">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Biomechanical Evaluation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-primary tracking-tight">
          Schedule Your Consultation
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Book an expert home visit or clinic consultation. Fill out the details below, and Dr. Rohit Verma will reach out to confirm your session.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Info Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-secondary/40 rounded-2xl p-6 border border-border/50 text-left">
            <h3 className="font-display font-extrabold text-base text-primary mb-3">Rehab Booking Info</h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Service Area</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">All sectors in Noida, Greater Noida, and nearby regions.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Timings</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Monday to Saturday<br />8:00 AM - 8:00 PM</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Quick Support</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Need instant booking? Call or WhatsApp us at <span className="font-semibold text-primary">+91 89320 82549</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary text-white rounded-2xl p-6 shadow-md text-left relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-accent/20 blur-2xl" />
            <h4 className="font-display font-extrabold text-sm uppercase tracking-wider text-accent mb-2">Home Visit Advantage</h4>
            <p className="text-xs text-primary-foreground/95 leading-relaxed">
              Skip the painful commutes. Dr. Rohit Verma brings high-end clinical mobilization bands, electrotherapy modalities, and diagnostic expertise directly to your home.
            </p>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-8">
          {submitSuccess ? (
            <div className="bg-white dark:bg-card border border-border shadow-md rounded-2xl p-8 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-secondary text-accent flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-display font-extrabold text-primary">Booking Requested!</h2>
              <p className="text-muted-foreground text-sm max-w-md">
                Thank you for scheduling with PhysioVenture. Dr. Rohit Verma will call you shortly on your provided number to coordinate the session timing and address.
              </p>
              <div className="flex gap-4 mt-4">
                <Button variant="primary" onClick={() => setSubmitSuccess(false)}>
                  Book Another Session
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </div>
          ) : (
            <form
              // eslint-disable-next-line react-hooks/refs
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white dark:bg-card border border-border shadow-xs rounded-2xl p-6 sm:p-8 flex flex-col gap-6 text-left"
            >
              {submitError && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-xl p-4 flex gap-3 items-center">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-xs font-semibold">{submitError}</span>
                </div>
              )}

              {/* Patient Name */}
              <Input
                label="Patient Full Name"
                placeholder="e.g. Vikram Mehta"
                error={errors.patient_name?.message}
                {...register("patient_name")}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone */}
                <Input
                  label="Contact Mobile Number"
                  placeholder="e.g. 9876543210"
                  error={errors.phone?.message}
                  {...register("phone")}
                />

                {/* Email */}
                <Input
                  label="Email Address (Optional)"
                  type="email"
                  placeholder="e.g. name@example.com"
                  error={errors.email?.message}
                  {...register("email")}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Service Dropdown */}
                <div className="w-full flex flex-col gap-1.5">
                  <label htmlFor="service-select" className="text-xs font-semibold tracking-wider uppercase text-muted-foreground ml-1">
                    Select Required Treatment
                  </label>
                  <Controller
                    control={control}
                    name="service_id"
                    render={({ field }) => (
                      <ServiceCombobox
                        id="service-select"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.service_id && (
                    <span className="text-xs text-destructive font-medium ml-1">
                      {errors.service_id.message}
                    </span>
                  )}
                </div>

                {/* Preferred Date */}
                <Input
                  label="Preferred Date"
                  type="date"
                  error={errors.preferred_date?.message}
                  {...register("preferred_date")}
                />
              </div>

              {/* Preferred Time Slot */}
              <div className="w-full flex flex-col gap-1.5" role="radiogroup" aria-labelledby="time-slot-label">
                <span id="time-slot-label" className="text-xs font-semibold tracking-wider uppercase text-muted-foreground ml-1">
                  Preferred Time of Day
                </span>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { val: "morning", label: "Morning", desc: "8 AM - 12 PM" },
                    { val: "afternoon", label: "Afternoon", desc: "12 PM - 5 PM" },
                    { val: "evening", label: "Evening", desc: "5 PM - 8 PM" }
                  ].map((slot) => (
                    <label
                      key={slot.val}
                      className="border border-border rounded-xl p-3 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-200 hover:bg-secondary/20 has-[:checked]:border-accent has-[:checked]:bg-secondary/40"
                    >
                      <input
                        type="radio"
                        value={slot.val}
                        className="sr-only"
                        {...register("preferred_time_slot")}
                      />
                      <span className="text-xs font-bold text-primary">{slot.label}</span>
                      <span className="text-[10px] text-muted-foreground">{slot.desc}</span>
                    </label>
                  ))}
                </div>
                {errors.preferred_time_slot && (
                  <span className="text-xs text-destructive font-medium ml-1">
                    {errors.preferred_time_slot.message}
                  </span>
                )}
              </div>

              {/* Additional Notes */}
              <Textarea
                label="Describe Symptoms or Specific Conditions"
                placeholder="Mention details like: history of stroke, spinal surgery date, specific knee joints pain trigger, etc. (Optional)"
                error={errors.additional_notes?.message}
                {...register("additional_notes")}
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
                size="lg"
                className="w-full mt-2"
                isLoading={isSubmitting}
              >
                Schedule Free Callback & Book
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
