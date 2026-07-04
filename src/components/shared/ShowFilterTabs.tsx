"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { showCategories, type ShowCategory } from "@/data/shows";

const tabs = [
  { href: "/spectacles", label: "Tous" },
  ...Object.entries(showCategories).map(([slug, cat]) => ({
    href: `/spectacles/${slug}`,
    label: cat.label,
  })),
];

export function ShowFilterTabs() {
  const pathname = usePathname();

  return (
    <nav
      className="flex flex-wrap gap-2"
      aria-label="Filtrer par catégorie"
    >
      {tabs.map(({ href, label }) => {
        const isActive =
          href === "/spectacles"
            ? pathname === "/spectacles"
            : pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium transition-all",
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

interface ShowGridProps {
  activeCategory?: ShowCategory;
  shows: import("@/data/shows").Show[];
}

export function ShowGrid({ shows }: ShowGridProps) {
  if (shows.length === 0) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        <p className="text-4xl mb-4">🎭</p>
        <p className="text-lg">Aucun spectacle dans cette catégorie pour le moment.</p>
        <p className="text-sm mt-2">Revenez bientôt pour découvrir notre programmation !</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {shows.map((show) => (
        <ShowCardImport key={show.slug} show={show} />
      ))}
    </div>
  );
}

import { ShowCard as ShowCardImport } from "@/components/shared/ShowCard";
