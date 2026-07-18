import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "À propos de impro.be",
  description:
    "Découvrez l'histoire et la mission d'impro.be, la compagnie d'improvisation théâtrale de Bruxelles fondée par des passionnés de scène.",
};

const team = [
  {
    name: "Florent Minotti",
    role: "Fondateur & Coach principal",
    bio: "Comédien et improvisateur depuis plus de 20 ans, Florent a fondé impro.be avec la conviction que l'improvisation peut transformer les gens et les organisations. Il enseigne et met en scène avec une pédagogie bienveillante et exigeante.",
  },
  {
    name: "Sophie Charlier",
    role: "Coach & Coordinatrice pédagogique",
    bio: "Formée au théâtre en Belgique et en France, Sophie développe les programmes pédagogiques de l'école et accompagne les élèves dans leur progression avec humour et précision.",
  },
  {
    name: "Thomas Renard",
    role: "Coach & Comédien",
    bio: "Spécialiste des longues formes et de l'impro musicale, Thomas apporte une dimension artistique unique à la compagnie. Il co-anime les cours confirmés et les ateliers corporate.",
  },
];

const values = [
  {
    title: "Bienveillance",
    text: "L'impro ne se fait pas dans la peur du jugement. Nous cultivons un espace où l'erreur est un cadeau, pas une honte.",
  },
  {
    title: "Générosité",
    text: "Sur scène comme en coulisses, nous croyons que le \"oui, et\" est une philosophie de vie. Accueillir ce que l'autre propose.",
  },
  {
    title: "Exigence créative",
    text: "La bienveillance ne signifie pas le relâchement. Nous poussons chacun à aller plus loin dans sa créativité et sa présence.",
  },
  {
    title: "Collectif",
    text: "L'impro est un art profondément collectif. Nous n'existons que grâce aux autres — sur scène et dans la salle.",
  },
];

export default function AProposPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 spotlight-bg noise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
                À propos
              </p>
              <h1 className="font-heading font-extrabold text-5xl sm:text-6xl text-foreground leading-none tracking-tight">
                La scène
                <br />
                <span className="text-primary">nous rassemble</span>
              </h1>
              <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
                impro.be est une compagnie d&apos;improvisation théâtrale basée à
                Bruxelles. Depuis plus de 15 ans, nous créons des spectacles,
                formons des improvisateurs et accompagnons les entreprises et les
                écoles à travers l&apos;art de l&apos;instant.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-card border border-border relative">
              <Image
                src="/images/about/troupe.jpg"
                alt="La troupe impro.be réunie sur scène"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              eyebrow="Notre mission"
              title="Inventer ensemble, en direct, sans filet."
              align="center"
            />
            <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
              impro.be croit que l&apos;improvisation est bien plus qu&apos;un
              divertissement. C&apos;est un outil de transformation — personnelle,
              collective, professionnelle. Que vous veniez pour rire, pour vous
              dépasser ou pour voir quelque chose de jamais vu, vous repartirez
              différent.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Nos valeurs"
            title="Ce qui nous guide"
            align="center"
            className="mb-14"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ title, text }) => (
              <div
                key={title}
                className="p-6 rounded-xl border border-border bg-background flex flex-col"
              >
                <h3 className="font-heading font-bold text-lg text-primary mb-3">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="L'équipe"
            title="Les visages derrière impro.be"
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map(({ name, role, bio }) => (
              <div key={name} className="flex flex-col">
                {/* Avatar placeholder */}
                <div className="w-20 h-20 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mb-4">
                  <span className="text-3xl">👤</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground">{name}</h3>
                <p className="text-primary text-sm font-medium mb-3">{role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "15+", label: "Années d'existence" },
              { value: "200+", label: "Élèves formés / an" },
              { value: "50+", label: "Spectacles par saison" },
              { value: "200+", label: "Entreprises accompagnées" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-heading font-extrabold text-5xl text-primary text-glow">
                  {value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background spotlight-bg-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-6">
            Prêt(e) à monter sur scène ?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/cours"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors glow-amber-sm"
            >
              Découvrir les cours <ArrowRight size={15} />
            </Link>
            <Link
              href="/spectacles"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full border border-border text-foreground font-semibold hover:border-primary/50 transition-colors"
            >
              Voir les spectacles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
