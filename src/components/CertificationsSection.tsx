import { BsPatchCheckFill } from "react-icons/bs";
import { Surface } from "@/components/Surface";
import { MotionReveal } from "@/components/MotionReveal";
import { certifications } from "@/content/certifications";

/**
 * CertificationsSection — professional certifications with premium visual
 * treatment (Req 9.1–9.3).
 *
 * Presents the AWS Solutions Architect Associate and AWS Cloud Practitioner
 * certifications (Req 9.1), displaying each certification's name and issuing
 * organization (Req 9.2). Each item renders on the design system's elevated
 * surface treatment via the {@link Surface} primitive (Req 9.3).
 */

export function CertificationsSection() {
  return (
    <section
      id="certifications"
      aria-label="Certifications"
      className="section-spacing px-4 sm:px-6 lg:px-8"
    >
      <h2 className="text-center text-4xl font-bold text-[var(--color-text-primary)]">
        Certifications
        <hr className="mx-auto my-4 h-1 w-6 rounded border-0 bg-[var(--color-accent)]" />
      </h2>

      <MotionReveal complexity="standard" className="mx-auto max-w-4xl">
        <ul
          data-testid="certifications-list"
          className="grid gap-6 sm:grid-cols-2"
          role="list"
        >
          {certifications.map((certification) => (
            <li key={certification.name}>
              <Surface
                variant="elevated"
                data-testid="certification-item"
                className="flex h-full items-start gap-4 rounded-2xl p-6"
              >
                <BsPatchCheckFill
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-2xl text-[var(--color-accent)]"
                />
                <div>
                  <h3
                    data-testid="certification-name"
                    className="font-semibold text-[var(--color-text-primary)]"
                  >
                    {certification.name}
                  </h3>
                  <p
                    data-testid="certification-issuer"
                    className="mt-1 text-sm text-[var(--color-text-secondary)]"
                  >
                    {certification.issuer}
                  </p>
                </div>
              </Surface>
            </li>
          ))}
        </ul>
      </MotionReveal>
    </section>
  );
}

export default CertificationsSection;
