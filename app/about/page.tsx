import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6">
      <div>
        <h1 className="mb-10 text-sm uppercase tracking-[0.3em] text-neutral-500">
          About
        </h1>
        <p className="text-2xl font-light leading-relaxed sm:text-3xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          facilisi. Sed sit amet dolor ac libero vehicula interdum. Vestibulum
          ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; Proin vitae urna at ligula tincidunt tincidunt.
        </p>
        <p className="mt-8 text-base leading-relaxed text-neutral-600">
          Curabitur non eros vitae nisi faucibus placerat. Phasellus egestas
          turpis non magna condimentum, sed convallis nunc efficitur. Donec a
          lectus eget velit condimentum. Aliquam erat volutpat. Sed euismod
          justo a sem hendrerit, at porta justo dictum.{" "}
        </p>
        <p className="mt-8 text-sm uppercase tracking-[0.2em] text-neutral-500">
          Portland, OR
        </p>
      </div>
    </div>
  );
}