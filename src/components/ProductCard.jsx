import { useEffect, useState } from 'react';
import { fetchCommentsByBookId } from '../utils/fetch';
import { useNavigate } from 'react-router-dom'; // untuk routing

const ProductCard = ({ book }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const navigate = useNavigate(); // inisialisasi routing

  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await fetchCommentsByBookId(book.id);
        setComments(data);

        if (data.length > 0) {
          const totalRating = data.reduce((sum, c) => sum + (parseFloat(c.rating) || 0), 0);
          const avg = (totalRating / data.length) * 20;
          setAverageRating(avg.toFixed(1));
        } else {
          setAverageRating(0);
        }
      } catch (err) {
        console.error('❌ Gagal ambil komentar:', err);
      }
    };
    loadComments();
  }, [book.id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `Lihat buku ini: ${book.title}`,
        url: `http://localhost:3000/books/${book.id}`
      }).catch((err) => console.error('❌ Share gagal:', err));
    } else {
      alert('❌ Browser kamu tidak mendukung fitur share.');
    }
  };

  const handleRead = () => {
    navigate(`/read/${book.id}`); // arahkan ke halaman baca novel
  };

  return (
    <div className="product-card">
      <img
        src={
          book.image?.startsWith('http')
            ? book.image
            : `http://localhost/Project_Perweb_Kelompok6-main/api/uploads/${book.image}`
        }
        alt={book.title}
        style={{ width: '100%', borderRadius: '8px' }}
      />
      <h3>{book.title}</h3>
      <p><strong>Penulis:</strong> {book.author}</p>
      <p><strong>Tahun:</strong> {book.year}</p>
      <p><strong>📖 Sinopsis:</strong> {book.description}</p>

      <div className="social-actions" style={{ marginTop: '10px' }}>
        <p>⭐ Rating: {averageRating}% dari 5 bintang</p>
        <button onClick={() => setShowComments(!showComments)}>💬 Lihat Komentar</button>
        <button onClick={handleShare}>📤 Share</button>
        <button onClick={handleRead}>📚 Baca</button>
      </div>

      {showComments && (
        <div className="comment-section" style={{ marginTop: '10px' }}>
          <ul style={{ paddingLeft: '20px' }}>
            {Array.isArray(comments) && comments.length > 0 ? (
              comments.map((comment, index) => (
                <li key={index}>
                  <p><strong>{comment?.nama || 'Anonim'}</strong> ({comment?.tanggal || '-'})</p>
                  <p>{comment?.komentar || ''}</p>
                  <p>⭐ {comment?.rating || 0}</p>
                </li>
              ))
            ) : (
              <li>Tidak ada komentar</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
