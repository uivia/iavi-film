import albumsData from "@/data/albums.json";
import fs from "node:fs";
import path from "node:path";

export type PhotoWork = {
  slug: string;
  title: string;
  year: string;
  description: string;
  roll: string;
  cover: string;
  images: string[];
  imageFolder?: string;
  youtubeId?: string;
};

export const SITE = {
  name: "iavi",
};

export const HERO_IMAGE = "/images/hero.svg";

type AlbumData = Omit<PhotoWork, "images"> & {
  images?: string[];
  imageFolder?: string;
};

const albums = albumsData as AlbumData[];
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);

function imagesInFolder(folder: string, cover: string): string[] {
  const publicFolder = path.join(process.cwd(), "public", folder.replace(/^\/+/, ""));
  if (!fs.existsSync(publicFolder)) return [];
  const images = fs
    .readdirSync(publicFolder, { withFileTypes: true })
    .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => `${folder.replace(/\/$/, "")}/${entry.name}`)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  // Keep the configured cover as the slideshow opener, then show the rest
  // of the folder in filename order.
  return [cover, ...images.filter((image) => image !== cover)];
}

export function getAlbums(): PhotoWork[] {
  return albums.map((album) => ({
    ...album,
    images: album.imageFolder
      ? imagesInFolder(album.imageFolder, album.cover)
      : album.images ?? [],
  }));
}

export function getAlbum(slug: string): PhotoWork | undefined {
  return getAlbums().find((album) => album.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAlbums().map((album) => album.slug);
}
