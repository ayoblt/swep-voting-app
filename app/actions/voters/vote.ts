'use server';

import { verifySession } from '@/lib/dal';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import {Payload} from "@/lib/definitions";
import {logout} from "@/lib/session";
// "Google Sans Text", Roboto, sans-serif

const NEXT_PUBLIC_API_HOSTNAME = process.env.NEXT_PUBLIC_API_HOSTNAME;



export async function submitVotes(state: any, payload: Payload) {
  const { token } = await verifySession();
  console.log("submitting form")

  // console.log(token);
  // console.log(JSON.stringify(payload))
  if (!NEXT_PUBLIC_API_HOSTNAME) {
    console.error('API Hostname is not defined.');
    return {
      success: false,
      code: 'SERVER_ERROR',
      details: 'API Hostname is not configured.',
    };
  }

  const response = await fetch(
      `${NEXT_PUBLIC_API_HOSTNAME}/api/voters/submit-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );
// console.log(`/vote?collection-id=${payload.collection_id}`)
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Vote submission API Error:', errorData);

      return {
        success: false,
        code: 'INVALID_CREDENTIALS',
        details: errorData.message,
      };
    }

    logout()
    redirect("/vote/success")

}
