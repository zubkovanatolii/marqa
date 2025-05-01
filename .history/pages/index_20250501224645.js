// pages/index.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [performance, setPerformance] = useState(null);
  const router = useRouter();

  const handleCheck = async () => {
    setMessage('');
    setPerformance(null);
    if (!url) {
      setMessage('Введите URL');
      return;
    }

    try {
      const res = await fetch('/api/lighthouse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();

      if (data.success) {
        setPerformance(data.performance);
        const history = JSON.parse(localStorage.getItem('mrqaHistory') || '[]');
        history.unshift({
          url,
          performance: data.performance,
          time: new Date().toLocaleString(),
        });
        localStorage.setItem('mrqaHistory', JSON.stringify(history));
      } else {
        setMessage(data.message || 'Ошибка');
      }
    } catch {
      setMessage('Ошибка запроса');
    }
  };

  return (
    <div className="container">
      <h1>MARQA — Тест скорости сайта</h1>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ flexGrow: 1, padding: '0.5rem' }}
        />
        <button onClick={handleCheck} style={{ padding: '0.5rem 1rem' }}>
          Проверить
        </button>
      </div>

      {message && (
        <p style={{ color: 'red', marginTop: '1rem' }}>{message}</p>
      )}

      {performance !== null && (
        <p style={{ color: performance >= 80 ? 'green' : 'orange', marginTop: '1rem' }}>
          Скорость: {performance}%
        </p>
      )}

      <p style={{ marginTop: '2rem' }}>
        <button
          onClick={() => router.push('/history')}
          style={{
            textDecoration: 'underline',
            background: 'none',
            border: 'none',
            padding: 0,
            color: 'blue'
          }}
        >
          Перейти в историю проверок
        </button>
      </p>
    </div>
  );
}
