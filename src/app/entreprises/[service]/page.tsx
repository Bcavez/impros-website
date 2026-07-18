import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, Users, Clock, ChevronRight, ArrowLeft } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { DevisForm } from "@/components/shared/DevisForm";
import {
  corporateServices,
  getServiceBySlug,
  type ServiceSlug,
} from "@/data/corporate";

interface Props {
  params: Promise<{ service: string }>;
}

export async function generateStaticParams() {
  return corporateServices.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  const svc = getServiceBySlug(service as ServiceSlug);
  if (!svc) return {};

  return {
    title: `${svc.title} — Impro pour entreprises`,
    description: `${svc.description} ${svc.forWhom}. Demandez un devis sur impro.be.`,
    openGraph: {
      title: `${svc.title} — impro.be`,
      description: svc.description,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { service } = await params;
  const svc = getServiceBySlug(service as ServiceSlug);
  if (!svc) notFound();

  const otherServices = corporateServices.filter((s) => s.slug !== service);

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-24 pb-4 bg-background border-b border-border">
        <nav
          aria-label="Fil d'Ariane"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <ol className="flex items-center gap-2 text-xs text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Accueil
              </Link>
            </li>
            <li><ChevronRight size={12} /></li>
            <li>
              <Link href="/entreprises" className="hover:text-foreground transition-colors">
                Entreprises
              </Link>
            </li>
            <li><ChevronRight size={12} /></li>
            <li className="text-foreground font-medium">{svc.title}</li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <section className="py-16 spotlight-bg noise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/entreprises"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            Retour aux services
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
                {svc.subtitle}
              </p>
              <h1 className="font-heading font-bold text-5xl sm:text-6xl text-foreground leading-none tracking-tight">
                {svc.title}
              </h1>
              <p className="mt-4 text-xl text-primary italic">&ldquo;{svc.tagline}&rdquo;</p>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
                {svc.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#devis"
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors glow-amber-sm"
                >
                  Demander un devis <ArrowRight size={16} />
                </a>
              </div>
            </div>
            {/* Visual */}
            <div className="lg:col-span-2 rounded-2xl overflow-hidden aspect-[4/3] bg-card border border-border relative">
              <Image
                src={svc.image}
                alt={svc.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Long description */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            <div>
              <SectionHeading eyebrow="En détail" title="Ce que vous obtenez" />
              <div className="mt-6 space-y-4">
                {svc.longDescription.split("\n\n").map((para, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading eyebrow="Points forts" title="Ce qui fait la différence" />
              <ul className="mt-6 space-y-3">
                {svc.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 mt-1">
                      <Check size={11} className="text-primary" />
                    </div>
                    <span className="text-muted-foreground leading-relaxed text-sm">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Formules"
            title="Choisissez votre format"
            description="Nous adaptons chaque intervention à votre contexte, votre temps et vos objectifs."
            className="mb-10"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {svc.formats.map((fmt, i) => (
              <div
                key={fmt.name}
                className={`rounded-xl border p-6 ${i === 0 ? "border-primary/30 bg-primary/5" : "border-border bg-background"}`}
              >
                {i === 0 && (
                  <span className="inline-block text-xs font-semibold text-primary bg-primary/15 px-2.5 py-1 rounded-full mb-3">
                    Populaire
                  </span>
                )}
                <h3 className="font-heading font-bold text-lg text-foreground">{fmt.name}</h3>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock size={13} className="text-primary" />
                    {fmt.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users size={13} className="text-primary" />
                    {fmt.participants}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            * Les tarifs sont calculés sur mesure selon le format, le nombre de participants et la distance.{" "}
            <a href="#devis" className="text-primary hover:underline">
              Demandez votre devis →
            </a>
          </p>
        </div>
      </section>

      {/* For whom */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Pour qui ?
          </p>
          <h2 className="font-heading font-bold text-3xl text-foreground mb-4">
            Ce service convient à
          </h2>
          <p className="text-muted-foreground leading-relaxed">{svc.forWhom}</p>
        </div>
      </section>

      {/* Devis form */}
      <section
        className="py-20 bg-card border-t border-border spotlight-bg-subtle"
        id="devis"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Devis"
            title="Discutons de votre projet"
            description="Décrivez votre contexte et nous vous recontactons sous 48h avec une proposition sur mesure."
            align="center"
            className="mb-10"
          />
          <DevisForm defaultService={svc.slug as Parameters<typeof DevisForm>[0]["defaultService"]} />
        </div>
      </section>

      {/* Other services */}
      <section className="py-16 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-2xl text-foreground mb-8">
            Nos autres services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/entreprises/${s.slug}`}
                className="group flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-accent transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-lg">
                  {serviceEmoji(s.slug)}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    {s.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.subtitle}</p>
                  <span className="mt-2 flex items-center gap-1 text-xs text-primary">
                    Découvrir <ArrowRight size={11} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
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
