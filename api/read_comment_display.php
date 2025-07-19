<?php
include 'koneksi.php';

// Tampilkan semua komentar, gabungkan dengan nama buku
$query = "
  SELECT komentar_buku.*, book.title AS judul_buku 
  FROM komentar_buku 
  LEFT JOIN book ON komentar_buku.book_id = book.id 
  ORDER BY komentar_buku.tanggal DESC
";

$result = $conn->query($query);
$comments = [];

if (!$result) {
  die("Query error: " . $conn->error);
}

while ($row = $result->fetch_assoc()) {
  $comments[] = $row;
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Ulasan Buku</title>
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
    .comment-card {
      background-color: #fff;
      border: 1px solid #ccc;
      padding: 15px;
      margin: 15px auto;
      border-radius: 6px;
      max-width: 700px;
    }
    .book-title {
      font-weight: bold;
      font-style: italic;
      color: #880e4f;
    }
    .comment-name {
      font-weight: bold;
      color: #000;
      margin-top: 5px;
    }
    .comment-message {
      margin-top: 5px;
      color: #000;
    }
    .comment-date {
      font-size: 0.85em;
      color: #555;
      margin-top: 8px;
    }
  </style>
</head>
<body>

  <h1>Ulasan Buku</h1>

  <?php if (count($comments) === 0): ?>
    <p style="text-align:center;">Belum ada komentar.</p>
  <?php else: ?>
    <?php foreach ($comments as $c): ?>
      <div class="comment-card">
        <p class="book-title"><?php echo htmlspecialchars($c['judul_buku'] ?? 'Judul Tidak Diketahui'); ?></p>
        <p class="comment-name"><?php echo htmlspecialchars($c['nama'] ?? 'Anonim'); ?> (<?php echo (int)($c['rating'] ?? 0); ?> ⭐)</p>
        <p class="comment-message"><?php echo nl2br(htmlspecialchars($c['komentar'] ?? '-')); ?></p>
        <p class="comment-date"><?php echo date('d M Y H:i', strtotime($c['tanggal'] ?? 'now')); ?></p>
      </div>
    <?php endforeach; ?>
  <?php endif; ?>

</body>
</html>
