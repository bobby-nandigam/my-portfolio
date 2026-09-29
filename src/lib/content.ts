/**
 * Single source of truth for all portfolio content.
 * Every number and fact here is taken from the documented brief — nothing invented.
 */

/** Base path the site is served under (set in CI for GitHub Project Pages). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const PROFILE = {
  name: "Bobby Nandigam",
  role: "Software Engineer",
  focus: "Backend Systems · ML Engineering · Cloud Infrastructure",
  site: "bobbynandigam.in",
  email: "bobbynandigam.official@gmail.com",
  location: "Nellore / India",
  github: "https://github.com/bobbynandigam",
  linkedin: "https://linkedin.com/in/bobbynandigam",
  leetcode: "https://leetcode.com/bobbynandigam",
  resume: `${BASE_PATH}/resume.pdf`,
};

export const HERO_META = [
  { label: "Based in", value: "India" },
  { label: "Focus", value: "Backend / ML / Infrastructure" },
  { label: "Experience", value: "2+ Years" },
  { label: "Available for", value: "Backend · ML · Platform" },
];

export const METRICS = [
  { value: 10000, suffix: "+", label: "Daily API Requests", note: "production" },
  { value: 99.5, suffix: "%", label: "Uptime", note: "measured" },
  { value: 72, suffix: "%", label: "API Latency Reduction", note: "900ms → 250ms" },
  { value: 80, suffix: "%", label: "Manual Querying Reduced", note: "before / after" },
  { value: 500, suffix: "+", label: "Concurrent Users", note: "peak load" },
  { value: 40, suffix: "%", label: "Upload Speed Improvement", note: "measured" },
  { value: 45, suffix: "%", label: "Faster Page Load", note: "production" },
] as const;

export type CaseStudy = {
  problem: string;
  constraints: string;
  architecture: string;
  decisions: string;
  implementation: string;
  performance: string;
  tradeoffs: string;
  result: string;
  improve: string;
};

export type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  summary: string;
  stack: string[];
  details: string[];
  stats?: { value: string; label: string }[];
  /** node labels for the architecture diagram, top → bottom */
  flow: string[];
  /** small annotations keyed loosely to the flow */
  annotations: string[];
  caseStudy: CaseStudy;
  disclaimer?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "graphrag",
    index: "01",
    title: "GraphRAG-Powered Knowledge Retrieval System",
    subtitle: "Knowledge retrieval beyond vector similarity.",
    summary:
      "A retrieval system that combines a knowledge graph with vector search, so answers are grounded in explicit relationships between entities rather than surface-level text similarity alone.",
    stack: ["Python", "LangChain", "Neo4j", "FastAPI", "Azure"],
    details: [
      "Knowledge graph pipeline",
      "Entity and relationship extraction",
      "Hybrid vector + graph retrieval",
      "Streaming FastAPI endpoint",
      "Graph-grounded answers",
      "Extensible LLM backend",
    ],
    flow: [
      "DOCUMENTS",
      "ENTITY EXTRACTION",
      "KNOWLEDGE GRAPH",
      "VECTOR RETRIEVAL",
      "GRAPH TRAVERSAL",
      "LLM",
      "GROUNDED ANSWER",
    ],
    annotations: ["", "", "relationships", "", "hybrid retrieval", "streamed", ""],
    caseStudy: {
      problem:
        "Pure vector retrieval returns text that looks similar to a query, but it loses the relationships between entities. Questions that depend on how things connect — who reports to whom, which component depends on which — get plausible-sounding but poorly grounded answers.",
      constraints:
        "Answers had to be traceable back to source relationships, latency had to stay acceptable for an interactive endpoint, and the LLM backend had to stay swappable rather than hard-wired to one provider.",
      architecture:
        "Documents are parsed, entities and relationships are extracted, and a knowledge graph is built in Neo4j. Retrieval runs a hybrid path: vector search finds candidate context, graph traversal expands it along real relationships, and the combined context is passed to the LLM behind a streaming FastAPI endpoint.",
      decisions:
        "Chose a graph store over a flat vector index so relationships are first-class. Kept the LLM behind an interface so the backend model can change without touching retrieval. Made the endpoint stream so the interface feels responsive while the graph traversal completes.",
      implementation:
        "LangChain orchestrates extraction and retrieval; Neo4j holds the graph; FastAPI serves a streaming endpoint; the service is deployed on Azure. Extraction and graph-building run as a separate pipeline from the query path.",
      performance:
        "Graph grounding measurably improves answer relevance on relationship-heavy questions compared to a vector-only baseline, while streaming keeps perceived latency low.",
      tradeoffs:
        "Building and maintaining a knowledge graph adds ingestion cost and complexity versus a plain vector store. That cost is justified only when relationships between entities actually matter to the answers.",
      result:
        "A retrieval service that produces graph-grounded answers with an extensible model backend and a responsive streaming interface.",
      improve:
        "Add evaluation harnesses that score grounding quality automatically, and cache frequent traversal subgraphs to cut repeated graph work.",
    },
  },
  {
    id: "document-storage",
    index: "02",
    title: "Scalable Document Storage & Management System",
    subtitle: "Async infrastructure for high-concurrency workloads.",
    summary:
      "A multi-tenant document platform built around an asynchronous upload path and a worker pool, so ingestion stays fast and predictable under concurrent load.",
    stack: ["Flask", "PostgreSQL", "Azure Blob Storage", "Docker"],
    details: [
      "Asynchronous upload pipeline",
      "Worker pool for ingestion",
      "Blob storage for objects",
      "PostgreSQL for metadata",
      "Auth, RBAC, tenant isolation",
      "Containerised deployment",
    ],
    stats: [
      { value: "500+", label: "Concurrent Users" },
      { value: "40%", label: "Upload Speed Improvement" },
    ],
    flow: ["CLIENT", "API", "UPLOAD QUEUE", "WORKER POOL", "BLOB STORAGE"],
    annotations: ["", "async", "failure boundary", "", "durable"],
    caseStudy: {
      problem:
        "Synchronous uploads tied request threads to slow I/O. Under concurrent load the API degraded, and multi-tenant data had to stay strictly isolated.",
      constraints:
        "Uploads could be large and slow; the system had to serve 500+ concurrent users; tenants must never see each other's data; deployment had to be reproducible.",
      architecture:
        "The client hits the API, which enqueues work onto an upload queue instead of blocking. A worker pool consumes the queue and writes objects to Azure Blob Storage, while PostgreSQL holds metadata. Auth, RBAC, and tenant isolation gate every access path.",
      decisions:
        "Moved ingestion off the request path so the API stays responsive under load. Separated object storage (blob) from metadata (Postgres) so each scales on its own terms. Enforced tenant isolation at the data layer rather than trusting application checks alone.",
      implementation:
        "Flask serves the API, PostgreSQL stores metadata, Azure Blob Storage holds objects, and the whole system is containerised with Docker for reproducible deployment.",
      performance:
        "The async pipeline delivered a 40% upload speed improvement and sustained 500+ concurrent users without the API stalling on slow I/O.",
      tradeoffs:
        "Asynchronous ingestion adds a queue and worker pool to operate and monitor, and introduces eventual-consistency windows between upload acceptance and object availability. Explicit status is surfaced to the client to manage that.",
      result:
        "A document platform that ingests quickly, isolates tenants cleanly, and holds up under concurrent load.",
      improve:
        "Add per-tenant backpressure and rate limits, and move to signed direct-to-blob client uploads to take large payloads entirely off the API tier.",
    },
  },
  {
    id: "skin-cancer",
    index: "03",
    title: "Skin Cancer Detection System",
    subtitle: "From image preprocessing to production inference.",
    summary:
      "An image-classification pipeline that takes a lesion image from preprocessing through a CNN to a confidence-scored classification exposed over an API.",
    stack: ["Python", "TensorFlow", "CNN", "Flask"],
    details: [
      "Image preprocessing and augmentation",
      "Convolutional neural network",
      "Seven-category classification",
      "Confidence scoring",
      "Inference exposed over an API",
    ],
    stats: [
      { value: "13,000", label: "Images" },
      { value: "7", label: "Lesion Categories" },
      { value: "87%", label: "Classification Accuracy" },
      { value: "12%", label: "Reduction in False Negatives" },
    ],
    flow: [
      "IMAGE",
      "PREPROCESSING",
      "AUGMENTATION",
      "CNN",
      "CLASSIFICATION",
      "CONFIDENCE SCORE",
      "API",
    ],
    annotations: ["", "", "balanced classes", "", "false negatives ↓", "", "served"],
    disclaimer:
      "This was an engineering / ML project. It is not a medical device and not a substitute for professional medical diagnosis.",
    caseStudy: {
      problem:
        "Classify skin lesion images into seven categories reliably enough to be useful, with particular care that false negatives — missed positives — stay low.",
      constraints:
        "13,000 images across 7 categories with class imbalance; the model had to generalise beyond the training set; inference had to run behind a simple API.",
      architecture:
        "A pipeline: raw image → preprocessing → augmentation → CNN → classification → confidence score → API. Augmentation widens the effective dataset and reduces overfitting on under-represented categories.",
      decisions:
        "Invested in preprocessing and augmentation before reaching for a larger model, since data quality and balance drove accuracy more than raw capacity. Prioritised reducing false negatives given the domain.",
      implementation:
        "TensorFlow for the CNN, a preprocessing and augmentation stage over the 13,000-image dataset, and a Flask API to serve inference with confidence scores.",
      performance:
        "Reached 87% classification accuracy across 7 lesion categories and cut false negatives by 12% relative to the earlier baseline.",
      tradeoffs:
        "Optimising to reduce false negatives shifts the decision boundary and can raise false positives. In a screening-style context that trade is deliberate, but it is a trade, not a free win.",
      result:
        "A working image-classification service with confidence-scored output — an engineering and ML exercise, not a clinical tool.",
      improve:
        "Add calibration so confidence scores map to real probabilities, and evaluate on an external dataset to test generalisation beyond the original 13,000 images.",
    },
  },
  {
    id: "nlp-sql",
    index: "04",
    title: "NLP-to-SQL Query Engine",
    subtitle: "Natural language as a database interface.",
    summary:
      "A query engine that turns a plain-language question into validated SQL, runs it, and returns results — so non-SQL users can ask questions of a database directly.",
    stack: ["Python", "PostgreSQL", "Transformers", "Flask"],
    details: [
      "Schema understanding",
      "Natural-language to SQL generation",
      "Safety validation before execution",
      "Query execution and results",
    ],
    stats: [{ value: "80%", label: "Manual Querying Reduced" }],
    flow: [
      "USER QUESTION",
      "SCHEMA UNDERSTANDING",
      "SQL GENERATION",
      "SAFETY VALIDATION",
      "QUERY EXECUTION",
      "RESULT",
    ],
    annotations: ["", "schema-aware", "", "validated", "", "read-safe"],
    caseStudy: {
      problem:
        "People who understood the questions they wanted answered often didn't write SQL, so answering routine data questions became a manual bottleneck for the people who did.",
      constraints:
        "Generated SQL had to be safe to run against a real database, it had to respect the actual schema rather than hallucinate tables, and results had to be trustworthy enough to act on.",
      architecture:
        "A natural-language question flows through schema understanding, SQL generation, a safety-validation gate, execution, and back to a result. The validation stage is a hard boundary: nothing runs until it passes.",
      decisions:
        "Made safety validation a separate, explicit stage rather than trusting the model's output directly. Grounded generation in the real schema so queries reference tables that exist.",
      implementation:
        "A transformer model generates SQL from the question and schema, PostgreSQL is the target database, and Flask exposes the engine. Validation sits between generation and execution.",
      performance:
        "Reduced manual querying effort by 80% by letting people ask in natural language instead of routing every question through someone who writes SQL.",
      tradeoffs:
        "A model can still generate a query that is valid yet not what the user meant. The validation gate protects against unsafe SQL, not against semantic mismatch, so results are framed as answers to interpret rather than final truth.",
      result:
        "A natural-language interface to the database that removed most of the manual querying load.",
      improve:
        "Add a clarification loop for ambiguous questions and show the generated SQL alongside results so users can verify intent before trusting the output.",
    },
  },
];

export type StackGroup = {
  label: string;
  items: { name: string; projects: string[] }[];
};

/** projects[] holds the ids of PROJECTS that use each technology (for hover linking) */
export const STACK: StackGroup[] = [
  {
    label: "Languages",
    items: [
      { name: "Python", projects: ["graphrag", "skin-cancer", "nlp-sql"] },
      { name: "JavaScript", projects: [] },
      { name: "Java", projects: [] },
      { name: "C", projects: [] },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Flask", projects: ["document-storage", "skin-cancer", "nlp-sql"] },
      { name: "FastAPI", projects: ["graphrag"] },
      { name: "REST APIs", projects: ["graphrag", "document-storage"] },
      { name: "Async I/O", projects: ["document-storage"] },
    ],
  },
  {
    label: "Data",
    items: [
      { name: "PostgreSQL", projects: ["document-storage", "nlp-sql"] },
      { name: "MongoDB", projects: [] },
      { name: "Neo4j", projects: ["graphrag"] },
    ],
  },
  {
    label: "ML / AI",
    items: [
      { name: "TensorFlow", projects: ["skin-cancer"] },
      { name: "scikit-learn", projects: [] },
      { name: "LangChain", projects: ["graphrag"] },
      { name: "Transformers", projects: ["nlp-sql"] },
      { name: "NLP", projects: ["nlp-sql"] },
      { name: "RAG", projects: ["graphrag"] },
    ],
  },
  {
    label: "Cloud / Infra",
    items: [
      { name: "Azure", projects: ["graphrag", "document-storage"] },
      { name: "Docker", projects: ["document-storage"] },
      { name: "GitHub Actions", projects: [] },
      { name: "Git", projects: [] },
    ],
  },
  {
    label: "Engineering",
    items: [
      { name: "System Design", projects: ["graphrag", "document-storage"] },
      { name: "Performance Optimization", projects: ["document-storage", "graphrag"] },
      { name: "JWT / RBAC", projects: ["document-storage"] },
      { name: "CI/CD", projects: [] },
      { name: "Agile", projects: [] },
    ],
  },
];

export const EXPERIENCE = {
  role: "Software Engineer",
  company: "BillionBright Solutions LLP",
  start: "Sep 2024",
  end: "May 2026",
  startYear: "2024",
  endYear: "2026",
  location: "Nellore, India",
  focus: ["APIs", "ML Services", "Multi-tenancy", "CI/CD"],
  outcomes: [
    { value: "10,000+", label: "daily API requests" },
    { value: "99.5%", label: "uptime" },
    { value: "900ms → 250ms", label: "latency" },
    { value: "80%", label: "querying effort reduction" },
    { value: "45%", label: "faster page loads" },
    { value: "35%", label: "low-bandwidth response improvement" },
  ],
};

export const PRINCIPLES = [
  {
    n: "01",
    title: "Measure before optimizing.",
    note: "latency is a symptom → measure first",
  },
  {
    n: "02",
    title: "Design for failure.",
    note: "every queue creates a failure boundary",
  },
  {
    n: "03",
    title: "Keep boundaries explicit.",
    note: "authentication ≠ authorization",
  },
  {
    n: "04",
    title: "Prefer simple systems that scale.",
    note: "complexity is a cost you pay forever",
  },
  {
    n: "05",
    title: "Ship, observe, improve.",
    note: "the graph tells you what to fix next",
  },
];

export const OPEN_SOURCE = [
  { value: "5+", label: "Open Source Contributions" },
  { value: "—", label: "Engineering Mentor" },
  { value: "Top 10", label: "Finalist · TerraHackathon" },
];

export const EDUCATION = {
  degree: "B.Tech — Computer Science & Engineering",
  school: "NBKR Institute of Science & Technology",
  years: "2020 — 2024",
  cgpa: "8.5 / 10",
};

export const CERTIFICATIONS = [
  { title: "Database Fundamentals", issuer: "Microsoft" },
  { title: "Data Science for Engineers", issuer: "NPTEL — IIT Madras" },
];

export const NAV = [
  { n: "01", label: "Work", href: "#work" },
  { n: "02", label: "Experience", href: "#experience" },
  { n: "03", label: "Systems", href: "#systems" },
  { n: "04", label: "About", href: "#about" },
  { n: "05", label: "Contact", href: "#contact" },
];
