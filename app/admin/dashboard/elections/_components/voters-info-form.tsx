'use client';

import { useElectionFormContext } from '@/hooks/election-form-hook';
import { MAX_FILE_SIZE } from '@/lib/definitions';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import DownloadIcon from '@/components/icons/download';
import { NextButton, PrevButton, SubmitNextButton } from './step-buttons';

const votersInfoSchema = z.object({
  votersFile:
    typeof window === 'undefined'
      ? z.any()
      : z
          .instanceof(FileList)
          .optional()
          .refine((file) => {
            const firstItem = file?.item?.(0);
            if (firstItem) {
              const fileType = firstItem.name.split('.').pop();
              return fileType === 'csv';
            }
            return true;
          }, 'File must be a .csv file.')
          .refine((file) => {
            const firstItem = file?.item?.(0);
            if (firstItem) return firstItem.size <= MAX_FILE_SIZE;
            return true;
          }, 'Max size is 3MB.'),
});

const VoterInfoForm: React.FC = () => {
  const { currentStep, electionFormState, updateVoterInfo, nextStep } =
    useElectionFormContext();

  const form = useForm<z.infer<typeof votersInfoSchema>>({
    resolver: zodResolver(votersInfoSchema),
  });

  const votersFileRef = form.register('votersFile');

  if (currentStep !== 2) return null;

  const onSubmit = (values: z.infer<typeof votersInfoSchema>) => {
    const votersFile = values.votersFile?.item?.(0) as File;

    if (votersFile) {
      updateVoterInfo({ votersFile });
    } else if (electionFormState.voterInfo.votersFile) {
      nextStep();
    } else {
      form.setError('votersFile', {
        type: 'manual',
        message: 'Voters file is required',
      });
      return;
    }

    nextStep();
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="flex-1 max-md:border-x-0 max-md:shadow-none p-6 md:p-8 max-md:rounded-none space-y-8 md:space-y-12">
            <CardHeader className="">
              <CardTitle className="text-xl">Add Voters</CardTitle>
            </CardHeader>
            <CardContent className="h-full sm:w-5/6 md:w-full lg:w-3/4 mx-auto bg-muted dark:bg-background rounded-lg p-8 sm:p-10 md:p-6 lg:p-10">
              <FormField
                control={form.control}
                name="votersFile"
                render={({ field: { value, ...field } }) => (
                  <FormItem className="h-full space-y-5">
                    <FormLabel className="text-sm text-gray-500">
                      Upload File containing Email Addresses
                    </FormLabel>

                    <Label
                      htmlFor="votersFileInput"
                      className={cn(
                        'cursor-pointer py-6 flex flex-col gap-y-4 items-center h-40 justify-center border-2 border-dashed border-primary rounded-lg w-full'
                      )}
                    >
                      <DownloadIcon className="h-6 w-6 text-primary" />
                      {value?.item?.(0)?.name ||
                        electionFormState.voterInfo.votersFile?.name ||
                        'Click Here to Upload Voters File'}
                    </Label>

                    <FormControl>
                      <Input
                        type="file"
                        {...votersFileRef}
                        id="votersFileInput"
                        className="hidden"
                        accept=".csv, .xlsx"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="w-full max-lg:px-0">
              <PrevButton />
              <SubmitNextButton />
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default VoterInfoForm;
