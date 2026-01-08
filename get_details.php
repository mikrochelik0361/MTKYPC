<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
$link = mysqli_connect("localhost", "root", "", "MTKYPC");
mysqli_set_charset($link, "utf8mb4");
$id = (int)$_GET['id'];
$sql = "SELECT v.*, s.* FROM vehicles v LEFT JOIN vehicle_specifications s ON v.id = s.vehicle_id WHERE v.id = $id";
$result = mysqli_query($link, $sql);
echo json_encode(mysqli_fetch_assoc($result));
?>