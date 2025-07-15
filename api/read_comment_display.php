<?php
include 'koneksi.php';

// Ambil semua komentar dan gabungkan dengan nama buku
$query = "
    SELECT komentar_buku.*, book.title 
    FROM komentar_buku 
    LEFT JOIN book ON komentar_buku.book_id = book.id 
    ORDER BY komentar_buku.tanggal DESC
";
$result = $conn->query($query);

$comments = [];
while ($row = $result->fetch_assoc()) {
    $comments[] = $row;
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Semua Komentar Buku</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #fafafa;
      padding: 20px;
    }
    h2 {
      text-align: center;
      color: #333;
    }
    .comment-list {
      max-width: 800px;
      margin: auto;
    }
    .comment {
      background-color: #fff;
      border-left: 4px solid #0077cc;
      margin-bottom: 15px;
      padding: 15px;
      border-radius: 6px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.1);
    }
    .comment-header {
      font-weight: bold;
      margin-bottom: 5px;
      color: #0077cc;
    }
    .comment-meta {
      font-size: 12px;
      color: #888;
      margin-bottom: 8px;
    }
    .comment-text {
      font-size: 14px;
      color: #444;
    }
  </style>
</head>
<body>

<h2>Semua Komentar Buku</h2>

<div class="comment-list">
  <?php if (count($comments) > 0): ?>
    <?php foreach ($comments as $comment): ?>
      <div class="comment">
        <div class="comment-header"><?php echo htmlspecialchars($comment['nama']); ?></div>
        <div class="comment-meta">
          Buku: <strong><?php echo htmlspecialchars($comment['title'] ?? 'Tidak diketahui'); ?></strong> |
          <?php echo htmlspecialchars($comment['tanggal']); ?>
        </div>
        <div class="comment-text"><?php echo nl2br(htmlspecialchars($comment['isi_komentar'])); ?></div>
      </div>
    <?php endforeach; ?>
  <?php else: ?>
    <p style="text-align:center;">Belum ada komentar.</p>
  <?php endif; ?>
</div>

</body>
</html>
