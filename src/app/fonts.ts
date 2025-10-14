import { Orbitron, Roboto } from 'next/font/google';

export const fontHeadline = Orbitron({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-headline',
});

export const fontBody = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
});
