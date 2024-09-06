'use client';

import { ElectionFormContextType } from '@/lib/definitions';
import { createContext } from 'react';

export const ElectionFormContext = createContext<
  ElectionFormContextType | undefined
>(undefined);
