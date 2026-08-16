import albumsData from "@/data/albums.json";

export type PhotoWork = {
  slug: string;
  title: string;
  year: string;
  description: string;
  roll: string;
  cover: string;
  images: string[];
  youtubeId?: string;
};

export const SITE = {
  name: "iavi",
};

export const HERO_IMAGE = "/images/hero.svg";

const albums: PhotoWork[] = albumsData as PhotoWork[];

export function getAlbums(): PhotoWork[] {
  return albums.map((album) => ({
    ...album,
    // The cover is always the first image of the slideshow.
    images: album.images.length > 0 ? album.images : [album.cover],
  }));
}

export function getAlbum(slug: string): PhotoWork | undefined {
  return getAlbums().find((album) => album.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAlbums().map((album) => album.slug);
}