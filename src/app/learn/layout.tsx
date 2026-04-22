import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learn About Mental Health | Faith Marie Foundation',
  description: 'A comprehensive guide to understanding mental health conditions, medications, natural approaches, and paths to healing — for every family navigating this.',
  keywords: [
    'mental health education',
    'depression explained',
    'anxiety disorders',
    'PTSD',
    'bipolar disorder',
    'OCD',
    'ADHD',
    'antidepressants',
    'SSRIs',
    'mental health medications',
    'therapy types',
    'mental health support',
    'grief support',
  ],
  openGraph: {
    title: 'Mental Health, Explained with Care | Faith Marie Foundation',
    description: 'Helping every family navigating grief and mental health find the resources and guidance they need. In memory of Faith Marie.',
    type: 'website',
    url: 'https://faithmarie.org/learn',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mental Health, Explained with Care | Faith Marie Foundation',
    description: 'Helping every family navigating grief and mental health find the resources and guidance they need. In memory of Faith Marie.',
  },
};

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
