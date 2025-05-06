// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define which routes should be protected
const protectedRoutes = ["/draft", "/publish", "/setting/*"];
const authRoutes = ["/sign-in", "/sign-up"];
const editRoutes = ["/blog/edit", "/draft"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static assets
  if (
    pathname.includes("/_next") ||
    pathname.includes("/api/") ||
    pathname.includes("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // Check if the user is trying to access a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.includes(pathname);

  const isEditRoute = editRoutes.some((route) => pathname.startsWith(route));

  if (!isProtectedRoute && !isAuthRoute && !isEditRoute) {
    return NextResponse.next();
  }

  // Get the session cookie
  const sessionCookie = request.cookies.get("bloggin-session");
  const hasSessionCookie = !!sessionCookie?.value;

  // Validate session with backend
  let isSessionValid = false;
  if (hasSessionCookie) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/validate-session`,
        {
          headers: {
            Cookie: `bloggin-session=${sessionCookie.value}`,
          },
        },
      );

      isSessionValid = response.ok;
    } catch (error) {
      console.error("Session validation error:", error);
      isSessionValid = false;
    }
  }

  // Handle protected routes - redirect to login if session is invalid
  if (isProtectedRoute && !isSessionValid) {
    const url = new URL(`/sign-in`, request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // Redirect logged-in users away from auth pages
  if (isAuthRoute && isSessionValid) {
    return NextResponse.redirect(new URL("/blog", request.url));
  }
  if (isSessionValid && isEditRoute) {
    try {
      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`,
        {
          headers: {
            Cookie: `bloggin-session=${sessionCookie!.value}`,
          },
        },
      );

      const postIdMatch = pathname.match(/\/([a-f0-9-]+)$/i);
      const postId = postIdMatch ? postIdMatch[1] : null;

      const postResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${pathname.startsWith("/draft") ? "draft" : "post"}/${postId}`,
        {
          headers: {
            Cookie: `bloggin-session=${sessionCookie!.value}`,
          },
        },
      );

      if (userResponse.ok && postResponse.ok) {
        const user = await userResponse.json();
        const post = await postResponse.json();
        if (user.data.id === post.data.authorId) {
          return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/error/forbidden", request.url));
      }
    } catch (error) {
      console.error("Forbidden validation error:", error);
    }
  }
  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
