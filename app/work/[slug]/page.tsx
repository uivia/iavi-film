import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAlbum, getAllSlugs } from "@/lib/albums";
import Slideshow from "@/components/Slideshow";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate all album pages at build time.
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const album = getAlbum(slug);
  return { title: album ? album.title : "Album" };
}

export default async function AlbumPage({ params }: Props) {
  const { slug } = await params;
  const album = getAlbum(slug);
  if (!album) notFound();
  return <Slideshow slug={slug} />;
}