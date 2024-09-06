'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormState, useFormStatus } from 'react-dom';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Checkbox } from '../ui/checkbox';
import { signin } from '@/app/actions/admin/auth';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { SubmitBtn } from '../submit-btn';
function ErrorMessage({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return <>{!pending && <>{children}</>}</>;
}

export function AdminSigninForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(signin, {
    success: false,
    details: '',
    code: '',
  });

  useEffect(() => {
    if (!state) {
      return;
    }
    if (state.details) {
      if (state.success) {
        toast.success(state.details);
      } else {
        toast.error(state.details);
      }
    }
  }, [state, router]);
  return (
    <Card className="w-full max-w-md shadow-none rounded-none border-none bg-transparent">
      <form action={formAction}>
        <CardHeader className="mb-7">
          <CardTitle className="text-3xl md:text-4xl font-bold">
            Sign in
          </CardTitle>
          <ErrorMessage>
            {!state?.success && state?.code === 'INVALID_CREDENTIALS' && (
              <CardDescription className="flex gap-x-2 items-center text-destructive px-3 py-1 bg-destructive/10 rounded-lg">
                <ExclamationTriangleIcon className="mr-2" />
                {state.details}
              </CardDescription>
            )}
          </ErrorMessage>

          <CardDescription className="text-muted-foreground md:text-base">
            Enter your email and password to sign in!
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-4">
            <Label className="font-medium" htmlFor="email">
              Email*
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="admin@admin.oauife.edu.ng"
              className="h-11 md:h-[3.125rem] px-5 placeholder:text-muted-foreground"
              required
            />
          </div>
          <div className="grid gap-4">
            <Label className="font-medium" htmlFor="password">
              Password*
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              className="h-11 md:h-[3.125rem] px-5 placeholder:text-muted-foreground"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms1"
                className="rounded data-[state=checked]:dark:bg-primary dark:text-white text-white data-[state=checked]:bg-secondary border-secondary"
              />
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Keep me signed in
              </label>
            </div>
            <div>
              <Link
                href="/admin/accounts/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitBtn>Login</SubmitBtn>
        </CardFooter>
        <CardFooter>
          <p>
            Not registered yet? &nbsp;
            <Link
              href="/admin/accounts/register"
              className="font-bold hover:underline underline-offset-4"
            >
              Create an Account
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
