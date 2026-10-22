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
      'Cajas regalo con cinco vinilos originales con historia, historias de escucha y detalles para volver a la música de siempre.',
    locale: 'es_ES',
    email: 'hola@dilovinilo.es',
  },
  launch: {
    /** Must be set to the canonical production URL before launch. */
    siteUrl:
      process.env.NEXT_PUBLIC_SITE_URL ??
      'https://dilo-vinyl-stories.vercel.app',
    salesEnabled: false,
    inventoryMode: 'manual-review' as const,
    /** Proposals are assembled from owned stock only; sourcing is always a human decision. */
    externalSourcingEnabled: false,
  },
  packs: [
    {
      id: 'vuelve-a-los-80',
      name: 'Vuelve a los 80',
      vinylCount: 5,
      priceCents: 5900,
      presentation:
        'Cinco vinilos para regresar a una década que nunca dejó de sonar.',
      montage: '/images/dilo-montage-eighties-v1.png',
      examples: [
        'Madonna · True Blue',
        'The Cure · Disintegration',
        'Prefab Sprout · Steve McQueen',
        'The Blue Nile · A Walk Across the Rooftops',
        'The Dream Academy · The Dream Academy',
      ],
      previewRolls: [
        [
          'Madonna · True Blue',
          'The Cure · Disintegration',
          'Prefab Sprout · Steve McQueen',
        ],
        [
          'a-ha · Hunting High and Low',
          'Eurythmics · Sweet Dreams',
          'The Blue Nile · A Walk Across the Rooftops',
        ],
        [
          'Tina Turner · Private Dancer',
          'Pet Shop Boys · Actually',
          'The Dream Academy · The Dream Academy',
        ],
      ],
    },
    {
      id: 'made-in-spain',
      name: 'Made in Spain',
      vinylCount: 5,
      priceCents: 5900,
      presentation:
        'Canciones que cantábamos antes de saber que se convertirían en recuerdos.',
      montage: '/images/dilo-montage-spain-v1.png',
      examples: [
        'Alaska y Dinarama · Deseo carnal',
        'Radio Futura · La ley del desierto / La ley del mar',
        'Golpes Bajos · A santa compaña',
        'La Mode · El eterno femenino',
        'Objetivo Birmania · Tormenta a las diez',
      ],
      previewRolls: [
        [
          'Alaska y Dinarama · Deseo carnal',
          'Radio Futura · La ley del desierto / La ley del mar',
          'La Mode · El eterno femenino',
        ],
        [
          'Mecano · Descanso dominical',
          'Duncan Dhu · El grito del tiempo',
          'Golpes Bajos · A santa compaña',
        ],
        [
          'Hombres G · La cagaste… Burt Lancaster',
          'Nacha Pop · Dibujos animados',
          'Objetivo Birmania · Tormenta a las diez',
        ],
      ],
    },
    {
      id: 'canciones-para-dos',
      name: 'Canciones para dos',
      vinylCount: 5,
      priceCents: 5900,
      presentation:
        'Una selección cálida de canciones que siempre nos recuerdan a alguien.',
      montage: '/images/dilo-montage-love-v1.png',
      examples: [
        'Sade · Promise',
        'George Michael · Faith',
        'Swing Out Sister · It’s Better to Travel',
        'The Style Council · Café Bleu',
        'Everything But The Girl · Eden',
      ],
      previewRolls: [
        [
          'Sade · Promise',
          'George Michael · Faith',
          'Everything But The Girl · Eden',
        ],
        [
          'Bryan Ferry · Boys and Girls',
          'Simply Red · Picture Book',
          'The Style Council · Café Bleu',
        ],
        [
          'Roxette · Look Sharp!',
          'The Cure · Disintegration',
          'Swing Out Sister · It’s Better to Travel',
        ],
      ],
    },
  ],
  boxSizes: [
    {
      id: 'esencial',
      name: 'Caja esencial',
      vinylCount: 5,
      priceCents: 5900,
      presentation:
        'Cinco vinilos originales seleccionados como pequeñas joyas para una primera gran escucha.',
    },
    {
      id: 'extendida',
      name: 'Edición extendida',
      vinylCount: 10,
      priceCents: 7600,
      presentation:
        'Diez vinilos originales seleccionados para alargar la sorpresa y descubrir más joyas.',
    },
  ],
} as const;

export type GiftPack = (typeof siteConfig.packs)[number];
