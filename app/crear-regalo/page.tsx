'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, type ReactNode } from 'react';
import { musicCandidates, type GiftTheme } from '@/lib/catalog/music-candidates';
import { siteConfig } from '@/lib/site-config';

const steps = ['Para quién', 'El mensaje', 'Vuestra historia', 'El estilo', 'Las canciones', 'El pack', 'La caja', 'Los detalles'];
const people = ['Pareja', 'Amigo', 'Amiga', 'Padre', 'Madre', 'Hermano', 'Hermana', 'Familiar', 'Otra persona'];
const messages = ['Te quiero', 'Te echo de menos', 'Gracias por todo', 'Perdóname', 'Eres increíble', 'Nunca te olvidaré', 'Nuestra amistad es única', 'Me has cambiado la vida', 'Cumpleaños', 'Pareja / aniversario', 'Navidad', 'Padre y madre', 'Tengo algo pendiente que decirte', 'Otro mensaje'];
const musicStyles = ['Clásicos, soul y jazz', 'Pop de los 80 y 90', 'Rock, indie y alternativo', 'Canción en castellano', 'Déjate guiar'];
const includedInEveryBox = ['Tarjeta con tu dedicatoria', 'Guía de escucha numerada', 'Funda interior antiestática y funda exterior transparente para cada disco'];
const optionalExtras = [
  { name: 'Dos posavasos de corcho', detail: 'Con gráfica DILO, para acompañar la primera escucha.', price: '+ 6 €' },
  { name: 'Sobre sellado “abre cuando…”', detail: 'Una segunda nota para abrir en el momento que elijas.', price: '+ 4 €' },
  { name: 'Lámina de la selección', detail: 'Pequeño póster con el relato visual de vuestra caja.', price: '+ 8 €' },
];
type Draft = Record<string, string>;
const themeForMessage: Record<string, GiftTheme> = {
  'Te quiero': 'pareja-aniversario', 'Te echo de menos': 'te-echo-de-menos', 'Gracias por todo': 'gracias-por-todo', Perdóname: 'perdoname', 'Eres increíble': 'eres-increible', 'Nunca te olvidaré': 'nunca-te-olvidare', 'Nuestra amistad es única': 'amistad', 'Me has cambiado la vida': 'me-has-cambiado-la-vida', Cumpleaños: 'cumpleanos', 'Pareja / aniversario': 'pareja-aniversario', Navidad: 'navidad', 'Padre y madre': 'padre-madre',
};

export default function CreateGiftPage() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>({ pack: siteConfig.packs[1].id });
  const [loaded, setLoaded] = useState(false);
  const [consent, setConsent] = useState(false);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => { try { const saved = sessionStorage.getItem('gift-draft'); if (saved) setDraft(JSON.parse(saved)); } finally { setLoaded(true); } }, []);
  useEffect(() => { if (loaded) sessionStorage.setItem('gift-draft', JSON.stringify(draft)); }, [draft, loaded]);
  const set = (key: string, value: string) => setDraft((current) => ({ ...current, [key]: value }));
  const canContinue = step === 0 ? Boolean(draft.person) : step === 1 ? Boolean(draft.message) : step === 3 ? Boolean(draft.musicStyle) : step === 5 ? Boolean(draft.pack) : step === 7 ? !siteConfig.launch.salesEnabled || consent : true;
  async function complete() {
    if (!siteConfig.launch.salesEnabled) { setDone(true); return; }
    setSubmitting(true); setError('');
    try {
      const response = await fetch('/api/gift-drafts', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ consent, relationship: draft.person, message: draft.message === 'Otro mensaje' ? draft.customMessage : draft.message, story: draft.story, musicPreferences: [`Estilo: ${draft.musicStyle}`, draft.selectedSongs, draft.music && `Referencias propias: ${draft.music}`].filter(Boolean).join('\n'), extras: draft.extras, packId: draft.pack, dedication: draft.dedication }) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? 'No hemos podido guardar tu borrador.');
      sessionStorage.removeItem('gift-draft'); setDone(true);
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'No hemos podido guardar tu borrador.'); } finally { setSubmitting(false); }
  }
  if (done) return <Proposal draft={draft} onEdit={() => { setDone(false); setStep(3); }} />;
  return <main className="configurator"><Header currentStep={step} /><section className="config-shell"><aside><p className="eyebrow"><span /> crear un regalo</p><ol>{steps.map((label, index) => <li className={index === step ? 'active' : index < step ? 'complete' : ''} key={label}><span>{String(index + 1).padStart(2, '0')}</span>{label}</li>)}</ol><p className="config-privacy">{siteConfig.launch.salesEnabled ? 'Solo guardaremos tu historia con tu permiso explícito.' : 'Este borrador se guarda únicamente en este dispositivo mientras preparas la idea.'}</p></aside><section className="config-question"><p className="eyebrow"><span /> {steps[step]}</p>{step === 0 && <ChoiceStep title={<>¿Para quién<br /><em>es esto?</em></>} choices={people} selected={draft.person} onSelect={(value) => set('person', value)} />}{step === 1 && <><ChoiceStep title={<>¿Qué quieres<br /><em>decirle?</em></>} choices={messages} selected={draft.message} onSelect={(value) => set('message', value)} message />{draft.message === 'Otro mensaje' && <textarea value={draft.customMessage ?? ''} onChange={(event) => set('customMessage', event.target.value)} placeholder="Escríbelo como te salga." />}</>}{step === 2 && <TextStep title={<>Cuéntanos<br /><em>vuestra historia.</em></>} copy="Un recuerdo, una anécdota, una fecha o esa cosa que solo entendéis vosotros. No hace falta escribir bonito." value={draft.story} onChange={(value) => set('story', value)} placeholder="Por ejemplo: nos conocimos en aquel concierto bajo la lluvia…" />}{step === 3 && <ChoiceStep title={<>¿Qué sonido<br /><em>le emociona?</em></>} choices={musicStyles} selected={draft.musicStyle} onSelect={(value) => set('musicStyle', value)} message />}{step === 4 && <MusicStep message={draft.message} style={draft.musicStyle} selected={draft.selectedSongs} onSelect={(value) => set('selectedSongs', value)} music={draft.music} onMusicChange={(value) => set('music', value)} />}{step === 5 && <PackStep selected={draft.pack} onSelect={(value) => set('pack', value)} />}{step === 6 && <BoxStep selected={draft.extras} onSelect={(value) => set('extras', value)} />}{step === 7 && <><TextStep title={<>El último<br /><em>detalle.</em></>} copy="Si quieres, deja una dedicatoria, una ocasión o una fecha. Podrás revisarlo todo antes de enviar una solicitud real." value={draft.dedication} onChange={(value) => set('dedication', value)} placeholder="Una dedicatoria, fecha especial u ocasión…" />{siteConfig.launch.salesEnabled && <label className="consent"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} /> <span>Autorizo a guardar esta información para preparar mi propuesta durante un máximo de 30 días.</span></label>}</>}{error && <p className="form-error" role="alert">{error}</p>}<div className="config-actions"><button className="back" disabled={step === 0 || submitting} onClick={() => setStep((value) => value - 1)}>← Volver</button><button className="button" disabled={!canContinue || submitting} onClick={() => step === steps.length - 1 ? void complete() : setStep((value) => value + 1)}>{submitting ? 'Guardando…' : step === steps.length - 1 ? 'Ver mi propuesta' : 'Continuar'} <span>→</span></button></div></section></section></main>;
}

function Header({ currentStep }: { currentStep?: number }) { return <header className="site-header"><Link href="/" className="logo"><span className="logo-mark">◎</span><span>{siteConfig.brand.name}</span></Link>{typeof currentStep === 'number' && <span className="config-status">Paso {currentStep + 1} de {steps.length}</span>}</header>; }
function ChoiceStep({ title, choices, selected, onSelect, message }: { title: ReactNode; choices: string[]; selected?: string; onSelect: (value: string) => void; message?: boolean }) { return <><h1>{title}</h1><div className={`choice-grid${message ? ' message-grid' : ''}`}>{choices.map((item) => <button className={selected === item ? 'selected' : ''} onClick={() => onSelect(item)} key={item}>{item}</button>)}</div></>; }
function TextStep({ title, copy, value, onChange, placeholder }: { title: ReactNode; copy: string; value?: string; onChange: (value: string) => void; placeholder: string }) { return <><h1>{title}</h1><p>{copy}</p><textarea value={value ?? ''} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} rows={7} /></>; }
function matchesStyle(song: { artist: string; year: number }, style?: string) {
  if (!style || style === 'Déjate guiar') return true;
  const spanishArtists = ['Kiko Veneno', 'Mercedes Sosa', 'Camilo Sesto', 'Café Tacvba', 'Roberto Carlos', 'Piero', 'Víctor Manuel', 'Mocedades', 'José Feliciano'];
  const soulArtists = ['Sly & The Family Stone', 'The Style Council', 'Al Green', 'The Stylistics', 'Stevie Wonder', 'Kool & The Gang', 'Etta James', 'Bill Withers', 'Dionne Warwick & Friends', 'Luther Vandross'];
  if (style === 'Canción en castellano') return spanishArtists.includes(song.artist);
  if (style === 'Clásicos, soul y jazz') return soulArtists.includes(song.artist) || song.year < 1980;
  if (style === 'Pop de los 80 y 90') return song.year >= 1980 && song.year < 2000;
  if (style === 'Rock, indie y alternativo') return ['The Beatles', 'The Cure', 'The Police', 'David Bowie', 'The Pogues feat. Kirsty MacColl', 'Cat Stevens', 'Cyndi Lauper'].includes(song.artist);
  return false;
}
function MusicStep({ message, style, selected, onSelect, music, onMusicChange }: { message?: string; style?: string; selected?: string; onSelect: (value: string) => void; music?: string; onMusicChange: (value: string) => void }) {
  const theme = message ? themeForMessage[message] : undefined;
  const candidates = theme ? musicCandidates[theme] : [];
  const sortedCandidates = [...candidates].sort((a, b) => Number(matchesStyle(b, style)) - Number(matchesStyle(a, style))).slice(0, 4);
  const selectedSongs = new Set((selected ?? '').split('\n').filter(Boolean));
  const toggle = (song: string) => { const next = new Set(selectedSongs); if (next.has(song)) next.delete(song); else next.add(song); onSelect([...next].join('\n')); };
  return <><h1>Estas canciones<br /><em>pueden decirlo.</em></h1><p>Priorizamos <b>{style?.toLowerCase() ?? 'tu estilo'}</b> y el sentido de la letra. Marca las que os representen; comprobaremos la edición y el estado del disco antes de proponerlo.</p>{candidates.length > 0 ? <div className="song-choices">{sortedCandidates.map((song) => { const label = `${song.artist} — ${song.title}`; const active = selectedSongs.has(label); const spotifySearch = `https://open.spotify.com/search/${encodeURIComponent(`${song.artist} ${song.title}`)}`; return <div className="song-card" key={label}><button type="button" className={active ? 'selected' : ''} aria-pressed={active} onClick={() => toggle(label)}><span>{active ? '✓ elegida' : 'marcar canción'}</span><strong>{song.title}</strong><b>{song.artist} · {song.year}</b><small>{song.lyricReading}</small></button><a href={spotifySearch} target="_blank" rel="noreferrer">Escuchar en Spotify ↗</a></div>; })}</div> : <p className="music-empty">Cuéntanos vuestra música y prepararemos estas primeras pistas manualmente.</p>}<textarea value={music ?? ''} onChange={(event) => onMusicChange(event.target.value)} placeholder="Añade artistas, décadas, canciones propias o cosas que preferís evitar…" rows={4} /></>;
}
function Proposal({ draft, onEdit }: { draft: Draft; onEdit: () => void }) {
  const theme = draft.message ? themeForMessage[draft.message] : undefined;
  const suggestions = theme ? musicCandidates[theme] : [];
  const selected = new Set((draft.selectedSongs ?? '').split('\n').filter(Boolean));
  const songs = selected.size > 0 ? suggestions.filter((song) => selected.has(`${song.artist} — ${song.title}`)) : suggestions.slice(0, 3);
  const extras = (draft.extras ?? '').split('\n').filter(Boolean);
  return <main className="configurator"><Header /><section className="proposal"><div className="proposal-intro"><p className="eyebrow"><span /> primera propuesta</p><h1>Ya tenemos<br /><em>la primera pista.</em></h1><p>Hemos partido de vuestra historia y del mensaje que quieres dejar. Estas son pistas editoriales: los discos finales se eligen únicamente de nuestra colección disponible, sin compras externas automáticas.</p>{draft.story && <blockquote>“{draft.story}”</blockquote>}</div><div className="proposal-selection"><p className="eyebrow"><span /> para {draft.person?.toLowerCase() ?? 'esa persona'}</p><h2>{draft.message === 'Otro mensaje' ? draft.customMessage : draft.message}</h2><div className="proposal-box"><Image src="/images/dilo-box-proposal-v2.png" alt="Vista previa de una caja DILO plana, estilo caja de pizza, con discos, tarjeta y extras" width={1536} height={1024} /><p>Vista orientativa del packaging. Los discos reales se sustituyen por las ediciones confirmadas.</p></div>{songs.length > 0 ? <ol>{songs.map((song, index) => <li key={`${song.artist}-${song.title}`}><span>0{index + 1}</span><div><h3>{song.title}</h3><p>{song.artist} · {song.year} · {song.formatPreference === 'single-7' ? 'buscar primero en single 7″' : 'buscar primero en LP'}</p><small>{song.lyricReading}</small></div></li>)}</ol> : <p className="proposal-empty">Con tus referencias, prepararemos una selección manual para la revisión.</p>}<div className="proposal-includes"><b>En tu caja</b><span>{includedInEveryBox.join(' · ')}</span>{extras.length > 0 && <span>Extras: {extras.join(' · ')}</span>}</div><p className="proposal-note">{siteConfig.launch.salesEnabled ? 'Esta solicitud se ha enviado al equipo para comprobar el inventario propio y el estado de cada edición.' : 'Esta propuesta queda guardada solo en este navegador. Aún no se envía ningún pedido ni dato al equipo.'}</p><div className="proposal-actions"><button className="back" onClick={onEdit}>← Cambiar la música o la caja</button><Link className="button" href="/">Guardar y volver al inicio <span>→</span></Link></div></div></section></main>;
}
function BoxStep({ selected, onSelect }: { selected?: string; onSelect: (value: string) => void }) {
  const selectedExtras = new Set((selected ?? '').split('\n').filter(Boolean));
  const toggle = (name: string) => { const next = new Set(selectedExtras); if (next.has(name)) next.delete(name); else next.add(name); onSelect([...next].join('\n')); };
  return <><h1>Así quedará<br /><em>su caja.</em></h1><p>Una caja baja y plana, como una caja de pizza hecha para vinilos. La tarjeta, la guía de escucha y la protección de los discos siempre van incluidas.</p><div className="letter-template"><p>Una carta. Muchas canciones.</p><b>Tu dedicatoria abre la caja y cada disco continúa la historia.</b><small>La carta se adapta con el mensaje y el porqué de cada canción.</small><a href="/resources/DILO_Carta_Editable.pptx" download>Descargar plantilla editable ↗</a></div><div className="box-preview"><Image src="/images/dilo-box-proposal-v2.png" alt="Mockup de una caja DILO plana, estilo caja de pizza, abierta con vinilos y detalles" width={1536} height={1024} priority /><span>Vista orientativa · las ediciones reales se confirman después</span></div><div className="included-list"><b>Incluido siempre</b>{includedInEveryBox.map((item) => <span key={item}>✓ {item}</span>)}</div><div className="extras-choices">{optionalExtras.map((extra) => { const active = selectedExtras.has(extra.name); return <button type="button" className={active ? 'selected' : ''} aria-pressed={active} key={extra.name} onClick={() => toggle(extra.name)}><span>{active ? '✓ añadido' : 'añadir'}</span><strong>{extra.name}</strong><small>{extra.detail}</small><b>{extra.price}</b></button>; })}</div></>;
}
function PackStep({ selected, onSelect }: { selected?: string; onSelect: (value: string) => void }) { return <><h1>Elige el tamaño<br /><em>de la historia.</em></h1><div className="pack-choices">{siteConfig.packs.map((pack) => <button className={selected === pack.id ? 'selected' : ''} key={pack.id} onClick={() => onSelect(pack.id)}><span>{pack.vinylCount} vinilos</span><strong>{pack.name}</strong><small>{pack.presentation}</small><b>{(pack.priceCents / 100).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</b></button>)}</div></>; }
