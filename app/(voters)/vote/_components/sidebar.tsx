'use client';

import { Logo } from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LogoutBtn from '@/components/logout-btn';
import { cn } from '@/lib/utils';
import { Poll } from './dashboard';

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

      <div className="bg-primary rounded-md p-4 max-lg:md:p-2 flex items-center gap-x-2 text-white overflow-hidden relative mt-auto z-[999999]">
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <DotsVerticalIcon className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="hover:bg-none">
                <LogoutBtn />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h4 className="text-xs font-semibold">Lateef Taiwo</h4>
          <p className="text-[10px] font-medium">
            lateeftaiwo@student.oauife.edu.ng
          </p>
        </div>
      </div>
    </>
  );
};
