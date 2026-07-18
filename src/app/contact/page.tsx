import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/shared/SocialIcons";
import { ContactForm } from "@/components/shared/ContactForm";

export const metadata: Metadata = {
  title: "Contact — impro.be",
  description:
    "Contactez impro.be pour toute question sur les cours, les spectacles ou les services pour entreprises. Nous répondons sous 48h.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 spotlight-bg-subtle noise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
            Contact
          </p>
          <h1 className="font-heading font-bold text-5xl sm:text-6xl text-foreground leading-none tracking-tight">
            Parlons-nous
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Une question sur les cours, les spectacles ou nos services pour
            entreprises ? Écrivez-nous, on vous répond rapidement.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Info */}
            <div className="lg:col-span-2 space-y-8">
              <ContactInfo
                icon={Mail}
                label="E-mail"
                value="info@impro.be"
                href="mailto:info@impro.be"
              />
              <ContactInfo
                icon={Phone}
                label="Téléphone"
                value="+32 2 000 00 00"
                href="tel:+3220000000"
              />
              <ContactInfo
                icon={MapPin}
                label="Adresse"
                value="Rue de la Samaritaine, 40 — Ixelles 1050, Bruxelles"
              />
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Clock size={15} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    Heures de bureau
                  </span>
                </div>
                <p className="text-sm text-muted-foreground pl-12">
                  Lundi — vendredi : 10h – 18h
                  <br />
                  Réponse garantie sous 48h ouvrables.
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-3">
                  Suivez-nous
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com/improbe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                    aria-label="Instagram"
                  >
                    <InstagramIcon size={16} />
                  </a>
                  <a
                    href="https://facebook.com/improbe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                    aria-label="Facebook"
                  >
                    <FacebookIcon size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactInfo({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
        <Icon size={15} className="text-primary" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
        {href ? (
          <a
            href={href}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors mt-0.5 block"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm font-medium text-foreground mt-0.5">{value}</p>
        )}
      </div>
    </div>
  );
}
