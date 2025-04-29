// pages/sitemap.xml.js
export async function getServerSideProps({ req, res }) {
    // берём базовый URL из env или из заголовка запроса
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}`
  
    const pages = [
      { path: '/',        changefreq: 'daily',   priority: 1.0 },
      { path: '/about',   changefreq: 'weekly',  priority: 0.8 },
      { path: '/contacts',changefreq: 'weekly',  priority: 0.8 },
      { path: '/history', changefreq: 'weekly',  priority: 0.8 },
    ]
  
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map(
        page => `<url>
      <loc>${baseUrl}${page.path}</loc>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>`
      )
      .join('')}
  </urlset>`
  
    res.setHeader('Content-Type', 'text/xml')
    res.write(xml)
    res.end()
  
    return { props: {} }
  }
  
  export default function Sitemap() {
    // этот компонент на клиенте не нужен
    return null
  }
  