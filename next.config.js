module.exports = {
  output: "standalone",
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nextui.org",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};
