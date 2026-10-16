(function () {
  var repoPages = [
    {
      slug: "servicios",
      title: "Servicios",
      href: "servicios.html",
      description: "Lo que hacemos, explicado sin complicaciones.",
    },
    {
      slug: "nosotros",
      title: "Nosotros",
      href: "nosotros.html",
      description: "Quiénes somos y cómo te tratamos en cada proyecto.",
    },
    {
      slug: "portafolio",
      title: "Casos",
      href: "portafolio.html",
      description: "Historias reales (o de ejemplo) de tiempo recuperado.",
    },
    {
      slug: "contacto",
      title: "Contacto",
      href: "contacto.html",
      description: "Escríbenos — respondemos con cariño y claridad.",
    },
  ];

  window.FLAIRVEN_SITE = {
    name: "Flairven",
    tagline: "Automatizamos lo repetitivo para que recuperes calma y tiempo.",
    email: "hola@flairven.com",
    phone: "",
    ctaLabel: "Hablemos",
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
