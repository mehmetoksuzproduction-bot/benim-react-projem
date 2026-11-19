function App() {
  return (
    <div style={{ backgroundColor: '#f8f8f8', minHeight: '100vh', fontFamily: 'Arial, sans-serif', margin: 0 }}>
      
      {/* Üst Menü (Header) */}
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 50px', backgroundColor: '#0abab5' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '24px', letterSpacing: '3px' }}>LÜKS MÜCEVHER</h1>
        <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <a href="#" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Yeni Gelenler</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Yüzükler</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Kolyeler</a>
        </nav>
      </header>

      {/* Ana Görsel ve Başlık (Hero Section) */}
      <main style={{ 
        textAlign: 'center', 
        padding: '0 20px', 
        backgroundImage: 'url("https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000&auto=format&fit=crop")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: '50px', borderRadius: '15px' }}>
          <h2 style={{ fontSize: '56px', marginBottom: '20px', letterSpacing: '4px', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Zarafetin Yeni Adı
          </h2>
          <p style={{ fontSize: '20px', color: '#eee', marginBottom: '40px' }}>
            En özel anlarınız için tasarlanmış eşsiz koleksiyonları keşfedin.
          </p>
          <button style={{ 
            padding: '15px 40px', 
            backgroundColor: '#0abab5', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer', 
            fontSize: '16px',
            borderRadius: '30px', 
            fontWeight: 'bold',
            letterSpacing: '1px',
            transition: '0.3s'
          }}>
            KOLEKSİYONU KEŞFET
          </button>
        </div>
      </main>

      {/* Öne Çıkan Koleksiyonlar */}
      <section style={{ padding: '80px 50px', backgroundColor: '#ffffff', textAlign: 'center' }}>
        <h3 style={{ fontSize: '32px', marginBottom: '50px', color: '#333', letterSpacing: '2px' }}>ÖNE ÇIKAN KOLEKSİYONLAR</h3>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          
          {/* 1. Kart: Yüzükler */}
          <div style={{ width: '300px', textAlign: 'center' }}>
            <img src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600&auto=format&fit=crop" alt="Yüzükler" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px', marginBottom: '15px' }} />
            <h4 style={{ fontSize: '20px', margin: '10px 0', color: '#0abab5' }}>Yüzükler</h4>
            <p style={{ color: '#666', fontSize: '14px' }}>Her anı ölümsüzleştiren şık tasarımlar.</p>
          </div>

          {/* 2. Kart: Kolyeler */}
          <div style={{ width: '300px', textAlign: 'center' }}>
            <img src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=600&auto=format&fit=crop" alt="Kolyeler" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px', marginBottom: '15px' }} />
            <h4 style={{ fontSize: '20px', margin: '10px 0', color: '#0abab5' }}>Kolyeler</h4>
            <p style={{ color: '#666', fontSize: '14px' }}>Boynunuzu süsleyen zarif detaylar.</p>
          </div>

          {/* 3. Kart: Bileklikler */}
          <div style={{ width: '300px', textAlign: 'center' }}>
            <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop" alt="Bileklikler" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px', marginBottom: '15px' }} />
            <h4 style={{ fontSize: '20px', margin: '10px 0', color: '#0abab5' }}>Bileklikler</h4>
            <p style={{ color: '#666', fontSize: '14px' }}>Bileğinize şıklık katan özel seriler.</p>
          </div>

        </div>
      </section>

      {/* Alt Bilgi (Footer) */}
      <footer style={{ backgroundColor: '#222', color: '#aaa', padding: '50px 20px', textAlign: 'center', marginTop: '40px' }}>
        <h4 style={{ color: 'white', fontSize: '24px', letterSpacing: '3px', marginBottom: '20px' }}>LÜKS MÜCEVHER</h4>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '30px' }}>
          <a href="#" style={{ color: '#0abab5', textDecoration: 'none' }}>Hakkımızda</a>
          <a href="#" style={{ color: '#0abab5', textDecoration: 'none' }}>İletişim</a>
          <a href="#" style={{ color: '#0abab5', textDecoration: 'none' }}>Gizlilik Politikası</a>
          <a href="#" style={{ color: '#0abab5', textDecoration: 'none' }}>Mağazalarımız</a>
        </div>
        <p style={{ fontSize: '14px' }}>© 2024 Lüks Mücevher. Tüm hakları saklıdır.</p>
      </footer>

    </div>
  );
}

export default App;