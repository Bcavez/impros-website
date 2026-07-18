import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Show, formatShowDate } from "@/data/shows";
import { cn } from "@/lib/utils";

interface ShowCardProps {
  show: Show;
  variant?: "default" | "featured";
  className?: string;
}

export function ShowCard({ show, variant = "default", className }: ShowCardProps) {
  const href = `/spectacles/${show.category}/${show.slug}`;

  return (
    <Link
      href={href}
      className={cn(
        "group block rounded-xl border border-border bg-card overflow-hidden",
        "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300",
        variant === "featured" && "ring-1 ring-primary/30",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-video bg-accent overflow-hidden">
        <Image
          src={show.image}
          alt={show.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {show.isFeatured && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary text-primary-foreground text-xs font-semibold">
              À l&apos;affiche
            </Badge>
          </div>
        )}
        {show.soldOut && (
          <div className="absolute top-3 right-3">
            <Badge variant="destructive" className="text-xs">
              Complet
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {show.tags.slice(0, 2).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs bg-accent text-muted-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-snug">
          {show.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {show.description}
        </p>

        <div className="mt-4 space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar size={12} className="text-primary shrink-0" />
            <span>{formatShowDate(show.date, show.endDate)} · {show.time}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin size={12} className="text-primary shrink-0" />
            <span>
              {show.venue}, {show.city}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary font-heading">
              {show.priceAdult.toFixed(2).replace(".", ",")} €
            </span>
            <span className="text-xs text-muted-foreground ml-1">/ adulte</span>
          </div>
          <span className="flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
            Réserver <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
