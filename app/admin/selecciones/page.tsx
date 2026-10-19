import { env } from 'cloudflare:workers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getChatGPTUser, isOperator } from '@/app/chatgpt-auth';
import { GiftStoreRepository } from '@/db/repositories';
import { siteConfig } from '@/lib/site-config';
import { ReviewActions } from './review-actions';

export const dynamic = 'force-dynamic';

export default async function SelectionReviewPage() {
  const user = await getChatGPTUser();
  const allowed = await isOperator();
  if (!user) redirect('/signin-with-chatgpt?return_to=%2Fadmin%2Fselecciones');
  if (!allowed) return <main className="admin-page"><header className="site-header"><Link className="logo" href="/"><span className="logo-mark">d</span><span>{siteConfig.brand.name.toLowerCase()}</span></Link></header><section className="admin-shell"><p className="eyebrow"><span /> acceso restringido</p><h1>Este espacio es<br /><em>solo para el equipo.</em></h1><p className="admin-intro">Tu cuenta está autenticada, pero no tiene permisos de operaciones.</p></section></main>;
  const bindings = env as unknown as { DB: D1Database };
  const queue = await new GiftStoreRepository(bindings.DB).reviewQueue();
  return <main className="admin-page"><header className="site-header"><Link className="logo" href="/"><span className="logo-mark">d</span><span>{siteConfig.brand.name.toLowerCase()}</span></Link><span className="config-status">operaciones</span></header><section className="admin-shell"><p className="eyebrow"><span /> revisión humana</p><h1>Propuestas<br /><em>pendientes.</em></h1><p className="admin-intro">Solo se muestran solicitudes con consentimiento vigente. Aprobar no reserva inventario: esa acción se hará al preparar el pedido.</p>{queue.length === 0 ? <p className="admin-empty">No hay propuestas pendientes.</p> : <div className="review-list">{queue.map((item) => <article key={item.id}><div><span className={`review-state ${item.status}`}>{item.status === 'ready-for-review' ? 'Lista para revisar' : 'Revisión necesaria'}</span><h2>{item.message ?? 'Sin mensaje'}</h2><p>Para: {item.relationship ?? '—'} · Pack: {item.packId ?? '—'}</p><ReviewActions id={item.id} /></div><ul>{item.reviewNotes.map((note) => <li key={note}>{note}</li>)}</ul></article>)}</div>}</section></main>;
}
