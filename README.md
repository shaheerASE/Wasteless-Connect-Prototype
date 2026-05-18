# Wasteless Connect

A frontend-only food surplus coordination platform where restaurants, dhabas,
and universities post leftover food and a pickup team tracks collection status
through a 4-stage lifecycle.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero + "How it works" overview |
| `/post` | Post surplus food (form) |
| `/listings` | Browse posts with search + status & donor-type filters |
| `/track/:id` | Live tracking timeline for one post |
| `/dashboard` | Stats overview — totals, by status, by donor type |
| `/about` | About the platform + FAQ |

## Status Lifecycle

**Posted → Confirmed → On the way → Picked up**

Use the **Advance Status** button on any tracking page to move a post through
its lifecycle. New posts and status changes persist in the browser
(`localStorage`), so they survive a page refresh. Use the **Reset demo data**
link on the Listings page to restore the original 7 seed posts.

## Tech Stack

- Vite + React 18 (JavaScript)
- React Router v6
- Tailwind CSS v3
- All data in-memory — no backend, no database
