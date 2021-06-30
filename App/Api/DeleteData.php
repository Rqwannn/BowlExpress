<?php

require '../Koneksi.php';

$ID = $_POST['ID'];
$Tabel = $_POST['Tabel'];

if ($Tabel == 'Pesanan') {
    mysqli_query($conn, "DELETE FROM pesanan WHERE id = '$ID'");
    echo json_encode('Data Pesanan Telah Di Hapus.');
} else if ($Tabel == 'Admin') {
    mysqli_query($conn, "DELETE FROM admin WHERE id = '$ID'");
    echo json_encode('Data Admin Telah Di Hapus.');
} else if ($Tabel == 'Menu') {
    $Nama = $_POST['Nama'];
    $setMakanan = [];
    $setMinuman = [];

    $Makanan = mysqli_query($conn, 'SELECT * FROM makanan');
    $Minuman = mysqli_query($conn, 'SELECT * FROM minuman');

    while ($row = mysqli_fetch_assoc($Makanan)) {
        $setMakanan[] = $row['nama'];
    }

    while ($row = mysqli_fetch_assoc($Minuman)) {
        $setMinuman[] = $row['nama'];
    }

    if (in_array($Nama, $setMakanan)) {
        mysqli_query($conn, "DELETE FROM makanan WHERE nama = '$Nama'");
    } else if (in_array($Nama, $setMinuman)) {
        mysqli_query($conn, "DELETE FROM minuman WHERE nama = '$Nama'");
    }
    echo json_encode('Data Menu Telah Di Hapus.');
}
