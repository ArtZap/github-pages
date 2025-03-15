// Базовая валидация формы
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Отменяем отправку по умолчанию
  
    // Получение элементов формы
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
  
    // Пример простой проверки
    let valid = true;
    let errorMessage = '';
  
    if (name.value.trim() === '') {
      valid = false;
      errorMessage += 'Пожалуйста, введите имя.\n';
    }
    if (email.value.trim() === '') {
      valid = false;
      errorMessage += 'Пожалуйста, введите email.\n';
    } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
      valid = false;
      errorMessage += 'Введите корректный email.\n';
    }
    if (message.value.trim() === '') {
      valid = false;
      errorMessage += 'Пожалуйста, введите сообщение.\n';
    }
  
    if (!valid) {
      alert(errorMessage);
    } else {
      // Можно выполнить отправку формы через AJAX или показать сообщение об успехе
      alert('Форма успешно отправлена!');
      // Здесь можно добавить логику отправки данных на сервер
      this.reset();
    }
  });
  