(function () {
  function bindNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav");
    if (!toggle || !nav) return;
    toggle.onclick = function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
  bindNav();
  var headerRoot = document.getElementById("site-header");
  if (headerRoot) {
    new MutationObserver(bindNav).observe(headerRoot, { childList: true, subtree: true });
  }

  var header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener(
      "scroll",
      function () {
        header.classList.toggle("is-scrolled", window.scrollY > 8);
      },
      { passive: true }
    );
  }

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var reveals = document.querySelectorAll(".reveal");
    if (reveals.length && "IntersectionObserver" in window) {
      var obs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      reveals.forEach(function (el) {
        obs.observe(el);
      });
    } else {
      reveals.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }

    document.querySelectorAll("[data-count]").forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10);
      if (isNaN(target)) return;
      var suffix = el.getAttribute("data-suffix") || "";
      var prefix = el.getAttribute("data-prefix") || "";
      var done = false;
      var io = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting || done) return;
        done = true;
        var start = performance.now();
        var duration = 3600;
        function tick(now) {
          var p = Math.min((now - start) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = prefix + Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        io.disconnect();
      });
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
    document.querySelectorAll("[data-count]").forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10);
      if (isNaN(target)) return;
      el.textContent =
        (el.getAttribute("data-prefix") || "") +
        target +
        (el.getAttribute("data-suffix") || "");
    });
  }

  var demo = document.getElementById("demo");
  if (demo) {
    var scenarios = {
      ventas: [
        "Alguien deja sus datos",
        "Se ordena si vale la pena llamarlo",
        "Aparece en tu lista de clientes",
        "Tu equipo recibe un aviso",
      ],
      soporte: [
        "Llega un mensaje de un cliente",
        "Se ve qué tan urgente es",
        "Se asigna a la persona correcta",
        "Sale una primera respuesta",
      ],
      ops: [
        "Entra un pedido",
        "Se crea la factura",
        "Se anota en tus cuentas",
        "Te avisamos si algo no cuadra",
      ],
    };
    var nodesEl = demo.querySelector("[data-flow-nodes]");
    var tabs = demo.querySelectorAll("[data-flow-tab]");

    function render(key) {
      var steps = scenarios[key];
      if (!nodesEl || !steps) return;
      nodesEl.innerHTML = steps
        .map(function (text, i) {
          return (
            '<div class="wf-node" style="transition-delay:' +
            i * 0.08 +
            's"><span class="wf-dot"></span><span>' +
            text +
            '</span><span class="wf-tag">Paso ' +
            (i + 1) +
            "</span></div>"
          );
        })
        .join("");
      nodesEl.querySelectorAll(".wf-node").forEach(function (node, idx) {
        setTimeout(function () {
          node.classList.add("is-live");
        }, 60 + idx * 120);
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
        render(tab.getAttribute("data-flow-tab"));
      });
    });
    render("ventas");
  }

  var journey = document.querySelector("[data-journey]");
  if (journey) {
    var journeySteps = [
      {
        title: "Te escuchamos",
        text: "En media hora nos cuentas qué repites cada día. De ahí sale lo que más te conviene automatizar primero.",
      },
      {
        title: "Te decimos el plan",
        text: "Te explicamos qué haremos, en cuánto tiempo y cuánto cuesta. Nada empieza sin que lo apruebes.",
      },
      {
        title: "Lo armamos",
        text: "Lo construimos, lo pruebas con nosotros y te avisamos si en algún momento deja de funcionar.",
      },
      {
        title: "Queda en tus manos",
        text: "El proceso queda en tus cuentas, con una guía corta para que tu equipo sepa usarlo.",
      },
    ];
    var panel = journey.querySelector("[data-journey-panel]");
    var buttons = journey.querySelectorAll("[data-journey-step]");
    function showJourney(index) {
      var step = journeySteps[index];
      buttons.forEach(function (button) {
        var active = button.getAttribute("data-journey-step") === String(index);
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-selected", active ? "true" : "false");
      });
      if (panel && step) {
        panel.innerHTML = "<h3>" + step.title + "</h3><p>" + step.text + "</p>";
      }
    }
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        showJourney(button.getAttribute("data-journey-step"));
      });
    });
    showJourney(0);
  }

  var audience = document.querySelector("[data-audience]");
  if (audience) {
    var profiles = {
      ventas: "Cuando alguien escribe o llena un formulario, su dato llega solo a tu lista y tu equipo recibe el aviso. Nadie se pierde por olvidar copiarlo.",
      soporte: "Los mensajes se ordenan por urgencia y llegan a la persona correcta, con una primera respuesta lista para revisar.",
      finanzas: "El pedido, la factura y el registro de cuentas se actualizan juntos. Si algo no coincide, te llega una alerta.",
    };
    var audiencePanel = audience.querySelector("[data-audience-panel]");
    var audienceButtons = audience.querySelectorAll("[data-audience-key]");
    function showProfile(key) {
      audienceButtons.forEach(function (button) {
        var active = button.getAttribute("data-audience-key") === key;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });
      if (audiencePanel) audiencePanel.textContent = profiles[key] || "";
    }
    audienceButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        showProfile(button.getAttribute("data-audience-key"));
      });
    });
    showProfile("ventas");
  }

  document.querySelectorAll("[data-faq-trigger]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var open = item.classList.contains("is-open");
      document.querySelectorAll(".faq-item.is-open").forEach(function (i) {
        i.classList.remove("is-open");
        var trigger = i.querySelector("[data-faq-trigger]");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      });
      if (!open) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  function escapeText(value) {
    return String(value || "").replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[char];
    });
  }

  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      if (String(data.get("_honey") || "").trim()) return;
      var emailTo = form.getAttribute("data-email") || "hola@flairven.com";
      var payload = {
        name: data.get("name"),
        email: data.get("email"),
        company: data.get("company") || "No indicó",
        topic: data.get("topic"),
        message: data.get("message"),
        _subject: "Charla Flairven — " + (data.get("company") || data.get("name") || "Nuevo contacto"),
        _template: "table",
        _captcha: "false",
      };
      var hint = form.querySelector(".form-hint");
      var button = form.querySelector("button[type=submit]");
      if (button) button.disabled = true;
      if (hint) hint.textContent = "Enviando tu mensaje…";

      function openMail() {
        var subject = encodeURIComponent(payload._subject);
        var body = encodeURIComponent(
          "Nombre: " + payload.name +
            "\nEmpresa: " + payload.company +
            "\nEmail: " + payload.email +
            "\nÁrea: " + payload.topic +
            "\n\nMensaje:\n" + payload.message
        );
        if (button) button.disabled = false;
        if (hint) hint.textContent = "No pudimos enviarlo desde la página. Se abre tu correo para que lo mandes tú.";
        window.location.href = "mailto:" + emailTo + "?subject=" + subject + "&body=" + body;
      }

      fetch("https://formsubmit.co/ajax/" + emailTo, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then(function (res) {
          if (!res.ok) throw new Error("fail");
          return res.json();
        })
        .then(function () {
          form.innerHTML =
            '<div class="form-success"><h3>Listo. Ya nos llegó.</h3><p>Te respondemos en menos de un día hábil a ' +
            escapeText(payload.email) +
            ".</p></div>";
        })
        .catch(openMail);
    });
  }
})();
