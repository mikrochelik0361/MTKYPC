<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
$link = mysqli_connect("localhost", "root", "", "MTKYPC");
$id = (int)$_GET['id'];
$sql = "SELECT p.*, c.name as cat_name FROM news_posts p JOIN news_categories c ON p.category_id = c.id WHERE p.id = $id";
echo json_encode(mysqli_fetch_assoc(mysqli_query($link, $sql)));
?>