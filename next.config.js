/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export",
  images: {
    loader: "akamai",
    path: "",
  },
  compiler: { styledComponents: true },
};

module.exports = nextConfig;
