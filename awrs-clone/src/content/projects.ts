import type { CaseStudy } from "./types";

export const projects: CaseStudy[] = [
  {
    slug: "quality-management-platform",
    name: { en: "Quality Management Platform" },
    shortDesc: {
      en: "A centralized, serverless quality-coaching platform for Amazon NA fulfillment centers.",
    },
    problem: {
      en: "Quality coaching was scattered across teams with low manager adoption. Inventory discrepancies, defect trends, and coaching workflows lived in disconnected places, making it hard for managers to act on quality data.",
    },
    solution: {
      en: "A centralized full-stack platform — a TypeScript monorepo (React 19, tRPC, AWS CDK) with a serverless API, CDN-based auth, and infrastructure-as-code — that lets managers track inventory discrepancies, analyze defect trends, and manage coaching workflows across North American fulfillment centers.",
    },
    architectureOverview: {
      en: "Edge-level authentication runs on Lambda@Edge with role-based access control and real-time user monitoring. A type-safe tRPC serverless API reads and writes DynamoDB, powering analytics dashboards for defect tracking and associate performance with multi-location filtering and manager-level aggregation. The whole stack is provisioned with AWS CDK, with 100% test coverage across 6 packages enforced through automated CI/CD.",
    },
    techStack: [
      { label: "TypeScript" },
      { label: "React 19" },
      { label: "tRPC" },
      { label: "AWS CDK" },
      { label: "Lambda@Edge" },
      { label: "DynamoDB" },
    ],
    challenges: {
      en: [
        "Implementing edge authentication and RBAC without adding latency.",
        "Aggregating defect and performance data across many fulfillment locations.",
        "Sustaining 100% test coverage across a 6-package TypeScript monorepo.",
      ],
    },
    results: {
      en: [
        "Launched the MVP at a pilot location; expanding to 8+ locations on positive adoption.",
        "100% test coverage maintained across 6 packages with automated CI/CD.",
        "Infrastructure fully reproducible through AWS CDK.",
      ],
    },
    tags: ["TypeScript", "React 19", "tRPC", "AWS CDK", "Serverless"],
    gradient: "#a83d62",
    confidential: true,
    dateLabel: { en: "2025" },
  },
  {
    slug: "yasmade",
    name: { en: "YasMade" },
    shortDesc: {
      en: "A full-stack e-commerce platform for an embroidery business, live in production.",
    },
    problem: {
      en: "A growing embroidery business needed a real storefront — secure checkout, product and inventory management, and an admin dashboard — that could run in production and evolve with real customer demand.",
    },
    solution: {
      en: "A React (Vite) + Supabase full-stack application with secure checkout, an admin dashboard, and product management. Zustand drives global state (cart, auth, UI) with optimistic updates, and the UI ships responsive, accessible, light/dark, and custom-branded.",
    },
    architectureOverview: {
      en: "A React + Vite single-page app uses Zustand for global state with optimistic updates for a smooth UX, and talks to Supabase for data, auth, and storage. An admin dashboard enables real-time inventory tracking, order management, and customer analytics. The platform processes live customer orders and is iterated continuously on business feedback.",
    },
    techStack: [
      { label: "React" },
      { label: "Vite" },
      { label: "Supabase" },
      { label: "Zustand" },
      { label: "Tailwind CSS" },
    ],
    challenges: {
      en: [
        "Keeping cart, auth, and UI state consistent with optimistic updates.",
        "Real-time inventory and order management for live customers.",
        "Delivering an accessible, responsive UI with light/dark mode and custom branding.",
      ],
    },
    results: {
      en: [
        "In production, processing live customer orders.",
        "Admin dashboard for real-time inventory, orders, and customer analytics.",
        "Continuously improved based on real-world business needs.",
      ],
    },
    tags: ["React", "Vite", "Supabase", "Zustand", "E-commerce"],
    gradient: "#0B4C5A",
    repoUrl: "https://github.com/elprince-dev/YasMadeAWS",
    demoUrl: "https://www.youtube.com/watch?v=v2QkcMPeY3w",
    liveUrl: "https://dev.yasmade.net/",
    dateLabel: { en: "2024 – Present" },
  },
  {
    slug: "writewell",
    name: { en: "WriteWell" },
    shortDesc: {
      en: "A full-stack blogging platform built with Next.js, MySQL on RDS, and S3.",
    },
    problem: {
      en: "Bloggers needed a simple platform to create, edit, and manage their content.",
    },
    solution: {
      en: "A full-stack blog built with Next.js for both UI and API, backed by a MySQL database on AWS RDS and image storage on AWS S3.",
    },
    architectureOverview: {
      en: "Next.js serves both the UI and API routes. Blog content is persisted in MySQL on AWS RDS, and uploaded images are stored in S3 and referenced by URL from the database.",
    },
    techStack: [
      { label: "JavaScript" },
      { label: "Next.js" },
      { label: "SCSS" },
      { label: "MySQL" },
      { label: "AWS RDS" },
    ],
    challenges: {
      en: [
        "Connecting a Next.js API layer to a managed MySQL instance on AWS RDS.",
        "Storing uploaded images in S3 and linking them to records by URL.",
        "Implementing full CRUD with a responsive UI.",
      ],
    },
    results: {
      en: [
        "Full CRUD blog platform with create, edit, and delete flows.",
        "AWS S3 image storage integrated with the MySQL data model.",
        "Responsive design deployed and publicly available.",
      ],
    },
    tags: ["Next.js", "MySQL", "AWS", "Full-stack"],
    gradient: "#134e4a",
    repoUrl: "https://github.com/mohamedmhussein/writewell",
    demoUrl: "https://writewell.vercel.app/",
    dateLabel: { en: "2023" },
  },
  {
    slug: "portfolio",
    name: { en: "Portfolio" },
    shortDesc: {
      en: "A modern, animated portfolio with dark mode, built with Next.js + Tailwind.",
    },
    problem: {
      en: "Need for a professional online presence to showcase skills and projects.",
    },
    solution: {
      en: "A responsive portfolio with dark mode and smooth animations, built with Next.js and styled with Tailwind CSS.",
    },
    architectureOverview: {
      en: "A Next.js app renders the portfolio sections as a static, SEO-optimized site styled with Tailwind CSS. Theme state drives dark/light mode, Framer Motion provides animations, and EmailJS handles contact messages from the client.",
    },
    techStack: [
      { label: "JavaScript" },
      { label: "Next.js" },
      { label: "Tailwind CSS" },
      { label: "Framer Motion" },
    ],
    challenges: {
      en: [
        "Delivering smooth animations without hurting performance.",
        "Supporting a polished dark and light theme across every section.",
        "Wiring client-side contact email through EmailJS.",
      ],
    },
    results: {
      en: [
        "SEO-optimized portfolio with dark/light theming.",
        "Framer Motion micro-interactions and entrance animations.",
        "EmailJS-powered contact integration deployed publicly.",
      ],
    },
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    gradient: "#1e3a8a",
    repoUrl: "https://github.com/mohamedmhussein/portfolio-nextjs",
    demoUrl: "https://mohammadelprince.vercel.app/",
    dateLabel: { en: "2023" },
  },
  {
    slug: "modern-landing-page",
    name: { en: "Modern Landing Page" },
    shortDesc: {
      en: "A clean, responsive technology showcase built with React and custom CSS.",
    },
    problem: { en: "Need to create an engaging technology showcase website." },
    solution: {
      en: "A modern landing page with clean design and informative content, built with React and custom CSS for optimal performance.",
    },
    architectureOverview: {
      en: "A React SPA composed of reusable presentation components, styled with hand-written CSS and animations, optimized for fast load and a responsive layout.",
    },
    techStack: [
      { label: "React" },
      { label: "JavaScript" },
      { label: "CSS" },
    ],
    challenges: {
      en: [
        "Building a reusable React component structure for the landing sections.",
        "Crafting CSS animations that stay smooth and performant.",
        "Keeping the layout fully responsive across viewport sizes.",
      ],
    },
    results: {
      en: [
        "Responsive landing page with a modern UI.",
        "Reusable React components and CSS animations.",
        "Deployed and publicly accessible.",
      ],
    },
    tags: ["React", "JavaScript", "CSS"],
    gradient: "#0f766e",
    repoUrl: "https://github.com/mohamedmhussein/gpt3",
    demoUrl: "https://gpt3-intro.onrender.com/",
    dateLabel: { en: "2023" },
  },
  {
    slug: "budget-tracker-cli",
    name: { en: "Budget Tracker CLI" },
    shortDesc: {
      en: "A Python CLI for personal finance with SQLAlchemy ORM persistence.",
    },
    problem: {
      en: "Personal finance management through a command-line interface.",
    },
    solution: {
      en: "A Python CLI that helps manage finances and track expenses, using the SQLAlchemy ORM for persistence over SQLite.",
    },
    architectureOverview: {
      en: "A Python CLI reads commands, validates input, and persists records through SQLAlchemy into SQLite. The same layer is queried to generate financial reports back to the terminal.",
    },
    techStack: [
      { label: "Python" },
      { label: "SQLite" },
      { label: "SQLAlchemy" },
    ],
    challenges: {
      en: [
        "Validating financial input entered through a text-only interface.",
        "Modeling expense data with the SQLAlchemy ORM over SQLite.",
        "Generating readable financial reports from stored records.",
      ],
    },
    results: {
      en: [
        "Working CLI for tracking expenses and managing a budget.",
        "SQLAlchemy ORM persistence over a SQLite database.",
        "Input validation and financial report generation.",
      ],
    },
    tags: ["Python", "SQLite", "SQLAlchemy", "CLI"],
    gradient: "#7c2d12",
    repoUrl:
      "https://github.com/mohamedmhussein/python-p3-cli-project-budget-tracker",
    dateLabel: { en: "2023" },
  },
];

export function getProject(slug: string): CaseStudy | undefined {
  return projects.find((p) => p.slug === slug);
}

export default projects;
