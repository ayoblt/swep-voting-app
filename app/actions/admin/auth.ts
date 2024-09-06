'use server';

import {
  AdminLoginFormState,
  AdminRegisterFormSchema,
  AdminRegisterFormState,
  AdminVerifyFormState,
} from '@/lib/definitions';
import { createSession } from '@/lib/session';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
// "Google Sans Text", Roboto, sans-serif

const NEXT_PUBLIC_API_HOSTNAME = process.env.NEXT_PUBLIC_API_HOSTNAME;
// console.log(NEXT_PUBLIC_API_HOSTNAME);

export async function register(
  state: AdminRegisterFormState,
  formData: FormData
) {
  if (!NEXT_PUBLIC_API_HOSTNAME) {
    console.error('API Hostname is not defined.');
    return {
      success: false,
      details: 'API Hostname is not configured.',
    };
  }

  const email = formData.get('email')?.toString().toLowerCase() || '';
  const password = formData.get('password')?.toString() || '';

  const validatedFields = AdminRegisterFormSchema.safeParse({
    email,
    password,
  });
  // console.log('something');
  if (!validatedFields.success)
    return {
      success: false,
      errors: {
        ...validatedFields.error.flatten().fieldErrors,
      },
      details: 'Email and password validation unsuccessful',
    };

  try {
    const response = await fetch(
      `${NEXT_PUBLIC_API_HOSTNAME}/api/manage/account/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      return {
        success: false,
        details: errorData.message,
      };
    }

    const data = await response.json();
    // console.log('Registration successful:', data);

    return {
      success: true,
      details: data.message,
      data: {
        email,
      },
    };
  } catch (error) {
    console.error('Error during registration:', error);
    return {
      success: false,
      details: 'An unexpected error occurred. Please try again.',
    };
  }
}

export async function signin(state: AdminLoginFormState, formData: FormData) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  if (!NEXT_PUBLIC_API_HOSTNAME) {
    console.error('API Hostname is not defined.');
    return {
      success: false,
      code: 'SERVER_ERROR',
      details: 'API Hostname is not configured.',
    };
  }

  const email = formData.get('email')?.toString().toLowerCase();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return {
      success: false,
      code: 'INVALID_CREDENTIALS',
      details: 'Both email and password is required',
    };
  }
  let redirectPath: string | null = null;
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_API_HOSTNAME}/api/manage/account/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login API Error:', errorData);
      return {
        success: false,
        code: 'INVALID_CREDENTIALS',
        details: errorData.message,
      };
    }
    // console.log('Login API response:', response);

    const responseData = await response.json();
    // console.log('Login successful:', responseData);

    const token = responseData.data.token;
    const exp = parseInt(responseData.data.expires_in);
    const is_admin = responseData.data.is_admin;

    // console.log({ token, exp, is_admin });

    await createSession(token, is_admin, exp);

    redirectPath = '/admin/dashboard/elections';
  } catch (error) {
    console.error('Network or Server error:', error);
    return {
      success: false,
      code: 'SERVER_ERROR',
      details: 'A network error occurred. Please try again later.',
    };
  } finally {
    if (redirectPath) {
      redirect('/admin/dashboard/elections');
    }
  }
}

export async function verify(state: AdminVerifyFormState, formData: FormData) {
  if (!NEXT_PUBLIC_API_HOSTNAME) {
    console.error('API Hostname is not defined.');
    return {
      success: false,
      code: 'SERVER_ERROR',
      details: 'API Hostname is not configured.',
    };
  }
  const email = formData.get('email')?.toString().toLowerCase();
  const code = formData.get('code')?.toString();

  if (!email || !code) {
    return {
      success: false,
      code: 'INVALID_CREDENTIALS',
      details: 'Code Invalid',
    };
  }

  try {
    const response = await fetch(
      `${NEXT_PUBLIC_API_HOSTNAME}/api/manage/account/verify`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code: parseInt(code) }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Verify API Error:', errorData);
      return {
        success: false,
        code: 'INVALID_CREDENTIALS',
        details: errorData.message,
      };
    }

    const responseData = await response.json();

    return {
      success: true,
      details: responseData.message,
    };
  } catch (error) {
    console.error('Network or Server error:', error);
    return {
      success: false,
      code: 'SERVER_ERROR',
      details: 'A network error occurred. Please try again later.',
    };
  }
}

export async function logout() {
  cookies().set('session', '', { expires: new Date(0) });

  redirect('/admin/accounts/login');
}
