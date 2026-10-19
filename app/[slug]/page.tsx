import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { landingContent } from '@/lib/landing-content';
import { siteConfig } from '@/lib/site-config';

export function generateStaticParams() {
  return Object.keys(landingContent).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = landingContent[params.slug];
  if (!page) return {};
  return { title: page.title, description: page.description, alternates: { canonical: `/${params.slug}` } };
}

export default function LandingPage({ params }: { params: { slug: string } }) {
  const page = landingContent[params.slug];
  if (!page) notFound();
  return <main className="landing-page">
    <header className="site-header"><Link href="/" className="logo"><span className="logo-mark">d</span><span>{siteConfig.brand.name.toLowerCase()}</span></Link><Link className="header-link" href="/crear-regalo">Crear mi regalo <span>↗</span></Link></header>
    <section className="landing-hero"><p className="eyebrow"><span />{page.eyebrow}</p><h1>{page.title}</h1><p>{page.intro}</p><Link className="button" href="/crear-regalo">Crear mi regalo <span>→</span></Link></section>
    <section className="landing-detail"><div><p className="eyebrow"><span /> una selección con sentido</p><h2>No elegimos<br /><em>al azar.</em></h2></div><div><p>Cada propuesta parte de lo que nos cuentas y se contrasta con el inventario disponible. Los vinilos son originales de segunda mano: revisamos su disponibilidad y estado antes de confirmar una colección.</p><p>Si no existe una selección adecuada, te lo diremos con claridad y la pasaremos a revisión manual.</p></div></section>
    <section className="landing-examples"><p className="eyebrow"><span /> ideas para empezar</p><div>{page.examples.map((example, index) => <article key={example}><span>0{index + 1}</span><h3>{example}</h3><p>Una propuesta construida a partir de recuerdos, gustos y un mensaje personal.</p></article>)}</div></section>
    <section className="landing-cta"><p>{siteConfig.brand.tagline}</p><Link className="button button-light" href="/crear-regalo">Cuéntanos vuestra historia <span>→</span></Link></section>
    <footer><Link className="logo" href="/"><span className="logo-mark">d</span><span>{siteConfig.brand.name.toLowerCase()}</span></Link><a href={`mailto:${siteConfig.brand.email}`}>{siteConfig.brand.email}</a></footer>
  </main>;
}
