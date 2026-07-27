/**
 * Banco de imagens do site.
 *
 * Todas as fotos abaixo são do Unsplash, licenciadas sob a Unsplash License
 * (uso comercial livre, sem exigência de atribuição — https://unsplash.com/license).
 * Cada URL foi verificada individualmente (página do Unsplash + meta og:image)
 * para confirmar que a foto é gratuita (não faz parte do catálogo pago
 * Unsplash+). Ver DECISOES-TECNICAS.md para o registro completo com
 * fotógrafo/crédito de cada imagem.
 *
 * Trocar por fotografia autoral da ALAVI é recomendado assim que possível —
 * ver PENDENCIAS.md.
 */

function unsplash(id: string, w = 1600): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
}

export const images = {
  hero: unsplash("1744221127502-727af70bc6e7", 2400),

  destinoOrlando: unsplash("1621445944472-f252571005b6"),
  destinoBariloche: unsplash("1667759318615-757c8ddbfa7a"),
  destinoCaribe: unsplash("1763402084674-a3a45263ee2c"),
  destinoEuropa: unsplash("1570077188670-e3a8d69ac5ff"),
  destinoBuenosAires: unsplash("1745409927264-0db48faf407b"),
  destinoMiami: unsplash("1754269675202-6fb0016d9f21"),
  destinoNovaYork: unsplash("1527305265013-ddd1054521d6"),
  destinoCalifornia: unsplash("1623121013540-478557f6d9e8"),
  destinoLasVegas: unsplash("1455539002418-a4cd5aa3ec04"),
  destinoHavai: unsplash("1665513950300-127867f8c21b"),
  destinoUshuaia: unsplash("1615656637621-5aa19f1ef847"),
  destinoPeru: unsplash("1568805746970-0bbae56ab18b"),
  destinoCanada: unsplash("1744937013351-99126126c2b5"),

  orlandoParque: unsplash("1621445944472-f252571005b6"),
  orlandoNoturno: unsplash("1679855928083-9f03b91a6daa"),
  orlandoMiami: unsplash("1754269675202-6fb0016d9f21"),
  orlandoFamilia: unsplash("1695425812104-8a9963d58887"),
  orlandoResort: unsplash("1758448756167-88dc934c58e4"),

  luaDeMel: unsplash("1759758844140-a4389568d86a"),
  familiaViajando: unsplash("1695425812104-8a9963d58887"),
  resortLuxo: unsplash("1758448756167-88dc934c58e4"),

  sobre: unsplash("1758448756167-88dc934c58e4"),

  blogCapaPadrao: unsplash("1667759318615-757c8ddbfa7a"),
  blogCapaLuaDeMel: unsplash("1759758844140-a4389568d86a"),
  blogCapaFamilia: unsplash("1695425812104-8a9963d58887"),
} as const;

export type ImageKey = keyof typeof images;
