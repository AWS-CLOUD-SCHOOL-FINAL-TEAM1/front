import { NextRequest, NextResponse } from "next/server";
import { destroyCookie } from "nookies";
import { signOut } from "@/auth";

export async function GET(request: NextRequest) {
  try {
    console.log("Starting sign out process");
    await signOut();

    // 쿠키 제거
    const response = NextResponse.redirect(new URL("/", request.nextUrl));
    destroyCookie({ res: response }, "id_token");
    destroyCookie({ res: response }, "access_token");
    destroyCookie({ res: response }, "refresh_token");

    console.log("Cookies destroyed, redirecting to home page");
    return response;
  } catch (error) {
    console.log("Error during sign out process:", error);
    return NextResponse.json({ error: "Error during sign out process" });
  }
}
