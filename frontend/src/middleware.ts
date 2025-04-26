import { NextResponse } from 'next/server';
    import type { NextRequest } from 'next/server';

    // Define role-based access paths
    const rolePaths = {
    student: ['/student'],
    tutor: ['/tutor'],
    //admin: ['/admin'],
    coordinator: ['/school'],
    };

    export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const role = request.cookies.get('role')?.value; // Store role in cookies when login
  
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

//     i provide you my code , i try to implement middleware, i have for role student,tutor,co-ordinator,admin,
// i want to restrict all user to use their own respective dashboard,