// components/Seo.js
import Head from 'next/head'

export default function Seo({ title, description }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Можно добавить OpenGraph, Twitter-карточки и т.п. */}
    </Head>
  )
}
