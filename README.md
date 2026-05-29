# Highland Mushrooms — Pre-Production Gantt Chart

An editable Gantt chart for the Marion, NC facility build-out. The schedule is
saved to **shared cloud storage** so every browser and every user sees the same
copy. Built to deploy on **Netlify**.

## What's in here

```
highland-gantt/
├─ index.html                      ← the app (open this in a browser)
├─ netlify/functions/schedule.mjs  ← serverless API that stores the schedule
├─ netlify.toml                    ← Netlify config
├─ package.json                    ← declares the @netlify/blobs dependency
└─ README.md
```

The shared schedule lives in **Netlify Blobs** (Netlify's built-in storage).
There is nothing to set up — no database, no API keys, no accounts. The function
at `/api/schedule` reads and writes it automatically once deployed.

## How saving works

- On load, the site fetches the shared schedule from `/api/schedule`.
- Every edit (move, resize, status change, add, delete) autosaves back to the
  server — you'll see **"✓ Saved to cloud"** by the toolbar.
- **Sync** re-pulls the latest copy (handy if a teammate just made changes).
- **Export / Import** download or load a JSON backup.
- If the server can't be reached, edits fall back to this browser's local
  storage and the indicator shows **"⚠ Offline — saved on this device."**

> Note: saves are *last-write-wins*. If two people edit at the same moment, the
> most recent save wins. Hit **Sync** to pull the current copy before editing.

## Deploy (recommended: Git + Netlify)

1. Put this folder in a Git repository (GitHub, GitLab, etc.).
2. In Netlify: **Add new site → Import an existing project**, pick the repo.
3. Leave the build command empty; publish directory is the repo root (`.`).
4. Deploy. Netlify installs `@netlify/blobs`, builds the function, and serves
   the API at `/api/schedule`. Done — sharing is live.

## Deploy (alternative: Netlify CLI)

```bash
npm install
npx netlify deploy --prod
```

## Local testing

```bash
npm install
npx netlify dev
```

This runs the site and the function together (with Blobs emulated locally) at
http://localhost:8888.

---

Opening `index.html` directly (double-click, or the in-app preview) will show the
chart, but cloud sync only works once it's served by Netlify, since that's where
the `/api/schedule` function lives. Offline, it saves to local storage instead.
