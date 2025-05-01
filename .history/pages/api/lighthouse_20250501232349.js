// pages/api/lighthouse.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Метод не разрешён' });
  }

  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ success: false, message: 'URL обязателен' });
  }

  try {
    const apiKey = process.env.PSI_API_KEY; // приватная переменная в Vercel
    if (!apiKey) {
      return res.status(500).json({ success: false, message: 'API key not set' });
    }

    const apiUrl =
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed` +
      `?url=${encodeURIComponent(url)}` +
      `&key=${apiKey}` +
      `&category=PERFORMANCE` +
      `&category=ACCESSIBILITY` +
      `&category=BEST_PRACTICES` +
      `&category=SEO` +
      `&category=PWA`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ success: false, message: data.error.message });
    }

    const c = data.lighthouseResult.categories;
    return res.status(200).json({
      success: true,
      performance:   Math.round(c.performance.score * 100),
      accessibility: Math.round(c.accessibility.score * 100),
      bestPractices: Math.round(c['best-practices'].score * 100),
      seo:           Math.round(c.seo.score * 100),
      pwa:           Math.round((c.pwa?.score ?? 0) * 100)
    });
  } catch (err) {
    console.error('API handler error:', err);
    return res
      .status(500)
      .json({ success: false, message: 'Ошибка при обращении к PSI API' });
  }
}
