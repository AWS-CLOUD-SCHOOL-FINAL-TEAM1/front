import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const {
  COGNITO_DOMAIN,
  APP_CLIENT_ID,
  APP_CLIENT_SECRET,
  API_KEY,
  REDIRECT_SIGNIN,
} = process.env;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code") as string;

    if (!code) {
      const error = searchParams.get("error");
      return NextResponse.json({ error: error || "Unknown error" });
    }

    const authorizationHeader = `Basic ${Buffer.from(`${APP_CLIENT_ID}:${APP_CLIENT_SECRET}`).toString("base64")}`;
    const requestBody = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: APP_CLIENT_ID as string,
      code,
      redirect_uri: `${REDIRECT_SIGNIN}/api/auth/callback`,
    });

    const res = await fetch(`${COGNITO_DOMAIN}/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authorizationHeader,
      },
      body: requestBody,
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({
        error: data.error,
        error_description: data.error_description,
      });
    }

    const decodedIdToken: any = jwtDecode(data.id_token);

    const cookieStore = cookies();
    cookieStore.set("id_token", data.id_token);
    cookieStore.set("access_token", data.access_token);
    cookieStore.set("refresh_token", data.refresh_token);

    const userInfoResponse = await fetch(`${API_KEY}/login/user-info/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const userInfo = await userInfoResponse.json();

    if (!userInfoResponse.ok) {
      return NextResponse.json({
        error: userInfo.error || "Failed to fetch user info",
      });
    }

    return NextResponse.redirect(new URL("/", request.nextUrl));
  } catch (error) {
    return NextResponse.json({ error });
  }
}
