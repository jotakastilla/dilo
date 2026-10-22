'use client';

import Image from 'next/image';
import { useEffect, useState, type ReactNode } from 'react';
import { diloExtras, formatEuro } from '@/lib/catalog/dilo-extras';
import { siteConfig } from '@/lib/site-config';

const people = [
  'Pareja',
  'Amigo',
  'Amiga',
  'Padre',
  'Madre',
  'Hermano',
  'Hermana',
  'Familiar',
  'Otra persona',
];
const occasions = [
  'Cumpleaños',
  'Navidad',
  'Aniversario',
  'Gracias',
  'Porque sí',
  'Otro momento',
];
type Draft = {
  person?: string;
  occasion?: string;
  pack: string;
  boxSize: string;
  dedication?: string;
  extras: string[];
};

export default function CreateGiftPage() {
  const [draft, setDraft] = useState<Draft>({
    pack: siteConfig.packs[0].id,
    boxSize: siteConfig.boxSizes[0].id,
    extras: [],
  });
  const [loaded, setLoaded] = useState(false);
  const [done, setDone] = useState(false);
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('gift-draft');
      const stored = saved ? (JSON.parse(saved) as Partial<Draft>) : {};
      const collection = new URLSearchParams(window.location.search).get(
        'coleccion',
      );
      setDraft({
        person: stored.person,
        occasion: stored.occasion,
        dedication: stored.dedication,
        extras: Array.isArray(stored.extras) ? stored.extras : [],
        pack: siteConfig.packs.some(({ id }) => id === collection)
          ? collection!
          : (stored.pack ?? siteConfig.packs[0].id),
        boxSize: stored.boxSize ?? siteConfig.boxSizes[0].id,
      });
    } finally {
      setLoaded(true);
    }
  }, []);
  useEffect(() => {
    if (loaded) sessionStorage.setItem('gift-draft', JSON.stringify(draft));
  }, [draft, loaded]);
  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));
  const collection =
    siteConfig.packs.find((pack) => pack.id === draft.pack) ??
    siteConfig.packs[0];
  const box =
    siteConfig.boxSizes.find((item) => item.id === draft.boxSize) ??
    siteConfig.boxSizes[0];
  const selectedExtras = diloExtras.filter((extra) =>
    draft.extras.includes(extra.id),
  );
  const total =
    box.priceCents +
    selectedExtras.reduce((sum, extra) => sum + extra.priceCents, 0);
  const canContinue = Boolean(
    draft.person && draft.occasion && draft.pack && draft.boxSize,
  );
  const toggleExtra = (id: string) =>
    set(
      'extras',
      draft.extras.includes(id)
        ? draft.extras.filter((item) => item !== id)
        : [...draft.extras, id],
    );
  if (done)
    return (
      <Proposal
        draft={draft}
        collection={collection}
        box={box}
        extras={selectedExtras}
        total={total}
        onEdit={() => setDone(false)}
      />
    );
  return (
    <main className="configurator">
      <Header />
      <section className="config-shell config-one-page">
        <aside className="config-intro">
          <p className="eyebrow">
            <span /> crear una caja
          </p>
          <h1>
            Todo el regalo,
            <br />
            <em>de una vez.</em>
          </h1>
          <p className="config-privacy">
            Elige para quién es, el momento, el sonido y los detalles. Sin
            pantallas intermedias.
          </p>
          <OrderSummary box={box} extras={selectedExtras} total={total} />
        </aside>
        <section className="config-question">
          <p className="eyebrow">
            <span /> tu selección
          </p>
          <ChoiceStep
            title={
              <>
                01 · ¿Para quién <em>es?</em>
              </>
            }
            choices={people}
            selected={draft.person}
            onSelect={(value) => set('person', value)}
          />
          <ChoiceStep
            title={
              <>
                02 · ¿Qué vais a <em>celebrar?</em>
              </>
            }
            choices={occasions}
            selected={draft.occasion}
            onSelect={(value) => set('occasion', value)}
          />
          <CollectionStep
            selected={draft.pack}
            onSelect={(value) => set('pack', value)}
          />
          <SizeStep
            selected={draft.boxSize}
            onSelect={(value) => set('boxSize', value)}
          />
          <ExtrasStep selected={draft.extras} onToggle={toggleExtra} />
          <section className="config-form-section">
            <h2>
              06 · Una frase <em>solo vuestra.</em>
            </h2>
            <p>
              La imprimiremos en una tarjeta dentro de la caja. Máximo 280
              caracteres.
            </p>
            <textarea
              maxLength={280}
              value={draft.dedication ?? ''}
              onChange={(event) => set('dedication', event.target.value)}
              placeholder="Una frase, una fecha o una ocasión…"
              rows={4}
            />
            <small className="character-count">
              {draft.dedication?.length ?? 0}/280
            </small>
          </section>
          <div className="config-actions">
            <span>
              Total provisional · <b>{formatEuro(total)}</b>
            </span>
            <button
              className="button"
              disabled={!canContinue}
              onClick={() => setDone(true)}
            >
              Revisar mi caja <span>→</span>
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a href="/" className="logo">
        <span className="logo-mark">◎</span>
        <span>DILO</span>
      </a>
    </header>
  );
}
function ChoiceStep({
  title,
  choices,
  selected,
  onSelect,
}: {
  title: ReactNode;
  choices: string[];
  selected?: string;
  onSelect: (value: string) => void;
}) {
  return (
    <section className="config-form-section">
      <h2>{title}</h2>
      <div className="choice-grid message-grid">
        {choices.map((item) => (
          <button
            type="button"
            className={selected === item ? 'selected' : ''}
            onClick={() => onSelect(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}
function CollectionStep({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <section className="config-form-section">
      <h2>
        03 · Elige el <em>sonido.</em>
      </h2>
      <p>
        Una selección sorpresa de vinilos originales con historia, dentro del
        estilo que elijas.
      </p>
      <div className="pack-choices">
        {siteConfig.packs.map((pack) => (
          <button
            type="button"
            className={`has-montage ${selected === pack.id ? 'selected' : ''}`}
            key={pack.id}
            onClick={() => onSelect(pack.id)}
          >
            <Image
              className="pack-montage"
              src={pack.montage}
              alt=""
              width={720}
              height={540}
            />
            <span>DILO</span>
            <strong>{pack.name}</strong>
            <small>{pack.presentation}</small>
            <span className="pack-examples">
              <b>Ejemplos de estilo, no títulos garantizados</b>
              {pack.examples.slice(0, 2).map((example) => (
                <i key={example}>{example}</i>
              ))}
            </span>
            <b>→</b>
          </button>
        ))}
      </div>
    </section>
  );
}
function SizeStep({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <section className="config-form-section">
      <h2>
        04 · ¿Cuántos vinilos <em>quieres regalar?</em>
      </h2>
      <p>
        Cada formato incluye vinilos originales seleccionados, fichas de
        escucha, carta, dos posavasos y caja kraft con pegatinas.
      </p>
      <div className="pack-choices">
        {siteConfig.boxSizes.map((box) => (
          <button
            type="button"
            className={selected === box.id ? 'selected' : ''}
            key={box.id}
            onClick={() => onSelect(box.id)}
          >
            <span>{box.vinylCount} vinilos seleccionados</span>
            <strong>{box.name}</strong>
            <small>{box.presentation}</small>
            <b>{formatEuro(box.priceCents)}</b>
          </button>
        ))}
      </div>
    </section>
  );
}
function ExtrasStep({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <section className="config-form-section">
      <h2>
        05 · Añade un <em>detalle.</em>
      </h2>
      <p>
        Opcionales. Los cuatro están disponibles y se suman al total al momento.
      </p>
      <div className="config-extras">
        {diloExtras.map((extra) => (
          <button
            type="button"
            className={selected.includes(extra.id) ? 'selected' : ''}
            key={extra.id}
            onClick={() => onToggle(extra.id)}
          >
            <Image src={extra.image} alt="" width={1200} height={1200} />
            <span>{selected.includes(extra.id) ? 'Añadido' : 'Añadir'}</span>
            <strong>{extra.name}</strong>
            <small>{extra.description}</small>
            <b>{formatEuro(extra.priceCents)}</b>
          </button>
        ))}
      </div>
    </section>
  );
}
function OrderSummary({
  box,
  extras,
  total,
}: {
  box: (typeof siteConfig.boxSizes)[number];
  extras: readonly (typeof diloExtras)[number][];
  total: number;
}) {
  return (
    <aside className="order-summary" aria-label="Resumen de tu compra">
      <p>Tu caja</p>
      <b>{box.name}</b>
      <span>{box.vinylCount} vinilos seleccionados</span>
      {extras.length > 0 && (
        <ul>
          {extras.map((extra) => (
            <li key={extra.id}>
              {extra.name}
              <b>{formatEuro(extra.priceCents)}</b>
            </li>
          ))}
        </ul>
      )}
      <strong>Total · {formatEuro(total)}</strong>
      <small>El pago se habilitará al terminar de configurar la entrega.</small>
    </aside>
  );
}
function Proposal({
  draft,
  collection,
  box,
  extras,
  total,
  onEdit,
}: {
  draft: Draft;
  collection: (typeof siteConfig.packs)[number];
  box: (typeof siteConfig.boxSizes)[number];
  extras: readonly (typeof diloExtras)[number][];
  total: number;
  onEdit: () => void;
}) {
  return (
    <main className="configurator">
      <Header />
      <section className="proposal">
        <div className="proposal-intro">
          <p className="eyebrow">
            <span /> resumen de regalo
          </p>
          <h1>
            Ya está
            <br />
            <em>elegida.</em>
          </h1>
          <p>
            Una caja para {draft.person?.toLowerCase()}, pensada para{' '}
            {draft.occasion?.toLowerCase()}.
          </p>
          {draft.dedication && <blockquote>“{draft.dedication}”</blockquote>}
        </div>
        <div className="proposal-selection">
          <p className="eyebrow">
            <span /> {collection.name} · {box.vinylCount} vinilos
          </p>
          <h2>{box.name}</h2>
          <div className="proposal-box">
            <Image
              src="/images/dilo-hero-box-retro.png"
              alt="Caja DILO real abierta con carta, posavasos, fichas de escucha, pegatinas y dedicatoria"
              width={1670}
              height={940}
            />
            <p>
              Así llega de verdad: caja kraft abierta, vinilos, fichas de
              escucha, carta, dos posavasos, pegatinas y tu dedicatoria si la
              has escrito.
            </p>
          </div>
          <div className="proposal-includes">
            <b>Incluido en tu caja</b>
            <span>
              {box.vinylCount} vinilos originales con historia · Fichas de
              escucha · Carta de bienvenida · Dos posavasos DILO · Dedicatoria
              impresa · Caja kraft con pegatinas
            </span>
          </div>
          {extras.length > 0 && (
            <div className="proposal-extras">
              <b>Extras añadidos</b>
              {extras.map((extra) => (
                <span key={extra.id}>
                  {extra.name} · {formatEuro(extra.priceCents)}
                </span>
              ))}
            </div>
          )}
          <p className="proposal-curation">
            <b>Una sorpresa, pero con criterio.</b> Combinamos clásicos que
            reconoce al momento con descubrimientos que le sonarán de toda la
            vida. Los títulos cambian según el stock real.
          </p>
          <p className="proposal-note">
            <strong>{formatEuro(total)}</strong> · Total provisional. El pago se
            activará al configurar la entrega.
          </p>
          <div className="proposal-actions">
            <button className="back" onClick={onEdit}>
              ← Editar mi caja
            </button>
            <button className="button checkout-button" type="button" disabled>
              Finalizar pedido <span>→</span>
            </button>
          </div>
          <small className="checkout-status">
            Estamos terminando de configurar envío y pago seguro con Stripe.{' '}
            <a href="/condiciones">Ver información de compra</a>
          </small>
        </div>
      </section>
    </main>
  );
}
