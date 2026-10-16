(function () {
  var site = window.FLAIRVEN_SITE;
  if (!site) return;

  var current =
    document.body.dataset.page ||
    window.location.pathname.split("/").pop() ||
    "index.html";
  if (current === "" || current === "/") current = "index.html";

  function navLinks() {
    var html =
      '<li><a class="' +
      (current === "index.html" ? "is-active" : "") +
      '" href="/index.html">Inicio</a></li>';
    site.pages.forEach(function (page) {
      if (!page.nav) return;
      html +=
        '<li><a class="' +
        (current === page.href ? "is-active" : "") +
        '" href="/' +
        page.href +
        '">' +
        page.title +
        "</a></li>";
    });
    return html;
  }

  var header = document.getElementById("site-header");
  if (header) {
    header.innerHTML =
      '<header class="site-header">' +
      '<div class="header-inner">' +
      '<a class="logo" href="/index.html">' +
      site.name.slice(0, 5) +
      "<span>" +
      site.name.slice(5) +
      "</span></a>" +
      '<button type="button" class="nav-toggle" aria-expanded="false">Menú</button>' +
      '<div class="header-actions">' +
      '<nav aria-label="Principal"><ul class="nav">' +
      navLinks() +
      "</ul></nav>" +
      '<a class="btn btn-primary btn-sm header-cta" href="/contacto.html">' +
      (site.ctaLabel || "Contacto") +
      "</a></div></div></header>";
  }

  var footerLinks = site.pages
    .filter(function (p) {
      return p.nav;
    })
    .map(function (p) {
      return '<li><a href="/' + p.href + '">' + p.title + "</a></li>";
    })
    .join("");

  var footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML =
      '<footer class="site-footer">' +
      '<div class="footer-inner">' +
      '<div class="footer-grid">' +
      '<div class="footer-brand">' +
      '<strong class="logo" style="font-size:1.125rem">' +
      site.name +
      "</strong>" +
      "<p>" +
      site.tagline +
      "</p></div>" +
      '<div><p class="footer-title">Empresa</p><ul class="footer-links">' +
      footerLinks +
      "</ul></div>" +
      '<div><p class="footer-title">Contacto</p><ul class="footer-links">' +
      (site.email
        ? '<li><a href="mailto:' + site.email + '">' + site.email + "</a></li>"
        : "") +
      '<li><a href="/contacto.html">' +
      (site.ctaLabel || "Contacto") +
      "</a></li></ul></div></div>" +
      '<div class="footer-bottom"><span>© <span data-year></span> ' +
      site.name +
      "</span><a href=\"/index.html\">Inicio</a></div></div></footer>";
  }

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
