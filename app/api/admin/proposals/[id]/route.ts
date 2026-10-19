import { env } from 'cloudflare:workers';
import { getChatGPTUser, isOperator } from '@/app/chatgpt-auth';
import { GiftStoreRepository } from '@/db/repositories';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const user = await getChatGPTUser();
  if (!user || !(await isOperator())) return Response.json({ error: 'No autorizado.' }, { status: 403 });
  if (!/^[0-9a-f-]{36}$/i.test(params.id)) return Response.json({ error: 'Identificador no válido.' }, { status: 400 });
  let decision: unknown;
  try { ({ decision } = await request.json() as { decision?: unknown }); } catch { return Response.json({ error: 'Solicitud no válida.' }, { status: 400 }); }
  if (decision !== 'approved' && decision !== 'rejected') return Response.json({ error: 'Decisión no válida.' }, { status: 400 });
  const bindings = env as unknown as { DB: D1Database };
  const changed = await new GiftStoreRepository(bindings.DB).decideProposal(params.id, decision, user.email);
  if (!changed) return Response.json({ error: 'La propuesta ya fue revisada o no existe.' }, { status: 409 });
  return Response.json({ status: decision });
}
