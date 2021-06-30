-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 13 Apr 2021 pada 18.57
-- Versi server: 10.4.17-MariaDB
-- Versi PHP: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bowlexpress`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `nama_lengkap` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `usia` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id`, `nama_lengkap`, `email`, `username`, `password`, `usia`) VALUES
(2, 'Ruben Edward', 'Ruben@gmail.com', 'Ruben', '12345', '17'),
(3, 'Muhammad Andika', 'Andika@gmail.com', 'Andika', '12345', '17'),
(4, 'Ahmad Ridho', 'Ridho@gmail.com', 'Ridho', '12345', '17'),
(5, 'Fauzi Yansah', 'Fauzi@gmail.com', 'Fauzi', '12345\r\n', '17');

-- --------------------------------------------------------

--
-- Struktur dari tabel `makanan`
--

CREATE TABLE `makanan` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `tersedia` int(11) NOT NULL,
  `harga` int(11) NOT NULL,
  `gambar` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `makanan`
--

INSERT INTO `makanan` (`id`, `nama`, `tersedia`, `harga`, `gambar`) VALUES
(1, 'Bulgogi Beef Rice', 49, 67000, 'Bulgogi_Beef_Rice.jpg'),
(2, 'Chicken Yellow Rice', 50, 62000, 'Hot_Chicken_With_Yelllow_Rice.jpg'),
(3, 'Japanesse Beef Rice', 48, 73500, 'Japanesse_Beef_Rice_Bowl.jpg'),
(4, 'Teriyaki Steak Rice', 49, 68000, 'Teriyaki_Steak_Rice_Bowl.jpg'),
(5, 'Salmon Rice', 49, 70500, 'Salmon_Rice_Bowl.jpg');

-- --------------------------------------------------------

--
-- Struktur dari tabel `minuman`
--

CREATE TABLE `minuman` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `tersedia` int(11) NOT NULL,
  `harga` int(11) NOT NULL,
  `gambar` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `minuman`
--

INSERT INTO `minuman` (`id`, `nama`, `tersedia`, `harga`, `gambar`) VALUES
(1, 'Jus Jeruk', 49, 13000, 'Jus_Jeruk.jpg'),
(2, 'Thai Tea', 49, 15000, 'ThaiTea.jpg'),
(3, 'Chocolate Boba Milk', 49, 15000, 'Chocolate_WithBoba_Milk.jpg'),
(4, 'Vanilla Caramel', 49, 12500, 'Vanilla_Caramel.jpg');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pesanan`
--

CREATE TABLE `pesanan` (
  `id` int(11) NOT NULL,
  `Kode_Pemesanan` varchar(75) NOT NULL,
  `Nama` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Umur` int(11) NOT NULL,
  `Alamat` varchar(250) NOT NULL,
  `Nama_Menu` varchar(250) NOT NULL,
  `Jumlah_Menu` int(11) NOT NULL,
  `Total` int(11) NOT NULL,
  `Tanggal_Pemesanan` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `pesanan`
--

INSERT INTO `pesanan` (`id`, `Kode_Pemesanan`, `Nama`, `Email`, `Umur`, `Alamat`, `Nama_Menu`, `Jumlah_Menu`, `Total`, `Tanggal_Pemesanan`) VALUES
(1, '1618308577', 'Muhammad Raqwan', 'mraqwan471@gmail.com', 17, 'Cilangkap', 'Bulgogi Beef Rice,Chocolate Boba Milk', 1, 82000, '2021-04-13 10:12:09'),
(2, '1618308713', 'Ruben', 'rubenEdward@gmail.com', 17, 'Pekapuran', 'Teriyaki Steak Rice,Thai Tea', 1, 83000, '2021-04-13 10:11:53'),
(3, '1618309095', 'Rizky Ramadhan', 'risky@gmail.com', 16, 'Cilodong', 'Chocolate Boba Milk,Japanesse Beef Rice,Jus Jeruk', 1, 175000, '2021-04-13 10:18:15');

-- --------------------------------------------------------

--
-- Struktur dari tabel `petinggi_perusahaan`
--

CREATE TABLE `petinggi_perusahaan` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `pendapatan` varchar(35) NOT NULL,
  `jabatan` enum('CEO','CTO','COO','CFO') NOT NULL,
  `negara` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `petinggi_perusahaan`
--

INSERT INTO `petinggi_perusahaan` (`id`, `nama`, `pendapatan`, `jabatan`, `negara`) VALUES
(1, 'Ruben Edward', '10000000', 'CTO', 'Indonesia'),
(2, 'Muhammad Raqwan', '10000000', 'CTO', 'Indonesia'),
(3, 'Muhammad Andika', '10000000', 'COO', 'Indonesia'),
(4, 'Al Dilla', '10000000', 'CFO', 'Indonesia');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `makanan`
--
ALTER TABLE `makanan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `minuman`
--
ALTER TABLE `minuman`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `pesanan`
--
ALTER TABLE `pesanan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `petinggi_perusahaan`
--
ALTER TABLE `petinggi_perusahaan`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `makanan`
--
ALTER TABLE `makanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `minuman`
--
ALTER TABLE `minuman`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `pesanan`
--
ALTER TABLE `pesanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `petinggi_perusahaan`
--
ALTER TABLE `petinggi_perusahaan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
