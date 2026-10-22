export type ExtraAvailability = 'available' | 'made-to-order' | 'sold-out';

/**
 * Presentational catalogue for the products already created in Stripe.
 * Keep availability and fulfilment explicit until a stock provider is connected.
 */
export const diloExtras = [
  {
    id: 'mug',
    name: 'Taza DILO',
    description: 'Para alargar la primera escucha.',
    priceCents: 690,
    availability: 'available',
    stripeProductId: 'prod_VUGyjhKa3ohUWo',
    image: '/images/dilo-extra-taza.png',
  },
  {
    id: 'opener',
    name: 'Abridor DILO',
    description: 'Un pequeño detalle para brindar.',
    priceCents: 590,
    availability: 'available',
    stripeProductId: 'prod_VUGzYAqNF0K2Tv',
    image: '/images/dilo-extra-abridor.png',
  },
  {
    id: 'tote',
    name: 'Tote bag DILO',
    description: 'Para llevar música, libros o recuerdos.',
    priceCents: 690,
    availability: 'available',
    stripeProductId: 'prod_VUH0xZws6My43G',
    image: '/images/dilo-extra-tote.png',
  },
  {
    id: 'coasters',
    name: 'Pack de posavasos DILO',
    description: 'Cuatro piezas para poner la mesa a sonar.',
    priceCents: 690,
    availability: 'available',
    stripeProductId: 'prod_VUH2yQiDBFUivI',
    image: '/images/dilo-extra-posavasos.png',
  },
] as const satisfies ReadonlyArray<{
  id: string;
  name: string;
  description: string;
  priceCents: number;
  availability: ExtraAvailability;
  stripeProductId: string;
  image: string;
}>;

export const formatEuro = (cents: number) =>
  (cents / 100).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
