/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.module.rules.push({
      test: /\.glsl/,
      type: "asset/source",
    });
    config.module.rules.push({
      test: /\.(frag|vert)$/,
      type: "asset/source",
    });
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ["raw-loader", "glslify-loader"],
    });
    return config;
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["static01.nyt.com", "operating-as-usual.vercel.app", "https://ied-2023-show.s3.eu-west-1.amazonaws.com"],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "replicate.com",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
      {
        protocol: "https",
        hostname: "https://ied-2023-show.s3.eu-west-1.amazonaws.com",
      },
    ],
  },
  experimental: {
    forceSwcTransforms: true,
  },
};

module.exports = nextConfig;
