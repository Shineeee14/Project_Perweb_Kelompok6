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

$result = $conn->query("SELECT * FROM contact");
$data = [];

while ($row = $result->fetch_assoc()) {
  $data[] = $row;
}

echo json_encode($data);
?>