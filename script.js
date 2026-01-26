document.addEventListener("DOMContentLoaded", () => {
  // Система переводов
  const translations = {
    en: {
      // Навигация
      about: "About",
      "why-us": "Why Us",
      benefits: "STM Benefits",
      products: "Products",
      contacts: "Contacts",

      // О компании
      "about-title": "About the Company",
      "about-text-1":
        "LLC «ROCKET PHARM» has been providing leading expertise in the creation, promotion and sale of high-margin goods (HMG) and private label brands (PLB) in the pharmaceutical market since 2016.",
      "about-text-2":
        "We cooperate with the main large contract platforms and manufacturers of pharmacy assortment and offer a ready-made balanced assortment of PLB and HMG to any regional pharmacy chain, wholesaler, distributor.",
      "about-text-3":
        "Our products are only category leaders, time-tested and large-sample products with high markup and turnover. No excess assortment, no volume obligations, no deferred retro-bonuses.",

      // Почему мы
      "why-us-title": "Why Us",
      "why-us-text-1":
        "Unique expertise in the main categories of parapharmaceuticals",
      "why-us-text-2":
        "Best prices on the market and only necessary assortment",
      "why-us-text-3": "We work quickly, flexibly, accurately",
      "why-us-quote":
        "«We know everything about PLB!.. and even a little more. Trust professionals.»",

      // Выгоды СТМ
      "benefits-title": "STM Benefits",
      "benefits-text-1": "Earn 150%...200%...300% at a fair retail price",
      "benefits-text-2":
        "Earn immediately, don't wait for retro-bonuses. Now you are the manufacturer!",
      "benefits-text-3":
        "Exclusive products, unique difference from competitors",

      // Продукция
      "products-title": "Products",
      "products-text":
        "«ROCKET PHARM» offers only proven quality products in the most demanded categories of parapharmaceuticals:",
      "products-category-1": "Dietary Supplements and Healthy Nutrition",
      "products-category-2":
        "Vitamins, Multivitamins, Muesli Bars, Healthy Snacks",
      "products-category-3": "Vitamin Lollipops and Chewing Gums",
      "products-category-4": "Medical Devices",
      "products-category-5": "Sanitary Disposable Products",
      "products-category-6": "Dressing Materials, Plasters, Bandages",
      "products-category-7": "Patient Care",
      "products-category-8": "Hygiene Products",
      "products-category-9": "Wet Wipes, Cotton Pads, Swabs",
      "products-category-10": "Feminine Hygiene",
      "products-category-11": "Cosmetics",
      "products-category-12": "Shampoos, Masks, Creams, Gels, Soaps",
      "products-category-13": "Intimate Cosmetics",
      "products-category-14": "Repellents, Sunscreen Cosmetics",
      "products-category-15": "Family Planning",
      "products-category-16": "Condoms, Tests, Lubricants",
      "products-category-17": "Children's Products",
      "products-category-18": "Children's Cosmetics, Absorbent Pads",
      "products-category-19": "Wet Wipes, Cotton Products",
      "products-button": "Get Full Product Catalog",

      // Контакты
      "contacts-title": "CONTACTS",
      "contacts-company": "LLC «Rocket Pharm»",
      "contacts-address": "129128, Moscow, Bazhova St., 18",
      "contacts-phone": "+7 (495) 298-11-19",
      "contacts-email": "info@rocket-pharm.ru",

      // Попап обратной связи
      "feedback-title": "Leave a Message",
      "feedback-name": "Name:",
      "feedback-phone": "Phone:",
      "feedback-email": "Email:",
      "feedback-message": "Message:",
      "feedback-submit": "Send",
      "feedback-submit-sending": "Sending...",
      "feedback-submit-success": "Successfully Sent",
      "feedback-submit-error": "Send Error",

      // Кнопка обратной связи
      "feedback-button": "Leave a Message",

      // Языковая кнопка
      "lang-ru": "EN",
      "lang-en": "RU",
    },
    ru: {
      // Оригинальные русские тексты (уже есть на странице)
      about: "О компании",
      "why-us": "Почему мы",
      benefits: "Выгоды СТМ",
      products: "Продукция",
      contacts: "Контакты",
      "about-title": "О компании",
      "about-text-1":
        "ООО «РОКЕТ ФАРМ» с 2016 года предоставляет ведущую экспертизу в области создания, продвижения и продажи высоко-маржинальных товаров (ВМТ) и собственных торговых марок (СТМ) на фармацевтическом рынке.",
      "about-text-2":
        "Мы сотрудничаем с основными крупными контрактными площадками и производителями аптечного ассортимента и предлагаем готовый сбалансированный ассортимент СТМ и ВМТ любой региональной аптечной сети, оптовику, дистрибьютору.",
      "about-text-3":
        "Наша продукция – только лидеры товарных категорий, проверенные временем и большой выборкой, продукция с высокой наценкой и оборачиваемостью. Без избыточного ассортимента, без обязательств по объёмам, без отложенных ретро‑бонусов.",
      "why-us-title": "Почему мы",
      "why-us-text-1":
        "Уникальная экспертиза в основных товарных категориях парафармацевтики",
      "why-us-text-2": "Лучшие цены на рынке и только нужный ассортимент",
      "why-us-text-3": "Работаем оперативно, гибко, точно",
      "why-us-quote":
        "«Мы знаем об СТМ всё!.. и даже немного больше.Доверяйте профессионалам.»",
      "benefits-title": "Выгоды СТМ",
      "benefits-text-1":
        "Зарабатывайте 150%...200%...300% при справедливой розничной цене",
      "benefits-text-2":
        "Зарабатывайте сразу, не ждёте ретро‑бонусов. Теперь вы сами производитель!",
      "benefits-text-3":
        "Эксклюзивная продукция, уникальное отличие от конкурентов",
      "products-title": "Продукция",
      "products-text":
        "«РОКЕТ ФАРМ» предлагает только проверенную качественную продукцию в наиболее востребованных категориях парафармацевтики:",
      "products-category-1": "БАД и здоровое питание",
      "products-category-2": "Витамины, ВМК, батончики мюсли, здоровые снеки",
      "products-category-3": "Витаминизированные леденцы и жвачки",
      "products-category-4": "ИМН (изделия мед. назначения)",
      "products-category-5": "Расходные санитарные средства",
      "products-category-6": "Перевязочные средства, пластыри, повязки",
      "products-category-7": "Уход за больными",
      "products-category-8": "Гигиенические товары",
      "products-category-9": "Влажные салфетки, ватные диски, палочки",
      "products-category-10": "Женская гигиена",
      "products-category-11": "Косметика",
      "products-category-12": "Шампуни, маски, крема, гели, мыла",
      "products-category-13": "Интимная косметика",
      "products-category-14": "Репелленты, солнцезащитная косметика",
      "products-category-15": "Планирование семьи",
      "products-category-16": "Презервативы, тесты, лубриканты",
      "products-category-17": "Детские товары",
      "products-category-18": "Детская косметика, впитывающие пелёнки",
      "products-category-19": "Влажные салфетки, ватные изделия",
      "products-button": "Получить полный каталог продукции",
      "contacts-title": "КОНТАКТЫ",
      "contacts-company": "ООО «Рокет Фарм»",
      "contacts-address": "129128, г. Москва, ул. Бажова, д. 18",
      "contacts-phone": "+7 (495) 298-11-19",
      "contacts-email": "info@rocket-pharm.ru",
      "feedback-title": "Оставьте сообщение",
      "feedback-name": "Имя:",
      "feedback-phone": "Телефон:",
      "feedback-email": "Email:",
      "feedback-message": "Сообщение:",
      "feedback-submit": "Отправить",
      "feedback-submit-sending": "Отправляем...",
      "feedback-submit-success": "Успешно отправлено",
      "feedback-submit-error": "Ошибка отправки",
      "feedback-button": "Оставьте сообщение",
      "lang-ru": "RU",
      "lang-en": "EN",
    },
  };

  // Текущий язык
  let currentLang = localStorage.getItem("lang") || "ru";

  // Функция перевода
  function translatePage(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);

    // Переводим все элементы с атрибутом data-i18n
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });

    // Обновляем кнопку языка
    const langBtn = document.getElementById("lang-toggle");
    if (langBtn) {
      langBtn.textContent =
        lang === "ru" ?
          translations[lang]["lang-ru"]
        : translations[lang]["lang-en"];
    }

    // Переводим плейсхолдеры форм
    const placeholders = {
      name: lang === "ru" ? "Ваше имя" : "Your Name",
      phone: lang === "ru" ? "Ваш телефон" : "Your Phone",
      email: lang === "ru" ? "Ваш email" : "Your Email",
      message: lang === "ru" ? "Ваше сообщение" : "Your Message",
    };

    document
      .querySelectorAll('input[name="name"], textarea[name="name"]')
      .forEach((el) => {
        el.placeholder = placeholders.name;
      });
    document
      .querySelectorAll('input[name="phone"], textarea[name="phone"]')
      .forEach((el) => {
        el.placeholder = placeholders.phone;
      });
    document
      .querySelectorAll('input[name="email"], textarea[name="email"]')
      .forEach((el) => {
        el.placeholder = placeholders.email;
      });
    document
      .querySelectorAll('input[name="message"], textarea[name="message"]')
      .forEach((el) => {
        el.placeholder = placeholders.message;
      });
  }

  // Инициализация перевода при загрузке
  translatePage(currentLang);

  // Обработчик кнопки переключения языка
  const langToggle = document.getElementById("lang-toggle");
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const newLang = currentLang === "ru" ? "en" : "ru";
      translatePage(newLang);
    });
  }

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
    if (field.name === "phone") return /^\+?\d{7,15}$/.test(val);
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
});
