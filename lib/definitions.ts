import { z } from 'zod';
import App from "next/app";

const matricNoRegex = /^[A-Z]{3}\/\d{4}\/\d{3}$/i;
const regNoRegex = /^\d{8}[A-Z]{2}$/;
export const MAX_FILE_SIZE = 3000000;
export const NEXT_DOMAIN_NAME = "https://swep-voting-app.vercel.app"
// export const NEXT_PUBLIC_API_HOSTNAME="http://localhost:3000"
export const NEXT_PUBLIC_API_HOSTNAME="https://swep7-production.up.railway.app"

export const VoterLoginFormSchema = z.object({
  email: z
    .string()
    .email()
    .trim()
    .refine((email) => email.endsWith('@student.oauife.edu.ng'), {
      message: 'Invalid email. Enter a student email.',
    }),
});

export const AdminRegisterFormSchema = z.object({
  email: z.string().email().trim(),
  password: z
    .string()
    .min(8, {
      message: 'Password must be more than 8 characters.',
    })
    .trim(),
});

export type VoterFormState =
  | {
      success: boolean;
      errors?: {
        email?: string[];
      };
      code?: string;
      details: string;
    }
  | undefined;

export type VoterVerifyFormState = {
  success: boolean;
  code?: string;
  details: string;
};

export type AdminVerifyFormState = {
  success: boolean;
  code?: string;
  details: string;
};

export type AdminLoginFormState =
  | {
      success: boolean;
      details: string;
      code?: string;
      // data?: {
      //   token: string;
      //   is_admin: boolean;
      //   expires_at: number;
      // };
    }
  | undefined;

export type AdminRegisterFormState = {
  success: boolean;
  errors?: {
    email?: string[];
    password?: string[];
  };
  details: string;
  data?: {
    email: string;
  };
};

export interface ElectionInfo {
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

export interface VoterInfo {
  votersFile: File | null;
}

export interface Candidate {
  id: number;
  name: string;
  positionId: number | null;
  image: File | null;
}

export interface Position {
  id: number;
  title: string;
  candidates: Candidate[];
}

export interface ElectionFormState {
  electionInfo: ElectionInfo;
  voterInfo: VoterInfo;
  positions: Position[];
  candidates: Candidate[];
}

export interface ElectionFormContextType {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  electionFormState: ElectionFormState;
  updateElectionInfo: (info: Partial<ElectionInfo>) => void;
  updateVoterInfo: (info: Partial<VoterInfo>) => void;
  addPosition: (positionName: string) => void;
  removePosition: (positionId: number) => void;
  updatePositionInfo: (info: Partial<Position>) => void;
  addCandidate: (candidate: {
    name: string;
    positionId: number | null;
    image: File | null;
  }) => void;
  removeCandidate: (candidateId: number) => void;
  updateCandidateInfo: (info: Partial<Candidate>) => void;
  resetFormState: () => void;
  nextStep: () => void;
  prevStep: () => void;
}


export interface AppState {
  email: string;
  collection_id: string;
}

export interface AppStatecontextType {
  email: string;
  collection_id: string;
  setCollectionId: (collectionId: string) => void;
  setEmail: (email: string) => void;
  clearUserDetails: () => void;
}

export type SessionPayload = {
  token: string;
  is_admin: boolean;
  exp?: number;
};

export const ImageSchema =
  typeof window === 'undefined'
    ? z.any()
    : z
        .union([
          z.instanceof(FileList).refine(
            (fileList) => {
              const file = fileList.item(0);
              if (!file) return false; // No file selected
              const fileType = file.name.split('.').pop()?.toLowerCase();
              return (
                fileType === 'jpg' ||
                fileType === 'jpeg' ||
                fileType === 'png' ||
                fileType === 'heic' ||
                fileType === 'webp'
              );
            },
            {
              message: 'File must be an image.',
            }
          ),
          z.instanceof(File).refine(
            (file) => {
              const fileType = file.name.split('.').pop()?.toLowerCase();
              return (
                fileType === 'jpg' ||
                fileType === 'jpeg' ||
                fileType === 'png' ||
                fileType === 'heic' ||
                fileType === 'webp'
              );
            },
            {
              message: 'File must be an image.',
            }
          ),
        ])
        .optional()
        .refine((file) => {
          if (file instanceof FileList) {
            const firstItem = file.item(0);
            if (firstItem) return firstItem.size <= MAX_FILE_SIZE;
            return true; // No file selected
          } else if (file instanceof File) {
            return file.size <= MAX_FILE_SIZE;
          }
          return true;
        }, 'Max size is 3MB.');

interface Vote {
  poll_id: string;
  option_id: string;
  option_value: string;
}

// Define the structure of the payload
export interface Payload {
  collection_id: string;
  votes: Vote[];
}

// export type Collection = {
//   id: string;
//   title: string;
//   start_time: string;
//   end_time: string;
//   no_of_polls: number;
//   created: string
// }

export type Option = {
  id: string;
  value: string;
  created: string;
  no_of_votes: number;
};

export type Poll = {
  id: string;
  title: string;
  required: boolean;
  no_of_options: number;
  created: string;
  no_of_votes: number;
  last_updated: string;
  options: Option[];
};

export type Collection = {
  id: string;
  creator_id: string;
  title: string;
  start_time: string;
  end_time: string;
  eligible_voters: string;
  no_of_eligible_voters: number;
  no_of_polls: number;
  no_of_votes: number;
  created: string;
  last_updated: string;
  polls: Poll[];
};