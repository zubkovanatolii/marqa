// components/Layout.js
import { useState } from 'react'
import Link from 'next/link'
import styles from './Layout.module.css'

export default function Layout({ children, theme, setTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>MARQA — Комплексный аудит</h1>

        <div className={styles.controls}>
          <button
            className={styles.themeBtn}
            onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}
          >
            {theme === 'light' ? '🌙 Тёмная' : '☀️ Светлая'}
          </button>

          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(o => !o)}
          >
            ☰
          </button>

          <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
            <Link
              href="/"
              className={styles.link}
            >
              Главная
            </Link>
            <Link
              href="/history"
              className={styles.link}
            >
              История
            </Link>
            <Link
              href="/about"
              className={styles.link}
            >
              О проекте
            </Link>
            <Link
              href="/contacts"
              className={styles.link}
            >
              Контакты
            </Link>
          </nav>
        </div>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>© 2025 MARQA. Все права защищены.</footer>
    </div>
  )
}
