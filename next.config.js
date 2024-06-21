/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  env: {
    API_KEY: process.env.API_KEY,
    COGNITO_DOMAIN: process.env.COGNITO_DOMAIN,
    USER_POOL_ID: process.env.USER_POOL_ID,
    AWS_REGION: process.env.AWS_REGION,
    APP_CLIENT_ID: process.env.APP_CLIENT_ID,
    APP_CLIENT_SECRET: process.env.APP_CLIENT_SECRET,
    REDIRECT_SIGNIN: process.env.REDIRECT_SIGNIN,
    REDIRECT_SIGNOUT: process.env.REDIRECT_SIGNOUT,
  },
};

module.exports = nextConfig;
