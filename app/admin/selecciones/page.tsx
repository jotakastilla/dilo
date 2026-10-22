import { siteConfig } from '@/lib/site-config';

// The public Vercel build is a static launch site. The operational queue needs
// the private Cloudflare D1 binding, so it is intentionally not exposed here.
export const dynamic = 'force-static';

export default function SelectionReviewPage() {
  return (
    <main className="admin-page">
      <header className="site-header">
        <a className="logo" href="/">
          <span className="logo-mark">d</span>
          <span>{siteConfig.brand.name.toLowerCase()}</span>
        </a>
      </header>
      <section className="admin-shell">
        <p className="eyebrow">
          <span /> operaciones
        </p>
        <h1>
          Panel no
          <br />
          <em>disponible aquí.</em>
        </h1>
        <p className="admin-intro">
          La revisión de solicitudes se habilitará en el entorno privado cuando
          se activen las ventas.
        </p>
        <a className="button" href="/">
          Volver al inicio <span>→</span>
        </a>
      </section>
    </main>
  );
}
