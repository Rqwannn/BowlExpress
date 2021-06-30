<?php

require '../Koneksi.php';

$setPesanan = [];
$setAdmin = [];
$setPendapatan = [];
$setMenu = [];

$Pesanan = mysqli_query($conn, "SELECT * FROM pesanan");
$Admin = mysqli_query($conn, "SELECT * FROM admin");
$Makanan = mysqli_query($conn, "SELECT * FROM makanan");
$Minuman = mysqli_query($conn, "SELECT * FROM minuman");
$Pendapatan = mysqli_query($conn, "SELECT Total FROM pesanan");

$setTotal = 0;

while ($row = mysqli_fetch_assoc($Admin)) {
    $setAdmin[] = $row;
}

while ($row = mysqli_fetch_assoc($Pesanan)) {
    $setPesanan[] = $row;
}

foreach ($Makanan as $menu) {
    $setMenu[] = $menu;
}

foreach ($Minuman as $menu) {
    $setMenu[] = $menu;
}

while ($total = mysqli_fetch_assoc($Pendapatan)) {
    $setTotal += $total['Total'];
}

$data = [
    'Admin' => count($setAdmin),
    'Pesanan' => count($setPesanan),
    'Menu' => count($setMenu),
    'Pendapatan' => $setTotal
];

echo json_encode($data);
