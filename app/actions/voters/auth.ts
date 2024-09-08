'use server';

import {
  NEXT_PUBLIC_API_HOSTNAME,
  VoterFormState,
  VoterLoginFormSchema,
  VoterVerifyFormState,
} from '@/lib/definitions';
import { createSession } from '@/lib/session';
import {redirect} from "next/navigation";
// "Google Sans Text", Roboto, sans-serif

export async function login(
  state: VoterFormState,
  { email, collection_id }: { email: string; collection_id: string }
) {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  if (!NEXT_PUBLIC_API_HOSTNAME) {
    console.error('API Hostname is not defined.');
    return {
      success: false,
      details: 'API Hostname is not configured.',
    };
  }

  const validatedFields = VoterLoginFormSchema.safeParse({
    email,
  });
  // console.log({ email, collection_id });

  if (!validatedFields.success)
    return {
      success: false,
      code: 'VALIDATION_ERROR',
      errors: validatedFields.error.flatten().fieldErrors,
      details: 'Email validation unsuccessful',
    };

  const response = await fetch(
      `${NEXT_PUBLIC_API_HOSTNAME}/api/voters/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, collection_id }),
      }
    );

    // console.log(JSON.stringify({ email, collection_id }));

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      return {
        success: false,
        details: errorData.message,
      };
    }

    const data = await response.json();

    return {
      success: true,
      details: `${data.message}. Please verify your email to continue`,
      data: {
        email,
      },
    };
}

export async function verify(state: VoterVerifyFormState, formData: FormData) {
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
  const collection_id = formData.get('collection_id')?.toString();

  if (!email || !code || !collection_id) {
    return {
      success: false,
      code: 'INVALID_CREDENTIALS',
      details: 'Code Invalid',
    };
  }

  const response = await fetch(
      `${NEXT_PUBLIC_API_HOSTNAME}/api/voters/verify-code`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, collection_id, code: parseInt(code) }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Voters Verify API Error:', errorData);
      return {
        success: false,
        code: 'INVALID_CREDENTIALS',
        details: errorData.message,
      };
    }

    const responseData = await response.json();
    // console.log(responseData);

    const token = responseData.data.token;
    const exp = parseInt(responseData.data.expires_in);
    const is_admin = !responseData.data.is_voter;
    // console.log(exp);

    await createSession(token, is_admin, exp);
    // console.log('Created session');

    redirect(`/vote/${collection_id}`)
}
