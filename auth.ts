import {
  CognitoIdentityProviderClient,
  GlobalSignOutCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { parseCookies, destroyCookie } from "nookies";
import { jwtDecode } from "jwt-decode"; // Note the corrected import

const client = new CognitoIdentityProviderClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

interface User {
  username: string;
  name: string;
  userId: string; // Add userId to the User interface
}

export const getCurrentUser = async (): Promise<User | null> => {
  const cookies = parseCookies();
  const idToken = cookies.id_token;

  if (!idToken) {
    console.log("No id token found in cookies");
    return null;
  }

  try {
    const decoded: any = jwtDecode(idToken);
    const username = decoded["cognito:username"] || decoded["sub"];
    const name = decoded["name"];
    const userId = decoded["identities"]?.[0]?.userId; // Extract userId

    console.log("Decoded ID Token:", decoded);
    console.log("Username:", username);
    console.log("Name:", name);
    console.log("User ID:", userId);

    return { username, name, userId };
  } catch (error) {
    console.log("Error decoding token:", error);
    return null;
  }
};

export const signOut = async () => {
  const cookies = parseCookies();
  const accessToken = cookies.access_token;

  if (!accessToken) {
    console.log("No access token found in cookies");
    return;
  }

  const command = new GlobalSignOutCommand({
    AccessToken: accessToken,
  });

  try {
    await client.send(command);
    destroyCookie(null, "id_token");
    destroyCookie(null, "access_token");
    destroyCookie(null, "refresh_token");
    console.log("Sign out successful");
  } catch (error) {
    console.log("Error signing out:", error);
  }
};
