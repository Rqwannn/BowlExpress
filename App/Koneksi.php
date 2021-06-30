<?php

$HOST = 'localhost';
$USERNAME = 'root';
$PASSWORD = '';
$DB = 'bowlexpress';

$conn = mysqli_connect("$HOST", "$USERNAME", "$PASSWORD", "$DB");

function login($data)
{
    global $conn;
    $username = $data['username'];
    $pass = $data['pass'];

    $sql = "SELECT * FROM admin WHERE username = '$username'";
    $query = mysqli_query($conn, $sql);
    $status = false;
    $message = "Username atau password salah";
    $session_data = [];
    $data = mysqli_fetch_object($query);

    if ($data) {
        if ($data->password == $pass) {
            $status = true;
            $message = "";
            $session_data = $data;
        }
    }

    $val = [
        "status" => $status,
        "message" => $message,
        "data" => $session_data
    ];

    return $val;
}
