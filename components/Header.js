// components/Header.js
import Link from 'next/link';

export default function Header() {
  const links = [
    { href: '/', label: 'Главная' },
    { href: '/about', label: 'О проекте' },
    { href: '/contacts', label: 'Контакты' },
    { href: '/history', label: 'История' },
  ];

  return (
    <header style={{
      backgroundColor: '#111',
      padding: '15px 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    }}>
      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
      }}>
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '18px',
              fontWeight: 'bold',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#0070f3'}
            onMouseLeave={e => e.currentTarget.style.color = '#fff'}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
);
}
