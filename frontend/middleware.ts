// import { NextRequest, NextResponse } from 'next/server';

// export function middleware(request: NextRequest) {
//   console.log("📦 Middleware triggered!");
//   console.log("Requested URL:", request.nextUrl.pathname);

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/", "/dashboard/:path*", "/login"], // Add routes you want middleware to run on
// };

    // middleware.ts
    import { NextResponse } from 'next/server';
    import type { NextRequest } from 'next/server';

    // Define role-based access paths
    const rolePaths = {
    student: ['/student'],
    tutor: ['/tutor'],
    admin: ['/admin'],
    coordinator: ['/coordinator'],
    };

    export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const role = request.cookies.get('role')?.value; // Store role in cookies when login

    console.log("Middleware Debug:");
    console.log("Path:", pathname);
    console.log("Role from cookie:", role);
  
    // Redirect unauthenticated users
    if (!role) {
        return NextResponse.redirect(new URL('/login?authType=student', request.url));
    }

    // Check role permissions
    for (const [allowedRole, paths] of Object.entries(rolePaths)) {
        if (paths.some((path) => pathname.startsWith(path)) && role !== allowedRole) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
    }

    return NextResponse.next();
    }

    // ✅ Step 2: Define matcher for protected routes only
    export const config = {
        matcher: [
        '/student/:path*',
        '/tutor/:path*',
        '/admin/:path*',
        '/coordinator/:path*',
        ],
    };