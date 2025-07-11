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

$fullName = $_POST['fullName'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';

if ($fullName && $email && $message) {
  $stmt = $conn->prepare("INSERT INTO contact (fullName, email, message) VALUES (?, ?, ?)");
  $stmt->bind_param("sss", $fullName, $email, $message);
  $stmt->execute();

  echo json_encode(['success' => true, 'message' => 'Pesan berhasil dikirim']);
} else {
  echo json_encode(['success' => false, 'message' => 'Data tidak lengkap']);
}
?>