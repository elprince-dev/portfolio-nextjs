/**
 * Blog data layer (preserved, Req 16.1).
 *
 * Fetches blog posts from the preserved `/api/blogs` route and caches the
 * result. When the API call fails, it falls back to a small static list so the
 * blog feature degrades gracefully (preserved behavior). Migrated to TypeScript
 * (Req 16.4) while keeping the original data source and fallback behavior.
 */

export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  category: string;
  content: string;
}

let cachedBlogs: Blog[] | null = null;

export async function getAllBlogs(): Promise<Blog[]> {
  if (cachedBlogs) {
    return cachedBlogs;
  }

  try {
    const response = await fetch("/api/blogs");
    if (response.ok) {
      cachedBlogs = (await response.json()) as Blog[];
      return cachedBlogs;
    } else {
      throw new Error("Failed to fetch from API");
    }
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    // Fallback to static data
    return getStaticBlogs();
  }
}

function getStaticBlogs(): Blog[] {
  return [
    {
      id: 1,
      title: "Building a Custom React Hook for API Calls",
      excerpt:
        "Learn how to create a reusable React hook that simplifies API calls with loading states, error handling, and automatic cleanup.",
      date: "2024-01-15",
      tags: ["React", "JavaScript", "Hooks", "API"],
      category: "Frontend",
      content:
        "# Building a Custom React Hook for API Calls\n\nA comprehensive guide to creating reusable React hooks for API calls with proper error handling and loading states.",
    },
    {
      id: 2,
      title: "Implementing Debounced Search in React",
      excerpt:
        "Optimize search performance by implementing debouncing techniques to reduce API calls and improve user experience.",
      date: "2024-01-10",
      tags: ["React", "Performance", "JavaScript", "Optimization"],
      category: "Frontend",
      content:
        "# Implementing Debounced Search in React\n\nLearn how to optimize search performance by implementing debouncing techniques to reduce API calls and improve user experience.",
    },
  ];
}
