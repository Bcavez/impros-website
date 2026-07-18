"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState, useEffect, useRef } from "react";
import { Menu, X, Sun, Moon, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { ACCENT_COLORS } from "@/lib/colors";
import { useAccentColor } from "@/components/layout/ColorProvider";

const navLinks = [
  { href: "/cours", label: "Cours" },
  { href: "/spectacles", label: "Spectacles" },
  { href: "/entreprises", label: "Entreprises" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — render only after mount
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={cn("w-9 h-9", className)} aria-hidden />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      title={isDark ? "Mode clair" : "Mode sombre"}
      className={cn(
        "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200",
        "border border-border hover:border-primary/50 hover:text-primary",
        "text-muted-foreground",
        className
      )}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

function ColorPicker({ className }: { className?: string }) {
  const { colorId, setColorId } = useAccentColor();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  if (!mounted) return <div className={cn("w-9 h-9", className)} aria-hidden />;

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Choisir la couleur d'accent"
        title="Couleur d'accent"
        className={cn(
          "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200",
          "border border-border hover:border-primary/50 hover:text-primary",
          "text-muted-foreground",
          open && "border-primary/50 text-primary"
        )}
      >
        <Palette size={16} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 p-3 rounded-xl bg-card border border-border shadow-2xl shadow-black/40 z-50 min-w-[160px]">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2.5 px-0.5">
            Couleur d&apos;accent
          </p>
          <div className="grid grid-cols-4 gap-2">
            {ACCENT_COLORS.map((color) => {
              const isActive = colorId === color.id;
              return (
                <button
                  key={color.id}
                  onClick={() => {
                    setColorId(color.id);
                    setOpen(false);
                  }}
                  title={color.label}
                  aria-label={color.label}
                  aria-pressed={isActive}
                  className={cn(
                    "w-7 h-7 rounded-full transition-all duration-150 hover:scale-110",
                    isActive
                      ? "ring-2 ring-offset-2 ring-offset-card ring-foreground scale-110"
                      : "ring-1 ring-transparent hover:ring-foreground/20"
                  )}
                  style={{ background: `oklch(${color.oklch})` }}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

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
              className={cn(
                "font-heading font-bold text-xl md:text-2xl hover:text-primary transition-colors",
                scrolled ? "text-foreground" : "text-white"
              )}
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
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === href || pathname.startsWith(href + "/")
                      ? "text-primary"
                      : scrolled
                        ? "text-foreground/80 hover:text-foreground"
                        : "text-white/80 hover:text-white"
                  )}
                >
                  {label}
                </Link>
              ))}
              <div className="flex items-center gap-1 mx-2">
                <ColorPicker />
                <ThemeToggle />
              </div>
              <Link
                href="/spectacles"
                className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors glow-amber-sm"
              >
                Réserver
              </Link>
            </nav>

            {/* Mobile: color picker + theme toggle + burger */}
            <div className="md:hidden flex items-center gap-1">
              <ColorPicker />
              <ThemeToggle />
              <button
                className={cn(
                "p-2 hover:text-primary transition-colors",
                scrolled || open ? "text-foreground" : "text-white"
              )}
                onClick={() => setOpen(!open)}
                aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={open}
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 bg-card border-b border-border",
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
              className="mt-2 px-5 py-3 rounded-full bg-primary text-primary-foreground text-base font-semibold text-center hover:bg-primary/90 transition-colors"
            >
              Réserver un spectacle
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile scrim */}
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
