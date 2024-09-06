'use client';

import { Button } from '@/components/ui/button';
import { useElectionFormContext } from '@/hooks/election-form-hook';

export const SubmitNextButton = () => {
  return (
    <Button type='submit' className="w-32 h-10 ml-auto text-white">
      Next
    </Button>
  );
};
export const NextButton = () => {
  const { nextStep } = useElectionFormContext();
  return (
    <Button onClick={nextStep} className="w-24 sm:w-32 h-10 ml-auto text-white">
      Next
    </Button>
  );
};

export const PrevButton = () => {
  const { prevStep } = useElectionFormContext();
  return (
    <Button className="w-24 sm:w-32 h-10 text-white" onClick={prevStep}>
      Previous
    </Button>
  );
};
