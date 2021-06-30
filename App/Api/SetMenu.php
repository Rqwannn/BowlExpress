<?php

require '../Koneksi.php';

$Makanan = mysqli_query($conn, 'SELECT * FROM makanan');
$Minuman = mysqli_query($conn, 'SELECT * FROM minuman');
$Result = [];

while ($row = mysqli_fetch_assoc($Makanan)) {
    $Result[] = $row;
}

while ($row = mysqli_fetch_assoc($Minuman)) {
    $Result[] = $row;
}

echo json_encode($Result, JSON_PRETTY_PRINT);
