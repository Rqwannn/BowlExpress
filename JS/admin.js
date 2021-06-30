const clickValueProfile = document.querySelector(".clickValueProfile");
const cardProfileDown = document.querySelector(".slideDown-Profile");

clickValueProfile.addEventListener("click", function(){
    if(cardProfileDown.style.top == "120%"){
        cardProfileDown.style.opacity = "0";
        cardProfileDown.style.top = "200%";
        setTimeout(function(){
            cardProfileDown.style.display = "none";
        }, 500)
    } else {
        cardProfileDown.style.display = "block";
        setTimeout(function(){
            cardProfileDown.style.opacity = "1";
            cardProfileDown.style.top = "120%";
        }, 100)
    }

})

const Formater = new FormatMoney();
const BodyPetinggi = document.querySelector('.BodyPetinggi');

if(BodyPetinggi != null){
    $.ajax({
        url: "http://localhost/BowlExpress/App/Api/getPetinggi.php",
        type: "GET",
        dataType: "JSON",
        success: (result) => {
            let Card = ``
            let index = 1;
            
            result.forEach((element) => {
                const formatPendapatan = Formater.toRupiah(element.pendapatan);
                Card += `<tr>
                <td class="text-center">${index++}</td>
                <td>${element.nama}</td>
                <td>${formatPendapatan}</td>
                <td>${element.jabatan}</td>
                <td>${element.negara}</td>
            </tr>`;
            })
    
            BodyPetinggi.innerHTML = Card;
        },
    });
}

const TotalPesanan = document.querySelector('.TotalPesanan');
const TotalAdmin = document.querySelector('.TotalAdmin');
const Pendapatan = document.querySelector('.Pendapatan');
const TotalMenu = document.querySelector('.TotalMenu');

if(TotalPesanan != null){
    $.ajax({
        url: "http://localhost/BowlExpress/App/Api/setDataAdmin.php",
        type: "GET",
        dataType: "JSON",
        success: (result) => {
            TotalPesanan.innerHTML = result.Pesanan,
            TotalAdmin.innerHTML = result.Admin,
            Pendapatan.innerHTML = Formater.toRupiah(result.Pendapatan);
            TotalMenu.innerHTML = result.Menu
        },
    })
}

const BodySetData = document.querySelector('.BodySetData');
const BodySetAdmin = document.querySelector('.BodySetAdmin');
const BodySetMenu = document.querySelector('.BodySetMenu');

if(BodySetData != null){
    $.ajax({
        url: "http://localhost/BowlExpress/App/Api/setAllPesanan.php",
        type: "GET",
        dataType: "JSON",
        success: (result) => {
            let Card = "";
            let index = 1;
            result.forEach((element) => {
                Card += `<tr>
                <td>${index++}</td>
                <td>${element.Kode_Pemesanan}</td>
                <td>${element.Email}</td>
                <td>${element.Nama}</td>
                <td>${Formater.toRupiah(element.Total)}</td>
                <td>
                    <button type="submit" class="btn-table btn-danger" data-id="${element.id}" onclick="PesananDelete(event)">Delete</button>
                </td>
            </tr>`;
        })

        BodySetData.innerHTML = Card;
        $("#TableOrder").DataTable({
            paging: true,
            aLengthMenu: [
                [10, 30, 50, -1],
                [10, 30, 50, "All"],
            ],
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            responsive: true,
            language: {
                search: "",
            }
        })       
        },
    })
} else if(BodySetAdmin != null){
    $.ajax({
        url: "http://localhost/BowlExpress/App/Api/getDataAdmin.php",
        type: "GET",
        dataType: "JSON",
        success: (result) => {
            let Card = "";
            let index = 1;
            result.forEach((element) => {
                Card += `<tr>
                <td>${index++}</td>
                <td>${element.nama_lengkap}</td>
                <td>${element.email}</td>
                <td>${element.usia} Tahun</td>
                <td>
                    <button type="submit" class="btn-table btn-danger" data-id="${element.id}" onclick="AdminDelete(event)">Delete</button>
                </td>
            </tr>`;
        })

        BodySetAdmin.innerHTML = Card;
        $("#TableOrder").DataTable({
            paging: true,
            aLengthMenu: [
                [10, 30, 50, -1],
                [10, 30, 50, "All"],
            ],
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            responsive: true,
            language: {
                search: "",
            }
        })       
        },
    })
} else if(BodySetMenu != null){
    $.ajax({
        url: "http://localhost/BowlExpress/App/Api/getDataMenu.php",
        type: "GET",
        dataType: "JSON",
        success: (result) => {
            let Card = "";
            let index = 1;
            result.forEach((element) => {
                Card += `<tr>
                <td>${index++}</td>
                <td>${element.nama}</td>
                <td>${element.tersedia}</td>
                <td>${Formater.toRupiah(element.harga)}</td>
                <td>
                    <button type="submit" class="btn-table btn-danger" data-nama="${element.nama}" data-id="${element.id}" onclick="MenuDelete(event)">Delete</button>
                </td>
            </tr>`;
        })

        BodySetMenu.innerHTML = Card;
        $("#TableOrder").DataTable({
            paging: true,
            aLengthMenu: [
                [10, 30, 50, -1],
                [10, 30, 50, "All"],
            ],
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            responsive: true,
            language: {
                search: "",
            }
        })       
        },
    })
}

function PesananDelete(data){
    const setID = data.target.dataset.id;
    const CekTabel = "Pesanan";
    Swal.fire({
        title: 'Apakah Anda Yakin?',
        text: "Data akan di hapus secara permanen!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Hapus!'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url : "http://localhost/BowlExpress/App/Api/DeleteData.php",
                type : 'POST',
                dataType : 'JSON',
                data : {
                    ID : setID,
                    Tabel : CekTabel 
                },
                success : function (result) {
                    console.log(result);
                    Swal.fire(
                        'Berhasil!',
                        `${result}`,
                        'success'
                    )
                    setTimeout(() => {
                        window.location.reload();
                    }, 700);
                }
            })
        }
    })
}

function AdminDelete(data){
    const setID = data.target.dataset.id;
    const CekTabel = "Admin";
    Swal.fire({
        title: 'Apakah Anda Yakin?',
        text: "Data akan di hapus secara permanen!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Hapus!'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url : "http://localhost/BowlExpress/App/Api/DeleteData.php",
                type : 'POST',
                dataType : 'JSON',
                data : {
                    ID : setID,
                    Tabel : CekTabel 
                },
                success : function (result) {
                    console.log(result);
                    Swal.fire(
                        'Berhasil!',
                        `${result}`,
                        'success'
                    )
                    setTimeout(() => {
                        window.location.reload();
                    }, 700);
                }
            })
        }
    })
}

function MenuDelete(data){
    const setID = data.target.dataset.id;
    const setNama = data.target.dataset.nama;
    const CekTabel = "Menu";
    Swal.fire({
        title: 'Apakah Anda Yakin?',
        text: "Data akan di hapus secara permanen!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Hapus!'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url : "http://localhost/BowlExpress/App/Api/DeleteData.php",
                type : 'POST',
                dataType : 'JSON',
                data : {
                    ID : setID,
                    Tabel : CekTabel,
                    Nama : setNama
                },
                success : function (result) {
                    console.log(result);
                    Swal.fire(
                        'Berhasil!',
                        `${result}`,
                        'success'
                    )
                    setTimeout(() => {
                        window.location.reload();
                    }, 700);
                }
            })
        }
    })
}
