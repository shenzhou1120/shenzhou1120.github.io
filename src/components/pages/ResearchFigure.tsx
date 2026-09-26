'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

interface ResearchFigureProps {
  src: string;
  title: string;
}

export default function ResearchFigure({ src, title }: ResearchFigureProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchDistance = useRef<number | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const resetZoom = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    pointers.current.clear();
    pinchDistance.current = null;
  };

  const changeZoom = (amount: number) => {
    const next = Math.max(1, Math.min(4, scale + amount));
    setScale(next);
    if (next === 1) setOffset({ x: 0, y: 0 });
  };

  const getPointerDistance = () => {
    const [first, second] = Array.from(pointers.current.values());
    return Math.hypot(first.x - second.x, first.y - second.y);
  };

  const endPointer = (pointerId: number) => {
    pointers.current.delete(pointerId);
    pinchDistance.current = null;
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          resetZoom();
          dialogRef.current?.showModal();
        }}
        aria-label={`Enlarge figure: ${title}`}
        className="relative mb-9 block aspect-[16/8] w-full cursor-zoom-in overflow-hidden border border-neutral-200 bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:border-neutral-800 dark:bg-neutral-900"
      >
        <Image
          src={src}
          alt={`${title} research figure`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-contain"
        />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={`${title} research figure`}
        onClose={resetZoom}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-6xl border border-neutral-200 bg-white p-3 text-primary shadow-xl backdrop:bg-black/80 dark:border-neutral-700 dark:bg-neutral-900 sm:p-4"
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="min-w-0 truncate text-sm font-medium">{title}</p>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close enlarged figure"
            className="shrink-0 rounded px-2 py-1 text-sm font-semibold text-neutral-600 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent dark:text-neutral-300"
          >
            Close ×
          </button>
        </div>
        <div className="mb-3 flex items-center justify-center gap-3 text-sm">
          <button
            type="button"
            onClick={() => changeZoom(-0.5)}
            disabled={scale <= 1}
            aria-label="Zoom out"
            className="rounded border border-neutral-200 px-3 py-1 disabled:opacity-40 dark:border-neutral-700"
          >
            −
          </button>
          <span className="min-w-12 text-center tabular-nums">{Math.round(scale * 100)}%</span>
          <button
            type="button"
            onClick={() => changeZoom(0.5)}
            disabled={scale >= 4}
            aria-label="Zoom in"
            className="rounded border border-neutral-200 px-3 py-1 disabled:opacity-40 dark:border-neutral-700"
          >
            +
          </button>
          <button
            type="button"
            onClick={resetZoom}
            className="rounded border border-neutral-200 px-3 py-1 dark:border-neutral-700"
          >
            Reset
          </button>
        </div>
        <div
          className={`relative h-[calc(100dvh-10rem)] w-full overflow-hidden touch-none select-none ${scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'}`}
          onDoubleClick={() => scale > 1 ? resetZoom() : changeZoom(1)}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
            if (pointers.current.size === 2) pinchDistance.current = getPointerDistance();
          }}
          onPointerMove={(event) => {
            const previous = pointers.current.get(event.pointerId);
            if (!previous) return;
            pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

            if (pointers.current.size === 2) {
              const distance = getPointerDistance();
              if (pinchDistance.current) {
                const ratio = distance / pinchDistance.current;
                const next = Math.max(1, Math.min(4, scale * ratio));
                setScale(next);
                if (next === 1) setOffset({ x: 0, y: 0 });
              }
              pinchDistance.current = distance;
            } else if (scale > 1) {
              setOffset((current) => ({
                x: current.x + event.clientX - previous.x,
                y: current.y + event.clientY - previous.y,
              }));
            }
          }}
          onPointerUp={(event) => endPointer(event.pointerId)}
          onPointerCancel={(event) => endPointer(event.pointerId)}
        >
          <Image
            src={src}
            alt={`${title} research figure, enlarged`}
            fill
            sizes="(max-width: 1152px) 100vw, 1152px"
            draggable={false}
            className="pointer-events-none object-contain"
            style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})` }}
          />
        </div>
      </dialog>
    </>
  );
}
