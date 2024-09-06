'use client';

import { AppContext } from '@/contexts/app-context';
import { useContext } from 'react';

// Custom hook for using the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
