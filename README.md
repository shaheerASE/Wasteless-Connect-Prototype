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
| `/listings` | Browse all food posts with status filters |
| `/track/:id` | Live tracking timeline for one post |

## Status Lifecycle

**Posted → Confirmed → On the way → Picked up**

Use the **Advance Status** button on any tracking page to move a post through
its lifecycle. Status changes live in React state (refreshing the page resets
to seed data).

## Tech Stack

- Vite + React 18 (JavaScript)
- React Router v6
- Tailwind CSS v3
- All data in-memory — no backend, no database
