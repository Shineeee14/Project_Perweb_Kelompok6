<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

include 'koneksi.php';

$title = $_POST['title'] ?? '';
$author = $_POST['author'] ?? '';
$year = $_POST['year'] ?? '';
$description = $_POST['description'] ?? '';

if (!$title || !$author || !$year || !$description) {
  echo json_encode(["success" => false, "message" => "Data tidak lengkap"]);
  exit();
}

$imagePath = '';
if (!empty($_FILES['image']['name'])) {
  $uploadDir = "uploads/";
  if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
  }

  $imageName = uniqid() . '_' . basename($_FILES['image']['name']);
  $targetFile = $uploadDir . $imageName;

  if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
    $imagePath = $imageName;
  } else {
    echo json_encode(["success" => false, "message" => "Gagal upload gambar"]);
    exit();
  }
}

$stmt = $conn->prepare("INSERT INTO book (title, author, year, image) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssis", $title, $author, $year, $imagePath);
if ($stmt->execute()) {
  $bookId = $conn->insert_id;

  $stmt2 = $conn->prepare("INSERT INTO deskripsi_book (book_id, description) VALUES (?, ?)");
  $stmt2->bind_param("is", $bookId, $description);
  $stmt2->execute();

  echo json_encode([
    "success" => true,
    "message" => "Buku berhasil ditambahkan",
    "id" => $bookId,
    "imageUrl" => $imagePath
  ]);
} else {
  echo json_encode(["success" => false, "message" => "Gagal insert data"]);
}
?>
