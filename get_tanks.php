<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
$link = mysqli_connect("localhost", "root", "", "MTKYPC");
mysqli_set_charset($link, "utf8mb4");
$sql = "SELECT v.*, n.name as nation_name, t.name as type_name FROM vehicles v JOIN nations n ON v.nation_id = n.id JOIN vehicle_types t ON v.type_id = t.id";
$result = mysqli_query($link, $sql);
$data = [];
while($row = mysqli_fetch_assoc($result)) { $data[] = $row; }
echo json_encode($data);
?>