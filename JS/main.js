  window.addEventListener("scroll", function () {
    const Navbar = document.querySelector(".navbarMenu");
  
    Navbar.classList.toggle("PassScroll", window.scrollY > 0);
  });

  (function () {
    $('a.page-scroll').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - 40
            }, 1000);
            return false;
          }
        }
      });
  }());

  const contenrAllMenu = document.querySelector('.WrapperOwl');

  function showFood(){
    $.ajax({
      url : 'http://localhost/BowlExpress/App/Api/showFood.php',
      type : 'POST',
      dataType : 'JSON',
      success : function(result){
        const newArray = result.map(item => {
          return `
          <div class="cardAllMenu">
            <img src="Img/${item.gambar}">
            <div class="container">
                <div class="cardContentMenu">
                    <div class="circleHot">
                        <div class="circleRelative"></div>
                    </div>
                    <h5 class="text-center text-uppercase">${item.nama}</h5>
                    <p class="text-center text-uppercase" style="color: #fb6340; margin-bottom: 10px;">IDR. ${item.harga}</p>
                    <div class="BookingBtn">
                        <button onclick="PesanMenu(event)" data-menu="${item.nama}">Pesan</button>
                    </div>
                </div>
            </div>
        </div>`;
        })
        
        const pisahArray = newArray.join(' ');

        const JoinArray = `<div class="contenrAllMenu owl-carousel mt-5 d-flex">
          ${pisahArray}
        </div>`
        contenrAllMenu.innerHTML = JoinArray

        $(".contenrAllMenu").owlCarousel({
          margin: 20,
          loop: true,
          autoWidth: true,
          items: 4,
          autoplay: true,
          autoplayTimeout: 5000,
        });
      }
    })
  }

  showFood()

  const Makanan = document.querySelector('.Makanan');
  const Minuman = document.querySelector('.Minuman');

  Makanan.addEventListener('click', function(){
    showFood()
  })

  Minuman.addEventListener('click', function(){
    $.ajax({
      url : 'http://localhost/BowlExpress/App/Api/showDrink.php',
      type : 'POST',
      dataType : 'JSON',
      success : function(result){
        const newArray = result.map(item => {
          return `
        <div class="cardAllMenu">
          <img src="Img/${item.gambar}">
            <div class="container">
                <div class="cardContentMenu">
                    <div class="circleHot">
                        <div class="circleRelative"></div>
                    </div>
                    <h5 class="text-center text-uppercase">${item.nama}</h5>
                    <p class="text-center text-uppercase" style="color: #fb6340; margin-bottom: 10px;">IDR. ${item.harga}</p>
                    <div class="BookingBtn">
                        <button onclick="PesanMenu(event)" data-menu="${item.nama}">Pesan</button>
                    </div>
                </div>
            </div>
          </div>`;
        })
        
        const pisahArray = newArray.join(' ');
        const JoinArray = `<div class="contenrAllMenu owl-carousel mt-5 d-flex">
          ${pisahArray}
        </div>`
        contenrAllMenu.innerHTML = JoinArray

        $(".contenrAllMenu").owlCarousel({
          margin: 20,
          loop: true,
          autoWidth: true,
          items: 4,
          autoplay: true,
          autoplayTimeout: 5000,
        });
      }
    })
  })

  if(JSON.parse(localStorage.getItem("Menu"))){
    localStorage.removeItem("Menu");
  }

  function PesanMenu(data){
    localStorage.setItem('Menu', JSON.stringify(data.target.dataset.menu));
    document.location.href = 'Form/addPesanan.php'
  }