<?php

require '../Koneksi.php';
require_once '../../PHPMailer/PHPMailer.php';
require_once '../../PHPMailer/SMTP.php';
require_once '../../PHPMailer/Exception.php';


use PHPMailer\PHPMailer\PHPMailer;

$KodePesanan = time();
$Nama = $_POST['Nama'];
$Email = $_POST['Email'];
$Alamat = $_POST['Alamat'];
$Umur = $_POST['Umur'];
$Total = $_POST['Total'];
$NamaMenu = $_POST["NamaMenu"];
$JumlahMenu = $_POST['JumlahMenu'];
$FormatMoney = $_POST['FormatMoney'];

$mail = new PHPMailer();

$SetHTML = '';

$PisahNama = explode(',', $NamaMenu);
$PisahJumlah = explode(',', $JumlahMenu);

foreach ($PisahNama as $item => $Menu) {
    $SetHTML .= "$Menu, " . $PisahJumlah[$item] . ' Porsi';
}

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

for ($index = 0; $index < count($PisahNama); $index++) {
    $getNama = $PisahNama[$index];
    $getJumlah = $PisahJumlah[$index];

    if (in_array($getNama, $setMakanan)) {
        mysqli_query($conn, "UPDATE makanan SET tersedia = tersedia - '$getJumlah' WHERE nama = '$getNama'");
        continue;
    } else if (in_array($getNama, $setMinuman)) {
        mysqli_query($conn, "UPDATE minuman SET tersedia = tersedia - '$getJumlah' WHERE nama = '$getNama'");
        continue;
    }
}

$InsertQuery = mysqli_query($conn, "INSERT INTO pesanan VALUES('', '$KodePesanan', '$Nama', '$Email', '$Umur', '$Alamat', '$NamaMenu', '$JumlahMenu', '$Total', null)");

echo json_encode("$Nama, Pesanan Anda Telah Di Pesan Silahkan Cek Email Anda Untuk.");

// // smtp setting

// $mail->isSMTP();
// $mail->Host = 'smtp.gmail.com';
// $mail->SMTPAuth = true;
// $mail->Username = "milojoel31@gmail.com";
// $mail->Password = "milojoelruben";
// $mail->Port = 465;
// $mail->SMTPSecure = "ssl";

// // // email setting

// $mail->isHTML(True);
// $mail->setFrom($Email, "Bowl Express");
// $mail->addAddress($Email);
// $mail->Subject = ("$Email ('Pesanan Anda')");
// $mail->Body = `
//     Bowl Express
//     Hallo Pelanggan Kami Yang Terhormat
//     Ini Adalah Rincian Pembelian Anda
//     $SetHTML
//     Dengan Total $FormatMoney
//     Terima Kasih Telah Memesan Di Tempat Kami.`;

// if ($mail->send()) {
//     $InsertQuery = mysqli_query($conn, "INSERT INTO pesanan VALUES('', '$KodePesanan', '$Nama', '$Email', '$Umur', '$Alamat', '$NamaMenu', '$JumlahMenu', '$Total', '$Time')");

//     echo json_encode("$Nama, Pesanan Anda Telah Di Pesan Silahkan Cek Email Anda Untuk.");
// } else {
//     echo json_encode("$Nama, Maaf Terjadi Kesalahan Di Server.");
// }