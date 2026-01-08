<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;
$link = mysqli_connect("localhost", "root", "", "MTKYPC");
$d = json_decode(file_get_contents('php://input'), true);
if ($d) {
    $id = (int)$d['id'];
mysqli_query($link, "UPDATE vehicles SET name='".$d['name']."', tier=".$d['tier'].", image_url='".$d['image_url']."' WHERE id=$id");

$sql_update_spec = "UPDATE vehicle_specifications SET 
    dmg_1=".(int)$d['dmg_1'].", dmg_2=".(int)$d['dmg_2'].", dmg_3=".(int)$d['dmg_3'].", 
    pen_1=".(int)$d['pen_1'].", pen_2=".(int)$d['pen_2'].", pen_3=".(int)$d['pen_3'].",
    reload_time=".(float)$d['reload_time'].", hp=".(int)$d['hp'].", 
    hull_front=".(int)$d['hull_front'].", hull_side=".(int)$d['hull_side'].", hull_rear=".(int)$d['hull_rear'].", 
    turret_front=".(int)$d['turret_front'].", turret_side=".(int)$d['turret_side'].", turret_rear=".(int)$d['turret_rear'].", 
    aiming_time=".(float)$d['aiming_time'].", dispersion=".(float)$d['dispersion'].",
    weight_tons=".(float)$d['weight_tons'].", engine_power=".(int)$d['engine_power'].",
    speed_forward=".(int)$d['speed_forward'].", speed_backward=".(int)$d['speed_backward'].",
    view_range=".(int)$d['view_range'].", radio_range=".(int)$d['radio_range']."
    WHERE vehicle_id=$id";

mysqli_query($link, $sql_update_spec);
}
?>