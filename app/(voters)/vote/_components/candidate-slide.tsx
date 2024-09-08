import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import * as React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import {Button} from "@/components/ui/button";
import {Option} from "@/app/(voters)/vote/_components/dashboard";

export function CandidatesSlide({
    options,
    selectedPollId,
    votes,
  handleVote,
    handleRemoveVote
}: {
  selectedPollId: string | undefined;
  options: Option[] | undefined;
  votes: {[poll_id: string]: { option_id: string; option_value: string } | null};
  handleVote: (poll_id: string, option: Option) => void;
  handleRemoveVote: (poll_id: string) => void;
}) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  // Check if options is undefined or empty
  if (!options) {
    return (
      <div className="grid place-content-center place-items-center h-screen w-full">
        <h1>Loading candidates...</h1>
      </div>
    );
  }


  if (!options.length) {
    return (
      <div className="grid place-content-center place-items-center h-screen w-full">
        <h1>No Candidate for this Position</h1>
      </div>
    );
  }

  if (!selectedPollId) {
    return
  }

  const isVotedFor = (poll_id: string, option_id: string): boolean => !!(votes && votes[poll_id] && votes[poll_id].option_id === option_id);


  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="flex items-center max-w-52 max-md:max-w-sm max-lg:max-w-xl min-w-full"
    >
      <div className="w-full">
        <CarouselContent className="w-full">
          {options.map((option, index) => (
            <CarouselItem
              key={index}
              className={cn(
                'max-sm:basis-full basis-[26.5rem] h-[25rem] pl-6 transition-all duration-300 ease-in-out ',
                hovered !== null && hovered !== index && 'md:blur-sm md:scale-[0.98]',
                  hovered === index && "h-[28rem]",
                  votes && votes[selectedPollId] && "blur-0",
                  isVotedFor(selectedPollId, option.id) && "h-[28rem] blur-0",

              )}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="p-1 h-full relative">
                {/*{votes && votes[selectedPollId] && !isVotedFor(selectedPollId, option.id) && (*/}

                {/*<div className="absolute inset-0 opacity-70 z-50 bg-background" />*/}
                {/*)}*/}
                <Card className="h-full">
                  <CardContent className="h-full flex flex-col gap-y-5 items-center p-8">
                    <div className=" h-64 w-64 rounded-full overflow-hidden">
                      <Image
                        src={
                          `http://${option.image_link}` ||
                          '/images/placeholder.png'
                        }
                        alt={option.value}
                        width={300}
                        height={300}
                        className="object-cover h-full w-full rounded-full"
                      />
                    </div>
                    <div className="text-center space-y-5">
                      <h1 className="text-xl font-semibold">{option.value}</h1>

                        <Button
                            className={cn("w-36 h-10 hidden",hovered === index && selectedPollId && "inline-flex", isVotedFor(selectedPollId, option.id) && "inline-flex")}

                            onClick={() => {
                              if (isVotedFor(selectedPollId, option.id)) {
                                handleRemoveVote(selectedPollId)
                            } else {
                                handleVote(selectedPollId, option)
                              }
                            }
                        }
                        >
                          {isVotedFor(selectedPollId, option.id) ? "Remove Vote" : "Vote"}

                        </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
