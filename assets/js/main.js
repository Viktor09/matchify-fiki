/*
  Matchify Fiki — page behaviour.
  1. Mobile navigation toggle
  2. Scroll-spy: highlight the nav link of the section in view
  3. Gentle reveal-on-scroll (skipped when the user prefers reduced motion)
  4. Concept demo: swipe-style job discovery with an explainable match estimate
  Everything here is progressive enhancement: the page reads fine without JS.
*/

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Mobile navigation ---------- */
  const menuButton = document.getElementById("menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      mobileMenu.hidden = open;
    });
    mobileMenu.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        menuButton.setAttribute("aria-expanded", "false");
        mobileMenu.hidden = true;
      })
    );
  }

  /* ---------- 2. Scroll-spy ---------- */
  const navLinks = Array.from(document.querySelectorAll("[data-nav] a[href^='#']"));
  const sectionsById = new Map();
  navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) sectionsById.set(section.id, section);
  });

  if ("IntersectionObserver" in window && sectionsById.size) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            const active = link.getAttribute("href") === "#" + entry.target.id;
            link.setAttribute("aria-current", active ? "true" : "false");
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sectionsById.forEach((section) => spy.observe(section));
  }

  /* ---------- 3. Reveal on scroll ---------- */
  const revealables = document.querySelectorAll("[data-reveal]");
  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const reveal = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealables.forEach((el) => {
      el.classList.add("reveal");
      reveal.observe(el);
    });
  }

  /* ---------- 4. Concept demo ---------- */

  // Illustrative data only. Companies are fictional; this is not a working platform.
  const candidate = {
    label: "Demo candidate — 3rd-year CS student",
    skills: ["Python", "C", "SQL", "Git", "Linux", "Docker", "REST APIs"],
    level: "Intern / Junior",
    prefers: ["Backend", "Data", "Hybrid", "Bucharest"],
  };

  const jobs = [
    {
      title: "Backend Engineering Intern",
      company: "Example Company A (fictional)",
      meta: ["Bucharest", "Hybrid", "Internship"],
      track: "Backend",
      required: ["Python", "SQL", "Git", "REST APIs", "Docker", "Unit testing"],
      level: "Intern / Junior",
      recruiterInterested: true,
      prepTopics: ["HTTP & REST design", "SQL joins and indexing", "Unit testing in Python"],
    },
    {
      title: "Junior Data Engineer",
      company: "Example Company B (fictional)",
      meta: ["Bucharest", "On-site", "Full-time"],
      track: "Data",
      required: ["Python", "SQL", "Apache Spark", "Airflow", "Linux"],
      level: "Intern / Junior",
      recruiterInterested: false,
      prepTopics: [],
    },
    {
      title: "Embedded Software Intern",
      company: "Example Company C (fictional)",
      meta: ["Cluj-Napoca", "On-site", "Internship"],
      track: "Embedded",
      required: ["C", "Linux", "RTOS", "Embedded C", "Git"],
      level: "Intern / Junior",
      recruiterInterested: true,
      prepTopics: ["Pointers & memory in C", "Interrupts and RTOS basics", "Linux tooling"],
    },
    {
      title: "Cloud / DevOps Engineer",
      company: "Example Company D (fictional)",
      meta: ["Remote", "Full-time"],
      track: "DevOps",
      required: ["Kubernetes", "Terraform", "Docker", "Linux", "AWS"],
      level: "Mid-level",
      recruiterInterested: false,
      prepTopics: [],
    },
  ];

  // Transparent, deliberately simple weights. Shown to the user next to the score.
  const WEIGHTS = { skills: 0.6, level: 0.25, prefs: 0.15 };

  function explain(job) {
    const have = job.required.filter((s) => candidate.skills.includes(s));
    const missing = job.required.filter((s) => !candidate.skills.includes(s));
    const skills = have.length / job.required.length;
    const level = job.level === candidate.level ? 1 : 0.3;
    const prefHits = [job.track, ...job.meta].filter((p) => candidate.prefers.includes(p)).length;
    const prefs = Math.min(prefHits / 2, 1);
    const score = Math.round(100 * (WEIGHTS.skills * skills + WEIGHTS.level * level + WEIGHTS.prefs * prefs));
    return { have, missing, skills, level, prefs, score };
  }

  const stage = document.getElementById("demo-stage");
  const passBtn = document.getElementById("demo-pass");
  const likeBtn = document.getElementById("demo-like");
  const resetBtn = document.getElementById("demo-reset");
  const status = document.getElementById("demo-status");
  const log = document.getElementById("demo-log");

  if (!stage || !passBtn || !likeBtn) return;

  let index = 0;

  const pct = (x) => Math.round(x * 100) + "%";
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function cardHTML(job) {
    const e = explain(job);
    const chips = (list, cls) => list.map((s) => `<span class="skill-chip ${cls}">${esc(s)}</span>`).join(" ");
    const tip = e.missing.length
      ? `Learning <strong>${esc(e.missing[0])}</strong> would raise the skills component the most for roles like this.`
      : "You cover every listed skill. Prep would focus on depth, not new topics.";
    return `
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-xs font-medium text-slate-500">${esc(job.company)}</p>
          <h4 class="mt-1 font-display text-xl font-bold leading-tight">${esc(job.title)}</h4>
          <p class="mt-1 text-xs text-slate-500">${job.meta.map(esc).join(" · ")} · ${esc(job.level)}</p>
        </div>
        <div class="text-right shrink-0">
          <p class="font-display text-3xl font-bold text-[var(--brand)]">${e.score}<span class="text-base">%</span></p>
          <p class="text-[0.65rem] uppercase tracking-wider text-slate-500">match estimate</p>
        </div>
      </div>

      <div class="mt-5 space-y-2.5 text-xs">
        <div>
          <div class="flex justify-between"><span>Skills coverage <span class="text-slate-400">(weight ${pct(WEIGHTS.skills)})</span></span><span class="font-semibold">${pct(e.skills)}</span></div>
          <div class="meter mt-1"><span style="width:${pct(e.skills)}"></span></div>
        </div>
        <div>
          <div class="flex justify-between"><span>Experience level <span class="text-slate-400">(weight ${pct(WEIGHTS.level)})</span></span><span class="font-semibold">${pct(e.level)}</span></div>
          <div class="meter mt-1"><span style="width:${pct(e.level)}"></span></div>
        </div>
        <div>
          <div class="flex justify-between"><span>Preferences <span class="text-slate-400">(weight ${pct(WEIGHTS.prefs)})</span></span><span class="font-semibold">${pct(e.prefs)}</span></div>
          <div class="meter mt-1"><span style="width:${pct(e.prefs)}"></span></div>
        </div>
      </div>

      <div class="mt-5">
        <p class="text-xs font-semibold text-slate-600">Why this score</p>
        <div class="mt-2 flex flex-wrap gap-1.5">${chips(e.have, "skill-have")} ${chips(e.missing, "skill-miss")}</div>
      </div>

      <p class="mt-auto rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
        <span class="font-semibold text-slate-800">Skill tip:</span> ${tip}
      </p>`;
  }

  function render() {
    stage.innerHTML = "";
    jobs.forEach((job, i) => {
      const depth = i - index;
      if (depth < 0) return;
      const card = document.createElement("article");
      card.className = "job-card";
      card.dataset.depth = String(Math.min(depth, 3));
      card.setAttribute("aria-hidden", depth === 0 ? "false" : "true");
      card.style.zIndex = String(jobs.length - i);
      card.innerHTML = cardHTML(job);
      stage.appendChild(card);
    });

    const done = index >= jobs.length;
    passBtn.disabled = likeBtn.disabled = done;
    passBtn.classList.toggle("opacity-40", done);
    likeBtn.classList.toggle("opacity-40", done);

    if (done) {
      stage.innerHTML = `
        <div class="job-card items-center justify-center text-center" data-depth="0">
          <p class="font-display text-xl font-bold">That's the whole demo deck.</p>
          <p class="mt-2 max-w-xs text-sm text-slate-600">In the proposed product, your passes and likes would refine future recommendations and update your private skill roadmap.</p>
        </div>`;
    }
  }

  function addLog(html, tone) {
    const item = document.createElement("li");
    item.className = "flex gap-2 rounded-xl border p-3 text-xs leading-relaxed " +
      (tone === "match" ? "border-rose-200 bg-rose-50" : tone === "save" ? "border-indigo-200 bg-indigo-50" : "border-slate-200 bg-white");
    item.innerHTML = html;
    log.prepend(item);
  }

  function decide(liked) {
    if (index >= jobs.length) return;
    const job = jobs[index];
    const top = stage.querySelector('.job-card[data-depth="0"]');
    if (top) top.classList.add(liked ? "out-right" : "out-left");

    if (!liked) {
      addLog(`<span aria-hidden="true">↩</span><span><strong>Passed:</strong> ${esc(job.title)}. Signal used to tune future recommendations.</span>`);
      status.textContent = `Passed on ${job.title}.`;
    } else if (job.recruiterInterested) {
      addLog(`<span aria-hidden="true">♥</span><span><strong>Mutual match:</strong> ${esc(job.title)}. The recruiter also shortlisted this profile, so the candidate enters the pipeline and a <strong>prep plan unlocks</strong>: ${job.prepTopics.map(esc).join(", ")}.</span>`, "match");
      status.textContent = `Mutual match with ${job.title}. Preparation plan unlocked.`;
    } else {
      addLog(`<span aria-hidden="true">★</span><span><strong>Interested:</strong> ${esc(job.title)}. Sent to the recruiter's review queue; nothing unlocks until they respond.</span>`, "save");
      status.textContent = `Marked interest in ${job.title}. Waiting for recruiter review.`;
    }

    index += 1;
    window.setTimeout(render, prefersReducedMotion ? 0 : 380);
  }

  passBtn.addEventListener("click", () => decide(false));
  likeBtn.addEventListener("click", () => decide(true));
  resetBtn.addEventListener("click", () => {
    index = 0;
    log.innerHTML = "";
    status.textContent = "Demo reset.";
    render();
  });

  // Arrow keys work while focus is inside the demo
  document.getElementById("demo")?.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); decide(false); }
    if (e.key === "ArrowRight") { e.preventDefault(); decide(true); }
  });

  const profile = document.getElementById("demo-profile");
  if (profile) {
    profile.innerHTML = candidate.skills.map((s) => `<span class="skill-chip bg-white">${esc(s)}</span>`).join(" ");
  }

  render();
})();
