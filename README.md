This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

## Environment

Create a `.env` (or `.env.local`) file based on `.env.example` and fill in the required values (Sanity + SMTP). For Namecheap Private Email, `EMAIL_SERVER_HOST` is typically `mail.privateemail.com` (port `587` for STARTTLS or `465` for SSL).

### Lead-generation chatbot

The `/chat` page uses a server-side sales consultant. Visitors can start with a question, qualify themselves naturally, and continue to WhatsApp when appropriate. Add these variables in `.env.local` for local development and in Vercel Project Settings -> Environment Variables for production:

```bash
GEMINI_API_KEYS=your_first_key,your_second_key
GEMINI_MODEL=gemini-2.5-flash
CHAT_DAILY_LIMIT_PER_IP=30
CHAT_MAX_MESSAGES_PER_SESSION=12
CHAT_COOLDOWN_SECONDS=10
CHAT_IP_HASH_SALT=replace_with_a_long_random_server_secret
CHAT_SESSION_TTL_HOURS=24
NEXT_PUBLIC_WHATSAPP_NUMBER=971508185948
```

Gemini and Sanity write credentials stay on the server. `.env` and `.env.local` are ignored by Git.

`GET /api/chat?sessionId=...` restores the current session. `POST /api/chat` accepts:

```json
{
  "sessionId": "uuid",
  "message": "We manage inventory in Excel and need an Odoo solution",
  "sourcePage": "/chat"
}
```

The server validates the request, hashes the IP, enforces the daily/session/cooldown limits, retrieves relevant entries from `src/lib/demo-data.json`, rotates through `GEMINI_API_KEYS`, sanitizes the reply, updates the lead qualification, and persists `chatConversation` and qualified `chatLead` records in Sanity. If Gemini or Sanity is temporarily unavailable, the visitor receives a safe fallback response rather than a stack trace.

Successful responses include:

```json
{
  "message": "Sales assistant response",
  "remainingMessages": 5,
  "showWhatsApp": true,
  "whatsappUrl": "https://wa.me/..."
}
```

Deployment steps:

1. Copy `.env.example` to `.env.local` and fill in Sanity, Gemini, WhatsApp, email, and salt values.
2. Run `npm run dev` locally and open `/chat`.
3. Add the same environment variables to Vercel and deploy.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
