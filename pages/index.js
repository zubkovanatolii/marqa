import { useState } from 'react'

export default function Home({ theme, setTheme }) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

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
      <header>
        <h1>MARQA — Комплексный аудит</h1>
        <div>
          <button onClick={() => setTheme(t => t==='light'?'dark':'light')}>
            {theme==='light' ? '🌙 Тёмная' : '☀️ Светлая'}
          </button>
          <button className="hamburger" onClick={()=>setMenuOpen(o=>!o)}>
            ☰
          </button>
          <nav className={menuOpen?'open':''}>
            <a href="/">Главная</a>
            <a href="/history">История</a>
          </nav>
        </div>
      </header>

      <div style={{ margin: '2rem 0', display:'flex', gap:'1rem', flexWrap:'wrap' }}>
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={e=>setUrl(e.target.value)}
          style={{ flex:'1 1 300px', padding:'0.5rem' }}
        />
        <button onClick={handleCheck} disabled={loading || !url}>
          {loading ? <span className="spinner"/> : 'Проверить'}
        </button>
      </div>

      {error && <p style={{ color:'var(--error)' }}>Ошибка: {error}</p>}

      {results && (
        <>
          <h2>Результаты:</h2>
          <ul className="results">
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
                <li key={key} style={{ color: colorFor(val) }}>
                  {label}: {val}%
                </li>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}
