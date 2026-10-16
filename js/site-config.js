/**
 * Páginas del repositorio (raíz del proyecto):
 * index.html → inicio (no se lista aquí)
 * nosotros.html, servicios.html, portafolio.html, contacto.html
 *
 * Al añadir un nuevo .html al repo, agrega una entrada en repoPages.
 */
(function () {
  var repoPages = [
    {
      slug: "nosotros",
      title: "Nosotros",
      href: "nosotros.html",
      description: "Historia, misión y el equipo detrás de Flairven.",
    },
    {
      slug: "servicios",
      title: "Servicios",
      href: "servicios.html",
      description: "Catálogo de servicios y propuesta de valor.",
    },
    {
      slug: "portafolio",
      title: "Portafolio",
      href: "portafolio.html",
      description: "Proyectos, casos de éxito y trabajos recientes.",
    },
    {
      slug: "contacto",
      title: "Contacto",
      href: "contacto.html",
      description: "Canales directos para cotizaciones y soporte.",
    },
  ];

  window.FLAIRVEN_SITE = {
    name: "Flairven",
    tagline: "Soluciones con estándares profesionales",
    email: "hola@flairven.com",
    phone: "",
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
