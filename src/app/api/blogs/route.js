import { NextResponse } from 'next/server';

const GITHUB_REPO = 'elprince-dev/blog-content';
const BLOG_FILES = [
  'debouncing_in_js.md',
  'remove_duplicates.md',
  'javascript-array-methods.md',
  'javascript-async-await-error-handling.md',
  'javascript-throttle.md',
  'python-context-manager.md',
  'python-enumerate.md',
  'python-list-comprehension-vs-map.md',
  'nodejs-streams-deep-dive.md',
  'python-multiprocessing-vs-threading.md',
  'react-performance-optimization.md',

];

export async function GET() {
  try {
    const blogs = [];

    for (const fileName of BLOG_FILES) {
      try {

        const response = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}/contents/${fileName}`,
          {
            headers: {
              'Authorization': `token ${process.env.GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github.v3.raw'
            }
          }
        );
        
        if (!response.ok) {
          console.error(`Failed to fetch ${fileName}`);
          continue;
        }

        const content = await response.text();
        const frontmatter = extractFrontmatter(content);
        
        blogs.push({
          id: blogs.length + 1,
          ...frontmatter,
          content: content.replace(/^---[\s\S]*?---\n/, '')
        });
      } catch (error) {
        console.error(`Error fetching file ${fileName}:`, error);
      }
    }

    const sortedBlogs = blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
    return NextResponse.json(sortedBlogs);
  } catch (error) {
    console.error('Error fetching blogs from GitHub:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

function extractFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    return {
      title: 'Untitled',
      excerpt: '',
      date: new Date().toISOString().split('T')[0],
      tags: [],
      category: 'General'
    };
  }

  const frontmatterText = frontmatterMatch[1];
  const frontmatter = {};

  frontmatterText.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      let value = valueParts.join(':').trim();
      

      value = value.replace(/^["']|["']$/g, '');
      

      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(item => item.trim().replace(/^["']|["']$/g, ''));
      }
      
      frontmatter[key.trim()] = value;
    }
  });

  return frontmatter;
}