import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import emailjs from "@emailjs/browser";
import BlogModal from "@/components/BlogModal";
import { getAllBlogs, type Blog } from "@/data/blogs";
import { ContactSection } from "@/components/ContactSection";

/**
 * Content preservation and migration tests (Req 16.1, 16.2, 16.4, 16.6).
 *
 * - Blog feature: modal behavior, data source, and fallback handling (Req 16.1).
 * - Resume assets preserved in /public (Req 16.2).
 * - No `.js`/`.jsx` source modules remain after the TypeScript migration
 *   (Req 16.4).
 * - The contact email (EmailJS) integration is preserved (Req 16.6).
 */

vi.mock("@emailjs/browser", () => ({
  default: { sendForm: vi.fn() },
}));
const mockedSendForm = vi.mocked(emailjs.sendForm);

afterEach(cleanup);

const sampleBlog: Blog = {
  id: 1,
  title: "Understanding Node.js Streams",
  excerpt: "A deep dive into streams.",
  date: "2024-03-01",
  tags: ["Node.js", "Streams"],
  category: "Backend",
  content: "## Overview\n\nStreams are powerful.",
};

describe("Blog modal behavior preserved (Req 16.1)", () => {
  it("renders the selected post's title and content when open", () => {
    render(<BlogModal blog={sampleBlog} isOpen={true} onClose={() => {}} />);
    expect(
      screen.getByRole("heading", { name: /understanding node\.js streams/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/streams are powerful/i)).toBeInTheDocument();
  });

  it("renders nothing when there is no selected post", () => {
    const { container } = render(
      <BlogModal blog={null} isOpen={true} onClose={() => {}} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("invokes the close handler when the close control is activated", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<BlogModal blog={sampleBlog} isOpen={true} onClose={onClose} />);
    // The close button is the first button in the modal header.
    await user.click(screen.getAllByRole("button")[0]);
    expect(onClose).toHaveBeenCalled();
  });
});

describe("Blog data source and fallback handling preserved (Req 16.1)", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("falls back to the static blog list when the API call fails", async () => {
    global.fetch = vi.fn(() =>
      Promise.reject(new Error("network down")),
    ) as unknown as typeof fetch;

    const blogs = await getAllBlogs();
    expect(Array.isArray(blogs)).toBe(true);
    expect(blogs.length).toBeGreaterThan(0);
    // Every fallback entry is well-formed.
    for (const blog of blogs) {
      expect(blog.title).toBeTruthy();
      expect(Array.isArray(blog.tags)).toBe(true);
      expect(blog.category).toBeTruthy();
    }
  });
});

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
