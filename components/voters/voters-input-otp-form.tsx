'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAppContext } from '@/hooks/app-hook';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { useFormState } from 'react-dom';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';
import { ErrorMessage } from '../error-message';
import { SubmitBtn } from '../submit-btn';
import { useEffect, useTransition } from 'react';
import { verify } from '@/app/actions/voters/auth';

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});

export function VoterInputOTPForm() {
  const [isPending, startTransition] = useTransition();
  const { email, collection_id } = useAppContext();
  const [state, formAction] = useFormState(verify, {
    success: false,
    details: '',
    code: '',
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: '',
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (state.details) {
      if (state.success) {
        toast.success('Login successful');
        // console.log('something');
          router.push(`/vote/${collection_id}`);
      }
    }
  }, [state.details, state.success, router, collection_id]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = new FormData();

    if (!collection_id) {
      toast.error('Invalid Election Link. Please check the link again.');
      return;
    }

    if (!email) {
      toast.error(
        'An error occurred! We could not make out the email. Please login again.'
      );
      return;
    }


    formData.append('code', data.pin);
    formData.append('email', email);
    formData.append('collection_id', collection_id);
    startTransition(async () => {
      await formAction(formData);
    });
  }

  return (
    <Card className="w-full max-w-md shadow-none rounded-none border-none bg-transparent p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <CardHeader className="mb-7 px-0">
            <CardTitle className="text-3xl md:text-4xl font-bold">
              Verify your Account
            </CardTitle>
            <ErrorMessage>
              {!state.success && state.code === 'INVALID_CREDENTIALS' && (
                <CardDescription className="flex gap-x-2 items-center text-destructive px-3 py-1 bg-destructive/10 rounded-lg">
                  <ExclamationTriangleIcon className="mr-2" />
                  {state.details}
                </CardDescription>
              )}
            </ErrorMessage>

            <CardDescription className="text-muted-foreground md:text-base">
              Please enter the one-time code sent to your phone.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 px-0">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the 6-digit code sent to your phone.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <SubmitBtn isPending={isPending} className="h-9 md:h-11 rounded-xl">
            Verify
          </SubmitBtn>
        </form>
      </Form>
    </Card>
  );
}
