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

$input = json_decode(file_get_contents("php://input"), true);
$id = $input['id'] ?? 0;

if ($id) {
  $stmt = $conn->prepare("DELETE FROM contact WHERE id=?");
  $stmt->bind_param("i", $id);
  $stmt->execute();

  echo json_encode(['success' => true, 'message' => 'Pesan berhasil dihapus']);
} else {
  echo json_encode(['success' => false, 'message' => 'ID tidak valid']);
}
?>