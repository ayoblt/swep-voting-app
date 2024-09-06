'use client';

import { AppStatecontextType } from '@/lib/definitions';
import { createContext } from 'react';

export const AppContext = createContext<AppStatecontextType | undefined>(
  undefined
);
