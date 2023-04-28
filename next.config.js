/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_APPENV: process.env.APPENV,
    NEXT_PUBLIC_BUILDID: process.env.BUILDID,
    NEXT_PUBLIC_API_URL: process.env.API_URL,
    LSQ_APIURL: process.env.LSQ_APIURL,
    LSQ_ACCESSKEY: process.env.LSQ_ACCESSKEY,
    LSQ_SECRET: process.env.LSQ_SECRET,
    NEXT_PUBLIC_GTM_GTMID: process.env.GTM_GTMID,
    NEXT_PUBLIC_AUTH: process.env.GTM_AUTH,
    NEXT_PUBLIC_PREVIEW: process.env.GTM_PREVIEW,
  },
  images: {
    domains: ["jubileeresidences.com"],
  },
};

module.exports = nextConfig;
