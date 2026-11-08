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

  const dialog = document.getElementById("join-dialog");
  const title = document.getElementById("dialog-title");
  document.querySelectorAll("[data-join]").forEach((button) => button.addEventListener("click", () => {
    if (title) title.textContent = button.dataset.join === "team" ? "Join the hiring team list" : "Join the candidate waitlist";
    if (dialog && typeof dialog.showModal === "function") dialog.showModal();
  }));
  const close = document.querySelector(".dialog-close");
  if (close && dialog) close.addEventListener("click", () => dialog.close());
})();
