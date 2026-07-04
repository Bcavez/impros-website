import { InstagramIcon } from "@/components/shared/SocialIcons";

const mockPosts = [
  { id: 1, emoji: "🎭", caption: "Soirée de tournoi — 4 équipes, 1 public juge !" },
  { id: 2, emoji: "✨", caption: "Répétitions en cours pour notre prochain spectacle" },
  { id: 3, emoji: "🎪", caption: "Les enfants de la troupe junior sur scène !" },
  { id: 4, emoji: "🏆", caption: "Les lauréats du Tournoi d'Automne 2025" },
  { id: 5, emoji: "🎉", caption: "Festival de fin d'année — 3 jours inoubliables" },
  { id: 6, emoji: "🎬", caption: "Atelier teambuilding pour une grande entreprise" },
];

export function InstagramFeed() {
  return (
      <section className="py-20 bg-background" aria-label="Nos dernières publications Instagram">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <InstagramIcon size={18} className="text-primary" />
              <p className="text-primary font-semibold text-sm uppercase tracking-widest">
                Instagram
              </p>
            </div>
            <h2 className="font-heading font-bold text-3xl text-foreground">
              Suivez nos coulisses
            </h2>
          </div>
          <a
            href="https://instagram.com/improbe"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <InstagramIcon size={15} />
            @improbe
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {mockPosts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com/improbe"
              target="_blank"
              rel="noopener noreferrer"
              className="group aspect-square rounded-lg bg-card border border-border overflow-hidden relative hover:border-primary/50 transition-all duration-300"
              aria-label={post.caption}
            >
              {/* Placeholder content */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl sm:text-4xl">{post.emoji}</span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                <p className="text-xs text-center text-foreground leading-tight line-clamp-3">
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Aperçu illustratif — les vraies photos Instagram apparaîtront ici via embed.
        </p>
      </div>
    </section>
  );
}
