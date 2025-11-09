<?php
// Настройки
$to = "ss.zaporozhets@gmail.com"; // ← сюда будут приходить письма
$subject = "Новая заявка с сайта Rocket Pharm";

// Проверяем, что форма отправлена методом POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Получаем и экранируем данные
    $name = htmlspecialchars(trim($_POST["name"] ?? ""));
    $email = htmlspecialchars(trim($_POST["email"] ?? ""));
    $phone = htmlspecialchars(trim($_POST["phone"] ?? ""));
    $message = htmlspecialchars(trim($_POST["message"] ?? ""));

    // Проверка обязательных полей
    if ($name && $email && $phone) {

        // Формируем письмо
        $body = "Имя: $name\n";
        $body .= "E-mail: $email\n";
        $body .= "Телефон: $phone\n";
        $body .= "Сообщение:\n$message\n";

        $headers = "From: Rocket Pharm <noreply@rocket-pharm.ru>\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        // Отправляем письмо
        if (mail($to, $subject, $body, $headers)) {
            http_response_code(200);
            echo "success";
        } else {
            http_response_code(500);
            echo "Ошибка отправки письма";
        }

    } else {
        http_response_code(400);
        echo "Не заполнены обязательные поля";
    }
} else {
    http_response_code(405);
    echo "Метод не разрешён";
}
?>
