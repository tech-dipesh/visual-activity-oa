# Visual Activity Agent
A  Chrome extension that watches page visits, clicks and scroll depth, batches them, and posts them to a small Express + Prisma backend.

## Folders
- `extension/` — Manifest V3 Chrome extension
- `server/` — Express + Prisma 7 + Zod backend


## Loading the extension
1. Please First Run the Backend Server With Installation and Prisma Setup and the Server Run.
  i. Install with: `pnpm i`
  ii. Run Prisma With: `pn prisma:generate`
  iii. Run Server with: `pn dev`
2. Open `chrome://extensions`
3. Turn on Developer mode
4. Click "Load unpacked" and select the `extension/` folder
5. Browse normally — visits, clicks and scroll milestones get batched every 5 seconds and posted to `http://localhost:4000/api/events`
