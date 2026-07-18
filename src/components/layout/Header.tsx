"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/cours", label: "Cours" },
  { href: "/spectacles", label: "Spectacles" },
  { href: "/entreprises", label: "Entreprises" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Fragment>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled || open
            ? "bg-background/95 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="font-heading font-bold text-xl md:text-2xl text-foreground hover:text-primary transition-colors drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)]"
            >
              impro<span className="text-primary">.be</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)]",
                    pathname === href || pathname.startsWith(href + "/")
                      ? "text-primary"
                      : "text-foreground/85 hover:text-foreground"
                  )}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/spectacles"
                className="ml-4 px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors glow-amber-sm shadow-lg shadow-black/30"
              >
                Réserver
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)]"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 bg-card border-b border-border shadow-2xl shadow-black/50",
            open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <nav className="px-4 pb-6 pt-2 flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-4 py-3 rounded-md text-base font-medium transition-colors",
                  pathname === href || pathname.startsWith(href + "/")
                    ? "text-primary bg-accent"
                    : "text-foreground/90 hover:text-foreground hover:bg-accent"
                )}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/spectacles"
              className="mt-2 px-5 py-3 rounded-full bg-primary text-primary-foreground text-base font-semibold text-center hover:bg-primary/90 transition-colors glow-amber-sm"
            >
              Réserver un spectacle
            </Link>
          </nav>
        </div>
      </header>

      {/* Scrim: dims the page behind the open mobile menu for clear separation */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-16 z-40 bg-background/80 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
    </Fragment>
  );
}
