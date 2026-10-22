import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';

const collections = [
  {
    pack: siteConfig.packs[0],
    number: '01',
    image: 'eighties',
    description:
      'Cinco vinilos para regresar a una década que nunca dejó de sonar.',
  },
  {
    pack: siteConfig.packs[1],
    number: '02',
    image: 'spain',
    description: 'Canciones que ya conocías antes de saber que eran recuerdos.',
  },
  {
    pack: siteConfig.packs[2],
    number: '03',
    image: 'love',
    description:
      'Canciones para decir algo cuando las palabras se quedan cortas.',
  },
] as const;

const included = [
  [
    'Vinilos originales',
    'Cinco pequeñas joyas con historia, elegidas dentro del estilo que marques.',
  ],
  [
    'Carta de bienvenida',
    'Una nota para empezar a abrir la caja como se abre una historia.',
  ],
  [
    'Fichas de escucha',
    'Contexto, canciones y una pista para saber por dónde empezar.',
  ],
  [
    'Dos posavasos sorpresa',
    'Un detalle DILO para acompañar la primera escucha.',
  ],
  [
    'Pegatinas DILO',
    'Para que la caja siga contando algo incluso después de abrirla.',
  ],
  [
    'Dedicatoria impresa',
    'La añadimos cuando quieras dejarle una frase solo vuestra.',
  ],
] as const;

const extras = [
  ['Taza DILO', '/images/dilo-extra-taza.png'],
  ['Abridor DILO', '/images/dilo-extra-abridor.png'],
  ['Tote bag', '/images/dilo-extra-tote.png'],
  ['Pack de posavasos', '/images/dilo-extra-posavasos.png'],
] as const;

export default function Home() {
  return (
    <main className="dilo-editorial">
      <header className="dilo-nav">
        <a className="dilo-wordmark" href="/" aria-label="DILO, inicio">
          DIL<span>◉</span>
        </a>
        <nav aria-label="Principal">
          <a href="#cajas">Cajas</a>
          <a href="#estilos">Estilos</a>
          <a href="#regalos">Regalos</a>
          <a href="#como-funciona">Cómo funciona</a>
        </nav>
        <a className="dilo-cart" href="/crear-regalo">
          Crear mi caja <span>→</span>
        </a>
      </header>
      <a className="christmas-ribbon" href="/regalos-navidad">
        <span>✦</span> Estas Navidades, DILO <b>Descubrir regalos →</b>
      </a>

      <section className="dilo-hero-2026">
        <Image
          className="dilo-hero-photo"
          src="/images/dilo-hero-box-retro.png"
          alt="Caja DILO abierta con vinilos, fichas de escucha, carta, posavasos y pegatinas"
          width={1670}
          height={940}
          priority
        />
        <div className="dilo-hero-overlay" />
        <div className="dilo-hero-copy">
          <p className="dilo-kicker">DILO · VINILOS QUE CUENTAN HISTORIAS</p>
          <h1>
            No tengas
            <br />
            miedo y <i>DILO.</i>
          </h1>
          <p>
            Regala música de verdad. Vinilos originales, historias y recuerdos
            dentro de una caja que merece la pena abrir.
          </p>
          <div className="dilo-hero-actions">
            <a className="dilo-button dilo-button--red" href="/crear-regalo">
              Crea tu caja DILO <span>→</span>
            </a>
            <a className="dilo-text-link" href="#cajas">
              Descubre qué hay dentro <span>↓</span>
            </a>
          </div>
        </div>
        <p className="dilo-hero-note">
          Selección sorpresa con criterio · Discos originales con historia
        </p>
      </section>
      <section
        className="dilo-benefits"
        aria-label="Lo esencial de una caja DILO"
      >
        <p>Vinilos originales seleccionados</p>
        <p>Una experiencia preparada para regalar</p>
        <p>Fichas musicales y detalles DILO</p>
      </section>

      <section className="dilo-steps" id="como-funciona">
        <div className="dilo-section-title">
          <p className="dilo-kicker">Así de fácil</p>
          <h2>
            Cómo funciona
            <br />
            <i>tu regalo.</i>
          </h2>
        </div>
        <ol>
          {[
            [
              '01',
              'Elige el estilo.',
              'Una época, un sonido o una emoción para empezar la historia.',
            ],
            [
              '02',
              'Seleccionamos los vinilos.',
              'Combinamos clásicos que reconoce con joyas por redescubrir.',
            ],
            [
              '03',
              'Recibe la caja.',
              'Kraft, vinilos, fichas y detalles preparados para abrir despacio.',
            ],
          ].map(([number, title, text]) => (
            <li key={number}>
              <b>{number}</b>
              <span className="dilo-mini-record" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <a className="dilo-button" href="/crear-regalo">
          Empezar mi caja <span>→</span>
        </a>
      </section>

      <section className="dilo-unboxing" id="cajas">
        <div className="dilo-unboxing-photo">
          <Image
            src="/images/dilo-unboxing-reference.png"
            alt="Los detalles que incluye una caja DILO"
            width={1536}
            height={1024}
          />
          <span>Una caja para abrir, mirar y escuchar.</span>
        </div>
        <div className="dilo-unboxing-copy">
          <p className="dilo-kicker">Mucho más que cinco discos</p>
          <h2>
            Lo que llega
            <br />
            <i>a casa.</i>
          </h2>
          <p className="dilo-lead">
            No es una caja con discos al azar. Es una selección musical
            acompañada de los pequeños detalles que hacen especial el regalo.
          </p>
          <div className="dilo-included-grid">
            {included.map(([title, text], index) => (
              <article key={title}>
                <b>{String(index + 1).padStart(2, '0')}</b>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dilo-collections" id="estilos">
        <div className="dilo-section-title">
          <p className="dilo-kicker">Elige el sonido</p>
          <h2>
            Una época.
            <br />
            <i>Una caja.</i>
          </h2>
          <p>
            Las colecciones empiezan por un estilo. La selección final depende
            siempre de las joyas que tengamos disponibles.
          </p>
        </div>
        <div className="dilo-collection-grid">
          {collections.map(({ pack, number, image, description }) => (
            <article
              className={`dilo-collection-card dilo-collection-card--${image}`}
              key={pack.id}
            >
              <Image
                src={pack.montage}
                alt={`Montaje de vinilos para ${pack.name}`}
                width={720}
                height={540}
              />
              <div>
                <p>DILO {number}</p>
                <h3>{pack.name}</h3>
                <span>{description}</span>
                <b>
                  Desde{' '}
                  {(pack.priceCents / 100).toLocaleString('es-ES', {
                    style: 'currency',
                    currency: 'EUR',
                  })}
                </b>
                <a href={`/crear-regalo?coleccion=${pack.id}`}>
                  Elegir esta colección <i>→</i>
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="dilo-stock-note">
          Los artistas y álbumes que mostramos son referencias del estilo, no
          títulos garantizados. La selección final varía según el stock real.
        </p>
      </section>

      <section className="dilo-extras" id="regalos">
        <div className="dilo-section-title">
          <p className="dilo-kicker">Por si quieres decir algo más</p>
          <h2>
            Detalles que
            <br />
            <i>enamoran.</i>
          </h2>
          <p>
            Estos extras son opcionales. La caja ya llega completa; aquí puedes
            añadir un gesto más a tu regalo.
          </p>
        </div>
        <div className="dilo-extra-list">
          {extras.map(([extra, image], index) => (
            <article key={extra}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div className="dilo-extra-image">
                <Image src={image} alt={extra} width={1200} height={1200} />
              </div>
              <h3>{extra}</h3>
              <p>Extra opcional</p>
            </article>
          ))}
        </div>
        <p className="dilo-extras-footnote">
          Disponibles durante la configuración de la caja.
        </p>
      </section>

      <section className="dilo-manifesto">
        <p className="dilo-kicker">DILO · VINILOS QUE CUENTAN HISTORIAS</p>
        <h2>
          No es nostalgia.
          <br />
          <i>Es buena música.</i>
        </h2>
        <p>
          Hay cosas que solo se dicen con música. Por eso elegimos discos que ya
          han vivido algo y están listos para volver a sonar en otra casa.
        </p>
        <a className="dilo-button dilo-button--cream" href="/crear-regalo">
          Si no sabes qué regalar, DILO <span>→</span>
        </a>
      </section>

      <footer className="dilo-footer">
        <a className="dilo-wordmark" href="/">
          DIL<span>◉</span>
        </a>
        <p>Vinilos que cuentan historias.</p>
        <a href="/condiciones">Información de compra</a>
        <a href={`mailto:${siteConfig.brand.email}`}>
          {siteConfig.brand.email}
        </a>
      </footer>
    </main>
  );
}
