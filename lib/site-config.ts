/**
 * Single source of truth for the public brand and the launch catalogue.
 * Replace the provisional values here when the final identity is approved.
 */
export const siteConfig = {
  brand: {
    name: 'DILO · Vinyl & Stories',
    legalName: 'DILO · Vinyl & Stories',
    tagline: 'Regalos que se escuchan.',
    description:
      'Regalos musicales personalizados: colecciones de vinilos originales de segunda mano seleccionadas para contar una historia.',
    locale: 'es_ES',
    email: 'hola@dilovinilo.es',
  },
  launch: {
    /** Must be set to the canonical production URL before launch. */
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com',
    salesEnabled: false,
    inventoryMode: 'manual-review' as const,
    /** Proposals are assembled from owned stock only; sourcing is always a human decision. */
    externalSourcingEnabled: false,
  },
  packs: [
    {
      id: 'first-track',
      name: 'THE FIRST TRACK',
      vinylCount: 7,
      priceCents: 4900,
      presentation: 'Selección esencial con tarjeta de apertura.',
    },
    {
      id: 'mixtape-box',
      name: 'THE MIXTAPE BOX',
      vinylCount: 10,
      priceCents: 6900,
      presentation: 'Narrativa ampliada y detalles de colección.',
    },
    {
      id: 'love-collection',
      name: 'THE LOVE COLLECTION',
      vinylCount: 15,
      priceCents: 9900,
      presentation: 'La colección más completa para una historia larga.',
    },
  ],
} as const;

export type GiftPack = (typeof siteConfig.packs)[number];
