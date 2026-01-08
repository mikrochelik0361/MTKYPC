<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
$link = mysqli_connect("localhost", "root", "", "MTKYPC");
$id = (int)$_GET['id'];
mysqli_query($link, "DELETE FROM vehicles WHERE id=$id");
echo json_encode(["status" => "success"]);
?>