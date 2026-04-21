import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learn About Mental Health | Faith Marie Foundation',
  description: 'A comprehensive guide to understanding mental health conditions, medications, natural approaches, and paths to healing. Written with care for those navigating their own journey or supporting loved ones.',
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
    description: 'A comprehensive guide to understanding mental health conditions, treatments, and paths to healing — whether you\'re walking this road yourself or supporting someone you love.',
    type: 'website',
    url: 'https://faithmarie.org/learn',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mental Health, Explained with Care | Faith Marie Foundation',
    description: 'A comprehensive guide to understanding mental health conditions, treatments, and paths to healing.',
  },
};

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
