'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@/components/ui/separator';
import { useElectionFormContext } from '@/hooks/election-form-hook';
import {
  Candidate,
  ElectionFormState,
  ElectionInfo,
  Position,
  VoterInfo,
} from '@/lib/definitions';
import { formatTime, validateElectionFormState } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';
import { ColumnDef } from '@tanstack/react-table';
import { CandidatePosition } from './candidates-form';
import { toast } from 'sonner';
import {useFormState} from 'react-dom';
import { createElection } from '@/app/actions/admin/election';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import {Button} from "@/components/ui/button";
import Spinner from "@/components/icons/spinner";
import {SubmitBtn} from "@/components/submit-btn";
import {PrevButton} from "@/app/admin/dashboard/elections/_components/step-buttons";

const FormatCell = ({ children }: { children: React.ReactNode }) => {
  return <div className="font-medium">{children}</div>;
};

const electionInfoColumns: ColumnDef<ElectionInfo>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      const title = row.original.title;

      return <FormatCell>{title}</FormatCell>;
    },
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => {
      const startDate = row.original.startDate;

      return <FormatCell>{startDate}</FormatCell>;
    },
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => {
      const endDate = row.original.endDate;

      return <FormatCell>{endDate}</FormatCell>;
    },
  },
  {
    accessorKey: 'startTime',
    header: 'Start Time',
    cell: ({ row }) => {
      const startTime = row.original.startTime;
      if (!startTime) return null;

      return <div className="font-medium">{formatTime(startTime)}</div>;
    },
  },
  {
    accessorKey: 'endTime',
    header: 'End Time',
    cell: ({ row }) => {
      const endTime = row.original.endTime;
      if (!endTime) return null;

      return <div className="font-medium">{formatTime(endTime)}</div>;
    },
  },
];

const positionColumns: ColumnDef<Position>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'candidates',
    header: 'Candidates',
    cell: ({ row }) => {
      const numberOfCandidates = row.original.candidates.length;

      return (
        <div className="font-medium">{`${numberOfCandidates} candidate${
          numberOfCandidates > 1 ? 's' : ''
        }`}</div>
      );
    },
  },
];

const candidatesColumns: ColumnDef<Candidate>[] = [
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
];


const Publish = () => {
  const [pending, setPending] = useState(false)
  const { currentStep, electionFormState, resetFormState } =
    useElectionFormContext();
  const router = useRouter();
  const [state, formAction] = useFormState(createElection, {
    success: false,
    code: '',
    details: '',
    errors: [],
  });
  // const electionInfoList = [electionFormState.electionInfo];

  useEffect(() => {
    if(state.details) {
      setPending(false)
      if (state.success) {
        console.log("success")
        toast.success('Election created successfully');
        resetFormState();
        router.push('/admin/dashboard/elections');
      } else if (state.errors) {
        state.errors.forEach((error: string) => {
          toast.error(error);
        });
      }
    }
  }, [state, router]);

  if (currentStep !== 5) return null;

  const hasValidData = (info: ElectionInfo) => {
    return (
      info.title ||
      info.startDate ||
      info.endDate ||
      info.startTime ||
      info.endTime
    );
  };

  const electionInfoArray = hasValidData(electionFormState.electionInfo)
    ? [electionFormState.electionInfo]
    : [];

  console.log(electionInfoArray)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true)
    console.log(electionFormState.electionInfo.startTime)
    console.log(electionFormState.electionInfo.endTime)
    const errorMessage = validateElectionFormState(electionFormState);
    console.log("electionformstate", electionFormState)
    // console.log({ electionFormState });

    if (errorMessage) {
      // console.log(errorMessage);
      toast.error(errorMessage);
    }

    const collectionData = convertElectionFormToApiFormat(electionFormState);
    console.log('Collection Data', collectionData);
    const formData = new FormData();
    formData.append('collection', JSON.stringify(collectionData));

    if (electionFormState.voterInfo.votersFile) {
      formData.append(
        'collection.eligible_voters',
        electionFormState.voterInfo.votersFile
      );
    } else {
      console.error('No voters file available to append.');
    }

    console.log("CollectionData", {collectionData})

    collectionData.polls.forEach((poll, pollIndex) => {
      poll.options.forEach((option, optionIndex) => {
        if (option.image) {
          formData.append(
            `collection.polls[${pollIndex}].options[${optionIndex}].image`,
            option.image
          );
        }
      });
    });
    await formAction(formData);
  };

  return (
    <form onSubmit={handleSubmit}>

      <Card className="flex-1 bg-card max-md:border-x-0 max-md:shadow-none p-4 md:p-8 max-md:rounded-none ">
      {/*<ScrollArea className="w-64">*/}
        <CardContent className="px-0 space-y-8">
          <div className="space-y-4">
            <h3 className="font-bold">Election Info</h3>
            <div className=" overflow-auto relative">
              <div className=" overflow-auto relative">

              <DataTable columns={electionInfoColumns} data={electionInfoArray}/>
              </div>
            </div>

          </div>
          <Separator/>
          <div className="space-y-4">
            <h3 className="font-bold">Voter File</h3>
            <div className="flex gap-x-3">
              {!electionFormState.voterInfo.votersFile ? (
                <p>No file uploaded</p>
              ) : (
                <>
                  <Label>Voter&apos;s Filename:</Label>
                  <p>{electionFormState.voterInfo.votersFile?.name}</p>
                </>
              )}
            </div>
          </div>

          <Separator />
          <div className="space-y-4">
            <h3 className="font-bold">Positions</h3>
            <div className="overflow-auto">

            <DataTable
                columns={positionColumns}
                data={electionFormState.positions}
            />
            </div>
          </div>
          <Separator/>
          <div className="space-y-4">
            <h3 className="font-bold">Candidates</h3>
            <div className=" overflow-auto relative">

            <DataTable
                columns={candidatesColumns}
                data={electionFormState.candidates}
            />
            </div>
          </div>
        </CardContent>
        {/*</ScrollArea>*/}
      </Card>

      <div className="mt-10 px-6">
        <div className="flex justify-between">
          <PrevButton />
          <SubmitBtn pending={pending} className="w-fit px-6 py-2 bg-blue-500 text-white rounded-lg">Publish</SubmitBtn>
        </div>
      </div>
    </form>
  );
};

export default Publish;

interface Option {
  value: string;
  image: File | null;
}

interface Poll {
  title: string;
  required: boolean;
  options: Option[];
}

interface CollectionData {
  title: string;
  start_time: string;
  end_time: string;
  eligible_voters: File | null;
  polls: Poll[];
}

const convertElectionFormToApiFormat = (
  formData: ElectionFormState
): CollectionData => {
  const { electionInfo, positions, candidates, voterInfo } = formData;

  // console.log(electionInfo)
  const startDateTime = new Date(
    `${electionInfo.startDate}T${electionInfo.startTime}:00`
  ).toLocaleString();

  console.log(electionInfo.startDate)
  console.log(startDateTime);

  const endDateTime = new Date(
    `${electionInfo.endDate}T${electionInfo.endTime}:00`
  ).toLocaleString();

  console.log(endDateTime);


  const polls: Poll[] = positions.map((position) => {

    const positionCandidates = candidates.filter(
      (candidate) => candidate.positionId === position.id
    );


    const options: Option[] = positionCandidates.map((candidate) => ({
      value: candidate.name,
      image: candidate.image,
    }));

    return {
      title: position.title,
      required: true,
      options: options,
    };
  });


  const collectionData: CollectionData = {
    title: electionInfo.title,
    start_time: startDateTime,
    end_time: endDateTime,
    eligible_voters: voterInfo.votersFile,
    polls: polls,
  };

  console.log("colectio", collectionData)

  return collectionData;
};

/*
const startDateTimeLocale = new Date(
    `${electionInfo.startDate}T${electionInfo.startTime}:00`
  );

  startDateTimeLocale.setHours(startDateTimeLocale.getHours() + 1)
  const startDateTime = startDateTimeLocale.toISOString();

  console.log(electionInfo.startDate)
  console.log(startDateTime);

  const endDateTimeLocale = new Date(
    `${electionInfo.endDate}T${electionInfo.endTime}:00`
  );

  endDateTimeLocale.setHours(endDateTimeLocale.getHours() + 1)
  const endDateTime = endDateTimeLocale.toISOString();

  console.log(endDateTime);*/


