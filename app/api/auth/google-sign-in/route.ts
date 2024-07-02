import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const { COGNITO_DOMAIN, APP_CLIENT_ID } = process.env;

export async function GET(request: NextRequest) {
  const authorizeParams = new URLSearchParams();
  const origin = process.env.SPD_FE_SERVICE_HOST;

  console.log("Request Origin:", origin); // origin 값을 로그로 출력하여 확인합니다.
  console.log("COGNITO_DOMAIN:", COGNITO_DOMAIN); // COGNITO_DOMAIN 값을 로그로 출력하여 확인합니다.
  console.log("APP_CLIENT_ID:", APP_CLIENT_ID); // APP_CLIENT_ID 값을 로그로 출력하여 확인합니다.

  const state = crypto.randomBytes(16).toString("hex");

  authorizeParams.append("response_type", "code");
  authorizeParams.append("client_id", APP_CLIENT_ID as string);
  authorizeParams.append("redirect_uri", `${origin}/api/auth/callback`);
  authorizeParams.append("state", state);
  authorizeParams.append("identity_provider", "Google");
  authorizeParams.append("scope", "profile email openid");

  const redirectUrl = `${COGNITO_DOMAIN}/oauth2/authorize?${authorizeParams.toString()}`;

  console.log("Redirecting to:", redirectUrl);

  return NextResponse.redirect(redirectUrl);
}
