// app/api/auth/google-sign-in/route.ts

export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const { COGNITO_DOMAIN, APP_CLIENT_ID, REDIRECT_SIGNIN } = process.env;

export async function GET(request: NextRequest) {
  const authorizeParams = new URLSearchParams();
  const state = crypto.randomBytes(16).toString("hex");

  authorizeParams.append("response_type", "code");
  authorizeParams.append("client_id", APP_CLIENT_ID as string);
  authorizeParams.append(
    "redirect_uri",
    `${REDIRECT_SIGNIN}/api/auth/callback`
  );
  authorizeParams.append("state", state);
  authorizeParams.append("identity_provider", "Google");
  authorizeParams.append("scope", "profile email openid");

  const redirectUrl = `${COGNITO_DOMAIN}/oauth2/authorize?${authorizeParams.toString()}`;

  // 상세 로그 추가
  console.log("Redirecting to:", redirectUrl);
  console.log("COGNITO_DOMAIN:", COGNITO_DOMAIN);
  console.log("APP_CLIENT_ID:", APP_CLIENT_ID);
  console.log("REDIRECT_SIGNIN:", REDIRECT_SIGNIN);
  console.log("state:", state);

  return NextResponse.redirect(redirectUrl);
}
