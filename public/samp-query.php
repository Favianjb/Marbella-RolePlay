<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permite solicitudes desde cualquier origen

$ip = '216.146.25.247'; // Cambia esto por la IP de tu servidor
$port = 7777;           // Cambia esto por el puerto de tu servidor

// URL de la API de Game-State
$api_url = "https://api.game-state.com/$ip:$port/";

try {
    $response = file_get_contents($api_url); // Obtén la respuesta desde Game-State
    if ($response === false) {
        throw new Exception("Error al conectar con Game-State");
    }
    echo $response; // Devuelve la respuesta de la API al cliente
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
