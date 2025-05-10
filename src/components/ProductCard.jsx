const ProductCard = ({ book }) => {
  return (
    <div className="product-card">
      <img src={book.image} alt={book.title} />
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Tahun Terbit: {book.price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;