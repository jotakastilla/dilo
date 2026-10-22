import { siteConfig } from '@/lib/site-config';

export const metadata = {
  title: 'Información de compra',
  description:
    'Información de compra, entregas, devoluciones y privacidad de DILO.',
};

export default function PurchaseInformationPage() {
  return (
    <main className="dilo-editorial info-page">
      <header className="dilo-nav">
        <a href="/" className="dilo-wordmark" aria-label="DILO, inicio">
          DIL<span>◉</span>
        </a>
        <a className="dilo-cart" href="/crear-regalo">
          Crear mi caja <span>→</span>
        </a>
      </header>
      <section className="info-hero">
        <p className="dilo-kicker">Información de compra</p>
        <h1>
          Comprar con
          <br />
          <i>claridad.</i>
        </h1>
        <p>
          Esta página reúne la información que verás antes de finalizar un
          pedido DILO.
        </p>
      </section>
      <section className="info-notice">
        <b>Producción bajo demanda</b>
        <p>
          Cada caja se prepara bajo demanda después de confirmar el pago. El
          plazo estimado es de 10–12 días y el envío dentro de España está
          incluido en el precio mostrado.
        </p>
      </section>
      <section className="info-grid">
        <article>
          <p className="dilo-kicker">Identificación</p>
          <h2>Quién vende.</h2>
          <p>
            DILO es el nombre comercial de esta tienda de regalos musicales.
            Para cualquier consulta sobre un pedido puedes escribir a{' '}
            <a href={`mailto:${siteConfig.brand.email}`}>
              {siteConfig.brand.email}
            </a>
            .
          </p>
        </article>
        <article>
          <p className="dilo-kicker">Entrega</p>
          <h2>Cómo llega.</h2>
          <p>
            Prepararemos cada caja tras la confirmación del pedido. El plazo
            estimado de preparación y entrega es de 10–12 días. El envío a
            España está incluido en el precio final.
          </p>
        </article>
        <article>
          <p className="dilo-kicker">Devoluciones</p>
          <h2>Si algo no encaja.</h2>
          <p>
            Si necesitas cancelar un pedido o solicitar una devolución, escribe
            a{' '}
            <a href={`mailto:${siteConfig.brand.email}`}>
              {siteConfig.brand.email}
            </a>{' '}
            indicando el número de pedido. Te ayudaremos a gestionar la
            cancelación o el reembolso.
          </p>
        </article>
        <article>
          <p className="dilo-kicker">Privacidad</p>
          <h2>Tus datos.</h2>
          <p>
            Usaremos los datos necesarios para preparar y entregar tu pedido.
            El pago se procesa de forma segura a través de Stripe; DILO no
            recibe los datos de tu tarjeta.
          </p>
        </article>
      </section>
      <section className="info-contact">
        <p className="dilo-kicker">Contacto</p>
        <h2>¿Tienes una duda?</h2>
        <p>
          Mientras preparamos el lanzamiento, puedes escribirnos a{' '}
          <a href={`mailto:${siteConfig.brand.email}`}>
            {siteConfig.brand.email}
          </a>
          .
        </p>
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
