"use client";

import { useState } from "react";
import { Loader2, Ticket } from "lucide-react";

interface WeezeventEmbedProps {
  weezeventCode: string;
  showTitle: string;
}

export function WeezeventEmbed({ weezeventCode, showTitle }: WeezeventEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  const isPlaceholder = weezeventCode.includes("placeholder");

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-border flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
          <Ticket size={16} className="text-primary" />
        </div>
        <div>
          <p className="font-semibold text-sm text-foreground">
            Réservation — {showTitle}
          </p>
          <p className="text-xs text-muted-foreground">
            Paiement sécurisé via Weezevent
          </p>
        </div>
      </div>

      {/* Iframe area */}
      <div className="relative" style={{ minHeight: 500 }}>
        {!loaded && !isPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-card z-10">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <Loader2 size={32} className="animate-spin text-primary" />
              <p className="text-sm">Chargement du module de réservation…</p>
            </div>
          </div>
        )}

        {isPlaceholder ? (
          /* Prototype placeholder */
          <div className="p-8 flex flex-col items-center justify-center text-center gap-4 min-h-[500px]">
            <div className="text-6xl">🎟️</div>
            <div>
              <p className="font-heading font-bold text-xl text-foreground mb-2">
                Module Weezevent
              </p>
              <p className="text-sm text-muted-foreground max-w-xs">
                Le widget de réservation Weezevent s&apos;affichera ici. Chaque
                spectacle dispose d&apos;un code Weezevent à renseigner dans les
                données.
              </p>
              <p className="mt-4 text-xs text-muted-foreground/60 font-mono bg-accent rounded px-3 py-2 inline-block">
                {weezeventCode}
              </p>
            </div>
            <a
              href="https://www.weezevent.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Voir Weezevent
            </a>
          </div>
        ) : (
          <iframe
            src={weezeventCode}
            title={`Réserver — ${showTitle}`}
            className="w-full border-0"
            style={{ minHeight: 700 }}
            onLoad={() => setLoaded(true)}
            allow="payment"
          />
        )}
      </div>
    </div>
  );
}
