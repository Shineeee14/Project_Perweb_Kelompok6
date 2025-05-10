import { books } from '../data/books';
import ProductCard from '../components/ProductCard';

const Menu = () => {
  return (
    <div className="page" style={{ minHeight: '100vh', backgroundColor: '#fce4ec' }}>
      <h1>Daftar Buku</h1>
      <div className="product-grid">
        {books.map(book => (
          <ProductCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Menu;