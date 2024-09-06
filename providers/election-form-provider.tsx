'use client';

import { ElectionFormContext } from '@/contexts/election-form-context';
import {
  Candidate,
  ElectionFormState,
  ElectionInfo,
  Position,
  VoterInfo,
} from '@/lib/definitions';
import { useState } from 'react';

export const ElectionFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [electionFormState, setElectionFormState] = useState<ElectionFormState>(
    {
      electionInfo: {
        title: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
      },
      voterInfo: {
        votersFile: null,
      },
      candidates: [],
      positions: [],
    }
  );

  const updateElectionInfo = (info: Partial<ElectionInfo>) => {
    setElectionFormState((prevState) => ({
      ...prevState,
      electionInfo: {
        ...prevState.electionInfo,
        ...info,
      },
    }));
  };

  const updateVoterInfo = (info: Partial<VoterInfo>) => {
    setElectionFormState((prevState) => ({
      ...prevState,
      voterInfo: {
        ...prevState.voterInfo,
        ...info,
      },
    }));
  };

  const addPosition = (positionName: string) => {
    setElectionFormState((prevState) => ({
      ...prevState,
      positions: [
        ...prevState.positions,
        {
          id: prevState.positions.length,
          title: positionName,
          candidates: [],
        },
      ],
    }));
  };

  const removePosition = (positionId: number) => {
    setElectionFormState((prevState) => ({
      ...prevState,
      positions: prevState.positions.filter(
        (position) => position.id !== positionId
      ),
    }));
  };

  const updatePositionInfo = (info: Partial<Position>) => {
    setElectionFormState((prevState) => ({
      ...prevState,
      positions: prevState.positions.map((position) =>
        position.id === info.id ? { ...position, ...info } : position
      ),
    }));
  };

  const addCandidate = (candidate: {
    name: string;
    positionId: number | null;
    image: File | null;
  }) => {
    setElectionFormState((prevState) => {
      const { electionInfo, voterInfo, candidates, positions } = prevState;

      // Return the updated state
      return {
        ...prevState,
        candidates: [...candidates, { ...candidate, id: candidates.length }],
        positions: positions.map((position) =>
          position.id === candidate.positionId
            ? {
                ...position,
                candidates: [
                  ...position.candidates,
                  { ...candidate, id: candidates.length },
                ],
              }
            : position
        ),
      };
    });
  };

  const removeCandidate = (candidateId: number) => {
    setElectionFormState((prevState) => {
      const updatedCandidates = prevState.candidates.filter(
        (candidate) => candidate.id !== candidateId
      );

      return {
        ...prevState,
        candidates: updatedCandidates,
        positions: prevState.positions.map((position) =>
          position.candidates.some((candidate) => candidate.id === candidateId)
            ? {
                ...position,
                candidates: position.candidates.filter(
                  (candidate) => candidate.id !== candidateId
                ),
              }
            : position
        ),
      };
    });
  };

  const updateCandidateInfo = (info: Partial<Candidate>) => {
    // console.log('updateCandidateInfo', info);
    setElectionFormState((prevState) => {
      const { candidates, positions } = prevState;

      const candidate = candidates.find(
        (candidate) => candidate.id === info.id
      );

      if (!candidate) return prevState;
      // console.log(candidate);

      // console.log('updateCandidateInfo', info);

      const positionChanged =
        info.positionId !== undefined &&
        info.positionId !== candidate.positionId;

      const updatedCandidates = candidates.map((candidate) =>
        candidate.id === info.id ? { ...candidate, ...info } : candidate
      );

      const updatedPositions = positions.map((position) => {
        if (position.id === candidate.positionId) {
          if (positionChanged) {
            return {
              ...position,
              candidates: position.candidates.filter(
                (candidate) => candidate.id !== info.id
              ),
            };
          }

          return position;
        } else if (position.id === info.positionId && positionChanged) {
          return {
            ...position,
            candidates: [...position.candidates, candidate],
          };
        }
        return position;
      });

      return {
        ...prevState,
        candidates: updatedCandidates,
        positions: updatedPositions,
      };
    });
    console.log('updateCandidateInfo', info);
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const resetFormState = () => {
    setElectionFormState({
      electionInfo: {
        title: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
      },
      voterInfo: {
        votersFile: null,
      },
      candidates: [],
      positions: [],
    });
  };

  return (
    <ElectionFormContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        electionFormState,
        updateElectionInfo,
        updateVoterInfo,
        addPosition,
        removePosition,
        updatePositionInfo,
        addCandidate,
        removeCandidate,
        resetFormState,

        updateCandidateInfo,
        nextStep,
        prevStep,
      }}
    >
      {children}
    </ElectionFormContext.Provider>
  );
};
