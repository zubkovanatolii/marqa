// pages/history.js
import Seo from '../components/Seo';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('history');
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  return (
    <>
      <Seo
        title="История проверок | MARQA"
        description="Здесь отображается история всех проверок URL-адресов в MARQA."
        url="https://marqa.vercel.app/history"
      />
      <Header />

      <main style={{display:'flex',flexDirection:'column',alignItems:'center',padding:'80px 20px'}}>
        <h1 style={{fontSize:'36px',fontWeight:'bold',marginBottom:'20px'}}>MARQA — История Проверок</h1>
        {history.length===0 ? (
          <p style={{marginTop:'20px',fontSize:'18px'}}>История пока пуста</p>
        ) : (
          <ul style={{marginTop:'20px',width:'100%',maxWidth:'600px',listStyle:'none',padding:0}}>
            {history.map((item,i)=>(
              <li key={i} style={{marginBottom:'10px',padding:'10px',background:'#fff',borderRadius:'8px',boxShadow:'0 2px 8px rgba(0,0,0,0.1)'}}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </>
  );
}
