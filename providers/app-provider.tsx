'use client';

import { AppContext } from '@/contexts/app-context';
import { AppState } from '@/lib/definitions';
import {useEffect, useState} from 'react';

// Create the provider component
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // const [email, setEmail] = useState<string | null>(null);
  const [appState, setAppState] = useState<AppState>({
    email: '',
    collection_id: '',
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem('user_email');
    const storedCollectionId = localStorage.getItem('collection_id');

    if (storedEmail || storedCollectionId) {
      setAppState({
        email: storedEmail || '',
        collection_id: storedCollectionId || '',
      });
    }
  }, []);

  const setEmail = (email: string) => {
    setAppState((prevState) => {
      const newState = {...prevState, email}
      localStorage.setItem('user_email', email);
      return newState
    });
  };


  const setCollectionId = (collection_id: string) => {
    setAppState((prevState) => {
      const newState = {...prevState, collection_id}
      localStorage.setItem('collection_id', collection_id);
      return newState
    });
  };

  const clearUserDetails = () => {
    setAppState((prevState) => {
      const newState = {...prevState, collection_id: "", email: ""}
      localStorage.removeItem('collection_id');
      localStorage.removeItem('user_email');
      return newState
    });
  };

  const { email, collection_id } = appState;
  const value = {
    email,
    setEmail,
    collection_id,
    setCollectionId,
    clearUserDetails
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
