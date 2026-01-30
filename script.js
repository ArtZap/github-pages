document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("main-nav");
  const navMenu = document.querySelector("nav ul");

  hamburger.addEventListener("click", function () {
    navMenu.classList.toggle("open");
    hamburger.classList.toggle("active");
  });

  /* Р¤РѕСЂРјР° РѕР±СЂР°С‚РЅРѕР№ СЃРІСЏР·Рё */
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
    if (field.name === "message")
      return /^[A-Za-zРђ-РЇР°-СЏ0-9\s.,!?]+$/.test(val);
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
    submitBtn.textContent = "РћС‚РїСЂР°РІР»СЏРµРј...";
    submitBtn.disabled = true;

    fetch(form.action, { method: "POST", body: new FormData(form) })
      .then((res) => {
        if (res.ok) {
          submitBtn.classList.remove("sending");
          submitBtn.classList.add("success");
          submitBtn.textContent = "РЈСЃРїРµС€РЅРѕ РѕС‚РїСЂР°РІР»РµРЅРѕ";
        } else throw new Error("РћС€РёР±РєР°");
      })
      .catch(() => {
        submitBtn.classList.remove("sending");
        submitBtn.textContent = "РћС€РёР±РєР° РѕС‚РїСЂР°РІРєРё";
        submitBtn.disabled = false;
      });
  });
  /* РђРЅРёРјР°С†РёСЏ SVG */
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
