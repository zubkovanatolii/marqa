// pages/api/lighthouse.js

import lighthouse from 'lighthouse'
import { launch } from 'chrome-launcher'

export default async function handler(req, res) {
  const { url } = req.body
  if (!url) {
    return res.status(400).json({ success: false, message: 'URL обязателен' })
  }

  let chrome
  try {
    // 1) Запускаем headless Chrome
    chrome = await launch({ chromeFlags: ['--headless', '--no-sandbox'] })
    const opts = { port: chrome.port, logLevel: 'error' }

    // 2) Запускаем Lighthouse (без PWA-аудита)
    const runnerResult = await lighthouse(url, {
      ...opts,
      onlyCategories: ['performance','accessibility','best-practices','seo']
    })

    // 3) Собираем метрики
    const c = runnerResult.lhr.categories
    const result = {
      performance:   Math.round(c.performance.score * 100),
      accessibility: Math.round(c.accessibility.score * 100),
      bestPractices: Math.round(c['best-practices'].score * 100),
      seo:           Math.round(c.seo.score * 100),
      pwa:           Math.round((c.pwa?.score ?? 0) * 100)
    }

    // 4) Останавливаем Chrome
    await chrome.kill()

    // 5) Отправляем ответ
    return res.status(200).json({ success: true, ...result })

  } catch (error) {
    console.error('Ошибка при запуске Lighthouse:', error)
    if (chrome) await chrome.kill()
    return res
      .status(500)
      .json({ success: false, message: 'Ошибка сервера при запуске Lighthouse' })
  }
}
