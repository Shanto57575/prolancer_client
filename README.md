# ProLancer — Frontend (Next.js + TypeScript + Tailwind + shadcn)

## Overview

ProLancer is a modern freelance marketplace platform built with RBAC (Role-Based Access Control) and three user roles:

- **Admin** — full system control, user management, job monitoring
- **Client** — can post jobs, receive applications, and directly message freelancers
- **Freelancer** — can apply to jobs and unlock direct messaging by purchasing a paid plan

Originally designed to operate like Fiverr with escrow payments, the project pivoted due to time constraints. The current workflow is similar to **LinkedIn’s connection/messaging model**, where:

- Clients can directly message freelancers
- Freelancers **must purchase a paid plan through Stripe** to initiate direct messaging for better visibility and reach
- Messaging and notifications are fully realtime using Pusher

Although the escrow system was not completed, the platform still supports a complete job marketplace flow with realtime chat, job posting, applications, authentication, and a paid upgrade system for freelancers.

## Tech

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Uploadthing(file upload)
- Pusher (realtime client)
- Stripe (publishable key only)

---

## Quick Setup

```bash
# from project root
cd frontend
npm install

# development
npm run dev

# production build
npm run build && npm run start
```

---

## `.env.local`

```env
API_BASE_URL=http://localhost:5000/api/v1
UPLOADTHING_TOKEN='****************'
NEXT_PUBLIC_PUSHER_KEY='****************'
NEXT_PUBLIC_PUSHER_CLUSTER='****************'
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY='****************'

```

## Stripe (Frontend Notes)

- Use only `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
- Create Checkout Session by calling

[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge)](https://prolancer-olive.vercel.app)
