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

  var header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener(
      "scroll",
      function () {
        header.classList.toggle("is-scrolled", window.scrollY > 24);
      },
      { passive: true }
    );
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion) {
    var revealEls = document.querySelectorAll(".reveal");
    if (revealEls.length && "IntersectionObserver" in window) {
      var revealObs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach(function (el) {
        revealObs.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }

    document.querySelectorAll("[data-count]").forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10);
      if (isNaN(target)) return;
      var suffix = el.getAttribute("data-suffix") || "";
      var prefix = el.getAttribute("data-prefix") || "";

      function animateCount() {
        var start = 0;
        var duration = 1400;
        var startTime = null;
        function step(ts) {
          if (!startTime) startTime = ts;
          var p = Math.min((ts - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = prefix + Math.round(start + (target - start) * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }

      if ("IntersectionObserver" in window) {
        var countObs = new IntersectionObserver(
          function (entries) {
            if (entries[0].isIntersecting) {
              animateCount();
              countObs.disconnect();
            }
          },
          { threshold: 0.5 }
        );
        countObs.observe(el);
      } else {
        el.textContent = prefix + target + suffix;
      }
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  var demo = document.getElementById("flow-demo");
  if (demo) {
    var scenarios = {
      ventas: {
        label: "lead_pipeline",
        nodes: [
          { t: "Formulario · lead entrante", tag: "webhook" },
          { t: "Scoring con IA", tag: "gpt-4" },
          { t: "Deal en HubSpot", tag: "crm" },
          { t: "Slack al closer", tag: "notify" },
        ],
      },
      soporte: {
        label: "ticket_triage",
        nodes: [
          { t: "Email / chat entrante", tag: "inbox" },
          { t: "Clasificar urgencia", tag: "ai" },
          { t: "Asignar agente", tag: "helpdesk" },
          { t: "SLA + respuesta base", tag: "auto" },
        ],
      },
      ops: {
        label: "invoice_sync",
        nodes: [
          { t: "Pedido confirmado", tag: "shop" },
          { t: "Factura PDF", tag: "drive" },
          { t: "Contabilidad", tag: "sheets" },
          { t: "Alerta si falla", tag: "retry" },
        ],
      },
    };

    var labelEl = demo.querySelector("[data-flow-label]");
    var nodesEl = demo.querySelector("[data-flow-nodes]");
    var tabs = demo.querySelectorAll("[data-flow-tab]");

    function renderScenario(key) {
      var s = scenarios[key];
      if (!s || !nodesEl) return;
      if (labelEl) labelEl.textContent = "workflow · " + s.label;
      nodesEl.innerHTML = s.nodes
        .map(function (node, i) {
          return (
            '<div class="wf-node" data-step="' +
            i +
            '" style="--delay:' +
            i * 0.12 +
            's"><span class="wf-dot"></span><span class="wf-text">' +
            node.t +
            '</span><span class="mono">' +
            node.tag +
            "</span></div>" +
            (i < s.nodes.length - 1 ? '<div class="wf-connector active"></div>' : "")
          );
        })
        .join("");
      nodesEl.querySelectorAll(".wf-node").forEach(function (node, idx) {
        setTimeout(function () {
          node.classList.add("is-live");
        }, 80 + idx * 180);
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) {
          t.classList.remove("is-active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");
        renderScenario(tab.getAttribute("data-flow-tab"));
      });
    });

    renderScenario("ventas");
  }

  document.querySelectorAll(".bento-card").forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", x + "%");
      card.style.setProperty("--my", y + "%");
    });
  });

  document.querySelectorAll("[data-faq-trigger]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var wasOpen = item.classList.contains("is-open");
      document.querySelectorAll(".faq-item.is-open").forEach(function (open) {
        open.classList.remove("is-open");
        var t = open.querySelector("[data-faq-trigger]");
        if (t) t.setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
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
