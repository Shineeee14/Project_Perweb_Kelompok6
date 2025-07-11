<?php
header("Access-Control-Allow-Origin: *"); // kasih akses dari semua origin
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

include 'koneksi.php';

$query = "SELECT book.id, title, author, year, image, description 
          FROM book 
          JOIN deskripsi_book ON book.id = deskripsi_book.book_id 
          ORDER BY book.id DESC";

$result = $conn->query($query);
$books = [];

while ($row = $result->fetch_assoc()) {
  $books[] = $row;
}

echo json_encode($books);
?>
