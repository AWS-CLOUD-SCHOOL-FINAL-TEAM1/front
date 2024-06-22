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
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    NEXT_PUBLIC_COGNITO_DOMAIN: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
    NEXT_PUBLIC_USER_POOL_ID: process.env.NEXT_PUBLIC_USER_POOL_ID,
    NEXT_PUBLIC_AWS_REGION: process.env.NEXT_PUBLIC_AWS_REGION,
    NEXT_PUBLIC_APP_CLIENT_ID: process.env.NEXT_PUBLIC_APP_CLIENT_ID,
    NEXT_PUBLIC_APP_CLIENT_SECRET: process.env.NEXT_PUBLIC_APP_CLIENT_SECRET,
    NEXT_PUBLIC_REDIRECT_SIGNIN: process.env.NEXT_PUBLIC_REDIRECT_SIGNIN,
    NEXT_PUBLIC_REDIRECT_SIGNOUT: process.env.NEXT_PUBLIC_REDIRECT_SIGNOUT,
  },
};

console.log("Loaded environment variables:", nextConfig.publicRuntimeConfig);

module.exports = nextConfig;
