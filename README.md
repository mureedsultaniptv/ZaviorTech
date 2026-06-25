This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

## Environment

Create a `.env` (or `.env.local`) file based on `.env.example` and fill in the required values (Sanity + SMTP). For Namecheap Private Email, `EMAIL_SERVER_HOST` is typically `mail.privateemail.com` (port `587` for STARTTLS or `465` for SSL).

### Lead-generation chatbot

The chatbot is gated by a required lead form and uses serverless API routes only. Add these variables in `.env.local` for local development and in Vercel Project Settings -> Environment Variables for production:

```bash
ODOO_LEAD_API_URL=
ODOO_LEAD_API_TOKEN=
GEMINI_API_KEYS=
GEMINI_MODEL=gemini-2.5-flash
NEXT_PUBLIC_WHATSAPP_NUMBER=971508185948
CHAT_DAILY_LIMIT_PER_IP=30
CHAT_MAX_MESSAGES_PER_SESSION=12
CHAT_COOLDOWN_SECONDS=10
```

Frontend code calls only `/api/lead` and `/api/chat`. Gemini and Odoo secrets stay on the server.

`POST /api/lead` accepts:

```json
{
  "name": "Customer Name",
  "email": "customer@company.com",
  "phone": "+971501234567",
  "serviceRequired": "Odoo ERP",
  "sourcePage": "https://zavior.org/services"
}
```

It validates the lead, creates a `sessionId`, and sends this Odoo payload:

```json
{
  "event": "lead_created",
  "sessionId": "uuid",
  "timestamp": "2026-06-21T00:00:00.000Z",
  "lead": {
    "name": "Customer Name",
    "email": "customer@company.com",
    "phone": "+971501234567",
    "serviceRequired": "Odoo ERP",
    "sourcePage": "https://zavior.org/services"
  },
  "ipAddress": "203.0.113.10",
  "userAgent": "browser user agent",
  "sourcePage": "https://zavior.org/services",
  "transcript": [],
  "metadata": {
    "source": "website_chatbot"
  }
}
```

`POST /api/chat` accepts:

```json
{
  "sessionId": "uuid",
  "message": "I need an Odoo implementation",
  "lead": {
    "name": "Customer Name",
    "email": "customer@company.com",
    "phone": "+971501234567",
    "serviceRequired": "Odoo ERP",
    "sourcePage": "https://zavior.org/services"
  }
}
```

Every chat request sends a `chat_message` event to Odoo with `customerMessage`, `botReply`, the lead details, request metadata, and the current transcript. If Odoo is unavailable, failed payloads are queued in memory and retried on the next request. This is suitable as a Vercel-safe fallback, but use Redis or Upstash later if you need persistent retries and distributed rate limits.

Gemini keys are read from `GEMINI_API_KEYS` in order. Use either a comma-separated string or a JSON array string such as `GEMINI_API_KEYS=["first_key","second_key"]`. The default model is `gemini-2.5-flash`; override it with `GEMINI_MODEL`, or provide `GEMINI_MODELS=gemini-2.5-flash,gemini-flash-latest` to try model fallbacks. If a key fails because of quota, rate limit, auth, timeout, or server error, the next key is tried. If a model returns 404, the next model is tried instead of retrying every key against the same missing model. If all Gemini attempts fail, the chatbot returns a short sales-focused fallback response instead of exposing an error to the customer.

Chat replies are grounded in `src/lib/demo-data.json` and return structured UI data:

```json
{
  "message": "Sales assistant response",
  "recommendedLinks": [
    { "title": "ERP & Odoo Solutions", "url": "/services/erp-odoo-dubai", "type": "service" }
  ],
  "whatsappUrl": "https://wa.me/971508185948?text=Hi%20Zavior%2C%20I%20need%20software%20for%20my%20business",
  "leadIntent": true
}
```

If `ODOO_LEAD_API_URL` or `ODOO_LEAD_API_TOKEN` is missing, Odoo delivery is skipped safely and logs one disabled message instead of logging on every chat message.

Deployment steps:

1. Copy `.env.example` to `.env.local` and fill in the Odoo endpoint, Odoo token, and Gemini keys.
2. Confirm the Odoo endpoint accepts bearer auth with `Authorization: Bearer ODOO_LEAD_API_TOKEN`.
3. Run `npm run dev` locally and test the lead form before sending a chat message.
4. Add the same environment variables to Vercel and deploy.

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
