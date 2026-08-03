# Visual Activity Agent
A  Chrome extension that watches page visits, clicks and scroll depth, batches them, and posts them to a small Express + Prisma backend.

## Folders
- `extension/` — Manifest V3 Chrome extension
- `server/` — Express + Prisma 7 + Zod backend


## Loading the extension
1. Open `chrome://extensions`
2. Turn on Developer mode
3. Click "Load unpacked" and select the `extension/` folder
4. Browse normally — visits, clicks and scroll milestones get batched every 5 seconds and posted to `http://localhost:4000/api/events`