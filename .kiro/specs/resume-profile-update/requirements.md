# Requirements Document

## Introduction

Update the portfolio website to reflect the latest resume ("Resume - External.pdf"). This includes replacing the old resume download link, updating all profile sections (hero, about, skills, projects, contact, footer) with current information from the resume, and ensuring consistency across the entire site.

## Glossary

- **Portfolio_Site**: The Next.js personal portfolio website
- **Hero_Section**: The top landing section displaying name, title, highlights, description, and action buttons
- **About_Section**: The section displaying personal bio, stats, and technical skills
- **Projects_Section**: The section displaying project cards with descriptions, tech stacks, and links
- **Contact_Section**: The section displaying contact information and a contact form
- **Footer_Component**: The bottom bar displaying copyright and social links
- **Navbar_Component**: The top navigation bar displaying the site owner's name
- **Resume**: The file "Resume - External.pdf" located in the public folder

## Requirements

### Requirement 1: Replace Resume Download Link

**User Story:** As a visitor, I want to download the latest resume, so that I can review the most up-to-date professional information.

#### Acceptance Criteria

1. WHEN a visitor clicks the "Download Resume" button in the Hero_Section, THE Hero_Section SHALL serve the file "/Resume - External.pdf" instead of "/Resume.pdf"
2. THE Hero_Section SHALL open the resume in a new browser tab when the download button is clicked

### Requirement 2: Update Hero Section Content

**User Story:** As a visitor, I want to see the current professional title and summary, so that I get an accurate first impression.

#### Acceptance Criteria

1. THE Hero_Section SHALL display the title "Software Development Engineer" as the primary professional role
2. THE Hero_Section SHALL display highlight badges reflecting current roles: "Software Development Engineer", "Full-Stack Developer", and "Cloud Engineer"
3. THE Hero_Section SHALL display a description referencing software engineering with a data background, production systems on AWS, and TypeScript/Python/cloud infrastructure expertise
4. THE Hero_Section SHALL link to the GitHub profile "https://github.com/elprince-dev"
5. THE Hero_Section SHALL link to the LinkedIn profile "https://www.linkedin.com/in/elprince-dev/"

### Requirement 3: Update About Section Bio and Stats

**User Story:** As a visitor, I want to read an accurate bio and see current stats, so that I understand the person's background.

#### Acceptance Criteria

1. THE About_Section SHALL describe the person as a Software Development Engineer with a data background who builds production systems on AWS
2. THE About_Section SHALL mention Amazon experience, building serverless applications and a multi-region web platform for fulfillment centers
3. THE About_Section SHALL mention education at Flatiron School (2023), University of Guelph (Master of Engineering), and AWS certifications (Solutions Architect Associate, Cloud Practitioner)
4. THE About_Section SHALL display stats reflecting current experience: "4+ Years Experience" (at Amazon since 2021), "15+ Projects Completed" (15+ serverless applications), and "20+ Technologies"
5. THE About_Section SHALL reference the portfolio URL as "elprince.net"

### Requirement 4: Update Technical Skills

**User Story:** As a visitor, I want to see the current technical skill set, so that I can evaluate technical capabilities.

#### Acceptance Criteria

1. THE About_Section SHALL list Languages: TypeScript, Python, JavaScript, HTML/CSS, SQL
2. THE About_Section SHALL list Frameworks: React 19, tRPC, Node.js, Vitest
3. THE About_Section SHALL list Cloud & Infrastructure: AWS (Lambda, CDK, DynamoDB, S3, CloudFront, EventBridge, SES, SNS, CloudWatch, RUM, WAF, Route 53), Infrastructure as Code
4. THE About_Section SHALL list Tools: Git, Nx, Vite, ESLint, Prettier

### Requirement 5: Update Projects Section

**User Story:** As a visitor, I want to see the most relevant and current projects, so that I can evaluate the quality of work.

#### Acceptance Criteria

1. THE Projects_Section SHALL include the "Quality Management Platform" project with description matching the resume (Amazon Confidential, TypeScript monorepo, React 19, tRPC, AWS CDK, serverless API, CDN-based auth, analytics dashboards)
2. THE Projects_Section SHALL include the "YasMade" project with updated description matching the resume (React + Vite + Supabase, Zustand state management, admin dashboard, live customer orders)
3. THE Projects_Section SHALL include the YasMade demo link "https://www.youtube.com/watch?v=v2QkcMPeY3w"
4. WHEN the Quality Management Platform project is displayed, THE Projects_Section SHALL omit the GitHub and live links since it is Amazon Confidential
5. THE Projects_Section SHALL retain existing projects (WriteWell, Portfolio, Modern Landing Page, Budget Tracker CLI) unless they are no longer relevant

### Requirement 6: Update Contact Section

**User Story:** As a visitor, I want to see accurate contact information, so that I can reach out through the correct channels.

#### Acceptance Criteria

1. THE Contact_Section SHALL display the email "mohammad-elprince@proton.me"
2. THE Contact_Section SHALL display the location "Milton, ON, Canada"
3. THE Contact_Section SHALL link to GitHub "https://github.com/elprince-dev"
4. THE Contact_Section SHALL link to LinkedIn "https://www.linkedin.com/in/elprince-dev/"

### Requirement 7: Update Footer and Navbar

**User Story:** As a visitor, I want consistent branding across the site, so that the experience feels professional and cohesive.

#### Acceptance Criteria

1. THE Footer_Component SHALL display the current year (dynamically computed) instead of a hardcoded year
2. THE Footer_Component SHALL link to GitHub "https://github.com/elprince-dev"
3. THE Footer_Component SHALL link to LinkedIn "https://www.linkedin.com/in/elprince-dev/"
4. THE Navbar_Component SHALL display the name "Mohammad El Prince"

### Requirement 8: Update Page Metadata

**User Story:** As a visitor, I want the browser tab to show accurate information, so that I can identify the site easily.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL set the page title to "Mohammad El Prince - Software Development Engineer"
2. THE Portfolio_Site SHALL set the meta description to reflect the current professional summary
