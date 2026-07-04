"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("E-mail invalide"),
  subject: z.string().min(3, "Objet requis"),
  message: z.string().min(20, "Message trop court (min. 20 caractères)"),
});

type FormData = z.infer<typeof schema>;

export function ContactForm({ className }: { className?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 900));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className={cn(
          "p-8 rounded-2xl border border-primary/30 bg-primary/5 text-center",
          className
        )}
        role="status"
        aria-live="polite"
      >
        <CheckCircle className="mx-auto mb-4 text-primary" size={48} />
        <h3 className="font-heading font-bold text-2xl text-foreground mb-2">
          Message envoyé !
        </h3>
        <p className="text-muted-foreground">
          Merci de nous avoir contactés. Nous vous répondrons sous 48h ouvrables.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("p-6 sm:p-8 rounded-2xl border border-border bg-card", className)}>
      <h2 className="font-heading font-bold text-2xl text-foreground mb-6">
        Envoyez-nous un message
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <Field label="Votre nom *" error={errors.name?.message}>
          <input
            {...register("name")}
            type="text"
            placeholder="Marie Dupont"
            className={inputCls(!!errors.name)}
          />
        </Field>
        <Field label="Votre e-mail *" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            placeholder="marie@example.com"
            className={inputCls(!!errors.email)}
          />
        </Field>
        <Field label="Objet *" error={errors.subject?.message}>
          <input
            {...register("subject")}
            type="text"
            placeholder="Question sur les cours…"
            className={inputCls(!!errors.subject)}
          />
        </Field>
        <Field label="Message *" error={errors.message?.message}>
          <textarea
            {...register("message")}
            rows={5}
            placeholder="Votre message…"
            className={cn(inputCls(!!errors.message), "resize-none")}
          />
        </Field>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-60 transition-all glow-amber-sm"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Envoi…
            </>
          ) : (
            "Envoyer le message"
          )}
        </button>
      </form>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive" role="alert">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full px-4 py-3 rounded-xl bg-background border text-foreground text-sm placeholder:text-muted-foreground/60",
    "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors",
    hasError ? "border-destructive" : "border-border"
  );
}
