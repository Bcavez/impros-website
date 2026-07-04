export interface CourseLevel {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  forWhom: string;
  duration: string;
  schedule: string;
  price: number;
  priceDescription: string;
  highlights: string[];
}

export const courseLevels: CourseLevel[] = [
  {
    id: "debutants",
    name: "Débutants",
    subtitle: "Première scène, premiers pas",
    description:
      "Vous n'avez jamais fait d'impro ? C'est exactement là qu'il faut commencer. En douceur, avec humour et sans jugement, nos coachs vous guident à travers les fondamentaux de l'improvisation.",
    forWhom:
      "Pour toute personne curieuse à partir de 18 ans, sans aucune expérience de théâtre ou d'improvisation.",
    duration: "Parcours de 30 semaines (saison de septembre à juin)",
    schedule: "1 séance de 2h par semaine, le soir",
    price: 580,
    priceDescription: "pour la saison complète, paiement en 2 fois possible",
    highlights: [
      "Petits groupes (max. 14 personnes)",
      "Atmosphère bienveillante et ludique",
      "Progression pédagogique structurée",
      "Spectacle de fin de saison inclus",
    ],
  },
  {
    id: "confirmes",
    name: "Confirmés",
    subtitle: "Aller plus loin dans l'instant",
    description:
      "Vous avez déjà une ou plusieurs saisons au compteur ? Ce groupe est fait pour vous affiner, challenger et pousser vos limites créatives. Travail sur les longues formes, les émotions et l'écoute profonde.",
    forWhom:
      "Pour les improvisateurs ayant déjà suivi au moins une année de cours (ou équivalent).",
    duration: "Parcours de 30 semaines (saison de septembre à juin)",
    schedule: "1 séance de 2h30 par semaine, le soir",
    price: 620,
    priceDescription: "pour la saison complète, paiement en 2 fois possible",
    highlights: [
      "Travail sur les longues formes",
      "Exploration émotionnelle approfondie",
      "Mise en jeu de spectacles",
      "Invités professionnels réguliers",
    ],
  },
];

export interface InitiationDay {
  nextDate: string; // ISO 8601
  time: string;
  endTime: string;
  venue: string;
  address: string;
  city: string;
  price: number;
  maxParticipants: number;
  description: string;
  programme: string[];
}

export const initiationDay: InitiationDay = {
  nextDate: "2026-09-06",
  time: "10:00",
  endTime: "17:00",
  venue: "Studio impro.be",
  address: "Rue de la Samaritaine, 40",
  city: "Ixelles 1050",
  price: 45,
  maxParticipants: 20,
  description:
    "La journée d'initiation à l'improvisation est le meilleur moyen de découvrir l'impro dans un cadre sécurisant et bienveillant. En une seule journée intensive, vous repartirez avec les bases et… l'envie de recommencer.",
  programme: [
    "10h00 — Accueil et présentation",
    "10h30 — Jeux de confiance et d'écoute",
    "12h30 — Pause déjeuner (non incluse)",
    "13h30 — Premiers exercices de scène",
    "15h00 — Courtes scènes improvisées",
    "16h30 — Bilan et présentation des cours de la saison",
    "17h00 — Fin de la journée",
  ],
};
