"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  firstName: z.string().min(2, "Prénom requis (min. 2 caractères)"),
  lastName: z.string().min(2, "Nom requis (min. 2 caractères)"),
  email: z.string().email("Adresse e-mail invalide"),
  phone: z.string().optional(),
  level: z.enum(["debutants", "confirmes", "initiation"], {
    message: "Veuillez choisir un parcours",
  }),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface SubscriptionFormProps {
  defaultLevel?: "debutants" | "confirmes" | "initiation";
  title?: string;
  className?: string;
}

export function SubscriptionForm({
  defaultLevel,
  title = "Inscrivez-vous",
  className,
}: SubscriptionFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { level: defaultLevel },
  });

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 1000));
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
          Inscription reçue !
        </h3>
        <p className="text-muted-foreground">
          Merci pour votre intérêt. Nous vous contacterons très prochainement
          pour confirmer votre inscription et vous donner toutes les
          informations pratiques.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("p-6 sm:p-8 rounded-2xl border border-border bg-card", className)}>
      <h3 className="font-heading font-bold text-2xl text-foreground mb-6">
        {title}
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Prénom *" error={errors.firstName?.message}>
            <input
              {...register("firstName")}
              type="text"
              placeholder="Marie"
              className={inputClass(!!errors.firstName)}
            />
          </Field>
          <Field label="Nom *" error={errors.lastName?.message}>
            <input
              {...register("lastName")}
              type="text"
              placeholder="Dupont"
              className={inputClass(!!errors.lastName)}
            />
          </Field>
        </div>

        <Field label="Adresse e-mail *" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            placeholder="marie@example.com"
            className={inputClass(!!errors.email)}
          />
        </Field>

        <Field label="Téléphone (optionnel)" error={errors.phone?.message}>
          <input
            {...register("phone")}
            type="tel"
            placeholder="+32 470 00 00 00"
            className={inputClass(!!errors.phone)}
          />
        </Field>

        <Field label="Parcours souhaité *" error={errors.level?.message}>
          <select {...register("level")} className={inputClass(!!errors.level)}>
            <option value="">Choisissez un parcours…</option>
            <option value="debutants">Cours Débutants</option>
            <option value="confirmes">Cours Confirmés</option>
            <option value="initiation">Journée d&apos;initiation</option>
          </select>
        </Field>

        <Field label="Message (optionnel)" error={errors.message?.message}>
          <textarea
            {...register("message")}
            rows={3}
            placeholder="Questions, précisions…"
            className={cn(inputClass(!!errors.message), "resize-none")}
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
              Envoi en cours…
            </>
          ) : (
            "Envoyer ma demande d'inscription"
          )}
        </button>

        <p className="text-xs text-muted-foreground text-center">
          Vos données ne seront jamais partagées avec des tiers.
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full px-4 py-3 rounded-xl bg-background border text-foreground text-sm placeholder:text-muted-foreground/60",
    "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors",
    hasError ? "border-destructive" : "border-border"
  );
}
