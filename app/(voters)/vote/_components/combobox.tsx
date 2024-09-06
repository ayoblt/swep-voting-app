"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CheckIcon, ChevronDownIcon} from "@radix-ui/react-icons";
import {Poll} from "@/app/(voters)/vote/_components/dashboard";

const frameworks = [
  {
    value: "president",
    label: "President",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export function PositionCombobox({
  polls,
  selectedPoll,
  setSelectedPoll,
}: {
  polls: Poll[];
  selectedPoll: Poll | null;
  setSelectedPoll: (poll: Poll) => void;
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {selectedPoll
            ? selectedPoll.title
            : "Select position..."}
          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[300px]">
        <Command>
          <CommandInput placeholder="Search positions..." />
          <CommandList>
            <CommandEmpty>No position found.</CommandEmpty>
            <CommandGroup>
              {polls.map((poll) => (
                <CommandItem
                  key={poll.id}
                  value={poll.title}
                  onSelect={() => {
                    setSelectedPoll(poll)
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedPoll?.title === poll.title ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {poll.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
