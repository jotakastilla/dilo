import type { InventoryRecord, SelectionProposal } from '@/lib/domain/recommendation';

type DraftPayload = {
  relationship?: string;
  message?: string;
  story?: string;
  musicPreferences?: string;
  extras?: string;
  dislikes?: string;
  packId?: string;
  dedication?: string;
};

export type ReviewQueueItem = {
  id: string;
  status: string;
  packId: string | null;
  relationship: string | null;
  message: string | null;
  createdAt: string;
  reviewNotes: string[];
};

const toJson = (value: unknown) => JSON.stringify(value);

/** Server-only D1 operations. Callers must validate consent and input first. */
export class GiftStoreRepository {
  constructor(private readonly db: D1Database) {}

  async availableInventory(): Promise<InventoryRecord[]> {
    const rows = await this.db.prepare(`SELECT * FROM inventory_records WHERE available = 1 AND (reserved_until IS NULL OR reserved_until < datetime('now'))`).all<Record<string, unknown>>();
    return rows.results.map((row) => ({
      id: String(row.id), artist: String(row.artist), title: String(row.title),
      year: typeof row.release_year === 'number' ? row.release_year : null,
      genres: JSON.parse(String(row.genres_json)) as string[],
      verifiedTracks: JSON.parse(String(row.verified_tracks_json)) as string[],
      condition: String(row.condition) as InventoryRecord['condition'],
      acquisitionCostCents: Number(row.acquisition_cost_cents), referencePriceCents: Number(row.reference_price_cents),
      available: Boolean(row.available), reservedUntil: typeof row.reserved_until === 'string' ? row.reserved_until : undefined,
      verifiedAt: typeof row.verified_at === 'string' ? row.verified_at : undefined,
    }));
  }

  async saveDraft(id: string, draft: DraftPayload, expiresAt: string): Promise<void> {
    await this.db.prepare(`INSERT INTO gift_drafts (id, consent_to_store, relationship, message, story, music_preferences, extras, dislikes, pack_id, dedication, expires_at)
      VALUES (?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET relationship = excluded.relationship, message = excluded.message, story = excluded.story,
      music_preferences = excluded.music_preferences, extras = excluded.extras, dislikes = excluded.dislikes, pack_id = excluded.pack_id,
      dedication = excluded.dedication, expires_at = excluded.expires_at, updated_at = CURRENT_TIMESTAMP`)
      .bind(id, draft.relationship ?? null, draft.message ?? null, draft.story ?? null, draft.musicPreferences ?? null, draft.extras ?? null, draft.dislikes ?? null, draft.packId ?? null, draft.dedication ?? null, expiresAt).run();
  }

  async saveProposal(id: string, draftId: string, proposal: SelectionProposal): Promise<void> {
    await this.db.prepare(`INSERT INTO selection_proposals (id, gift_draft_id, status, items_json, review_notes_json) VALUES (?, ?, ?, ?, ?)`)
      .bind(id, draftId, proposal.status, toJson(proposal.items), toJson(proposal.reviewNotes)).run();
  }

  async reviewQueue(): Promise<ReviewQueueItem[]> {
    const rows = await this.db.prepare(`SELECT p.id, p.status, p.review_notes_json, p.created_at, d.pack_id, d.relationship, d.message
      FROM selection_proposals p INNER JOIN gift_drafts d ON d.id = p.gift_draft_id
      WHERE p.status IN ('needs-manual-review', 'ready-for-review') AND d.expires_at > datetime('now')
      ORDER BY p.created_at ASC LIMIT 100`).all<Record<string, unknown>>();
    return rows.results.map((row) => ({
      id: String(row.id), status: String(row.status), packId: typeof row.pack_id === 'string' ? row.pack_id : null,
      relationship: typeof row.relationship === 'string' ? row.relationship : null,
      message: typeof row.message === 'string' ? row.message : null, createdAt: String(row.created_at),
      reviewNotes: JSON.parse(String(row.review_notes_json)) as string[],
    }));
  }

  async decideProposal(id: string, decision: 'approved' | 'rejected', reviewer: string): Promise<boolean> {
    const result = await this.db.prepare(`UPDATE selection_proposals SET status = ?, reviewed_at = CURRENT_TIMESTAMP, reviewed_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND status IN ('needs-manual-review', 'ready-for-review')`).bind(decision, reviewer, id).run();
    return result.meta.changes === 1;
  }
}
