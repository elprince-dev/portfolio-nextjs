/**
 * AI Engineering capability-area content (Req 5.1, 5.3).
 *
 * All six capability areas required by Requirement 5.1 are present: retrieval-
 * augmented generation, large language model applications, agents, retrieval &
 * embedding pipelines, tool calling, and evaluation pipelines.
 *
 * Each area lists the concrete `skills` applied in Noor AI — the shipped
 * Islamic Q&A assistant (RAG over a Bedrock Knowledge Base, a LangChain
 * tool-calling agent on Claude, streaming FastAPI on Lambda) — alongside the
 * described competency. The full Noor AI case study lives in the Featured
 * Projects section (`src/content/projects.ts`), so `project` stays undefined
 * here to avoid duplicating it; `classifyCapability` presents these as
 * described competencies with concrete tooling evidence.
 */

import type { AICapabilityArea } from "@/content/types";

export const aiCapabilities: AICapabilityArea[] = [
  {
    key: "rag",
    title: "Retrieval-Augmented Generation",
    competencyDescription:
      "Grounding language-model responses in external knowledge by retrieving relevant context at query time — applied in Noor AI, where answers cite whole Quran verses and Bukhari hadith retrieved from a ~27,000-chunk Bedrock Knowledge Base, with citations drawn from metadata so the model cannot fabricate references.",
    skills: [
      "AWS Bedrock Knowledge Bases",
      "S3 Vectors",
      "Cohere Multilingual v3",
      "LangChain",
    ],
  },
  {
    key: "llm-applications",
    title: "LLM Applications",
    competencyDescription:
      "Designing production application flows around large language models — prompt design, token-by-token streaming, context management, and guardrails. Noor AI streams Claude responses end to end through a FastAPI Lambda behind CloudFront, with a system prompt that enforces citation and madhab-accuracy rules.",
    skills: [
      "AWS Bedrock (Claude)",
      "FastAPI",
      "Response Streaming",
      "Prompt Engineering",
    ],
  },
  {
    key: "agents",
    title: "Agents",
    competencyDescription:
      "Composing agent workflows that plan, call tools, and iterate toward a goal with explicit state and stopping conditions. Noor AI runs a LangChain tool-calling agent on Bedrock Claude that decides when to retrieve grounded passages and keeps per-session conversation memory in DynamoDB.",
    skills: ["LangChain Agents", "Tool Calling", "DynamoDB Memory"],
  },
  {
    key: "retrieval-embedding-pipelines",
    title: "Retrieval & Embedding Pipelines",
    competencyDescription:
      "Building ingestion and embedding pipelines that chunk source content, generate vector embeddings, and index them for semantic retrieval. Noor AI's offline pipeline transforms the Quran and Sahih al-Bukhari into ~27,000 single-chunk files with precomputed citation metadata, embedded into an S3 Vectors index.",
    skills: ["Python", "Embedding Pipelines", "S3", "Citation Metadata"],
  },
  {
    key: "tool-calling",
    title: "Tool Calling",
    competencyDescription:
      "Exposing typed functions and external APIs to a language model so it can invoke them with validated arguments. Noor AI wraps the Bedrock Knowledge Base Retrieve API as a LangChain tool the agent calls on demand, mapping model intents onto real retrieval actions.",
    skills: ["LangChain Tools", "Bedrock Retrieve API", "Python"],
  },
  {
    key: "evaluation-pipelines",
    title: "Evaluation Pipelines",
    competencyDescription:
      "Measuring model and application quality through automated evaluation harnesses — golden datasets, regression checks, and scoring metrics — applying the 100% test-coverage discipline maintained on the Quality Management Platform to non-deterministic systems.",
  },
];

export default aiCapabilities;
