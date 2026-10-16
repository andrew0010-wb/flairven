(function () {
  var repoPages = [
    {
      slug: "servicios",
      title: "Servicios",
      href: "servicios.html",
      description: "Automatización, integraciones e IA aplicada.",
    },
    {
      slug: "nosotros",
      title: "Nosotros",
      href: "nosotros.html",
      description: "Metodología y forma de trabajar.",
    },
    {
      slug: "portafolio",
      title: "Casos",
      href: "portafolio.html",
      description: "Resultados en proyectos reales.",
    },
    {
      slug: "contacto",
      title: "Contacto",
      href: "contacto.html",
      description: "Agenda una sesión estratégica.",
    },
  ];

  window.FLAIRVEN_SITE = {
    name: "Flairven",
    tagline:
      "Agencia de automatización. Diseñamos flujos confiables para equipos que necesitan escalar operaciones.",
    email: "hola@flairven.com",
    phone: "",
    ctaLabel: "Agendar sesión",
    ctaHref: "contacto.html",
    pages: repoPages.map(function (page) {
      return {
        slug: page.slug,
        title: page.title,
        href: page.href,
        description: page.description,
        nav: true,
        featured: true,
      };
    }),
  };
})();
