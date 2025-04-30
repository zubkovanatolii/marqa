export default async function handler(req, res) {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ success: false, message: 'URL обязателен' });
    }
  
    try {
      const apiKey = process.env.NEXT_PUBLIC_PSI_API_KEY;
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO`;
  
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      const c = data.lighthouseResult.categories;
      const result = {
        performance: Math.round(c.performance.score * 100),
        accessibility: Math.round(c.accessibility.score * 100),
        bestPractices: Math.round(c['best-practices'].score * 100),
        seo: Math.round(c.seo.score * 100),
      };
  
      return res.status(200).json({ success: true, ...result });
    } catch (error) {
      console.error('Ошибка при запросе PSI API:', error);
      return res.status(500).json({ success: false, message: 'Ошибка при обращении к PSI API' });
    }
  }
  