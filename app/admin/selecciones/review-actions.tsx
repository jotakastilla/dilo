'use client';

import { useState } from 'react';

export function ReviewActions({ id }: { id: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  async function decide(decision: 'approved' | 'rejected') {
    setPending(true); setError('');
    try {
      const response = await fetch(`/api/admin/proposals/${id}`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ decision }) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? 'No se ha podido guardar la revisión.');
      window.location.reload();
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'No se ha podido guardar la revisión.'); } finally { setPending(false); }
  }
  return <div className="review-actions"><button disabled={pending} onClick={() => void decide('approved')}>Aprobar propuesta</button><button disabled={pending} className="reject" onClick={() => void decide('rejected')}>Rechazar</button>{error && <p role="alert">{error}</p>}</div>;
}
