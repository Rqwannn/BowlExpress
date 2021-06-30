<?php
session_start();
require_once "App/Koneksi.php";

if (isset($_SESSION['auth'])) {
    header("location:http://localhost/bowlexpress/admin/");
}

$error = "";
if (isset($_POST['submit'])) {
    $login = login($_POST);
    if ($login['status']) {
        $_SESSION["auth"] = $login['data'];
        $_SESSION["username"] = $_POST['username'];
        header("location:http://localhost/bowlexpress/admin/");
    } else {
        $error = $login["message"];
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Login - BowlExpress</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Bootstrap CSS -->
    <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css' integrity='sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk' crossorigin='anonymous'>
    <link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="fonts/Linearicons-Free-v1.0.0/icon-font.min.css">
    <link rel="stylesheet" type="text/css" href="vendor/animate/animate.css">
    <link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css">
    <link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css">
    <link rel="stylesheet" type="text/css" href="css/util.css">
    <link rel="stylesheet" type="text/css" href="css/main.css">
</head>

<body>

    <div class="limiter">
        <div class="container-login100" style="background-image: url('img/img-01.jpg');">
            <div class="wrap-login100">
                <form class="login100-form validate-form" method="POST" action="">
                    <div class="login100-form-avatar">
                        <img src="img/avatar-01.jpg" alt="AVATAR">
                    </div>

                    <span class="login100-form-title p-t-20">
                        Bowl Express
                    </span>
                    <div class="text-center w-100">
                        <p class="text-white p-b-45 fw-bold"><?= $error; ?></p>
                    </div>

                    <div class="wrap-input100 validate-input m-b-10" data-validate="Username is required">
                        <input class="input100" type="text" name="username" placeholder="Username">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-user"></i>
                        </span>
                    </div>

                    <div class="wrap-input100 validate-input m-b-10" data-validate="Password is required">
                        <input class="input100" type="password" name="pass" placeholder="Password">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-lock"></i>
                        </span>
                    </div>

                    <div class="container-login100-form-btn p-t-10">
                        <button class="login100-form-btn" name="submit" type="submit">
                            Login
                        </button>
                    </div>

                </form>
            </div>
        </div>
    </div>




    <script src='https://code.jquery.com/jquery-3.5.1.slim.min.js' integrity='sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj' crossorigin='anonymous'></script>
    <script src='https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js' integrity='sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo' crossorigin='anonymous'></script>
    <script src='https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js' integrity='sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI' crossorigin='anonymous'></script>
    <script src="vendor/select2/select2.min.js"></script>
    <script src="js/main-login.js"></script>

</body>

</html>