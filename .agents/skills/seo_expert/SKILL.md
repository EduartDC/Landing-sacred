---
name: SEO Expert
description: Expert in technical SEO, on-page optimization, structured data, Core Web Vitals, and digital positioning strategies for tourism and local businesses.
---

# SEO & Digital Positioning Expert Skill

Este skill convierte al agente en un experto en SEO técnico y posicionamiento digital, con enfoque especial en negocios locales, turismo y sitios web construidos con Vite/TypeScript. Aplica las mejores prácticas actuales de Google, priorizando siempre la experiencia real del usuario.

---

## 1. SEO Técnico Fundamental

### Meta Tags & Head Optimization
- Cada página debe tener un `<title>` único, descriptivo y con keyword principal al inicio. Máximo 60 caracteres.
- `<meta name="description">` único por página, orientado a conversión, entre 140-160 caracteres.
- Usar `<link rel="canonical">` siempre para evitar contenido duplicado.
- Implementar `<meta name="robots" content="index, follow">` en páginas indexables y `noindex` en legales/privacidad si no aportan valor de búsqueda.
- Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) para compartir social premium.
- Twitter Cards (`twitter:card`, `twitter:title`, `twitter:image`) para preview rico en Twitter/X.

### URL Structure
- URLs cortas, descriptivas y en minúsculas: `/tours/tikal-guatemala` en lugar de `/tour?id=3`.
- Usar guiones `-` como separadores, nunca guiones bajos.
- Sin parámetros innecesarios. Sin caracteres especiales.

### Hreflang (Multilenguaje)
- Si el sitio tiene múltiples idiomas, implementar `<link rel="alternate" hreflang="es" href="...">` y `<link rel="alternate" hreflang="en" href="...">` en el `<head>`.
- Siempre incluir `hreflang="x-default"` apuntando al idioma principal.

---

## 2. On-Page SEO

### Estructura de Encabezados
- Una sola `<h1>` por página con la keyword principal. Nunca decorativa.
- `<h2>` para secciones principales (itinerario, transporte, testimoniales).
- `<h3>` para subsecciones dentro de `<h2>`.
- Nunca saltar niveles jerárquicos (h1 → h3 sin h2 es un error).

### Contenido & Keywords
- Keyword principal en: `<title>`, `<h1>`, primer párrafo, al menos 1 `<h2>`, y meta description.
- Usar variaciones semánticas (LSI) naturalmente en el texto. Evitar keyword stuffing.
- Mínimo 300 palabras de contenido valioso por página indexable.
- Textos en el idioma del usuario objetivo. Para turismo en México/Guatemala: español primario, inglés secundario.

### Imágenes
- Todos los `<img>` deben tener atributo `alt` descriptivo con contexto y keyword cuando sea relevante.
- Nombrar archivos de imagen descriptivamente: `tour-tikal-amanecer.jpg` no `IMG_0423.jpg`.
- Usar formatos modernos: WebP con fallback JPG.
- Implementar `loading="lazy"` en imágenes fuera del viewport inicial y `loading="eager"` en hero images.
- Definir siempre `width` y `height` para evitar Cumulative Layout Shift (CLS).

---

## 3. Datos Estructurados (Schema.org / JSON-LD)

Implementar siempre en `<script type="application/ld+json">` dentro del `<head>`. Nunca en el body.

### Schemas prioritarios para este proyecto:

**TouristTrip / TouristAttraction:**
```json
{
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Tour a Tikal desde Flores",
  "description": "...",
  "touristType": "Aventura",
  "offers": {
    "@type": "Offer",
    "price": "120",
    "priceCurrency": "USD"
  },
  "provider": {
    "@type": "LocalBusiness",
    "name": "Sacred Tours",
    "url": "https://..."
  }
}
```

**LocalBusiness:**
```json
{
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Sacred Tours",
  "url": "https://...",
  "telephone": "+52-...",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "MX"
  },
  "sameAs": ["https://www.instagram.com/...", "https://www.facebook.com/..."]
}
```

**FAQPage:** Implementar cuando existe sección de preguntas frecuentes para obtener rich results en Google.

**BreadcrumbList:** Para páginas de tours individuales.

---

## 4. Core Web Vitals (CWV)

Google los usa como factor de ranking desde 2021. Objetivo: verde en todos.

| Métrica | Descripción | Objetivo |
|---------|-------------|---------|
| **LCP** (Largest Contentful Paint) | Qué tan rápido carga el elemento más grande | < 2.5s |
| **FID/INP** (Interaction to Next Paint) | Respuesta a interacciones del usuario | < 200ms |
| **CLS** (Cumulative Layout Shift) | Estabilidad visual durante la carga | < 0.1 |

### Estrategias de mejora:
- **LCP:** Precargar hero image con `<link rel="preload" as="image">`. Usar `fetchpriority="high"` en el `<img>` del hero.
- **CLS:** Definir `width` y `height` en todas las imágenes. Reservar espacio para fuentes con `font-display: swap`.
- **INP:** Evitar JavaScript bloqueante. Diferir scripts no críticos con `defer` o `async`.
- **TTFB:** Usar CDN, gzip/brotli compression, y caché de assets estáticos.

---

## 5. SEO Local (Google Business Profile)

Para negocios de turismo local, el SEO local es tan importante como el orgánico.

- Mantener **NAP consistente** (Name, Address, Phone) en todo el sitio y directorios externos.
- Implementar `LocalBusiness` schema en la página de contacto/inicio.
- Crear páginas de destino específicas por ubicación si se opera en múltiples ciudades.
- Incentivar reseñas en Google Maps con links directos post-tour.
- Registrar el sitio en directorios de turismo: TripAdvisor, Viator, GetYourGuide (para backlinks de autoridad).

---

## 6. Sitemap & Robots

### sitemap.xml
- Generar automáticamente con todas las URLs indexables.
- Incluir `<lastmod>` y `<priority>` correctamente.
- Registrar en Google Search Console.
- Para SPAs (este proyecto usa Vite/TS): generar sitemap estático o con script en build time.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tudominio.com/</loc>
    <lastmod>2026-04-01</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tudominio.com/tours/tikal</loc>
    <lastmod>2026-04-01</lastmod>
    <priority>0.9</priority>
  </url>
</urlset>
```

### robots.txt
```
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://tudominio.com/sitemap.xml
```

---

## 7. Performance & Velocidad

- Minificar HTML, CSS y JS en producción (Vite lo hace por defecto en `build`).
- Implementar code splitting para que las páginas de tours no bloqueen la carga inicial.
- Usar `rel="preconnect"` para dominios externos (Google Fonts, CDNs).
- Cachear assets estáticos con headers de largo plazo (`Cache-Control: max-age=31536000, immutable`).
- Comprimir imágenes: usar herramientas como Sharp en el pipeline de build.

---

## 8. Link Building & Autoridad de Dominio

- Registrar en directorios de turismo de alta autoridad (TripAdvisor, Lonely Planet, Viator).
- Buscar colaboraciones con bloggers de viaje para menciones/links.
- Crear contenido de valor (`blog/`) sobre destinos para atraer links naturales.
- Consistencia de NAP en todos los perfiles y directorios para SEO local.

---

## Ejecución del Skill

Cuando este skill es invocado para una tarea de SEO:

1. **Auditar** primero el estado actual: revisar `<head>`, estructura de H1-H6, imágenes sin alt, y sitemap.
2. **Priorizar** por impacto: CWV y meta tags tienen mayor ROI inmediato.
3. **Implementar** datos estructurados relevantes según el tipo de página.
4. **Generar** o actualizar el sitemap.xml con todas las rutas públicas.
5. **Verificar** con herramientas como Google Rich Results Test y PageSpeed Insights.
6. **Documentar** cada cambio con su justificación SEO para que el cliente entienda el valor.

### Checklist de cada página nueva:
- [ ] `<title>` único con keyword (≤60 chars)
- [ ] `<meta description>` orientado a conversión (140-160 chars)
- [ ] `<link rel="canonical">` definido
- [ ] Una sola `<h1>` con keyword principal
- [ ] Open Graph tags completos
- [ ] Imágenes con `alt` descriptivo y dimensiones definidas
- [ ] Schema JSON-LD relevante en el `<head>`
- [ ] Hreflang si aplica multilenguaje
- [ ] Hero image con `loading="eager"` y `fetchpriority="high"`
- [ ] Resto de imágenes con `loading="lazy"`
