import type { GiftPack } from '@/lib/site-config';

export type MarketOffer = {
  source: 'discogs' | 'wallapop';
  /** Price of the exact pressing or a documented comparable, excluding shipping. */
  priceCents: number;
  shippingCents: number;
  /** Wallapop listings at €0/€1 or without a real price must never be recorded. */
  hasVerifiablePrice: boolean;
  capturedAt: string;
  url: string;
};

export type SourcingDecision =
  | { allowed: true; medianLandedCostCents: number; maxLandedCostCents: number }
  | { allowed: false; reason: string; medianLandedCostCents?: number; maxLandedCostCents: number };

/**
 * Keeps enough of the sale price for the box, preparation and margin. A title
 * that exceeds this is replaced by another musical route; this function never
 * purchases anything.
 */
export function maxExternalRecordCostCents(pack: Pick<GiftPack, 'priceCents' | 'vinylCount'>) {
  return Math.floor((pack.priceCents / pack.vinylCount) * 0.6);
}

function median(values: number[]) {
  const ordered = [...values].sort((a, b) => a - b);
  const middle = Math.floor(ordered.length / 2);
  return ordered.length % 2 === 0 ? Math.round((ordered[middle - 1] + ordered[middle]) / 2) : ordered[middle];
}

/**
 * Discogs should be queried for an exact release/condition. Wallapop is a
 * secondary manual signal only. At least three honest, current offers are
 * required before a price is considered useful.
 */
export function assessExternalSourcing(pack: Pick<GiftPack, 'priceCents' | 'vinylCount'>, offers: MarketOffer[]): SourcingDecision {
  const maxLandedCostCents = maxExternalRecordCostCents(pack);
  const comparable = offers.filter((offer) => offer.hasVerifiablePrice && offer.priceCents > 100 && offer.shippingCents >= 0);
  if (comparable.length < 3) return { allowed: false, maxLandedCostCents, reason: 'Faltan tres referencias de precio comparables y verificables.' };
  const medianLandedCostCents = median(comparable.map((offer) => offer.priceCents + offer.shippingCents));
  if (medianLandedCostCents > maxLandedCostCents) {
    return { allowed: false, medianLandedCostCents, maxLandedCostCents, reason: 'El precio medio puesto en casa supera el presupuesto por disco de esta caja.' };
  }
  return { allowed: true, medianLandedCostCents, maxLandedCostCents };
}
