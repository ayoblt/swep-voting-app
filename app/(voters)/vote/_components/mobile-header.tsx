import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import {SideBar} from "@/app/(voters)/vote/_components/sidebar";
import {Poll} from "@/app/(voters)/vote/_components/dashboard";

const MobileHeader = ({
  polls,
  selectedPoll,
  setSelectedPoll,
}: {
  polls: Poll[];
  selectedPoll: Poll | null;
  setSelectedPoll: (poll: Poll) => void;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <HamburgerMenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SideBar polls={polls}
            selectedPoll={selectedPoll}
            setSelectedPoll={setSelectedPoll} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileHeader;
