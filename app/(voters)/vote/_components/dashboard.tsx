'use client';

import ThemeToggler from '@/components/theme-toggler';
import { cn } from '@/lib/utils';
import {useEffect, useState, useTransition} from 'react';
import { SideBar } from './sidebar';
import { CandidatesSlide } from './candidate-slide';
import MobileHeader from "@/app/(voters)/vote/_components/mobile-header";
import { PositionCombobox} from "@/app/(voters)/vote/_components/combobox";
import {ArrowRightIcon, DoubleArrowRightIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import {useFormState} from "react-dom";
import {submitVotes} from "@/app/actions/voters/vote";
import {Payload} from "@/lib/definitions";
import {SubmitBtn} from "@/components/submit-btn";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export interface Option {
  id: string;
  value: string;
  created: string;
  image_link?: string;
}

export interface Poll {
  id: string;
  title: string;
  required: boolean;
  no_of_options: number;
  created: string;
  options: Option[];
}

interface VotingData {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  no_of_polls: number;
  created: string;
  polls: Poll[];
}

export default function Dashboard({ data }: { data: VotingData }) {
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);
  const [votes, setVotes] = useState<{
    [poll_id: string]: { option_id: string; option_value: string } | null;
  }>({});
  const [isPending, startTransition] = useTransition()
  const [state, formAction] = useFormState(submitVotes, {
    success: false,
    details: "",
    code: "",
  })
  const router = useRouter()

  // toast.success("Hello world")

  useEffect(() => {
    console.log(state)
    if (state.success) {
      toast.success('Your votes has been submitted successfully');
      router.push('/votes/success');
    } else {
      console.log(state.details)
      if(state.details) {
        toast.error(state.details);
      }
    }
  }, [state, router]);

  useEffect(() => {
    if (data.polls && data.polls.length > 0) {
      setSelectedPoll(data.polls[0]);
    }
  }, [data]);

  // If data has no polls, return a fallback message
  if (!data.polls || data.polls.length === 0) {
    return (
      <div className="grid place-content-center place-items-center h-screen w-full">
        <h1>No polls available</h1>
      </div>
    );
  }

  const handleVote = (poll_id: string, option: Option) => {
    setVotes({
      ...votes,
      [poll_id]: {
        option_id: option.id,
        option_value: option.value,
      },
    });
    console.log(votes)
  };
const handleRemoveVote = (poll_id: string) => {
  if (!votes || !votes[poll_id]) return; // Do nothing if no vote exists for this poll

  const updatedVotes = { ...votes }; // Copy the existing votes
  delete updatedVotes[poll_id]; // Remove the vote for the given poll

  setVotes(updatedVotes); // Update the state
  console.log(updatedVotes); // Log the updated votes
};

const handleSubmitVotes = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  console.log('submitting')
  // console.log(votes)
  const payload: Payload = {
    collection_id: data.id,
    votes: Object.entries(votes).map(([poll_id, vote]) => ({
      poll_id,
      option_id: vote?.option_id || '',
      option_value: vote?.option_value || '',
    })),
};
  console.log(payload)
  startTransition(async () => {
      await formAction(payload)
    });

}
  return (
    <div className="grid min-h-screen w-full">
      {/*<div*/}
      {/*  className={cn(*/}
      {/*    'shadow-md border-r flex-col justify-between bg-card relative h-full'*/}
      {/*  )}*/}
      {/*>*/}
        <div className="max-md:hidden fixed inset-y-0 py-10 px-7 flex flex-col justify-between border-r bg-card z-[9999]">
          <SideBar
            polls={data.polls}
            selectedPoll={selectedPoll}
            setSelectedPoll={setSelectedPoll}
          />
        </div>
      {/*</div>*/}
      <div className="flex flex-col md:ml-[300px] lg:ml-[320px]">
        <header className="flex h-16 items-center justify-between gap-4 border-b px-4 md:h-20 lg:px-6">
           {/*<MobileHeader*/}
           {/*    polls={data.polls}*/}
           {/* selectedPoll={selectedPoll}*/}
           {/* setSelectedPoll={setSelectedPoll} />*/}
          <PositionCombobox polls={data.polls}
            selectedPoll={selectedPoll}
            setSelectedPoll={setSelectedPoll} />

          <ThemeToggler />
        </header>
        <main className="h-full w-full flex flex-col justify-evenly">

          <h1 className="text-xl font-bold md:ml-5 max-md:text-center">{selectedPoll?.no_of_options} Candidate{selectedPoll?.no_of_options && selectedPoll?.no_of_options > 1 && "s"}</h1>
          {/* <div className="grid place-content-center p-10 h-full"> */}
          <CandidatesSlide selectedPollId={selectedPoll?.id} options={selectedPoll?.options} votes={votes} handleVote={handleVote} handleRemoveVote={handleRemoveVote} />
          {/* </div> */}
          <div className="flex flex-col items-center gap-y-5 px-10">

            <p className="text-2xl items-center justify-center font-bold flex gap-x-3">Scroll <DoubleArrowRightIcon /></p>

            <form onSubmit={handleSubmitVotes}>

            <SubmitBtn className="md:self-end" isPending={isPending}>Submit Votes</SubmitBtn>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
