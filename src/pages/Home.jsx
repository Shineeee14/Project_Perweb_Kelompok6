import CategoryButton from '../components/CategoryButton';

const Home = () => {
  return (
    <div className="home-page" style={{ textAlign: 'center', padding: '20px', color: 'white', backgroundColor: '#fce4ec' }}>
      <img
        src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
        alt="Books"
        style={{ width: '60%', borderRadius: '10px', margin: '20px 0' }}
      />
      <p style={{ fontSize: '18px', maxWidth: '700px', margin: '0 auto' }}>
        Website ini dibuat oleh <strong>Kelompok 6</strong> sebagai bagian dari tugas pemrograman web. 
        Disini kami menyediakan contoh platform yang mudah digunakan bagi para pecinta buku untuk menjelajahi berbagai koleksi buku, 
        mulai dari fiksi, non-fiksi, hingga Romantis.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
      </div>
    </div>
  );
};

export default Home;
