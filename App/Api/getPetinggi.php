<?php

require '../Koneksi.php';

$query = mysqli_query($conn, 'SELECT * FROM petinggi_perusahaan');

$Result = [];

while ($item = mysqli_fetch_assoc($query)) {
    $Result[] = $item;
}

echo json_encode($Result);
