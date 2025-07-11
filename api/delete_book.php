<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}
include 'koneksi.php';

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];

$conn->query("DELETE FROM book WHERE id=$id");

echo json_encode([
  "success" => true,
  "message" => "Buku berhasil dihapus"
]);
?>
