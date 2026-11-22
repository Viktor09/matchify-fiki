(function () {
  "use strict";

  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("site-menu");
  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });
    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      menu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }));
  }

  const messages = {
    candidate: "You should not need 40 open tabs to find one good opportunity. Matchify gives you signal, context and a next step.",
    team: "You should not need to scan 100 CVs to find three people worth meeting. Matchify gives your team context, confidence and a shortlist."
  };
  const message = document.getElementById("persona-message");
  document.querySelectorAll("[data-persona]").forEach((tab) => tab.addEventListener("click", () => {
    document.querySelectorAll("[data-persona]").forEach((item) => {
      const active = item === tab;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });
    if (message) message.textContent = messages[tab.dataset.persona];
  }));

  /* ------------------------------------------------------------------
     M5 · Analytics helper
     On the published site events go to PostHog; locally they are only
     logged, so testing does not pollute the campaign data.
     Funnel: $pageview → waitlist_opened → waitlist_submitted
  ------------------------------------------------------------------ */
  function track(event, props) {
    const payload = Object.assign({}, utm, props || {}); // every event carries its channel
    if (window.MATCHIFY_ANALYTICS && window.posthog && typeof window.posthog.capture === "function") {
      window.posthog.capture(event, payload);
    } else {
      console.debug("[analytics:local]", event, payload);
    }
  }

  /* Campaign attribution: keep the first UTM parameters seen in this tab,
     so a lead is credited to the channel that brought the visitor. */
  const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];
  function readUtm() {
    const params = new URLSearchParams(location.search);
    const fromUrl = {};
    UTM_KEYS.forEach((key) => { if (params.get(key)) fromUrl[key] = params.get(key).slice(0, 80); });
    let stored = {};
    try { stored = JSON.parse(sessionStorage.getItem("matchify_utm") || "{}"); } catch (e) { stored = {}; }
    if (Object.keys(fromUrl).length && !Object.keys(stored).length) {
      try { sessionStorage.setItem("matchify_utm", JSON.stringify(fromUrl)); } catch (e) { /* storage blocked */ }
      return fromUrl;
    }
    return Object.keys(stored).length ? stored : fromUrl;
  }
  const utm = readUtm();

  // Clicks on calls to action that only scroll (the dialog openers are tracked below).
  document.querySelectorAll("[data-cta]:not([data-join])").forEach((link) => link.addEventListener("click", () => {
    track("cta_clicked", { location: link.dataset.cta });
  }));

  /* ------------------------------------------------------------------
     M5 · Waitlist / newsletter dialog → Formspree
  ------------------------------------------------------------------ */
  const dialog = document.getElementById("join-dialog");
  const title = document.getElementById("dialog-title");
  const form = document.getElementById("join-form");
  const formView = document.getElementById("join-form-view");
  const success = document.getElementById("join-success");
  const errorBox = document.getElementById("join-error");
  const submitButton = document.getElementById("join-submit");
  const roleInput = document.getElementById("join-role");
  const ctaInput = document.getElementById("join-cta");
  const subjectInput = document.getElementById("join-subject");
  let currentRole = "candidate";

  function fillUtm() {
    if (form) UTM_KEYS.forEach((key) => { if (form.elements[key]) form.elements[key].value = utm[key] || ""; });
  }
  fillUtm();

  function showError(text) {
    if (!errorBox) return;
    errorBox.textContent = text;
    errorBox.hidden = !text;
  }

  function openDialog(role, cta) {
    currentRole = role === "team" ? "team" : "candidate";
    if (title) title.textContent = currentRole === "team" ? "Join the hiring team list" : "Join the candidate waitlist";
    if (roleInput) roleInput.value = currentRole;
    if (ctaInput) ctaInput.value = cta || "";
    if (subjectInput) subjectInput.value = "New Matchify waitlist signup (" + currentRole + ")";
    if (formView) formView.hidden = false;
    if (success) success.hidden = true;
    showError("");
    track("waitlist_opened", { role: currentRole, location: cta || "unknown" });
    if (dialog && typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      location.hash = "#join"; // very old browsers: no <dialog>, fall back to the section
    }
  }

  document.querySelectorAll("[data-join]").forEach((trigger) => trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openDialog(trigger.dataset.join, trigger.dataset.cta);
  }));

  if (dialog) {
    dialog.querySelectorAll(".dialog-close, [data-close]").forEach((button) => button.addEventListener("click", () => dialog.close()));
    dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); }); // click on backdrop
  }

  if (form) form.addEventListener("submit", async (event) => {
    event.preventDefault();
    showError("");
    const email = form.elements.email;
    const consent = form.elements.newsletter_consent;
    if (!email.value.trim() || !email.checkValidity()) {
      showError("Please enter a valid email address.");
      email.focus();
      return;
    }
    if (!consent.checked) {
      showError("Please tick the box so we can email you updates.");
      consent.focus();
      return;
    }

    submitButton.disabled = true;
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      if (!response.ok) throw new Error("HTTP " + response.status);
      // The email itself is never sent to analytics, only the role and the channel.
      track("waitlist_submitted", { role: currentRole, location: ctaInput ? ctaInput.value : "", utm_source: utm.utm_source || "direct" });
      const lastCta = ctaInput ? ctaInput.value : "";
      form.reset(); // also clears the hidden fields, so restore them for a second signup
      fillUtm();
      if (roleInput) roleInput.value = currentRole;
      if (ctaInput) ctaInput.value = lastCta;
      if (formView) formView.hidden = true;
      if (success) {
        success.hidden = false;
        const heading = success.querySelector("h2");
        if (heading) heading.focus();
      }
    } catch (err) {
      track("waitlist_failed", { role: currentRole, reason: String(err && err.message || err) });
      showError("Something went wrong. Please try again in a moment.");
    } finally {
      submitButton.disabled = false;
    }
  });
})();
