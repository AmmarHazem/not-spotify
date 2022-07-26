import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const rawToken = await getToken({
    req: request,
    secret: process.env.JWT_SECRET,
    raw: true,
  });
  const { pathname } = request.nextUrl;
  // console.log("--- middleware", pathname);
  // console.log("--- raw token", rawToken?.length);
  if (pathname === "/login" && rawToken) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (pathname === "/" && !rawToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // console.log("--- NextResponse.next");
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login"],
};
