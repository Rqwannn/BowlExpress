<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pesanan Anda</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/d1a508a7c1.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../CSS/bootstrap.min.css">
    <link rel="stylesheet" href="../CSS/owl.carousel.min.css">
    <link rel="stylesheet" href="../CSS/Pesanan.css">
</head>

<body>

    <div id="app" style="margin: 5rem 0;">
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <div class="HeaderLeft mb-5 d-flex justify-content-center">
                        <h3>Keranjang Anda</h3>
                    </div>
                    <div class="cardLeft">
                        <table border="0">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Nama Menu</th>
                                    <th>Harga</th>
                                    <th>Jumlah</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody class="BodyTable">
                            </tbody>
                        </table>
                        <p class="text-center TidakAdaMenu" style="margin: 15px 0; color: var(--grey); font-weight: 400; font-size: 16px;">Tidak Ada Menu Yang Anda Pesan</p>
                        <div class="TotalHarga d-flex justify-content-end">
                            <div class="d-flex align-items-center">
                                <p>Total Harga</p>
                                <p class="totalHarga" data-total="0">IDR. 0</p>
                            </div>
                        </div>
                        <div class="Biodata mt-3">
                            <div class="headerBiodata">
                                <h3>Pesan Disini</h3>
                            </div>
                            <div class="ContentBiodata mt-5">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="inputGroup mb-3">
                                            <input type="email" class="form-control" id="Email" placeholder="Email Anda">
                                            <p class="text-danger AuthEmail mt-2" style="display: none;"></p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="inputGroup mb-3">
                                            <input type="text" class="form-control" id="Nama" placeholder="Nama Anda">
                                            <p class="text-danger AuthNama mt-2" style="display: none;"></p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="inputGroup mb-3">
                                            <input type="text" class="form-control" id="Umur" placeholder="Umur Anda" onkeyup="if (/\D/g.test(this.value)) this.value = this.value.replace(/\D/g,'')">
                                            <p class="text-danger AuthUmur mt-2" style="display: none;"></p>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="inputGroup mb-3">
                                            <textarea class="form-control" id="Alamat" placeholder="Alamat Anda" rows="3" style="resize: none; height: 100px;"></textarea>
                                            <p class="text-danger AuthAlamat mt-2" style="display: none;"></p>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="inputGroup mb-3">
                                            <select class="form-control SelectMenu" id="SetMenu">

                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <button type="submit" class="btn btn-primary mb-4" onclick="SubmitOrder()" style="width: 100%;">Submit</button>
                                    </div>
                                    <div class="col-md-3">
                                        <button type="submit" class="btn btn-danger mb-4" onclick="ResetOrder()" style="width: 100%;">Reset</button>
                                    </div>
                                </div>
                                <div class="footerCard">
                                    <p>Anda Bisa Membayar Pesanan Anda Menggunakan OVO, Dana, Paypal</p>
                                    <p>Kembali Ke Halaman <a href="../Index.php">Beranda</a> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="HeaderRight mb-5 d-flex justify-content-center">
                        <h3>Menu Favorite</h3>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="cardRight mb-4">
                                <div class="HeaderRight">
                                    <img src="../Img/Salmon_Rice_Bowl.jpg" style="width: 100%;">
                                </div>
                                <div class="ContentRight">
                                    <div class="TitleContentRight">
                                        <h5>Salmon Rice Bowl</h5>
                                    </div>
                                    <div class="TextContentRight">
                                        <p>Perpaduan Buah, Sayur, dan Ikan Salmon yang segar dengan bumbu dan cita rasa yang menarik</p>
                                        <h5 style="color: #fb6340;">IDR. 70.500</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="cardRight">
                                <div class="HeaderRight">
                                    <img src="../Img/Bulgogi_Beef_Rice.jpg" style="width: 100%;">
                                </div>
                                <div class="ContentRight">
                                    <div class="TitleContentRight">
                                        <h5>Bulgogi Beef Rice</h5>
                                    </div>
                                    <div class="TextContentRight">
                                        <p>Daging sapi yang lembut dengan di tambah saos dan beberapa rempah"</p>
                                        <h5 style="color: #fb6340;">IDR. 67.000</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="../JS/jquery.min.js"></script>
    <script src="../JS/bootstrap.min.js"></script>
    <script src="../JS/sweetalert2.all.min.js"></script>
    <script src="../JS/owl.carousel.min.js"></script>
    <script src="../JS/FormatMoney.js"></script>
    <script src="../JS/Pesanan.js"></script>
</body>

</html>