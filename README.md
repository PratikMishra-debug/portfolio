# Pratik Kumar — Portfolio

A single-page, no-build-step 3D interactive portfolio. Just static files —
`index.html` + `app.js` — nothing to compile, no `npm install` required.

## Files
- `index.html` — all markup, CSS, and section content
- `app.js` — Three.js hero scene, animations, GitHub live-data fetch, command palette, contact form, easter eggs
- `manifest.json` — PWA metadata
- `robots.txt`, `sitemap.xml` — basic SEO (update the domain placeholders once you have one)

## Before you deploy (2 quick edits)
1. In `robots.txt` and `sitemap.xml` and the `<link rel="canonical">` / `<meta property="og:url">` tags in `index.html`, replace `YOUR-DOMAIN-HERE` with your real domain once you have one (e.g. `pratikkumar.dev` or your Vercel URL).
2. Nothing else is required — the site is otherwise ready to go live as is.

## Deploy — pick any one option (all free)

### Option A: Vercel (recommended, easiest)
1. Go to https://vercel.com and sign in with GitHub.
2. Click **Add New → Project**, then **Deploy without a Git repository** → drag and drop this folder, OR push this folder to a GitHub repo and import it.
3. Framework preset: choose **Other** (it's static, no build command needed).
4. Click **Deploy**. You'll get a live `*.vercel.app` URL in under a minute.
5. Optional: add a custom domain under Project → Settings → Domains.

### Option B: Netlify
1. Go to https://app.netlify.com/drop
2. Drag this whole folder onto the page.
3. It deploys instantly with a live `*.netlify.app` URL.

### Option C: GitHub Pages
1. Create a new GitHub repo (e.g. `portfolio`).
2. Push these files to the repo root (or a `docs/` folder).
3. In the repo: **Settings → Pages → Source** → select the branch/folder.
4. Your site will be live at `https://<your-username>.github.io/portfolio/`.

## Updating content later
Everything is in plain HTML/CSS/JS:
- Copy text (hero, about, projects, achievements, certifications) → edit directly inside `index.html`.
- Colors/fonts → CSS variables at the top of the `<style>` block in `index.html` (`:root { --primary: ... }`).
- Tech stack lists, easter eggs, GitHub username, command palette entries → top of `app.js`.
- Resume: once you have a PDF, replace the "Resume Coming Soon" button in `index.html` with a real `<a href="resume.pdf" download>` link.

## Notes
- GitHub stats (repos/followers/pinned) are fetched live from the public GitHub API at `github.com/PratikMishra-debug` — no API key needed, works automatically once deployed.
- LeetCode has no public CORS-friendly stats API, so that section links out to the live profile instead of faking numbers.
- Reduced motion, keyboard navigation, and focus states are respected throughout.
