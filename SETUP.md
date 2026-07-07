# Setup — finishing git + GitHub Pages

The site skeleton itself is done and verified (build succeeds, Lesson 0 + its visualization render correctly). Git and GitHub Pages need to be set up from a real Terminal on your Mac — Claude's sandbox can create/edit files here but can't delete or rename them, and git needs that ability internally.

## 1. Clean up two leftover files first

Claude's attempt to test this from the sandbox left two harmless but broken artifacts. Delete them via Finder or Terminal before continuing:

- `Website/.git/` (a broken, half-initialized git repo — the lock file inside it can't be removed from the sandbox)
- `Website/_site/` (a stale build with one wrong file path from an early test build — safe to delete, it's gitignored anyway and gets regenerated on every build)

```bash
cd ~/Robo-Assistant/Website
rm -rf .git _site
```

## 2. Install dependencies and confirm the build works

```bash
npm install
npx eleventy
```

You should see it write `_site/index.html`, `_site/lessons/00-big-picture-overview/index.html`, and copy the visualization + CSS through. To preview it locally:

```bash
npx eleventy --serve
```

Then open the local URL it prints (usually `http://localhost:8080`).

## 3. Initialize git and make the first commit

```bash
git init
git add .
git commit -m "Initial Eleventy skeleton: homepage, Lesson 0, first visualization"
```

## 4. Create the GitHub repo and push

1. Create a new empty repo on GitHub (no README/license — you already have files locally). A name like `complex-analysis` or `math-notebook` works.
2. Connect and push:

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

## 5. Turn on GitHub Pages

Because this is an Eleventy site (needs a build step), GitHub Pages needs to serve the **built** `_site/` output, not your source files directly. The simplest approach: a GitHub Actions workflow that builds and deploys automatically on every push. Ask Claude for this workflow file when you're ready to set it up — it's a small addition (`.github/workflows/deploy.yml`) and worth doing as its own step so it can be tested properly.

---

*Once this is done, let Claude know and it can help port the remaining lessons/visualizations, or set up the GitHub Actions deploy workflow.*
