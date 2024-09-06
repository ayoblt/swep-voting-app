import { useFormStatus } from 'react-dom';

export function ErrorMessage({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return <>{!pending && <>{children}</>}</>;
}
