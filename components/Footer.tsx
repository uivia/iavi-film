export default function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-10 text-xs uppercase tracking-[0.2em] text-neutral-500">
      <a
        href="https://www.instagram.com/iavi.film"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="text-neutral-400 transition-colors hover:text-ink"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4.5" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      </a>
    </footer>
  );
}
