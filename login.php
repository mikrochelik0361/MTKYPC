<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;
$link = mysqli_connect("localhost", "root", "", "MTKYPC");
$d = json_decode(file_get_contents('php://input'), true);
$e = $d['email']; $p = $d['password'];
$res = mysqli_query($link, "SELECT id, nickname, role FROM users WHERE email='$e' AND password_hash='$p'");
$user = mysqli_fetch_assoc($res);
if ($user) echo json_encode(["status" => "success", "user" => $user]);
else echo json_encode(["status" => "error", "message" => "Ошибка"]);
?>