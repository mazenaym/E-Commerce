<?php
    $host="localhost";
    $user="root";
    $pass="";
    $dbname="test";

    $con = mysqli_connect($host, $user, $pass, $dbname);

    if($con) {
        echo("Connected");
    } else {
        echo("Not Connected");
    }

    if(isset($_POST['submit'])) {
        $email = $_POST['email'];
        $password = $_POST['password'];
         
        mysqli_query($con, "INSERT INTO users(email, password), VALUES('$email', '$password')");
    }
?>