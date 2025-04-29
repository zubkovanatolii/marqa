import Header from '../components/Header';
import Footer from '../components/Footer';
import Seo from '../components/Seo';

export default function About() {
  return (
    <>
      <Seo
        title="О проекте — MARQA"
        description="MARQA — интеллектуальная AI-система для автоматического QA: проверка доступности, ошибок, производительности и выдача рекомендаций."
      />
      <Header />
      <main>
        <h1>О проекте</h1>
        <p>
          MARQA — это интеллектуальная AI-система, которая помогает тестировать сайты...
        </p>
      </main>
      <Footer />
    </>
  );
}
