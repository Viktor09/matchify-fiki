# M5 — Lead generation campaign kit

Internal working doc for the team. The public write-up is the `#m5` section of the Fiki (`index.html`).

Landing page: https://viktor09.github.io/matchify-fiki/landing.html
Deadline: **26.11.2026**. Post everything by **23–24.11** so there are at least two days of data.

---

## 0. Before posting (one time)

- [ ] The `feat/M5-lead-generation` branch is merged into `main` and GitHub Pages shows the new landing page
      (open the landing page, click "Join as a candidate": the form must have the consent checkbox).
- [ ] **Formspree test**: submit the form once with your own email. Formspree sends the form owner an email
      to confirm the form. Click the confirmation link, otherwise later submissions are not delivered.
- [ ] **PostHog test**: open the landing page, then in PostHog → Activity you should see a `$pageview`
      within a minute. Open the dialog and you should see `waitlist_opened`.
- [ ] Delete the test submission in Formspree (and note it, so it is not counted as a lead).

## 1. Channels and links

**Always post the link from this table, never the bare landing URL.** The `utm_*` part is how PostHog
and Formspree know which channel a visitor or lead came from. Without it the channel comparison is impossible.

| # | Channel | Where exactly | Language | Link to post |
|---|---|---|---|---|
| 1 | Facebook — student groups | ACS / UPB student groups (year groups, faculty groups) | RO | https://viktor09.github.io/matchify-fiki/landing.html?utm_source=facebook&utm_medium=social&utm_campaign=m5_waitlist&utm_content=fb-students |
| 2 | Facebook — IT jobs / internships groups | Romanian IT jobs, internships and junior developer groups | RO | https://viktor09.github.io/matchify-fiki/landing.html?utm_source=facebook&utm_medium=social&utm_campaign=m5_waitlist&utm_content=fb-it-jobs |
| 3 | Reddit — r/programare | Romanian programming community | RO | https://viktor09.github.io/matchify-fiki/landing.html?utm_source=reddit&utm_medium=social&utm_campaign=m5_waitlist&utm_content=r-programare |
| 4 | Reddit — r/SideProject | International, allows sharing your own project | EN | https://viktor09.github.io/matchify-fiki/landing.html?utm_source=reddit&utm_medium=social&utm_campaign=m5_waitlist&utm_content=r-sideproject |
| 5 | LinkedIn | A post from each team member's own profile (reaches recruiters and engineers) | EN | https://viktor09.github.io/matchify-fiki/landing.html?utm_source=linkedin&utm_medium=social&utm_campaign=m5_waitlist&utm_content=linkedin-post |
| 6 | Chat groups | WhatsApp / Discord groups of your year and series | RO | https://viktor09.github.io/matchify-fiki/landing.html?utm_source=chat&utm_medium=social&utm_campaign=m5_waitlist&utm_content=chat-groups |

Notes:
- Facebook groups often need admin approval: post in 3–4 groups per row, early, and keep the ones that get approved.
- Read each subreddit's rules before posting. Some ban self-promotion or new accounts. Use the "student project /
  feedback" angle and the right flair. If a post is removed, screenshot the removal: it is a valid finding for the comparison.
- If you add another channel, copy a link and change only `utm_source` and `utm_content`.

## 2. Ready-to-post texts

### RO — Facebook / chat groups (rows 1, 2, 6)

> Salut! Suntem 4 studenți la ACS și lucrăm la **Matchify**, o platformă care potrivește studenții și juniorii din IT
> cu roluri tehnice pe baza skill-urilor reale (proiecte, nu doar cuvinte-cheie din CV) și îți arată **de ce** ți se
> potrivește un rol și ce să mai înveți.
>
> Testăm dacă ideea merită construită. Dacă ți-ar fi util (sau dacă recrutezi juniori), lasă-ne emailul pe lista de
> așteptare — primești noutăți și acces din primii:
> 👉 [LINK DIN TABEL]
>
> Orice feedback în comentarii ne ajută enorm. Mulțumim! 🙏

### RO — r/programare (row 3)

Title: **Am făcut un landing page pentru un proiect de facultate: matching explicabil student ↔ rol tehnic. Feedback?**

> Salut! Suntem studenți la ACS și, pentru un proiect de Software Engineering, validăm ideea **Matchify**: o platformă
> unde studenții și juniorii își fac un profil din skill-uri și proiecte, iar fiecare potrivire cu un rol vine cu o
> explicație (ce se potrivește, ce lipsește, ce să înveți). De partea firmelor, un shortlist explicabil în loc de
> sute de CV-uri.
>
> Nu vindem nimic, încă testăm dacă problema e reală. Ne-ar ajuta mult:
> - ce v-a enervat cel mai tare când ați căutat primul job / internship?
> - ați avea încredere într-un scor de potrivire dacă vedeți exact de unde vine?
>
> Landing page (cu listă de așteptare, dacă vă interesează): [LINK DIN TABEL]

### EN — r/SideProject (row 4)

Title: **Student project: explainable job matching for early-career tech talent. Would you use it?**

> We're four CS students in Bucharest building **Matchify** for our Software Engineering course. The idea: candidates
> build one profile from their skills and projects, and every role suggestion comes with a reason (what matches, what's
> missing, what to learn next). Hiring teams get an explainable shortlist instead of a pile of keyword-matched CVs.
>
> We're validating demand before we build the MVP. Honest feedback welcome, especially:
> - Would an explained match score change how you apply?
> - If you hire juniors: what's the most painful part of screening?
>
> Landing page + waitlist: [LINK FROM TABLE]

### EN — LinkedIn (row 5)

> Over the past weeks our team at POLITEHNICA Bucharest has been interviewing students and hiring managers about
> early-career tech hiring. The same thing came up again and again: candidates apply into silence, and recruiters
> screen piles of CVs that match on keywords but not on skills.
>
> We're building **Matchify**: skill-based, explainable matching between early-career engineers and technical roles,
> with role-specific interview preparation once you're in a process.
>
> We're opening an early-access list. If you're a student / junior looking for your next role, or you hire tech talent,
> we'd love to have you: [LINK FROM TABLE]
>
> #hiring #internships #softwareengineering #students

## 3. What to save for the Fiki (for every post)

Right after posting, and again on **25.11**:
- [ ] **Permalink** of the post (Facebook: click the post's timestamp → copy the URL; Reddit: "Share" → "Copy link").
- [ ] **Screenshot** of the post, saved as `assets/img/m5/<channel>-post.png` (e.g. `fb-students-post.png`).
- [ ] On 25.11: screenshot with the reactions / comments / upvotes, and note whether it was approved or removed.

Fill in this table (send it to Claude, who will put it in the Fiki):

| Channel | Group / subreddit | Date posted | Permalink | Reactions | Comments | Approved? |
|---|---|---|---|---|---|---|
| fb-students | | | | | | |
| fb-it-jobs | | | | | | |
| r-programare | | | | | | |
| r-sideproject | | | | | | |
| linkedin-post | | | | | | |
| chat-groups | | | | | | |

## 4. PostHog — what to set up and screenshot

1. **Web analytics** (left menu): set the date range to the campaign. Screenshot the visitors chart and the
   "Channels" / "UTM source" breakdown.
2. **Funnel** — Product analytics → **New insight** → **Funnel**:
   - Step 1: `Pageview`, filter *Current URL contains* `landing.html`
   - Step 2: `waitlist_opened`
   - Step 3: `waitlist_submitted`
   - **Breakdown** by event property `utm_source` (then once more by `utm_content` for the group level).
   - Save it as "M5 waitlist funnel" and screenshot it.
3. **Session replay**: watch 3–5 recordings, note what people did (scrolled to the end? opened the form and left?)
   and screenshot one recording.
4. **Formspree** → the form's Submissions: the number of leads per `role` and `utm_source`
   (screenshot it with the email addresses blurred).

Events sent by the landing page (all carry `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` when present):

| Event | When | Properties |
|---|---|---|
| `$pageview` | page load (automatic) | URL, referrer, UTMs |
| `cta_clicked` | click on a scroll-only CTA (nav, "See how it works") | `location` |
| `waitlist_opened` | a "Join" button opened the form | `role` (candidate / team), `location` |
| `waitlist_submitted` | Formspree accepted the signup | `role`, `location` |
| `waitlist_failed` | Formspree returned an error | `role`, `reason` |

The email address is never sent to PostHog, and session replay masks every input field.
