import { env } from 'cloudflare:workers';
import { GiftStoreRepository } from '@/db/repositories';
import { proposeSelection } from '@/lib/domain/recommendation';
import { siteConfig } from '@/lib/site-config';

type RequestBody = {
  consent?: boolean;
  relationship?: string;
  message?: string;
  story?: string;
  musicPreferences?: string;
  extras?: string;
  dislikes?: string;
  packId?: string;
  dedication?: string;
};

const maxLengths: Record<keyof Omit<RequestBody, 'consent' | 'packId'>, number> = {
  relationship: 80, message: 300, story: 4000, musicPreferences: 2000, extras: 1000, dislikes: 1000, dedication: 1000,
};

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : undefined;
}

export async function POST(request: Request) {
  if (!siteConfig.launch.salesEnabled) return Response.json({ error: 'La recepción de solicitudes todavía no está activada.' }, { status: 503 });
  let body: RequestBody;
  try { body = await request.json() as RequestBody; } catch { return Response.json({ error: 'Solicitud no válida.' }, { status: 400 }); }
  if (body.consent !== true) return Response.json({ error: 'Necesitamos tu consentimiento para guardar este borrador.' }, { status: 400 });
  const pack = siteConfig.packs.find((item) => item.id === body.packId);
  const relationship = clean(body.relationship, maxLengths.relationship);
  const message = clean(body.message, maxLengths.message);
  if (!pack || !relationship || !message) return Response.json({ error: 'Faltan datos necesarios para preparar la propuesta.' }, { status: 400 });
  const draft = {
    relationship, message, story: clean(body.story, maxLengths.story), musicPreferences: clean(body.musicPreferences, maxLengths.musicPreferences), extras: clean(body.extras, maxLengths.extras),
    dislikes: clean(body.dislikes, maxLengths.dislikes), dedication: clean(body.dedication, maxLengths.dedication), packId: pack.id,
  };
  const bindings = env as unknown as { DB: D1Database };
  const repository = new GiftStoreRepository(bindings.DB);
  const id = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  await repository.saveDraft(id, draft, expiresAt);
  const proposal = proposeSelection(await repository.availableInventory(), { ...draft, pack });
  await repository.saveProposal(crypto.randomUUID(), id, proposal);
  return Response.json({ id, expiresAt, status: proposal.status, missingRecords: proposal.missingRecords }, { status: 201 });
}
