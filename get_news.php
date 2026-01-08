<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
$link = mysqli_connect("localhost", "root", "", "MTKYPC");
$sql = "SELECT p.*, c.name as cat_name FROM news_posts p JOIN news_categories c ON p.category_id = c.id WHERE p.is_published = 1";
$res = mysqli_query($link, $sql);
$data = [];
while($row = mysqli_fetch_assoc($res)) { $data[] = $row; }
echo json_encode($data);
?>