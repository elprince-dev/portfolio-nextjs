import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import emailjs from "@emailjs/browser";
import { ContactSection } from "@/components/ContactSection";

/**
 * Content preservation and migration tests (Req 16.2, 16.4, 16.6).
 *
 * - Resume assets preserved in /public (Req 16.2).
 * - No `.js`/`.jsx` source modules remain after the TypeScript migration
 *   (Req 16.4).
 * - The contact email (EmailJS) integration is preserved (Req 16.6).
 *
 * (The preserved blog feature was removed from the site, so its preservation
 * tests were removed with it.)
 */

vi.mock("@emailjs/browser", () => ({
  default: { sendForm: vi.fn() },
}));
const mockedSendForm = vi.mocked(emailjs.sendForm);

afterEach(cleanup);

describe("Resume assets preserved (Req 16.2)", () => {
  it("keeps the resume PDF and markdown assets in /public", () => {
    const publicDir = join(process.cwd(), "public");
    expect(existsSync(join(publicDir, "Resume - External.pdf"))).toBe(true);
    expect(existsSync(join(publicDir, "Resume - External.md"))).toBe(true);
  });
});

describe("No JavaScript source modules remain (Req 16.4)", () => {
  function collectSourceFiles(dir: string): string[] {
    const out: string[] = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        out.push(...collectSourceFiles(full));
      } else {
        out.push(full);
      }
    }
    return out;
  }

  it("contains no .js or .jsx files under src", () => {
    const srcDir = join(process.cwd(), "src");
    const offenders = collectSourceFiles(srcDir).filter(
      (file) => file.endsWith(".js") || file.endsWith(".jsx"),
    );
    expect(offenders).toEqual([]);
  });
});

describe("Contact EmailJS integration preserved (Req 16.6)", () => {
  beforeEach(() => {
    mockedSendForm.mockReset();
  });

  it("sends the message through EmailJS on a valid submission", async () => {
    mockedSendForm.mockResolvedValueOnce({
      status: 200,
      text: "OK",
    } as Awaited<ReturnType<typeof emailjs.sendForm>>);

    const user = userEvent.setup();
    render(<ContactSection />);

    await user.type(screen.getByLabelText("Name"), "Jane Recruiter");
    await user.type(screen.getByLabelText("Email"), "jane@example.com");
    await user.type(screen.getByLabelText("Message"), "Let's talk.");
    await user.click(screen.getByTestId("contact-submit"));

    await waitFor(() => expect(mockedSendForm).toHaveBeenCalledTimes(1));
  });

  it("retains entered content when the EmailJS send fails", async () => {
    mockedSendForm.mockRejectedValueOnce(new Error("send failed"));

    const user = userEvent.setup();
    render(<ContactSection />);

    const nameInput = screen.getByLabelText("Name") as HTMLInputElement;
    const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
    const messageInput = screen.getByLabelText("Message") as HTMLTextAreaElement;

    await user.type(nameInput, "Jane Recruiter");
    await user.type(emailInput, "jane@example.com");
    await user.type(messageInput, "Let's talk.");
    await user.click(screen.getByTestId("contact-submit"));

    await waitFor(() =>
      expect(screen.getByRole("alert")).toBeInTheDocument(),
    );

    // Entered content is retained after a failed send (Req 16.6).
    expect(nameInput.value).toBe("Jane Recruiter");
    expect(emailInput.value).toBe("jane@example.com");
    expect(messageInput.value).toBe("Let's talk.");
  });
});
