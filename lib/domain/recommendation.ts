import type { GiftPack } from '@/lib/site-config';

export type RecordCondition = 'mint' | 'very-good-plus' | 'very-good' | 'good';

export type InventoryRecord = {
  id: string;
  artist: string;
  title: string;
  year: number | null;
  genres: string[];
  /** Track names must have been checked for this specific pressing. */
  verifiedTracks: string[];
  condition: RecordCondition;
  acquisitionCostCents: number;
  referencePriceCents: number;
  available: boolean;
  reservedUntil?: string;
  verifiedAt?: string;
};

export type GiftBrief = {
  relationship: string;
  message: string;
  story?: string;
  musicPreferences?: string;
  dislikes?: string;
  pack: Pick<GiftPack, 'id' | 'vinylCount' | 'priceCents'>;
};

export type SelectionItem = {
  record: InventoryRecord;
  score: number;
  reasons: string[];
};

export type SelectionProposal = {
  status: 'ready-for-review' | 'needs-manual-review';
  items: SelectionItem[];
  missingRecords: number;
  reviewNotes: string[];
};

const conditionScore: Record<RecordCondition, number> = {
  mint: 1,
  'very-good-plus': 0.9,
  'very-good': 0.72,
  good: 0.48,
};

const normalize = (value: string) => value.toLocaleLowerCase('es-ES').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const tokens = (value = '') => normalize(value).split(/[^\p{L}\p{N}]+/u).filter((token) => token.length > 2);

function overlap(haystack: string[], needle: string[]): string[] {
  return needle.filter((term) => haystack.some((value) => value.includes(term)));
}

function scoreRecord(record: InventoryRecord, brief: GiftBrief): SelectionItem {
  const context = [...tokens(brief.musicPreferences), ...tokens(brief.story), ...tokens(brief.message)];
  const recordTerms = [...record.genres, record.artist, record.title, ...record.verifiedTracks].map(normalize);
  const matches = overlap(recordTerms, context);
  const excluded = overlap(recordTerms, tokens(brief.dislikes));
  const margin = Math.max(0, record.referencePriceCents - record.acquisitionCostCents);
  const marginScore = Math.min(margin / Math.max(record.referencePriceCents, 1), 1);
  const verificationScore = record.verifiedTracks.length > 0 && record.verifiedAt ? 1 : 0;
  const score = Math.round((matches.length * 22 + conditionScore[record.condition] * 22 + marginScore * 12 + verificationScore * 24 - excluded.length * 60) * 100) / 100;
  const reasons = [
    ...(matches.length ? [`Coincide con: ${matches.slice(0, 3).join(', ')}.`] : ['Encaja por género, estado y disponibilidad.']),
    `Estado revisado: ${record.condition.replaceAll('-', ' ')}.`,
    ...(record.verifiedTracks.length && record.verifiedAt ? ['Tracklist verificado para esta edición.'] : ['Requiere verificar tracklist antes de aprobar.']),
  ];
  return { record, score, reasons };
}

/**
 * Generates a ranked, review-only proposal. This function never creates
 * records, assumes a track exists, or reserves stock.
 */
export function proposeSelection(inventory: InventoryRecord[], brief: GiftBrief): SelectionProposal {
  const reviewNotes: string[] = [];
  const ownedAvailable = inventory.filter((record) => record.available && !record.reservedUntil);
  // A gift proposal may only use owned, available inventory. Never let a
  // recommendation become an automatic instruction to source a costly record.
  const budgetEligible = ownedAvailable.filter((record) =>
    record.acquisitionCostCents <= brief.pack.priceCents && record.referencePriceCents <= brief.pack.priceCents,
  );
  const excludedForValue = ownedAvailable.length - budgetEligible.length;
  const candidates = budgetEligible
    .map((record) => scoreRecord(record, brief))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
  const items = candidates.slice(0, brief.pack.vinylCount);
  const missingRecords = Math.max(0, brief.pack.vinylCount - items.length);
  if (missingRecords) reviewNotes.push(`Faltan ${missingRecords} discos elegibles para completar este pack.`);
  if (excludedForValue) reviewNotes.push(`${excludedForValue} discos disponibles se han excluido porque su coste o valor de referencia supera el precio total de la caja.`);
  if (items.some((item) => !item.record.verifiedAt || item.record.verifiedTracks.length === 0)) reviewNotes.push('Hay discos pendientes de verificar por edición antes de aprobar el pedido.');
  reviewNotes.push('La propuesta se construye únicamente con inventario propio disponible y debe ser revisada por una persona antes de reservarlo.');
  return { status: missingRecords ? 'needs-manual-review' : 'ready-for-review', items, missingRecords, reviewNotes };
}
