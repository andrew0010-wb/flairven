(function () {
  var site = window.FLAIRVEN_SITE;

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");

  function bindNavToggle() {
    toggle = document.querySelector(".nav-toggle");
    nav = document.querySelector(".nav");
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

  var hubGrid = document.getElementById("hub-pages");
  if (hubGrid && site && site.pages) {
    var featured = site.pages.filter(function (p) {
      return p.featured;
    });

    hubGrid.innerHTML = featured
      .map(function (page) {
        return (
          '<a class="hub-card" href="' +
          page.href +
          '">' +
          '<span class="hub-card-label">Sección</span>' +
          "<h3>" +
          page.title +
          "</h3>" +
          "<p>" +
          page.description +
          "</p>" +
          '<span class="hub-card-arrow" aria-hidden="true">→</span>' +
          "</a>"
        );
      })
      .join("");
  }

  var observer = new MutationObserver(function () {
    bindNavToggle();
  });

  var headerRoot = document.getElementById("site-header");
  if (headerRoot) {
    observer.observe(headerRoot, { childList: true, subtree: true });
  }
})();
