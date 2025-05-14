// LANGUAGE LOADER | RS PROJECT
// This script loads the language file based on the user's selection and updates the page content accordingly.

document.addEventListener("DOMContentLoaded", () => {
  const language = localStorage.getItem("language") || "ar";

  fetch(`../lang/${language}.json`)
    .then((res) => res.json())
    .then((translations) => {
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        const target = el.getAttribute("data-i18n-target");

        if (translations[key]) {
          if (target === "placeholder") {
            el.placeholder = translations[key];
          } else {
            el.innerHTML = translations[key];
          }
        }
      });

      const langSelect = document.getElementById("languageSelect");
      if (langSelect) {
        langSelect.value = language;

        langSelect.addEventListener("change", () => {
          const newLang = langSelect.value;
          localStorage.setItem("language", newLang);
          location.reload(); 
        });
      }

      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = language;
    })
    .catch((err) => {
      console.error("فشل تحميل ملف الترجمة:", err);
    });
});
