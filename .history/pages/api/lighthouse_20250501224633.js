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
    const apiKey = process.env.NEXT_PUBLIC_PSI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ success: false, message: 'API key not set' });
    }

    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ success: false, message: data.error.message });
    }

    const perf = data.lighthouseResult?.categories?.performance?.score;
    if (perf === undefined) {
      return res.status(500).json({ success: false, message: 'Не удалось получить показатель скорости' });
    }

    const percentage = Math.round(perf * 100);
    return res.status(200).json({ success: true, performance: percentage });
  } catch (err) {
    console.error('API handler error:', err);
    return res.status(500).json({
      success: false,
      message: 'Unable to process request. Please wait a while and try again.'
    });
  }
}
