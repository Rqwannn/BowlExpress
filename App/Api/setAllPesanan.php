<?php

require '../Koneksi.php';

$query = mysqli_query($conn, "SELECT * FROM pesanan");
$result = [];

while ($item = mysqli_fetch_assoc($query)) {
    $result[] = $item;
}

echo json_encode($result);
