import { getLatestMediaNews, getLatestOfficialNews, officialNewsSources } from "@/lib/official-news";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export const revalidate = 3600;

export default async function ActualidadPage() {
  const [officialItems, mediaItems] = await Promise.all([
    getLatestOfficialNews(),
    getLatestMediaNews(),
  ]);

  return (
    <main className="news-page">
      <header className="tests-topbar">
        <a className="brand" href="/" aria-label="Volver a OpoCompi">
          <span className="brand-mark logo-mark">
            <img src="/brand/opocompi-logo.png" alt="" />
          </span>
          <span>OpoCompi</span>
        </a>
        <a className="btn btn-secondary" href="/">Volver al chat</a>
      </header>

      <section className="news-hero">
        <p className="eyebrow">Actualidad oficial</p>
        <h1>Noticias de la oposicion a Policia Nacional</h1>
        <p>
          Seguimiento automatico de BOE, Policia Nacional, Ministerio del Interior y medios de comunicacion. Las fuentes oficiales van separadas de las noticias divulgativas.
        </p>
      </section>

      <section className="news-section-heading">
        <p className="eyebrow">Primero lo oficial</p>
        <h2>BOE, Policia Nacional e Interior</h2>
      </section>

      <section className="news-grid" aria-label="Noticias oficiales">
        {officialItems.length > 0 ? officialItems.map((item) => (
          <article className="news-card" key={item.id}>
            <div className="news-meta">
              <span>{item.source}</span>
              <span>{item.category}</span>
            </div>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
            <div className="news-footer">
              <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
              <a href={item.url} target="_blank" rel="noreferrer">
                Ver fuente oficial
              </a>
            </div>
          </article>
        )) : (
          <article className="news-card news-empty">
            <div className="news-meta">
              <span>Sin novedades filtradas</span>
              <span>Fuentes oficiales</span>
            </div>
            <h2>No hay publicaciones nuevas detectadas para Policia Nacional.</h2>
            <p>OpoCompi seguira revisando automaticamente las fuentes oficiales. Tambien puedes abrirlas directamente.</p>
          </article>
        )}
      </section>

      <section className="news-section-heading">
        <p className="eyebrow">Mas didactico</p>
        <h2>Medios de comunicacion</h2>
        <p>Noticias explicadas por medios. Sirven para contexto, pero ante dudas manda siempre la fuente oficial.</p>
      </section>

      <section className="news-grid media-news-grid" aria-label="Noticias de medios">
        {mediaItems.length > 0 ? mediaItems.map((item) => (
          <article className="news-card media-news-card" key={item.id}>
            {item.imageUrl ? <img src={item.imageUrl} alt="" /> : null}
            <div className="news-meta">
              <span>{item.publisher ?? item.source}</span>
              <span>{item.category}</span>
            </div>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
            <div className="news-footer">
              <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
              <a href={item.url} target="_blank" rel="noreferrer">
                Leer en el medio
              </a>
            </div>
          </article>
        )) : (
          <article className="news-card news-empty">
            <div className="news-meta">
              <span>Sin noticias de medios</span>
              <span>Google News</span>
            </div>
            <h2>No hay noticias recientes detectadas en medios.</h2>
            <p>OpoCompi seguira revisando automaticamente y mostrara las noticias cuando aparezcan.</p>
          </article>
        )}
      </section>

      <section className="news-sources" aria-label="Fuentes monitorizadas">
        <h2>Fuentes monitorizadas</h2>
        <div>
          {officialNewsSources.map((source) => (
            <a href={source.url} key={source.url} target="_blank" rel="noreferrer">
              {source.name}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
