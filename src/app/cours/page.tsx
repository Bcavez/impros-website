import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Calendar,
  MapPin,
  ArrowRight,
  Clock,
  Euro,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SubscriptionForm } from "@/components/shared/SubscriptionForm";
import { courseLevels, initiationDay } from "@/data/courses";
import { formatShowDate } from "@/data/shows";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Cours d'improvisation à Bruxelles",
  description:
    "Cours d'improvisation théâtrale à Bruxelles pour débutants et confirmés. Petits groupes, coachs expérimentés, spectacle de fin d'année. Inscriptions ouvertes.",
  openGraph: {
    title: "Cours d'impro à Bruxelles — impro.be",
    description:
      "Rejoignez nos cours hebdomadaires d'improvisation pour débutants et confirmés à Bruxelles.",
  },
};

export default function CoursPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 spotlight-bg-subtle noise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
              Formation
            </p>
            <h1 className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-7xl text-foreground leading-none tracking-tight">
              Cours <br />
              <span className="text-primary">d&apos;impro</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed max-w-xl">
              Des cours hebdomadaires pour apprendre, grandir et créer ensemble.
              Deux parcours adaptés à votre niveau, animés par des comédiens
              professionnels passionnés.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/cours/initiation"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors glow-amber-sm"
              >
                <Calendar size={16} />
                Journée d&apos;initiation
              </Link>
              <a
                href="#inscription"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-semibold hover:border-primary/50 transition-colors"
              >
                S&apos;inscrire aux cours
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Course levels */}
      <section className="py-20 bg-background" id="niveaux">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Nos parcours"
            title="Choisissez votre niveau"
            description="Que vous débutiez ou ayez déjà une saison au compteur, nous avons le parcours qui vous convient."
            className="mb-14"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {courseLevels.map((level, i) => (
              <div
                key={level.id}
                id={level.id}
                className={cn(
                  "rounded-2xl border p-8 flex flex-col",
                  i === 0
                    ? "border-primary/30 bg-primary/5"
                    : "border-border bg-card"
                )}
              >
                {i === 0 && (
                  <span className="inline-block self-start text-xs font-semibold text-primary bg-primary/15 px-3 py-1 rounded-full mb-4">
                    Recommandé pour commencer
                  </span>
                )}
                <h2 className="font-heading font-bold text-3xl text-foreground">
                  {level.name}
                </h2>
                <p className="text-primary font-medium mt-1">{level.subtitle}</p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {level.description}
                </p>
                <p className="mt-4 text-sm text-foreground/80 italic">
                  {level.forWhom}
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock size={16} className="text-primary shrink-0" />
                    <span>{level.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Calendar size={16} className="text-primary shrink-0" />
                    <span>{level.schedule}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Euro size={16} className="text-primary shrink-0" />
                    <span>
                      <strong className="text-foreground">{level.price} €</strong>{" "}
                      {level.priceDescription}
                    </span>
                  </div>
                </div>

                <ul className="mt-6 space-y-2">
                  {level.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check size={15} className="text-primary shrink-0 mt-0.5" />
                      {h}
                    </li>
                  ))}
                </ul>

                <a
                  href="#inscription"
                  className={cn(
                    "mt-8 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all",
                    i === 0
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 glow-amber-sm"
                      : "border border-border text-foreground hover:border-primary/50"
                  )}
                >
                  S&apos;inscrire — {level.name} <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiation day teaser */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
                Pas encore prêt(e) à vous engager ?
              </p>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground leading-tight">
                Commencez par une journée d&apos;initiation
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Une journée complète pour découvrir l&apos;improvisation sans
                pression, dans une atmosphère bienveillante. La meilleure façon de
                savoir si l&apos;impro est fait pour vous.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-primary" />
                  {formatShowDate(initiationDay.nextDate)} · {initiationDay.time}–{initiationDay.endTime}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-primary" />
                  {initiationDay.venue}
                </div>
                <div className="flex items-center gap-2">
                  <Euro size={15} className="text-primary" />
                  {initiationDay.price} €
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Link
                href="/cours/initiation"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors glow-amber-sm"
              >
                Voir la journée d&apos;initiation <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Questions fréquentes"
            title="Tout ce que vous voulez savoir"
            align="center"
            className="mb-12"
          />
          <div className="space-y-6">
            {faqs.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
              </div>
            ))}
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
            title="Rejoignez-nous cette saison"
            description="Remplissez ce formulaire et nous vous recontacterons rapidement pour confirmer votre inscription."
            align="center"
            className="mb-10"
          />
          <SubscriptionForm title="Formulaire d'inscription" />
        </div>
      </section>
    </>
  );
}

const faqs = [
  {
    q: "Faut-il avoir une expérience de théâtre pour s'inscrire ?",
    a: "Absolument pas ! Nos cours débutants accueillent des personnes sans aucune expérience artistique. La curiosité et l'envie de jouer suffisent.",
  },
  {
    q: "À quelle fréquence ont lieu les cours ?",
    a: "Les cours se déroulent une fois par semaine en soirée (généralement le mardi ou le jeudi), de septembre à juin. Les horaires précis sont communiqués à l'inscription.",
  },
  {
    q: "Puis-je m'inscrire en cours d'année ?",
    a: "Les inscriptions sont principalement ouvertes en début de saison (septembre). Des places se libèrent parfois en cours d'année — contactez-nous pour vérifier la disponibilité.",
  },
  {
    q: "Y a-t-il un spectacle de fin d'année ?",
    a: "Oui ! Chaque groupe présente une création lors du Festival de Fin d'Année en juin. C'est un moment fort de la saison pour les élèves comme pour le public.",
  },
  {
    q: "Le paiement en plusieurs fois est-il possible ?",
    a: "Oui, nous proposons un paiement en deux fois (à l'inscription et en janvier). N'hésitez pas à mentionner votre souhait dans le formulaire.",
  },
];
