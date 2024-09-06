import CandidatesForm from '../_components/candidates-form';
import CreateElectionStepCard from '../_components/create-election-step-card';
import ElectionInfoForm from '../_components/election-info-form';
import PositionsForm from '../_components/positions-form';
import Publish from '../_components/publish';
import VoterInfoForm from '../_components/voters-info-form';

export default function CreateElection() {
  return (
    <div className="w-full py-8 md:px-1 md:py-2 lg:p-8">
      <div className="w-full md:w-11/12 lg:w-5/6 mx-auto space-y-14">
        <CreateElectionStepCard />
        <ElectionInfoForm />
        <VoterInfoForm />
        <PositionsForm />
        <CandidatesForm />
        <Publish />
      </div>
    </div>
  );
}
