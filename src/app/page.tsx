import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Users,
  Star,
  Zap,
  ChevronRight,
} from "lucide-react";
import { ShowCard } from "@/components/shared/ShowCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { InstagramFeed } from "@/components/shared/InstagramFeed";
import { getUpcomingShows, formatShowDate } from "@/data/shows";
import { initiationDay } from "@/data/courses";
import { corporateServices } from "@/data/corporate";

export const metadata: Metadata = {
  title: "impro.be — Cours & Spectacles d'improvisation à Bruxelles",
  description:
    "Découvrez impro.be : cours d'improvisation pour tous les niveaux, spectacles, tournois, festival et ateliers en entreprise à Bruxelles.",
};

const pathways = [
  {
    href: "/cours",
    eyebrow: "Formation",
    title: "Cours d'impro",
    description:
      "Débutant ou confirmé, nos cours hebdomadaires vous guident à travers l'art de l'improvisation théâtrale dans une ambiance bienveillante et créative.",
    cta: "Découvrir les cours",
    icon: Star,
    highlight: "Dès septembre",
  },
  {
    href: "/spectacles",
    eyebrow: "Scène",
    title: "Spectacles & Tournois",
    description:
      "Tournois d'impro, spectacles pour enfants, festival de fin d'année… Des soirées uniques où chaque représentation est une première et une dernière.",
    cta: "Voir les spectacles",
    icon: Zap,
    highlight: "Prochaines dates",
  },
  {
    href: "/entreprises",
    eyebrow: "Corporate",
    title: "Pour les entreprises",
    description:
      "Teambuilding, spectacles sur mesure, animation de débats et ateliers pour écoles. L'improvisation au service de votre organisation.",
    cta: "Nos services",
    icon: Users,
    highlight: "Sur mesure",
  },
];

export default function HomePage() {
  const upcomingShows = getUpcomingShows(3);
  const nextInitiation = initiationDay;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden spotlight-bg noise">
        {/* Decorative spotlight beams */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-0 left-1/4 w-px h-2/3 bg-gradient-to-b from-primary/30 to-transparent rotate-12 origin-top" />
          <div className="absolute top-0 right-1/3 w-px h-3/4 bg-gradient-to-b from-primary/20 to-transparent -rotate-8 origin-top" />
          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gradient-to-b from-primary/15 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 text-center">
          {/* Eyebrow */}
          <p className="animate-fade-up text-primary font-semibold text-sm uppercase tracking-widest mb-6">
            Bruxelles · Improvisation Théâtrale
          </p>

          {/* Main heading */}
          <h1 className="animate-fade-up animate-fade-up-1 font-heading font-extrabold text-5xl sm:text-7xl lg:text-8xl xl:text-9xl text-foreground leading-none tracking-tight">
            impro
            <span className="text-primary text-glow">.be</span>
          </h1>

          <p className="animate-fade-up animate-fade-up-2 mt-6 max-w-2xl mx-auto text-xl sm:text-2xl text-muted-foreground leading-relaxed">
            L&apos;art d&apos;inventer ensemble, en direct, sans filet.
          </p>

          {/* Three CTAs */}
          <div className="animate-fade-up animate-fade-up-3 mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/cours"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-all glow-amber-sm"
            >
              <Star size={16} />
              Cours d&apos;impro
            </Link>
            <Link
              href="/spectacles"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-border bg-card/50 text-foreground font-semibold text-base hover:border-primary/50 hover:bg-card transition-all backdrop-blur-sm"
            >
              <Zap size={16} />
              Spectacles
            </Link>
            <Link
              href="/entreprises"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-border bg-card/50 text-foreground font-semibold text-base hover:border-primary/50 hover:bg-card transition-all backdrop-blur-sm"
            >
              <Users size={16} />
              Entreprises
            </Link>
          </div>

          {/* Scroll hint */}
          <div className="animate-fade-up animate-fade-up-4 mt-20 flex justify-center">
            <div className="w-px h-12 bg-gradient-to-b from-primary/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── À l'affiche ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-card border-y border-border" aria-label="À l'affiche">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center mb-10">
            <SectionHeading
              eyebrow="À l'affiche"
              title="Prochains rendez-vous"
              description="Ne manquez pas nos prochains spectacles et la journée d'initiation."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Upcoming shows */}
            {upcomingShows.map((show) => (
              <ShowCard key={show.slug} show={show} />
            ))}
          </div>

          {/* Next initiation day banner */}
          <div className="mt-8 p-5 sm:p-6 rounded-xl border border-primary/30 bg-primary/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
                <Calendar size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest">
                  Journée d&apos;initiation
                </p>
                <p className="font-heading font-bold text-xl text-foreground mt-0.5">
                  {formatShowDate(nextInitiation.nextDate)} · {nextInitiation.time}
                </p>
                <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
                  <MapPin size={13} className="text-primary" />
                  {nextInitiation.venue}, {nextInitiation.city}
                </div>
              </div>
            </div>
            <Link
              href="/cours/initiation"
              className="flex items-center gap-2 shrink-0 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              S&apos;inscrire <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/spectacles"
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
            >
              Voir tous les spectacles <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Three pathways ───────────────────────────────────────────────── */}
      <section className="py-24 spotlight-bg-subtle" aria-label="Nos univers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Découvrir"
            title="Trois façons de vivre l'impro"
            align="center"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pathways.map(({ href, eyebrow, title, description, cta, icon: Icon, highlight }) => (
              <Link
                key={href}
                href={href}
                className="group relative block rounded-2xl border border-border bg-card p-8 overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/8 to-transparent rounded-2xl" />

                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-6 group-hover:bg-primary/25 transition-colors">
                    <Icon size={22} className="text-primary" />
                  </div>

                  <span className="text-primary font-semibold text-xs uppercase tracking-widest">
                    {eyebrow}
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-foreground mt-2 mb-3 group-hover:text-primary transition-colors">
                    {title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {description}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {highlight}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                      {cta} <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Corporate teaser ─────────────────────────────────────────────── */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                eyebrow="Entreprises & Écoles"
                title="L'impro au service de votre organisation"
                description="Teambuilding, spectacles sur mesure, animation de débats et ateliers pour les écoles. Nos formateurs et comédiens professionnels s'adaptent à vos besoins."
              />
              <div className="mt-8 grid grid-cols-2 gap-4">
                {corporateServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/entreprises/${service.slug}`}
                    className="group flex items-start gap-3 p-4 rounded-xl border border-border bg-background hover:border-primary/40 hover:bg-accent transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-primary text-xs font-bold">
                        {service.title.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                        {service.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {service.subtitle}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-8 flex gap-4">
                <Link
                  href="/entreprises"
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
                >
                  Découvrir nos services <ArrowRight size={14} />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-semibold text-sm hover:border-primary/50 transition-colors"
                >
                  Nous contacter
                </Link>
              </div>
            </div>

            {/* Visual placeholder */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-accent border border-border">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                <div className="text-6xl mb-4">🏢</div>
                <p className="font-heading font-bold text-2xl text-foreground">
                  Votre équipe,
                  <br />
                  <span className="text-primary">sur scène.</span>
                </p>
                <p className="mt-3 text-sm text-muted-foreground max-w-xs">
                  Photo de référence — à remplacer par une photo d&apos;atelier en entreprise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Instagram feed ───────────────────────────────────────────────── */}
      <InstagramFeed />
    </>
  );
}
