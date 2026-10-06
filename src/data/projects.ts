import { ProjectData } from "@/components/project-presentation-modal";

export const portfolioProjects: ProjectData[] = [
  {
    id: "booky",
    name: "Booky — NLP Book Analyzer",
    category: "NLP & Linguistic Intelligence",
    description: "An AI-powered text analysis suite designed to ingest lengthy literary works, PDFs, and articles, extracting deep thematic insight, sentiment trajectories, and actionable summaries within seconds.",
    image: "/images/booky_main_1786102935485.png",
    tech: ["Python 3.11", "Flask", "Angular 16", "spaCy", "NLTK", "TextBlob", "VADER"],
    database: {
      engine: "Stateless In-Memory Data Storage",
      description: "Operates in-memory for user document privacy compliance. Temporary document text buffers, spaCy pipeline caches, and ephemeral Google Books metadata caches.",
      models: ["DocTextBuffer", "TFIDFVectorMatrix", "GoogleBooksMetadataCache"]
    },
    architecture: [
      "User uploads PDF/DOCX or pastes raw text into the Angular 16 drag-and-drop zone.",
      "Flask backend ingests raw stream, parsing paragraphs with PyPDF2/python-docx into memory.",
      "NLP Processing Pipeline runs VADER sentiment progression and spaCy sentence complexity scoring.",
      "TF-IDF Extractive Summarizer generates hierarchical chapter outlines and core takeaways.",
      "Google Books API is queried asynchronously to enrich metadata and present contextual recommendations."
    ],
    features: [
      "Multi-Format Processing (PDF, DOCX, TXT up to 16MB)",
      "Sentiment Progression Arc (VADER & TextBlob sentence tone analysis)",
      "TF-IDF Extractive Key Sentence Ranker",
      "Readability Indexing (Flesch-Kincaid ease scores)",
      "Live Integration with Google Books API"
    ],
    execution: [
      "cd d:\\projects\\booky\npython app.py",
      "cd d:\\projects\\booky\nnpx ng serve --port 4200",
      "Open http://localhost:4200 in browser"
    ]
  },
  {
    id: "churn-predictor",
    name: "Customer Churn Predictor",
    category: "Predictive AI & Analytics",
    description: "An interactive decision-support application that enables telecom and subscription businesses to forecast customer churn risks and receive targeted retention recommendations.",
    image: "/images/churn_predictor_main_1786102923895.png",
    tech: ["Python 3.11", "Streamlit", "Scikit-Learn", "Pandas", "NumPy", "Joblib"],
    database: {
      engine: "Joblib Model Persistence (.pkl)",
      description: "Pre-trained machine learning model state serialization containing Random Forest / XGBoost classifiers, numeric scalers, and categorical encoder maps.",
      models: ["churn_model.pkl", "scaler.pkl", "feature_names.pkl"]
    },
    architecture: [
      "Business analyst configures customer demographics and account details using Streamlit UI sliders.",
      "Input data is encoded via categorical one-hot transformers and numerical StandardScaler.",
      "Pre-trained ML Classification Model computes exact churn probability score (0-100%).",
      "Prescriptive Rule Engine analyzes key risk triggers (e.g. Month-to-Month contract) and renders actionable retention steps."
    ],
    features: [
      "Dynamic Slider Controls for Tenure, Charges & Services",
      "Real-time Probability Metric Calculation",
      "Prescriptive Context-Aware Retention Recommendations",
      "Feature Attribution Driver Analysis"
    ],
    execution: [
      "cd \"d:\\projects\\churn prediction\"",
      ".\\.venv\\Scripts\\python.exe -m streamlit run app.py --server.port 8501",
      "Open http://localhost:8501 in browser"
    ]
  },
  {
    id: "studypoint",
    name: "StudyPoint (Eduu Platform)",
    category: "AI SaaS & Higher Education",
    description: "An AI-powered learning hub that converts static slides, PDFs, and notes into interactive quiz engines, mind maps, spaced-repetition flashcards, and personalized study paths.",
    image: "/images/studypoint_login_1786102959768.png",
    tech: ["React 18", "Vite", "Tailwind CSS", "Flask", "PostgreSQL", "SQLite", "Qdrant", "Redis", "Celery"],
    database: {
      engine: "PostgreSQL / SQLite + Qdrant Vector DB + Redis",
      description: "Relational database for accounts and workspaces, Qdrant vector database for 768-dim embeddings, and Redis for Celery background tasks.",
      models: ["User", "Workspace", "Content", "Chunk", "Cluster", "Flashcard", "Question", "Analytics"]
    },
    architecture: [
      "React Vite web application sends academic slides/PDFs to Flask API.",
      "Celery async workers process documents, chunk text, and generate embeddings into Qdrant Vector DB.",
      "Clustering algorithms aggregate concepts into high-fidelity SVG mind maps.",
      "Automated quiz and flashcard generation modules store items in relational PostgreSQL database.",
      "Bento Grid UI updates live user streaks and spaced repetition progress."
    ],
    features: [
      "Bento Grid Analytics Dashboard",
      "Automatic PDF-to-Quiz & Flashcard Generation",
      "High-Fidelity Concept Mind Map Synthesizer",
      "Multi-tenant Workspace Permissions",
      "Secure JWT User Authentication"
    ],
    execution: [
      "cd d:\\projects\\eduu\\StudyPoint\\backend\npython run.py",
      "cd d:\\projects\\eduu\\StudyPoint\\frontend\nnpm run dev -- --port 5173",
      "Open http://localhost:5173 in browser"
    ]
  },
  {
    id: "edurag",
    name: "RLM-GraphRAG (Eduu Research)",
    category: "Publication-Grade GraphRAG Research",
    description: "Confidence-Weighted Recursive Knowledge Graph RAG Framework designed for multi-hop educational question answering. Accepted at ICT4SD 2026.",
    image: "/images/edurag_dashboard.png",
    tech: ["Python 3.11", "PyTorch", "spaCy", "NetworkX", "ChromaDB", "Llama 3.1", "DistilBERT"],
    database: {
      engine: "ChromaDB Vector Store + NetworkX Knowledge Graph",
      description: "ChromaDB vector store for raw embeddings + NetworkX in-memory directed knowledge graph storing entities, relations, and factual/coherence triple weights.",
      models: ["ChromaDocumentCollection", "NetworkXEntityGraph", "LeidenCommunityIndex"]
    },
    architecture: [
      "Source documents are parsed into semantic chunks and passed to REBEL triple extractor.",
      "LLM Confidence Scorer rates extracted triples across Factual, Specificity, and Coherence dimensions.",
      "Confidence-Weighted Leiden algorithm clusters knowledge graph into semantic sub-graph communities.",
      "User multi-hop query initializes Seed Entity Linker and RLM Parallel Dispatcher.",
      "Context Synthesizer passes structured sub-graph context to local LLM for accurate multi-hop answer generation."
    ],
    features: [
      "LLM-Scored Triple Extraction (Factual x Specificity x Coherence)",
      "Confidence-Weighted Leiden Community Detection",
      "Asynchronous Multi-Entity Graph Traversal",
      "Publication-Grade Benchmark Evaluation (BLEU, ROUGE, F1)"
    ],
    execution: [
      "cd d:\\projects\\eduu\\Final-year-project",
      "python run_single.py",
      "Inspect logs and output metrics in outputs/ directory"
    ]
  },

  {
    id: "webforge",
    name: "WebForge Full-Stack Starter",
    category: "Full-Stack AI Monorepo",
    description: "A scalable, type-safe full-stack starter template pre-configured with pnpm workspaces, Next.js frontend, and modular Node.js API services.",
    image: "/images/webforge_landing_1786102993259.png",
    tech: ["Next.js 16", "React 19", "Node.js", "TypeScript", "Supabase", "pnpm workspaces"],
    database: {
      engine: "Supabase (PostgreSQL)",
      description: "PostgreSQL database with Row Level Security (RLS), Supabase Auth session engine, and database migrations in supabase/migrations/.",
      models: ["profiles", "workspaces", "agent_runs", "prompt_templates"]
    },
    architecture: [
      "pnpm workspace manages clean separation between packages/web and packages/api.",
      "Next.js 16 App Router renders fast server-side components and client interactions.",
      "Node.js API services interact with Supabase backend database via strongly typed schemas.",
      "Supabase Auth enforces secure multi-factor user authentication."
    ],
    features: [
      "Monorepo Architecture (packages/web & packages/api)",
      "Database as Code via Supabase Migrations",
      "100% End-to-End TypeScript Type Safety",
      "Pre-configured UI Component Library"
    ],
    execution: [
      "cd d:\\projects\\webforge\\packages\\web\nnpm run dev -- -p 3005",
      "Open http://localhost:3005 in browser"
    ]
  },
  {
    id: "salesforce",
    name: "Sales Force CRM Interface",
    category: "Enterprise CRM & Operations",
    description: "A specialized commercial CRM and operational intelligence interface designed for real-time transaction tracking, interactive pipeline visualization, and comprehensive sales metrics monitoring.",
    image: "/images/sales_force_main.png",
    tech: ["React 18", "Next.js", "Tailwind CSS", "TypeScript", "Framer Motion", "Recharts"],
    database: {
      engine: "Salesforce API / PostgreSQL Cache",
      description: "Integrates with Salesforce CRM backend via REST APIs, leveraging a local PostgreSQL database for analytical caching, offline access, and fast KPI aggregation.",
      models: ["Account", "Contact", "Lead", "Opportunity", "TransactionHistory", "SalesKPIs"]
    },
    architecture: [
      "Web application initializes session with Salesforce OAuth or local auth token.",
      "Aggregates open leads, active sales pipelines, and closed-won transaction logs from the data cache.",
      "Computes real-time sales velocity, win rates, and monthly quota achievements.",
      "Renders interactive pipeline stages and visual funnel charts via Framer Motion and Recharts."
    ],
    features: [
      "Dynamic Sales Funnel & Pipeline Visualization",
      "Real-time Transaction and Revenue Tracking",
      "Interactive Lead & Opportunity Management",
      "Type-Safe Salesforce API Integration Hub",
      "Sleek Dark-Mode Metrics Dashboard"
    ],
    execution: [
      "cd \"d:\\projects\\sales force\"",
      "npm install",
      "npm run dev",
      "Open http://localhost:3000 in browser"
    ]
  }
];
