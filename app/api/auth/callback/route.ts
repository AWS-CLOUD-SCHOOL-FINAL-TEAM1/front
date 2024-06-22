import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwtDecode from "jwt-decode";

const {
  NEXT_PUBLIC_COGNITO_DOMAIN,
  NEXT_PUBLIC_APP_CLIENT_ID,
  NEXT_PUBLIC_APP_CLIENT_SECRET,
} = process.env;

export async function GET(request: NextRequest) {
  try {
    const origin = request.nextUrl.origin;
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code") as string;

    console.log("Request Origin:", origin);
    console.log("Request Search Params:", searchParams.toString());
    console.log("Authorization Code:", code);

    if (!code) {
      const error = searchParams.get("error");
      console.log("Error received:", error);
      return NextResponse.json({ error: error || "Unknown error" });
    }

    const authorizationHeader = `Basic ${Buffer.from(`${NEXT_PUBLIC_APP_CLIENT_ID}:${NEXT_PUBLIC_APP_CLIENT_SECRET}`).toString("base64")}`;

    const requestBody = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: NEXT_PUBLIC_APP_CLIENT_ID as string,
      code,
      redirect_uri: `${origin}/api/auth/callback`,
    });

    console.log("Authorization Header:", authorizationHeader);
    console.log("Request Body:", requestBody.toString());

    const res = await fetch(`${NEXT_PUBLIC_COGNITO_DOMAIN}/oauth2/token`, {
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

    return NextResponse.redirect(new URL("/", request.nextUrl));
  } catch (error) {
    console.log("Catch Error:", error);
    return NextResponse.json({ error });
  }
}
