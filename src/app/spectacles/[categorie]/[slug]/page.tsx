import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, MapPin, Euro, Clock, ChevronRight, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WeezeventEmbed } from "@/components/shared/WeezeventEmbed";
import { ShowCard } from "@/components/shared/ShowCard";
import { JsonLd, buildEventSchema } from "@/components/shared/JsonLd";
import {
  showCategories,
  getShowsByCategory,
  getShowBySlug,
  formatShowDate,
  type ShowCategory,
  shows,
} from "@/data/shows";

interface Props {
  params: Promise<{ categorie: string; slug: string }>;
}

export async function generateStaticParams() {
  return shows.map((show) => ({
    categorie: show.category,
    slug: show.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorie, slug } = await params;
  const show = getShowBySlug(categorie as ShowCategory, slug);
  if (!show) return {};

  const cat = showCategories[categorie as ShowCategory];
  const dateStr = formatShowDate(show.date, show.endDate);

  return {
    title: `${show.title} — ${dateStr}`,
    description: `${show.description} ${show.venue}, ${show.city}. Réservez vos billets en ligne.`,
    openGraph: {
      title: show.title,
      description: show.description,
      images: [{ url: show.image, width: 1200, height: 630 }],
    },
  };
}

export default async function ShowDetailPage({ params }: Props) {
  const { categorie, slug } = await params;
  const show = getShowBySlug(categorie as ShowCategory, slug);
  if (!show) notFound();

  const cat = showCategories[categorie as ShowCategory];
  const relatedShows = getShowsByCategory(categorie as ShowCategory)
    .filter((s) => s.slug !== slug)
    .slice(0, 2);

  const dateStr = formatShowDate(show.date, show.endDate);

  return (
    <>
      <JsonLd data={buildEventSchema(show)} />
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
              <Link href="/spectacles" className="hover:text-foreground transition-colors">
                Spectacles
              </Link>
            </li>
            <li><ChevronRight size={12} /></li>
            <li>
              <Link
                href={`/spectacles/${categorie}`}
                className="hover:text-foreground transition-colors"
              >
                {cat.label}
              </Link>
            </li>
            <li><ChevronRight size={12} /></li>
            <li className="text-foreground font-medium truncate max-w-[200px]">
              {show.title}
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <section className="py-12 spotlight-bg-subtle noise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/spectacles/${categorie}`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            Retour aux {cat.label.toLowerCase()}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            {/* Main info */}
            <div className="lg:col-span-3">
              <div className="flex flex-wrap gap-2 mb-4">
                {show.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-accent text-muted-foreground text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
                {show.isFeatured && (
                  <Badge className="bg-primary text-primary-foreground text-xs">
                    À l&apos;affiche
                  </Badge>
                )}
              </div>
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-foreground leading-tight">
                {show.title}
              </h1>
              <p className="mt-3 text-xl text-primary font-medium italic">
                &ldquo;{show.tagline}&rdquo;
              </p>
            </div>

            {/* Quick booking card */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-border bg-card p-6 sticky top-24">
                <div className="space-y-3 mb-5">
                  <InfoRow icon={Calendar} label={dateStr} />
                  <InfoRow icon={Clock} label={`Début à ${show.time}`} />
                  <InfoRow icon={MapPin} label={`${show.venue}, ${show.city}`} />
                  <InfoRow icon={MapPin} label={show.address} />
                </div>
                <div className="border-t border-border pt-4 mb-4 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Adulte</span>
                    <span className="font-bold text-foreground">
                      {show.priceAdult.toFixed(2).replace(".", ",")} €
                    </span>
                  </div>
                  {show.priceChild && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Enfant</span>
                      <span className="font-bold text-foreground">
                        {show.priceChild.toFixed(2).replace(".", ",")} €
                      </span>
                    </div>
                  )}
                  {show.priceReduced && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Réduit</span>
                      <span className="font-bold text-foreground">
                        {show.priceReduced.toFixed(2).replace(".", ",")} €
                      </span>
                    </div>
                  )}
                </div>
                {show.soldOut ? (
                  <button
                    disabled
                    className="w-full py-3.5 rounded-full bg-muted text-muted-foreground font-semibold text-sm cursor-not-allowed"
                  >
                    Complet
                  </button>
                ) : (
                  <a
                    href="#reserver"
                    className="block w-full py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm text-center hover:bg-primary/90 transition-colors glow-amber-sm"
                  >
                    Réserver mes places →
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-heading font-bold text-2xl text-foreground mb-6">
              À propos du spectacle
            </h2>
            {show.longDescription.split("\n\n").map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Image placeholder */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="rounded-xl overflow-hidden aspect-video bg-accent border border-border relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center text-center px-8">
              <div>
                <div className="text-7xl mb-3">🎭</div>
                <p className="font-heading font-bold text-2xl text-foreground">
                  {show.title}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Affiche / photo du spectacle à ajouter ici.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weezevent embed */}
      <section
        className="py-16 bg-background spotlight-bg-subtle"
        id="reserver"
        aria-label="Réservation"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
              Billetterie
            </p>
            <h2 className="font-heading font-bold text-3xl text-foreground">
              Réservez vos places
            </h2>
          </div>
          <WeezeventEmbed
            weezeventCode={show.weezeventCode}
            showTitle={show.title}
          />
        </div>
      </section>

      {/* Related shows */}
      {relatedShows.length > 0 && (
        <section className="py-16 bg-card border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading font-bold text-2xl text-foreground mb-8">
              Autres {cat.label.toLowerCase()}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedShows.map((s) => (
                <ShowCard key={s.slug} show={s} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function InfoRow({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
}) {
  return (
    <div className="flex items-start gap-2 text-sm text-muted-foreground">
      <Icon size={14} className="text-primary shrink-0 mt-0.5" />
      <span>{label}</span>
    </div>
  );
}
