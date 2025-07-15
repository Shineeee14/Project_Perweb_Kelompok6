<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
include 'koneksi.php';

header("Content-Type: application/json");

$book_id = $_GET['book_id'] ?? 1;

$query = "SELECT * FROM komentar_buku WHERE book_id = ? ORDER BY tanggal DESC";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $book_id);
$stmt->execute();
$result = $stmt->get_result();

$comments = [];
while ($row = $result->fetch_assoc()) {
    $comments[] = $row;
}

echo json_encode($comments);
?>