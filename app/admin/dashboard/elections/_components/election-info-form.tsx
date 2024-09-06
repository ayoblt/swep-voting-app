'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useElectionFormContext } from '@/hooks/election-form-hook';
import { NextButton, SubmitNextButton } from './step-buttons';

const formSchema = z.object({
  title: z.string().min(2).max(50),
  startDate: z.string().date('Invalid date!'),
  endDate: z.string().date('Invalid date!'),
  startTime: z.string(),
  endTime: z.string(),
});

const ElectionInfoForm = () => {
  const { currentStep, electionFormState, updateElectionInfo, nextStep } =
    useElectionFormContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: electionFormState.electionInfo.title || '',
      startDate: electionFormState.electionInfo.startDate || '',
      endDate: electionFormState.electionInfo.endDate || '',
      startTime: electionFormState.electionInfo.startTime || '',
      endTime: electionFormState.electionInfo.endTime || '',
    },
  });

  if (currentStep !== 1) return null;

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateElectionInfo({ ...values });
    nextStep();

    // console.log(values);
  }
  return (
    <Card className="flex-1 bg-card max-md:border-x-0 max-md:shadow-none p-4 md:p-8 max-md:rounded-none">
      <CardHeader>
        <CardTitle>Election Info</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Election Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg. SUB Election"
                      {...field}
                      className="py-6"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid lg:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="13/08/2024"
                        {...field}
                        type="date"
                        className="py-6"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="13/08/2024"
                        {...field}
                        type="date"
                        className="py-6 flex justify-between"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="13/08/2024"
                        {...field}
                        type="time"
                        className="py-6"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="13/08/2024"
                        {...field}
                        type="time"
                        className="py-6"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <CardFooter className="">
              <SubmitNextButton />
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ElectionInfoForm;
