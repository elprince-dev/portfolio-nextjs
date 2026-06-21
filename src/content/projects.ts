/**
 * Featured projects content — the preserved portfolio projects re-presented as
 * structured case studies (Req 3.1, 3.2, 3.6).
 *
 * Each entry is a `CaseStudy` with a non-empty problem, solution, architecture
 * overview, tech stack, challenges, and results (Req 3.1). The six projects
 * preserved from the existing `ProjectsSection` content are kept exactly:
 * Quality Management Platform, YasMade (AWS Cloud Version), WriteWell,
 * Portfolio, Modern Landing Page, and Budget Tracker CLI (Req 3.2).
 *
 * Tech-stack labels are preserved from the existing project content and paired
 * with reused `/public` icon assets where one exists (Req 3.6). Every
 * `imageAsset` and `iconAsset` references a file that actually exists in
 * `/public` (Req 16.3). Asset references use the bare filename (no leading
 * slash) for a single integrity-check convention; the presentation layer
 * resolves them against `/public`.
 *
 * The Quality Management Platform is Amazon-confidential: `confidential` is
 * `true` and the source/demo links are omitted (Req 3.5). Projects whose
 * description includes a system architecture or data flow carry a `DiagramSpec`
 * with descriptive alt text (Req 3.3, 14.2).
 */

import type { CaseStudy } from "@/content/types";

export const projects: CaseStudy[] = [
  {
    slug: "quality-management-platform",
    name: "Quality Management Platform",
    problem:
      "Amazon fulfillment centers needed a scalable, multi-region platform to manage quality processes, track metrics, and provide real-time analytics dashboards for operations teams.",
    solution:
      "A TypeScript monorepo using React 19, tRPC, and AWS CDK to deliver a serverless API with CDN-based auth, analytics dashboards, and full infrastructure as code — deployed across multiple AWS regions.",
    architectureOverview:
      "A TypeScript monorepo fronts a CDN that handles authentication and serves the React 19 web client. Client requests reach a type-safe tRPC API running on serverless compute, which reads and writes operational and analytics data. The entire multi-region footprint is provisioned and deployed through AWS CDK infrastructure as code, with 100% test coverage enforced across the stack.",
    techStack: [
      { label: "TypeScript" },
      { label: "React", iconAsset: "react.svg" },
      { label: "tRPC" },
      { label: "AWS CDK", iconAsset: "aws.svg" },
      { label: "Serverless API" },
    ],
    challenges: [
      "Coordinating consistent quality data across multiple AWS regions.",
      "Securing the API behind CDN-based authentication without adding latency.",
      "Sustaining 100% test coverage across a growing TypeScript monorepo.",
    ],
    results: [
      "Multi-region serverless platform serving operations teams in production.",
      "100% test coverage maintained across the full stack.",
      "Infrastructure fully reproducible through AWS CDK as code.",
    ],
    diagram: {
      kind: "architecture",
      source: [
        "graph LR",
        "  User[Operations User] --> CDN[CDN + Auth]",
        "  CDN --> Web[React 19 Client]",
        "  Web --> API[tRPC Serverless API]",
        "  API --> Data[(Quality & Analytics Data)]",
        "  CDK[AWS CDK IaC] -.provisions.-> CDN",
        "  CDK -.provisions.-> API",
        "  CDK -.provisions.-> Data",
      ].join("\n"),
      alt: "Architecture diagram of the Quality Management Platform: an operations user connects through a CDN that handles authentication and serves the React 19 client, which calls a tRPC serverless API backed by quality and analytics data, with the whole multi-region stack provisioned by AWS CDK.",
    },
    confidential: true,
    imageAsset: "coding.png",
  },
  {
    slug: "yasmade-aws",
    name: "YasMade (AWS Cloud Version)",
    problem:
      "Artisans and creative educators needed a scalable online platform to showcase handcrafted products, manage inventory through an admin dashboard, and track live customer orders.",
    solution:
      "A modern e-commerce platform using React + Vite + Supabase with Zustand for state management, an admin dashboard, and live customer orders — deployed on AWS with CDK infrastructure as code and CloudFront CDN.",
    architectureOverview:
      "A React + Vite single-page app uses Zustand for client state and talks to Supabase for data, auth, and storage. Static assets are served from S3 behind a CloudFront CDN, transactional email is sent through SES, and the whole environment is provisioned by AWS CDK with a self-mutating CI/CD pipeline that redeploys on each change.",
    techStack: [
      { label: "React", iconAsset: "react.svg" },
      { label: "Vite", iconAsset: "vite.svg" },
      { label: "Tailwind CSS", iconAsset: "tailwindcss.svg" },
      { label: "Supabase", iconAsset: "supabase.png" },
      { label: "AWS", iconAsset: "aws.svg" },
      { label: "Zustand" },
    ],
    challenges: [
      "Designing a self-mutating CI/CD pipeline that safely redeploys infrastructure.",
      "Keeping inventory and live order state consistent between the admin dashboard and customers.",
      "Wiring SES transactional email into the order workflow.",
    ],
    results: [
      "Full e-commerce platform with admin dashboard and live order tracking shipped to AWS.",
      "CloudFront CDN delivery backed by S3-hosted assets.",
      "Infrastructure as code with an automated CI/CD pipeline.",
    ],
    diagram: {
      kind: "architecture",
      source: [
        "graph LR",
        "  Customer[Customer] --> CF[CloudFront CDN]",
        "  CF --> SPA[React + Vite SPA]",
        "  SPA --> Supabase[(Supabase: Data / Auth)]",
        "  SPA --> S3[(S3 Assets)]",
        "  SPA --> SES[SES Email]",
        "  CDK[AWS CDK + CI/CD] -.provisions.-> CF",
        "  CDK -.provisions.-> S3",
        "  CDK -.provisions.-> SES",
      ].join("\n"),
      alt: "Architecture diagram of the YasMade AWS platform: customers reach a CloudFront CDN that serves a React and Vite single-page app, which uses Supabase for data and auth, S3 for assets, and SES for email, all provisioned by an AWS CDK CI/CD pipeline.",
    },
    repoUrl: "https://github.com/elprince-dev/YasMadeAWS",
    demoUrl: "https://www.youtube.com/watch?v=v2QkcMPeY3w",
    confidential: false,
    imageAsset: "yasmade.png",
  },
  {
    slug: "writewell",
    name: "WriteWell",
    problem:
      "Bloggers needed a simple platform to create, edit, and manage their content.",
    solution:
      "A full-stack blog application built with Next.js for both the frontend and the API, backed by a MySQL database on AWS RDS and image storage on AWS S3.",
    architectureOverview:
      "Next.js serves both the UI and the API routes. Blog content is persisted in a MySQL database hosted on AWS RDS, and uploaded images are stored in AWS S3 and referenced from the database by URL, so the application reads image URLs from the database and serves them directly from S3.",
    techStack: [
      { label: "JavaScript", iconAsset: "javascript.svg" },
      { label: "Next.js", iconAsset: "nextjs.svg" },
      { label: "HTML", iconAsset: "html.svg" },
      { label: "SCSS", iconAsset: "scss.svg" },
      { label: "MySQL", iconAsset: "mysql.svg" },
    ],
    challenges: [
      "Connecting a Next.js API layer to a managed MySQL instance on AWS RDS.",
      "Storing uploaded images in S3 and linking them to database records by URL.",
      "Implementing full CRUD operations for blog posts with a responsive UI.",
    ],
    results: [
      "Full CRUD blog platform with create, edit, and delete flows.",
      "AWS S3 image storage integrated with the MySQL data model.",
      "Responsive design deployed and publicly available.",
    ],
    diagram: {
      kind: "architecture",
      source: [
        "graph LR",
        "  User[Blogger] --> Next[Next.js UI + API]",
        "  Next --> RDS[(MySQL on AWS RDS)]",
        "  Next --> S3[(AWS S3 Images)]",
        "  RDS -.image URLs.-> S3",
      ].join("\n"),
      alt: "Architecture diagram of WriteWell: a blogger interacts with a Next.js app that serves both UI and API, which stores post data in MySQL on AWS RDS and uploaded images in AWS S3, with the database holding the image URLs.",
    },
    repoUrl: "https://github.com/mohamedmhussein/writewell",
    demoUrl: "https://writewell.vercel.app/",
    confidential: false,
    imageAsset: "writewell.PNG",
  },
  {
    slug: "portfolio",
    name: "Portfolio",
    problem:
      "Need for a professional online presence to showcase skills and projects.",
    solution:
      "A modern, responsive portfolio with dark mode and smooth animations, built with Next.js as the framework and styled with Tailwind CSS.",
    architectureOverview:
      "A Next.js application renders the portfolio sections as a static, SEO-optimized site styled with Tailwind CSS. Theme state drives a dark/light mode, Framer Motion provides entrance and hover animations, and EmailJS handles contact messages directly from the client.",
    techStack: [
      { label: "JavaScript", iconAsset: "javascript.svg" },
      { label: "Next.js", iconAsset: "nextjs.svg" },
      { label: "Tailwind CSS", iconAsset: "tailwindcss.svg" },
      { label: "HTML", iconAsset: "html.svg" },
    ],
    challenges: [
      "Delivering smooth Framer Motion animations without hurting performance.",
      "Supporting a polished dark and light theme across every section.",
      "Wiring client-side contact email through EmailJS.",
    ],
    results: [
      "SEO-optimized portfolio with dark/light theming.",
      "Framer Motion micro-interactions and entrance animations.",
      "EmailJS-powered contact integration deployed publicly.",
    ],
    repoUrl: "https://github.com/mohamedmhussein/portfolio-nextjs",
    demoUrl: "https://mohammadelprince.vercel.app/",
    confidential: false,
    imageAsset: "portfolio.PNG",
  },
  {
    slug: "modern-landing-page",
    name: "Modern Landing Page",
    problem: "Need to create an engaging technology showcase website.",
    solution:
      "A modern landing page with clean design and informative content, built with React and custom CSS styling for optimal performance.",
    architectureOverview:
      "A React single-page application composed of reusable presentation components, styled with hand-written CSS and CSS animations. The static site is optimized for fast load and a responsive layout across devices.",
    techStack: [
      { label: "React", iconAsset: "react.svg" },
      { label: "JavaScript", iconAsset: "javascript.svg" },
      { label: "HTML", iconAsset: "html.svg" },
      { label: "CSS", iconAsset: "css.svg" },
    ],
    challenges: [
      "Building a reusable React component structure for the landing sections.",
      "Crafting CSS animations that stay smooth and performant.",
      "Keeping the layout fully responsive across viewport sizes.",
    ],
    results: [
      "Responsive landing page with a modern UI.",
      "Reusable React components and CSS animations.",
      "Deployed and publicly accessible.",
    ],
    repoUrl: "https://github.com/mohamedmhussein/gpt3",
    demoUrl: "https://gpt3-intro.onrender.com/",
    confidential: false,
    imageAsset: "gpt3.PNG",
  },
  {
    slug: "budget-tracker-cli",
    name: "Budget Tracker CLI",
    problem: "Personal finance management through a command-line interface.",
    solution:
      "A Python command-line application that helps manage finances and track expenses, using the SQLAlchemy ORM for database management and persistence.",
    architectureOverview:
      "A Python CLI reads user commands, validates the input, and persists financial records through the SQLAlchemy ORM into a SQLite database. The same data layer is queried to generate financial reports back to the terminal.",
    techStack: [
      { label: "Python", iconAsset: "python.svg" },
      { label: "SQLite", iconAsset: "sqlite.svg" },
      { label: "SQLAlchemy" },
    ],
    challenges: [
      "Validating financial input entered through a text-only interface.",
      "Modeling expense data with the SQLAlchemy ORM over SQLite.",
      "Generating readable financial reports from stored records.",
    ],
    results: [
      "Working CLI for tracking expenses and managing a budget.",
      "SQLAlchemy ORM persistence over a SQLite database.",
      "Input validation and financial report generation.",
    ],
    diagram: {
      kind: "data-flow",
      source: [
        "graph LR",
        "  CLI[CLI Input] --> Validate[Validation]",
        "  Validate --> ORM[SQLAlchemy ORM]",
        "  ORM --> DB[(SQLite)]",
        "  DB --> Reports[Financial Reports]",
        "  Reports --> CLI",
      ].join("\n"),
      alt: "Data-flow diagram of the Budget Tracker CLI: command-line input is validated, persisted through the SQLAlchemy ORM into a SQLite database, then read back to generate financial reports returned to the terminal.",
    },
    repoUrl:
      "https://github.com/mohamedmhussein/python-p3-cli-project-budget-tracker",
    confidential: false,
    imageAsset: "budget-tracker.png",
  },
];

export default projects;
