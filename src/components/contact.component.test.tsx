import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { ContactSection } from "@/components/ContactSection";
import { contact } from "@/content/contact";

/**
 * Component and accessibility tests for ContactSection
 * (Req 10.1, 10.2, 10.5, 14.3, 14.4).
 *
 * Verifies the contact channel link targets (Req 10.1), the primary
 * call-to-action that initiates contact (Req 10.2), programmatic labels on every
 * form control (Req 14.4), focus-visible indicators (Req 14.3), and that an
 * invalid email submission shows a validation message while retaining the
 * visitor's entered content (Req 10.5).
 */

afterEach(cleanup);

describe("ContactSection links and CTA (Req 10.1, 10.2)", () => {
  it("displays email, LinkedIn, and GitHub links with correct targets (Req 10.1)", () => {
    render(<ContactSection />);
    expect(screen.getByTestId("contact-email-link")).toHaveAttribute(
      "href",
      `mailto:${contact.email}`,
    );
    expect(screen.getByTestId("contact-linkedin-link")).toHaveAttribute(
      "href",
      contact.linkedinUrl,
    );
    expect(screen.getByTestId("contact-github-link")).toHaveAttribute(
      "href",
      contact.githubUrl,
    );
  });

  it("presents a primary call-to-action that initiates contact (Req 10.2)", () => {
    render(<ContactSection />);
    const cta = screen.getByTestId("contact-primary-cta");
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveTextContent(contact.primaryCtaLabel);
  });
});

describe("ContactSection form labels and focus (Req 14.3, 14.4)", () => {
  it("associates every form control with a programmatic label (Req 14.4)", () => {
    render(<ContactSection />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("exposes a visible focus indicator on interactive elements (Req 14.3)", () => {
    render(<ContactSection />);
    const interactives = [
      screen.getByLabelText("Name"),
      screen.getByLabelText("Email"),
      screen.getByLabelText("Message"),
      screen.getByTestId("contact-submit"),
      screen.getByTestId("contact-primary-cta"),
    ];
    for (const el of interactives) {
      expect(el.className).toMatch(/focus-visible:ring/);
    }
  });

  it("has no accessibility violations (Req 14.3, 14.4)", async () => {
    const { container } = render(<ContactSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("ContactSection email validation (Req 10.5)", () => {
  it("shows a validation message and retains entered content on invalid email", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    const nameInput = screen.getByLabelText("Name") as HTMLInputElement;
    const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
    const messageInput = screen.getByLabelText("Message") as HTMLTextAreaElement;

    await user.type(nameInput, "Jane Recruiter");
    await user.type(emailInput, "not-an-email");
    await user.type(messageInput, "I would like to chat about a role.");

    await user.click(screen.getByTestId("contact-submit"));

    // Validation message is shown (Req 10.5).
    expect(screen.getByTestId("contact-email-error")).toBeInTheDocument();

    // Entered content is retained (Req 10.5).
    expect(nameInput.value).toBe("Jane Recruiter");
    expect(emailInput.value).toBe("not-an-email");
    expect(messageInput.value).toBe("I would like to chat about a role.");
  });
});
