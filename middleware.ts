import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/session'; // Function to decrypt the session cookie
import { cookies } from 'next/headers'; // Next.js function to manage cookies

// Define protected and public routes
export const adminProtectedRoutes = [
  '/admin/dashboard',
  '/admin/dashboard/elections',
  '/admin/elections/create',
  '/admin/elections/*',
];
export const userProtectedRoutes = ['/vote'];
export const publicRoutes = [
  '/login',
  '/request-code',
  '/admin/accounts/login',
  '/admin/accounts/register',
  '/vote/success'
];

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const path = url.pathname;
  // const query = url.searchParams;

  const pathSegments = path.split('/');
  const dynamicId = pathSegments.length > 2 ? pathSegments[2] : '';
  // console.log(dynamicId)

  const newLoginUrl = new URL(`/login/${dynamicId}`, req.url)
  const newAdminLoginUrl = new URL("/admin/accounts/login", req.url)


  // query.forEach((value, key) => {
  //       newLoginUrl.searchParams.append(key, value);
  //   });
  // query.forEach((value, key) => {
  //       newAdminLoginUrl.searchParams.append(key, value);
  //   });



  const isAdminProtectedRoute = adminProtectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isUserProtectedRoute = userProtectedRoutes.some((route) =>
    path.startsWith(`/vote/${dynamicId}`)
  );
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = cookies().get('session')?.value;

  if (!cookie) {
    if (isPublicRoute) {
      return NextResponse.next()
    }
    if (isAdminProtectedRoute) {
      return NextResponse.redirect(new URL(newAdminLoginUrl, req.url));
    }
    if (isUserProtectedRoute) {
      return NextResponse.redirect(newLoginUrl);
    }
    return NextResponse.next();
  }

  try {
    const session = await decrypt(cookie);
    if (!session || !session?.token) {
      if (isAdminProtectedRoute) {
        return NextResponse.redirect(new URL(newAdminLoginUrl, req.url));
      }
      if (isUserProtectedRoute) {
        return NextResponse.redirect(newLoginUrl);
      }
    }

    if (isPublicRoute) {
      if (session?.is_admin) {
        if (
          path === '/admin/accounts/login' ||
          path === '/admin/accounts/register'
        ) {
          return NextResponse.redirect(
            new URL('/admin/dashboard/elections', req.url)
          );
        }
      } else {
        if (path === `/login/${dynamicId}` ) {
          return NextResponse.redirect(new URL(`/vote/${dynamicId}`, req.url));
        }
      }
      return NextResponse.next();
    }

    if (isAdminProtectedRoute && !session?.is_admin) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    if (isUserProtectedRoute && session?.is_admin) {
      return NextResponse.redirect(
        new URL('/admin/dashboard/elections', req.url)
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error decrypting session:', error);
    if (isAdminProtectedRoute) {
      return NextResponse.redirect(new URL(newAdminLoginUrl, req.url));
    }
    if (isUserProtectedRoute) {
      return NextResponse.redirect(newLoginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
