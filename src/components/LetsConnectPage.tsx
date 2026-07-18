"use client";

import { useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";
import { HiMail, HiCheckCircle, HiExclamationCircle } from "react-icons/hi";
import {
  HiArrowRight,
  HiCalendarDays,
  HiChatBubbleOvalLeft,
} from "react-icons/hi2";
import { MotionReveal } from "@/components/MotionReveal";
import { contact } from "@/content/contact";
import { isValidEmail } from "@/lib/contact";
import type { Locale } from "@/lib/i18n";
import { t } from "@/i18n/ui";

/**
 * LetsConnectPage — the dedicated /contact page ("LET'S Connect").
 *
 * Serif display heading, social channel buttons, a Book a Call / Send a
 * Message toggle, and a glass message form with topic chips. Submissions go
 * through the preserved EmailJS integration (Req 16.6) with client-side
 * email validation that retains entered content on failure (Req 10.5).
 * Every control has a programmatic label (Req 14.4).
 */

const EMAILJS_SERVICE_ID = "service_qes66hs";
const EMAILJS_TEMPLATE_ID = "template_uxvoebn";
const EMAILJS_PUBLIC_KEY = "XHM38tfM4cFjaIgaE";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]";

/** Input shell shared by the text fields and the textarea. */
const FIELD_CLASSES = `mt-2 w-full rounded-xl border border-[rgba(0,0,0,0.12)] bg-[rgba(255,255,255,0.6)] px-4 py-3.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(255,255,255,0.04)] ${FOCUS_RING}`;

type SendStatus = "idle" | "loading" | "success" | "error";
type Mode = "call" | "message";

export function LetsConnectPage({ locale = "en" }: { locale?: Locale }) {
  const formRef = useRef<HTMLFormElement>(null);
  const dict = t(locale).contactPage;
  const TOPICS = dict.topics;

  const [mode, setMode] = useState<Mode>("message");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<string>(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [status, setStatus] = useState<SendStatus>("idle");

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
          setConsent(false);
        },
        () => {
          // Preserve the failure state and retain entered content (Req 16.6).
          setStatus("error");
        },
      );
  }

  const socialLinks = [
    {
      href: `mailto:${contact.email}`,
      label: `${dict.emailLabel} — ${contact.email}`,
      icon: HiMail,
      external: false,
    },
    {
      href: contact.linkedinUrl,
      label: dict.linkedinLabel,
      icon: AiOutlineLinkedin,
      external: true,
    },
    {
      href: contact.githubUrl,
      label: dict.githubLabel,
      icon: AiOutlineGithub,
      external: true,
    },
  ];

  const toggleBase = `inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300 ${FOCUS_RING}`;
  const toggleActive =
    "bg-[var(--color-text-primary)] text-[var(--color-background)]";
  const toggleIdle =
    "border border-[rgba(0,0,0,0.15)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] dark:border-[rgba(255,255,255,0.15)]";

  return (
    <main className="min-h-screen px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Heading. */}
        <MotionReveal complexity="simple" className="text-center">
          <h1 className="font-serif text-5xl font-black tracking-tight text-[var(--color-text-primary)] sm:text-7xl">
            {dict.titleLead}{" "}
            <span className="text-gradient-rose italic">
              {dict.titleAccent}
            </span>
          </h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.35em] text-[var(--color-text-secondary)]">
            {dict.subtitle}
          </p>
        </MotionReveal>

        {/* Social channels (Req 10.1). */}
        <MotionReveal
          complexity="simple"
          className="mt-8 flex justify-center gap-4"
        >
          {socialLinks.map(({ href, label, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={`flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(0,0,0,0.15)] bg-[rgba(255,255,255,0.6)] text-[var(--color-text-secondary)] backdrop-blur-md transition-[border-color,box-shadow,color] duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:shadow-[0_0_20px_var(--color-rose-glow)] dark:border-[rgba(255,255,255,0.15)] dark:bg-[rgba(255,255,255,0.05)] ${FOCUS_RING}`}
            >
              <Icon aria-hidden="true" size={18} />
            </a>
          ))}
        </MotionReveal>

        {/* Book a Call / Send a Message toggle. */}
        <MotionReveal
          complexity="simple"
          className="mt-10 flex justify-center gap-3"
        >
          <button
            type="button"
            onClick={() => setMode("call")}
            aria-pressed={mode === "call"}
            className={`${toggleBase} ${mode === "call" ? toggleActive : toggleIdle}`}
          >
            <HiCalendarDays aria-hidden="true" />
            {dict.bookACall}
          </button>
          <button
            type="button"
            onClick={() => setMode("message")}
            aria-pressed={mode === "message"}
            className={`${toggleBase} ${mode === "message" ? toggleActive : toggleIdle}`}
          >
            <HiChatBubbleOvalLeft aria-hidden="true" />
            {dict.sendAMessage}
          </button>
        </MotionReveal>

        {/* Panel. */}
        <MotionReveal complexity="standard" className="mt-10">
          <div className="rounded-2xl border border-[rgba(0,0,0,0.1)] bg-[linear-gradient(145deg,rgba(255,255,255,0.75),rgba(255,255,255,0.45))] p-6 backdrop-blur-md dark:border-[rgba(255,255,255,0.1)] dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))] sm:p-10">
            {mode === "call" ? (
              /* Book a Call: no external scheduler — email to arrange a time. */
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <p className="text-lg font-semibold text-[var(--color-text-primary)]">
                  {dict.callHeading}
                </p>
                <p className="max-w-sm text-sm text-[var(--color-text-secondary)]">
                  {dict.callBody}
                </p>
                <a
                  href={`mailto:${contact.email}?subject=${encodeURIComponent("Let's schedule a call")}`}
                  className={`mt-2 inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-6 py-3 font-semibold text-[var(--color-accent-foreground)] shadow-lg transition-transform hover:-translate-y-0.5 ${FOCUS_RING}`}
                >
                  <HiMail aria-hidden="true" />
                  {dict.emailToSchedule}
                </a>
              </div>
            ) : (
              /* Message form (Req 10.5, 14.4, 16.6). */
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="connect-name"
                      className="block font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)]"
                    >
                      {dict.name}
                    </label>
                    <input
                      id="connect-name"
                      name="user_name"
                      type="text"
                      required
                      placeholder={dict.namePlaceholder}
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className={FIELD_CLASSES}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="connect-email"
                      className="block font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)]"
                    >
                      {dict.email}
                    </label>
                    <input
                      id="connect-email"
                      name="user_email"
                      type="email"
                      required
                      placeholder={dict.emailPlaceholder}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      aria-invalid={emailError}
                      aria-describedby={
                        emailError ? "connect-email-error" : undefined
                      }
                      className={`${FIELD_CLASSES} ${emailError ? "!border-red-500" : ""}`}
                    />
                    {emailError && (
                      <p
                        id="connect-email-error"
                        data-testid="connect-email-error"
                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                      >
                        {dict.invalidEmail}
                      </p>
                    )}
                  </div>
                </div>

                {/* Topic chips. */}
                <fieldset>
                  <legend className="block font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
                    {dict.topic}
                  </legend>
                  <div className="mt-2 flex flex-wrap gap-2.5">
                    {TOPICS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setTopic(option)}
                        aria-pressed={topic === option}
                        className={`rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${FOCUS_RING} ${
                          topic === option
                            ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 font-semibold text-[var(--color-accent)]"
                            : "border-[rgba(0,0,0,0.15)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] dark:border-[rgba(255,255,255,0.15)]"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {/* Submitted with the EmailJS form payload. */}
                  <input type="hidden" name="topic" value={topic} />
                </fieldset>

                <div>
                  <label
                    htmlFor="connect-message"
                    className="block font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)]"
                  >
                    {dict.message}
                  </label>
                  <textarea
                    id="connect-message"
                    name="message"
                    required
                    rows={7}
                    placeholder={dict.messagePlaceholder}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className={`${FIELD_CLASSES} resize-none`}
                  />
                </div>

                <label
                  htmlFor="connect-consent"
                  className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]"
                >
                  <input
                    id="connect-consent"
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(event) => setConsent(event.target.checked)}
                    className={`mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-accent)] ${FOCUS_RING}`}
                  />
                  {dict.consent}
                </label>

                <button
                  type="submit"
                  disabled={status === "loading" || !consent}
                  data-testid="connect-submit"
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-6 py-4 font-semibold text-[var(--color-accent-foreground)] shadow-lg transition-transform hover:-translate-y-0.5 disabled:opacity-60 ${FOCUS_RING}`}
                >
                  {status === "loading" ? dict.sending : dict.send}
                  <HiArrowRight aria-hidden="true" className="rtl:rotate-180" />
                </button>

                {status === "success" && (
                  <p
                    role="status"
                    aria-live="polite"
                    className="inline-flex items-center gap-2 text-sm text-green-700 dark:text-green-400"
                  >
                    <HiCheckCircle aria-hidden="true" />
                    {dict.sent}
                  </p>
                )}

                {status === "error" && (
                  <p
                    role="alert"
                    className="inline-flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
                  >
                    <HiExclamationCircle aria-hidden="true" />
                    {dict.failed}
                  </p>
                )}
              </form>
            )}
          </div>
        </MotionReveal>
      </div>
    </main>
  );
}

export default LetsConnectPage;
