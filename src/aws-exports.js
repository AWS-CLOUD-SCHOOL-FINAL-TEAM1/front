const awsConfig = {
  Auth: {
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID,
    oauth: {
      domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
      scope: ["email", "profile", "openid"],
      redirectSignIn: process.env.NEXT_PUBLIC_REDIRECT_SIGNIN,
      redirectSignOut: process.env.NEXT_PUBLIC_REDIRECT_SIGNOUT,
      responseType: "code",
    },
  },
};

console.log("AWS Config:", awsConfig);

export default awsConfig;
