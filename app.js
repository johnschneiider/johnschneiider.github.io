(function () {
  var STORAGE_KEY = "jsj-lang";
  var btn = document.getElementById("langBtn");

  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-en]").forEach(function (el) {
      var txt = el.getAttribute("data-" + lang);
      if (txt !== null) el.textContent = txt;
    });
    if (btn) btn.textContent = lang === "en" ? "ES" : "EN";
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  apply(saved === "es" ? "es" : "en");

  if (btn) {
    btn.addEventListener("click", function () {
      apply(document.documentElement.lang === "en" ? "es" : "en");
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
  if ("IntersectionObserver" in window && links.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        links.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + id);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll("section[id]").forEach(function (s) { obs.observe(s); });
  }
})();
