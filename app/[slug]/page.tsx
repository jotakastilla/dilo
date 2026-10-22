import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { landingContent } from '@/lib/landing-content';
import { siteConfig } from '@/lib/site-config';

export function generateStaticParams() {
  return Object.keys(landingContent).map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = landingContent[params.slug];
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${params.slug}` },
  };
}

export default function LandingPage({ params }: { params: { slug: string } }) {
  const page = landingContent[params.slug];
  if (!page) notFound();
  return (
    <main className="dilo-editorial dilo-landing">
      <header className="dilo-nav">
        <a href="/" className="dilo-wordmark" aria-label="DILO, inicio">
          DIL<span>◉</span>
        </a>
        <a className="dilo-cart" href="/crear-regalo">
          Crear mi caja <span>→</span>
        </a>
      </header>
      <section className="dilo-landing-hero">
        <p className="dilo-kicker">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
        <a className="dilo-button dilo-button--red" href="/crear-regalo">
          Crear mi caja DILO <span>→</span>
        </a>
      </section>
      <section className="dilo-landing-detail">
        <div>
          <p className="dilo-kicker">Una selección con sentido</p>
          <h2>
            No elegimos
            <br />
            <i>al azar.</i>
          </h2>
        </div>
        <div>
          <p>
            Cada propuesta parte de lo que nos cuentas y se contrasta con el
            inventario disponible. Son vinilos originales con historia:
            revisamos su disponibilidad y estado antes de confirmar una
            colección.
          </p>
          <p>
            Si no existe una selección adecuada, te lo diremos con claridad y la
            pasaremos a revisión manual.
          </p>
        </div>
      </section>
      <section className="dilo-landing-examples">
        <p className="dilo-kicker">Ideas para empezar</p>
        <div>
          {page.examples.map((example, index) => (
            <article key={example}>
              <span>0{index + 1}</span>
              <h3>{example}</h3>
              <p>
                Una propuesta construida a partir de recuerdos, gustos y un
                mensaje personal.
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="dilo-landing-cta">
        <p>{siteConfig.brand.tagline}</p>
        <a className="dilo-button dilo-button--cream" href="/crear-regalo">
          Cuéntanos vuestra historia <span>→</span>
        </a>
      </section>
      <footer className="dilo-footer">
        <a className="dilo-wordmark" href="/">
          DIL<span>◉</span>
        </a>
        <a href={`mailto:${siteConfig.brand.email}`}>
          {siteConfig.brand.email}
        </a>
      </footer>
    </main>
  );
}
