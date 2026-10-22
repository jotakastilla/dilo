const CATALOGUE = {
  boxes: {
    esencial: { name: 'Caja DILO esencial · 5 vinilos', amount: 5900 },
    extendida: { name: 'Caja DILO edición extendida · 10 vinilos', amount: 7600 },
  },
  extras: {
    mug: { name: 'Taza DILO', amount: 690 },
    opener: { name: 'Abridor DILO', amount: 590 },
    tote: { name: 'Tote bag DILO', amount: 690 },
    coasters: { name: 'Pack de posavasos DILO', amount: 690 },
  },
};

const PACKS = new Set([
  'vuelve-a-los-80',
  'made-in-spain',
  'canciones-para-dos',
]);

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function lineItem(params, index, item, quantity = 1) {
  params.set(`line_items[${index}][price_data][currency]`, 'eur');
  params.set(`line_items[${index}][price_data][product_data][name]`, item.name);
  params.set(`line_items[${index}][price_data][unit_amount]`, String(item.amount));
  params.set(`line_items[${index}][quantity]`, String(quantity));
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Método no permitido.' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return response.status(503).json({ error: 'El pago no está disponible todavía.' });
  }

  const body = request.body ?? {};
  const box = CATALOGUE.boxes[body.boxSize];
  const pack = typeof body.pack === 'string' && PACKS.has(body.pack) ? body.pack : '';
  const person = clean(body.person, 80);
  const occasion = clean(body.occasion, 80);
  const extras = Array.isArray(body.extras)
    ? [...new Set(body.extras.filter((id) => typeof id === 'string'))]
    : [];

  if (!box || !pack || !person || !occasion || extras.some((id) => !CATALOGUE.extras[id])) {
    return response.status(400).json({ error: 'La selección del pedido no es válida.' });
  }

  const params = new URLSearchParams({
    mode: 'payment',
    success_url: 'https://dilo-vinyl-stories.vercel.app/crear-regalo?pedido=confirmado',
    cancel_url: 'https://dilo-vinyl-stories.vercel.app/crear-regalo?pedido=cancelado',
    billing_address_collection: 'required',
    'shipping_address_collection[allowed_countries][0]': 'ES',
    'phone_number_collection[enabled]': 'true',
    'metadata[collection]': pack,
    'metadata[box_size]': body.boxSize,
    'metadata[recipient]': person,
    'metadata[occasion]': occasion,
  });
  const dedication = clean(body.dedication, 500);
  if (dedication) params.set('metadata[dedication]', dedication);

  lineItem(params, 0, box);
  extras.forEach((id, index) => lineItem(params, index + 1, CATALOGUE.extras[id]));

  try {
    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.STRIPE_SECRET_KEY}:`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });
    const session = await stripeResponse.json();
    if (!stripeResponse.ok || !session.url) {
      console.error('Stripe checkout creation failed', session?.error?.type);
      return response.status(502).json({ error: 'No hemos podido abrir el pago seguro. Inténtalo de nuevo.' });
    }
    return response.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout request failed', error instanceof Error ? error.name : 'unknown');
    return response.status(502).json({ error: 'No hemos podido conectar con el pago seguro. Inténtalo de nuevo.' });
  }
}
