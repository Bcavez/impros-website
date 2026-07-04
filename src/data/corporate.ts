export type ServiceSlug =
  | "teambuilding"
  | "spectacles"
  | "animation-debats"
  | "ecoles";

export interface CorporateService {
  slug: ServiceSlug;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  longDescription: string;
  highlights: string[];
  formats: { name: string; duration: string; participants: string }[];
  image: string;
  icon: string; // Lucide icon name
  forWhom: string;
}

export const corporateServices: CorporateService[] = [
  {
    slug: "teambuilding",
    title: "Modules de Teambuilding",
    subtitle: "Renforcez la cohésion par le jeu",
    tagline: "Communiquez mieux. Osez plus. Riez ensemble.",
    description:
      "Des ateliers d'improvisation sur mesure pour développer la communication, la confiance et l'agilité mentale au sein de vos équipes.",
    longDescription: `L'improvisation théâtrale est bien plus qu'un divertissement. Elle mobilise exactement les compétences dont vos équipes ont besoin au quotidien : écoute active, adaptation au changement, confiance mutuelle et créativité collective.

Nos modules de teambuilding s'adaptent à votre secteur, vos objectifs et votre culture d'entreprise. Pas de jeux artificiels ou de discours théoriques — uniquement de l'action, de la présence et du rire.

Chaque atelier est animé par des formateurs expérimentés, comédiens professionnels, qui créent un espace sécurisé où tout le monde peut prendre des risques… et en tirer quelque chose de concret.`,
    highlights: [
      "Écoute active et communication non-verbale",
      "Adaptabilité et gestion du changement",
      "Confiance en soi et prise de parole",
      "Esprit d'équipe et co-création",
      "Gestion de l'échec et résilience",
    ],
    formats: [
      {
        name: "Demi-journée découverte",
        duration: "3h",
        participants: "8 à 20 personnes",
      },
      {
        name: "Journée intensive",
        duration: "6h",
        participants: "10 à 30 personnes",
      },
      {
        name: "Parcours sur plusieurs sessions",
        duration: "3 × 2h ou 5 × 2h",
        participants: "6 à 16 personnes",
      },
    ],
    image: "/images/corporate/teambuilding.jpg",
    icon: "Users",
    forWhom:
      "PME, grandes entreprises, startups, administrations, équipes RH, managers.",
  },
  {
    slug: "spectacles",
    title: "Spectacles d'Entreprise",
    subtitle: "Un moment unique pour vos événements",
    tagline: "Un show sur mesure. Votre entreprise, héros de la scène.",
    description:
      "Offrez à vos collaborateurs un spectacle d'improvisation entièrement adapté à votre univers d'entreprise : vos métiers, votre culture, vos anecdotes.",
    longDescription: `Nos comédiens créent un spectacle en direct à partir d'informations recueillies sur votre entreprise. Vos produits, vos métiers, vos moments marquants deviennent la matière d'un show improvisé hilarant et touchant.

Le public devient acteur : il propose des thèmes, vote, réagit. Une expérience fédératrice qui crée des souvenirs durables.

Formule idéale pour : soirées de fin d'année, séminaires, congrès, anniversaires d'entreprise, événements de lancement.`,
    highlights: [
      "Spectacle 100% personnalisé à votre entreprise",
      "Interaction avec le public garantie",
      "Format adaptable (45 min à 2h)",
      "Comédiens professionnels",
      "Logistique technique prise en charge",
    ],
    formats: [
      {
        name: "Mini-show",
        duration: "45 min",
        participants: "20 à 100 spectateurs",
      },
      {
        name: "Show complet",
        duration: "1h30",
        participants: "50 à 300 spectateurs",
      },
      {
        name: "Soirée de gala",
        duration: "2h",
        participants: "Jusqu'à 500 spectateurs",
      },
    ],
    image: "/images/corporate/spectacle.jpg",
    icon: "Theater",
    forWhom:
      "Grandes entreprises, événements de gala, conférences, soirées annuelles.",
  },
  {
    slug: "animation-debats",
    title: "Animation de Débats",
    subtitle: "Dynamisez vos événements et conférences",
    tagline: "Des idées qui s'affrontent. Une salle qui s'éveille.",
    description:
      "Des animateurs formés à l'improvisation pour faire vivre vos débats, tables rondes et conférences avec énergie, humour et rigueur.",
    longDescription: `Vos intervenants sont excellents, mais la salle s'endort ? Nos animateurs formés à l'improvisation insufflent de la vie dans vos débats et panels.

Grâce à des techniques d'improvisation, ils reformulent, synthétisent, relancent et maintiennent l'attention du public. L'impro n'est pas là pour faire le show — elle est au service de votre contenu.

Adaptable à tous les formats : tables rondes, débats d'experts, panels RH, conférences thématiques, assemblées générales participatives.`,
    highlights: [
      "Écoute et reformulation en temps réel",
      "Maintien de l'attention du public",
      "Gestion du temps et des débordements",
      "Éléments ludiques sans perdre le fond",
      "Préparation approfondie en amont",
    ],
    formats: [
      {
        name: "Table ronde animée",
        duration: "1h à 2h",
        participants: "30 à 200 personnes",
      },
      {
        name: "Conférence participative",
        duration: "2h à 3h",
        participants: "50 à 500 personnes",
      },
    ],
    image: "/images/corporate/debats.jpg",
    icon: "MessageSquare",
    forWhom:
      "Organisateurs d'événements, directions RH, think tanks, associations professionnelles.",
  },
  {
    slug: "ecoles",
    title: "Ateliers pour Écoles",
    subtitle: "L'impro au service de l'éducation",
    tagline: "Apprendre à écouter. Oser prendre sa place.",
    description:
      "Des ateliers d'improvisation spécialement conçus pour les classes du primaire au secondaire, adaptés aux objectifs pédagogiques des enseignants.",
    longDescription: `L'improvisation théâtrale est un outil pédagogique puissant pour développer la confiance en soi, l'expression orale, la concentration et la coopération chez les jeunes.

Nos formateurs travaillent en lien direct avec les enseignants pour intégrer les ateliers dans le projet éducatif de l'école. Chaque atelier est adapté à l'âge et au contexte du groupe.

Nous proposons aussi des spectacles scolaires en formule "classe sur scène" : les élèves improvisent devant leurs camarades dans un cadre bienveillant et festif.`,
    highlights: [
      "Ateliers adaptés de la 3e primaire au 6e secondaire",
      "En lien avec les objectifs du programme scolaire",
      "Développement de la confiance et de l'expression orale",
      "Option spectacle de fin d'atelier",
      "Formateurs expérimentés avec la jeunesse",
    ],
    formats: [
      {
        name: "Atelier découverte",
        duration: "1h30",
        participants: "1 classe (max 30 élèves)",
      },
      {
        name: "Parcours de 5 séances",
        duration: "5 × 1h30",
        participants: "1 classe",
      },
      {
        name: "Projet annuel + spectacle",
        duration: "Toute l'année + représentation",
        participants: "1 à 2 classes",
      },
    ],
    image: "/images/corporate/ecoles.jpg",
    icon: "GraduationCap",
    forWhom:
      "Écoles primaires et secondaires, Hautes Écoles, centres PMS, maisons de jeunes.",
  },
];

export function getServiceBySlug(slug: ServiceSlug): CorporateService | undefined {
  return corporateServices.find((s) => s.slug === slug);
}
