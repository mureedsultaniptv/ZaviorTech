import type { NextConfig } from "next";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "font-src 'self' data:",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' data: blob: https:",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://www.clarity.ms https://scripts.clarity.ms https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://www.clarity.ms https://scripts.clarity.ms https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "connect-src 'self' https: ws: wss:",
  "frame-src 'self' https://www.googletagmanager.com https://*.googletagmanager.com",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), geolocation=(), microphone=()",
  },
];

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  reactCompiler: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/v1",
        destination: "/",
        permanent: true,
      },
      {
        source: "/home2",
        destination: "/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "zaviortech.vercel.app" }],
        destination: "https://www.zavior.org/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "zavior.org" }],
        destination: "https://www.zavior.org/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source:
          "/:path*.:ext(ico|jpg|jpeg|png|gif|svg|webp|avif|woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/:path(robots.txt|llms.txt|ai.txt)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
