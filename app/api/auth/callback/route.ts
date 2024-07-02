import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const { COGNITO_DOMAIN, APP_CLIENT_ID, APP_CLIENT_SECRET, API_KEY } =
  process.env;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code") as string;

    console.log("Request Search Params:", searchParams.toString());
    console.log("Authorization Code:", code);

    if (!code) {
      const error = searchParams.get("error");
      console.log("Error received:", error);
      return NextResponse.json({ error: error || "Unknown error" });
    }

    const authorizationHeader = `Basic ${Buffer.from(`${process.env.APP_CLIENT_ID}:${process.env.APP_CLIENT_SECRET}`).toString("base64")}`;

    const requestBody = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: APP_CLIENT_ID as string,
      code,
      redirect_uri: `${process.env.REDIRECT_SIGNIN}/api/auth/callback`,
    });

    console.log("Authorization Header:", authorizationHeader);
    console.log("Request Body:", requestBody.toString());

    const res = await fetch(`${process.env.COGNITO_DOMAIN}/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authorizationHeader,
      },
      body: requestBody,
    });

    const data = await res.json();

    console.log("Response Status:", res.status);
    console.log("Response Data:", data);

    if (!res.ok) {
      console.log("Error Response:", data);
      return NextResponse.json({
        error: data.error,
        error_description: data.error_description,
      });
    }

    const decodedIdToken: any = jwtDecode(data.id_token); // ID 토큰을 디코딩
    console.log("Decoded ID Token:", decodedIdToken); // 디코딩된 토큰을 콘솔에 출력

    const cookieStore = cookies();
    cookieStore.set("id_token", data.id_token);
    cookieStore.set("access_token", data.access_token);
    cookieStore.set("refresh_token", data.refresh_token);

    console.log("Cookies set successfully");

    // get_user_info API 호출
    const userInfoResponse = await fetch(
      `${process.env.API_KEY}/login/user-info/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const userInfo = await userInfoResponse.json();

    if (!userInfoResponse.ok) {
      console.log("Error fetching user info:", userInfo);
      return NextResponse.json({
        error: userInfo.error || "Failed to fetch user info",
      });
    }

    console.log("User Info:", userInfo);

    return NextResponse.redirect(new URL("/", request.nextUrl));
  } catch (error) {
    console.log("Catch Error:", error);
    return NextResponse.json({ error });
  }
}
