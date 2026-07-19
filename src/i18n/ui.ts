import type { Locale } from "@/lib/i18n";

/**
 * UI string dictionary for the bilingual site (Req: /en + /ar).
 *
 * Chrome-level strings (navigation, headings, buttons, labels) live here;
 * structured content translations (case studies, experience stages, etc.)
 * live in `src/i18n/content.ts`. `t(locale)` returns the full dictionary for
 * a locale; components default to English so tests and previews render
 * without a provider.
 */

export interface UIDictionary {
  nav: {
    experience: string;
    skills: string;
    projects: string;
    aiEngineering: string;
    contact: string;
    logoLabel: string;
    switchToLight: string;
    switchToDark: string;
    openMenu: string;
    closeMenu: string;
    /** Label of the language-toggle button (names the OTHER language). */
    languageToggle: string;
    languageToggleLabel: string;
  };
  hero: {
    name: string;
    title: string;
    viewMyWork: string;
    resume: string;
    githubLabel: string;
    linkedinLabel: string;
    marqueePrimary: string[];
    marqueeSecondary: string[];
  };
  sections: {
    about: string;
    experience: string;
    skills: string;
    projects: string;
    aiEngineering: string;
    engineeringExcellence: string;
    connect: string;
    connectSubtitle: string;
  };
  connect: {
    headlinePrefix: string;
    headlineAccent: string;
    tagline: string;
    ctaLabel: string;
    availability: string;
    pitch: string;
  };
  projects: {
    caseStudy: string;
    screenshot: string;
    preview: string;
    openToExplore: string;
    backToProjects: string;
    exploreMore: string;
    liveDemo: string;
    github: string;
    confidentialNotice: string;
    theProblem: string;
    theSolution: string;
    architecture: string;
    builtWith: string;
    challenges: string;
    results: string;
    type: string;
    released: string;
    role: string;
    stack: string;
    technologies: string;
    dragToExplore: string;
    architectureDiagram: string;
    dataFlowDiagram: string;
    confidentialLock: string;
    confidentialSub: string;
  };
  ai: {
    shippedProject: string;
    describedCompetency: string;
    projectAndCompetency: string;
  };
  contactPage: {
    titleLead: string;
    titleAccent: string;
    subtitle: string;
    bookACall: string;
    sendAMessage: string;
    callHeading: string;
    callBody: string;
    emailToSchedule: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    topic: string;
    topics: string[];
    message: string;
    messagePlaceholder: string;
    consent: string;
    send: string;
    sending: string;
    sent: string;
    failed: string;
    invalidEmail: string;
    emailLabel: string;
    githubLabel: string;
    linkedinLabel: string;
  };
  footer: {
    rights: string;
  };
}

const en: UIDictionary = {
  nav: {
    experience: "Experience",
    skills: "Skills",
    projects: "Projects",
    aiEngineering: "AI Engineering",
    contact: "Contact",
    logoLabel: "Mohammad El Prince — home",
    switchToLight: "Switch to light theme",
    switchToDark: "Switch to dark theme",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageToggle: "عربي",
    languageToggleLabel: "التبديل إلى العربية",
  },
  hero: {
    name: "Mohammad El Prince",
    title: "Agentic AI Software Engineer",
    viewMyWork: "View my work",
    resume: "Resume",
    githubLabel: "Mohammad's GitHub profile",
    linkedinLabel: "Mohammad's LinkedIn profile",
    marqueePrimary: [
      "AI Engineer",
      "Software Engineer",
      "AWS Serverless",
      "RAG & Agentic Systems",
      "TypeScript",
      "Python",
      "Full-Stack Developer",
    ],
    marqueeSecondary: [
      "Problem Solver",
      "Cloud Architect",
      "Type-Safe Systems",
      "Production AI",
      "End-to-End Ownership",
      "More Than an Engineer",
    ],
  },
  sections: {
    about: "About Me",
    experience: "Experience",
    skills: "Skills",
    projects: "Featured Projects",
    aiEngineering: "AI Engineering",
    engineeringExcellence: "Engineering Excellence",
    connect: "Ready to Connect?",
    connectSubtitle: "Let's turn your next idea into something real",
  },
  connect: {
    headlinePrefix: "From idea to",
    headlineAccent: "impact",
    tagline: "Let's build something real.",
    ctaLabel: "Get in Touch",
    availability: "Open to full-time roles & freelance projects",
    pitch:
      "I build high-performance applications that turn complex ideas into seamless user experiences.",
  },
  projects: {
    caseStudy: "Case Study",
    screenshot: "Screenshot",
    preview: "Preview",
    openToExplore: "OPEN TO EXPLORE • OPEN TO EXPLORE •",
    backToProjects: "Back to Projects",
    exploreMore: "Explore more projects",
    liveDemo: "Live Demo",
    github: "GitHub",
    confidentialNotice: "Amazon Confidential — no public links",
    theProblem: "The Problem",
    theSolution: "The Solution",
    architecture: "Architecture",
    builtWith: "Built With",
    challenges: "Challenges",
    results: "Results",
    type: "Type",
    released: "Released",
    role: "Role",
    stack: "Stack",
    technologies: "technologies",
    dragToExplore: "Drag to explore",
    architectureDiagram: "Architecture diagram",
    dataFlowDiagram: "Data-flow diagram",
    confidentialLock: "Amazon Confidential",
    confidentialSub:
      "Internal tooling — visuals withheld. Architecture and outcomes below.",
  },
  ai: {
    shippedProject: "Shipped project",
    describedCompetency: "Described competency",
    projectAndCompetency: "Project + competency",
  },
  contactPage: {
    titleLead: "LET'S",
    titleAccent: "Connect",
    subtitle: "Schedule a call or send a message",
    bookACall: "Book a Call",
    sendAMessage: "Send a Message",
    callHeading: "Pick a time that works for you",
    callBody:
      "Send me your availability and I'll reply with a calendar invite for a quick intro call.",
    emailToSchedule: "Email to schedule",
    name: "Name",
    namePlaceholder: "Jane Doe",
    email: "Email",
    emailPlaceholder: "jane@example.com",
    topic: "Topic",
    topics: [
      "Full-time role",
      "Freelance project",
      "Just saying hi",
      "Bug report",
      "Other",
    ],
    message: "Message",
    messagePlaceholder: "Tell me about your project, idea, or just say hi...",
    consent:
      "I agree that my submitted data is collected and stored to respond to my inquiry.",
    send: "Send Message",
    sending: "Sending...",
    sent: "Message sent. I'll get back to you soon.",
    failed: "Failed to send. Please try again or email me directly.",
    invalidEmail: "Please enter a valid email address.",
    emailLabel: "Email Mohammad",
    githubLabel: "Mohammad's GitHub profile",
    linkedinLabel: "Mohammad's LinkedIn profile",
  },
  footer: {
    rights: "Mohammad El Prince",
  },
};

const ar: UIDictionary = {
  nav: {
    experience: "الخبرات",
    skills: "المهارات",
    projects: "المشاريع",
    aiEngineering: "هندسة الذكاء الاصطناعي",
    contact: "تواصل",
    logoLabel: "محمد البرنس — الصفحة الرئيسية",
    switchToLight: "التبديل إلى الوضع الفاتح",
    switchToDark: "التبديل إلى الوضع الداكن",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    languageToggle: "EN",
    languageToggleLabel: "Switch to English",
  },
  hero: {
    name: "محمد البرنس",
    title: "مهندس برمجيات ذكاء اصطناعي وكيلي",
    viewMyWork: "استعرض أعمالي",
    resume: "السيرة الذاتية",
    githubLabel: "حساب محمد على GitHub",
    linkedinLabel: "حساب محمد على LinkedIn",
    marqueePrimary: [
      "مهندس ذكاء اصطناعي",
      "مهندس برمجيات",
      "AWS بلا خوادم",
      "أنظمة RAG ووكلاء",
      "TypeScript",
      "Python",
      "مطوّر متكامل",
    ],
    marqueeSecondary: [
      "حلّال مشكلات",
      "مهندس سحابة",
      "أنظمة آمنة الأنواع",
      "ذكاء اصطناعي إنتاجي",
      "ملكية من البداية للنهاية",
      "أكثر من مجرد مهندس",
    ],
  },
  sections: {
    about: "نبذة عني",
    experience: "الخبرات",
    skills: "المهارات",
    projects: "مشاريع مميزة",
    aiEngineering: "هندسة الذكاء الاصطناعي",
    engineeringExcellence: "التميّز الهندسي",
    connect: "مستعد للتواصل؟",
    connectSubtitle: "لنحوّل فكرتك القادمة إلى شيء حقيقي",
  },
  connect: {
    headlinePrefix: "من الفكرة إلى",
    headlineAccent: "الأثر",
    tagline: "لنبنِ شيئًا حقيقيًا.",
    ctaLabel: "تواصل معي",
    availability: "متاح للوظائف بدوام كامل والمشاريع الحرة",
    pitch: "أبني تطبيقات عالية الأداء تحوّل الأفكار المعقدة إلى تجارب سلسة.",
  },
  projects: {
    caseStudy: "دراسة حالة",
    screenshot: "لقطة شاشة",
    preview: "معاينة",
    openToExplore: "اضغط للاستكشاف • اضغط للاستكشاف •",
    backToProjects: "العودة إلى المشاريع",
    exploreMore: "استكشف المزيد من المشاريع",
    liveDemo: "عرض مباشر",
    github: "GitHub",
    confidentialNotice: "سرّي خاص بأمازون — لا روابط عامة",
    theProblem: "المشكلة",
    theSolution: "الحل",
    architecture: "البنية المعمارية",
    builtWith: "بُني باستخدام",
    challenges: "التحديات",
    results: "النتائج",
    type: "النوع",
    released: "الإصدار",
    role: "الدور",
    stack: "التقنيات",
    technologies: "تقنية",
    dragToExplore: "اسحب للاستكشاف",
    architectureDiagram: "مخطط البنية المعمارية",
    dataFlowDiagram: "مخطط تدفق البيانات",
    confidentialLock: "سرّي خاص بأمازون",
    confidentialSub:
      "أداة داخلية — الصور محجوبة. البنية المعمارية والنتائج أدناه.",
  },
  ai: {
    shippedProject: "مشروع منجز",
    describedCompetency: "كفاءة موصوفة",
    projectAndCompetency: "مشروع + كفاءة",
  },
  contactPage: {
    titleLead: "لنتواصل",
    titleAccent: "معًا",
    subtitle: "احجز مكالمة أو أرسل رسالة",
    bookACall: "حجز مكالمة",
    sendAMessage: "إرسال رسالة",
    callHeading: "اختر الوقت المناسب لك",
    callBody: "أرسل لي أوقات توفرك وسأرد بدعوة تقويم لمكالمة تعارف سريعة.",
    emailToSchedule: "راسلني للتنسيق",
    name: "الاسم",
    namePlaceholder: "فلان الفلاني",
    email: "البريد الإلكتروني",
    emailPlaceholder: "you@example.com",
    topic: "الموضوع",
    topics: [
      "وظيفة بدوام كامل",
      "مشروع حر",
      "مجرد تحية",
      "بلاغ عن خلل",
      "أخرى",
    ],
    message: "الرسالة",
    messagePlaceholder: "أخبرني عن مشروعك أو فكرتك، أو فقط قل مرحبًا...",
    consent: "أوافق على جمع بياناتي المرسلة وتخزينها للرد على استفساري.",
    send: "إرسال الرسالة",
    sending: "جارٍ الإرسال...",
    sent: "تم إرسال الرسالة. سأرد عليك قريبًا.",
    failed: "تعذّر الإرسال. حاول مرة أخرى أو راسلني مباشرة.",
    invalidEmail: "يرجى إدخال بريد إلكتروني صالح.",
    emailLabel: "راسل محمد",
    githubLabel: "حساب محمد على GitHub",
    linkedinLabel: "حساب محمد على LinkedIn",
  },
  footer: {
    rights: "محمد البرنس",
  },
};

const dictionaries: Record<Locale, UIDictionary> = { en, ar };

/** Full UI dictionary for a locale. */
export function t(locale: Locale): UIDictionary {
  return dictionaries[locale];
}
