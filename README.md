# Matchify — Software Engineering Fiki

The Fiki (fancy wiki) for **Matchify**, our Software Engineering project at POLITEHNICA Bucharest (ACS), 2026–2027.
It is a single page that documents the project at each milestone. It is **not** the product's landing page.

## Structure

```
matchify-fiki/
├── index.html              ← all page content, one <section> per topic
├── assets/
│   ├── css/styles.css      ← design tokens, cards, demo, roadmap styles
│   ├── js/main.js          ← mobile menu, scroll-spy, reveal, concept demo
│   └── img/team/           ← team photos (see the README in that folder)
├── .nojekyll               ← tells GitHub Pages to serve the files as they are
└── README.md
```

Stack: plain HTML5 + CSS3 + JavaScript, with Tailwind CSS loaded from a CDN (the same setup as Lab 01).
There is no build step, no backend and no dependencies to install.

## Run locally

Opening `index.html` directly in a browser works. To test it exactly as GitHub Pages will serve it, start a small local server:

```bash
cd matchify-fiki
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy on GitHub Pages

1. Create a GitHub repository (for example `matchify-fiki`). Public repositories get Pages for free.
2. Upload the contents of this folder to the repository root (`index.html` must be at the top level):
   ```bash
   cd matchify-fiki
   git init
   git add .
   git commit -m "M1: Fiki and project description"
   git branch -M main
   git remote add origin https://github.com/<user>/matchify-fiki.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**, choose **Deploy from a branch**, select branch `main` and folder `/ (root)`, then save.
4. After a minute or two the Fiki is live at `https://<user>.github.io/matchify-fiki/`.

Note: the Tailwind browser build is convenient for a course project but is not intended for high-traffic production sites.
If that ever matters, replace it with the Tailwind CLI build.

## M1 requirement checklist

| # | Official M1 requirement | Where on the page |
|---|---|---|
| 1 | Project title | Hero (`#project-title`) |
| 2 | Team and roles, with photos and emails | `#team`: member cards and responsibility matrix |
| 3 | Problem description | `#problem` |
| 4 | Solution / value proposition | `#solution`, plus the workflow and concept demo in `#how` |
| 5 | Customer segments | `#segments` (users vs. paying customers) |
| 6 | Competition | `#competition`: competitor groups, comparison matrix, sources |
| 7 | Advantage over the competition | `#advantage` |
| 8 | Key metrics | `#metrics` |
| 9 | Cost structure | `#costs` |
| 10 | Revenue streams | `#revenue` |
| — | Fiki is one page and looks good | Single `index.html`; responsive layout |
| — | Not confused with the landing page | Notice in the hero and footer; the landing page is planned for M3 |

The hero also contains a clickable index of these ten requirements.

## Still to complete manually

- [x] **Team photos**: added in `assets/img/team/`.
- [ ] **Confirm the team roles**: the assignments are a proposal, marked "Proposed" on the page. Edit the role pills in each team card and the matrix table.
- [ ] Remove the "Proposed" labels from the roles once confirmed.
- [ ] Check each member's description sentence under their roles.
- [ ] Optionally add a link to the project's GitHub repository in the footer.
- [ ] Re-check competitor facts before the final presentation (researched on 18.10.2026).
- [ ] Submit the Fiki link through the official M1 submission form.

## Updating for future milestones

- **New milestone content**: add a new `<section id="m2-validation">` (for example) before the roadmap, following the existing comment banners, and add its link to both navigation lists at the top of `index.html`.
- **Roadmap**: in `#roadmap`, change the finished milestone's pill from "Current" to "Done", move the `open` attribute and the "Current" pill to the next milestone, and summarise the work inside its `<details>` with a link to the new section.
- **After validation (M2)**: update the problem section ("Problem hypotheses") with what was confirmed or rejected, and the early-adopter note in `#segments`.
- **Metrics**: when real data exists, add a "Measured" column to the metrics table and keep the "Proposed" label for anything that is still not measured.
- **Footer**: update "Last updated" each time.
- **Concept demo**: the demo data is at the top of section 4 in `assets/js/main.js` (`candidate`, `jobs`, `WEIGHTS`).
