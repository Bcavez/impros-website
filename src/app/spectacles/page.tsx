import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ShowFilterTabs, ShowGrid } from "@/components/shared/ShowFilterTabs";
import { InstagramFeed } from "@/components/shared/InstagramFeed";
import { shows } from "@/data/shows";

export const metadata: Metadata = {
  title: "Spectacles d'improvisation à Bruxelles",
  description:
    "Découvrez tous les spectacles d'impro.be à Bruxelles : tournoi d'improvisation, spectacles pour enfants et festival de fin d'année. Réservez en ligne.",
  openGraph: {
    title: "Spectacles d'impro à Bruxelles — impro.be",
    description:
      "Tournois, spectacles enfants et festival : toute la programmation d'impro.be.",
  },
};

export default function SpectaclesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 spotlight-bg-subtle noise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Programmation"
            title="Nos spectacles"
            description="Des soirées uniques où chaque représentation est une première et une dernière. Tournois, spectacles famille et festival annuel."
            className="max-w-2xl"
          />
        </div>
      </section>

      {/* Listing */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ShowFilterTabs />
          <div className="mt-8">
            <ShowGrid shows={shows} />
          </div>
        </div>
      </section>

      {/* Instagram feed */}
      <InstagramFeed />
    </>
  );
}
