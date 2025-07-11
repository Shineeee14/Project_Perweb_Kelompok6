import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // ✅ tambahkan useNavigate

const ReadBook = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ inisialisasi navigate
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const API = 'http://localhost/Project_Perweb_Kelompok6-main/api';

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`${API}/read_book.php?id=${id}`);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setBook(data[0]);
        } else {
          setBook(null);
        }
      } catch (err) {
        console.error('❌ Gagal ambil data buku:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <p style={{ textAlign: 'center' }}>⏳ Loading buku...</p>;
  if (!book) return <p style={{ textAlign: 'center' }}>❌ Buku tidak ditemukan.</p>;

  return (
    <div className="page" style={{ padding: '2rem', backgroundColor: '#fff9f9' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: '20px',
          marginBottom: '1rem',
          backgroundColor: '#ec407a',
          color: 'white',
          padding: '4px 8px',
          fontSize: '0.75rem',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: 'fit-content' // supaya lebarnya hanya mengikuti konten
        }}
      >
        🔙
      </button>

      <h1 style={{ textAlign: 'center' }}>{book.title}</h1>
      <p style={{ textAlign: 'center' }}>
        <strong>Penulis:</strong> {book.author} | <strong>Tahun:</strong> {book.year}
      </p>

      <img
        src={
          book.image?.startsWith('http')
            ? book.image
            : `${API}/uploads/${book.image}`
        }
        alt={book.title}
        style={{
          display: 'block',
          margin: '1rem auto',
          width: '200px',
          borderRadius: '8px'
        }}
      />

      <h3>📖 Sinopsis</h3>
      <p>{book.description}</p>

      <h3>📘 Isi Novel</h3>
      {book.content ? (
        <div
          style={{
            background: '#fefefe',
            padding: '1rem',
            border: '1px solid #ddd',
            borderRadius: '8px',
            lineHeight: '1.6',
            whiteSpace: 'pre-wrap'
          }}
        >
          {book.content}
        </div>
      ) : (
        <p>Belum ada isi novel yang tersedia.</p>
      )}
    </div>
  );
};

export default ReadBook;
