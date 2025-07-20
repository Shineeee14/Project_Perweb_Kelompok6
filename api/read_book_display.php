<?php
// Koneksi ke database
include 'koneksi.php';

// Query untuk mengambil data buku dan deskripsi
$query = "SELECT book.id, title, author, year, image, description 
          FROM book 
          JOIN deskripsi_book ON book.id = deskripsi_book.book_id 
          ORDER BY book.id DESC";

$result = $conn->query($query);
$books = [];

while ($row = $result->fetch_assoc()) {
  $books[] = $row;
}
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Daftar Buku</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
    }
    h1 {
      text-align: center;
      color: #333;
    }
    .book-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .book-card {
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      margin: 15px;
      width: 300px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .book-card img {
      width: 100%;
      height: auto;
    }
    .book-content {
      padding: 15px;
    }
    .book-title {
      font-size: 20px;
      margin: 0 0 10px;
      color: #0077cc;
    }
    .book-meta {
      font-size: 14px;
      color: #555;
    }
    .book-description {
      margin-top: 10px;
      font-size: 14px;
      color: #333;
    }
  </style>
</head>
<body>

<h1>Daftar Buku</h1>

<div class="book-container">
  <?php if (count($books) > 0): ?>
    <?php foreach ($books as $book): ?>
      <div class="book-card">
        <?php if (!empty($book['image'])): ?>
          <img src="<?php echo htmlspecialchars($book['image']); ?>" alt="Cover Buku">
        <?php endif; ?>
        <div class="book-content">
          <div class="book-title"><?php echo htmlspecialchars($book['title']); ?></div>
          <div class="book-meta">
            Penulis: <?php echo htmlspecialchars($book['author']); ?><br>
            Tahun: <?php echo htmlspecialchars($book['year']); ?>
          </div>
          <div class="book-description"><?php echo nl2br(htmlspecialchars($book['description'])); ?></div>
        </div>
      </div>
    <?php endforeach; ?>
  <?php else: ?>
    <p>Tidak ada buku yang ditemukan.</p>
  <?php endif; ?>
</div>

</body>
</html>
