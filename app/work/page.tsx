import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAlbums } from "@/lib/albums";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkPage() {
  const albums = getAlbums();

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-28">

      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {albums.map((album) => (
          <Link
            key={album.slug}
            href={`/work/${album.slug}`}
            className="group block"
          >
            <div className="overflow-hidden bg-neutral-100">
              {/* Use a fixed aspect box so the grid stays even without real photos */}
              <div className="relative aspect-[6/4]">
                <Image
                  src={album.cover}
                  alt={album.title}
                  fill
                  sizes="(max-width: 640px) calc(100vw - 3rem), (max-width: 1024px) calc(50vw - 3rem), 352px"
                  quality={80}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="mt-4 text-sm uppercase tracking-[0.15em]">
              {album.title}
            </div>
            <div className="mt-1 text-xs tracking-[0.2em] text-neutral-500">
              {album.year}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
