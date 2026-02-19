# CORE HR Dashboard

A clean, responsive HR dashboard built to match a provided Figma design — two screens, pixel-close.

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and you're good to go.

---

## Tech Stack

- **Vite + React** — fast dev setup, no fluff
- **Tailwind CSS v4** — utility-first styling
- **React Router v7** — client-side routing between the two screens
- **Lucide React** — icons throughout the UI
- **Pravatar.cc** — placeholder avatars (no signup needed, just a URL)

---

## Screens

| Route | Page |
|---|---|
| `/` | People — employee grid |
| `/timesheet` | Timesheet — stats + data table |

---

## Assumptions

- Employee photos and data are mocked — no real API connected
- The colored dots on people cards represent skill/tag indicators (colors matched from Figma)
- Sidebar collapse, search filtering, and pagination controls are functional UI — no backend
- Fonts load from Google Fonts (Montserrat), so an internet connection is needed for that to render correctly
