export type OfficialNewsItem = {
  id: string;
  title: string;
  summary: string;
  source: "BOE" | "Policia Nacional" | "Ministerio del Interior" | "Medios";
  publisher?: string;
  category: "Convocatoria" | "Lista" | "Pruebas" | "Normativa" | "Aviso";
  url: string;
  imageUrl?: string;
  publishedAt: string;
  official: boolean;
};

const BOE_OPOSICIONES_RSS = "https://www.boe.es/rss/canal_per.php?c=140&l=p";
const BOE_SECCION_OPOSICIONES_RSS = "https://www.boe.es/rss/boe.php?s=2B";
const POLICIA_PROCESOS_URL = "https://www.policia.es/_es/tupolicia_procesos_selectivos.php";
const INTERIOR_PROCESOS_URL =
  "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/empleo-publico/procesos-selectivos/policia-nacional/";
const MEDIA_NEWS_RSS =
  "https://news.google.com/rss/search?q=%22oposiciones%20Polic%C3%ADa%20Nacional%22%20OR%20%22oposici%C3%B3n%20Polic%C3%ADa%20Nacional%22%20OR%20%22Escala%20B%C3%A1sica%20Polic%C3%ADa%20Nacional%22&hl=es&gl=ES&ceid=ES:es";

const KEYWORDS = [
  "policia nacional",
  "cuerpo nacional de policia",
  "direccion general de la policia",
  "escala basica",
  "escala ejecutiva",
  "procesos selectivos",
  "oposicion",
];

function decodeHtml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getTagValue(xml: string, tag: string) {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeHtml(match[1]) : "";
}

function getAttributeValue(xml: string, tag: string, attr: string) {
  const match = xml.match(new RegExp(`<${tag}[^>]*\\s${attr}=["']([^"']+)["'][^>]*>`, "i"));
  return match ? decodeHtml(match[1]) : "";
}

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function isRelevant(title: string, summary: string) {
  const text = normalize(`${title} ${summary}`);
  return KEYWORDS.some((keyword) => text.includes(normalize(keyword)));
}

function inferCategory(text: string): OfficialNewsItem["category"] {
  const normalized = normalize(text);

  if (normalized.includes("admitid") || normalized.includes("excluid") || normalized.includes("lista")) {
    return "Lista";
  }

  if (normalized.includes("prueba") || normalized.includes("examen") || normalized.includes("aptitud")) {
    return "Pruebas";
  }

  if (normalized.includes("convocatoria") || normalized.includes("plaza") || normalized.includes("proceso selectivo")) {
    return "Convocatoria";
  }

  if (normalized.includes("real decreto") || normalized.includes("orden") || normalized.includes("resolucion")) {
    return "Normativa";
  }

  return "Aviso";
}

function formatDate(date: string) {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

function itemId(source: string, url: string, title: string) {
  return `${source}-${Buffer.from(`${url}-${title}`).toString("base64url").slice(0, 18)}`;
}

async function fetchRss(url: string): Promise<OfficialNewsItem[]> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "OpoCompi Actualidad/1.0",
      },
      next: { revalidate: 60 * 60 },
    });

    if (!response.ok) return [];

    const xml = await response.text();
    const matches = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];

    return matches
      .map((item) => {
        const title = getTagValue(item, "title");
        const summary = getTagValue(item, "description");
        const link = getTagValue(item, "link");
        const publishedAt = formatDate(getTagValue(item, "pubDate"));
        const text = `${title} ${summary}`;

        return {
          id: itemId("boe", link, title),
          title,
          summary: summary || "Publicacion oficial del BOE relacionada con oposiciones y procesos selectivos.",
          source: "BOE" as const,
          category: inferCategory(text),
          url: link || url,
          publishedAt,
          official: true,
        };
      })
      .filter((item) => item.title && isRelevant(item.title, item.summary));
  } catch {
    return [];
  }
}

async function fetchMediaNews(): Promise<OfficialNewsItem[]> {
  try {
    const response = await fetch(MEDIA_NEWS_RSS, {
      headers: {
        "User-Agent": "OpoCompi Actualidad/1.0",
      },
      next: { revalidate: 60 * 60 },
    });

    if (!response.ok) return [];

    const xml = await response.text();
    const matches = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];

    return matches
      .map((item) => {
        const title = getTagValue(item, "title");
        const summary = getTagValue(item, "description");
        const link = getTagValue(item, "link");
        const publisher = getTagValue(item, "source") || "Medio de comunicacion";
        const publishedAt = formatDate(getTagValue(item, "pubDate"));
        const imageUrl =
          getAttributeValue(item, "media:content", "url") ||
          getAttributeValue(item, "media:thumbnail", "url") ||
          getAttributeValue(item, "enclosure", "url") ||
          "/brand/police-banner.jpg";
        const text = `${title} ${summary}`;

        return {
          id: itemId("media", link, title),
          title,
          summary: summary || "Noticia publicada en un medio de comunicacion sobre oposiciones a Policia Nacional.",
          source: "Medios" as const,
          publisher,
          category: inferCategory(text),
          url: link || MEDIA_NEWS_RSS,
          imageUrl,
          publishedAt,
          official: false,
        };
      })
      .filter((item) => item.title && isRelevant(item.title, item.summary));
  } catch {
    return [];
  }
}

export async function getLatestOfficialNews() {
  const [boeTopic, boeSection] = await Promise.all([
    fetchRss(BOE_OPOSICIONES_RSS),
    fetchRss(BOE_SECCION_OPOSICIONES_RSS),
  ]);

  const items = [...boeTopic, ...boeSection];

  const unique = new Map<string, OfficialNewsItem>();
  for (const item of items) {
    unique.set(item.url || item.id, item);
  }

  return Array.from(unique.values())
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 12);
}

export async function getLatestMediaNews() {
  const items = await fetchMediaNews();
  const unique = new Map<string, OfficialNewsItem>();

  for (const item of items) {
    unique.set(item.url || item.id, item);
  }

  return Array.from(unique.values())
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 12);
}

export const officialNewsSources = [
  {
    name: "BOE - Oposiciones y concursos",
    url: BOE_SECCION_OPOSICIONES_RSS,
  },
  {
    name: "Policia Nacional - Procesos selectivos",
    url: POLICIA_PROCESOS_URL,
  },
  {
    name: "Ministerio del Interior - Policia Nacional",
    url: INTERIOR_PROCESOS_URL,
  },
  {
    name: "Google News - Medios sobre oposiciones Policia Nacional",
    url: MEDIA_NEWS_RSS,
  },
];
