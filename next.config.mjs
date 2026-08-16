/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export a fully static site (HTML + images) so it can be hosted on
  // any static host (Netlify, GitHub Pages, Vercel) with no server.
  output: "export",
  // Keeps every album image path intact inside the /out folder.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;