import type { Locale } from "@/lib/i18n";
import type {
  AboutContent,
} from "@/content/about";
import { about } from "@/content/about";
import { credibility } from "@/content/credibility";
import { experienceStages } from "@/content/experience";
import { aiCapabilities } from "@/content/ai";
import { engineeringDepthAreas } from "@/content/engineering";
import { projects } from "@/content/projects";
import { getProjectMeta, type ProjectMeta } from "@/content/project-meta";
import type {
  AICapabilityArea,
  CaseStudy,
  CredibilityContent,
  ExperienceStage,
  ExpertiseDomain,
} from "@/content/types";

/**
 * Structured-content localization. The English content modules under
 * `src/content/*` remain the source of truth (and keep every existing test
 * contract intact); this module layers Arabic translations over them, keyed
 * by stable identifiers, with per-field English fallback for anything not
 * translated. Technical terms (AWS service names, library names, tech-stack
 * labels) intentionally stay in Latin script in both locales.
 */

// ---------------------------------------------------------------------------
// About + credibility
// ---------------------------------------------------------------------------

const AR_ABOUT: AboutContent = {
  bio: "مهندس برمجيات بخلفية في البيانات، أبني وأطلق أنظمة إنتاجية على AWS — تطبيقات ذكاء اصطناعي معزّزة بالاسترجاع ووكيلية، ومنصات بلا خوادم، ومنتجات متكاملة آمنة الأنواع. أتولّى الهندسة من البداية للنهاية، من التصميم المعماري حتى الإنتاج.",
  location: "مقيم في ميلتون، أونتاريو،",
  locationNote: "ومتاح عالميًا",
  timezoneLabel: "مرن مع المناطق الزمنية",
  availability: "متاح للعمل",
  visionLine1: "لديك رؤية؟",
  visionLine2: "لنبنِها",
  visionTail: "معًا.",
  clockLabel: "تورونتو",
  quote: {
    text: "إنَّ اللهَ يحبُّ إذا عمِلَ أحدُكم عملًا أن يُتقِنَه.",
    attribution: "النبي محمد ﷺ",
  },
};

export function localizedAbout(locale: Locale): AboutContent {
  return locale === "ar" ? AR_ABOUT : about;
}

const AR_METRIC_LABELS: Record<string, string> = {
  "Serverless applications shipped": "تطبيقًا بلا خوادم تم إطلاقها",
  "Locations served": "مواقع مخدومة",
  "Years of experience": "سنوات من الخبرة",
  Technologies: "تقنية",
};

export function localizedCredibility(locale: Locale): CredibilityContent {
  if (locale !== "ar") return credibility;
  return {
    ...credibility,
    employer: "أمازون",
    roleFocus: "تطوير البرمجيات",
    metrics: credibility.metrics.map((metric) => ({
      ...metric,
      label: AR_METRIC_LABELS[metric.label] ?? metric.label,
    })),
  };
}

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

/** Keyed by startDate (stable across reordering). */
const AR_EXPERIENCE: Record<
  string,
  Pick<ExperienceStage, "title" | "organization" | "description">
> = {
  "2019-01-01": {
    title: "ماجستير في الهندسة — هندسة ميكانيكية",
    organization: "جامعة غيلف",
    description: "ماجستير هندسة ميكانيكية قائم على المقررات في غيلف، أونتاريو.",
  },
  "2023-02-01": {
    title: "تطوير الويب المتكامل",
    organization: "Flatiron School",
    description: "برنامج تطوير ويب متكامل عبر الإنترنت بلغتي Python وJavaScript.",
  },
  "2021-05-01": {
    title: "العمليات التشغيلية",
    organization: "أمازون",
    description:
      "أدوار تشغيلية في مواقع متعددة بأونتاريو (هاميلتون، سانت توماس، لندن، ميسيساغا) قبل الانتقال إلى تطوير البرمجيات.",
  },
  "2025-02-01": {
    title: "محلل بيانات — تركيز على تطوير البرمجيات",
    organization: "أمازون",
    description:
      "بناء تطبيقات بلا خوادم ومنصة إدارة جودة متعددة المناطق (React 19، TypeScript، tRPC، AWS CDK) تخدم المديرين في مراكز التوزيع بأمريكا الشمالية.",
  },
  "2025-06-01": {
    title: "تركيز على هندسة الذكاء الاصطناعي",
    organization: "أمازون",
    description:
      "توسيع خبرة الأنظمة بلا خوادم والواجهات الخلفية نحو هندسة الذكاء الاصطناعي — RAG وتطبيقات LLM والوكلاء وخطوط الاسترجاع واستدعاء الأدوات والتقييم.",
  },
};

export function localizedExperience(locale: Locale): ExperienceStage[] {
  if (locale !== "ar") return experienceStages;
  return experienceStages.map((stage) => ({
    ...stage,
    ...(AR_EXPERIENCE[stage.startDate] ?? {}),
  }));
}

// ---------------------------------------------------------------------------
// Skills (domain labels only — skill names stay technical/Latin)
// ---------------------------------------------------------------------------

const AR_SKILL_DOMAINS: Record<ExpertiseDomain, string> = {
  Backend: "الواجهات الخلفية",
  Frontend: "الواجهات الأمامية",
  Cloud: "السحابة",
  AI: "الذكاء الاصطناعي",
  Databases: "قواعد البيانات",
};

export function localizedSkillDomain(
  locale: Locale,
  domain: ExpertiseDomain,
): string {
  return locale === "ar" ? (AR_SKILL_DOMAINS[domain] ?? domain) : domain;
}

// ---------------------------------------------------------------------------
// AI capabilities
// ---------------------------------------------------------------------------

const AR_AI: Record<string, Pick<AICapabilityArea, "title" | "competencyDescription">> = {
  rag: {
    title: "التوليد المعزّز بالاسترجاع",
    competencyDescription:
      "تأصيل إجابات النماذج اللغوية في معرفة خارجية عبر استرجاع السياق وقت السؤال — طُبّق في Noor AI حيث تستشهد الإجابات بآيات كاملة وأحاديث من قاعدة معرفة Bedrock تضم نحو ٢٧ ألف مقطع، مع استقاء الاستشهادات من البيانات الوصفية بحيث يستحيل على النموذج اختلاقها.",
  },
  "llm-applications": {
    title: "تطبيقات النماذج اللغوية",
    competencyDescription:
      "تصميم تدفقات إنتاجية حول النماذج اللغوية الكبيرة — هندسة الموجّهات، والبث الفوري للاستجابات، وإدارة السياق، والضوابط. يبث Noor AI استجابات Claude من البداية للنهاية عبر FastAPI على Lambda خلف CloudFront، بموجّه نظام يفرض قواعد الاستشهاد ودقة المذاهب.",
  },
  agents: {
    title: "الوكلاء",
    competencyDescription:
      "تركيب تدفقات وكلاء تخطط وتستدعي الأدوات وتتقدم نحو الهدف بحالة صريحة وشروط توقف. يشغّل Noor AI وكيل LangChain يستدعي الأدوات على Bedrock Claude، يقرر متى يسترجع النصوص المؤصلة ويحفظ ذاكرة المحادثة لكل جلسة في DynamoDB.",
  },
  "retrieval-embedding-pipelines": {
    title: "خطوط الاسترجاع والتضمين",
    competencyDescription:
      "بناء خطوط استيعاب وتضمين تقسّم المحتوى وتولّد المتجهات وتفهرسها للاسترجاع الدلالي. يحوّل خط Noor AI القرآن وصحيح البخاري إلى نحو ٢٧ ألف ملف أحادي المقطع ببيانات استشهاد محسوبة مسبقًا، مضمّنة في فهرس S3 Vectors.",
  },
  "tool-calling": {
    title: "استدعاء الأدوات",
    competencyDescription:
      "إتاحة دوال وواجهات برمجية منمّطة للنموذج اللغوي ليستدعيها بوسائط مُتحقق منها. يغلّف Noor AI واجهة Retrieve الخاصة بقاعدة معرفة Bedrock كأداة LangChain يستدعيها الوكيل عند الحاجة.",
  },
  "evaluation-pipelines": {
    title: "خطوط التقييم",
    competencyDescription:
      "قياس جودة النماذج والتطبيقات عبر منصات تقييم آلية — مجموعات بيانات ذهبية وفحوص انحدار ومقاييس تقييم — بتطبيق انضباط تغطية الاختبارات الكاملة المتبع في منصة إدارة الجودة على الأنظمة غير الحتمية.",
  },
};

export function localizedAICapabilities(locale: Locale): AICapabilityArea[] {
  if (locale !== "ar") return aiCapabilities;
  return aiCapabilities.map((area) => ({
    ...area,
    ...(AR_AI[area.key] ?? {}),
  }));
}

// ---------------------------------------------------------------------------
// Engineering depth areas (keyed by English title)
// ---------------------------------------------------------------------------

const AR_ENGINEERING: Record<
  string,
  { title: string; description: string; evidence: string[] }
> = {
  "System Design": {
    title: "تصميم الأنظمة",
    description:
      "تصميم أنظمة متكاملة من الطرف إلى الطرف — من المصادقة عند الحافة والواجهات الآمنة الأنواع إلى نمذجة البيانات والتحليلات — لمنصة إدارة الجودة التي تخدم المديرين في مراكز التوزيع بأمريكا الشمالية.",
    evidence: [
      "صممت مستودعًا أحاديًا بلغة TypeScript ‏(React 19، tRPC، AWS CDK) بطبقة واجهات بلا خوادم ومصادقة عبر CDN.",
      "نفذت مصادقة عند الحافة وتحكمًا بالوصول قائمًا على الأدوار ومراقبة مستخدمين فورية.",
      "بنيت لوحات تحليلات بتصفية متعددة المواقع وتجميع بيانات على مستوى المدير.",
    ],
  },
  Scalability: {
    title: "قابلية التوسع",
    description:
      "بناء أحمال عمل بلا خوادم مدفوعة بالأحداث تتوسع لحركة الإنتاج عبر مواقع متعددة دون إدارة خوادم.",
    evidence: [
      "طورت أكثر من ١٥ أداة أتمتة بيانات بلا خوادم تعالج بيانات تشغيلية من S3 وواجهات داخلية.",
      "أوصلت تنبيهات فورية عبر SES وSNS وSlack لفرق العمليات.",
      "أطلقت المنصة في موقع تجريبي وتوسعت نحو أكثر من ٨ مراكز توزيع إضافية.",
    ],
  },
  "Cloud Architecture": {
    title: "هندسة السحابة",
    description:
      "تصميم ونشر منصة ويب متعددة المناطق بالكامل كبنية تحتية بالشيفرة، قابلة لإعادة الإنتاج عبر AWS CDK مع نشر آلي.",
    evidence: [
      "جهزت بصمة متعددة المناطق عبر AWS CDK كبنية تحتية بالشيفرة.",
      "امتلكت دورة الحياة كاملة من التصميم المعماري حتى النشر الآلي ومراقبة الإنتاج.",
      "هيأت توصيل CDN ومصادقة الحافة وقابلية الملاحظة لأحمال الإنتاج.",
    ],
  },
  "AWS Services": {
    title: "خدمات AWS",
    description:
      "عمق عملي عبر حزمة AWS بلا خوادم والبنية التحتية المستخدمة لتشغيل المنصة وأدوات أتمتة البيانات في الإنتاج.",
    evidence: [
      "الحوسبة والواجهات على AWS Lambda مع tRPC وتخزين DynamoDB.",
      "الرسائل والتنبيهات عبر EventBridge وSES وSNS.",
      "التوصيل والأمان عند الحافة عبر CloudFront وWAF وRoute 53، والمراقبة عبر CloudWatch وRUM.",
    ],
  },
  "Backend Engineering": {
    title: "هندسة الواجهات الخلفية",
    description:
      "كتابة خدمات خلفية آمنة الأنواع ومُختبرة جيدًا بلغتي TypeScript وPython، مع امتلاك دورة حياة البرمجيات من المتطلبات حتى مراقبة الإنتاج.",
    evidence: [
      "بنيت واجهات tRPC آمنة الأنواع فوق DynamoDB مع تحكم بالوصول قائم على الأدوار.",
      "حافظت على تغطية اختبارات ١٠٠٪ عبر ٦ حزم باستخدام Vitest وESLint واختبارات اللقطات.",
      "أتمتت خطوط CI/CD لعمليات نشر قابلة للتكرار كبنية تحتية بالشيفرة.",
    ],
  },
};

export function localizedEngineeringAreas(locale: Locale) {
  if (locale !== "ar") return engineeringDepthAreas;
  return engineeringDepthAreas.map((area) => {
    const translated = AR_ENGINEERING[area.title];
    return translated ? { ...area, ...translated } : area;
  });
}

// ---------------------------------------------------------------------------
// Projects (keyed by slug; tech-stack labels and diagrams stay technical)
// ---------------------------------------------------------------------------

const AR_PROJECTS: Record<
  string,
  Partial<
    Pick<
      CaseStudy,
      "name" | "problem" | "solution" | "architectureOverview" | "challenges" | "results"
    >
  >
> = {
  "noor-ai": {
    name: "نور AI",
    problem:
      "روبوتات المحادثة العامة غير موثوقة في الأسئلة الإسلامية: تختلق استشهادات قرآنية وأحاديث، وتتجاهل الفروق الحقيقية بين المذاهب السنية الأربعة.",
    solution:
      "مساعد أسئلة وأجوبة إسلامي محادثي مؤصَّل في قاعدة معرفة استرجاعية من القرآن وصحيح البخاري. وكيل LangChain على AWS Bedrock (Claude) يسترجع آيات وأحاديث كاملة باستشهادات محسوبة مسبقًا، ويحفظ ذاكرة المحادثة في DynamoDB، ويبث الإجابات كلمة كلمة، ويوضح اختلافات المذاهب صراحة بدل ادعاء إجماع زائف — كل ذلك بلا خوادم على AWS.",
    architectureOverview:
      "خط استيعاب غير متصل يحوّل القرآن وصحيح البخاري إلى نحو ٢٧ ألف ملف أحادي المقطع، كلٌّ مقرون ببيانات استشهاد، مضمّنة عبر Cohere Multilingual v3 في فهرس S3 Vectors خلف قاعدة معرفة Bedrock — فوحدات الاسترجاع دائمًا آيات أو أحاديث كاملة والاستشهادات من البيانات الوصفية لا من النموذج. تعمل واجهة FastAPI الخلفية على Lambda عبر Lambda Web Adapter مع بث الاستجابات عبر Function URL؛ ويستدعي وكيل LangChain واجهة Retrieve كأداة، وتحفظ DynamoDB جلسات المحادثة. تُقدَّم واجهة الدردشة (Next.js) من S3 عبر CloudFront الذي يوجّه ‎/api/*‎ إلى الخلفية تحت نطاق مخصص واحد (Route 53 + ACM). كل شيء مجهز عبر AWS CDK في خمس حزم مخصصة.",
    challenges: [
      "القضاء على الاستشهادات المختلقة: ملف واحد لكل آية/حديث باستشهادات محسوبة وقت الاستيعاب، فيقتبس الوكيل المراجع حرفيًا من بيانات الاسترجاع بدل توليدها.",
      "عرض الأحكام الفقهية بأمانة عبر المذاهب السنية الأربعة — موجّه النظام يمنع ادعاء الإجماع ويلزم التصنيف بمصطلحات كل مذهب.",
      "بث استجابات الوكيل من البداية للنهاية عبر Lambda بدون Docker: FastAPI خلف Lambda Web Adapter مع Function URL يدعم البث، وتجميع اعتماديات Python عبر uv وقت النشر.",
    ],
    results: [
      "متاح مباشرة على noorai.elprince.net — نطاق CloudFront واحد يخدم واجهة الدردشة وواجهة البث معًا.",
      "إجابات مؤصَّلة تستشهد بآيات كاملة وأحاديث البخاري من قاعدة معرفة تضم نحو ٢٧ ألف مقطع.",
      "نشر بلا خوادم بالكامل كبنية تحتية بالشيفرة عبر خمس حزم AWS CDK.",
    ],
  },
  "quality-management-platform": {
    name: "منصة إدارة الجودة",
    problem:
      "احتاجت مراكز توزيع أمازون منصة متعددة المناطق قابلة للتوسع لإدارة عمليات الجودة وتتبع المقاييس وتوفير لوحات تحليلات فورية لفرق العمليات.",
    solution:
      "مستودع أحادي بلغة TypeScript يعتمد React 19 وtRPC وAWS CDK لتقديم منصة بلا خوادم بمصادقة عند حافة CDN وتحكم بالوصول قائم على الأدوار ولوحات تحليلات بتجميع على مستوى المدير وتصفية متعددة المواقع. وإلى جانبها أسطول أدوات أتمتة بيانات مدفوعة بالأحداث يعالج البيانات التشغيلية ويدفع تنبيهات فورية لفرق العمليات — كل ذلك منشور كبنية تحتية بالشيفرة متعددة المناطق.",
    architectureOverview:
      "تصل الطلبات عبر CloudFront الذي يصادق المستخدمين عند الحافة — محصّنًا بـ WAF وخلف Route 53 — قبل تقديم عميل React 19. يستدعي العميل واجهة tRPC آمنة الأنواع على AWS Lambda تفرض تحكمًا بالوصول قائمًا على الأدوار، مدعومة بـ DynamoDB لبيانات الجودة والتحليلات. وبموازاة المنصة، تعالج أكثر من ١٥ أداة أتمتة بلا خوادم على Lambda وEventBridge بيانات تشغيلية من S3 وواجهات داخلية، وتوصل تنبيهات فورية عبر SES وSNS وSlack. توفر CloudWatch وRUM المراقبة وقياسات المستخدم الحقيقي، والبصمة متعددة المناطق كاملة مجهزة عبر AWS CDK مع CI/CD آلي وتغطية اختبارات ١٠٠٪ عبر ست حزم.",
    challenges: [
      "تنسيق بيانات جودة متسقة عبر مناطق AWS متعددة.",
      "تأمين الواجهة خلف مصادقة CDN دون إضافة زمن استجابة، مع تحكم بالوصول قائم على الأدوار في كل مسار.",
      "التوسع من نسخة تجريبية في مركز توزيع واحد نحو أكثر من ٨ مواقع دون تعطيل العمليات الجارية.",
      "تجميع تحليلات الجودة حسب المدير والموقع في الوقت الفعلي.",
      "الحفاظ على تغطية اختبارات ١٠٠٪ في مستودع TypeScript متنامٍ.",
    ],
    results: [
      "منصة بلا خوادم متعددة المناطق انطلقت في مركز تجريبي وتتوسع عبر أكثر من ٨ مواقع في أمريكا الشمالية.",
      "أكثر من ١٥ أداة أتمتة بيانات مدفوعة بالأحداث توصل تنبيهات فورية عبر SES وSNS وSlack.",
      "تغطية اختبارات ١٠٠٪ عبر ٦ حزم باستخدام Vitest وESLint واختبارات اللقطات.",
      "بنية تحتية قابلة لإعادة الإنتاج بالكامل عبر AWS CDK مع CI/CD آلي.",
    ],
  },
  "yasmade-aws": {
    problem:
      "احتاج الحرفيون والمعلمون المبدعون منصة إلكترونية قابلة للتوسع لعرض المنتجات اليدوية وإدارة المخزون عبر لوحة تحكم وتتبع طلبات العملاء مباشرة.",
    solution:
      "منصة تجارة إلكترونية حديثة بـ React + Vite + Supabase مع Zustand لإدارة الحالة، ولوحة تحكم إدارية، وطلبات عملاء مباشرة — منشورة على AWS ببنية تحتية بالشيفرة عبر CDK وشبكة CloudFront.",
    architectureOverview:
      "تطبيق صفحة واحدة بـ React + Vite يستخدم Zustand لحالة العميل ويتخاطب مع Supabase للبيانات والمصادقة والتخزين. تُقدَّم الأصول الثابتة من S3 خلف CloudFront، ويُرسل البريد المعاملاتي عبر SES، والبيئة كاملة مجهزة عبر AWS CDK بخط CI/CD ذاتي التحديث يعيد النشر مع كل تغيير.",
    challenges: [
      "تصميم خط CI/CD ذاتي التحديث يعيد نشر البنية التحتية بأمان.",
      "إبقاء المخزون وحالة الطلبات المباشرة متسقة بين لوحة التحكم والعملاء.",
      "ربط بريد SES المعاملاتي بسير عمل الطلبات.",
    ],
    results: [
      "منصة تجارة إلكترونية كاملة بلوحة تحكم وتتبع طلبات مباشر منشورة على AWS.",
      "توصيل عبر CloudFront مدعوم بأصول مستضافة على S3.",
      "بنية تحتية بالشيفرة مع خط CI/CD آلي.",
    ],
  },
  portfolio: {
    name: "الموقع الشخصي",
    problem: "الحاجة إلى حضور مهني على الإنترنت لعرض المهارات والمشاريع.",
    solution:
      "موقع شخصي حديث ومتجاوب بوضع داكن وحركات سلسة، مبني بإطار Next.js ومنسّق بـ Tailwind CSS.",
    architectureOverview:
      "تطبيق Next.js يعرض أقسام الموقع كموقع ثابت محسّن لمحركات البحث ومنسق بـ Tailwind CSS. تقود حالة السمة الوضعين الداكن والفاتح، ويوفر Framer Motion حركات الدخول والتفاعل، ويتولى EmailJS رسائل التواصل من المتصفح مباشرة.",
    challenges: [
      "تقديم حركات Framer Motion سلسة دون الإضرار بالأداء.",
      "دعم سمة داكنة وفاتحة متقنة عبر كل الأقسام.",
      "ربط بريد التواصل من جهة العميل عبر EmailJS.",
    ],
    results: [
      "موقع محسّن لمحركات البحث بسمتين داكنة وفاتحة.",
      "تفاعلات دقيقة وحركات دخول عبر Framer Motion.",
      "تكامل تواصل عبر EmailJS منشور للعموم.",
    ],
  },
};

export function localizedProjects(locale: Locale): CaseStudy[] {
  if (locale !== "ar") return projects;
  return projects.map((project) => ({
    ...project,
    ...(AR_PROJECTS[project.slug] ?? {}),
  }));
}

export function localizedProject(
  locale: Locale,
  slug: string,
): CaseStudy | undefined {
  return localizedProjects(locale).find((p) => p.slug === slug);
}

// ---------------------------------------------------------------------------
// Project presentation meta (category + role lines)
// ---------------------------------------------------------------------------

const AR_PROJECT_META: Record<string, Partial<Pick<ProjectMeta, "category" | "role">>> = {
  "noor-ai": { category: "ذكاء اصطناعي · RAG على AWS", role: "بناء فردي — من التصميم إلى النشر" },
  "quality-management-platform": { category: "منصة AWS", role: "مهندس تطوير برمجيات" },
  "yasmade-aws": { category: "تجارة إلكترونية · AWS", role: "مطوّر متكامل" },
  portfolio: { category: "ويب · Next.js", role: "تصميم وتطوير" },
};

export function localizedProjectMeta(locale: Locale, slug: string): ProjectMeta {
  const meta = getProjectMeta(slug);
  if (locale !== "ar") return meta;
  return { ...meta, ...(AR_PROJECT_META[slug] ?? {}) };
}
