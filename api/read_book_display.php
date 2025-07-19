<?php
include 'koneksi.php';

// Ambil data buku beserta deskripsi dari tabel deskripsi_book
$query = "
    SELECT book.*, deskripsi_book.description 
    FROM book 
    LEFT JOIN deskripsi_book ON book.id = deskripsi_book.book_id 
    ORDER BY book.id DESC
";
$result = $conn->query($query);
$books = [];
while ($row = $result->fetch_assoc()) {
    $books[] = $row;
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Daftar Buku</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #fce4ec;
      margin: 0;
      padding: 20px;
    }
    h1 {
      text-align: center;
      color: #2c3e50;
    }
    .book-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      justify-content: center;
      margin-top: 20px;
    }
    .book-card {
      background-color: #fff;
      border-radius: 10px;
      padding: 15px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      max-width: 220px;
    }
    .book-card img {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }
    .book-info {
      margin-top: 10px;
    }
  </style>
</head>
<body>

<h1>Daftar Buku</h1>

<div class="book-grid">
  <?php foreach ($books as $book): ?>
    <div class="book-card">
      <img src="uploads/<?php echo htmlspecialchars($book['image']); ?>" alt="Gambar Buku">
      <div class="book-info">
        <h3><?php echo htmlspecialchars($book['title']); ?></h3>
        <p><strong>Penulis:</strong> <?php echo htmlspecialchars($book['author']); ?></p>
        <p><strong>Tahun:</strong> <?php echo htmlspecialchars($book['year']); ?></p>
        <p><?php echo nl2br(htmlspecialchars($book['description'] ?? '')); ?></p>
      </div>
    </div>
  <?php endforeach; ?>
</div>

</body>
</html>
