import 'server-only';

import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { cache } from 'react';

const NEXT_PUBLIC_API_HOSTNAME = process.env.NEXT_PUBLIC_API_HOSTNAME;

export const verifySession = cache(async () => {
  const session = await getSession();
  console.log('session', session);
  // const isAdminProtectedRoute = adminProtectedRoutes.some((route) =>
  //   path.startsWith(route)
  // );
  //   const isUserProtectedRoute = userProtectedRoutes.some((route) =>
  //     path.startsWith(route)
  //   );
  //   const isAdminAccessiblePublicRoute = userProtectedRoutes.some((route) =>
  //     path.startsWith(route)
  //   );

  if (!session?.token) {
    // isAdminProtectedRoute ? '/admin/accounts/login' :
    const loginUrl = '/login';
    redirect(loginUrl);
  }

  return { isAuth: true, token: session.token, is_admin: session.is_admin };
});

export const getAllCollection = async () => {
  try {
    const session = await verifySession();

    if (!session || !session.token) {
      throw new Error('Invalid session or missing token');
    }

    const response = await fetch(
      `${NEXT_PUBLIC_API_HOSTNAME}/api/manage/collection/fetch/all`,
      {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseJSON = await response.json();
    // console.log('response', responseJSON.data.collections);
    return responseJSON.data.collections;
  } catch (error) {
    console.error('Error fetching collection:', error);

    return null;
  }
};
export const getCollection = async (collectionId: string) => {
  const session = await verifySession();
  const response = await fetch(
    `${NEXT_PUBLIC_API_HOSTNAME}/api/manage/collection/fetch?collection_id=${collectionId}`,
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );
  return response.json();
};

export const checkCollectionExists = async (collectionId: string) => {
  const response = await fetch(
    `${NEXT_PUBLIC_API_HOSTNAME}/api/voters/collection-exists?collection_id=${collectionId}`
  );
  const data = await response.json();
  // console.log('data', data);
  return data;
};

export const getVotersCollection = async (collection_id: string) => {
  try {
    console.log('something');
    const session = await verifySession();
    console.log('session', session);
    const response = await fetch(
      `${NEXT_PUBLIC_API_HOSTNAME}/api/voters/fetch-collection?collection_id=${collection_id}`,
      {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }
    );
    console.log(session.token);

    if (!response.ok) {
      console.log('response', response);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseJSON = await response.json();
    console.log('response', responseJSON);
    return responseJSON.data;
  } catch (error) {
    console.error('Error fetching collection:', error);
  }
};
