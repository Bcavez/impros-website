import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/shared/SocialIcons";

const footerLinks = {
  cours: [
    { href: "/cours", label: "Cours pour débutants" },
    { href: "/cours#confirmes", label: "Cours pour confirmés" },
    { href: "/cours/initiation", label: "Journée d'initiation" },
  ],
  spectacles: [
    { href: "/spectacles/tournoi", label: "Tournoi d'impro" },
    { href: "/spectacles/enfants", label: "Spectacles enfants" },
    { href: "/spectacles/festival", label: "Festival de fin d'année" },
  ],
  entreprises: [
    { href: "/entreprises/teambuilding", label: "Teambuilding" },
    { href: "/entreprises/spectacles", label: "Spectacles d'entreprise" },
    { href: "/entreprises/animation-debats", label: "Animation de débats" },
    { href: "/entreprises/ecoles", label: "Ateliers pour écoles" },
  ],
  info: [
    { href: "/a-propos", label: "À propos" },
    { href: "/contact", label: "Contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-heading font-bold text-2xl text-foreground hover:text-primary transition-colors"
            >
              impro<span className="text-primary">.be</span>
            </Link>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-xs">
              La compagnie d'improvisation théâtrale de Bruxelles. Cours,
              spectacles, tournois et ateliers pour tous les niveaux.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://instagram.com/improbe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href="https://facebook.com/improbe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon size={20} />
              </a>
              <a
                href="https://youtube.com/@improbe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon size={20} />
              </a>
            </div>
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-primary shrink-0" />
                <span>Bruxelles, Belgique</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-primary shrink-0" />
                <a
                  href="mailto:info@impro.be"
                  className="hover:text-foreground transition-colors"
                >
                  info@impro.be
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-primary shrink-0" />
                <span>+32 2 000 00 00</span>
              </div>
            </div>
          </div>

          {/* Cours */}
          <div>
            <h3 className="font-heading font-semibold text-sm text-foreground uppercase tracking-wider mb-4">
              Cours
            </h3>
            <ul className="space-y-2">
              {footerLinks.cours.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Spectacles */}
          <div>
            <h3 className="font-heading font-semibold text-sm text-foreground uppercase tracking-wider mb-4">
              Spectacles
            </h3>
            <ul className="space-y-2">
              {footerLinks.spectacles.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprises + Info */}
          <div>
            <h3 className="font-heading font-semibold text-sm text-foreground uppercase tracking-wider mb-4">
              Entreprises
            </h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.entreprises.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-heading font-semibold text-sm text-foreground uppercase tracking-wider mb-4">
              Infos
            </h3>
            <ul className="space-y-2">
              {footerLinks.info.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider-glow mt-12 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} impro.be — Tous droits réservés.</p>
          <p>
            Conçu avec passion à Bruxelles.
          </p>
        </div>
      </div>
    </footer>
  );
}
