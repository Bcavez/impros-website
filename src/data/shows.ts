export type ShowCategory = "tournoi" | "enfants" | "festival";

export interface Show {
  slug: string;
  category: ShowCategory;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  date: string; // ISO 8601
  endDate?: string;
  time: string;
  venue: string;
  address: string;
  city: string;
  priceAdult: number;
  priceChild?: number;
  priceReduced?: number;
  image: string;
  weezeventCode: string; // placeholder for Weezevent embed URL
  tags: string[];
  isFeatured?: boolean;
  soldOut?: boolean;
}

export const shows: Show[] = [
  // ─── Tournoi ──────────────────────────────────────────────────────────────
  {
    slug: "tournoi-automne-2026",
    category: "tournoi",
    title: "Grand Tournoi d'Impro — Automne 2026",
    tagline: "Quatre équipes. Une scène. Aucun scénario.",
    description:
      "Le public est juge ! Quatre équipes s'affrontent dans des joutes d'improvisation où créativité, écoute et audace sont les seules règles du jeu.",
    longDescription: `Le Grand Tournoi d'Improvisation revient pour une nouvelle saison explosive ! Dans la tradition des tournois de hockey comédie, quatre équipes s'affrontent sur scène dans une série de matchs impros jugés par le public.

Chaque équipe reçoit des thèmes imposés en temps réel et doit créer des scènes originales, drôles et touchantes devant vos yeux. Le public vote, applaudit, siffle — vous êtes le vrai juge de la soirée.

Une expérience unique mêlant théâtre, humour et participation du public pour une soirée inoubliable.`,
    date: "2026-10-17",
    time: "20:00",
    venue: "Théâtre Molière",
    address: "Place du Martyrs, 3",
    city: "Bruxelles 1000",
    priceAdult: 18,
    priceReduced: 14,
    image: "/images/shows/tournoi-automne.jpg",
    weezeventCode: "https://www.weezevent.com/widget/v3/placeholder/tournoi-automne-2026",
    tags: ["Tournoi", "Tout public", "Dès 12 ans"],
    isFeatured: true,
  },
  {
    slug: "tournoi-printemps-2027",
    category: "tournoi",
    title: "Grand Tournoi d'Impro — Printemps 2027",
    tagline: "Le public choisit son équipe favorite !",
    description:
      "Retour du célèbre tournoi d'impro de Bruxelles pour une édition printanière haute en couleurs.",
    longDescription: `Le tournoi d'improvisation le plus attendu de Bruxelles revient au printemps ! Des équipes de comédiens improvisateurs s'affrontent dans des joutes créatives où la rapidité d'esprit et la générosité sur scène font la différence.

Matchs chronométrés, thèmes insolites, réactions du public en direct — une soirée garantie sans temps mort.`,
    date: "2027-03-20",
    time: "20:30",
    venue: "Centre Culturel d'Ixelles",
    address: "Chaussée d'Ixelles, 255",
    city: "Ixelles 1050",
    priceAdult: 18,
    priceReduced: 14,
    image: "/images/shows/tournoi-printemps.jpg",
    weezeventCode: "https://www.weezevent.com/widget/v3/placeholder/tournoi-printemps-2027",
    tags: ["Tournoi", "Tout public", "Dès 12 ans"],
  },

  // ─── Enfants ──────────────────────────────────────────────────────────────
  {
    slug: "spectacle-enfants-septembre-2026",
    category: "enfants",
    title: "L'Impro des Petits Grands",
    tagline: "Un spectacle d'impro créé par et pour les enfants.",
    description:
      "Nos jeunes comédiens de 8 à 14 ans vous présentent leurs créations spontanées dans un spectacle aussi drôle qu'émouvant.",
    longDescription: `Fruits de mois d'ateliers hebdomadaires, nos jeunes improvisateurs de 8 à 14 ans montent sur scène pour la première fois devant un grand public.

Au programme : scènes improvisées sur des thèmes proposés par le public, mini-matchs entre équipes juniors et moments de magie pure nés de l'instant présent. Un spectacle accessible à toute la famille, idéal pour les enfants à partir de 5 ans.

Les billets "Enfant" sont disponibles pour les moins de 12 ans.`,
    date: "2026-09-19",
    time: "15:00",
    venue: "Centre Culturel d'Auderghem",
    address: "183 Boulevard du Souverain",
    city: "Auderghem 1160",
    priceAdult: 15.99,
    priceChild: 12.99,
    image: "/images/shows/enfants-sept.jpg",
    weezeventCode: "https://www.weezevent.com/widget/v3/placeholder/enfants-septembre-2026",
    tags: ["Enfants", "Famille", "Dès 5 ans"],
    isFeatured: true,
  },
  {
    slug: "spectacle-enfants-decembre-2026",
    category: "enfants",
    title: "Conte d'Hiver Improvisé",
    tagline: "Un conte de Noël… mais personne ne sait comment il finit.",
    description:
      "Un spectacle magique pour toute la famille : nos jeunes comédiens créent un conte de Noël en direct, au fil des propositions du public.",
    longDescription: `Pour les fêtes de fin d'année, nos jeunes comédiens vous offrent un conte dont vous écrirez la fin ! Princes, sorcières, lutins, rennes volants… tout peut arriver quand l'improvisation prend les commandes.

Un spectacle chaleureux et participatif, parfait pour un après-midi en famille avant les fêtes.`,
    date: "2026-12-13",
    time: "15:00",
    venue: "Centre Culturel d'Auderghem",
    address: "183 Boulevard du Souverain",
    city: "Auderghem 1160",
    priceAdult: 15.99,
    priceChild: 12.99,
    image: "/images/shows/enfants-dec.jpg",
    weezeventCode: "https://www.weezevent.com/widget/v3/placeholder/enfants-decembre-2026",
    tags: ["Enfants", "Famille", "Noël", "Dès 4 ans"],
  },

  // ─── Festival ─────────────────────────────────────────────────────────────
  {
    slug: "festival-fin-annee-2026",
    category: "festival",
    title: "Festival Impro.be — La Fête de Fin d'Année",
    tagline: "Trois jours. Vingt équipes. Mille possibilités.",
    description:
      "Le festival annuel qui célèbre une saison entière de création collective. Spectacles de fin de parcours, matchs invités, fête et impros en continu.",
    longDescription: `Le Festival de Fin d'Année est LE rendez-vous incontournable de la scène impro bruxelloise. Pendant trois jours, toutes les équipes de la saison présentent leur création finale, des troupes invitées de Belgique et d'ailleurs apportent leur énergie unique.

Au programme :
- Spectacles de remise de diplômes pour les élèves de l'année
- Matchs de gala avec des équipes invitées
- Scènes ouvertes le samedi soir
- Soirée de clôture festive

Billets disponibles à la journée ou pour les 3 jours (pass festival).`,
    date: "2026-06-05",
    endDate: "2026-06-07",
    time: "19:00",
    venue: "La Maison des Cultures",
    address: "Rue des Echevins, 74",
    city: "Ixelles 1050",
    priceAdult: 22,
    priceReduced: 17,
    image: "/images/shows/festival.jpg",
    weezeventCode: "https://www.weezevent.com/widget/v3/placeholder/festival-2026",
    tags: ["Festival", "Tout public", "Pass 3 jours"],
  },
];

export const showCategories: Record<
  ShowCategory,
  { label: string; description: string; seoTitle: string; seoDescription: string }
> = {
  tournoi: {
    label: "Tournoi d'impro",
    description:
      "Des équipes s'affrontent sur scène, le public vote. Le format le plus festif de l'impro !",
    seoTitle: "Tournoi d'improvisation à Bruxelles",
    seoDescription:
      "Assistez aux tournois d'improvisation d'impro.be à Bruxelles : quatre équipes, un public juge, des scènes créées en direct. Réservez vos places.",
  },
  enfants: {
    label: "Spectacles enfants",
    description:
      "Des spectacles d'impro accessibles dès 4 ans, joués par nos jeunes comédiens ou conçus pour toute la famille.",
    seoTitle: "Spectacle d'impro pour enfants à Bruxelles",
    seoDescription:
      "Spectacles d'improvisation pour enfants et familles à Bruxelles avec impro.be. Des shows créatifs, participatifs et accessibles dès 4 ans.",
  },
  festival: {
    label: "Festival",
    description:
      "Le grand rendez-vous annuel : plusieurs jours de créations, d'invités et de célébration collective.",
    seoTitle: "Festival d'improvisation à Bruxelles",
    seoDescription:
      "Le Festival d'improvisation d'impro.be : plusieurs jours de spectacles, d'ateliers ouverts et de rencontres artistiques à Bruxelles.",
  },
};

export function getShowsByCategory(category: ShowCategory): Show[] {
  return shows.filter((s) => s.category === category);
}

export function getShowBySlug(category: ShowCategory, slug: string): Show | undefined {
  return shows.find((s) => s.category === category && s.slug === slug);
}

export function getFeaturedShows(): Show[] {
  return shows.filter((s) => s.isFeatured);
}

export function getUpcomingShows(limit = 3): Show[] {
  const now = new Date();
  return shows
    .filter((s) => new Date(s.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
}

export function formatShowDate(isoDate: string, endDate?: string): string {
  const opts: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const start = new Date(isoDate).toLocaleDateString("fr-BE", opts);
  if (!endDate) return start;
  const end = new Date(endDate).toLocaleDateString("fr-BE", opts);
  return `${start} — ${end}`;
}
