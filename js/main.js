(function () {
  function bindNavToggle() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      nav.classList.toggle("is-open");
      var open = nav.classList.contains("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  bindNavToggle();

  var headerRoot = document.getElementById("site-header");
  if (headerRoot) {
    new MutationObserver(bindNavToggle).observe(headerRoot, {
      childList: true,
      subtree: true,
    });
  }

  document.querySelectorAll("[data-faq-trigger]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var subject = encodeURIComponent(
        "Consultoría Flairven — " + (data.get("company") || "Nuevo lead")
      );
      var body = encodeURIComponent(
        "Nombre: " +
          data.get("name") +
          "\nEmpresa: " +
          data.get("company") +
          "\nEmail: " +
          data.get("email") +
          "\n\nMensaje:\n" +
          data.get("message")
      );
      var mail = form.getAttribute("data-email") || "hola@flairven.com";
      window.location.href =
        "mailto:" + mail + "?subject=" + subject + "&body=" + body;
    });
  }
})();
