'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useElectionFormContext } from '@/hooks/election-form-hook';
import { ImageSchema, MAX_FILE_SIZE } from '@/lib/definitions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import DownloadIcon from '@/components/icons/download';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DataTable } from '@/components/ui/data-table';
import { NextButton, PrevButton } from './step-buttons';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

const formSchema = z.object({
  name: z.string().min(1, { message: 'name is required' }).max(100),
  position: z.string().min(1, { message: 'position is required' }),
  image: ImageSchema,
});

type Candidate = {
  id: number;
  name: string;
  positionId: number | null;
  image: File | null;
};

const DeleteCandidateDialog = (candidate: Candidate) => {
  const [open, setOpen] = useState(false);

  const { removeCandidate } = useElectionFormContext();

  function handleDelete() {
    removeCandidate(candidate.id);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer" asChild>
        <TrashIcon className="h-5 w-5 text-destructive" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete candidate</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            selected candidate.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="mr-4" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const EditCandidateDialog = (candidate: Candidate) => {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');

  const editCandidateSchema = z.object({
    name: z.string().max(50).trim(),
    position: z.string().trim(),
    image: ImageSchema,
  });

  const form = useForm<z.infer<typeof editCandidateSchema>>({
    resolver: zodResolver(editCandidateSchema),
    defaultValues: {
      name: candidate.name,
      position: '' + candidate.positionId,
      image: candidate.image,
    },
  });
  const { updateCandidateInfo, electionFormState } = useElectionFormContext();
  const imageUpdateInputRef = form.register('image');
  const imageFileList = form.watch('image');

  useEffect(() => {
    if (imageFileList && imageFileList.length > 0) {
      const file = imageFileList[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      return () => {
        URL.revokeObjectURL(previewUrl);
        setImagePreview('');
      };
    } else {
      if (candidate.image) {
        const previewUrl = URL.createObjectURL(candidate.image);
        setImagePreview(previewUrl);

        return () => {
          URL.revokeObjectURL(previewUrl);
          setImagePreview('');
        };
      }
    }
  }, [imageFileList, candidate.image]);

  useEffect(() => {
    if (!open)
      form.reset({
        name: candidate.name,
        position: '' + candidate.positionId,
        image: candidate.image,
      });
  }, [open, candidate, form]);

  function onSubmit(values: z.infer<typeof editCandidateSchema>) {
    const imageFile = values.image?.item?.(0) as File;
    const updatedPositionId =
      values.position === '0' ? 0 : parseInt(values.position);


    const updateData: Partial<Candidate> = {
      id: candidate.id,
      name: values.name || candidate.name,
      image: imageFile || candidate.image,
    };


    if (updatedPositionId !== candidate.positionId) {
      updateData.positionId = updatedPositionId;
    }

    updateCandidateInfo(updateData);
    // console.log('electionFormState', electionFormState);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer" asChild>
        <Pencil2Icon className="h-5 w-5 text-gray-500" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit Candidate</DialogTitle>
              <DialogDescription>
                Make changes to Candidate&apos;s data. Click save when you are
                done.
              </DialogDescription>
            </DialogHeader>

            <div className="grid py-4">
              <div className="grid items-center gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Candidate&apos;s Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="py-6 col-span-3" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid items-center gap-4">
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value || ''}
                      >
                        <FormControl>
                          <SelectTrigger className="py-6 placeholder:text-muted-foreground">
                            <SelectValue placeholder="Select a positon for candidate" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {electionFormState.positions.map((position) => (
                            <SelectItem
                              key={position.id}
                              value={'' + position.id}
                            >
                              {position.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid items-center gap-4">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { value, ...field } }) => (
                    <FormItem className="h-full space-y-5">
                      <FormLabel className="text-sm text-gray-500">
                        Update Candidate&apos;s image
                      </FormLabel>

                      <Label
                        htmlFor="imageUpdateInput"
                        className={cn(
                          'cursor-pointer py-6 flex flex-col gap-y-4 items-center h-40 justify-center border-2 border-dashed border-primary rounded-lg w-full'
                        )}
                      >
                        {imagePreview ? (
                          <div className="h-40 grid place-content-center overflow-hidden">
                            <Image
                              src={imagePreview}
                              alt="Candidate Preview"
                              width={160}
                              height={160}
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <>
                            <DownloadIcon className="h-6 w-6 text-primary" />
                            {value?.item?.(0)?.name ||
                              'Click Here to Upload Candidate Image'}
                          </>
                        )}
                      </Label>

                      <FormControl>
                        <Input
                          type="file"
                          {...imageUpdateInputRef}
                          id="imageUpdateInput"
                          className="hidden"
                          accept="image/*"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export const CandidatePosition = ({ positionId }: { positionId: number | null }) => {
  const { electionFormState } = useElectionFormContext();
  const position = electionFormState.positions.find((p) => p.id === positionId);
  if (!position) return 'No position';
  return <div className="font-medium">{`${position?.title}`}</div>;
};

const columns: ColumnDef<Candidate>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'positionId',
    header: 'Position',
    cell: ({ row }) => {
      const candidate = row.original;

      return <CandidatePosition positionId={candidate.positionId} />;
    },
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const candidate = row.original;

      return <div className="font-medium">{`${candidate.image?.name}`}</div>;
    },
  },
  {
    id: 'edit',
    cell: ({ row }) => {
      const candidate = row.original;
      // console.log(candidate);

      return <EditCandidateDialog {...candidate} />;
    },
  },
  {
    id: 'delete',
    cell: ({ row }) => {
      const candidate = row.original;

      return <DeleteCandidateDialog {...candidate} />;
    },
  },
];

const CandidatesForm = () => {
  const { currentStep, electionFormState, addCandidate, setCurrentStep } =
    useElectionFormContext();
  const [imagePreview, setImagePreview] = useState<string>('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      position: '',
      image: null,
    },
  });

  const imageInputRef = form.register('image');

  const imageFileList = form.watch('image');

  useEffect(() => {
    if (imageFileList && imageFileList.length > 0) {
      const file = imageFileList[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);


      return () => {
        URL.revokeObjectURL(previewUrl);
        setImagePreview('');
      };
    }
  }, [imageFileList]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const imageFile = values.image?.item?.(0) as File;
    // console.log(values);

    if (imageFile) {
      addCandidate({
        name: values.name,
        positionId: parseInt(values.position),
        image: imageFile,
      });
    } else {
      // console.log('no image');
      form.setError('image', {
        type: 'manual',
        message: 'Candidate Image is required',
      });
      return;
    }
    form.setValue('position', '');
    form.reset({ name: '', image: null, position: '' });
  }
  if (currentStep !== 4) return null;
  return (
    <Card className="flex-1 bg-card max-md:border-x-0 max-md:shadow-none p-4 md:p-8 max-md:rounded-none">
      <CardHeader>
        <CardTitle>Add Candidates</CardTitle>
      </CardHeader>
      <CardContent className=" overflow-auto relative">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Candidate&apos;s Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg. Dr. Bush"
                      {...field}
                      className="py-6"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value || ''}
                  >
                    <FormControl>
                      <SelectTrigger className="py-6 placeholder:text-muted-foreground">
                        <SelectValue placeholder="Select a positon for candidate" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {electionFormState.positions.map((position) => (
                        <SelectItem key={position.id} value={'' + position.id}>
                          {position.title}
                        </SelectItem>
                      ))}
                      <Separator className="my-2" />
                      <Button
                        className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-white"
                        onClick={() => setCurrentStep(3)}
                      >
                        Add New Position
                      </Button>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="sm:w-5/6 md:w-full lg:w-3/4 mx-auto bg-muted dark:bg-background rounded-lg p-8 sm:p-10 md:p-6 lg:p-10">
              <FormField
                control={form.control}
                name="image"
                render={({ field: { value, ...field } }) => (
                  <FormItem className="h-full space-y-5">
                    <FormLabel className="text-sm text-gray-500">
                      Upload Candidate&apos;s image
                    </FormLabel>

                    <Label
                      htmlFor="imageInput"
                      className={cn(
                        'cursor-pointer py-6 flex flex-col gap-y-4 items-center h-40 justify-center border-2 border-dashed border-primary rounded-lg w-full',
                        imagePreview && 'py-0'
                      )}
                    >
                      {imagePreview ? (
                        <div className="h-40 grid place-content-center overflow-hidden">
                          <Image
                            src={imagePreview}
                            alt="Candidate Preview"
                            width={160}
                            height={160}
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <>
                          <DownloadIcon className="h-6 w-6 text-primary" />
                          {value?.item?.(0)?.name ||
                            'Click Here to Upload Candidate Image'}
                        </>
                      )}
                    </Label>
                    <FormControl>
                      <Input
                        type="file"
                        {...imageInputRef}
                        id="imageInput"
                        className="hidden"
                        accept="image/*"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="p-0">
              <Button type="submit">Add Candidate</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
      <div className="h-72 overflow-auto custom-scroll relative">
        <DataTable columns={columns} data={electionFormState.candidates} />
      </div>
      <CardFooter>
        <PrevButton />
        <NextButton />
      </CardFooter>
    </Card>
  );
};

export default CandidatesForm;
