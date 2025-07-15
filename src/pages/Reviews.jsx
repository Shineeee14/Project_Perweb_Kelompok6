import { useEffect, useState } from 'react';
import {
  fetchBooks,
  fetchCommentsByBookId,
  submitComment
} from '../utils/fetch';
import '../App.css';

const Reviews = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({
    nama: '',
    komentar: '',
    rating: 5
  });

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
        if (data.length > 0) {
          setSelectedBookId(data[0].id); // pilih buku pertama default
        }
      } catch (err) {
        console.error('❌ Gagal ambil data buku:', err);
      }
    };
    loadBooks();
  }, []);

  useEffect(() => {
    const loadComments = async () => {
      if (!selectedBookId) return;
      try {
        const data = await fetchCommentsByBookId(selectedBookId);
        console.log("📦 KOMENTAR:", data); // <<--- Tambah ini
        setComments(data);
      } catch (err) {
        console.error('Gagal ambil komentar:', err);
      }
    };
    loadComments();
  }, [selectedBookId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nama, komentar } = form;
    if (nama.trim().length < 3 || komentar.trim().length < 5) {
      alert('⚠️ Nama atau komentar terlalu pendek!');
      return;
    }

    try {
      const result = await submitComment({ ...form, book_id: selectedBookId });
      if (result.success) {
        setForm({ nama: '', komentar: '', rating: 5 });
        const updatedComments = await fetchCommentsByBookId(selectedBookId);
        setComments(updatedComments);
      } else {
        alert('❌ Gagal kirim komentar');
      }
    } catch (err) {
      console.error('❌ Error saat submit komentar:', err);
    }
  };

  return (
    <div className="page" style={{ backgroundColor: '#fce4ec', paddingBottom: '3rem' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Ulasan Buku</h1>

      {/* === PILIH BUKU === */}
      <div style={{ margin: '1rem auto', textAlign: 'center' }}>
        <label htmlFor="book">Pilih Buku:</label>{' '}
        <select
          id="book"
          value={selectedBookId}
          onChange={(e) => setSelectedBookId(e.target.value)}
        >
          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title} - {b.author}
            </option>
          ))}
        </select>
      </div>

      {/* === FORM KOMENTAR === */}
      <div className="catalog-page" style={{ marginTop: '2rem' }}>
        <form onSubmit={handleSubmit} className="book-form" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <input
            name="nama"
            value={form.nama}
            onChange={handleChange}
            placeholder="Nama kamu"
            required
          />
          <textarea
            name="komentar"
            value={form.komentar}
            onChange={handleChange}
            placeholder="Tulis komentar..."
            required
          />
          <select
            name="rating"
            value={form.rating}
            onChange={handleChange}
            required
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} ⭐
              </option>
            ))}
          </select>
          <button type="submit">Kirim Komentar</button>
        </form>
      </div>

      {/* === DAFTAR KOMENTAR === */}
      <div className="book-grid" style={{ marginTop: '2rem' }}>
        {comments.map((c) => (
          <div
            key={c.id}
            className="book-card"
            style={{ background: '#fff', padding: '1rem', border: '1px solid #ccc' }}
          >
            <p style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#000' }}>
              {c?.nama || 'Anonim'} ({c?.rating || 0} ⭐)
            </p>
            <p style={{ marginBottom: '0.5rem', color: '#000' }}>
              {c?.komentar || '-'}
            </p>
            <small style={{ color: '#555' }}>
              {c?.tanggal ? new Date(c.tanggal).toLocaleString() : '-'}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
