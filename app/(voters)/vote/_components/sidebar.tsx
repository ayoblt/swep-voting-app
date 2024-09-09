'use client';

import { Logo } from '@/components/logo';
import LogoutBtn from '@/components/logout-btn';
import { cn } from '@/lib/utils';
import { Poll } from './dashboard';
import {useFormStatus} from "react-dom";


export const SideBar = ({
  polls,
  selectedPoll,
  setSelectedPoll,
}: {
  polls: Poll[];
  selectedPoll: Poll | null;
  setSelectedPoll: (poll: Poll) => void;
}) => {
  return (
    <>
      <div className="">
        <Logo className="w-24 h-24" />
      </div>
      <nav className="md:text-lg font-medium mt-8">
        <div className="space-y-1">
          <h3 className="font-bold text-xl">Positions</h3>
          <ul className="flex flex-col justify-center gap-y-3 p-3">
            {polls.map((poll) => (
              <li
                key={poll.id}
                className={cn(
                  'flex items-center gap-x-2 hover:text-primary cursor-pointer',
                  selectedPoll?.id === poll.id && 'text-primary'
                )}
                onClick={() => setSelectedPoll(poll)}
              >
                <span>{poll.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </nav>

        <div className="mt-auto">

            <LogoutBtn />
        </div>
    </>
  );
};
