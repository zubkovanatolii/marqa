// pages/_app.js
import { useState, useEffect } from 'react'
import Head from 'next/head'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  // Подняли состояние темы на уровень _app
  const [theme, setTheme] = useState('light')

  // При монтировании читаем из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') setTheme('dark')
  }, [])

  // При смене темы — ставим соответствующий класс на <html> и сохраняем
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <>
      <Head>
        <title>MARQA — Комплексный аудит</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <Component {...pageProps} theme={theme} setTheme={setTheme} />
    </>
  )
}
