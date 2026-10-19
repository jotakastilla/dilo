# Arquitectura de lanzamiento — Fase 1

## Auditoría a 19 de octubre de 2026

El repositorio contiene dos implementaciones visuales independientes:

- `app/`: aplicación React/Vinext actualmente servida, con una home estática.
- Archivos raíz (`index.html`, `styles.css`, `cart.js`, etc.): prototipo HTML con diálogos y una cesta guardada solamente en el navegador.

No hay rutas de aplicación adicionales, API, persistencia, migraciones, autenticación, pasarela de pago, catálogo verificable ni proveedor de correo. La configuración de Vite permite D1 y R2 de Cloudflare, pero no hay bindings activos ni código que los utilice. El proyecto todavía no tiene historial de Git, por lo que todos los archivos actuales se tratan como trabajo local a preservar.

## Riesgos y decisiones de lanzamiento

| Riesgo | Estado actual | Decisión |
| --- | --- | --- |
| Inventario | No existe una fuente de verdad ni tracklists verificados | No automatizar recomendaciones ni prometer disponibilidad; arrancar con revisión manual. |
| Pagos | No existe integración de Stripe ni checkout real | Mantener `salesEnabled: false` hasta validar impuestos, envíos, devoluciones y credenciales. |
| Datos personales y audios | No hay modelo de consentimiento, retención ni almacenamiento seguro | No recoger historias, emails o audios en producción hasta implementar políticas y borrado. |
| SEO | La home tiene metadatos básicos; `robots.txt` raíz puede no ser servido por la app | Crear rutas y metadatos desde `app/`, sitemap y robots en la fase SEO. No retirar URLs estáticas sin inventario de redirecciones. |
| Marca y dominio | Nombre, URL y precios son provisionales | Valores centralizados en `lib/site-config.ts`; configurar `NEXT_PUBLIC_SITE_URL` antes de publicar. |
| Dos frontends | El HTML raíz y `app/` pueden divergir | Considerar `app/` como superficie canónica; migrar lo reutilizable de forma gradual, sin borrar el prototipo. |

## Arquitectura objetivo

```text
app/
  page.tsx                    Home comercial
  (marketing)/[slug]/page.tsx Landings SEO basadas en contenido
  crear-regalo/page.tsx       Configurador por pasos
  api/                        Validación y persistencia de borradores
lib/
  site-config.ts              Marca, lanzamiento y packs
  content/                    Contenido editorial de landings
  domain/                     Precios, elegibilidad y puntuación
  repositories/               Interfaces para inventario y pedidos
```

La capa de dominio no dependerá de un modelo de IA. La IA, cuando exista, recibirá únicamente discos elegibles desde inventario y devolverá una propuesta revisable. La reserva de stock, el precio y la disponibilidad los resuelve el servidor.

## Modelo de datos propuesto (sin migrar todavía)

- `inventory_records`: artista, título, edición, año, géneros, estado, coste, precio de referencia, disponibilidad y metadatos de verificación.
- `record_tracks`: tracklist verificado por edición/fuente.
- `gift_packs` y `gift_extras`: precios, márgenes, publicación y reglas de compatibilidad.
- `gift_drafts`: respuestas del configurador, consentimiento y expiración.
- `recommendation_proposals`: discos candidatos, puntuaciones, explicación y estado de revisión humana.
- `orders` y `order_items`: importe congelado, reserva, preparación y envío.
- `audio_messages`: objeto privado, consentimiento, fecha de borrado y auditoría de acceso.

## Orden de ejecución

1. Sistema visual, home y tokens de marca en `app/`.
2. Landings SEO renderizadas en servidor con contenido diferenciado y rutas estables.
3. Configurador con borrador seguro, consentimiento y revisión manual.
4. Inventario y reglas de selección; después, propuestas asistidas por IA.
5. Checkout existente o Stripe, operaciones y correos, tras revisión comercial y legal.

## Criterios antes de activar ventas

- URL canónica, términos, privacidad, cookies, envíos y devoluciones aprobados.
- Inventario y estados de conservación verificados por edición.
- Cálculo de impuestos, portes, margen y reserva de stock probado en servidor.
- Pruebas de configurador, precio, checkout y accesibilidad móvil completadas.

## Implementado en la capa de dominio

`lib/domain/recommendation.ts` ya define el contrato de un disco de inventario y una propuesta de selección determinista. Solo admite discos marcados como disponibles, no reserva stock, no inventa títulos ni canciones, y marca automáticamente como revisión manual los packs incompletos o con tracklists sin verificar. `lib/domain/order.ts` restringe los estados operativos a transiciones explícitas.

La migración inicial está en `db/migrations/0001_gift_store.sql`; no contiene datos de ejemplo. Guarda los borradores únicamente bajo consentimiento explícito y con caducidad, separa propuestas de selección de pedidos y permite borrar un borrador sin dejar referencias. El archivo `0001_gift_store.down.sql` es una reversión manual y destructiva: solo puede emplearse en entornos sin datos que conservar.
