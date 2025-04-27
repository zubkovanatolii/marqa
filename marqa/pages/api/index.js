import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const json = await res.json();
    setResult(json.result);
  };

  return (
    <div>
      <div style={{
        background: '#f0f0f0', padding: '1rem', marginBottom: '2rem',
        textAlign: 'center', borderRadius: '4px'
      }}>
        <strong>MARQA v7.0 Released!</strong>{' '}
        <Link href="/whats-new"><a>Что нового →</a></Link>
      </div>

      <h1>MARQA — Анализатор ссылок</h1>
      <form onSubmit={handleSubmit} style={{ margin: '1rem 0' }}>
        <input
          type="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Введите URL"
          style={{ width: '300px', padding: '0.5rem' }}
          required
        />
        <button type="submit" style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem' }}>
          Анализировать
        </button>
      </form>
      {result && (
        <div style={{ marginTop: '1rem' }}>
          <strong>Результат:</strong> {result}
        </div>
      )}
    </div>
  );
}
