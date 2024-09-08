'use client';

import ThemeToggler from '@/components/theme-toggler';
import {useEffect, useState, useTransition} from 'react';
import { SideBar } from './sidebar';
import { CandidatesSlide } from './candidate-slide';
import { PositionCombobox} from "@/app/(voters)/vote/_components/combobox";
import {DoubleArrowRightIcon} from "@radix-ui/react-icons";
import {useFormState} from "react-dom";
import {submitVotes} from "@/app/actions/voters/vote";
import {Collection, Option, Payload, Poll} from "@/lib/definitions";
import {SubmitBtn} from "@/components/submit-btn";
import {toast} from "sonner";

// export interface Option {
//   id: string;
//   value: string;
//   created: string;
//   image_link?: string;
// }
//
// export interface Poll {
//   id: string;
//   title: string;
//   required: boolean;
//   no_of_options: number;
//   created: string;
//   options: Option[];
// }
//
// interface VotingData {
//   id: string;
//   title: string;
//   start_time: string;
//   end_time: string;
//   no_of_polls: number;
//   created: string;
//   polls: Poll[];
// }

export default function Dashboard({ data }: { data: Collection }) {
  // const [timeLeft, setTimeLeft] = useState<number>(5)
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);
  const [votes, setVotes] = useState<{
    [poll_id: string]: { option_id: string; option_value: string } | null;
  }>({});
  const [isPending, startTransition] = useTransition()
  // const submitBtnRef = useRef<HTMLButtonElement | null>(null);
  const [state, formAction] = useFormState(submitVotes, {
    success: false,
    details: "",
    code: "",
  })

  // useEffect(() => {
  //   const timerId = setInterval(() => {
  //     setTimeLeft((prevTime) => {
  //       if (prevTime <= 1) {
  //         clearInterval(timerId)
  //
  //         // console.log("about to be clicked")
  //         // clickSubmitButton()
  //         // console.log("clicked")
  //         return 0;
  //       }
  //       return prevTime - 1
  //     })
  //   }, 1000)
  //
  //   return () => clearInterval(timerId)
  // }, []);

  useEffect(() => {
    // console.log(state)
    if (state) {
      if (state.success) {
        toast.success('Your votes has been submitted successfully');
        // console.log('success');
      } else {
        // console.log(state.details)
        if (state.details) {
          toast.error(state.details);
        }
      }
    }
  }, [state]);

  useEffect(() => {
    if (data.polls && data.polls.length > 0) {
      setSelectedPoll(data.polls[0]);
    }
  }, [data]);

  // If data has no polls, return a fallback message
  // if (!data.polls || data.polls.length === 0) {
  //   return (
  //     <div className="grid place-content-center place-items-center h-screen w-full">
  //       <h1>No polls available</h1>
  //     </div>
  //   );
  // }

  // const clickSubmitButton = () => {
  //   if (submitBtnRef.current) {
  //     console.log("it is true")
  //     submitBtnRef.current.click();
  //     console.log("clicked again")
  //   }
  // };

  const handleVote = (poll_id: string, option: Option) => {
    setVotes({
      ...votes,
      [poll_id]: {
        option_id: option.id,
        option_value: option.value,
      },
    });
    // console.log(votes)
  };
  const handleRemoveVote = (poll_id: string) => {
    if (!votes || !votes[poll_id]) return;

    const updatedVotes = {...votes};
    delete updatedVotes[poll_id];

    setVotes(updatedVotes);
    // console.log(updatedVotes);
  };

  const handleSubmitVotes = (e: React.FormEvent<HTMLFormElement>) => {
    // if (e) {
    // }
      e.preventDefault()
    // console.log('submitting')
    // console.log(votes)

    const payload: Payload = {
      collection_id: data.id,
      votes: Object.entries(votes).map(([poll_id, vote]) => ({
        poll_id,
        option_id: vote?.option_id || '',
        option_value: vote?.option_value || '',
      })),
    };
    // console.log(payload)
    startTransition( async () => {
      await formAction(payload)
    });
  }

  const formatTimeLeft = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  return (
      <div className="grid min-h-screen w-full relative">
        {/*<div className="fixed max-md:flex-col right-10 sm:right-16 top-20 flex justify-between items-center gap-x-5">*/}
        {/*  <p className="font-semibold text-lg">Votes submits immediately timer ends</p>*/}
        {/*  <p className=" bg-destructive text-destructive-foreground w-48 text-2xl text-center font-bold p-2 rounded-md">*/}

        {/*  {formatTimeLeft(timeLeft)}*/}
        {/*  </p>*/}
        {/*</div>*/}
        <div
            className="max-md:hidden md:w-[250px] lg:w-[300px] fixed inset-y-0 py-10 px-7 flex flex-col justify-between border-r bg-card z-[9999]">
          <SideBar
              polls={data.polls}
              selectedPoll={selectedPoll}
              setSelectedPoll={setSelectedPoll}
          />
        </div>
        {/*</div>*/}
        <div className="flex flex-col md:ml-[250px] lg:ml-[300px]">
          <header className="flex h-16 items-center justify-between gap-4 border-b px-4 md:h-20 lg:px-6">
            {/*<MobileHeader*/}
            {/*    polls={data.polls}*/}
            {/* selectedPoll={selectedPoll}*/}
            {/* setSelectedPoll={setSelectedPoll} />*/}
            <PositionCombobox polls={data.polls}
                              selectedPoll={selectedPoll}
                              setSelectedPoll={setSelectedPoll}/>

            <ThemeToggler/>
          </header>
          <main className="h-full w-full flex flex-col justify-evenly">

            <h1 className="text-xl font-bold md:ml-5 max-md:text-center">{selectedPoll?.no_of_options} Candidate{selectedPoll?.no_of_options && selectedPoll?.no_of_options > 1 && "s"}</h1>

            <CandidatesSlide selectedPollId={selectedPoll?.id} options={selectedPoll?.options} votes={votes}
                             handleVote={handleVote} handleRemoveVote={handleRemoveVote}/>

            <div className="flex flex-col items-center gap-y-5 px-10">
              <p className="text-2xl items-center justify-center font-bold flex gap-x-3">Scroll <DoubleArrowRightIcon/></p>
              <form onSubmit={handleSubmitVotes}>
                <SubmitBtn className="md:self-end w-full" isPending={isPending}>Submit Votes</SubmitBtn>
              </form>
            </div>
          </main>
        </div>
      </div>
  )
}