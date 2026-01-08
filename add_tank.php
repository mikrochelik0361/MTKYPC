<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

$link = mysqli_connect("localhost", "root", "", "MTKYPC");
mysqli_set_charset($link, "utf8mb4");

$d = json_decode(file_get_contents('php://input'), true);

if ($d) {
    $name = mysqli_real_escape_string($link, $d['name']);
    $img = mysqli_real_escape_string($link, $d['image_url']);
    $tier = (int)$d['tier'];
    $nation = (int)$d['nation_id'];
    $type = (int)$d['type_id'];

    // 1. Добавляем в таблицу танков
    $sql_v = "INSERT INTO vehicles (name, slug, tier, nation_id, type_id, image_url) 
              VALUES ('$name', '$name', $tier, $nation, $type, '$img')";
    
    if (mysqli_query($link, $sql_v)) {
        $id = mysqli_insert_id($link); // Получаем ID созданного танка
        
        // 2. Добавляем в таблицу характеристик (ЯВНО указываем колонки)
        $sql_s = "INSERT INTO vehicle_specifications 
        (vehicle_id, dmg_1, dmg_2, dmg_3, pen_1, pen_2, pen_3, reload_time, aiming_time, dispersion, weight_tons, engine_power, speed_forward, speed_backward, hp, hull_front, hull_side, hull_rear, turret_front, turret_side, turret_rear, view_range, radio_range) 
        VALUES 
        ($id, ".(int)$d['dmg_1'].", ".(int)$d['dmg_2'].", ".(int)$d['dmg_3'].", ".(int)$d['pen_1'].", ".(int)$d['pen_2'].", ".(int)$d['pen_3'].", ".(float)$d['reload_time'].", ".(float)$d['aiming_time'].", ".(float)$d['dispersion'].", ".(float)$d['weight_tons'].", ".(int)$d['engine_power'].", ".(int)$d['speed_forward'].", ".(int)$d['speed_backward'].", ".(int)$d['hp'].", ".(int)$d['hull_front'].", ".(int)$d['hull_side'].", ".(int)$d['hull_rear'].", ".(int)$d['turret_front'].", ".(int)$d['turret_side'].", ".(int)$d['turret_rear'].", ".(int)$d['view_range'].", ".(int)$d['radio_range'].")";

        if(mysqli_query($link, $sql_s)) {
            echo json_encode(["status" => "success"]);
        } else {
            // Если ошибка тут, удалим танк, чтобы не было дублей без ТТХ
            mysqli_query($link, "DELETE FROM vehicles WHERE id=$id");
            echo json_encode(["status" => "error", "message" => "Ошибка ТТХ: " . mysqli_error($link)]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Ошибка Танка: " . mysqli_error($link)]);
    }
}
?>