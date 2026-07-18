import Reveal from "@/components/Reveal";
import SectionHeading from "./SectionHeading";

interface AboutDict {
  title: string;
  subtitle: string;
  body: string[];
  highlights: { value: string; label: string }[];
}

export default function About({ dict }: { dict: AboutDict }) {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading subtitle={dict.subtitle} title={dict.title} />

      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <Reveal stagger className="space-y-5">
          {dict.body.map((para, i) => (
            <p key={i} className="text-lg leading-relaxed text-text-secondary">
              {para}
            </p>
          ))}
        </Reveal>

        <Reveal stagger className="grid content-start gap-4">
          {dict.highlights.map((h) => (
            <div
              key={h.label}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary"
            >
              <p className="font-serif text-3xl font-black text-primary">
                {h.value}
              </p>
              <p className="mt-1 text-sm text-text-secondary">{h.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
