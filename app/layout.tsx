import type { Metadata } from "next";
import Link from "next/link";
import "@/app/globals.css";
import { SITE } from "@/lib/albums";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — Analog Film`,
    template: `%s — ${SITE.name}`,
  },
  description: `${SITE.name} — analog film photography.`,
};

const links = [
  { href: "/", label: SITE.name },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 text-sm uppercase tracking-[0.2em] text-white">
            <Link href="/" className="font-medium">
              {SITE.name}
            </Link>
            <div className="flex gap-8">
              <Link href="/work">Work</Link>
              <Link href="/about">About</Link>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}