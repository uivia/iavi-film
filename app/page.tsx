import Image from "next/image";
import { HERO_IMAGE, SITE, getAlbums } from "@/lib/albums";

export default function HomePage() {
  const albums = getAlbums();
  const hero = albums[1] ?? { cover: HERO_IMAGE };

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-28">
      {/* The 'money shot' — a contained image, NOT full screen */}
      <div className="fade-in flex flex-col items-center text-center">
        <div className="relative aspect-[3/2] max-h-[72vh] w-full">
          <Image
            src={hero.cover}
            alt="Featured work"
            fill
            sizes="(max-width: 1024px) calc(100vw - 3rem), 1024px"
            quality={80}
            priority
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
