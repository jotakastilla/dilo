import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';

const occasions = [
  ['Para Navidad', '/regalos-originales-navidad'], ['Para una pareja', '/regalos-para-parejas'], ['Para tu mejor amigo', '/para-mi-mejor-amigo'], ['Para cumpleaños', '/regalos-cumpleanos'], ['Para mamá', '/regalos-dia-de-la-madre'], ['Para papá', '/regalos-dia-del-padre'],
];
const messages = [
  ['Te quiero', '/quiero-decirte-te-quiero'], ['Te echo de menos', '/te-echo-de-menos'], ['Gracias por todo', '/gracias-por-todo'], ['Perdóname', '/perdoname'], ['Nuestra historia', '/nuestra-historia'], ['Eres mi persona', '/regalos-para-amigos'],
];

export default function Home() {
  return <main className="home-v2">
    <header className="site-header"><Link href="/" className="logo" aria-label={`${siteConfig.brand.name}, inicio`}><span className="logo-mark">◎</span><span>{siteConfig.brand.name}</span></Link><nav aria-label="Principal"><a href="#como-funciona">Cómo funciona</a><a href="#packs">Los packs</a><a href="#inspiracion">Ideas</a></nav><Link className="header-link" href="/crear-regalo">Crear mi regalo <span>↗</span></Link></header>

    <section className="v2-hero"><div className="v2-copy"><p className="eyebrow"><span /> regalos que se escuchan</p><h1>La caja para<br /><em>decirlo todo.</em></h1><p>Dentro van tu mensaje, vuestra música y los recuerdos que no caben en una tarjeta. Nosotros los convertimos en una selección de vinilos para regalar.</p><div className="v2-actions"><Link className="button" href="/crear-regalo">Crear mi regalo <span>→</span></Link><a className="text-link" href="#como-funciona">Descubre cómo funciona <span>↓</span></a></div><small>Vinilos originales de segunda mano · Selección revisada a mano</small></div><figure className="v2-hero-image"><Image src="/images/dilo-hero-comic-v1.png" alt="Ilustración de una persona abriendo una caja regalo de vinilos DILO" width={1680} height={960} priority /><figcaption>una historia preparada para sonar</figcaption></figure></section>

    <section id="como-funciona" className="v2-steps"><div><p className="eyebrow"><span /> así de sencillo</p><h2>Una historia.<br /><em>Una caja.</em></h2></div><ol><li><span>01</span><h3>Tú nos das las pistas.</h3><p>La persona, el mensaje, los recuerdos y la música que os representa.</p></li><li><span>02</span><h3>Nosotros buscamos el hilo.</h3><p>Preparamos una propuesta con discos originales disponibles y con sentido.</p></li><li><span>03</span><h3>Ella o él abre la historia.</h3><p>Una caja cuidada, una dedicatoria y el porqué de cada selección.</p></li></ol></section>

    <section className="v2-unbox"><div className="unbox-collection" aria-hidden="true" /><div className="unbox-content"><p className="eyebrow"><span /> dentro de la caja</p><h2>No llega una caja.<br /><em>Llega un momento.</em></h2><p>Partimos de una colección amplia de vinilos originales para crear una caja hecha a vuestra medida: por una canción, una época, una persona o todo lo que queréis contar.</p><ul><li>Discos revisados uno a uno</li><li>Relato editorial de la selección</li><li>Presentación pensada para regalar</li></ul></div></section>

    <section id="packs" className="v2-packs"><div className="v2-heading"><p className="eyebrow"><span /> elige la escala</p><h2>Tu historia tiene<br /><em>el tamaño que quieras.</em></h2></div><div className="pack-grid">{siteConfig.packs.map((pack, index) => <article key={pack.id} className={index === 1 ? 'featured' : ''}><p>0{index + 1} · {pack.vinylCount} VINILOS</p><h3>{pack.name}</h3><span>{pack.presentation}</span><strong>{(pack.priceCents / 100).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</strong><Link href="/crear-regalo">Empezar esta caja <i>→</i></Link></article>)}</div><p className="v2-disclaimer">Precios de lanzamiento provisionales. La propuesta se revisa antes de confirmar cualquier pedido.</p></section>

    <section id="inspiracion" className="v2-links"><div><p className="eyebrow"><span /> para cada ocasión</p><h2>Empieza por<br /><em>el momento.</em></h2></div><div className="link-cloud">{occasions.map(([label, href]) => <Link key={href} href={href}>{label}<span>↗</span></Link>)}</div></section>
    <section className="v2-links v2-links-dark"><div><p className="eyebrow"><span /> o por lo que sientes</p><h2>Hay cosas que no<br /><em>se dicen igual.</em></h2></div><div className="link-cloud">{messages.map(([label, href]) => <Link key={href} href={href}>{label}<span>↗</span></Link>)}</div></section>

    <section className="v2-example"><div className="example-label"><span>UN EJEMPLO</span><b>para<br />Marina</b></div><div className="example-copy"><p className="eyebrow"><span /> una selección posible</p><h2>“Le encanta bailar en la cocina y siempre pone música cuando todo se tuerce.”</h2><p>Con unas pocas pistas, una colección puede unir el soul de los setenta, una portada luminosa y el disco que os recuerda al verano en que os conocisteis. Es una propuesta ilustrativa: cada pedido se construye con inventario real.</p><Link className="text-link" href="/crear-regalo">Contar vuestra historia <span>→</span></Link></div></section>

    <section className="v2-faq"><p className="eyebrow"><span /> dudas normales</p><h2>Preguntas antes<br /><em>de regalar.</em></h2><div><details><summary>¿Los vinilos son nuevos?</summary><p>No. Son discos originales de segunda mano. Su estado y disponibilidad se revisan antes de aprobar la selección.</p></details><details><summary>¿Voy a saber qué discos incluye?</summary><p>La propuesta se prepara para revisión antes de confirmar el pedido. Nunca sustituimos una selección por títulos inventados.</p></details><details><summary>¿Fabricáis vinilos personalizados?</summary><p>No. La personalización está en la selección, el relato y la presentación; los discos son ediciones físicas existentes.</p></details><details><summary>¿Puedo pedir algo muy concreto?</summary><p>Sí. Cuantas más pistas compartas, mejor podremos comprobar si existe una selección adecuada en el inventario.</p></details></div></section>

    <section className="v2-final"><p className="eyebrow"><span /> empieza cuando quieras</p><h2>Hay algo que quieres<br /><em>decirle.</em></h2><p>Nosotros te ayudamos a encontrar la manera de ponerlo a sonar.</p><Link className="button button-light" href="/crear-regalo">Crear mi regalo <span>→</span></Link></section>
    <footer><Link className="logo" href="/"><span className="logo-mark">◎</span><span>{siteConfig.brand.name}</span></Link><p>Discos con historia. Regalos con intención.</p><a href={`mailto:${siteConfig.brand.email}`}>{siteConfig.brand.email}</a></footer>
  </main>;
}
