"use client";

import { useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import {
  HiMail,
  HiCheckCircle,
  HiExclamationCircle,
  HiClipboardCopy,
} from "react-icons/hi";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";
import { Surface } from "@/components/Surface";
import { MotionReveal } from "@/components/MotionReveal";
import { contact } from "@/content/contact";
import { isValidEmail, resolveEmailAction } from "@/lib/contact";

/**
 * ContactSection — contact channels, primary CTA, and a validated message form
 * (Req 10.1–10.5, 14.4, 16.6).
 *
 * Displays direct LinkedIn, GitHub, and email links (Req 10.1) and a primary
 * call-to-action that initiates contact (Req 10.2). The email action attempts
 * to open an email composition addressed to the contact address (Req 10.3);
 * when composition fails to open, {@link resolveEmailAction} resolves to a
 * clipboard fallback that copies the address and notifies the visitor
 * (Req 10.4).
 *
 * The message form is validated client-side with {@link isValidEmail}: an
 * invalid email shows a validation message and retains all entered content
 * (Req 10.5). Every control is associated with a programmatic `<label>` via
 * `htmlFor`/`id` (Req 14.4). Valid submissions are sent through the preserved
 * EmailJS integration (Req 16.6).
 */

const EMAILJS_SERVICE_ID = "service_qes66hs";
const EMAILJS_TEMPLATE_ID = "template_uxvoebn";
const EMAILJS_PUBLIC_KEY = "XHM38tfM4cFjaIgaE";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]";

type SendStatus = "idle" | "loading" | "success" | "error";

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [status, setStatus] = useState<SendStatus>("idle");
  const [notification, setNotification] = useState<string | null>(null);

  /**
   * Initiate contact via the visitor's mail client (Req 10.2, 10.3). If the
   * compose window fails to open, fall back to copying the address and
   * notifying the visitor (Req 10.4).
   */
  function handleEmailAction() {
    let opened = false;
    try {
      const composed = window.open(`mailto:${contact.email}`, "_self");
      // A null result indicates the mail client did not open.
      opened = composed !== null;
    } catch {
      opened = false;
    }

    const action = resolveEmailAction(opened, contact.email);
    if (action.kind === "fallback-copy") {
      const notify = () =>
        setNotification(`Email address copied: ${action.address}`);
      try {
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(action.address).then(notify, () =>
            setNotification(`Email Mohammad at ${action.address}`),
          );
        } else {
          setNotification(`Email Mohammad at ${action.address}`);
        }
      } catch {
        setNotification(`Email Mohammad at ${action.address}`);
      }
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Validate the email; on failure show a message and retain content (Req 10.5).
    if (!isValidEmail(email)) {
      setEmailError(true);
      setStatus("idle");
      return;
    }
    setEmailError(false);

    const form = formRef.current;
    if (!form) return;

    setStatus("loading");
    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, {
        publicKey: EMAILJS_PUBLIC_KEY,
      })
      .then(
        () => {
          setStatus("success");
          setName("");
          setEmail("");
          setMessage("");
        },
        () => {
          // Preserve the failure state and retain entered content (Req 16.6).
          setStatus("error");
        },
      );
  }

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="section-spacing px-4 sm:px-6 lg:px-8"
    >
      <h2 className="text-center text-4xl font-bold text-[var(--color-text-primary)]">
        Contact
        <hr className="mx-auto my-4 h-1 w-6 rounded border-0 bg-[var(--color-accent)]" />
      </h2>

      <MotionReveal
        complexity="standard"
        className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2"
      >
        {/* Channels + primary CTA. */}
        <Surface variant="elevated" className="rounded-2xl p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Let&apos;s connect
          </h3>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            Open to AI Engineer, Software Engineer, and Backend Engineer roles.
            Reach out through any channel below.
          </p>

          {/* Primary CTA initiates contact (Req 10.2, 10.3, 10.4). */}
          <button
            type="button"
            onClick={handleEmailAction}
            data-testid="contact-primary-cta"
            className={`mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-6 py-3 font-semibold text-[var(--color-accent-foreground)] shadow-lg transition-transform hover:-translate-y-0.5 ${FOCUS_RING}`}
          >
            <HiMail aria-hidden="true" />
            {contact.primaryCtaLabel}
          </button>

          {notification && (
            <p
              role="status"
              aria-live="polite"
              data-testid="contact-notification"
              className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"
            >
              <HiClipboardCopy aria-hidden="true" />
              {notification}
            </p>
          )}

          {/* Direct links (Req 10.1). */}
          <ul className="mt-8 space-y-3" role="list">
            <li>
              <a
                href={`mailto:${contact.email}`}
                data-testid="contact-email-link"
                className={`inline-flex items-center gap-3 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] ${FOCUS_RING}`}
              >
                <HiMail aria-hidden="true" className="text-xl" />
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mohammad's LinkedIn profile"
                data-testid="contact-linkedin-link"
                className={`inline-flex items-center gap-3 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] ${FOCUS_RING}`}
              >
                <AiOutlineLinkedin aria-hidden="true" className="text-xl" />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mohammad's GitHub profile"
                data-testid="contact-github-link"
                className={`inline-flex items-center gap-3 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] ${FOCUS_RING}`}
              >
                <AiOutlineGithub aria-hidden="true" className="text-xl" />
                GitHub
              </a>
            </li>
          </ul>
        </Surface>

        {/* Validated message form (Req 10.5, 14.4, 16.6). */}
        <Surface variant="elevated" className="rounded-2xl p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Send a message
          </h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="mt-6 space-y-5"
          >
            <div>
              <label
                htmlFor="contact-name"
                className="block text-sm font-medium text-[var(--color-text-secondary)]"
              >
                Name
              </label>
              <input
                id="contact-name"
                name="user_name"
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={`mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-text-primary)] ${FOCUS_RING}`}
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block text-sm font-medium text-[var(--color-text-secondary)]"
              >
                Email
              </label>
              <input
                id="contact-email"
                name="user_email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={emailError}
                aria-describedby={emailError ? "contact-email-error" : undefined}
                className={`mt-1 w-full rounded-xl border bg-[var(--color-surface)] px-4 py-3 text-[var(--color-text-primary)] ${
                  emailError
                    ? "border-red-500"
                    : "border-[var(--color-border)]"
                } ${FOCUS_RING}`}
              />
              {emailError && (
                <p
                  id="contact-email-error"
                  data-testid="contact-email-error"
                  className="mt-1 text-sm text-red-600 dark:text-red-400"
                >
                  Please enter a valid email address.
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-medium text-[var(--color-text-secondary)]"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className={`mt-1 w-full resize-none rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-text-primary)] ${FOCUS_RING}`}
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              data-testid="contact-submit"
              className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-6 py-3 font-semibold text-[var(--color-accent-foreground)] shadow-lg transition-transform hover:-translate-y-0.5 disabled:opacity-60 ${FOCUS_RING}`}
            >
              {status === "loading" ? "Sending..." : "Send message"}
            </button>

            {status === "success" && (
              <p
                role="status"
                aria-live="polite"
                className="inline-flex items-center gap-2 text-sm text-green-700 dark:text-green-400"
              >
                <HiCheckCircle aria-hidden="true" />
                Message sent. I&apos;ll get back to you soon.
              </p>
            )}

            {status === "error" && (
              <p
                role="alert"
                className="inline-flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
              >
                <HiExclamationCircle aria-hidden="true" />
                Failed to send. Please try again or email me directly.
              </p>
            )}
          </form>
        </Surface>
      </MotionReveal>
    </section>
  );
}

export default ContactSection;
