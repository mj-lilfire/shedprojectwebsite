# Shed Project Website — Access & Deployment Guide

This document explains how to access, develop, test, and publish the Shed Project Website. It is written for a new developer joining the project with no prior knowledge of the setup.

It is governed by, and should be read alongside, **[MASTER_DEVELOPMENT_STANDARD.md](MASTER_DEVELOPMENT_STANDARD.md)**, which defines the underlying workflow, versioning, and git standards summarised here in practical, step-by-step form.

---

## Accessing the Website Locally

1. **Clone the repository from GitHub.**
   ```bash
   git clone https://github.com/mj-lilfire/shedprojectwebsite.git
   ```
2. **Open the project in VS Code.**
   ```bash
   code shedprojectwebsite
   ```
   (Or open VS Code and use **File → Open Folder…**.)
3. **Open the project folder** so that `index.html` and the `css/`, `js/`, `components/`, and `docs/` folders are visible in the VS Code Explorer sidebar.
4. **Launch Live Server.**
   - Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for VS Code if it isn't already installed.
   - Right-click `index.html` in the Explorer and choose **Open with Live Server**, or click **Go Live** in the VS Code status bar.
5. **View the website locally** in your browser at:
   ```
   http://127.0.0.1:5500
   ```
   The exact port may vary (e.g. `5501`, `5502`) if `5500` is already in use — check the URL Live Server opens automatically, or the address shown in the VS Code status bar.

This project has no build step: it is served as static HTML/CSS/JS files, so Live Server is all that's required for local development.

---

## Live Website

The live, deployed website is hosted on GitHub Pages at:

```
https://mj-lilfire.github.io/shedprojectwebsite/
```

This URL is updated **automatically** whenever changes are committed and pushed to the `main` branch — there is no separate publish or upload step. Allow a few minutes after pushing for GitHub Pages to rebuild and serve the update (see [Troubleshooting](#troubleshooting) if it doesn't appear).

---

## Standard Development Workflow

This project follows the workflow defined in the Master Development Standard, Section 2:

```
GitHub Repository
   ↓
VS Code
   ↓
Claude Code
   ↓
Live Server
   ↓
Browser Testing
   ↓
Git Commit
   ↓
Git Push
   ↓
GitHub Pages
```

GitHub remains the single source of truth throughout — no code is considered final until it is committed and pushed.

---

## Updating the Website

To make and publish a change:

1. **Develop locally** — make changes in VS Code (directly, or with Claude Code).
2. **Test with Live Server** — check the change in the browser at `http://127.0.0.1:5500` (or the active Live Server port), across desktop and mobile viewport sizes.
3. **Commit changes** — record a reviewed, working increment with `git commit`.
4. **Push to GitHub** — publish the commit with `git push`.
5. **Wait for GitHub Pages deployment** — GitHub Pages rebuilds automatically after a push to `main`; this typically takes one to a few minutes.
6. **Verify the live website** — reload `https://mj-lilfire.github.io/shedprojectwebsite/` and confirm the change is live (a hard refresh may be needed — see [Troubleshooting](#troubleshooting)).

---

## Git Commands

The standard release workflow uses the following commands, run from the repository root:

```bash
git add .
git commit -m "vX.X.X - Release Title"
git tag vX.X.X
git push origin main --follow-tags
```

What each command does:

| Command | Purpose |
|---|---|
| `git add .` | Stages all changed and new files in the working directory, preparing them to be committed. |
| `git commit -m "vX.X.X - Release Title"` | Records the staged changes as a new commit, labelled with the release version and a short title (matching the version and objective used in `CHANGELOG.md`). |
| `git tag vX.X.X` | Creates a lightweight tag marking this exact commit as release `vX.X.X`, per the semantic versioning standard (Master Development Standard, Section 3). |
| `git push origin main --follow-tags` | Pushes the `main` branch to GitHub, including the new tag, in a single push. This is what triggers the GitHub Pages rebuild. |

Replace `vX.X.X` with the actual release version (e.g. `v0.4.0`) and `Release Title` with a short, descriptive title matching the corresponding `CHANGELOG.md` entry.

---

## GitHub Pages

- **Where it's configured:** repository **Settings → Pages**, with the source set to the `main` branch (root). This is a one-time setup step — verify it in the repository settings if the live site ever stops updating.
- **Deployment is automatic:** every push to `main` triggers a rebuild and redeploy of the live site. No manual publish step is required.
- **No manual uploads are required:** files are never copied or uploaded to a server by hand — GitHub Pages serves directly from the repository.
- **GitHub is the single source of truth:** the live website always reflects the current state of the `main` branch. If it doesn't, `main` (not the live site) is correct, and the live site will catch up once it rebuilds.

---

## Troubleshooting

| Issue | Recommended Solution |
|---|---|
| **Live Server not running** | Confirm the Live Server extension is installed in VS Code. Check the status bar for a "Go Live" / port indicator. If a port is already in use, close other Live Server instances or let it fall back to another port (see [Accessing the Website Locally](#accessing-the-website-locally)). |
| **GitHub Pages deployment delay** | Deployments typically take one to a few minutes. Check the **Actions** tab (or **Settings → Pages**) on GitHub for the build/deployment status before assuming something has failed. |
| **Browser caching** | If a pushed change doesn't appear to be live, hard-refresh the browser (`Ctrl+Shift+R` / `Cmd+Shift+R`) or open the site in a private/incognito window to rule out a cached copy. |
| **Incorrect branch** | GitHub Pages serves from `main`. Confirm changes were committed and pushed to `main` (not a `feature/*` or `develop` branch) with `git branch --show-current` and `git log origin/main -1`. |
| **Missing `index.html`** | GitHub Pages serves `index.html` from the repository root by default. Confirm the file exists at the root (not inside `pages/` or another subfolder) and that its filename is lowercase and exact. |

---

## Future Enhancements

This is a placeholder section for future deployment automation.

A future release may introduce **GitHub Actions** to automate parts of the release process (for example: linting, automated release-note generation, or an explicit build/deploy job in place of GitHub Pages' default branch deployment). No GitHub Actions workflow exists yet — until one is added, the manual git workflow documented above is the standard process, per the Master Development Standard, Section 15.

---

*See also: [README.md](../README.md), [CLAUDE.md](../CLAUDE.md), [CHANGELOG.md](../CHANGELOG.md), and [MASTER_DEVELOPMENT_STANDARD.md](MASTER_DEVELOPMENT_STANDARD.md).*
