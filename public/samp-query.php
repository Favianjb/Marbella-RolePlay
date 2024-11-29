<?php
function queryServer($ip, $port) {
    // Verifica si la IP y el puerto son válidos
    if (!filter_var($ip, FILTER_VALIDATE_IP)) {
        return ['error' => 'IP inválida'];
    }
    if ($port < 1 || $port > 65535) {
        return ['error' => 'Puerto inválido'];
    }

    // Intenta conectarse al servidor SA-MP
    $sock = fsockopen('udp://' . $ip, $port, $errno, $errstr, 2);
    if (!$sock) {
        return ['error' => "No se pudo conectar al servidor: $errstr ($errno)"];
    }

    // Envía el paquete de consulta a SA-MP
    fwrite($sock, "SAMP\x21\x21\x21\x21" . pack('L', ip2long($ip)) . pack('S', $port) . "i");
    $data = fread($sock, 4096);
    fclose($sock);

    // Verifica si se recibió respuesta
    if (empty($data)) {
        return ['error' => 'No se recibió respuesta del servidor'];
    }

    // Analiza la respuesta y extrae los datos necesarios
    $info = unpack("a4Header/CPlayers/CMaxPlayers", substr($data, 11, 12));
    return [
        'players' => $info['Players'] ?? 0,
        'max_players' => $info['MaxPlayers'] ?? 0
    ];
}

// Configura las cabeceras de la respuesta
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permite solicitudes desde cualquier origen (CORS)

// Configura la IP y el puerto del servidor
$ip = '216.146.25.247'; // Cambia esto por la IP de tu servidor SA-MP
$port = 7777;           // Cambia esto por el puerto de tu servidor SA-MP

// Envía la respuesta en formato JSON
echo json_encode(queryServer($ip, $port));
?>