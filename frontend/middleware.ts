import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  //const token = request.cookies.get("auth_token");

  console.log("Middleware running..."); // <-- Debug
  //console.log("Token:", token); 

  // if (!token) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/student/:path*"], // Protect dashboard routes
};