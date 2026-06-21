/**
 * AI Engineering capability-area content (Req 5.1, 5.3).
 *
 * All six capability areas required by Requirement 5.1 are present: retrieval-
 * augmented generation, large language model applications, agents, retrieval &
 * embedding pipelines, tool calling, and evaluation pipelines.
 *
 * **Content gap (Req 5.3):** the current codebase contains no explicitly
 * AI-focused projects, so every `project` field is intentionally `undefined`.
 * `classifyCapability` (`src/lib/ai.ts`) therefore classifies each area as a
 * described competency, and the AI Engineering section presents these as
 * competencies without claiming shipped work. The structure already supports
 * project-backed case studies for when the user supplies real AI project content.
 */

import type { AICapabilityArea } from "@/content/types";

export const aiCapabilities: AICapabilityArea[] = [
  {
    key: "rag",
    title: "Retrieval-Augmented Generation",
    competencyDescription:
      "Grounding language-model responses in external knowledge by retrieving relevant context at query time and feeding it into the prompt, reducing hallucination and keeping answers current with authoritative sources.",
    // project intentionally omitted — see content-gap note above.
  },
  {
    key: "llm-applications",
    title: "LLM Applications",
    competencyDescription:
      "Designing production application flows around large language models — prompt design, streaming responses, context-window management, structured output, and guardrails — built on the same TypeScript and serverless foundations used for the platform work at Amazon.",
  },
  {
    key: "agents",
    title: "Agents",
    competencyDescription:
      "Composing autonomous and semi-autonomous agent workflows that plan, call tools, and iterate toward a goal, with explicit state, stopping conditions, and human-in-the-loop checkpoints for reliability.",
  },
  {
    key: "retrieval-embedding-pipelines",
    title: "Retrieval & Embedding Pipelines",
    competencyDescription:
      "Building ingestion and embedding pipelines that chunk source content, generate vector embeddings, and index them for semantic retrieval — a natural extension of the serverless data-automation pipelines already shipped on AWS Lambda and EventBridge.",
  },
  {
    key: "tool-calling",
    title: "Tool Calling",
    competencyDescription:
      "Exposing typed functions and external APIs to a language model so it can invoke them with validated arguments, mapping model intents onto real backend actions with the same type-safety discipline used for tRPC APIs.",
  },
  {
    key: "evaluation-pipelines",
    title: "Evaluation Pipelines",
    competencyDescription:
      "Measuring model and application quality through automated evaluation harnesses — golden datasets, regression checks, and scoring metrics — applying the 100% test-coverage discipline maintained on the Quality Management Platform to non-deterministic systems.",
  },
];

export default aiCapabilities;
