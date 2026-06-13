import type { PolicyPageContent } from "@/lib/policies";

export function PolicyPage({ content }: { content: PolicyPageContent }) {
  return (
    <main className="bg-ink">
      <section className="border-b border-white/10 bg-edge-light">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-sakura">
            {content.eyebrow}
          </p>
          <h1 className="text-4xl font-black text-bone sm:text-6xl">{content.title}</h1>
          <p className="mt-6 text-lg leading-8 text-steel">{content.intro}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-4xl gap-5 px-4 py-16 sm:px-6 lg:px-8">
        {content.sections.map((section) => (
          <article key={section.heading} className="border border-white/10 bg-smoke p-6">
            <h2 className="text-xl font-black text-bone">{section.heading}</h2>
            <p className="mt-3 leading-7 text-steel">{section.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
