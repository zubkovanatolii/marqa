// pages/index.js
import Link from 'next/link'
import { useState } from 'react'
import Spinner from '../components/Spinner'

export default function Home({ theme, setTheme }) {
  const [url, setUrl]         = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError]     = useState('')

  const handleCheck = async () => {
    setError('')
    setResults(null)
    setLoading(true)
    try {
      const res = await fetch('/api/lighthouse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      const data = await res.json()
      if (data.success) setResults(data)
      else setError(data.message)
    } catch {
      setError('Ошибка сети')
    } finally {
      setLoading(false)
    }
  }

  const colorFor = v =>
    v >= 80 ? 'var(--success)' :
    v >= 50 ? 'var(--warn)' :
    'var(--error)'

  return (
    <div className="container">
      <header className="header">
        <h1>MARQA — Комплексный аудит</h1>
        <div className="controls">
          <button
            onClick={() => setTheme(t => t==='light'?'dark':'light')}
            className="theme-toggle"
          >
            {theme==='light' ? '🌙 Тёмная' : '☀️ Светлая'}
          </button>
          <Link href="/history" legacyBehavior>
            <a className="history-btn">История</a>
          </Link>
        </div>
      </header>

      <div className="form-row">
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={e=>setUrl(e.target.value)}
        />
        <button onClick={handleCheck} disabled={loading||!url}>
          {loading ? <Spinner /> : 'Проверить'}
        </button>
      </div>

      {error && <p className="error">Ошибка: {error}</p>}

      {results && (
        <div className="results">
          {['performance','accessibility','bestPractices','seo','pwa'].map(key => {
            const label = {
              performance:'Performance',
              accessibility:'Accessibility',
              bestPractices:'Best Practices',
              seo:'SEO',
              pwa:'PWA',
            }[key]
            const val = results[key]
            return (
              <div
                key={key}
                className="result-item"
                style={{ color: colorFor(val) }}
              >
                {label}: {val}%
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
