(function () {
  var repoPages = [
    {
      slug: "servicios",
      title: "Servicios",
      href: "servicios.html",
      description: "Automatización, integraciones, IA y mantenimiento de flujos.",
    },
    {
      slug: "nosotros",
      title: "Nosotros",
      href: "nosotros.html",
      description: "Metodología, stack y cómo entregamos proyectos documentados.",
    },
    {
      slug: "portafolio",
      title: "Casos",
      href: "portafolio.html",
      description: "Ejemplos de procesos automatizados y resultados medibles.",
    },
    {
      slug: "contacto",
      title: "Contacto",
      href: "contacto.html",
      description: "Agenda una consultoría gratuita de 30 minutos.",
    },
  ];

  window.FLAIRVEN_SITE = {
    name: "Flairven",
    tagline: "Automatizaciones inteligentes para equipos que quieren escalar sin fricción.",
    email: "hola@flairven.com",
    phone: "",
    ctaLabel: "Consultoría gratis",
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
