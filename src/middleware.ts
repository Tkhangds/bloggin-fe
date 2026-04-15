import { NextRequest, NextResponse } from "next/server";

/**
 * Routes that require authentication (any logged-in user).
 */
const PROTECTED_PREFIXES = ["/draft", "/publish", "/setting", "/profile"];

/**
 * Routes that require the ADMIN role.
 */
const ADMIN_PREFIXES = ["/admin"];

/**
 * The cookie name set by the backend session.
 * The backend uses HttpOnly cookies so we can only check for its presence here,
 * not read its value — actual role verification happens inside each API route
 * and via the /auth/me endpoint in the AuthContext.
 */
const SESSION_COOKIE = "connect.sid";

function isAuthenticated(request: NextRequest): boolean {
  return request.cookies.has(SESSION_COOKIE);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const requiresAuth = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  const requiresAdmin = ADMIN_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (requiresAuth || requiresAdmin) {
    if (!isAuthenticated(request)) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/draft/:path*",
    "/publish/:path*",
    "/setting/:path*",
    "/profile/:path*",
  ],
};
