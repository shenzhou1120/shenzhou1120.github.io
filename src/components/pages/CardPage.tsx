'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { CardPageConfig } from '@/types/page';

const markdownComponents = {
    p: ({ children }: React.ComponentProps<'p'>) => <p className="mb-3 last:mb-0">{children}</p>,
    ul: ({ children }: React.ComponentProps<'ul'>) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
    ol: ({ children }: React.ComponentProps<'ol'>) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
    li: ({ children }: React.ComponentProps<'li'>) => <li className="mb-1">{children}</li>,
    a: ({ ...props }) => (
        <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
        />
    ),
    blockquote: ({ children }: React.ComponentProps<'blockquote'>) => (
        <blockquote className="border-l-4 border-accent/50 pl-4 italic my-4 text-neutral-600 dark:text-neutral-500">
            {children}
        </blockquote>
    ),
    strong: ({ children }: React.ComponentProps<'strong'>) => <strong className="font-semibold text-primary">{children}</strong>,
    em: ({ children }: React.ComponentProps<'em'>) => <em className="italic">{children}</em>,
    code: ({ children }: React.ComponentProps<'code'>) => (
        <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[0.95em]">{children}</code>
    ),
};

export default function CardPage({ config, embedded = false }: { config: CardPageConfig; embedded?: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className={embedded ? "mb-4" : "mb-8"}>
                <h1 className={`${embedded ? "text-2xl" : "text-4xl"} font-serif font-bold text-primary mb-4`}>{config.title}</h1>
                {config.description && (
                    <div className={`${embedded ? "text-base" : "text-lg"} text-neutral-600 dark:text-neutral-500 max-w-2xl leading-relaxed`}>
                        <ReactMarkdown components={markdownComponents}>
                            {config.description}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            <div className={`grid ${embedded ? "gap-4" : "gap-6"}`}>
                {config.items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className={`bg-white dark:bg-neutral-900 ${embedded ? "p-4" : "p-6"} rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all duration-200 hover:scale-[1.01]`}
                    >
                        <div className="flex flex-col gap-6 md:flex-row">
                            {item.image && (
                                <div className="w-full shrink-0 md:w-48">
                                    <div className="relative aspect-video overflow-hidden rounded-lg bg-neutral-50 dark:bg-neutral-800 md:aspect-[4/3]">
                                        <Image
                                            src={item.image}
                                            alt=""
                                            fill
                                            loading="eager"
                                            sizes="(max-width: 768px) 100vw, 192px"
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            )}
                            <div className="min-w-0 flex-1">
                                <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                    <h3 className={`${embedded ? "text-lg" : "text-xl"} min-w-0 flex-1 font-semibold leading-snug text-primary`}>
                                        {item.slug ? (
                                            <Link
                                                href={`/research/${item.slug}`}
                                                className="group transition-colors hover:text-accent"
                                            >
                                                {item.title}
                                                <span aria-hidden="true" className="ml-2 inline-block text-accent transition-transform group-hover:translate-x-1">→</span>
                                            </Link>
                                        ) : item.title}
                                    </h3>
                                    {item.date && (
                                        <span className="self-end whitespace-nowrap rounded bg-neutral-100 px-2 py-1 text-sm font-medium text-neutral-500 sm:shrink-0 sm:self-start dark:bg-neutral-800">
                                            {item.date}
                                        </span>
                                    )}
                                </div>
                                {item.subtitle && (
                                    <p className={`${embedded ? "text-sm" : "text-base"} mb-3 font-medium text-accent`}>{item.subtitle}</p>
                                )}
                                {item.content && (
                                    <div className={`${embedded ? "text-sm" : "text-base"} leading-relaxed text-neutral-600 dark:text-neutral-500`}>
                                        <ReactMarkdown components={markdownComponents}>
                                            {item.content}
                                        </ReactMarkdown>
                                    </div>
                                )}
                                {item.details && !item.slug && (
                                    <details className="group mt-4 border-t border-neutral-200 pt-3 dark:border-neutral-800">
                                        <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-accent">
                                            <span className="inline-flex h-4 w-4 items-center justify-center border border-current text-xs leading-none group-open:hidden">+</span>
                                            <span className="hidden h-4 w-4 items-center justify-center border border-current text-xs leading-none group-open:inline-flex">−</span>
                                            Research development
                                        </summary>
                                        <div className="mt-4 border-l border-neutral-200 pl-4 leading-relaxed text-neutral-600 dark:border-neutral-800 dark:text-neutral-500">
                                            <ReactMarkdown components={markdownComponents}>
                                                {item.details}
                                            </ReactMarkdown>
                                        </div>
                                    </details>
                                )}
                                {item.tags && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {item.tags.map(tag => (
                                            <span key={tag} className="rounded border border-neutral-100 bg-neutral-50 px-2 py-1 text-xs text-neutral-500 dark:border-neutral-800 dark:bg-neutral-800/50">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {item.links && item.links.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-4">
                                        {item.links.map(link => (
                                            <a
                                                key={link.url}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm font-semibold text-accent hover:text-accent-dark"
                                            >
                                                {link.label} ↗
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
