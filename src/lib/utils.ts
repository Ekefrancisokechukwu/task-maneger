import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const delay = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
};

export const dateFormate = (date: Date) => {
  return format(date, "LLL dd, y");
};
