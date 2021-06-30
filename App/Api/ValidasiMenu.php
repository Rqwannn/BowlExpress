<?php

require '../Koneksi.php';

$Nama = $_POST['Nama'];

$Makanan = mysqli_query($conn, 'SELECT * FROM makanan');
$Minuman = mysqli_query($conn, 'SELECT * FROM minuman');
$Result = [];

while ($row = mysqli_fetch_assoc($Makanan)) {
    $Result[] = $row;
}

while ($row = mysqli_fetch_assoc($Minuman)) {
    $Result[] = $row;
}

$query = [];

foreach ($Result as $item) {
    if ($item['nama'] == $Nama) {
        $query[] = $item;
    }
}

echo json_encode($query, JSON_PRETTY_PRINT);
