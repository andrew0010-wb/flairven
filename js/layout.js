(function () {
  var site = window.FLAIRVEN_SITE;
  if (!site) return;

  var current =
    document.body.dataset.page ||
    window.location.pathname.split("/").pop() ||
    "index.html";

  if (current === "" || current === "/") current = "index.html";

  function isActive(href) {
    return current === href;
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

  var ctaHref = site.ctaHref || "contacto.html";
  var ctaLabel = site.ctaLabel || "Contacto";

  var headerEl = document.getElementById("site-header");
  if (headerEl) {
    headerEl.innerHTML =
      '<header class="site-header">' +
      '<div class="header-inner">' +
      '<a class="logo" href="index.html" aria-label="' +
      site.name +
      ' inicio">' +
      site.name.slice(0, 5) +
      "<span>" +
      site.name.slice(5) +
      "</span></a>" +
      '<button type="button" class="nav-toggle" aria-expanded="false" aria-controls="main-nav">Menú</button>' +
      '<div class="header-actions">' +
      '<nav id="main-nav" aria-label="Principal">' +
      '<ul class="nav">' +
      navLinks() +
      "</ul></nav>" +
      '<a class="btn btn-primary btn-sm header-cta" href="' +
      ctaHref +
      '">' +
      ctaLabel +
      "</a></div></div></header>";
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
      '<p class="footer-stack">n8n · Make · Zapier · APIs · IA</p>' +
      "</div>" +
      '<div class="footer-col"><p class="footer-heading">Empresa</p><ul class="footer-links">' +
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
      '<li><a href="' +
      ctaHref +
      '">' +
      ctaLabel +
      "</a></li>" +
      "</ul></div>" +
      "</div>" +
      '<div class="footer-bottom">' +
      "<span>© <span data-year></span> " +
      site.name +
      ". Automatización con entrega documentada.</span>" +
      '<a href="index.html">Inicio</a>' +
      "</div></footer>";
  }

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
