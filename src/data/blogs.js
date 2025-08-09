let cachedBlogs = null;

export async function getAllBlogs() {
  if (cachedBlogs) {
    return cachedBlogs;
  }
  
  try {
    const response = await fetch('/api/blogs');
    if (response.ok) {
      cachedBlogs = await response.json();
      return cachedBlogs;
    } else {
      throw new Error('Failed to fetch from API');
    }
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    // Fallback to static data
    return getStaticBlogs();
  }
}


function getStaticBlogs() {
  return [
    {
      id: 1,
      title: "Building a Custom React Hook for API Calls",
      excerpt: "Learn how to create a reusable React hook that simplifies API calls with loading states, error handling, and automatic cleanup.",
      date: "2024-01-15",
      tags: ["React", "JavaScript", "Hooks", "API"],
      category: "Frontend",
      content: "# Building a Custom React Hook for API Calls\n\nA comprehensive guide to creating reusable React hooks for API calls with proper error handling and loading states."
    },
    {
      id: 2,
      title: "Implementing Debounced Search in React",
      excerpt: "Optimize search performance by implementing debouncing techniques to reduce API calls and improve user experience.",
      date: "2024-01-10",
      tags: ["React", "Performance", "JavaScript", "Optimization"],
      category: "Frontend",
      content: "# Implementing Debounced Search in React\n\nLearn how to optimize search performance by implementing debouncing techniques to reduce API calls and improve user experience."
    }
  ];
}