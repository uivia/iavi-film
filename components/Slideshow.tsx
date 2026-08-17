"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PhotoWork } from "@/lib/albums";

type Props = {
  album: PhotoWork;
};

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

// The IFrame API is loaded once and reused across album visits; it calls
// window.onYouTubeIframeAPIReady globally when ready (YouTube's own design).
let apiReadyPromise: Promise<void> | null = null;
function loadYouTubeApi(): Promise<void> {
  if (apiReadyPromise) return apiReadyPromise;
  apiReadyPromise = new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve();
      return;
    }
    const prevReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prevReady?.();
      resolve();
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(script);
  });
  return apiReadyPromise;
}

export default function Slideshow({ album }: Props) {
  return <SlideshowInner album={album} />;
}

function SlideshowInner({ album }: { album: PhotoWork }) {
  const [index, setIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(
    () => new Set()
  );
  const total = album.images.length;

  const visibleIndexes = Array.from(
    new Set([(index - 1 + total) % total, index, (index + 1) % total])
  );

  const go = useCallback(
    (dir: number) => {
      setIndex((i) => (i + dir + total) % total);
    },
    [total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const playerMountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!album.youtubeId) return;
    let cancelled = false;

    loadYouTubeApi().then(() => {
      if (cancelled || !playerMountRef.current) return;
      playerRef.current = new window.YT.Player(playerMountRef.current, {
        videoId: album.youtubeId,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: album.youtubeId,
        },
        events: {
          onReady: (e: any) => e.target.playVideo(),
          onStateChange: (e: any) => {
            setIsPlaying(e.data === window.YT.PlayerState.PLAYING);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [album.youtubeId]);

  return (
    <div className="flex min-h-screen flex-col">
      {album.youtubeId && (
        <div className="absolute h-0 w-0 overflow-hidden">
          <div ref={playerMountRef} />
        </div>
      )}
      <div className="mx-auto flex w-full max-w-6xl items-end justify-between px-6 pt-28">
        <div className="flex items-center gap-4 text-sm tracking-[0.2em] text-neutral-500">
          <span>
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
          {album.youtubeId && (
            <button
              onClick={() =>
                isPlaying
                  ? playerRef.current?.pauseVideo()
                  : playerRef.current?.playVideo()
              }
              aria-label={isPlaying ? "Pause music" : "Play music"}
              className="text-neutral-400 transition-colors hover:text-ink"
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>
          )}
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-6 py-10">
        <div
          className="relative h-[72vh] w-full max-w-6xl"
          aria-live="polite"
        >
          {!loadedImages.has(album.images[index]) && (
            <div
              className="absolute inset-0 animate-pulse bg-neutral-100"
              aria-hidden="true"
            />
          )}

          {visibleIndexes.map((slideIndex) => {
            const src = album.images[slideIndex];
            const isCurrent = slideIndex === index;
            const isLoaded = loadedImages.has(src);

            return (
              <Image
                key={src}
                src={src}
                alt={isCurrent ? `${album.title} — ${slideIndex + 1}` : ""}
                fill
                sizes="(max-width: 768px) calc(100vw - 3rem), 1152px"
                quality={80}
                priority={index === 0 && slideIndex === 0}
                loading={index === 0 && slideIndex === 0 ? undefined : "eager"}
                onLoad={() =>
                  setLoadedImages((loaded) => {
                    if (loaded.has(src)) return loaded;
                    const next = new Set(loaded);
                    next.add(src);
                    return next;
                  })
                }
                className={`object-contain transition-opacity duration-300 ${
                  isCurrent && isLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            );
          })}
        </div>

        <button
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="absolute inset-y-0 left-0 w-1/3 cursor-w-resize"
        />
        <button
          onClick={() => go(1)}
          aria-label="Next photo"
          className="absolute inset-y-0 right-0 w-1/3 cursor-e-resize"
        />

        <button
          onClick={() => go(-1)}
          aria-label="Previous"
          className="absolute left-4 z-10 px-3 py-2 text-2xl text-neutral-400 transition-colors hover:text-ink sm:left-8"
        >
          &#8592;
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next"
          className="absolute right-4 z-10 px-3 py-2 text-2xl text-neutral-400 transition-colors hover:text-ink sm:right-8"
        >
          &#8594;
        </button>
      </div>

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pb-10">
        <Link
          href="/work"
          className="text-xs uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-ink"
        >
          &#8592; Work
        </Link>
        <p className="max-w-md text-center text-xs leading-relaxed text-neutral-500">
          {album.description}
        </p>
        <p className="max-w-md text-center text-xs leading-relaxed text-neutral-500">
          {album.roll}
        </p>
        <span className="w-16" />
      </div>
    </div>
  );
}
