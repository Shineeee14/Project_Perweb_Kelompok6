<?php
include 'koneksi.php';

// Ambil semua data kontak
$result = $conn->query("SELECT * FROM contact ORDER BY id DESC");
$contacts = [];
while ($row = $result->fetch_assoc()) {
    $contacts[] = $row;
}
?>


<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Pesan Masuk - Kontak</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #fce4ec;
      padding: 20px;
      margin: 0;
    }

    h1 {
      text-align: center;
      color: #333;
    }

    .card-grid {
      max-width: 800px;
      margin: 30px auto;
      display: grid;
      gap: 20px;
    }

    .contact-card {
      background-color: #fff;
      padding: 15px 20px;
      border-radius: 8px;
      border-left: 5px solid #0077cc;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }

    .contact-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .contact-header h3 {
      margin: 0;
      font-size: 18px;
      color: #0077cc;
    }

    .contact-email {
      font-size: 13px;
      color: #777;
    }

    .contact-message {
      margin-top: 10px;
      font-size: 15px;
      color: #333;
    }
  </style>
</head>
<body>

  <h1>Pesan Masuk</h1>

  <div class="card-grid">
    <?php if (count($contacts) > 0): ?>
      <?php foreach ($contacts as $item): ?>
        <div class="contact-card">
          <div class="contact-header">
            <h3><?php echo htmlspecialchars($item['fullName']); ?></h3>
            <span class="contact-email"><?php echo htmlspecialchars($item['email']); ?></span>
          </div>
          <div class="contact-message">
            <?php echo nl2br(htmlspecialchars($item['message'])); ?>
          </div>
        </div>
      <?php endforeach; ?>
    <?php else: ?>
      <p style="text-align:center;">Belum ada pesan masuk.</p>
    <?php endif; ?>
  </div>

</body>
</html>
