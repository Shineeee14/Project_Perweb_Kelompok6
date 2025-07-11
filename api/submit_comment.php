<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'koneksi.php';

header("Content-Type: application/json");

$input = json_decode(file_get_contents("php://input"), true);

$nama = $input['nama'] ?? '';
$komentar = $input['komentar'] ?? '';
$rating = $input['rating'] ?? '';
$book_id = $input['book_id'] ?? 1;

if ($nama && $komentar && $rating) {
    $query = "INSERT INTO komentar_buku (nama, komentar, rating, book_id, tanggal) VALUES (?, ?, ?, ?, NOW())";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssii", $nama, $komentar, $rating, $book_id);
    $success = $stmt->execute();

    echo json_encode(['success' => $success]);
} else {
    echo json_encode(['success' => false, 'message' => 'Data tidak lengkap']);
}
?>