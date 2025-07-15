<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}
include 'koneksi.php';

$id = $_POST['id'];
$title = $_POST['title'] ?? '';
$author = $_POST['author'] ?? '';
$year = $_POST['year'] ?? '';
$description = $_POST['description'] ?? '';

$imagePath = '';
if (!empty($_FILES['image']['name'])) {
  $targetDir = "uploads/";
  if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
  }
  $imageName = uniqid() . '_' . $_FILES['image']['name'];
  $targetFile = $targetDir . basename($imageName);
  move_uploaded_file($_FILES['image']['tmp_name'], $targetFile);
  $imagePath = $targetFile;

  $stmt = $conn->prepare("UPDATE book SET title=?, author=?, year=?, image=? WHERE id=?");
  $stmt->bind_param("ssisi", $title, $author, $year, $imagePath, $id);
} else {
  $stmt = $conn->prepare("UPDATE book SET title=?, author=?, year=? WHERE id=?");
  $stmt->bind_param("ssii", $title, $author, $year, $id);
}
$stmt->execute();

$stmt2 = $conn->prepare("UPDATE deskripsi_book SET description=? WHERE book_id=?");
$stmt2->bind_param("si", $description, $id);
$stmt2->execute();

echo json_encode([
  "success" => true,
  "message" => "Buku berhasil diupdate",
  "imageUrl" => $imagePath
]);
?>
