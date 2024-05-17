import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${formattedDate} at ${time}`;
}

// 
export const multiFormatDateString = (timestamp: string = ""): string => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date: Date = new Date(timestampNum * 1000);
  const now: Date = new Date();

  const diff: number = now.getTime() - date.getTime();
  const diffInSeconds: number = diff / 1000;
  const diffInMinutes: number = diffInSeconds / 60;
  const diffInHours: number = diffInMinutes / 60;
  const diffInDays: number = diffInHours / 24;

  switch (true) {
    case Math.floor(diffInDays) >= 30:
      return formatDateString(timestamp);
    case Math.floor(diffInDays) === 1:
      return `${Math.floor(diffInDays)} day ago`;
    case Math.floor(diffInDays) > 1 && diffInDays < 30:
      return `${Math.floor(diffInDays)} days ago`;
    case Math.floor(diffInHours) >= 1:
      return `${Math.floor(diffInHours)} hours ago`;
    case Math.floor(diffInMinutes) >= 1:
      return `${Math.floor(diffInMinutes)} minutes ago`;
    default:
      return "Just now";
  }
};

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};

export function formatRelativeDate(dateString: string): string {
  const currentDate: Date = new Date();
  const postDate: Date = new Date(dateString);
  const diffInMilliseconds: number = currentDate.getTime() - postDate.getTime();

  const millisecondsInMinute: number = 1000 * 60;
  const millisecondsInHour: number = millisecondsInMinute * 60;
  const millisecondsInDay: number = millisecondsInHour * 24;

  if (diffInMilliseconds < millisecondsInMinute) {
    const seconds: number = Math.floor(diffInMilliseconds / 1000);
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  } else if (diffInMilliseconds < millisecondsInHour) {
    const minutes: number = Math.floor(diffInMilliseconds / millisecondsInMinute);
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (diffInMilliseconds < millisecondsInDay) {
    const hours: number = Math.floor(diffInMilliseconds / millisecondsInHour);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else {
    const days: number = Math.floor(diffInMilliseconds / millisecondsInDay);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
}