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

import { useElectionFormContext } from '@/hooks/election-form-hook';
import { useEffect, useState } from 'react';
import { NextButton, PrevButton } from './step-buttons';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Pencil2Icon,
  ThickArrowDownIcon,
  ThickArrowUpIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Candidate } from '@/lib/definitions';
import { cn } from '@/lib/utils';

const positionFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Position Title is required' })
    .max(50)
    .trim(),
});

type Position = {
  id: number;
  title: string;
  candidates: Candidate[];
};

const DeletePositionDialog = (position: Position) => {
  const [open, setOpen] = useState(false);

  const { removePosition } = useElectionFormContext();

  function handleDelete() {
    removePosition(position.id);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer" asChild>
        <TrashIcon className="h-5 w-5 text-destructive" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete position</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            position and remove your position from associated Candidates.
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

const EditPositionDialog = (position: Position) => {
  const [open, setOpen] = useState(false);
  const editPositionFormSchema = z.object({
    title: z.string().max(50).trim(),
  });
  const form = useForm<z.infer<typeof editPositionFormSchema>>({
    resolver: zodResolver(editPositionFormSchema),
    defaultValues: {
      title: position.title,
    },
  });
  const { updatePositionInfo } = useElectionFormContext();

  useEffect(() => {
    if (!open) form.reset({ title: position.title });
  }, [open, position.title, form]);

  function onSubmit(values: z.infer<typeof editPositionFormSchema>) {
    // console.log(values);
    updatePositionInfo({
      id: position.id,
      title: values.title || position.title,
    });
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
              <DialogTitle>Edit position</DialogTitle>
              <DialogDescription>
                Enter new position title. Click save when you are done.
              </DialogDescription>
            </DialogHeader>

            <div className="grid py-4">
              <div className="grid items-center gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} className="py-6 col-span-3" />
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

const columns: ColumnDef<Position>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'candidates',
    header: () => (
      <div className="text-center flex items-center">Candidates</div>
    ),
    cell: ({ row }) => {
      const numberOfCandidates = row.original.candidates.length;

      return (
        <div className="font-medium">{`${numberOfCandidates} candidate${
          numberOfCandidates > 1 ? 's' : ''
        }`}</div>
      );
    },
  },
  {
    id: 'edit',
    cell: ({ row }) => {
      const position = row.original;
      // console.log(position);

      return <EditPositionDialog {...position} />;
    },
  },
  {
    id: 'delete',
    cell: ({ row }) => {
      const position = row.original;

      return <DeletePositionDialog {...position} />;
    },
  },
];

const PositionsForm = () => {
  const { currentStep, electionFormState, addPosition } =
    useElectionFormContext();
  const form = useForm<z.infer<typeof positionFormSchema>>({
    resolver: zodResolver(positionFormSchema),
    defaultValues: {
      title: '',
    },
  });

  if (currentStep !== 3) return null;

  function onSubmit(values: z.infer<typeof positionFormSchema>) {
    addPosition(values.title);
    form.reset();

    // console.log(values);
  }
  return (
    <>
      <Card className="flex-1 bg-card max-md:border-x-0 max-md:shadow-none p-10 md:p-8 md:px-14 max-md:rounded-none space-y-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardHeader className="p-0">
              <CardTitle>Add Positions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Positon Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="eg. President"
                        {...field}
                        className="py-6"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="p-0">
              <Button type="submit">Add Position</Button>
            </CardFooter>
          </form>
        </Form>
        <div className="h-56 overflow-auto relative">
          <DataTable columns={columns} data={electionFormState.positions} />
        </div>
        <CardFooter>
          <PrevButton />
          <NextButton />
        </CardFooter>
      </Card>
    </>
  );
};

export default PositionsForm;
