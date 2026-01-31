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

  const translations = {
    ru: {
      nav_about: "О компании",
      nav_why: "Почему мы",
      nav_benefits: "Выгоды СТМ",
      nav_products: "Продукция",
      nav_kontakt: "Контакты",
      about_h2: "О компании",
      about_p1:
        "ООО «РОКЕТ ФАРМ» с 2016 года предоставляет ведущую экспертизу в области создания, продвижения и продажи высоко-маржинальных товаров (ВМТ) и собственных торговых марок (СТМ) на фармацевтическом рынке.",
      about_p2:
        "Мы сотрудничаем с основными крупными контрактными площадками и производителями аптечного ассортимента и предлагаем готовый сбалансированный ассортимент СТМ и ВМТ любой региональной аптечной сети, оптовику, дистрибьютору.",
      about_p3:
        "Наша продукция – только лидеры товарных категорий, проверенные временем и большой выборкой, продукция с высокой наценкой и оборачиваемостью. Без избыточного ассортимента, без обязательств по объёмам, без отложенных ретро‑бонусов.",
      why_h2: "Почему мы",
      why_item1:
        "Уникальная экспертиза в основных товарных категориях парафармацевтики",
      why_item2: "Лучшие цены на рынке и только нужный ассортимент",
      why_item3: "Работаем оперативно, гибко, точно",
      why_tagline:
        "«Мы знаем об СТМ всё!.. и даже немного больше.<br>Доверяйте профессионалам.»",
      benefits_h2: "Выгоды СТМ",
      benefits_item1:
        "Зарабатывайте 150%...200%...300% при справедливой розничной цене",
      benefits_item2:
        "Зарабатывайте сразу, не ждёте ретро‑бонусов. Теперь вы сами производитель!",
      benefits_item3:
        "Эксклюзивная продукция, уникальное отличие от конкурентов",
      products_h2: "Продукция",
      products_p:
        "«РОКЕТ ФАРМ» предлагает только проверенную качественную продукцию в наиболее востребованных категориях парафармацевтики:",
      product_item1_h4: "БАД и здоровое питание",
      product_item1_li1: "Витамины, ВМК, батончики мюсли, здоровые снеки",
      product_item1_li2: "Витаминизированные леденцы и жвачки",
      product_item2_h4: "ИМН (изделия мед. назначения)",
      product_item2_li1: "Расходные санитарные средства",
      product_item2_li2: "Перевязочные средства, пластыри, повязки",
      product_item2_li3: "Уход за больными",
      product_item3_h4: "Гигиенические товары",
      product_item3_li1: "Влажные салфетки, ватные диски, палочки",
      product_item3_li2: "Женская гигиена",
      product_item4_h4: "Косметика",
      product_item4_li1: "Шампуни, маски, крема, гели, мыла",
      product_item4_li2: "Интимная косметика",
      product_item4_li3: "Репелленты, солнцезащитная косметика",
      product_item5_h4: "Планирование семьи",
      product_item5_li1: "Презервативы, тесты, лубриканты",
      product_item6_h4: "Детские товары",
      product_item6_li1: "Детская косметика, впитывающие пелёнки",
      product_item6_li2: "Влажные салфетки, ватные изделия",
      products_button: "Получить полный каталог продукции",
      contacts_header_h2: "КОНТАКТЫ",
      contact_detail_h3: "ООО «Рокет Фарм»",
      contact_detail_location: "129128, г. Москва, ул. Бажова, д. 18",
      feedback_form_h3: "Оставьте сообщение",
      feedback_form_name: "Имя:",
      feedback_form_phone: "Телефон:",
      feedback_form_message: "Сообщение:",
      feedback_button: "Отправить",
    },
    en: {
      nav_about: "About Company",
      nav_why: "Why Us",
      nav_benefits: "STM Benefits",
      nav_products: "Products",
      nav_kontakt: "Contacts",
      about_h2: "About Company",
      about_p1:
        'LLC "ROCKET PHARM" has been providing leading expertise in creating, promoting and selling high-margin products (HMP) and private labels (STM) in the pharmaceutical market since 2016.',
      about_p2:
        "We cooperate with major contract platforms and pharmaceutical manufacturers and offer a ready balanced range of STM and HMP to any regional pharmacy network, wholesaler, distributor.",
      about_p3:
        "Our products are only category leaders, tested by time and large sample, products with high markup and turnover. Without excessive range, without volume commitments, without deferred retro bonuses.",
      why_h2: "Why Us",
      why_item1: "Unique expertise in main categories of parapharmacy",
      why_item2: "Best prices on the market and only necessary range",
      why_item3: "We work promptly, flexibly, accurately",
      why_tagline:
        '"We know everything about STM... and even a little more.<br>Trust professionals."',
      benefits_h2: "STM Benefits",
      benefits_item1: "Earn 150%...200%...300% at fair retail price",
      benefits_item2:
        "Earn immediately, no waiting for retro-bonuses. Now you are the manufacturer yourself!",
      benefits_item3: "Exclusive products, unique difference from competitors",
      products_h2: "Products",
      products_p:
        "ROCKET PHARM offers only verified quality products in the most demanded categories of parapharmacy:",
      product_item1_h4: "Dietary Supplements and Healthy Nutrition",
      product_item1_li1: "Vitamins, B-complex, muesli bars, healthy snacks",
      product_item1_li2: "Vitaminized candies and chewing gums",
      product_item2_h4: "MDI (medical devices items)",
      product_item2_li1: "Consumable sanitary supplies",
      product_item2_li2: "Dressing materials, plasters, bandages",
      product_item2_li3: "Patient care",
      product_item3_h4: "Hygiene Products",
      product_item3_li1: "Wet wipes, cotton pads, swabs",
      product_item3_li2: "Feminine hygiene",
      product_item4_h4: "Cosmetics",
      product_item4_li1: "Shampoos, masks, creams, gels, soaps",
      product_item4_li2: "Intimate cosmetics",
      product_item4_li3: "Repellents, sun protection cosmetics",
      product_item5_h4: "Family Planning",
      product_item5_li1: "Condoms, tests, lubricants",
      product_item6_h4: "Children's Products",
      product_item6_li1: "Baby cosmetics, absorbent diapers",
      product_item6_li2: "Wet wipes, cotton products",
      products_button: "Get Full Product Catalog",
      contacts_header_h2: "CONTACTS",
      contact_detail_h3: "LLC Rocket Pharm",
      contact_detail_location: "129128, Moscow, Bazhova St., 18",
      feedback_form_h3: "Leave a message",
      feedback_form_name: "Name:",
      feedback_form_phone: "Phone:",
      feedback_form_message: "Message:",
      feedback_button: "Send",
    },
  };

  const langToggle = document.getElementById("lang-toggle");
  let currentLang = "ru";

  function updateTextContent() {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (translations[currentLang][key]) {
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
          element.placeholder = translations[currentLang][key];
        } else if (element.tagName === "LABEL") {
          const inputElement = element.querySelector("input, textarea");
          if (!inputElement) {
            element.textContent = translations[currentLang][key];
          } else {
            element.innerHTML =
              translations[currentLang][key] + inputElement.outerHTML;
          }
        } else {
          element.textContent = translations[currentLang][key];
        }
      }
    });

    langToggle.textContent = currentLang === "ru" ? "EN" : "RU";
  }

  langToggle.addEventListener("click", function () {
    currentLang = currentLang === "ru" ? "en" : "ru";
    localStorage.setItem("preferredLanguage", currentLang);
    updateTextContent();
  });

  const savedLang = localStorage.getItem("preferredLanguage");
  if (savedLang && translations[savedLang]) {
    currentLang = savedLang;
  }

  updateTextContent();
});
