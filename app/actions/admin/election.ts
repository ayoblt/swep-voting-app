'use server';

import { verifySession } from '@/lib/dal';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
// "Google Sans Text", Roboto, sans-serif

const NEXT_PUBLIC_API_HOSTNAME = process.env.NEXT_PUBLIC_API_HOSTNAME;

export async function createElection(state: any, formData: FormData) {
  const { token } = await verifySession();
  // console.log(token);
  if (!NEXT_PUBLIC_API_HOSTNAME) {
    console.error('API Hostname is not defined.');
    return {
      success: false,
      code: 'SERVER_ERROR',
      details: 'API Hostname is not configured.',
    };
  }
  //   const collection = formData.get('collection');

  //   console.log(collection);
  // console.log(formData);

  try {
    const response = await fetch(
      `${NEXT_PUBLIC_API_HOSTNAME}/api/manage/collection/create`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Verify API Error:', errorData);

      return {
        success: false,
        code: 'INVALID_CREDENTIALS',
        details: errorData.message,
        errors: errorData.data.errors || undefined,
      };
    }

    const responseData = await response.json();
    revalidatePath('/admin/dashboard/elections');

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
