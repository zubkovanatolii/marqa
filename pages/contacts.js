// pages/contacts.js
import Seo from '../components/Seo';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Contacts() {
  return (
    <>
      <Seo
        title="Контакты | MARQA"
        description="Свяжитесь с нами — support@marqa.vercel.app."
        url="https://marqa.vercel.app/contacts"
      />
      <Header />

      <main style={{display:'flex',flexDirection:'column',alignItems:'center',padding:'80px 20px'}}>
        <h1 style={{fontSize:'42px',fontWeight:'bold',marginBottom:'20px'}}>Контакты</h1>
        <p style={{fontSize:'20px',color:'#555',maxWidth:'600px',textAlign:'center'}}>
          Если у вас есть вопросы, предложения или вы хотите сотрудничать с нами, свяжитесь по почте:
          <br/><br/>
          <a href="mailto:support@marqa.vercel.app" style={{color:'#0070f3',textDecoration:'underline'}}>
            support@marqa.vercel.app
          </a>
        </p>
      </main>

      <Footer />
    </>
  );
}
