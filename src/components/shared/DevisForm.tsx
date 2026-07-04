"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  company: z.string().min(2, "Nom de société requis"),
  email: z.string().email("E-mail invalide"),
  phone: z.string().optional(),
  service: z.enum(["teambuilding", "spectacles", "animation-debats", "ecoles", "autre"], {
    message: "Veuillez sélectionner un service",
  }),
  participants: z.string().optional(),
  date: z.string().optional(),
  message: z.string().min(10, "Décrivez brièvement votre projet (min. 10 caractères)"),
});

type FormData = z.infer<typeof schema>;

interface DevisFormProps {
  defaultService?: FormData["service"];
  className?: string;
}

export function DevisForm({ defaultService, className }: DevisFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { service: defaultService },
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
          Demande envoyée !
        </h3>
        <p className="text-muted-foreground">
          Merci pour votre intérêt. Nous vous contacterons sous 48h ouvrables
          pour discuter de votre projet et vous préparer une proposition
          personnalisée.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("p-6 sm:p-8 rounded-2xl border border-border bg-card", className)}>
      <h3 className="font-heading font-bold text-2xl text-foreground mb-6">
        Demander un devis
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Prénom *" error={errors.firstName?.message}>
            <input {...register("firstName")} type="text" placeholder="Julie" className={inputCls(!!errors.firstName)} />
          </Field>
          <Field label="Nom *" error={errors.lastName?.message}>
            <input {...register("lastName")} type="text" placeholder="Martin" className={inputCls(!!errors.lastName)} />
          </Field>
        </div>
        <Field label="Société *" error={errors.company?.message}>
          <input {...register("company")} type="text" placeholder="ACME SA" className={inputCls(!!errors.company)} />
        </Field>
        <Field label="E-mail professionnel *" error={errors.email?.message}>
          <input {...register("email")} type="email" placeholder="julie@acme.be" className={inputCls(!!errors.email)} />
        </Field>
        <Field label="Téléphone" error={errors.phone?.message}>
          <input {...register("phone")} type="tel" placeholder="+32 470 00 00 00" className={inputCls(!!errors.phone)} />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Service souhaité *" error={errors.service?.message}>
            <select {...register("service")} className={inputCls(!!errors.service)}>
              <option value="">Sélectionnez…</option>
              <option value="teambuilding">Teambuilding</option>
              <option value="spectacles">Spectacle d&apos;entreprise</option>
              <option value="animation-debats">Animation de débats</option>
              <option value="ecoles">Ateliers pour écoles</option>
              <option value="autre">Autre / à définir</option>
            </select>
          </Field>
          <Field label="Nombre de participants estimé" error={errors.participants?.message}>
            <input {...register("participants")} type="text" placeholder="ex. 30 personnes" className={inputCls(!!errors.participants)} />
          </Field>
        </div>
        <Field label="Date ou période envisagée" error={errors.date?.message}>
          <input {...register("date")} type="text" placeholder="ex. novembre 2026, flexible" className={inputCls(!!errors.date)} />
        </Field>
        <Field label="Votre projet *" error={errors.message?.message}>
          <textarea
            {...register("message")}
            rows={4}
            placeholder="Décrivez votre contexte, vos objectifs, vos contraintes…"
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
              Envoi en cours…
            </>
          ) : (
            "Envoyer ma demande de devis"
          )}
        </button>
        <p className="text-xs text-muted-foreground text-center">
          Réponse sous 48h ouvrables. Aucun engagement de votre part.
        </p>
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
