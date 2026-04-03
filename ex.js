// 1. Отримуємо посилання на елементи сторінки
const urlInput = document.getElementById('url-input');
const filenameInput = document.getElementById('filename-input');
const generateBtn = document.getElementById('generate-btn');
const qrContainer = document.getElementById('qr-result');


// 2. Функція для генерації
function generateQR() {
    const url = urlInput.value;

    // Перевірка: якщо поле пусте, просимо користувача щось ввести
    if (!url) {
        alert("Please enter a URL first!");
        return;
    }

    // Очищуємо контейнер від старого QR-коду або тексту
    qrContainer.innerHTML = "";

    // 3. Створюємо новий QR-код за допомогою бібліотеки
    new QRCode(qrContainer, {
        text: url,
        width: 200,
        height: 200,
        colorDark : "#000000", // Колір самого коду (під стиль нашої кнопки)
        colorLight : "#ffffff", // Колір фону
        correctLevel : QRCode.CorrectLevel.H
    });
}

// 4. Додаємо прослуховувач події на кнопку
generateBtn.addEventListener('click', generateQR);