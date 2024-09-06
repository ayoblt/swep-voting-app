'use client';

import {Button} from '@/components/ui/button';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { SideBar } from './sidebar';
import {useState} from "react";

const MobileHeader = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSheetOpen = () => {
        setIsOpen(false)
    }
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <HamburgerMenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SideBar handleSheetOpen={handleSheetOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileHeader;
