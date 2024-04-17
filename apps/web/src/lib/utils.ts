import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Strip a string of special characters other than "-"
 * @example
 * stripSpecialCharacters("xx__Pu$$yD€$stroy€r__xx"); // returns "xxPuyDstroyrxx"
 * @example
 * stripSpecialCharacters("hubcio2115"); // returns "hubcio2115"
 * @example
 * stripSpecialCharacters("k-lisowski"); // returns "k-lisowski"
 */
export function stripSpecialCharacters(str: string): string {
  return str.replace(/[^a-zA-Z0-9-]/g, "");
}

/** Generate a 4 digit seed number for unique organization names */
export function generateSeedForOrgName(): number {
  return Math.floor(Math.random() * 10000);
}
