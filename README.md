# ProLancer — Frontend / Backend (Two Paste‑Ready Files)

---

## FILE: `frontend/README.md`

````markdown
# ProLancer — Frontend (Next.js + TypeScript + Tailwind + shadcn)

## Tech

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui (optional components)
- Pusher (realtime client)
- Stripe (frontend uses publishable key)

## Quick setup (paste into terminal)

```bash
# from project root
cd frontend
npm install
# dev
npm run dev
# build
npm run build && npm run start
```
````

## `.env.local` (paste)

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_PUSHER_KEY=your_pusher_key
NEXT_PUBLIC_PUSHER_CLUSTER=ap2
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXTAUTH_URL=http://localhost:3000 # if using next-auth
```

## package.json scripts (example)

```json
{
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start -p 3000",
    "lint": "next lint"
  }
}
```

## Tailwind + shadcn quick setup

1. Install Tailwind and its peer deps: `npm i -D tailwindcss postcss autoprefixer` then `npx tailwindcss init -p`.
2. Add Tailwind config (`tailwind.config.js`) with `content` pointing to `app`, `components`, `src` etc.
3. Install shadcn tooling: follow `npx shadcn-ui@latest init` (optional) and import components in your UI.

## Folder structure (recommended)

```
frontend/
├─ app/                 # Next.js App Router pages + layouts
│  ├─ layout.tsx
│  ├─ page.tsx
│  └─ (routes...)
├─ components/          # shared UI components
├─ lib/                 # api clients, pusher client, utils
├─ hooks/               # custom hooks (useAuth, useFetch)
├─ styles/              # global css + tailwind
├─ public/
├─ types/               # shared TS types
└─ next.config.js
```

## API client example (lib/api.ts)

```ts
export async function api(path: string, opts: RequestInit = {}) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${base}${path}`, {
    credentials: "include",
    ...opts,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
```

## Stripe (client)

- Use `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to create Checkout sessions by calling backend `POST /payment/create-checkout-session`.
- Do **not** place secret keys in frontend.

## Notes

- For auth: store access token in memory + refresh via httpOnly cookie or follow your backend's token rotation approach.
- Pusher: initialize client in `lib/pusher-client.ts` and subscribe to channels per-chat or per-user.

```

```

---
