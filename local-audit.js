// local-audit.js
import express from 'express'
import { launch } from 'chrome-launcher'
import lighthouse from 'lighthouse'

const app = express()
app.use(express.json())

app.post('/audit', async (req, res) => {
  const { url } = req.body
  if (!url) return res.status(400).send('URL required')

  let chrome = null
  try {
    chrome = await launch({ chromeFlags: ['--headless'] })
    const { lhr } = await lighthouse(url, { port: chrome.port })
    await chrome.kill()

    res.json({
      performance:   Math.round(lhr.categories.performance.score * 100),
      accessibility: Math.round(lhr.categories.accessibility.score * 100),
      seo:           Math.round(lhr.categories.seo.score * 100),
      // при желании: bestPractices, pwa и т.д.
    })
  } catch (e) {
    if (chrome) await chrome.kill()
    res.status(500).send(e.message)
  }
})

app.listen(4000, () => console.log('Audit server on http://localhost:4000'))
