import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ElectionFormState } from './definitions';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateElectionFormState = (formState: ElectionFormState) => {
  const {
    electionInfo: { title, startDate, endDate, startTime, endTime },
    voterInfo: { votersFile },
    positions,
  } = formState;

  if (
    !title ||
    !startDate ||
    !endDate ||
    !startTime ||
    !endTime ||
    !votersFile
  ) {
    return 'All election info fields are required.';
  }

  if (positions.length === 0) {
    return 'At least one position is required.';
  }

  for (const position of positions) {
    if (!position.title) {
      return `Position with ID ${position.id} is missing a title.`;
    }

    if (position.candidates.length === 0) {
      return `Position "${position.title}" must have at least one candidate.`;
    }

    for (const candidate of position.candidates) {
      if (!candidate.name) {
        return `Candidate with ID ${candidate.id} in position "${position.title}" is missing a name.`;
      }

      if (candidate.positionId === null || candidate.positionId === undefined) {
        return `Candidate "${candidate.name}" is missing a valid position ID.`;
      }

      if (!candidate.image) {
        return `Candidate "${candidate.name}" is missing an image.`;
      }
    }
  }

  return null;
};

function isIsoDateString(value: string) {
  // Regular expression to validate the ISO 8601 date format
  const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

  // Check if the value matches the ISO 8601 format
  if (!isoDatePattern.test(value)) {
    return false;
  }

  // Use Date object to check if the date is valid
  const date = new Date(value);
  return !isNaN(date.getTime()); // Check if the date is a valid number
}

export function formatTime(timeString: string) {
  if (!isIsoDateString(timeString)) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    date.setHours(date.getHours() + 1);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } else {
    const date = new Date(timeString);
    date.setHours(date.getHours() + 1);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }
}

export const formatDate = (dateTime: string, weekdayLength?: "long" | "short" | "narrow") => {
  return new Date(dateTime).toLocaleString('en-US', {
    weekday: weekdayLength || 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
// export const formatTime = (dateTime: string) => {
//   return new Date(dateTime).toLocaleString('en-US', {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: '2-digit',
//     hour12: true,
//   });
// };
