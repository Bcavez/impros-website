import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page introuvable — impro.be",
};

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center spotlight-bg noise">
      <div className="text-center px-4">
        <p className="font-heading font-extrabold text-8xl sm:text-9xl text-primary/30 leading-none">
          404
        </p>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mt-4">
          Cette page n&apos;existe pas
        </h1>
        <p className="mt-4 text-muted-foreground max-w-sm mx-auto">
          Vous avez peut-être suivi un lien obsolète, ou la page a été déplacée.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft size={16} />
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/spectacles"
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-semibold hover:border-primary/50 transition-colors"
          >
            Voir les spectacles
          </Link>
        </div>
      </div>
    </section>
  );
}
