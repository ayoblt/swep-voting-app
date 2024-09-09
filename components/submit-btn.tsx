'use client';

import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import Spinner from './icons/spinner';

export function SubmitBtn({
  pending,
  className,
    children
}: {
  pending?: boolean;
  className?: string;
  children: React.ReactNode;
}) {

  // console.log(pending);
  return (
    <Button
      className={cn(
        'w-full h-11 md:h-14 font-bold text-base bg-secondary dark:bg-primary hover:dark:bg-primary/80 text-white hover:bg-secondary/90',
        className
      )}
      type="submit"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? <Spinner className="w-7 h-7" /> : <>{children}</>}
    </Button>
  );
}
