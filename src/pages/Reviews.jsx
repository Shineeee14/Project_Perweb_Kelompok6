import { books } from '../data/books';

const Reviews = () => {
  const testimonials = books.slice(0, 10).map(book => ({
    id: book.id,
    Book: book.title,
    comment: `Buku karya ${book.author}`,
    sinopsis: `Sinopsis"${book.title}". ${book.author} adalah seorang penulis yang terkenal dengan karya-karyanya yang mendalam dan penuh makna. Buku ini mengisahkan tentang...`,
  }));

  return (
    <div className="page" style={{ backgroundColor: '#fce4ec' }}>
      <h1>Customer Reviews</h1>
      <div className="reviews">
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="review-card">  
            <h3>{testimonial.Book}</h3>
            <p>{testimonial.comment}</p>
            <div>Sinopsis: {testimonial.sinopsis}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
