'use client';

import { ElectionFormContext } from '@/contexts/election-form-context';
import { useContext } from 'react';

export const useElectionFormContext = () => {
  const context = useContext(ElectionFormContext);
  if (context === undefined) {
    throw new Error(
      'useElectionFormContext must be used within an ElectionFormProvider'
    );
  }
  return context;
};
