import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getPageConfig } from '@/lib/content';
import ResearchFigure from '@/components/pages/ResearchFigure';
import type { CardItem, CardPageConfig } from '@/types/page';

function getResearchItems(): CardItem[] {
  return getPageConfig<CardPageConfig>('research')?.items ?? [];
}

function getResearchItem(slug: string): CardItem | undefined {
  return getResearchItems().find((item) => item.slug === slug);
}

export function generateStaticParams() {
  return getResearchItems()
    .filter((item) => item.slug)
    .map((item) => ({ slug: item.slug as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getResearchItem(slug);

  return item
    ? { title: item.title, description: item.content }
    : {};
}

export default async function ResearchDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getResearchItem(slug);

  if (!item) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/research"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark"
      >
        <span aria-hidden="true">←</span> Research
      </Link>

      <header className="mb-8 border-b border-neutral-200 pb-7 dark:border-neutral-800">
        {item.date && (
          <p className="mb-3 text-sm font-semibold tracking-wide text-accent">{item.date}</p>
        )}
        <h1 className="font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl">
          {item.title}
        </h1>
        {item.subtitle && (
          <p className="mt-4 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            {item.subtitle}
          </p>
        )}
        {item.tags && (
          <div className="mt-5 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {item.image && (
        <ResearchFigure src={item.image} title={item.title} />
      )}

      {item.content && (
        <section className="mb-8">
          <h2 className="mb-3 font-serif text-2xl font-semibold text-primary">Overview</h2>
          <div className="leading-7 text-neutral-700 dark:text-neutral-300">
            <ReactMarkdown>{item.content}</ReactMarkdown>
          </div>
        </section>
      )}

      {item.details && (
        <section className="border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-primary">Research Development</h2>
          <div className="research-detail-content space-y-4 leading-7 text-neutral-700 dark:text-neutral-300">
            <ReactMarkdown>{item.details}</ReactMarkdown>
          </div>
        </section>
      )}

      {item.links && item.links.length > 0 && (
        <section className="mt-9 border-t border-neutral-200 pt-6 dark:border-neutral-800">
          <h2 className="mb-3 font-serif text-xl font-semibold text-primary">Resources</h2>
          <div className="flex flex-wrap gap-4">
            {item.links.map((resource) => (
              <a
                key={resource.url}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-accent hover:text-accent-dark"
              >
                {resource.label} ↗
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
