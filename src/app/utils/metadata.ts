import type { Metadata } from 'next';

export const baseMetadata = (title: string, description: string): Metadata => ({
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: 'Enjaz Dashboard',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
});