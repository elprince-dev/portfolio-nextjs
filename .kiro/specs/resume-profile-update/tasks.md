# Implementation Plan: Resume Profile Update

## Overview

Update all portfolio website components with current resume information. Each task modifies a single file with content changes. No new dependencies or components needed.

## Tasks

- [x] 1. Update resume download link and Hero Section content
  - [x] 1.1 Update HeroSection.jsx: change resume href from `/Resume.pdf` to `/Resume - External.pdf`
  - [x] 1.2 Update HeroSection.jsx: change highlights array to `["Software Development Engineer", "Full-Stack Developer", "Cloud Engineer"]` with appropriate icons
  - [x] 1.3 Update HeroSection.jsx: rewrite description to match resume summary (software engineer with data background, production systems on AWS, TypeScript/Python/cloud)
  - [x] 1.4 Verify HeroSection.jsx social links use `elprince-dev` for both GitHub and LinkedIn
  - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 2. Update About Section bio, stats, and skills
  - [x] 2.1 Update AboutSection.jsx: rewrite bio paragraphs to reflect SDE role at Amazon, serverless apps, AWS certifications, education (Flatiron School, University of Guelph, AWS SA Associate, Cloud Practitioner)
  - [x] 2.2 Update AboutSection.jsx: change stats to `["4+", "15+", "20+"]` with labels "Years Experience", "Projects Completed", "Technologies"
  - [x] 2.3 Update AboutSection.jsx: replace `skillCategories` with four categories from resume — Languages (TypeScript, Python, JavaScript, HTML/CSS, SQL), Frameworks (React 19, tRPC, Node.js, Vitest), Cloud & Infrastructure (AWS Lambda, CDK, DynamoDB, S3, CloudFront, EventBridge, SES, SNS, CloudWatch, RUM, WAF, Route 53, IaC), Tools (Git, Nx, Vite, ESLint, Prettier)
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.3, 4.4_

- [x] 3. Update Projects Section
  - [x] 3.1 Add "Quality Management Platform" as the first project in the projects array — Amazon Confidential, TypeScript monorepo (React 19, tRPC, AWS CDK), serverless API, CDN-based auth, analytics dashboards, 100% test coverage. Set `github: ""` and `link: ""` since confidential. Use a placeholder image or existing coding.png.
  - [x] 3.2 Update YasMade project: revise description to match resume (React + Vite + Supabase, Zustand state management, admin dashboard, live customer orders), add YouTube demo link `https://www.youtube.com/watch?v=v2QkcMPeY3w`
  - [x] 3.3 Verify ProjectsSection.jsx gracefully handles projects with empty `github` string (no GitHub icon rendered)
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 4. Update Contact Section and Footer
  - [x] 4.1 Update Contact.jsx: ensure LinkedIn link uses `https://www.linkedin.com/in/elprince-dev/` (fix any `/elprince93/` references)
  - [x] 4.2 Update Footer.jsx: replace hardcoded `© 2023` with dynamic `{new Date().getFullYear()}` and ensure LinkedIn uses `/elprince-dev/`
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 7.1, 7.2, 7.3_

- [x] 5. Update page metadata
  - [x] 5.1 Update layout.js: change metadata title to "Mohammad El Prince - Software Development Engineer" and description to match resume summary
  - _Requirements: 8.1, 8.2_

- [x] 6. Final checkpoint
  - Ensure the site builds without errors (`next build`), ask the user if questions arise.

## Notes

- No optional test tasks since this is a content-only update with no new logic
- Each task references specific requirements for traceability
- The Quality Management Platform project needs a placeholder image since no screenshot is available
- Tech stack icons for new skills (TypeScript, DynamoDB, etc.) may need to be added to `/public` or handled with text fallbacks
