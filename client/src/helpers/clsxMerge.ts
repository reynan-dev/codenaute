import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const clsxMerge = (...classes: ClassValue[]) => twMerge(clsx(...classes));
