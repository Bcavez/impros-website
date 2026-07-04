# impro.be — Spécification technique et fonctionnelle

> Document de référence du prototype de rebranding impro.be.  
> Version 1.0 — Juillet 2026

---

## Table des matières

1. [Vue d'ensemble](#1-vue-densemble)
2. [Stack technique](#2-stack-technique)
3. [Architecture du projet](#3-architecture-du-projet)
4. [Identité visuelle](#4-identité-visuelle)
5. [Structure des pages et routing](#5-structure-des-pages-et-routing)
6. [Modèle de données](#6-modèle-de-données)
7. [Composants réutilisables](#7-composants-réutilisables)
8. [Formulaires et validation](#8-formulaires-et-validation)
9. [SEO et métadonnées](#9-seo-et-métadonnées)
10. [Intégration Weezevent](#10-intégration-weezevent)
11. [Build, déploiement et Git](#11-build-déploiement-et-git)
12. [Checklist avant mise en production](#12-checklist-avant-mise-en-production)

---

## 1. Vue d'ensemble

### Contexte

**impro.be** est une compagnie d'improvisation théâtrale basée à Bruxelles. Ce prototype constitue le nouveau site institutionnel, destiné à remplacer l'ancien site WordPress `impro.be` et à intégrer les contenus de `improcorporate.be`.

### Objectifs du site

| Objectif | Priorité |
|---|---|
| Informer et inscrire aux cours | Haute |
| Vendre des billets pour les spectacles | Haute |
| Générer des leads pour les services corporate | Haute |
| Référencement naturel (SEO) local Bruxelles | Haute |
| Refléter l'identité moderne et jeune de la compagnie | Haute |

### Langue

Tout le contenu est en **français** (locale `fr-BE`). Pas de version multilingue prévue pour ce prototype.

---

## 2. Stack technique

### Dépendances principales

| Outil | Version | Rôle |
|---|---|---|
| Next.js | 16.2.x (App Router) | Framework fullstack React, SSG, routing |
| React | 19.x | UI library |
| TypeScript | 5.x | Typage statique |
| Tailwind CSS | 4.x | Utilitaires CSS |
| shadcn/ui | 4.x | Composants UI de base (Radix primitives) |
| react-hook-form | dernière | Gestion des formulaires |
| Zod | 4.x | Validation des schémas de formulaire |
| @hookform/resolvers | dernière | Pont Zod ↔ react-hook-form |
| lucide-react | 1.x | Icônes UI (hors icônes de marques) |
| next/font | (inclus) | Chargement optimisé des polices Google |

> **Note Zod v4** : L'API des énumérations a changé entre Zod v3 et v4. `required_error` est remplacé par `message`. Dans le code du projet, les validations d'enum utilisent `z.enum(values, { message: "..." })`.

> **Note icônes de marques** : `lucide-react` ne fournit pas les icônes Instagram, Facebook, YouTube. Des composants SVG personnalisés sont définis dans `src/components/shared/SocialIcons.tsx`.

### Polices

Les polices sont chargées via `next/font/google` (zéro layout shift, stockage local automatique par Next.js) :

| Variable CSS | Police | Graisses | Utilisation |
|---|---|---|---|
| `--font-display` | **Syne** | 600, 700, 800 | Tous les titres `h1`–`h6` et éléments de marque |
| `--font-body` | **Outfit** | 300, 400, 500, 600 | Corps de texte, labels, UI |

### Mode couleur

Le site est **exclusivement en mode sombre** (dark-mode-only). La classe `dark` est ajoutée statiquement à l'élément `<html>`. Il n'y a pas de toggle light/dark.

---

## 3. Architecture du projet

### Arborescence des fichiers

```
impros/
├── public/
│   └── images/
│       ├── shows/          ← Affiches des spectacles (à ajouter)
│       └── corporate/      ← Photos des ateliers (à ajouter)
├── src/
│   ├── app/                ← Pages (Next.js App Router)
│   │   ├── layout.tsx              Root layout (Header, Footer, fonts, JSON-LD)
│   │   ├── page.tsx                Homepage /
│   │   ├── not-found.tsx           Page 404 branded
│   │   ├── sitemap.ts              Sitemap XML auto-généré
│   │   ├── robots.ts               robots.txt auto-généré
│   │   ├── cours/
│   │   │   ├── page.tsx            /cours
│   │   │   └── initiation/
│   │   │       └── page.tsx        /cours/initiation
│   │   ├── spectacles/
│   │   │   ├── page.tsx            /spectacles
│   │   │   └── [categorie]/
│   │   │       ├── page.tsx        /spectacles/[categorie]
│   │   │       └── [slug]/
│   │   │           └── page.tsx    /spectacles/[categorie]/[slug]
│   │   ├── entreprises/
│   │   │   ├── page.tsx            /entreprises
│   │   │   └── [service]/
│   │   │       └── page.tsx        /entreprises/[service]
│   │   ├── a-propos/
│   │   │   └── page.tsx            /a-propos
│   │   └── contact/
│   │       └── page.tsx            /contact
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          Navigation principale sticky
│   │   │   └── Footer.tsx          Pied de page
│   │   ├── shared/                 Composants métier réutilisables
│   │   │   ├── SectionHeading.tsx
│   │   │   ├── ShowCard.tsx
│   │   │   ├── ShowFilterTabs.tsx
│   │   │   ├── WeezeventEmbed.tsx
│   │   │   ├── InstagramFeed.tsx
│   │   │   ├── SubscriptionForm.tsx
│   │   │   ├── DevisForm.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   ├── JsonLd.tsx
│   │   │   └── SocialIcons.tsx
│   │   └── ui/                     Composants shadcn/ui (auto-générés)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── badge.tsx
│   │       ├── tabs.tsx
│   │       ├── accordion.tsx
│   │       ├── dialog.tsx
│   │       ├── sheet.tsx
│   │       └── separator.tsx
│   ├── data/                       Contenu statique typé
│   │   ├── shows.ts
│   │   ├── courses.ts
│   │   └── corporate.ts
│   └── lib/
│       └── utils.ts                Helper `cn()` (clsx + tailwind-merge)
├── .gitattributes
├── .gitignore
├── components.json                 Config shadcn/ui
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── SPEC.md                         ← Ce document
└── tsconfig.json
```

### Rendu des pages

Toutes les pages sont **statiquement générées (SSG)** au moment du build. Il n'y a pas de rendering serveur à la requête (SSR) ni de routes dynamiques non-paramétrées. Les routes dynamiques utilisent `generateStaticParams()` pour pré-générer tous les slugs connus.

```
Route (app)
○  /                                    Static
○  /cours                               Static
○  /cours/initiation                    Static
○  /spectacles                          Static
●  /spectacles/[categorie]              SSG (tournoi | enfants | festival)
●  /spectacles/[categorie]/[slug]       SSG (6 shows × leur catégorie)
○  /entreprises                         Static
●  /entreprises/[service]               SSG (4 services)
○  /a-propos                            Static
○  /contact                             Static
○  /sitemap.xml                         Static
○  /robots.txt                          Static
```

---

## 4. Identité visuelle

### Palette de couleurs (CSS custom properties, format OKLCH)

| Token | Valeur OKLCH | Usage |
|---|---|---|
| `--background` | `oklch(0.07 0.009 280)` | Fond de page — quasi-noir légèrement froid |
| `--foreground` | `oklch(0.94 0.012 85)` | Texte principal — blanc cassé chaud |
| `--card` | `oklch(0.11 0.01 275)` | Surfaces élevées (cards, popover) |
| `--primary` / `--amber` | `oklch(0.76 0.158 72)` | Accent ambre/or — la couleur de marque |
| `--primary-foreground` | `oklch(0.07 0.009 280)` | Texte sur fond ambre |
| `--muted` | `oklch(0.14 0.01 275)` | Fonds secondaires |
| `--muted-foreground` | `oklch(0.56 0.01 85)` | Textes discrets, labels |
| `--border` | `oklch(1 0 0 / 8%)` | Séparateurs subtils |
| `--input` | `oklch(1 0 0 / 12%)` | Arrière-plan des champs de formulaire |
| `--ring` | `oklch(0.76 0.158 72)` | Outline focus — même que `--primary` |

### Utilitaires visuels personnalisés

Définis dans `globals.css` :

| Classe | Effet |
|---|---|
| `.spotlight-bg` | Dégradé radial ambre subtil centré en haut (hero) |
| `.spotlight-bg-subtle` | Variante plus douce pour les sections secondaires |
| `.glow-amber` | Box-shadow ambre large (boutons CTA principaux) |
| `.glow-amber-sm` | Box-shadow ambre compact |
| `.text-glow` | Text-shadow ambre pour les grands titres de marque |
| `.noise` | Pseudo-élément `::after` avec texture de bruit SVG (opacité 4%) |
| `.divider-glow` | Séparateur horizontal avec dégradé ambre centré |
| `.animate-fade-up` | Animation `translateY(24px) → 0` sur 0.6s |
| `.animate-fade-up-[1-4]` | Versions avec délai 0.1s–0.4s (staggering) |

L'animation `fadeUp` est désactivée via `@media (prefers-reduced-motion: reduce)`.

### Typographie

```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display); /* Syne */
  letter-spacing: -0.02em;
}
```

Hiérarchie de tailles appliquée manuellement sur chaque page selon le contexte (pas de `@apply` génériques) :

| Élément | Classes Tailwind types |
|---|---|
| Hero `h1` | `text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold` |
| `h1` de page | `text-5xl sm:text-6xl font-extrabold` |
| `h2` de section | `text-3xl sm:text-4xl lg:text-5xl font-bold` (via `SectionHeading`) |
| `h2` de card | `text-2xl font-bold` |
| Corps | `text-base` / `text-sm` / `text-lg` avec `leading-relaxed` |

---

## 5. Structure des pages et routing

### Homepage `/`

**Sections dans l'ordre :**

1. **Hero cinématographique** — fond `spotlight-bg + noise`, faisceaux décoratifs en SVG/CSS, titre animé `impro.be` avec glow ambre, tagline, 3 boutons CTA (Cours / Spectacles / Entreprises).
2. **"À l'affiche"** — récupère les prochains spectacles via `getUpcomingShows(3)` + la prochaine journée d'initiation depuis `initiationDay`. Affiche des `ShowCard` + un bandeau dédié à l'initiation avec CTA.
3. **Trois univers** — grille de 3 cartes interactives avec icône, titre, description, label et CTA pour chaque section principale.
4. **Corporate teaser** — présente les 4 services `CorporateService` en grille 2×2, image placeholder, CTAs vers `/entreprises`.
5. **Instagram placeholder** — grille 2×3 (mobile) / 6 (desktop) de posts mock avec emojis, overlay au survol. Remplaçable par un vrai embed.

### `/cours`

- Affiche les 2 niveaux définis dans `courseLevels` (Débutants, Confirmés).
- Chaque niveau : nom, sous-titre, description, public cible, durée, horaire, prix, points forts.
- Bandeau vers `/cours/initiation` avec les infos clés de `initiationDay`.
- Section FAQ : 5 questions statiques en cards expansibles.
- Formulaire d'inscription moqué `<SubscriptionForm>` en bas de page (ancre `#inscription`).

### `/cours/initiation`

- Page SEO dédiée avec métadonnées propres (`title` = "Journée d'initiation à l'improvisation — Bruxelles").
- Grid d'infos pratiques : date, horaire, lieu, prix, nombre de places max.
- Programme heure par heure (liste ordonnée depuis `initiationDay.programme`).
- Section "Pour qui ?" avec liste de critères.
- Formulaire `<SubscriptionForm defaultLevel="initiation">`.

### `/spectacles`

Page listing avec onglets de filtrage. Affiche **tous** les spectacles sans filtre actif. L'onglet "Tous" est actif.

### `/spectacles/[categorie]`

Même UI que `/spectacles` mais préfiltrée sur la catégorie. L'onglet correspondant est actif.

Trois catégories possibles : `tournoi`, `enfants`, `festival`.

Les métadonnées (title, description) sont propres à chaque catégorie via `showCategories[categorie].seoTitle` / `.seoDescription`.

**Route SEO attendue :**
- `/spectacles/enfants` → titre "Spectacle d'impro pour enfants à Bruxelles"
- `/spectacles/tournoi` → titre "Tournoi d'improvisation à Bruxelles"
- `/spectacles/festival` → titre "Festival d'improvisation à Bruxelles"

### `/spectacles/[categorie]/[slug]`

Page détail d'un spectacle individuel. Contient :

- **Fil d'Ariane** sémantique (`<nav aria-label>` + `<ol>`).
- **Retour** vers la page catégorie.
- **Header** : badges tags + isFeatured, titre `h1`, tagline en italique.
- **Card de réservation rapide** (sticky sur desktop) : date, heure, lieu, adresse, grille de tarifs, bouton "Réserver mes places →" (scroll vers `#reserver`).
- **Description longue** : paragraphes depuis `show.longDescription` (séparés par `\n\n`).
- **Image placeholder** : aspect ratio video, à remplacer par la vraie affiche.
- **Section `#reserver`** : `<WeezeventEmbed>` avec le code du spectacle.
- **Spectacles liés** : 2 autres spectacles de la même catégorie.
- **JSON-LD `Event`** injecté en `<script type="application/ld+json">`.

### `/entreprises`

- Hero avec H1 et CTAs.
- Grille 2×2 des 4 services avec icône emoji, titre, description, 3 highlights, lien "En savoir plus".
- Section "Pourquoi choisir impro.be ?" avec liste de 5 raisons + image placeholder.
- Formulaire `<DevisForm>` moqué (ancre `#devis`).

### `/entreprises/[service]`

Page détail d'un service corporate. Services disponibles :

| Slug | Titre |
|---|---|
| `teambuilding` | Modules de Teambuilding |
| `spectacles` | Spectacles d'Entreprise |
| `animation-debats` | Animation de Débats |
| `ecoles` | Ateliers pour Écoles |

Contenu : fil d'Ariane, hero avec tagline, description longue, highlights, grille de formats (nom / durée / participants), "Pour qui ?", formulaire `<DevisForm defaultService={slug}>`, liste des autres services.

### `/a-propos`

- Hero avec H1.
- Section mission (texte centré).
- Grille 4 valeurs de l'entreprise.
- Section équipe : 3 membres avec avatar placeholder, rôle, biographie.
- Strip de 4 stats chiffrées (15+ ans, 200+ élèves/an, 50+ spectacles, 200+ entreprises).
- Section CTA finale.

### `/contact`

- Hero simple.
- Grid 2/5 — 3/5 : infos de contact (email, téléphone, adresse, horaires, liens sociaux) + formulaire `<ContactForm>`.

### Page 404 (`not-found.tsx`)

- Fond `spotlight-bg + noise`.
- Numéro "404" en très grande police ambre transparente.
- Liens de retour vers l'accueil et les spectacles.

---

## 6. Modèle de données

Tout le contenu est défini en TypeScript dans `src/data/`. Ces fichiers sont la **source de vérité unique** pour les pages statiques, le sitemap, et les JSON-LD.

### `src/data/shows.ts`

#### Type `Show`

```typescript
interface Show {
  slug: string;            // Identifiant URL (kebab-case)
  category: ShowCategory;  // "tournoi" | "enfants" | "festival"
  title: string;           // Titre complet affiché
  tagline: string;         // Phrase d'accroche (utilisée en italique sur la page détail)
  description: string;     // Résumé court (affiché sur ShowCard)
  longDescription: string; // Description complète (paragraphes séparés par \n\n)
  date: string;            // ISO 8601 (ex. "2026-10-17")
  endDate?: string;        // Optionnel, pour les événements multi-jours
  time: string;            // Format "HH:MM"
  venue: string;           // Nom du lieu
  address: string;         // Rue et numéro
  city: string;            // Ville et code postal (ex. "Bruxelles 1000")
  priceAdult: number;      // Tarif adulte en euros
  priceChild?: number;     // Tarif enfant (optionnel)
  priceReduced?: number;   // Tarif réduit (optionnel)
  image: string;           // Chemin depuis /public (ex. "/images/shows/tournoi.jpg")
  weezeventCode: string;   // URL du widget Weezevent iframe
  tags: string[];          // Ex. ["Tout public", "Dès 12 ans"]
  isFeatured?: boolean;    // Badge "À l'affiche" + inclusion dans la homepage
  soldOut?: boolean;       // Désactive le bouton de réservation
}
```

#### Fonctions utilitaires exportées

```typescript
getShowsByCategory(category: ShowCategory): Show[]
getShowBySlug(category: ShowCategory, slug: string): Show | undefined
getFeaturedShows(): Show[]
getUpcomingShows(limit?: number): Show[]   // Triés par date croissante
formatShowDate(isoDate: string, endDate?: string): string  // Locale fr-BE
```

#### Spectacles de démonstration (prototype)

| Slug | Catégorie | Date |
|---|---|---|
| `tournoi-automne-2026` | tournoi | 17/10/2026 |
| `tournoi-printemps-2027` | tournoi | 20/03/2027 |
| `spectacle-enfants-septembre-2026` | enfants | 19/09/2026 |
| `spectacle-enfants-decembre-2026` | enfants | 13/12/2026 |
| `festival-fin-annee-2026` | festival | 05–07/06/2026 |

### `src/data/courses.ts`

#### Type `CourseLevel`

```typescript
interface CourseLevel {
  id: string;              // "debutants" | "confirmes"
  name: string;            // Nom affiché
  subtitle: string;
  description: string;
  forWhom: string;         // Description du public cible
  duration: string;        // Ex. "30 semaines (septembre à juin)"
  schedule: string;        // Ex. "1 séance de 2h par semaine"
  price: number;           // Tarif saison complète (€)
  priceDescription: string;
  highlights: string[];    // 4 points forts maximum
}
```

#### Type `InitiationDay`

```typescript
interface InitiationDay {
  nextDate: string;        // ISO 8601 de la prochaine journée
  time: string;            // Heure de début "HH:MM"
  endTime: string;         // Heure de fin "HH:MM"
  venue: string;
  address: string;
  city: string;
  price: number;
  maxParticipants: number;
  description: string;
  programme: string[];     // Chaque entrée = "HH:MM — Description"
}
```

### `src/data/corporate.ts`

#### Type `CorporateService`

```typescript
interface CorporateService {
  slug: ServiceSlug;         // "teambuilding" | "spectacles" | "animation-debats" | "ecoles"
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  longDescription: string;   // Paragraphes séparés par \n\n
  highlights: string[];      // Points forts (5 maximum recommandés)
  formats: {
    name: string;
    duration: string;
    participants: string;
  }[];
  image: string;
  icon: string;              // Nom d'icône Lucide (référence non-implémentée, remplacé par emoji)
  forWhom: string;
}
```

---

## 7. Composants réutilisables

### `Header` (`src/components/layout/Header.tsx`)

- `"use client"` (utilise `usePathname`, `useState`, `useEffect`).
- **Sticky** avec `position: fixed`, z-index 50.
- **Transparent** au scroll top ; passe en `bg-background/95 backdrop-blur-md` avec bordure basse au défilement (`scrollY > 20`).
- **Desktop** : liens texte + bouton "Réserver" ambre arrondi.
- **Mobile** : burger menu (icône `Menu` / `X` Lucide) qui déclenche un menu déroulant (`max-h-0` → `max-h-screen` via transition CSS). Se ferme automatiquement au changement de route.
- Lien actif détecté via `pathname.startsWith(href)` pour les sections avec sous-routes.

### `Footer` (`src/components/layout/Footer.tsx`)

- Server Component (pas de `"use client"`).
- Grid 5 colonnes sur desktop (2 colonnes marque + 3 colonnes de liens).
- Icônes sociales depuis `SocialIcons.tsx`.
- Ligne de séparation avec `.divider-glow`.
- Année dynamique via `new Date().getFullYear()`.

### `SectionHeading` (`src/components/shared/SectionHeading.tsx`)

Props : `eyebrow?`, `title`, `description?`, `align?` (left | center), `className?`

Usage type :
```tsx
<SectionHeading
  eyebrow="Nos parcours"
  title="Choisissez votre niveau"
  description="..."
  className="mb-14"
/>
```

### `ShowCard` (`src/components/shared/ShowCard.tsx`)

- Reçoit un objet `Show` complet.
- Variante `default` et `featured`.
- Image : placeholder avec fond dégradé ambre + emoji 🎭 (à remplacer par `<Image>` Next.js quand les vraies photos sont disponibles).
- Badge "À l'affiche" si `show.isFeatured`.
- Badge "Complet" si `show.soldOut`.
- Affiche date, lieu, tarif adulte, lien vers la page détail.
- Hover : `border-primary/50`, shadow ambre, titre vire à l'ambre.

### `ShowFilterTabs` et `ShowGrid` (`src/components/shared/ShowFilterTabs.tsx`)

- `"use client"` (utilise `usePathname` pour l'onglet actif).
- `ShowFilterTabs` : liste de liens vers `/spectacles`, `/spectacles/tournoi`, `/spectacles/enfants`, `/spectacles/festival`. Onglet actif = `bg-primary`.
- `ShowGrid` : reçoit un tableau de `Show[]`, les affiche en grille 1→2→3 colonnes. Affiche un état vide si le tableau est vide.

### `WeezeventEmbed` (`src/components/shared/WeezeventEmbed.tsx`)

- `"use client"` (état `loaded`).
- Détecte si `weezeventCode` contient "placeholder" : dans ce cas, affiche un bloc de prévisualisation au lieu d'un `<iframe>`.
- En production (URL Weezevent réelle) : charge l'iframe avec un loader spinner pendant le chargement.

**Pour brancher Weezevent :** remplacer la valeur `weezeventCode` dans `src/data/shows.ts` par l'URL d'embed fournie par Weezevent (format `https://www.weezevent.com/widget/v3/...`).

### `InstagramFeed` (`src/components/shared/InstagramFeed.tsx`)

- Server Component.
- Affiche 6 posts fictifs (emoji + caption) en grille responsive.
- Annotation visible indiquant qu'il s'agit d'un aperçu illustratif.
- Pour le remplacer par un vrai feed : supprimer le contenu de ce composant et intégrer un widget tiers (Elfsight, Curator.io, ou appel direct à l'API Instagram Graph).

### `JsonLd` (`src/components/shared/JsonLd.tsx`)

```tsx
<JsonLd data={someSchemaObject} />
```

Injecte un `<script type="application/ld+json">` dans le DOM.

Deux exports supplémentaires :
- `organizationSchema` : schéma `Organization` global, injecté dans le root layout.
- `buildEventSchema(show)` : génère un schéma `Event` Schema.org pour chaque spectacle.

### `SocialIcons` (`src/components/shared/SocialIcons.tsx`)

Trois composants SVG : `InstagramIcon`, `FacebookIcon`, `YoutubeIcon`. Acceptent `size` et `className`.

---

## 8. Formulaires et validation

Tous les formulaires sont des **Client Components** (`"use client"`). Les soumissions sont **moquées** (timeout 1s + état `submitted`). Aucun appel API n'est effectué.

### Librairies

```
react-hook-form + @hookform/resolvers/zod + zod
```

### `SubscriptionForm`

**Fichier :** `src/components/shared/SubscriptionForm.tsx`

| Champ | Type | Validation |
|---|---|---|
| `firstName` | text | min 2 caractères |
| `lastName` | text | min 2 caractères |
| `email` | email | format email valide |
| `phone` | tel | optionnel |
| `level` | select | enum `debutants \| confirmes \| initiation` |
| `message` | textarea | optionnel |

**Prop** `defaultLevel` : pré-sélectionne le champ `level` (utilisé sur `/cours/initiation` avec `"initiation"`).

### `DevisForm`

**Fichier :** `src/components/shared/DevisForm.tsx`

| Champ | Type | Validation |
|---|---|---|
| `firstName` | text | min 2 caractères |
| `lastName` | text | min 2 caractères |
| `company` | text | min 2 caractères |
| `email` | email | format email valide |
| `phone` | tel | optionnel |
| `service` | select | enum des 5 valeurs de service |
| `participants` | text | optionnel |
| `date` | text | optionnel (texte libre) |
| `message` | textarea | min 10 caractères |

**Prop** `defaultService` : pré-sélectionne le service (utilisé sur les pages `/entreprises/[service]`).

### `ContactForm`

**Fichier :** `src/components/shared/ContactForm.tsx`

| Champ | Type | Validation |
|---|---|---|
| `name` | text | min 2 caractères |
| `email` | email | format email valide |
| `subject` | text | min 3 caractères |
| `message` | textarea | min 20 caractères |

### Pattern de succès

Tous les formulaires affichent, après soumission simulée, un état de confirmation :

```tsx
if (submitted) {
  return (
    <div role="status" aria-live="polite">
      <CheckCircle />
      <h3>Message envoyé !</h3>
      <p>...</p>
    </div>
  );
}
```

### Brancher un vrai backend

Pour envoyer les soumissions par email, remplacer le `setTimeout` dans `onSubmit` par un `fetch` vers une Next.js API Route ou un service tiers :

```ts
// Option A — Next.js API route
const res = await fetch("/api/contact", {
  method: "POST",
  body: JSON.stringify(data),
});

// Option B — Resend (recommandé)
// npm install resend
// import { Resend } from "resend";

// Option C — Brevo / SendinBlue
```

---

## 9. SEO et métadonnées

### Métadonnées par page

Chaque page exporte un objet `metadata` (ou une fonction `generateMetadata`) compatible avec l'API Next.js App Router.

```typescript
export const metadata: Metadata = {
  title: "Titre de page — impro.be",
  description: "Description de 150–160 caractères...",
  openGraph: {
    title: "...",
    description: "...",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
};
```

Le root layout définit :
- `metadataBase: new URL("https://impro.be")` — base pour les URLs relatives OG.
- Template de titre : `"%s | impro.be"`.
- Locale OG : `fr_BE`.
- Twitter card : `summary_large_image`.

### Sitemap (`/sitemap.xml`)

Généré automatiquement par `src/app/sitemap.ts`. Inclut :

| Type | Nombre | Priorité | Fréquence |
|---|---|---|---|
| Routes statiques principales | 7 | 0.6–1.0 | weekly / monthly |
| Pages catégorie spectacles | 3 | 0.8 | weekly |
| Pages détail spectacles | 5 | 0.7 | weekly |
| Pages détail services corporate | 4 | 0.7 | monthly |
| **Total** | **19** | — | — |

Pour mettre à jour le sitemap automatiquement lors de l'ajout d'un spectacle, il suffit d'ajouter l'objet dans `src/data/shows.ts` — le sitemap se régénère au prochain build.

### robots.txt (`/robots.txt`)

```
User-agent: *
Allow: /
Sitemap: https://impro.be/sitemap.xml
```

### JSON-LD Structured Data

#### `Organization` (global, root layout)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "impro.be",
  "url": "https://impro.be",
  "address": { "@type": "PostalAddress", "addressLocality": "Ixelles", ... },
  "contactPoint": { "@type": "ContactPoint", ... },
  "sameAs": ["instagram.com/improbe", "facebook.com/improbe", ...]
}
```

#### `Event` (pages `/spectacles/[categorie]/[slug]`)

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Grand Tournoi d'Impro — Automne 2026",
  "startDate": "2026-10-17T20:00:00+02:00",
  "eventAttendanceMode": "OfflineEventAttendanceMode",
  "location": { "@type": "Place", "name": "Théâtre Molière", ... },
  "offers": { "@type": "Offer", "price": 18, "priceCurrency": "EUR", ... },
  "organizer": { "@type": "Organization", "name": "impro.be" }
}
```

### Fil d'Ariane (BreadcrumbList)

Les fils d'Ariane sont présents visuellement sur les pages détail (`/spectacles/.../...` et `/entreprises/...`) mais le JSON-LD `BreadcrumbList` n'est pas encore implémenté. **À ajouter** pour améliorer l'affichage dans les résultats Google.

---

## 10. Intégration Weezevent

### Fonctionnement actuel (prototype)

Le composant `WeezeventEmbed` lit le champ `weezeventCode` de chaque spectacle. Si l'URL contient la chaîne `"placeholder"`, un bloc de prévisualisation s'affiche à la place de l'iframe.

### Passage en production

**Étape 1** — Dans votre compte Weezevent, pour chaque événement :
1. Accéder à l'événement → Billetterie → Widget
2. Copier l'URL du widget (format `https://www.weezevent.com/widget/v3/VOTRE_CODE/...`)

**Étape 2** — Mettre à jour `src/data/shows.ts` :
```typescript
weezeventCode: "https://www.weezevent.com/widget/v3/VOTRE_CODE",
```

**Étape 3** — Dans `next.config.ts`, autoriser le chargement de l'iframe Weezevent :
```typescript
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-src 'self' https://www.weezevent.com;",
          },
        ],
      },
    ];
  },
};
```

### Expérience utilisateur Weezevent

- Sur la page détail d'un spectacle, un bouton "Réserver mes places →" dans la card sticky (desktop) ou en section principale (mobile) scrolle vers l'ancre `#reserver` en bas de page.
- L'embed Weezevent est chargé inline dans la section `#reserver`.
- La hauteur minimale de l'iframe est fixée à 700px (conforme à l'interface Weezevent multi-étapes).

---

## 11. Build, déploiement et Git

### Commandes

```bash
npm run dev       # Développement local → http://localhost:3000
npm run build     # Build de production (génère .next/)
npm run start     # Serveur de production local (après build)
npm run lint      # ESLint
```

### Git

Le dépôt est initialisé localement. Deux commits initiaux :
1. `Initial prototype: impro.be rebranding - ...` (43 fichiers, 7853 lignes)
2. `Add .gitattributes for consistent line endings`

**Connecter un remote :**
```bash
git remote add origin https://github.com/VOTRE-ORG/impros.git
git push -u origin main
```

### Déploiement Vercel (recommandé)

Le projet est structuré pour un déploiement Vercel sans configuration supplémentaire :

1. Importer le dépôt dans [vercel.com](https://vercel.com).
2. Framework : Next.js (détecté automatiquement).
3. Variables d'environnement : aucune pour le prototype.
4. Domaine : pointer `impro.be` vers Vercel DNS.

Pour les formulaires en production, ajouter la variable d'environnement du prestataire email :
```
RESEND_API_KEY=re_...
```

---

## 12. Checklist avant mise en production

### Contenu

- [ ] Remplacer toutes les images placeholder par les vraies photos dans `public/images/`
- [ ] Créer l'image Open Graph principale : `public/og-default.jpg` (1200×630px)
- [ ] Vérifier et corriger les textes (tarifs, adresses, numéros de téléphone)
- [ ] Mettre à jour l'adresse email `info@impro.be` dans le Footer et la page Contact
- [ ] Mettre à jour les liens réseaux sociaux (Instagram, Facebook, YouTube)

### Spectacles

- [ ] Remplacer les spectacles de démonstration par la vraie programmation dans `src/data/shows.ts`
- [ ] Ajouter les vrais codes Weezevent dans `weezeventCode` pour chaque spectacle
- [ ] Ajouter les vraies photos d'affiche dans `public/images/shows/`
- [ ] Configurer la prochaine date d'initiation dans `src/data/courses.ts` → `initiationDay.nextDate`

### Technique

- [ ] Configurer le CSP pour autoriser les iframes Weezevent (voir section 10)
- [ ] Brancher un service d'email pour les formulaires (Resend recommandé)
- [ ] Remplacer le feed Instagram placeholder par un vrai embed (Elfsight ou API)
- [ ] Ajouter le JSON-LD `BreadcrumbList` sur les pages détail
- [ ] Vérifier les métadonnées dans Google Search Console après mise en ligne
- [ ] Activer Google Analytics ou Plausible (analytics)
- [ ] Tester sur mobile (iOS Safari, Android Chrome) et tablette
- [ ] Vérifier le score Lighthouse (Performance, SEO, Accessibilité)

### SEO

- [ ] Mettre à jour `metadataBase` dans `layout.tsx` si le domaine final diffère de `impro.be`
- [ ] Soumettre le sitemap dans Google Search Console
- [ ] Vérifier les données structurées dans le [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Ajouter une balise `<link rel="canonical">` si nécessaire

---

*Document généré automatiquement lors de la création du prototype — Juillet 2026.*
