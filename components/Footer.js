// components/Footer.js
export default function Footer() {
    return (
      <footer
        style={{
          backgroundColor: '#111',
          color: '#888',
          textAlign: 'center',
          padding: '20px 0',
          marginTop: '50px',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#000'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#111'}
      >
        © 2025 MARQA. Все права защищены.
      </footer>
    );
  }
  