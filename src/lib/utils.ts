import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractCountryCode(inputString: string): string | null {
  if (!inputString) return null;
  // Find the positions of the first and second '/'
  const firstSlashIndex = inputString.indexOf("/");
  const secondSlashIndex = inputString.indexOf("/", firstSlashIndex + 1);

  if (firstSlashIndex !== -1 && secondSlashIndex !== -1) {
    // Extract the substring between the first and second '/'
    const extractedValue = inputString.substring(
      firstSlashIndex + 1,
      secondSlashIndex
    );
    return extractedValue;
  } else {
    return null;
  }
}
