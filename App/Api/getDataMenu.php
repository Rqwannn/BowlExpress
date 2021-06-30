<?php

require '../Koneksi.php';

$setMenu = [];

$Makanan = mysqli_query($conn, 'SELECT * FROM makanan');
$Minuman = mysqli_query($conn, 'SELECT * FROM minuman');

while ($row = mysqli_fetch_assoc($Makanan)) {
    $setMenu[] = $row;
}

while ($row = mysqli_fetch_assoc($Minuman)) {
    $setMenu[] = $row;
}

echo json_encode($setMenu);
