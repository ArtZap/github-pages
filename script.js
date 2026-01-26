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

  // --- Новый код для перевода ---

  // Объект с переводами (пример для ключевых элементов)
  const translations = {
    en: {
      companyName: "ROCKET PHARM",
      aboutTitle: "About Us",
      aboutText:
        'LLC "ROCKET PHARM" has been providing leading expertise in the creation, promotion and sales of high-margin products (HMP) and private labels (PL) in the pharmaceutical market since 2016.',
      whyUsTitle: "Why Us",
      whyUsText1:
        "Unique expertise in the main product categories of parapharmacy",
      whyUsText2: "Best prices on the market and only the necessary assortment",
      whyUsText3: "We work quickly, flexibly, accurately",
      benefitsTitle: "PL Benefits",
      benefitsText1: "Earn 150%...200%...300% at a fair retail price",
      benefitsText2:
        "Start earning immediately, don't wait for retro-bonuses. Now you are the manufacturer yourself!",
      benefitsText3:
        "Exclusive products, unique differentiation from competitors",
      productsTitle: "Products",
      productsIntro:
        "ROCKET PHARM offers only proven quality products in the most demanded categories of parapharmacy:",
      productCategory1: "BADS and Healthy Nutrition",
      productSubCat1: "Vitamins, VMK, muesli bars, healthy snacks",
      productSubCat2: "Vitaminized lollipops and chewing gums",
      productCategory2: "MDI (Medical Purpose Products)",
      productSubCat3: "Disposable sanitary supplies",
      productSubCat4: "Dressings, plasters, patches",
      productCategory3: "Patient Care",
      productSubCat5: "Hygiene items",
      productSubCat6: "Wet wipes, cotton pads, swabs",
      productSubCat7: "Female hygiene",
      productCategory4: "Cosmetics",
      productSubCat8: "Shampoos, masks, creams, gels, soaps",
      productSubCat9: "Intimate cosmetics",
      productSubCat10: "Repellents, sun protection cosmetics",
      productCategory5: "Family Planning",
      productSubCat11: "Condoms, tests, lubricants",
      productCategory6: "Children's Goods",
      productSubCat12: "Children's cosmetics, absorbent diapers",
      productSubCat13: "Wet wipes, cotton products",
      fullCatalogBtn: "Get Full Product Catalog",
      contactsTitle: "CONTACTS",
      feedbackBtnText: "Leave a message",
      feedbackPopupTitle: "Leave a Message",
      feedbackNameLabel: "Name:",
      feedbackPhoneLabel: "Phone:",
      feedbackEmailLabel: "Email:",
      feedbackMessageLabel: "Message:",
      feedbackSubmitBtn: "Send",
      footerAddress: "129128, Moscow, Bazhova st., 18",
      // ... можно продолжить добавлять переводы для остальных элементов ...
    },
    ru: {
      // Оригинальные русские значения - в реальной реализации могут быть не нужны,
      // если оригинальный HTML уже на русском, но полезны для переключения обратно.
      // Для простоты в данном примере они не приведены полностью.
    },
  };

  let currentLanguage = "ru"; // Текущий язык ('ru' или 'en')

  // Функция для получения всех текстовых узлов внутри элемента
  function getTextNodes(parentElement) {
    const textNodes = [];
    const walker = document.createTreeWalker(
      parentElement,
      NodeFilter.SHOW_TEXT,
      null,
      false,
    );
    while (walker.nextNode()) {
      const node = walker.currentNode;
      // Исключаем пустые узлы и узлы внутри input, textarea, script, style
      if (
        node.parentElement.tagName !== "SCRIPT" &&
        node.parentElement.tagName !== "STYLE" &&
        node.parentElement.tagName !== "INPUT" &&
        node.parentElement.tagName !== "TEXTAREA" &&
        node.nodeValue.trim() !== ""
      ) {
        textNodes.push(node);
      }
    }
    return textNodes;
  }

  // Функция для замены текста на основе словаря
  function replaceTextWithTranslations(textNodes, lang) {
    const dict = translations[lang];
    if (!dict) {
      console.warn(`No translation dictionary found for language: ${lang}`);
      return;
    }

    // Более точная замена может потребовать более сложной логики,
    // например, сопоставления по ID или классу.
    // Этот подход заменяет точные совпадения текста.
    // Он менее надежен, чем манипуляции с конкретными элементами по ID.

    // Более надежный способ - манипуляции с конкретными элементами
    // Пример для некоторых ключевых элементов:

    // Заголовки и основной текст
    const elementsToTranslate = {
      "#about h2": "aboutTitle",
      "#about p:first-of-type": "aboutText", // Первый абзац
      "#why-us h2": "whyUsTitle",
      ".feature-item:nth-child(1) p": "whyUsText1",
      ".feature-item:nth-child(2) p": "whyUsText2",
      ".feature-item:nth-child(3) p": "whyUsText3",
      "#benefits h2": "benefitsTitle",
      "#benefits .features .feature-item:nth-child(1) p": "benefitsText1",
      "#benefits .features .feature-item:nth-child(2) p": "benefitsText2",
      "#benefits .features .feature-item:nth-child(3) p": "benefitsText3",
      "#products h2": "productsTitle",
      "#products p": "productsIntro",
      "#products .prod-item:nth-child(1) h4": "productCategory1",
      "#products .prod-item:nth-child(1) li:first-child": "productSubCat1",
      "#products .prod-item:nth-child(1) li:last-child": "productSubCat2",
      "#products .prod-item:nth-child(2) h4": "productCategory2",
      "#products .prod-item:nth-child(2) li:first-child": "productSubCat3",
      "#products .prod-item:nth-child(2) li:last-child": "productSubCat4",
      "#products .prod-item:nth-child(3) h4": "productCategory3",
      "#products .prod-item:nth-child(3) li:first-child": "productSubCat5",
      "#products .prod-item:nth-child(3) li:nth-child(2)": "productSubCat6",
      "#products .prod-item:nth-child(3) li:last-child": "productSubCat7",
      "#products .prod-item:nth-child(4) h4": "productCategory4",
      "#products .prod-item:nth-child(4) li:first-child": "productSubCat8",
      "#products .prod-item:nth-child(4) li:nth-child(2)": "productSubCat9",
      "#products .prod-item:nth-child(4) li:last-child": "productSubCat10",
      "#products .prod-item:nth-child(5) h4": "productCategory5",
      "#products .prod-item:nth-child(5) li:first-child": "productSubCat11",
      "#products .prod-item:nth-child(6) h4": "productCategory6",
      "#products .prod-item:nth-child(6) li:first-child": "productSubCat12",
      "#products .prod-item:nth-child(6) li:last-child": "productSubCat13",
      "#get-catalog-btn": "fullCatalogBtn", // Предполагается ID для кнопки
      "#contact h2": "contactsTitle",
      "#open-feedback": "feedbackBtnText",
      "#feedback-popup h2": "feedbackPopupTitle", // Если заголовок есть
      'label[for="name-popup"]': "feedbackNameLabel", // Предполагается for="name-popup"
      'label[for="phone-popup"]': "feedbackPhoneLabel",
      'label[for="email-popup"]': "feedbackEmailLabel",
      'label[for="message-popup"]': "feedbackMessageLabel",
      "#submit-btn": "feedbackSubmitBtn",
      "#contacts-header p": "footerAddress", // Адрес
      // ... добавить селекторы для остальных элементов ...
    };

    for (const [selector, key] of Object.entries(elementsToTranslate)) {
      const element = document.querySelector(selector);
      if (element && dict[key]) {
        element.textContent = dict[key];
      }
    }

    // Обновление текста кнопки переключения языка
    const translateButton = document.getElementById("translateButton");
    if (translateButton) {
      translateButton.textContent = lang === "en" ? "RU" : "EN";
    }

    // Для остального текста (менее точный метод)
    /*
  textNodes.forEach(node => {
    const originalText = node.nodeValue;
    // Поиск точного соответствия в словаре
    for (const [original, translated] of Object.entries(dict)) {
      if (originalText.includes(original)) {
        node.nodeValue = originalText.replace(new RegExp(original, 'g'), translated);
        break; // Останавливаемся после первого совпадения, чтобы избежать повторных замен
      }
    }
  });
  */
  }

  // Обработчик клика по кнопке перевода
  document
    .getElementById("translateButton")
    .addEventListener("click", function () {
      const newLanguage = currentLanguage === "ru" ? "en" : "ru";
      const allTextNodes = getTextNodes(document.body);

      // Сохранение состояния формы перед переводом
      const formData = {};
      const formElements = document.querySelectorAll("input, textarea");
      formElements.forEach((el) => {
        if (el.id) {
          // Только если у элемента есть ID
          formData[el.id] = el.value;
        }
      });

      replaceTextWithTranslations(allTextNodes, newLanguage);

      // Восстановление состояния формы после перевода
      Object.keys(formData).forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          el.value = formData[id];
        }
      });

      currentLanguage = newLanguage;
      console.log(`Language switched to: ${currentLanguage}`); // Для отладки
    });

  // --- Конец нового кода ---
});
