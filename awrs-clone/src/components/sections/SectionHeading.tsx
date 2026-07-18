import Reveal from "@/components/Reveal";

export default function SectionHeading({
  subtitle,
  title,
}: {
  subtitle: string;
  title: string;
}) {
  return (
    <Reveal className="mb-12">
      <p className="mb-2 font-mono text-sm tracking-wide text-primary">
        {subtitle}
      </p>
      <h2 className="font-serif text-3xl font-bold tracking-tight text-text sm:text-4xl">
        {title}
      </h2>
      <span className="mt-4 block h-1 w-16 rounded-full bg-primary" />
    </Reveal>
  );
}
