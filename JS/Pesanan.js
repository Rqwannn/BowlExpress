const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 5000,
});
const formatter = new FormatMoney();
const SelectMenu = document.querySelector(".SelectMenu");

$.ajax({
  url: "http://localhost/BowlExpress/App/Api/SetMenu.php",
  type: "POST",
  dataType: "JSON",
  success: function (result) {
    let Wrapper = "<option selected>Pilih Menu Disini</option>";
    result.map((item) => {
      Wrapper += `
            <option value="${item.nama}">${item.nama}</option>
            `;
    });
    SelectMenu.innerHTML = Wrapper;
  },
});

let menuName = [];

document.body,
  addEventListener("click", function (e) {
    if (e.target.classList.contains("plus-order")) {
      let harga = e.target.parentNode.parentNode.parentNode.childNodes[9];
      let quantity = e.target.parentNode.childNodes[3];

      quantity.innerHTML = parseInt(quantity.innerHTML) + 1;
      harga.innerHTML = formatter.toRupiah(
        parseInt(harga.dataset.harga) * parseInt(quantity.innerHTML)
      );

      const totalNow = document.querySelector(".totalHarga").dataset.total;
      $(".totalHarga").html(
        formatter.toRupiah(parseInt(totalNow) + parseInt(harga.dataset.harga))
      );
      $(".totalHarga").attr(
        "data-total",
        parseInt(totalNow) + parseInt(harga.dataset.harga)
      );
    } else if (e.target.classList.contains("minus-order")) {
      let harga = e.target.parentNode.parentNode.parentNode.childNodes[9];
      let quantity = e.target.parentNode.childNodes[3];

      if (parseInt(quantity.innerHTML) - 1 > 0) {
        quantity.innerHTML = parseInt(quantity.innerHTML) - 1;
        harga.innerHTML = formatter.toRupiah(
          parseInt(harga.dataset.harga) * parseInt(quantity.innerHTML)
        );

        const totalNow = document.querySelector(".totalHarga").dataset.total;
        $(".totalHarga").html(
          formatter.toRupiah(parseInt(totalNow) - parseInt(harga.dataset.harga))
        );
        $(".totalHarga").attr(
          "data-total",
          parseInt(totalNow) - parseInt(harga.dataset.harga)
        );
      }
    }
  });

function setCard(data) {
  return /*html*/ `<tr>
  <td> <img src="../Img/${data[0].gambar}" width="75"> </td>
  <td class="NamaMenuPesanan">${data[0].nama}</td>
  <td>${formatter.toRupiah(data[0].harga)}</td>
  <td>
      <div class="d-flex justify-content-around align-items-center">
          <i style="cursor: pointer; color: #fb6340;" class="fas fa-minus-circle minus-order"></i>
          <div class="JumlahMenuPesanan">1</div>
          <i style="cursor: pointer; color: #fb6340;" class="fas fa-plus-circle plus-order"></i>
      </div>
  </td>
  <td data-harga="${data[0].harga}">${formatter.toRupiah(data[0].harga)}</td>
  <td><i style="cursor: pointer; color: #fb6340;" class="fas fa-times" onclick="RemoveMenu(event)" data-menu="${
    data[0].nama
  }" data-harga="${data[0].harga}"></i></td>
</tr>`;
}

SetMenu.addEventListener("change", function (value) {
  const BodyTable = document.querySelector(".BodyTable");
  if (menuName.indexOf(value.target.value) == -1) {
    $.ajax({
      url: "http://localhost/BowlExpress/App/Api/ValidasiMenu.php",
      type: "POST",
      dataType: "JSON",
      data: {
        Nama: value.target.value,
      },
      success: (result) => {
        menuName = [...menuName, value.target.value];
        const setInner = setCard(result);
        const BodyTable = document.querySelector(".BodyTable");
        const TidakAdaMenu = document.querySelector(".TidakAdaMenu");

        const totalNow = document.querySelector(".totalHarga").dataset.total;
        $(".totalHarga").html(
          formatter.toRupiah(parseInt(totalNow) + parseInt(result[0].harga))
        );
        $(".totalHarga").attr(
          "data-total",
          parseInt(totalNow) + parseInt(result[0].harga)
        );

        TidakAdaMenu.style.display = "none";
        $(BodyTable).append(setInner);
        SetMenu.value = "Pilih Menu Disini";
      },
    });
  } else {
    Toast.fire({
      icon: "error",
      title: "menu sudah di pesan",
    });
  }
});

function RemoveMenu(data) {
  Swal.fire({
    title: "Apakah Anda Yakin?",
    text: "Pesanan Anda Akan Segera Dihapus!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Hapus!",
  }).then((result) => {
    if (result.isConfirmed) {
      const setData = data.target.dataset.menu;
      const harga = data.target.dataset.harga;
      $.ajax({
        url: "http://localhost/BowlExpress/App/Api/ValidasiMenu.php",
        type: "POST",
        dataType: "JSON",
        data: {
          Nama: setData,
        },
        error: (e) => {
          console.log(e);
        },
        success: (result) => {
          const setInner = setCard(result);
          let quantity =
            data.target.parentNode.parentNode.childNodes[7].childNodes[1]
              .childNodes[3].innerHTML;
          // console.log(menuName.splice(menuName.indexOf(setData), 1));

          const FilterName = menuName.filter((hasil) => {
            return setData != hasil;
          });

          menuName = FilterName;

          const totalNow = document.querySelector(".totalHarga").dataset.total;
          $(".totalHarga").html(
            formatter.toRupiah(parseInt(totalNow) - harga * quantity) ||
              "IDR. 0"
          );
          $(".totalHarga").attr(
            "data-total",
            parseInt(totalNow) - harga * quantity
          );
          const TidakAdaMenu = document.querySelector(".TidakAdaMenu");

          const setWrapper = data.target.parentNode.parentNode;

          setWrapper.remove(setWrapper);

          const NamaMenuPesanan = document.querySelectorAll(".NamaMenuPesanan");

          if (NamaMenuPesanan.length == 0) {
            TidakAdaMenu.style.display = "block";
            TidakAdaMenu.style.margin = "15px 0";
            TidakAdaMenu.style.color = "#8898aa";
            TidakAdaMenu.style.fontWeight = "400";
            TidakAdaMenu.style.fontSize = "16px";
            TidakAdaMenu.style.alignItems = "center";
          }

          Swal.fire("Terhapus!", "Pesanan Anda Berhasil Dihapus.", "success");
        },
      });
    }
  });
}

function SubmitOrder() {
  const Email = document.getElementById("Email");
  const Nama = document.getElementById("Nama");
  const Umur = document.getElementById("Umur");
  const Alamat = document.getElementById("Alamat");

  const NamaMenu = document.querySelectorAll(".NamaMenuPesanan");
  const JumlahMenu = document.querySelectorAll(".JumlahMenuPesanan");
  const totalHarga = document.querySelector(".totalHarga");

  let PisahNamaMenu = [...NamaMenu].map((result) => {
    return result.innerHTML;
  });

  let PisahJumlahMenu = [...JumlahMenu].map((result) => {
    return result.innerHTML;
  });

  const JoinNamaMenu = PisahNamaMenu.join(",");
  const JoinJumlahMenu = PisahJumlahMenu.join(",");

  const AuthEmail = document.querySelector(".AuthEmail");
  const AuthNama = document.querySelector(".AuthNama");
  const AuthUmur = document.querySelector(".AuthUmur");
  const AuthAlamat = document.querySelector(".AuthAlamat");

  Swal.fire({
    title: "Langsung Bayar Di Tempat",
    text: "Kami Akan Langsung Memesan Pesanan Anda Secepat Mungkin!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Pesan!",
  }).then((result) => {
    if (result.isConfirmed) {
      AuthEmail.style.display = "none";
      AuthNama.style.display = "none";
      AuthUmur.style.display = "none";
      AuthAlamat.style.display = "none";
      Email.classList.remove("is-invalid");
      Nama.classList.remove("is-invalid");
      Umur.classList.remove("is-invalid");
      Alamat.classList.remove("is-invalid");

      if (Email.value == "" || !Email.value.includes("@")) {
        Swal.fire("Opps", "Ada Input Yang Belum Anda Isi.", "error");

        for (index = 1; index <= 5; index++) {
          if (Email.value == "" && index == 1) {
            AuthEmail.style.display = "block";
            AuthEmail.innerHTML = "Email Harus Di Isi";
            Email.classList.add("is-invalid");
          } else if (
            !Email.value.includes("@") &&
            Email.value.length > 0 &&
            index == 2
          ) {
            AuthEmail.style.display = "block";
            AuthEmail.innerHTML = "Email Harus Memiliki Simbol @";
            Email.classList.add("is-invalid");
          } else if (Nama.value == "" && index == 3) {
            AuthNama.style.display = "block";
            AuthNama.innerHTML = "Nama Harus Di Isi";
            Nama.classList.add("is-invalid");
          } else if (Umur.value == "" && index == 4) {
            AuthUmur.style.display = "block";
            AuthUmur.innerHTML = "Umur Harus Di Isi";
            Umur.classList.add("is-invalid");
          } else if (Alamat.value == "" && index == 5) {
            AuthAlamat.style.display = "block";
            AuthAlamat.innerHTML = "Alamat Harus Di Isi";
            Alamat.classList.add("is-invalid");
          }
        }
      } else if (parseInt(totalHarga.dataset.total) == 0) {
        Swal.fire("Gagal", "Silahkan Pesan Terlebih Dahulu.", "error");
      } else {
        Email.classList.add("is-valid");
        Nama.classList.add("is-valid");
        Umur.classList.add("is-valid");
        Alamat.classList.add("is-valid");

        const setMoney = formatter.toRupiah(totalHarga.dataset.total);

        $.ajax({
          url: "http://localhost/BowlExpress/App/Api/SubmitOrder.php",
          type: "POST",
          dataType: "JSON",
          data: {
            Nama: Nama.value,
            Email: Email.value,
            Umur: Umur.value,
            Alamat: Alamat.value,
            Total: totalHarga.dataset.total,
            NamaMenu: JoinNamaMenu,
            JumlahMenu: JoinJumlahMenu,
            FormatMoney: setMoney,
          },
          success: function (result) {
            Swal.fire("Berhasil", `${result}`, "success");
          },
          error: function (e) {
            console.log(e);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Terjadi Masalah Di Serve!",
              footer: "<a href>Laporkan Masalah Ini!</a>",
            });
          },
        });
      }
    } else if (!result.isConfirmed) {
      Swal.fire("Baiklah", "Mungkin Lain Kali Anda Memesan Menu Kami", "error");
    }
  });
}

function ResetOrder() {
  const Email = document.getElementById("Email");
  const Nama = document.getElementById("Nama");
  const Umur = document.getElementById("Umur");
  const Alamat = document.getElementById("Alamat");

  const AuthEmail = document.querySelector(".AuthEmail");
  const AuthNama = document.querySelector(".AuthNama");
  const AuthUmur = document.querySelector(".AuthUmur");
  const AuthAlamat = document.querySelector(".AuthAlamat");

  const totalHarga = document.querySelector(".totalHarga");

  Swal.fire({
    title: "Apakah Anda Yakin?",
    text: "Pesanan Akan Langsung Di Reset Ulang!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Pesan!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Berhasil", "Pesanan Anda Telah Di Reset Kembali.", "success");
      Email.value = "";
      Nama.value = "";
      Umur.value = "";
      Alamat.value = "";

      Email.classList.remove("is-valid");
      Email.classList.remove("is-invalid");
      Nama.classList.remove("is-valid");
      Nama.classList.remove("is-invalid");
      Umur.classList.remove("is-valid");
      Umur.classList.remove("is-invalid");
      Alamat.classList.remove("is-valid");
      Alamat.classList.remove("is-invalid");

      AuthEmail.style.display = "none";
      AuthNama.style.display = "none";
      AuthUmur.style.display = "none";
      AuthAlamat.style.display = "none";

      const BodyTable = document.querySelector(".BodyTable");

      menuName = [];

      totalHarga.innerHTML = "IDR. 0";
      totalHarga.dataset.total = "0";
      BodyTable.innerHTML = "";

      const NamaMenuPesanan = document.querySelectorAll(".NamaMenuPesanan");
      const TidakAdaMenu = document.querySelector(".TidakAdaMenu");

      if (NamaMenuPesanan.length == 0) {
        TidakAdaMenu.style.display = "block";
        TidakAdaMenu.style.margin = "15px 0";
        TidakAdaMenu.style.color = "#8898aa";
        TidakAdaMenu.style.fontWeight = "400";
        TidakAdaMenu.style.fontSize = "16px";
        TidakAdaMenu.style.alignItems = "center";
      }
    }
  });
}

if(JSON.parse(localStorage.getItem("Menu"))){
  const getData = JSON.parse(localStorage.getItem("Menu"));

  $.ajax({
    url: "http://localhost/BowlExpress/App/Api/ValidasiMenu.php",
    type: "POST",
    dataType: "JSON",
    data: {
      Nama: getData,
    },
    success: (result) => {
      menuName = [...menuName, getData];
      const setInner = setCard(result);
      const BodyTable = document.querySelector(".BodyTable");
      const TidakAdaMenu = document.querySelector(".TidakAdaMenu");

      const totalNow = document.querySelector(".totalHarga").dataset.total;
      $(".totalHarga").html(
        formatter.toRupiah(parseInt(totalNow) + parseInt(result[0].harga))
      );
      $(".totalHarga").attr(
        "data-total",
        parseInt(totalNow) + parseInt(result[0].harga)
      );

      TidakAdaMenu.style.display = "none";
      $(BodyTable).append(setInner);
      SetMenu.value = "Pilih Menu Disini";
    },
  });
}