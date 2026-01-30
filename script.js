document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("main-nav");
    const navMenu = document.querySelector("nav ul");

    hamburger.addEventListener("click", function () {
        navMenu.classList.toggle("open");
        hamburger.classList.toggle("active");
    });

    /* Форма обратной связи */
    const feedbackBtn = document.getElementById("open-feedback");
    const feedbackPopup = document.getElementById("feedback-popup");
    const feedbackForm = document.getElementById("feedback-form-popup");
    const form = document.getElementById("feedback-form-popup");
    const submitBtn = document.getElementById("submit-btn");

    feedbackBtn.addEventListener("click", () =>
        feedbackPopup.classList.add("active"),
    );

    feedbackPopup
        .querySelector(".close-popup")
        .addEventListener("click", () => feedbackPopup.classList.remove("active"));

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && feedbackPopup.classList.contains("active")) {
            feedbackPopup.classList.remove("active");
        }
    });

    feedbackPopup.addEventListener("click", function (e) {
        if (!feedbackForm.contains(e.target)) {
            feedbackPopup.classList.remove("active");
        }
    });

    function validateField(field) {
        const val = field.value.trim();
        if (!val) return false;
        if (field.name === "phone") return /^+?\d{7,15}$/.test(val);
        if (field.name === "email")
            return /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(val);
        if (field.name === "message") return /^[A-Za-zА-Яа-я0-9\s.,!?]+$/.test(val);
        return true;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let valid = true;
        [...form.elements].forEach((field) => {
            if (field.required && !validateField(field)) {
                field.style.borderColor = "red";
                valid = false;
            } else {
                field.style.borderColor = "#ccc";
            }
        });
        if (!valid) return;

        submitBtn.classList.add("sending");
        submitBtn.textContent = "Отправляем...";
        submitBtn.disabled = true;

        fetch(form.action, { method: "POST", body: new FormData(form) })
            .then((res) => {
                if (res.ok) {
                    submitBtn.classList.remove("sending");
                    submitBtn.classList.add("success");
                    submitBtn.textContent = "Успешно отправлено";
                } else throw new Error("Ошибка");
            })
            .catch(() => {
                submitBtn.classList.remove("sending");
                submitBtn.textContent = "Ошибка отправки";
                submitBtn.disabled = false;
            });
    });

    /* Анимация SVG */
    const rocketPath = document.getElementById("rocket-path");
    document.addEventListener("scroll", () => {
        const len = rocketPath.getTotalLength();
        const scrollRatio =
            window.scrollY / (document.body.scrollHeight - window.innerHeight);
        rocketPath.style.strokeDasharray = len;
        rocketPath.style.strokeDashoffset = len - len * scrollRatio;
    });

    document.addEventListener("mousemove", (e) => {
        const logo = document.getElementById("animated-logo");
        const x = (e.clientX / window.innerWidth) * 30 - 15;
        logo.style.transform = `translate(-50%, -50%) rotate(${x}deg)`;
    });

    // --- НОВЫЙ КОД ДЛЯ ПЕРЕВОДА ---
    const translateButton = document.getElementById('translateButton');
    const errorDiv = document.getElementById('translation-error');

    // Используем глобальный объект для хранения исходного текста
    window.originalTexts = {};

    // Сохраняем исходные тексты перед первым переводом
    function saveOriginalTexts(node) {
        node = node || document.body;
        const walker = document.createTreeWalker(
            node,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        let textNode;
        while (textNode = walker.nextNode()) {
            if (textNode.nodeValue.trim() !== '') {
                const key = textNode.textContent;
                if (!window.originalTexts[key]) {
                    window.originalTexts[key] = textNode.textContent;
                }
            }
        }
    }

    // Функция для перевода текста с помощью Google Translate API
    async function translateText(text, sourceLang = 'ru', targetLang = 'en') {
        // В реальном приложении нужно использовать официальный API Google Translate с ключом
        // Это упрощённый пример, который может не работать из-за CORS и ограничений API
        // Ниже приведён альтернативный подход с использованием прокси или внутреннего API
        // Для демонстрации используется fetch к самому себе, но это не является полноценным решением
        // Реализация зависит от серверной части и доступных переводческих сервисов

        // Альтернативное решение: использование стороннего сервиса или внутреннего API
        // Пример с fetch к внешнему прокси (не рекомендуется для продакшена)
        try {
            // ВНИМАНИЕ: Этот URL является примером и может не работать или быть небезопасным.
            // В реальном проекте необходимо использовать собственный серверный скрипт или официальный API.
            const proxyUrl = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=' + sourceLang + '|' + targetLang;
            const response = await fetch(proxyUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.responseData.translatedText || text;
        } catch (error) {
            console.error('Translation error:', error);
            // Возвращаем оригинальный текст в случае ошибки
            return text;
        }
    }

    // Рекурсивная функция для обновления текста на странице
    async function updateNodeText(node, translations) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.nodeValue.trim() !== '' && translations[node.nodeValue]) {
                node.nodeValue = translations[node.nodeValue];
            }
        } else {
            // Пропускаем элементы формы и их потомков
            if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA' || node.tagName === 'SELECT' || node.tagName === 'OPTION') {
                return;
            }
            // Пропускаем кнопку перевода и её потомков
            if (node.id === 'translateButton' || node === translateButton) {
                 return;
            }
            // Пропускаем элементы с ошибками и их потомков
             if (node.id === 'translation-error' || node === errorDiv) {
                 return;
             }
            // Пропускаем элементы, которые не нужно переводить (например, email, телефон)
            if (node.hasAttribute('data-notranslate')) {
                return;
            }
            for (let child of node.childNodes) {
                await updateNodeText(child, translations);
            }
        }
    }

    // Основная функция перевода
    async function translatePage() {
        if (!window.originalTexts || Object.keys(window.originalTexts).length === 0) {
            saveOriginalTexts();
        }

        const keysToTranslate = Object.keys(window.originalTexts);

        if (keysToTranslate.length === 0) {
            errorDiv.textContent = 'No text found to translate.';
            errorDiv.style.display = 'block';
            setTimeout(() => { errorDiv.style.display = 'none'; }, 3000);
            return;
        }

        // Показываем индикатор загрузки на кнопке
        translateButton.disabled = true;
        translateButton.textContent = 'Translating...';

        try {
            // Создаём массив промисов для перевода всех текстов
            const translationPromises = keysToTranslate.map(key => translateText(key));
            const translatedTexts = await Promise.all(translationPromises);

            // Создаём объект соответствия оригинального текста переведённому
            const translations = {};
            keysToTranslate.forEach((original, index) => {
                translations[original] = translatedTexts[index];
            });

            // Обновляем текст на странице
            await updateNodeText(document.body, translations);

            // Изменяем текст кнопки на "Translate Back"
            translateButton.textContent = 'Translate Back';
            translateButton.onclick = revertTranslation;
        } catch (error) {
            console.error('Failed to translate page:', error);
            errorDiv.textContent = 'Error translating page. Please try again later.';
            errorDiv.style.display = 'block';
            setTimeout(() => { errorDiv.style.display = 'none'; }, 3000);
        } finally {
            translateButton.disabled = false;
        }
    }

    // Функция для возврата к оригинальному тексту
    async function revertTranslation() {
         if (!window.originalTexts || Object.keys(window.originalTexts).length === 0) {
             // Если оригинальные тексты не сохранены, ничего не делаем
             return;
         }

         const translations = {};
         for (const [original, translated] of Object.entries(window.originalTexts)) {
             translations[translated] = original; // Меняем местами ключи и значения
         }

         translateButton.disabled = true;
         translateButton.textContent = 'Reverting...';

         try {
             await updateNodeText(document.body, translations);
             translateButton.textContent = 'Translate to EN';
             translateButton.onclick = translatePage;
         } catch (error) {
             console.error('Failed to revert translation:', error);
             errorDiv.textContent = 'Error reverting translation.';
             errorDiv.style.display = 'block';
             setTimeout(() => { errorDiv.style.display = 'none'; }, 3000);
         } finally {
             translateButton.disabled = false;
         }
    }

    // Добавляем обработчик события для кнопки перевода
    if (translateButton) {
        translateButton.onclick = translatePage;
    } else {
        console.warn('Translate button not found!');
    }

    // --- КОНЕЦ НОВОГО КОДА ---
});

const translations = {
    ru: {
        nav_about: "О компании",
        nav_why: "Почему мы",
        nav_benefits: "Выгоды СТМ",
        nav_products: "Продукция",
        nav_contacts: "Контакты",

        hero_subtitle:
            "Leading expertise in creating and promoting high-margin products",

        about_title: "О компании",
        about_p1:
            "ООО «РОКЕТ ФАРМ» с 2016 года предоставляет ведущую экспертизу в области создания, продвижения и продажи высоко-маржинальных товаров.",
        about_p2:
            "Мы сотрудничаем с основными крупными контрактными площадками и производителями аптечного ассортимента.",
        about_p3:
            "Наша продукция – только лидеры товарных категорий с высокой оборачиваемостью.",

        why_title: "Почему мы",
        why_1:
            "Уникальная экспертиза в основных товарных категориях парафармацевтики",
        why_2:
            "Лучшие цены на рынке и только нужный ассортимент",
        why_3:
            "Работаем оперативно, гибко, точно",
        why_quote:
            "«Мы знаем об СТМ всё!.. и даже немного больше»",

        benefits_title: "Выгоды СТМ",
        benefits_1:
            "Зарабатывайте 150%...200%...300% при справедливой цене",
        benefits_2:
            "Зарабатывайте сразу, не ждёте ретро-бонусов",
        benefits_3:
            "Эксклюзивная продукция, уникальное отличие",

        catalog_btn: "Получить полный каталог продукции",
        contact_btn: "Связаться с нами"
    },

    en: {
        nav_about: "About us",
        nav_why: "Why us",
        nav_benefits: "Private Label Benefits",
        nav_products: "Products",
        nav_contacts: "Contacts",

        hero_subtitle:
            "Leading expertise in creating and promoting high-margin products",

        about_title: "About the company",
        about_p1:
            "Rocket Pharm LLC has been providing leading expertise in the development and promotion of high-margin products since 2016.",
        about_p2:
            "We cooperate with major contract manufacturing platforms and pharmaceutical producers.",
        about_p3:
            "Our products are category leaders with high profitability and turnover.",

        why_title: "Why choose us",
        why_1:
            "Unique expertise in key parapharmaceutical categories",
        why_2:
            "Best market prices and optimized assortment",
        why_3:
            "Fast, flexible and precise operations",
        why_quote:
            "“We know everything about private labels… and even more”",

        benefits_title: "Private Label Benefits",
        benefits_1:
            "Earn 150%…200%…300% with fair retail pricing",
        benefits_2:
            "Earn immediately without waiting for retro bonuses",
        benefits_3:
            "Exclusive products with strong competitive advantage",

        catalog_btn: "Get full product catalog",
        contact_btn: "Contact us"
    }
};

let currentLang = localStorage.getItem("lang") || "ru";

function applyLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    document.getElementById("translateButton").textContent =
        lang === "ru" ? "EN" : "RU";

    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
}

document.getElementById("translateButton").addEventListener("click", () => {
    currentLang = currentLang === "ru" ? "en" : "ru";
    applyLanguage(currentLang);
});

applyLanguage(currentLang);
