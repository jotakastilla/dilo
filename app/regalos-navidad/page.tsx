import Image from 'next/image';
import { diloExtras, formatEuro } from '@/lib/catalog/dilo-extras';
import { siteConfig } from '@/lib/site-config';

export const metadata = {
  title: 'Regalos originales de Navidad',
  description:
    'Estas Navidades, DILO: una caja regalo con vinilos originales, historias y detalles para abrir despacio.',
};

export default function ChristmasGiftsPage() {
  return (
    <main className="dilo-editorial christmas-page">
      <header className="dilo-nav">
        <a className="dilo-wordmark" href="/" aria-label="DILO, inicio">
          DIL<span>◉</span>
        </a>
        <a className="dilo-cart" href="/crear-regalo?coleccion=vuelve-a-los-80">
          Crear mi caja <span>→</span>
        </a>
      </header>
      <section className="christmas-hero">
        <Image
          src="/images/dilo-hero-box-retro.png"
          alt="Caja DILO abierta preparada para regalar en Navidad"
          width={1670}
          height={940}
          priority
        />
        <div>
          <p className="dilo-kicker">Campaña Navidad 2026</p>
          <h1>
            Estas Navidades,
            <br />
            <i>DILO.</i>
          </h1>
          <p>Hay regalos que se abren. Y regalos que vuelven a sonar.</p>
          <a className="dilo-button dilo-button--red" href="/crear-regalo">
            Crea tu regalo DILO <span>→</span>
          </a>
        </div>
      </section>
      <section className="christmas-intro">
        <p className="dilo-kicker">Un regalo para abrir despacio</p>
        <h2>
          Cinco vinilos.
          <br />
          <i>Muchas historias.</i>
        </h2>
        <p>
          Eliges el estilo y el momento. Nosotros preparamos una selección de
          vinilos originales con historia, fichas de escucha y detalles para que
          el regalo empiece antes de que suene el primer disco.
        </p>
      </section>
      <section className="christmas-steps">
        <article>
          <b>01</b>
          <h3>Elige el sonido</h3>
          <p>80, música española o canciones para dos.</p>
        </article>
        <article>
          <b>02</b>
          <h3>Personaliza</h3>
          <p>Añade una dedicatoria y, si quieres, un detalle extra.</p>
        </article>
        <article>
          <b>03</b>
          <h3>Regala música</h3>
          <p>Recibe una caja preparada para abrir y escuchar.</p>
        </article>
      </section>
      <section className="christmas-collections">
        <p className="dilo-kicker">Colecciones para regalar</p>
        <div>
          {siteConfig.packs.map((pack) => (
            <article key={pack.id}>
              <Image
                src={pack.montage}
                alt={pack.name}
                width={720}
                height={540}
              />
              <h3>{pack.name}</h3>
              <p>{pack.presentation}</p>
              <b>Desde {formatEuro(pack.priceCents)}</b>
              <a href={`/crear-regalo?coleccion=${pack.id}`}>
                Elegir colección →
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="christmas-unboxing">
        <Image
          src="/images/dilo-unboxing-reference.png"
          alt="Caja DILO con carta, fichas de escucha y posavasos"
          width={1536}
          height={1024}
        />
        <div>
          <p className="dilo-kicker">Dentro de la caja</p>
          <h2>
            Mucho más
            <br />
            <i>que música.</i>
          </h2>
          <ul>
            <li>Vinilos originales seleccionados</li>
            <li>Carta de bienvenida DILO</li>
            <li>Fichas de escucha de cada disco</li>
            <li>Dos posavasos sorpresa y pegatinas</li>
            <li>Dedicatoria impresa, si la escribes</li>
          </ul>
        </div>
      </section>
      <section className="christmas-extras">
        <p className="dilo-kicker">Un detalle más</p>
        <h2>Extras DILO.</h2>
        <div>
          {diloExtras.map((extra) => (
            <article key={extra.id}>
              <Image
                src={extra.image}
                alt={extra.name}
                width={1200}
                height={1200}
              />
              <h3>{extra.name}</h3>
              <p>{extra.description}</p>
              <b>{formatEuro(extra.priceCents)}</b>
            </article>
          ))}
        </div>
      </section>
      <section className="christmas-delivery">
        <p className="dilo-kicker">Entrega de Navidad</p>
        <h2>
          Sin promesas
          <br />
          <i>vacías.</i>
        </h2>
        <p>
          Los envíos a Península se realizan con Correos y el plazo estimado de
          entrega es de 3 a 5 días laborables. La fecha límite de Navidad se
          publicará cuando esté confirmada. Antes de pagar verás siempre la
          información real disponible para tu pedido.
        </p>
      </section>
      <section className="christmas-faq">
        <p className="dilo-kicker">Dudas normales</p>
        <h2>Antes de regalar.</h2>
        <details>
          <summary>¿Los vinilos son originales?</summary>
          <p>
            Sí. Seleccionamos vinilos originales con historia dentro del estilo
            que elijas.
          </p>
        </details>
        <details>
          <summary>¿Puedo elegir títulos concretos?</summary>
          <p>
            No garantizamos títulos concretos. La caja es sorpresa, pero la
            selección se hace con criterio y según el stock disponible.
          </p>
        </details>
        <details>
          <summary>¿Puedo incluir una dedicatoria?</summary>
          <p>
            Sí, puedes escribirla al crear la caja y la añadiremos a la tarjeta.
          </p>
        </details>
        <details>
          <summary>¿Cuánto tarda en llegar?</summary>
          <p>
            Mostraremos los plazos reales antes de activar el pago. No
            prometemos una fecha sin respaldo logístico.
          </p>
        </details>
      </section>
      <footer className="dilo-footer">
        <a className="dilo-wordmark" href="/">
          DIL<span>◉</span>
        </a>
        <p>Vinilos que cuentan historias.</p>
        <a href={`mailto:${siteConfig.brand.email}`}>
          {siteConfig.brand.email}
        </a>
      </footer>
    </main>
  );
}
