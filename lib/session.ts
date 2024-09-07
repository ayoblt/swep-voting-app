import 'server-only';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

import { SessionPayload } from '@/lib/definitions';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    // console.log('Failed to verify session');
  }
}

export async function createSession(
  token: string,
  is_admin: boolean,
  exp: number
) {
  try {
    const session = await encrypt({ token, is_admin, exp });

    if (!session) {
      throw new Error('Failed to encrypt session data.');
    }

    const now = new Date();
    const expirationDate = new Date(now.getTime() + exp * 1000);
    // console.log(expirationDate);

    cookies().set('session', session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: expirationDate,
      sameSite: 'lax',
      path: '/',
    });

    // console.log('Cookies set successfully');
  } catch (error) {
    console.error('Error setting session cookie:', error);
  } finally {
    const cookie = cookies().get('session')?.value;
    // console.log('cookie', cookie);
  }
}

export async function updateSession() {
  const session = cookies().get('session')?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
}

export function logout() {
  cookies().set('session', '', { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}

// export async function login(username: string, password: string) {

// const response = await ()
//   // Create the session
//   const expires = new Date(Date.now() + 10 * 1000);

//   // Save the session in a cookie
//   cookies().set('session', session, { expires, httpOnly: true });
// }
