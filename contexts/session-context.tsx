// 'use client';
//
// import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import {verifySession} from "@/lib/dal";
//
//
// interface SessionData {
//   isAuth: boolean;
//   token?: string;
//   is_admin?: boolean;
// }
//
//
// interface SessionContextProps {
//   session: SessionData | null;
//   loading: boolean;
// }
//
//
// const SessionContext = createContext<SessionContextProps>({
//   session: null,
//   loading: true,
// });
//
// // Create a custom hook to use the SessionContext
// export const useSession = () => {
//   return useContext(SessionContext);
// };
//
// // Create the Provider component
// export const SessionProvider = ({ children }: { children: ReactNode }) => {
//   const [session, setSession] = useState<SessionData | null>(null);
//   const [loading, setLoading] = useState(true);
//
//   useEffect(() => {
//     const fetchSession = async () => {
//       try {
//         const {isAuth, token, is_admin} = await verifySession();
//
//         setSession({isAuth, token, is_admin});
//       } catch (error) {
//         console.error('Error fetching session:', error);
//         setSession(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//
//     fetchSession();
//   }, []);
//
//   return (
//     <SessionContext.Provider value={{ session, loading }}>
//       {children}
//     </SessionContext.Provider>
//   );
// };
