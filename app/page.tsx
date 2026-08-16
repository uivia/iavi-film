import { HERO_IMAGE, SITE, getAlbums } from "@/lib/albums";

export default function HomePage() {
  const albums = getAlbums();
  const hero = albums[1] ?? { cover: HERO_IMAGE };

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-28">
      {/* The 'money shot' — a contained image, NOT full screen */}
      <div className="fade-in flex flex-col items-center text-center">
        <img
          src={hero.cover}
          alt="Featured work"
          className="max-h-[72vh] w-full object-cover"
        />
      </div>
    </div>
  );
}