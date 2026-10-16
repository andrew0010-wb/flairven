(function () {
  var repoPages = [
    {
      slug: "servicios",
      title: "Servicios",
      href: "servicios.html",
      description: "Tareas que se hacen solas, con precios a la vista.",
    },
    {
      slug: "nosotros",
      title: "Nosotros",
      href: "nosotros.html",
      description: "Cómo trabajamos y qué queda en tus manos.",
    },
    {
      slug: "portafolio",
      title: "Ejemplos",
      href: "portafolio.html",
      description: "Así se vería el cambio, sin clientes inventados.",
    },
    {
      slug: "contacto",
      title: "Contacto",
      href: "contacto.html",
      description: "Charla de 30 minutos, sin costo.",
    },
  ];

  window.FLAIRVEN_SITE = {
    name: "Flairven",
    tagline:
      "Hacemos que las tareas repetidas de tu negocio se hagan solas, sin que tengas que aprender tecnología.",
    email: "hola@flairven.com",
    phone: "",
    ctaLabel: "Charla gratis",
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
