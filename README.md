# impro.be — Prototype de rebranding

Prototype du nouveau site **impro.be**, compagnie d'improvisation théâtrale de Bruxelles.

## Stack technique

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** + **shadcn/ui** (restyled thème cinématographique sombre)
- **Polices** : Syne (titres) + Outfit (corps)
- **Formulaires** : react-hook-form + Zod v4
- **Icons** : lucide-react + icônes sociales personnalisées
- **Contenu** : fichiers TypeScript locaux (`src/data/`)

## Structure des pages

| Route | Description |
|---|---|
| `/` | Accueil — hero, à l'affiche, 3 univers, Instagram |
| `/cours` | Cours débutants & confirmés + formulaire d'inscription |
| `/cours/initiation` | Journée d'initiation dédiée |
| `/spectacles` | Listing avec filtres par catégorie |
| `/spectacles/[categorie]` | Page SEO préfiltrée (tournoi / enfants / festival) |
| `/spectacles/[categorie]/[slug]` | Détail spectacle + intégration Weezevent |
| `/entreprises` | Vue d'ensemble des services corporate |
| `/entreprises/[service]` | Détail par service (teambuilding / spectacles / debats / ecoles) |
| `/a-propos` | Histoire, valeurs, équipe |
| `/contact` | Formulaire de contact |

## Démarrage

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

## À faire avant la mise en production

- [ ] Remplacer les images placeholder par les vraies photos
- [ ] Ajouter les codes Weezevent réels dans `src/data/shows.ts`
- [ ] Configurer `src/data/shows.ts` avec les vraies dates de spectacles
- [ ] Brancher un vrai envoi d'e-mail pour les formulaires (ex. Resend, Brevo)
- [ ] Créer l'image Open Graph `/public/og-default.jpg`
- [ ] Connecter le feed Instagram réel (ex. widget Elfsight ou API)
- [ ] Remplacer le numéro de téléphone et l'adresse placeholder
- [ ] Déployer sur Vercel : `vercel --prod`

## Connecter l'origin Git

```bash
git remote add origin https://github.com/TON-USERNAME/impros.git
git push -u origin main
```
