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
          Hoy bakla anong cnasabe mo tongkol sakin. ha Bakla ayosin mo lng
        </p>
        <p className="mt-8 text-base leading-relaxed text-neutral-600">
          Hello ma’am,,menu PO natin for today,,. Binagoungan baboy na may talong. Sinigang na bangus dagupan. .adobong manok. Letchon paksiw Mebudo .igabo. At dinuguan. May monggo PO na may talbos NG amplaya,,{" "}
        </p>
        <p className="mt-8 text-sm uppercase tracking-[0.2em] text-neutral-500">
          Laguna
        </p>
      </div>
    </div>
  );
}