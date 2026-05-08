import { notFound } from 'next/navigation';
import { DemoExperience } from '@/components/DemoExperience';
import { demos } from '@/lib/site-data';

export function generateStaticParams() {
  return demos.map((demo) => ({ slug: demo.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const demo = demos.find((item) => item.slug === slug);
  if (!demo) return {};
  return {
    title: `${demo.name} — APTO.INK example website`,
    description: demo.headline,
    openGraph: { title: `${demo.name} — example website`, description: demo.headline, images: [demo.thumb] }
  };
}

export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const demo = demos.find((item) => item.slug === slug);
  if (!demo) notFound();
  return <DemoExperience demo={demo} />;
}
