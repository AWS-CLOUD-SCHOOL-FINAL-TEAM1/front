const awsConfig = {
  Auth: {
    region: process.env.AWS_REGION,
    userPoolId: process.env.USER_POOL_ID,
    userPoolWebClientId: process.env.USER_POOL_WEB_CLIENT_ID,
    oauth: {
      domain: process.env.COGNITO_DOMAIN,
      scope: ["email", "profile", "openid"],
      redirectSignIn: process.env.REDIRECT_SIGNIN,
      redirectSignOut: process.env.REDIRECT_SIGNOUT,
      responseType: "code",
    },
  },
};

console.log("AWS Config:", awsConfig);

export default awsConfig;
