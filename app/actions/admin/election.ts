'use server';

import { verifySession } from '@/lib/dal';
import { redirect } from 'next/navigation';
import {NEXT_PUBLIC_API_HOSTNAME} from "@/lib/definitions";
import {revalidatePath} from "next/cache";
// "Google Sans Text", Roboto, sans-serif


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

  // const formDataObject = {};
  //   formData.forEach((value, key: string) => {
  //     formDataObject[key] = value;
  //   });
  // console.log("formDatatObject", formDataObject)
  //   const collection = formData.get('collection');

  //   console.log(collection);
  // console.log(formData);

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

    revalidatePath("/admin/dasboard/elections")
    redirect("/admin/dashboard/elections")
}
