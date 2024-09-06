'use client';

import { AppContext } from '@/contexts/app-context';
import { AppState } from '@/lib/definitions';
import { useState } from 'react';

// Create the provider component
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // const [email, setEmail] = useState<string | null>(null);
  const [appState, setAppState] = useState<AppState>({
    email: '',
    collection_id: '',
  });

  const setEmail = (email: string) => {
    setAppState((prevState) => ({
      ...prevState,
      email,
    }));
  };

  const { email, collection_id } = appState;

  const setCollectionId = (collection_id: string) => {
    setAppState((prevState) => ({
      ...prevState,
      collection_id,
    }));
  };

  const value = {
    email,
    setEmail,
    collection_id,
    setCollectionId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
