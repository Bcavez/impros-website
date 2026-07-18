import type { Metadata } from "next";
import Image from "next/image";
import { Calendar, MapPin, Clock, Euro, Users, Check } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SubscriptionForm } from "@/components/shared/SubscriptionForm";
import { initiationDay } from "@/data/courses";
import { formatShowDate } from "@/data/shows";

export const metadata: Metadata = {
  title: "Journée d'initiation à l'improvisation — Bruxelles",
  description:
    "Découvrez l'impro en une journée ! Journée d'initiation à l'improvisation théâtrale à Bruxelles avec impro.be. Ouvert à tous, sans expérience requise.",
  openGraph: {
    title: "Journée d'initiation à l'impro — impro.be",
    description:
      "Une journée complète pour découvrir l'impro sans pression. Bruxelles, accessible à tous dès 18 ans.",
  },
};

export default function InitiationPage() {
  const d = initiationDay;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 spotlight-bg noise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
                Initiation
              </p>
              <h1 className="font-heading font-extrabold text-5xl sm:text-6xl text-foreground leading-none tracking-tight">
                Journée<br />
                <span className="text-primary">d&apos;initiation</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {d.description}
              </p>

              {/* Key info */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <InfoCard icon={Calendar} label="Date">
                  {formatShowDate(d.nextDate)}
                </InfoCard>
                <InfoCard icon={Clock} label="Horaire">
                  {d.time} — {d.endTime}
                </InfoCard>
                <InfoCard icon={MapPin} label="Lieu">
                  {d.venue}, {d.city}
                </InfoCard>
                <InfoCard icon={Euro} label="Tarif">
                  {d.price} € par personne
                </InfoCard>
                <InfoCard icon={Users} label="Places">
                  Max. {d.maxParticipants} participants
                </InfoCard>
              </div>

              <a
                href="#inscription"
                className="mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors glow-amber-sm"
              >
                <Calendar size={16} />
                Réserver ma place
              </a>
            </div>

            {/* Visual */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-card border border-border">
              <Image
                src="/images/cours/initiation.jpg"
                alt="Groupe de débutants lors d'un atelier d'initiation à l'impro"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="font-heading font-bold text-2xl text-foreground drop-shadow-md">
                  Un jour pour tout changer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programme */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Au programme"
            title="Une journée bien remplie"
            description="Voici comment se déroule la journée, du matin au soir."
            align="center"
            className="mb-12"
          />
          <ol className="space-y-4" aria-label="Programme de la journée">
            {d.programme.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0 text-primary font-bold text-sm mt-0.5">
                  {i + 1}
                </div>
                <p className="text-foreground leading-relaxed pt-1">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* For whom */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <SectionHeading
                eyebrow="Pour qui ?"
                title="Fait pour vous si…"
              />
              <ul className="mt-8 space-y-3">
                {forWhomItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <Check size={16} className="text-primary shrink-0 mt-1" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading
                eyebrow="Pas de panique"
                title="Pas besoin d'expérience"
              />
              <p className="mt-4 text-muted-foreground leading-relaxed">
                L&apos;improvisation n&apos;est pas réservée aux acteurs ou aux
                personnes &laquo; naturellement drôles &raquo;. Nos coachs créent un
                espace sécurisant où l&apos;échec n&apos;existe pas — seulement des
                propositions, des réactions et du jeu collectif.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Vous repartirez avec les bases de l&apos;improvisation et, souvent,
                l&apos;envie de continuer avec nos cours hebdomadaires.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inscription form */}
      <section
        className="py-20 bg-card border-t border-border spotlight-bg-subtle"
        id="inscription"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Inscription"
            title="Réservez votre place"
            description={`Places limitées à ${d.maxParticipants} participants. Confirmez votre présence dès maintenant.`}
            align="center"
            className="mb-10"
          />
          <SubscriptionForm
            title="Inscription à la journée d'initiation"
            defaultLevel="initiation"
          />
        </div>
      </section>
    </>
  );
}

function InfoCard({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 rounded-xl border border-border bg-card flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
        <Icon size={15} className="text-primary" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
        <p className="text-sm font-semibold text-foreground mt-0.5">{children}</p>
      </div>
    </div>
  );
}

const forWhomItems = [
  "Vous avez toujours voulu essayer le théâtre ou l'impro.",
  "Vous cherchez à développer votre spontanéité et confiance en vous.",
  "Vous voulez rencontrer de nouvelles personnes dans un cadre créatif.",
  "Vous envisagez de vous inscrire aux cours et voulez tester d'abord.",
  "Vous aimez rire et créer ensemble, sans prise de tête.",
];
