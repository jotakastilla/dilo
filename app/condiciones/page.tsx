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
        <b>Estado actual</b>
        <p>
          Los pagos todavía no están activados. Antes de abrir la venta, DILO
          publicará los datos completos de titularidad, contacto, entrega y
          devoluciones.
        </p>
      </section>
      <section className="info-grid">
        <article>
          <p className="dilo-kicker">Identificación</p>
          <h2>Quién vende.</h2>
          <p>
            DILO es el nombre comercial de esta tienda de regalos musicales. Los
            datos de titularidad legal, identificación fiscal, domicilio y canal
            de contacto se mostrarán antes de habilitar cualquier pago.
          </p>
        </article>
        <article>
          <p className="dilo-kicker">Entrega</p>
          <h2>Cómo llega.</h2>
          <p>
            Los envíos a Península se realizan con Correos. El plazo estimado de
            entrega es de 3 a 5 días laborables. El coste de envío y la
            información para otras zonas se mostrarán antes de activar el pago.
          </p>
        </article>
        <article>
          <p className="dilo-kicker">Devoluciones</p>
          <h2>Si algo no encaja.</h2>
          <p>
            Las condiciones, plazo, procedimiento y costes de devolución se
            publicarán antes de activar la venta. Podrás consultarlas desde el
            checkout antes de completar el pago.
          </p>
        </article>
        <article>
          <p className="dilo-kicker">Privacidad</p>
          <h2>Tus datos.</h2>
          <p>
            Usaremos los datos necesarios para preparar y entregar un pedido. La
            política de privacidad completa, responsable del tratamiento y
            derechos de las personas usuarias se incorporarán antes de recoger
            datos de pago o envío.
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
