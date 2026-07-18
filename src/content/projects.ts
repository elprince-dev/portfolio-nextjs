/**
 * Featured projects content — the preserved portfolio projects re-presented as
 * structured case studies (Req 3.1, 3.2, 3.6).
 *
 * Each entry is a `CaseStudy` with a non-empty problem, solution, architecture
 * overview, tech stack, challenges, and results (Req 3.1). The featured
 * projects are: Noor AI, Quality Management Platform, YasMade (AWS Cloud
 * Version), and Portfolio (Req 3.2).
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
    slug: "noor-ai",
    name: "Noor AI",
    problem:
      "General-purpose chatbots are unreliable for Islamic questions: they fabricate Quran and hadith citations and gloss over genuine differences between the four Sunni schools of thought.",
    solution:
      "A conversational Islamic Q&A assistant grounded in a retrieval-augmented knowledge base of the Quran and Sahih al-Bukhari. A LangChain tool-calling agent on AWS Bedrock (Claude) retrieves whole verses and hadith with precomputed citations, keeps conversation memory in DynamoDB, streams answers token by token, and states madhab differences explicitly instead of claiming false consensus — fully serverless on AWS.",
    architectureOverview:
      "An offline ingestion pipeline transforms the Quran and Sahih al-Bukhari into ~27,000 single-chunk corpus files, each paired with citation metadata, embedded with Cohere Multilingual v3 into an S3 Vectors index behind a Bedrock Knowledge Base — so retrieval units are always whole verses or whole hadith and citations come from metadata, never the model. A FastAPI backend runs on Lambda through the Lambda Web Adapter with response streaming over a Function URL; the LangChain agent calls the Knowledge Base Retrieve API as a tool and DynamoDB persists chat sessions for memory. The Next.js chat UI is served from S3 via CloudFront, which also routes /api/* to the backend under one custom domain (Route 53 + ACM). Everything is provisioned by AWS CDK across dedicated DNS, data, knowledge-base, API, and web stacks.",
    techStack: [
      { label: "Python", iconAsset: "python.svg" },
      { label: "FastAPI" },
      { label: "LangChain" },
      { label: "AWS Bedrock", iconAsset: "aws.svg" },
      { label: "AWS CDK", iconAsset: "aws.svg" },
      { label: "DynamoDB" },
      { label: "Next.js", iconAsset: "nextjs.svg" },
      { label: "Tailwind CSS", iconAsset: "tailwindcss.svg" },
    ],
    challenges: [
      "Eliminating fabricated citations: one corpus file per verse/hadith with citations precomputed at ingestion time, so the agent quotes references verbatim from retrieval metadata instead of generating them.",
      "Presenting fiqh rulings faithfully across the four Sunni madhahib — the system prompt forbids claiming consensus and requires per-school classification with each school's own terminology.",
      "Streaming agent responses end to end through Lambda without Docker: FastAPI behind the Lambda Web Adapter with a response-streaming Function URL, and Python dependencies bundled on the host with uv at deploy time.",
    ],
    results: [
      "Live at noorai.elprince.net — one CloudFront domain serving both the chat UI and the streaming API.",
      "Grounded answers citing whole Quran verses and Bukhari hadith from a ~27,000-chunk knowledge base.",
      "Fully serverless, infrastructure-as-code deployment across five AWS CDK stacks.",
    ],
    diagram: {
      kind: "architecture",
      source: [
        "graph LR",
        "  User[User] --> CF[CloudFront + Route 53]",
        "  CF --> S3UI[(S3 Static Chat UI)]",
        "  CF -- /api/* --> Lambda[FastAPI on Lambda - streaming]",
        "  Lambda --> Agent[LangChain Agent + Bedrock Claude]",
        "  Agent --> KB[(Bedrock Knowledge Base - S3 Vectors)]",
        "  Lambda --> DDB[(DynamoDB Chat Sessions)]",
        "  Ingest[Ingestion Pipeline - Quran + Bukhari] --> KB",
        "  CDK[AWS CDK IaC] -.provisions.-> CF",
        "  CDK -.provisions.-> Lambda",
        "  CDK -.provisions.-> KB",
      ].join("\n"),
      alt: "Architecture diagram of Noor AI: users reach a CloudFront distribution with a custom domain that serves the static Next.js chat UI from S3 and routes API calls to a streaming FastAPI Lambda, where a LangChain agent uses Bedrock Claude with a Bedrock Knowledge Base over S3 Vectors populated by a Quran and Bukhari ingestion pipeline, and DynamoDB stores chat sessions; the whole stack is provisioned with AWS CDK.",
      flow: {
        nodes: [
          { id: "user", label: "User", sublabel: "noorai.elprince.net", icon: "user", x: 0, y: 40 },
          { id: "cf", label: "CloudFront", sublabel: "Route 53 custom domain", icon: "cloudfront", x: 0, y: 240 },
          { id: "cdk", label: "AWS CDK", sublabel: "5 stacks · IaC", icon: "cloudformation", x: 0, y: 440 },
          { id: "s3ui", label: "S3 Static Site", sublabel: "Next.js chat UI", icon: "s3", x: 310, y: 40 },
          { id: "lambda", label: "Lambda", sublabel: "FastAPI · streaming", icon: "lambda", x: 310, y: 240 },
          { id: "ddb", label: "DynamoDB", sublabel: "Chat sessions", icon: "dynamodb", x: 310, y: 440 },
          { id: "agent", label: "Bedrock Claude", sublabel: "LangChain agent", icon: "bedrock", x: 620, y: 240 },
          { id: "ingest", label: "Ingestion Pipeline", sublabel: "Quran + Bukhari corpus", icon: "pipeline", x: 620, y: 440 },
          { id: "kb", label: "Knowledge Base", sublabel: "S3 Vectors · 27k chunks", icon: "s3", x: 930, y: 240 },
        ],
        edges: [
          { from: "user", to: "cf", fromSide: "bottom", toSide: "top" },
          { from: "cf", to: "s3ui", label: "static UI" },
          { from: "cf", to: "lambda", label: "/api/*" },
          { from: "lambda", to: "agent" },
          { from: "agent", to: "kb", label: "retrieve" },
          { from: "lambda", to: "ddb", label: "memory", fromSide: "bottom", toSide: "top" },
          { from: "ingest", to: "kb", label: "embeds", fromSide: "right", toSide: "bottom" },
          { from: "cdk", to: "cf", label: "provisions", dashed: true, fromSide: "top", toSide: "bottom" },
          { from: "cdk", to: "ddb", dashed: true, fromSide: "right", toSide: "left" },
        ],
      },
    },
    repoUrl: "https://github.com/elprince-dev/noor-ai",
    demoUrl: "https://noorai.elprince.net/",
    confidential: false,
    imageAsset: "coding.png",
  },
  {
    slug: "quality-management-platform",
    name: "Quality Management Platform",
    problem:
      "Amazon fulfillment centers needed a scalable, multi-region platform to manage quality processes, track metrics, and provide real-time analytics dashboards for operations teams.",
    solution:
      "A TypeScript monorepo using React 19, tRPC, and AWS CDK delivers a serverless platform with authentication at the CDN edge, role-based access control, and analytics dashboards with manager-level aggregation and multi-location filtering. Alongside it, a fleet of event-driven data-automation tools processes operational data and pushes real-time alerts to operations teams — all deployed as multi-region infrastructure as code.",
    architectureOverview:
      "Requests arrive through a CloudFront CDN that authenticates users at the edge — hardened with WAF and fronted by Route 53 — before serving the React 19 client. The client calls a type-safe tRPC API on AWS Lambda that enforces role-based access control, backed by DynamoDB for quality and analytics data. Alongside the platform, 15+ serverless data-automation tools built on Lambda and EventBridge process operational data from S3 and internal APIs, delivering real-time alerts through SES, SNS, and Slack. CloudWatch and RUM provide monitoring and real-user telemetry, and the entire multi-region footprint is provisioned by AWS CDK with automated CI/CD and 100% test coverage across six packages.",
    techStack: [
      { label: "TypeScript" },
      { label: "React", iconAsset: "react.svg" },
      { label: "tRPC" },
      { label: "AWS CDK", iconAsset: "aws.svg" },
      { label: "AWS Lambda" },
      { label: "DynamoDB" },
      { label: "CloudFront" },
      { label: "EventBridge" },
      { label: "Vitest" },
    ],
    challenges: [
      "Coordinating consistent quality data across multiple AWS regions.",
      "Securing the API behind CDN-based authentication without adding latency, with role-based access control on every route.",
      "Scaling from an MVP at a single pilot fulfillment center toward 8+ locations without disrupting live operations.",
      "Aggregating quality analytics by manager and location in real time.",
      "Sustaining 100% test coverage across a growing TypeScript monorepo.",
    ],
    results: [
      "Multi-region serverless platform launched at a pilot fulfillment center and expanding across 8+ North American locations.",
      "15+ event-driven data-automation tools delivering real-time alerts via SES, SNS, and Slack.",
      "100% test coverage maintained across 6 monorepo packages with Vitest, ESLint, and snapshot testing.",
      "Infrastructure fully reproducible through AWS CDK with automated CI/CD.",
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
      alt: "Architecture diagram of the Quality Management Platform: operations teams connect through a CloudFront CDN with edge authentication and WAF, which serves the React 19 client; the client calls a tRPC API on Lambda with role-based access control backed by DynamoDB, CloudWatch and RUM monitor the platform, and event-driven data-automation tools on Lambda and EventBridge process operational data from S3 and deliver real-time alerts through SES, SNS, and Slack — all provisioned multi-region by AWS CDK.",
      flow: {
        nodes: [
          { id: "ops", label: "Operations Teams", sublabel: "FC managers · 8+ sites", icon: "user", x: 0, y: 40 },
          { id: "cf", label: "CloudFront", sublabel: "Edge auth · WAF · Route 53", icon: "cloudfront", x: 0, y: 240 },
          { id: "cdk", label: "AWS CDK", sublabel: "Multi-region IaC · CI/CD", icon: "cloudformation", x: 0, y: 440 },
          { id: "react", label: "React 19 Client", sublabel: "Analytics dashboards", icon: "/react.svg", x: 310, y: 40 },
          { id: "api", label: "tRPC API", sublabel: "Lambda · RBAC", icon: "lambda", x: 310, y: 240 },
          { id: "s3", label: "S3", sublabel: "Operational data", icon: "s3", x: 310, y: 440 },
          { id: "watch", label: "CloudWatch", sublabel: "Monitoring · RUM", icon: "cloudwatch", x: 620, y: 40 },
          { id: "ddb", label: "DynamoDB", sublabel: "Quality + analytics data", icon: "dynamodb", x: 620, y: 240 },
          { id: "tools", label: "Data Automations", sublabel: "15+ Lambda + EventBridge tools", icon: "eventbridge", x: 620, y: 440 },
          { id: "alerts", label: "Alerts", sublabel: "SES · SNS · Slack", icon: "sns", x: 930, y: 440 },
        ],
        edges: [
          { from: "ops", to: "cf", fromSide: "bottom", toSide: "top" },
          { from: "cf", to: "react", label: "serves" },
          { from: "react", to: "api", label: "tRPC", fromSide: "bottom", toSide: "top" },
          { from: "api", to: "ddb", label: "quality data" },
          { from: "watch", to: "api", label: "monitors", dashed: true, fromSide: "bottom", toSide: "top" },
          { from: "s3", to: "tools", label: "operational data" },
          { from: "tools", to: "alerts", label: "real-time alerts" },
          { from: "cdk", to: "cf", label: "provisions", dashed: true, fromSide: "top", toSide: "bottom" },
          { from: "cdk", to: "s3", dashed: true, fromSide: "right", toSide: "left" },
        ],
      },
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
      flow: {
        nodes: [
          { id: "customer", label: "Customer", sublabel: "Shoppers + admins", icon: "user", x: 0, y: 40 },
          { id: "cf", label: "CloudFront", sublabel: "CDN delivery", icon: "cloudfront", x: 0, y: 240 },
          { id: "cdk", label: "AWS CDK", sublabel: "Self-mutating CI/CD", icon: "cloudformation", x: 0, y: 440 },
          { id: "s3", label: "S3", sublabel: "Static assets · SPA hosting", icon: "s3", x: 310, y: 40 },
          { id: "spa", label: "React + Vite SPA", sublabel: "Zustand state", icon: "/react.svg", x: 310, y: 240 },
          { id: "ses", label: "SES", sublabel: "Transactional email", icon: "ses", x: 310, y: 440 },
          { id: "supabase", label: "Supabase", sublabel: "Data · Auth · Storage", icon: "/supabase.png", x: 620, y: 240 },
        ],
        edges: [
          { from: "customer", to: "cf", fromSide: "bottom", toSide: "top" },
          { from: "cf", to: "s3", label: "origin fetch" },
          { from: "cf", to: "spa", label: "serves" },
          { from: "spa", to: "supabase", label: "data / auth" },
          { from: "spa", to: "ses", label: "order emails", fromSide: "bottom", toSide: "top" },
          { from: "cdk", to: "cf", label: "provisions", dashed: true, fromSide: "top", toSide: "bottom" },
          { from: "cdk", to: "ses", dashed: true, fromSide: "right", toSide: "left" },
        ],
      },
    },
    repoUrl: "https://github.com/elprince-dev/YasMadeAWS",
    demoUrl: "https://www.youtube.com/watch?v=v2QkcMPeY3w",
    confidential: false,
    imageAsset: "yasmade.png",
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
];

export default projects;
