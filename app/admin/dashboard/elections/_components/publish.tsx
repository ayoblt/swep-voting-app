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
import {cn, formatTime, validateElectionFormState} from '@/lib/utils';
import { Label } from '@radix-ui/react-label';
import { ColumnDef } from '@tanstack/react-table';
import { CandidatePosition } from './candidates-form';
import { toast } from 'sonner';
import {useFormState, useFormStatus} from 'react-dom';
import { createElection } from '@/app/actions/admin/election';
import {useEffect, useTransition} from 'react';
import { useRouter } from 'next/navigation';
import {ScrollArea} from "@/components/ui/scroll-area";
// import {SubmitBtn} from "@/components/submit-btn";
import {Button} from "@/components/ui/button";
import Spinner from "@/components/icons/spinner";
import {SubmitBtn} from "@/components/submit-btn";

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
  const { currentStep, electionFormState, resetFormState } =
    useElectionFormContext();
  const router = useRouter();
  const [state, formAction] = useFormState(createElection, {
    success: false,
    code: '',
    details: '',
    errors: [],
  });
  const electionInfoList = [electionFormState.electionInfo];

  useEffect(() => {
    if (state.success) {
      // console.log("success")
      toast.success('Election created successfully');
      resetFormState();
      router.push('/admin/dashboard/elections');
    } else if (state.errors) {
      state.errors.forEach((error: string) => {
        toast.error(error);
      });
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorMessage = validateElectionFormState(electionFormState);
    // console.log({ electionFormState });

    if (errorMessage) {
      // console.log(errorMessage);
      toast.error(errorMessage);
    }

    const collectionData = convertElectionFormToApiFormat(electionFormState);
    // console.log('Collection Data', collectionData);
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

      <div className="mt-10">
        <div className="flex justify-center">
          <SubmitBtn
            className="px-6 py-2 bg-blue-500 text-white rounded-lg"
          >
            Publish
          </SubmitBtn>
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

  // Convert date and time to ISO format for start and end times
  // console.log(electionInfo)
  const startDateTime = new Date(
    `${electionInfo.startDate}T${electionInfo.startTime}:00`
  ).toISOString();
  // console.log(startDateTime);
  const endDateTime = new Date(
    `${electionInfo.endDate}T${electionInfo.endTime}:00`
  ).toISOString();
  // console.log(endDateTime);

  // Map positions and candidates to API polls format
  const polls: Poll[] = positions.map((position) => {
    // Get candidates for each position
    const positionCandidates = candidates.filter(
      (candidate) => candidate.positionId === position.id
    );

    // Map candidates to options
    const options: Option[] = positionCandidates.map((candidate) => ({
      value: candidate.name,
      image: candidate.image, // Assuming image is already a File object
    }));

    return {
      title: position.title,
      required: true, // Assuming each poll is required
      options: options,
    };
  });

  // Construct the final API data object
  const collectionData: CollectionData = {
    title: electionInfo.title,
    start_time: startDateTime,
    end_time: endDateTime,
    eligible_voters: voterInfo.votersFile, // Assuming it's already a File object
    polls: polls,
  };

  return collectionData;
};
