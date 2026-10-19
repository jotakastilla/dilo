export type GiftTheme =
  | 'te-echo-de-menos'
  | 'gracias-por-todo'
  | 'perdoname'
  | 'eres-increible'
  | 'nunca-te-olvidare'
  | 'amistad'
  | 'me-has-cambiado-la-vida'
  | 'cumpleanos'
  | 'pareja-aniversario'
  | 'navidad'
  | 'padre-madre'

export type MusicCandidate = {
  artist: string
  title: string
  year: number
  formatPreference: 'single-7' | 'lp'
  /** Resumen interno del sentido de la letra. Nunca sustituye una escucha completa. */
  lyricReading: string
  discogsSearch: string
  availability: 'verify-against-inventory'
}

const discogs = (artist: string, title: string) =>
  `https://www.discogs.com/search/?q=${encodeURIComponent(`${artist} ${title}`)}&type=all`

const candidate = (artist: string, title: string, year: number, formatPreference: MusicCandidate['formatPreference'], lyricReading: string): MusicCandidate => ({
  artist,
  title,
  year,
  formatPreference,
  lyricReading,
  discogsSearch: discogs(artist, title),
  availability: 'verify-against-inventory',
})

/**
 * Curación editorial interna: sirve para arrancar una propuesta, nunca para prometer stock.
 * Antes de incluir un disco se debe comprobar el ejemplar concreto, su estado y su precio.
 */
export const musicCandidates: Record<GiftTheme, MusicCandidate[]> = {
  'te-echo-de-menos': [
    candidate('John Waite', 'Missing You', 1984, 'single-7', 'Directa, ochentera y reconocible.'),
    candidate('Sinéad O’Connor', 'Nothing Compares 2 U', 1990, 'lp', 'Ausencia intensa, para una caja más íntima.'),
    candidate('Kiko Veneno', 'Echo de Menos', 1992, 'lp', 'Opción en castellano, cálida y con personalidad.'),
    candidate('Everything But The Girl', 'Missing', 1994, 'single-7', 'Nostalgia elegante, especialmente para los noventa.'),
  ],
  'gracias-por-todo': [
    candidate('Mercedes Sosa', 'Gracias a la Vida', 1971, 'lp', 'Una gratitud grande y atemporal.'),
    candidate('Dido', 'Thank You', 1999, 'single-7', 'Pop cercano para una dedicatoria contemporánea.'),
    candidate('ABBA', 'Thank You for the Music', 1977, 'lp', 'Luminosa y perfecta para alguien musical.'),
    candidate('Sly & The Family Stone', 'Thank You (Falettinme Be Mice Elf Agin)', 1969, 'single-7', 'Funk agradecido, energético y menos obvio.'),
  ],
  perdoname: [
    candidate('Camilo Sesto', 'Perdóname', 1980, 'single-7', 'Balada española frontal y dramática.'),
    candidate('Elton John', 'Sorry Seems to Be the Hardest Word', 1976, 'lp', 'Una disculpa contenida y adulta.'),
    candidate('Bryan Adams', 'Please Forgive Me', 1993, 'single-7', 'Gran gesto noventero, muy reconocible.'),
    candidate('Chicago', 'Hard to Say I’m Sorry', 1982, 'single-7', 'Para una disculpa clásica de radio.'),
  ],
  'eres-increible': [
    candidate('The Style Council', 'You’re the Best Thing', 1984, 'single-7', 'Soul-pop elegante, de celebración afectuosa.'),
    candidate('Café Tacvba', 'Eres', 2003, 'lp', 'Declaración directa en castellano.'),
    candidate('Hall & Oates', 'You Make My Dreams', 1980, 'single-7', 'Optimista, bailable y universal.'),
    candidate('Queen', 'You’re My Best Friend', 1976, 'single-7', 'Perfecta si la relación tiene un punto clásico.'),
  ],
  'nunca-te-olvidare': [
    candidate('Sarah McLachlan', 'I Will Remember You', 1995, 'lp', 'La letra plantea literalmente el acto de recordar a alguien, con ternura y despedida.'),
    candidate('Barbra Streisand', 'The Way We Were', 1973, 'single-7', 'Recuerda una relación desde la distancia: memoria compartida, no promesa romántica.'),
    candidate('Cyndi Lauper', 'Time After Time', 1983, 'single-7', 'Ofrece cuidado y permanencia; encaja si el mensaje es “sigo aquí”.'),
    candidate('Nat King Cole', 'Unforgettable', 1951, 'single-7', 'Dedicatoria amorosa directa: la persona es, literalmente, inolvidable.'),
  ],
  amistad: [
    candidate('The Beatles', 'With a Little Help from My Friends', 1967, 'lp', 'El punto de partida natural para una amistad histórica.'),
    candidate('Dionne Warwick & Friends', 'That’s What Friends Are For', 1985, 'single-7', 'Mensaje explícito y generoso.'),
    candidate('Roberto Carlos', 'Amigo', 1977, 'single-7', 'Clásico en castellano, sentimental y directo.'),
    candidate('Randy Newman', 'You’ve Got a Friend in Me', 1995, 'single-7', 'Funciona para amistad, familias elegidas y tono juguetón.'),
  ],
  'me-has-cambiado-la-vida': [
    candidate('The Stylistics', 'You Make Me Feel Brand New', 1974, 'single-7', 'Una persona devuelve la fe y hace sentir una vida nueva: encaje lírico muy directo.'),
    candidate('The Beatles', 'In My Life', 1965, 'lp', 'Habla de personas que dejaron una huella insustituible.'),
    candidate('Carole King', 'You’ve Got a Friend', 1971, 'lp', 'No dice “me cambiaste la vida”, pero sí ofrece el apoyo que sostiene una transformación.'),
    candidate('Al Green', 'Let’s Stay Together', 1971, 'single-7', 'Funciona solo para pareja: una decisión de construir una vida juntos.'),
  ],
  cumpleanos: [
    candidate('The Beatles', 'Birthday', 1968, 'lp', 'La elección más inmediata para celebrar.'),
    candidate('Stevie Wonder', 'Happy Birthday', 1980, 'single-7', 'Celebración con groove y significado.'),
    candidate('Kool & The Gang', 'Celebration', 1980, 'single-7', 'Fiesta sin matices: funciona para abrir la caja.'),
    candidate('Cyndi Lauper', 'Girls Just Want to Have Fun', 1983, 'single-7', 'Una opción pop para cumpleaños de baile.'),
  ],
  'pareja-aniversario': [
    candidate('Etta James', 'At Last', 1960, 'single-7', 'Un clásico de celebración romántica.'),
    candidate('Bill Withers', 'Just the Two of Us', 1981, 'single-7', 'Intimidad luminosa y elegante.'),
    candidate('Mocedades', 'Eres Tú', 1973, 'single-7', 'Gran declaración en castellano.'),
    candidate('The Cure', 'Lovesong', 1989, 'single-7', 'Romanticismo alternativo para una pareja con historia.'),
  ],
  navidad: [
    candidate('José Feliciano', 'Feliz Navidad', 1970, 'single-7', 'Clásico bilingüe, inmediato y familiar.'),
    candidate('Slade', 'Merry Xmas Everybody', 1973, 'single-7', 'Celebración colectiva y luminosa; no arrastra el desamor de “Last Christmas”.'),
    candidate('Bing Crosby', 'White Christmas', 1942, 'lp', 'Para una caja clásica y de colección.'),
    candidate('Brenda Lee', 'Rockin’ Around the Christmas Tree', 1958, 'single-7', 'Fiesta navideña bailable y sin subtexto romántico problemático.'),
  ],
  'padre-madre': [
    candidate('Cat Stevens', 'Father and Son', 1970, 'lp', 'Diálogo entre generaciones; usar cuando padre e hijo comparten una historia compleja.'),
    candidate('Piero', 'Mi Viejo', 1969, 'single-7', 'Retrato afectuoso y directo de un padre, ideal si conecta con su generación.'),
    candidate('Víctor Manuel', 'A mi madre', 1981, 'lp', 'Homenaje explícito a la madre: opción prioritaria en castellano tras comprobar edición.'),
    candidate('Spice Girls', 'Mama', 1996, 'single-7', 'Agradecimiento claro a una madre tras entender sus cuidados; sí funciona como dedicatoria.'),
    candidate('Luther Vandross', 'Dance with My Father', 2003, 'lp', 'Recuerdo muy emotivo de un padre; reservar para homenajes y no para una celebración ligera.'),
  ],
}

export const musicSourcingNotes = {
  discovery: ['Discogs: localizar ediciones y formatos', 'Discos Marcapasos: contrastar catálogo nuevo y reediciones'],
  rule: 'Una candidata entra en una propuesta solo después de confirmar el ejemplar concreto en inventario propio o proveedor, incluyendo formato, estado y precio.',
} as const
