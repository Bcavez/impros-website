import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ShowFilterTabs, ShowGrid } from "@/components/shared/ShowFilterTabs";
import {
  showCategories,
  getShowsByCategory,
  type ShowCategory,
} from "@/data/shows";

interface Props {
  params: Promise<{ categorie: string }>;
}

export async function generateStaticParams() {
  return Object.keys(showCategories).map((cat) => ({ categorie: cat }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorie } = await params;
  const cat = showCategories[categorie as ShowCategory];
  if (!cat) return {};

  return {
    title: cat.seoTitle,
    description: cat.seoDescription,
    openGraph: {
      title: `${cat.seoTitle} — impro.be`,
      description: cat.seoDescription,
    },
  };
}

export default async function CategorieSpectaclesPage({ params }: Props) {
  const { categorie } = await params;
  const cat = showCategories[categorie as ShowCategory];
  if (!cat) notFound();

  const filteredShows = getShowsByCategory(categorie as ShowCategory);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 spotlight-bg-subtle noise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Spectacles"
            title={cat.label}
            description={cat.description}
            className="max-w-2xl"
          />
        </div>
      </section>

      {/* Listing */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ShowFilterTabs />
          <div className="mt-8">
            <ShowGrid shows={filteredShows} />
          </div>
        </div>
      </section>
    </>
  );
}
