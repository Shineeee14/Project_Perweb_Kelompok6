import { useState } from 'react';
import { books as initialBooks } from '../data/books';
import ProductCard from '../components/ProductCard';
import '../App.css';

const Catalog = () => {
  const [bookList, setBookList] = useState(
    initialBooks.map((book) => ({
      ...book,
      likes: book.likes || 0,
      comments: book.comments || [],
    }))
  );

  const [newBook, setNewBook] = useState({
    id: '',
    title: '',
    author: '',
    year: '',
    image: '',
    description: '',
  });

  const [isEditingId, setIsEditingId] = useState(null);

  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const nextId = bookList.length ? bookList[bookList.length - 1].id + 1 : 1;
    setBookList([
      ...bookList,
      { ...newBook, id: nextId, likes: 0, comments: [] },
    ]);
    setNewBook({
      id: '',
      title: '',
      author: '',
      year: '',
      image: '',
      description: '',
    });
  };

  const handleDelete = (id) => {
    const filtered = bookList.filter((book) => book.id !== id);
    setBookList(filtered);
  };

  const handleEdit = (id) => {
    const book = bookList.find((b) => b.id === id);
    setNewBook(book);
    setIsEditingId(id);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedBooks = bookList.map((book) =>
      book.id === isEditingId
        ? {
            ...newBook,
            id: isEditingId,
            likes: book.likes,
            comments: book.comments,
          }
        : book
    );
    setBookList(updatedBooks);
    setIsEditingId(null);
    setNewBook({
      id: '',
      title: '',
      author: '',
      year: '',
      image: '',
      description: '',
    });
  };

  return (
    <div className="catalog-page">
      <h1>Katalog Buku</h1>

      {/* === FORM TAMBAH / EDIT BUKU === */}
      <form
        onSubmit={isEditingId ? handleUpdate : handleAdd}
        className="book-form"
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
          name="image"
          placeholder="URL Gambar"
          value={newBook.image}
          onChange={handleChange}
        />
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

      {/* === LIST BUKU === */}
      <div className="book-grid">
        {bookList.map((book) => (
          <ProductCard
            key={book.id}
            book={book}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
