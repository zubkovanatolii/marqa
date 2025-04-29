// pages/api/lighthouse.js

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, message: 'Метод не разрешён' });
    }
  
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ success: false, message: 'Параметр url обязателен' });
    }
  
    try {
      const apiKey = process.env.NEXT_PUBLIC_PSI_API_KEY;
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed`
        + `?url=${encodeURIComponent(url)}`
        + `&key=${apiKey}`
        + `&category=performance`
        + `&category=accessibility`
        + `&category=best-practices`
        + `&category=seo`
        + `&category=pwa`;
  
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data.error) {
        return res.status(500).json({ success: false, message: data.error.message });
      }
  
      const cats = data.lighthouseResult.categories;
      // Отдаём только пять основных категорий в процентах
      return res.status(200).json({
        success: true,
        categories: {
          performance: Math.round(cats.performance.score * 100),
          accessibility: Math.round(cats.accessibility.score * 100),
          bestPractices: Math.round(cats['best-practices'].score * 100),
          seo: Math.round(cats.seo.score * 100),
          pwa: Math.round(cats.pwa.score * 100),
        }
      });
    } catch (e) {
      console.error('Lighthouse API error:', e);
      return res.status(500).json({ success: false, message: 'Ошибка на сервере' });
    }
  }
  