interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "impro.be",
  url: "https://impro.be",
  logo: "https://impro.be/logo.png",
  description:
    "Compagnie d'improvisation théâtrale de Bruxelles. Cours, spectacles, teambuilding et ateliers.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rue de la Samaritaine, 40",
    addressLocality: "Ixelles",
    postalCode: "1050",
    addressCountry: "BE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+32-2-000-00-00",
    contactType: "customer service",
    availableLanguage: "French",
  },
  sameAs: [
    "https://instagram.com/improbe",
    "https://facebook.com/improbe",
    "https://youtube.com/@improbe",
  ],
};

export function buildEventSchema(show: {
  title: string;
  description: string;
  date: string;
  time: string;
  endDate?: string;
  venue: string;
  address: string;
  city: string;
  priceAdult: number;
  image: string;
  slug: string;
  category: string;
}) {
  const startDateTime = `${show.date}T${show.time}:00+02:00`;
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: show.title,
    description: show.description,
    startDate: startDateTime,
    endDate: show.endDate ? `${show.endDate}T23:59:00+02:00` : undefined,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: show.venue,
      address: {
        "@type": "PostalAddress",
        streetAddress: show.address,
        addressLocality: show.city,
        addressCountry: "BE",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "impro.be",
      url: "https://impro.be",
    },
    offers: {
      "@type": "Offer",
      price: show.priceAdult,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `https://impro.be/spectacles/${show.category}/${show.slug}`,
    },
    image: `https://impro.be${show.image}`,
    url: `https://impro.be/spectacles/${show.category}/${show.slug}`,
  };
}
