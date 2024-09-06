'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormState, useFormStatus } from 'react-dom';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useEffect, useTransition } from 'react';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { VoterLoginFormSchema } from '@/lib/definitions';
import { login } from '@/app/actions/voters/auth';
import { useAppContext } from '@/hooks/app-hook';
import { SubmitBtn } from '../submit-btn';

function ErrorMessage({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return <>{!pending && <>{children}</>}</>;
}

export function VoterLoginForm({ collection_id }: { collection_id: string | undefined }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { setEmail, setCollectionId } = useAppContext();
  const [state, formAction] = useFormState(login, {
    success: false,
    details: '',
    code: '',
    errors: {
      email: undefined,
    },
    data: undefined,
  });
  const form = useForm<z.infer<typeof VoterLoginFormSchema>>({
    resolver: zodResolver(VoterLoginFormSchema),
    defaultValues: {
      email: '',
    },
  });

  useEffect(() => {
    // if (!state || !state.data?.email) {
    //   console.log('No state or collection_id', state);
    //   return;
    // }
    if (state.details) {
      if (state.success && state.data?.email && collection_id) {
        setCollectionId(collection_id);
        setEmail(state.data?.email);
        console.log(state.data.email);
        toast.info(
          'Please verify your email to continue (Do not refresh the page)'
        );
        router.push('/verify');
        return;
      } else {
        toast.error(state.details);
      }
    }
  }, [state, router, collection_id]);


  async function onSubmit(values: z.infer<typeof VoterLoginFormSchema>) {
    if (!collection_id) {
      toast.error(
        'Collection ID is not found. Please check your email for the correct link.'
      );
      return;
    }
    startTransition(async () => {
      await formAction({ email: values.email, collection_id });
    });
    console.log(values);
  }

  return (
    <Card className="w-full max-w-2xl shadow-none rounded-none border-none bg-transparent">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              Sign in with your student email
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        name="email"
                        placeholder="bukolaawele@student.oauife.edu.ng"
                        className="h-9 md:h-11 px-5 placeholder:text-muted-foreground rounded-xl"
                        required
                      />
                    </FormControl>
                    <FormDescription>
                      This is your student email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitBtn isPending={isPending} className="h-9 md:h-11 rounded-xl">
              Login
            </SubmitBtn>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
