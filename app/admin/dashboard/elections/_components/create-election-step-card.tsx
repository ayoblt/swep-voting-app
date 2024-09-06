'use client';

import { useElectionFormContext } from '@/hooks/election-form-hook';
import { cn } from '@/lib/utils';

const CreateElectionStepCard = () => {
  const { currentStep, setCurrentStep } = useElectionFormContext();
  return (
    <>
      <div className="flex items-center justify-between w-full px-5">
        <span className="text-lg font-semibold text-foreground">
          Create Election
        </span>
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of 5
        </span>
      </div>
      <div className="hidden lg:block bg-card w-full py-8 px-5 rounded-lg border shadow-sm">
        <div className="grid gap-y-5 lg:grid-cols-5 relative items-center place-items-center">
          {/* <span className="w-full h-[1.5px] bg-muted absolute top-4"></span> */}

          <div
            className="flex flex-col items-center gap-y-5 whitespace-nowrap cursor-pointer w-fit text-sm lg:text-base"
            onClick={() => setCurrentStep(1)}
          >
            <span
              className={cn(
                'bg-primary/40 h-6 w-6 rounded-full inline-block z-10',
                currentStep === 1 && 'bg-primary'
              )}
            ></span>
            Election Info
          </div>
          <div
            className="flex flex-col items-center gap-y-5 whitespace-nowrap cursor-pointer w-fit text-sm lg:text-base"
            onClick={() => setCurrentStep(2)}
          >
            <span
              className={cn(
                'bg-primary/40 h-6 w-6 rounded-full inline-block z-10',
                currentStep === 2 && 'bg-primary'
              )}
            ></span>
            Add Voters
          </div>
          <div
            className="flex flex-col items-center gap-y-5 whitespace-nowrap cursor-pointer w-fit text-sm lg:text-base"
            onClick={() => setCurrentStep(3)}
          >
            <span
              className={cn(
                'bg-primary/40 h-6 w-6 rounded-full inline-block z-10',
                currentStep === 3 && 'bg-primary'
              )}
            ></span>
            Add Positions
          </div>
          <div
            className="flex flex-col items-center gap-y-5 whitespace-nowrap cursor-pointer w-fit text-sm lg:text-base"
            onClick={() => setCurrentStep(4)}
          >
            <span
              className={cn(
                'bg-primary/40 h-6 w-6 rounded-full inline-block z-10',
                currentStep === 4 && 'bg-primary'
              )}
            ></span>
            Add Candidates
          </div>
          <div
            className="flex flex-col items-center gap-y-5 whitespace-nowrap cursor-pointer w-fit text-sm lg:text-base"
            onClick={() => setCurrentStep(5)}
          >
            <span
              className={cn(
                'bg-primary/40 h-6 w-6 rounded-full inline-block z-10',
                currentStep === 5 && 'bg-primary'
              )}
            ></span>
            Publish
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateElectionStepCard;
