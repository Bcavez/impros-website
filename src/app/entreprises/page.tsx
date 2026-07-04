import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { DevisForm } from "@/components/shared/DevisForm";
import { corporateServices } from "@/data/corporate";

export const metadata: Metadata = {
  title: "Improvisation pour entreprises et écoles — Bruxelles",
  description:
    "Teambuilding, spectacles sur mesure, animation de débats et ateliers scolaires par impro.be à Bruxelles. Demandez un devis personnalisé.",
  openGraph: {
    title: "Impro pour entreprises — impro.be",
    description:
      "Teambuilding, spectacles et ateliers d'improvisation sur mesure pour entreprises et écoles à Bruxelles.",
  },
};

const reasons = [
  "Des formateurs comédiens professionnels avec +15 ans d'expérience",
  "Ateliers 100% personnalisés à votre contexte et culture",
  "Formats flexibles : demi-journée, journée, parcours multi-sessions",
  "Bilan et débriefing inclus pour ancrer les apprentissages",
  "Références dans tous secteurs : tech, pharma, finance, public",
];

export default function EntreprisesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 spotlight-bg noise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
              Corporate & Écoles
            </p>
            <h1 className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-7xl text-foreground leading-none tracking-tight">
              L&apos;impro au service
              <br />
              <span className="text-primary">de votre équipe</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed max-w-xl">
              Teambuilding, spectacles sur mesure, animation de débats et
              ateliers pour écoles. Des expériences qui marquent et transforment.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#devis"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors glow-amber-sm"
              >
                Demander un devis <ArrowRight size={16} />
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-semibold hover:border-primary/50 transition-colors"
              >
                Nous appeler
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-background" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Nos services"
            title="Ce que nous proposons"
            description="Quatre offres complémentaires pour répondre à tous vos besoins."
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {corporateServices.map((service) => (
              <Link
                key={service.slug}
                href={`/entreprises/${service.slug}`}
                className="group rounded-2xl border border-border bg-card p-8 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-primary font-semibold text-xs uppercase tracking-widest mb-2">
                      {service.subtitle}
                    </p>
                    <h2 className="font-heading font-bold text-2xl text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h2>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0 text-lg">
                    {serviceEmoji(service.slug)}
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                  {service.description}
                </p>
                <ul className="space-y-1.5 mb-6">
                  {service.highlights.slice(0, 3).map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check size={13} className="text-primary shrink-0 mt-0.5" />
                      {h}
                    </li>
                  ))}
                </ul>
                <span className="flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                  En savoir plus <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <SectionHeading
                eyebrow="Notre différence"
                title="Pourquoi choisir impro.be ?"
                description="Nous ne faisons pas du teambuilding ordinaire. Nous créons des expériences qui changent vraiment quelque chose."
              />
              <ul className="mt-8 space-y-3">
                {reasons.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={11} className="text-primary" />
                    </div>
                    <span className="text-muted-foreground text-sm leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-accent border border-border relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center text-center px-8">
                <div>
                  <div className="text-6xl mb-4">🏆</div>
                  <p className="font-heading font-bold text-2xl text-foreground">
                    +200 entreprises
                    <br />
                    <span className="text-primary">nous font confiance</span>
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Illustration à remplacer par une photo d&apos;atelier.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Devis form */}
      <section
        className="py-20 bg-background spotlight-bg-subtle"
        id="devis"
        aria-label="Formulaire de devis"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Contactez-nous"
            title="Parlons de votre projet"
            description="Remplissez ce formulaire et nous vous recontacterons sous 48h pour vous préparer une proposition personnalisée et sans engagement."
            align="center"
            className="mb-10"
          />
          <DevisForm />
        </div>
      </section>
    </>
  );
}

function serviceEmoji(slug: string) {
  const map: Record<string, string> = {
    teambuilding: "🤝",
    spectacles: "🎭",
    "animation-debats": "💬",
    ecoles: "🎓",
  };
  return map[slug] ?? "✨";
}
