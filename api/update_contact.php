<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

include 'koneksi.php';
header('Content-Type: application/json');

$id = $_POST['id'];
$fullName = $_POST['fullName'];
$email = $_POST['email'];
$message = $_POST['message'];

if ($id && $fullName && $email && $message) {
  $stmt = $conn->prepare("UPDATE contact SET fullName=?, email=?, message=? WHERE id=?");
  $stmt->bind_param("sssi", $fullName, $email, $message, $id);
  $stmt->execute();

  echo json_encode(['success' => true, 'message' => 'Pesan berhasil diupdate']);
} else {
  echo json_encode(['success' => false, 'message' => 'Data tidak lengkap']);
}
?>