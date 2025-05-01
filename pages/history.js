// pages/history.js
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('mrqaHistory') || '[]');
    setHistory(stored);
  }, []);

  const clearAll = () => {
    if (confirm('Очистить всю историю?')) {
      localStorage.removeItem('mrqaHistory');
      setHistory([]);
    }
  };

  return (
    <div className="container">
      <h1>История проверок</h1>

      {history.length === 0 ? (
        <p>Пока нет ни одной проверки.</p>
      ) : (
        <>
          <button
            onClick={clearAll}
            style={{ marginBottom: '1rem', padding: '0.5rem 1rem' }}
          >
            Очистить историю
          </button>
          <ul>
            {history.map((item, i) => (
              <li key={i} style={{ marginBottom: '0.5rem' }}>
                [{item.time}]&nbsp;
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.url}
                </a>&nbsp;–&nbsp;
                <strong
                  style={{ color: item.performance >= 80 ? 'green' : 'orange' }}
                >
                  {item.performance}%
                </strong>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Простая ссылка без вложенного <a> */}
      <p style={{ marginTop: '2rem' }}>
        <Link href="/">
          ← Назад на главную
        </Link>
      </p>
    </div>
  );
}
