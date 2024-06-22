const dotenv = require("dotenv");
const path = require("path");

// .env.local 파일을 로드
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

console.log("Loaded environment variables in next.config.js:");
console.log("NEXT_PUBLIC_API_KEY:", process.env.NEXT_PUBLIC_API_KEY);
console.log(
  "NEXT_PUBLIC_COGNITO_DOMAIN:",
  process.env.NEXT_PUBLIC_COGNITO_DOMAIN
);
console.log("NEXT_PUBLIC_USER_POOL_ID:", process.env.NEXT_PUBLIC_USER_POOL_ID);
console.log("NEXT_PUBLIC_AWS_REGION:", process.env.NEXT_PUBLIC_AWS_REGION);
console.log(
  "NEXT_PUBLIC_APP_CLIENT_ID:",
  process.env.NEXT_PUBLIC_APP_CLIENT_ID
);
console.log(
  "NEXT_PUBLIC_APP_CLIENT_SECRET:",
  process.env.NEXT_PUBLIC_APP_CLIENT_SECRET
);
console.log(
  "NEXT_PUBLIC_REDIRECT_SIGNIN:",
  process.env.NEXT_PUBLIC_REDIRECT_SIGNIN
);
console.log(
  "NEXT_PUBLIC_REDIRECT_SIGNOUT:",
  process.env.NEXT_PUBLIC_REDIRECT_SIGNOUT
);

module.exports = {
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
