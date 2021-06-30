<?php

require '../Koneksi.php';

$query = mysqli_query($conn, 'SELECT * FROM minuman');

$Result = [];

while ($row = mysqli_fetch_assoc($query)) {
    $Result[] = $row;
}

echo json_encode($Result, JSON_PRETTY_PRINT);
