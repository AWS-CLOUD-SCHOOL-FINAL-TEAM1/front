import {
  CognitoIdentityProviderClient,
  GetUserCommand,
  GlobalSignOutCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { parseCookies, setCookie, destroyCookie } from "nookies";

const client = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
});

export const getCurrentUser = async () => {
  const cookies = parseCookies();
  const accessToken = cookies.access_token;

  if (!accessToken) {
    throw new Error("User not authenticated");
  }

  const command = new GetUserCommand({ AccessToken: accessToken });
  const response = await client.send(command);
  return response;
};

export const signOut = async () => {
  const cookies = parseCookies();
  const accessToken = cookies.access_token;

  if (!accessToken) {
    throw new Error("User not authenticated");
  }

  const command = new GlobalSignOutCommand({ AccessToken: accessToken });
  await client.send(command);

  destroyCookie(null, "id_token");
  destroyCookie(null, "access_token");
  destroyCookie(null, "refresh_token");
};
