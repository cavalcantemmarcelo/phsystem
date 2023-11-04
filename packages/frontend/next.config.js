/** @type {import('next').NextConfig} */
require("dotenv").config();

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3333";
console.log(baseUrl);

const nextConfig = {
  output: "export",
  reactStrictMode: true,
  distDir: "dist",
  images: {
    unoptimized: true,
  },
  env: {
    API_KEY: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

module.exports = nextConfig;
