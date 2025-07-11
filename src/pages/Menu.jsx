import { useEffect, useState } from 'react';
import { fetchBooks, addBook, updateBook, deleteBook } from '../utils/fetch';
import ProductCard from '../components/ProductCard';
import '../App.css';

const Menu = () => {
  const [bookList, setBookList] = useState([]);
  const [showCRUD, setShowCRUD] = useState(false);
  const [newBook, setNewBook] = useState({
    id: '',
    title: '',
    author: '',
    year: '',
    image: '',
    imageFile: null,
    description: ''
  });
  const [isEditingId, setIsEditingId] = useState(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBookList(data);
      } catch (err) {
        console.error("Gagal load data:", err);
      }
    };
    loadBooks();
  }, []);

  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setNewBook({ ...newBook, image: imageURL, imageFile: file });
    }
  };

  const resetForm = () => {
    setNewBook({
      id: '',
      title: '',
      author: '',
      year: '',
      image: '',
      imageFile: null,
      description: ''
    });
    setIsEditingId(null);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newBook.title);
    formData.append('author', newBook.author);
    formData.append('year', newBook.year);
    formData.append('description', newBook.description);
    if (newBook.imageFile) formData.append('image', newBook.imageFile);

    try {
      const result = await addBook(formData);
      if (result.success) {
        setBookList([...bookList, {
          ...newBook,
          id: result.id,
          image: result.imageUrl
        }]);
        resetForm();
      } else {
        alert('Gagal menambahkan buku');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (id) => {
    const book = bookList.find((b) => b.id === id);
    if (!book) return;
    setNewBook({ ...book, imageFile: null });
    setIsEditingId(id);
    setShowCRUD(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', isEditingId);
    formData.append('title', newBook.title);
    formData.append('author', newBook.author);
    formData.append('year', newBook.year);
    formData.append('description', newBook.description);
    if (newBook.imageFile) formData.append('image', newBook.imageFile);

    try {
      const result = await updateBook(formData);
      if (result.success) {
        const updated = bookList.map((b) =>
          b.id === isEditingId
            ? {
                ...newBook,
                id: isEditingId,
                image: result.imageUrl || b.image,
              }
            : b
        );
        setBookList(updated);
        resetForm();
      } else {
        alert('Gagal update buku');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteBook(id);
      if (result.success) {
        setBookList(bookList.filter((b) => b.id !== id));
      } else {
        alert('Gagal menghapus buku');
      }
    } catch (err) {
      console.error('Gagal hapus:', err);
    }
  };

  return (
    <div className="page" style={{ backgroundColor: '#fce4ec' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Katalog Buku</h1>

      <div className="product-grid">
        {bookList.map((book) => (
          <ProductCard key={book.id} book={book} />
        ))}
      </div>

      <div style={{ textAlign: 'center', margin: '2rem 0' }}>
        <button
          onClick={() => setShowCRUD(!showCRUD)}
          style={{
            padding: '12px 20px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: '#ec407a',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {showCRUD ? 'Tutup CRUD' : '+ CRUD'}
        </button>
      </div>

      {showCRUD && (
        <div className="catalog-page">
          <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>
            {isEditingId ? 'Edit Buku' : 'Tambah Buku'}
          </h2>

          <form
            onSubmit={isEditingId ? handleUpdate : handleAdd}
            className="book-form"
            style={{ margin: '0 auto' }}
          >
            <input
              name="title"
              placeholder="Judul Buku"
              value={newBook.title}
              onChange={handleChange}
              required
            />
            <input
              name="author"
              placeholder="Penulis"
              value={newBook.author}
              onChange={handleChange}
              required
            />
            <input
              name="year"
              placeholder="Tahun Terbit"
              value={newBook.year}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              required={!isEditingId}
            />
            {newBook.image && (
              <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                <img
                  src={newBook.image}
                  alt="Preview"
                  style={{ maxWidth: '150px', borderRadius: '8px' }}
                />
              </div>
            )}
            <textarea
              name="description"
              placeholder="Deskripsi"
              value={newBook.description}
              onChange={handleChange}
              required
            />
            <button type="submit">
              {isEditingId ? 'Update Buku' : 'Tambah Buku'}
            </button>
          </form>

        <div className="book-grid">
          {bookList.map((book) => (
            <div key={book.id} className="book-card">
              <img
                src={
                  book.image?.startsWith('http')
                    ? book.image
                    : `http://localhost/Project_Perweb_Kelompok6-main/api/uploads/${book.image}`
                }
                alt={book.title}
                className="book-image"
              />

              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p><strong>Penulis:</strong> {book.author}</p>
                <p><strong>Tahun:</strong> {book.year}</p>
                <p className="desc">{book.description}</p>
              </div>

              <div className="action-buttons">
                <button onClick={() => handleEdit(book.id)} className="btn-edit">✏️ Edit</button>
                <button onClick={() => handleDelete(book.id)} className="btn-delete">🗑️ Hapus</button>
              </div>
            </div>
          ))}
        </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
