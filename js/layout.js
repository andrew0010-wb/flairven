(function () {
  var site = window.FLAIRVEN_SITE;
  if (!site) return;

  var current =
    document.body.dataset.page ||
    window.location.pathname.split("/").pop() ||
    "index.html";

  if (current === "" || current === "/") current = "index.html";

  function isActive(href) {
    return current === href || (current === "index.html" && href === "./");
  }

  function navLinks() {
    var items = [
      '<li><a class="' +
        (current === "index.html" ? "is-active" : "") +
        '" href="index.html">Inicio</a></li>',
    ];

    site.pages.forEach(function (page) {
      if (!page.nav) return;
      var cls = isActive(page.href) ? "is-active" : "";
      items.push(
        '<li><a class="' +
          cls +
          '" href="' +
          page.href +
          '">' +
          page.title +
          "</a></li>"
      );
    });

    return items.join("");
  }

  var headerEl = document.getElementById("site-header");
  if (headerEl) {
    headerEl.innerHTML =
      '<header class="site-header">' +
      '<div class="header-inner">' +
      '<a class="logo" href="index.html">' +
      site.name.slice(0, 5) +
      "<span>" +
      site.name.slice(5) +
      "</span></a>" +
      '<button type="button" class="nav-toggle" aria-expanded="false" aria-controls="main-nav">Menú</button>' +
      '<nav id="main-nav" aria-label="Principal">' +
      '<ul class="nav">' +
      navLinks() +
      "</ul></nav></div></header>";
  }

  var footerNav = site.pages
    .filter(function (p) {
      return p.nav;
    })
    .map(function (p) {
      return '<li><a href="' + p.href + '">' + p.title + "</a></li>";
    })
    .join("");

  var footerEl = document.getElementById("site-footer");
  if (footerEl) {
    footerEl.innerHTML =
      '<footer class="site-footer">' +
      '<div class="footer-grid">' +
      '<div class="footer-brand">' +
      '<p class="footer-logo">' +
      site.name +
      "</p>" +
      "<p>" +
      site.tagline +
      "</p>" +
      "</div>" +
      '<div class="footer-col"><p class="footer-heading">Secciones</p><ul class="footer-links">' +
      footerNav +
      "</ul></div>" +
      '<div class="footer-col"><p class="footer-heading">Contacto</p><ul class="footer-links">' +
      (site.email
        ? '<li><a href="mailto:' +
          site.email +
          '">' +
          site.email +
          "</a></li>"
        : "") +
      (site.phone ? "<li>" + site.phone + "</li>" : "") +
      "</ul></div>" +
      "</div>" +
      '<div class="footer-bottom">' +
      "<span>© <span data-year></span> " +
      site.name +
      ". Todos los derechos reservados.</span>" +
      '<a href="index.html">Volver al inicio</a>' +
      "</div></footer>";
  }

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
