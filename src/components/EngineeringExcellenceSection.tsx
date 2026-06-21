import { Surface } from "@/components/Surface";
import { MotionReveal } from "@/components/MotionReveal";
import { engineeringDepthAreas } from "@/content/engineering";

/**
 * EngineeringExcellenceSection — system design and cloud-architecture depth
 * (Req 6.1–6.3).
 *
 * Presents the engineering depth areas (system design, scalability, cloud
 * architecture, AWS services, backend engineering) from the typed content
 * (Req 6.1), each with concrete evidence drawn from preserved content including
 * the multi-region serverless platform (Req 6.2). Each named AWS service is
 * rendered using the label defined in the content, which is kept consistent
 * with the Skills section terminology (Req 6.3).
 */

export function EngineeringExcellenceSection() {
  return (
    <section
      id="engineering-excellence"
      aria-label="Engineering excellence"
      className="section-spacing px-4 sm:px-6 lg:px-8"
    >
      <h2 className="text-center text-4xl font-bold text-[var(--color-text-primary)]">
        Engineering Excellence
        <hr className="mx-auto my-4 h-1 w-6 rounded border-0 bg-[var(--color-accent)]" />
      </h2>

      <MotionReveal complexity="standard" className="mx-auto max-w-6xl">
        <ul className="grid gap-6 lg:grid-cols-2" role="list">
          {engineeringDepthAreas.map((area) => (
            <li key={area.title}>
              <Surface
                variant="elevated"
                data-testid="engineering-depth-area"
                className="flex h-full flex-col gap-4 rounded-2xl p-6"
              >
                <div>
                  <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-[var(--color-text-secondary)]">
                    {area.description}
                  </p>
                </div>

                {/* Concrete evidence (Req 6.2). */}
                <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--color-text-secondary)]">
                  {area.evidence.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                {/* AWS service labels consistent with Skills terminology (Req 6.3). */}
                {area.awsServices.length > 0 && (
                  <ul
                    data-testid="aws-services"
                    className="mt-auto flex flex-wrap gap-2"
                    role="list"
                  >
                    {area.awsServices.map((service) => (
                      <li
                        key={service}
                        data-testid="aws-service-label"
                        className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)]"
                      >
                        {service}
                      </li>
                    ))}
                  </ul>
                )}
              </Surface>
            </li>
          ))}
        </ul>
      </MotionReveal>
    </section>
  );
}

export default EngineeringExcellenceSection;
