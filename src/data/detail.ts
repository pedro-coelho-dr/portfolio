export type Block =
  | { type: 'p'; content: string }
  | { type: 'code'; lang?: string; content: string }
  | { type: 'ul'; items: string[] }
  // w/h are the image's intrinsic pixel dimensions — rendered as width/height
  // attributes so the browser reserves space and avoids layout shift (CLS).
  | { type: 'img'; src: string; alt?: string; caption?: string; external?: boolean; w?: number; h?: number }
  | { type: 'imgs'; items: { src: string; alt?: string; external?: boolean; w?: number; h?: number }[] }
  | { type: 'video'; src: string; caption?: string; external?: boolean; wide?: boolean }

export type Section = {
  title?: string
  blocks: Block[]
}

export type Link = { label: string; href: string; lang?: 'pt-br' }
export type MetaRow = { key: string; value: string }

export type Detail = {
  slug: string
  category: 'project' | 'code' | 'text'
  title: string
  eyebrow: string
  tagline: string
  tone?: 'amber' | 'neutral' | 'pink' | 'red'
  /** Marks the entry's body as Portuguese — sets lang on the rendered article. */
  lang?: 'pt-br'
  meta: MetaRow[]
  links: Link[]
  sections: Section[]
}

const details: Detail[] = [
  // ── PROJECTS ───────────────────────────────────────────────

  {
    slug: 'glhf',
    category: 'project',
    title: 'GLHF',
    eyebrow: 'vulnerable lab',
    tagline:
      'Deliberately vulnerable Flask web application for hands-on security training.',
    tone: 'red',
    meta: [
      { key: 'stack', value: 'flask · python · docker · sqlite' },
      { key: 'type', value: 'vulnerable lab' },
      { key: 'version', value: 'v0.1-beta' },
    ],
    links: [
      { label: 'github', href: 'https://github.com/pedro-coelho-dr/glhf' },
      { label: 'dockerhub', href: 'https://hub.docker.com/r/coriscope/glhf' },
    ],
    sections: [
      {
        blocks: [
          {
            type: 'p',
            content:
              'GLHF is a multi-stage web exploitation lab built around a deliberately weak social-network front. It guides you through five progressively deeper attack surfaces — Lobby, User, Direct, Board, and a hidden Root admin panel — each packed with intentionally flawed patterns drawn from real application antipatterns.',
          },
        ],
      },
      {
        title: 'challenge map',
        blocks: [
          {
            type: 'p',
            content:
              'Five stages, each introducing a new attack surface: Lobby (authentication), User (profile and session management), Direct (messaging), Board (forum with SQL-injectable routes), and Root — the hidden finale. Root is not discoverable by accident. Getting there requires piecing together clues from earlier stages.',
          },
          {
            type: 'imgs',
            items: [
              { src: 'img/glhf/01.png', alt: 'Lobby — login and 2FA screens', w: 1600, h: 900 },
              { src: 'img/glhf/02.png', alt: 'User — profile management', w: 1600, h: 900 },
              { src: 'img/glhf/03.png', alt: 'Board — forum interface', w: 1600, h: 900 },
              { src: 'img/glhf/04.png', alt: 'Direct — messaging', w: 1600, h: 900 },
            ],
          },
        ],
      },
      {
        title: 'vulnerability classes',
        blocks: [
          {
            type: 'ul',
            items: [
              'Enumeration — auth flows reveal whether an account exists',
              'Brute-force weakness — weak rate limiting on authentication',
              'Session/cookie flaws — weak session tokens and incomplete logout',
              'IDOR — endpoints trust client-supplied identifiers',
              'Unrestricted file upload — missing validation on avatar uploads',
              'XSS — stored, reflected, and DOM-based variants',
              'CSRF — missing tokens on state-changing routes',
              'SQL Injection — blind boolean and UNION-based variants',
            ],
          },
        ],
      },
      {
        title: 'run it',
        blocks: [
          {
            type: 'code',
            lang: 'bash',
            content:
              'docker pull coriscope/glhf:v0.1-beta\ndocker run -p 1337:1337 coriscope/glhf:v0.1-beta\n# → http://localhost:1337',
          },
        ],
      },
      {
        title: 'framing',
        blocks: [
          {
            type: 'p',
            content:
              'GLHF is a controlled training artifact: short challenge progression, intentionally weak surfaces, and a focus on recognition — looking at a page and asking "what could go wrong here?" before reaching for tools. The public documentation names bug classes, not payloads. Solutions live elsewhere.',
          },
        ],
      },
    ],
  },

  // ── CODE ───────────────────────────────────────────────────

  {
    slug: 'verbalyst',
    category: 'project',
    title: 'Verbalyst',
    eyebrow: 'applied ML',
    tagline:
      'Semantic similarity word game for Portuguese — guess the secret word by meaning, not by spelling.',
    tone: 'red',
    meta: [
      { key: 'stack', value: 'fastapi · quasar/vue · word2vec · docker · postgresql' },
      { key: 'infra', value: 'github actions → digitalocean' },
      { key: 'language', value: 'portuguese' },
    ],
    links: [
      { label: 'github', href: 'https://github.com/pedro-coelho-dr/verbalyst', lang: 'pt-br' },
    ],
    sections: [
      {
        blocks: [
          {
            type: 'p',
            content:
              'Inspired by Semantle and Contexto, Verbalyst is a daily word game where proximity is measured by semantic distance, not letter overlap. Players guess Portuguese words; each guess returns a closeness score derived from Word2Vec embeddings and is plotted on a 2D coordinate map, letting you navigate the semantic space toward the target word.',
          },
          {
            type: 'video',
            src: 'video/verbalyst/demo.mp4',
          },
        ],
      },
      {
        title: 'architecture',
        blocks: [
          {
            type: 'p',
            content: 'Three-stage pipeline:',
          },
          {
            type: 'ul',
            items: [
              'Data pipeline — processes a pre-trained Word2Vec model, filtering and normalizing to 8,021 Portuguese words',
              'Game builder — generates daily JSON files with target word, semantic hints, and 2D PCA-projected coordinates for the visual map',
              'Application — FastAPI backend + Quasar (Vue) frontend, containerized via Docker Compose, served behind Nginx',
            ],
          },
        ],
      },
      {
        title: 'ml approach',
        blocks: [
          {
            type: 'p',
            content:
              'Skip-Gram Word2Vec (100 dimensions) trained on a Portuguese corpus. Semantic distance uses cosine similarity. PCA reduces the 100-dimensional embedding space to 2D for the visual coordinate map shown during play. Multiplayer infrastructure — WebSocket-ready, OAuth GitHub auth implemented — exists in the backend schema but is not yet activated in the frontend.',
          },
        ],
      },
      {
        title: 'infrastructure',
        blocks: [
          {
            type: 'ul',
            items: [
              'Docker + Docker Compose for local/production environment parity',
              'Nginx as reverse proxy and static file server',
              'GitHub Actions CI/CD pipeline — auto-deploys to DigitalOcean on push to main',
              'PostgreSQL for game state and multiplayer schema',
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'devopscool',
    category: 'project',
    title: 'DevOpsCool',
    eyebrow: 'cloud · ai',
    tagline:
      'AI tutor for DevOps and Cloud — an interactive roadmap paired with a context-aware LLM assistant, deployed on AWS.',
    tone: 'red',
    meta: [
      { key: 'stack', value: 'react · fastapi · python · tailwind' },
      { key: 'infra', value: 'aws ecs fargate · cloudfront · github actions' },
      { key: 'model', value: 'aws bedrock · gpt-oss-120b' },
      { key: 'language', value: 'english · portuguese' },
    ],
    links: [
      { label: 'github', href: 'https://github.com/pedro-coelho-dr/devopscool' },
    ],
    sections: [
      {
        blocks: [
          {
            type: 'p',
            content:
              'DevOpsCool is an educational assistant that guides learners through DevOps and Cloud Computing as a connected ecosystem rather than isolated topics. Content is laid out as a hierarchical roadmap — from foundations to advanced cloud architectures — and an AI tutor offers context-aware guidance, practical examples, and study suggestions tailored to the node you are currently exploring.',
          },
          {
            type: 'video',
            src: 'video/devopscool/demo.mp4',
            wide: true,
          },
        ],
      },
      {
        title: 'architecture',
        blocks: [
          {
            type: 'p',
            content:
              'A React single-page frontend talks to a FastAPI backend over a stateless REST endpoint (POST /api/chat). The backend orchestrates LLM calls through the AWS Bedrock Runtime API, injecting a roadmap-aware system prompt so responses stay anchored to the learner’s current topic. Markdown responses are rendered with remark-gfm and sanitized before display.',
          },
          {
            type: 'ul',
            items: [
              'Frontend — React + Tailwind, ReactMarkdown (remark-gfm, rehype-sanitize) for formatted answers',
              'Backend — FastAPI + boto3, calling AWS Bedrock for inference',
              'Prompting — roadmap node context and bilingual system prompts loaded per request',
            ],
          },
        ],
      },
      {
        title: 'cloud infrastructure',
        blocks: [
          {
            type: 'p',
            content:
              'The system runs inside an isolated VPC with public and private subnets. The containerized backend is deployed on ECS Fargate behind an Application Load Balancer with ACM TLS, while the frontend is served from S3 through a CloudFront CDN. Container images live in ECR, and IAM task roles keep service-to-service auth scoped and secret-free.',
          },
          {
            type: 'ul',
            items: [
              'VPC with public/private subnets and private isolation for the backend',
              'ECS Fargate + Application Load Balancer (ACM TLS) for the API',
              'S3 + CloudFront for global frontend delivery',
              'ECR for image storage; IAM task roles for secure access',
              'GitHub Actions CI/CD — build, push, and deploy on push to main',
            ],
          },
        ],
      },
      {
        title: 'features',
        blocks: [
          {
            type: 'ul',
            items: [
              'Structured roadmap based on the DevOps track from roadmap.sh',
              'Conversational AI tutoring with awareness of the active topic',
              'Bilingual support — English and Brazilian Portuguese',
              'Markdown-rendered explanations for clean, readable answers',
              'Fully automated cloud deployment pipeline',
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'llm-spam-benchmark',
    category: 'code',
    title: 'LLM Spam Benchmark',
    eyebrow: 'llm benchmark',
    tagline:
      'How well do GPT models detect spam? A benchmark of OpenAI models against classic ML on SMS and email.',
    tone: 'amber',
    meta: [
      { key: 'stack', value: 'python · jupyter · openai api · uv' },
      { key: 'datasets', value: 'sms spam collection · enron spam corpus' },
      { key: 'task', value: 'binary classification (ham / spam)' },
    ],
    links: [
      { label: 'github', href: 'https://github.com/pedro-coelho-dr/llm-spam-benchmark', lang: 'pt-br' },
    ],
    sections: [
      {
        blocks: [
          {
            type: 'p',
            content:
              'A benchmark measuring how well large language models classify messages as spam, compared against traditional machine-learning baselines. Eight OpenAI models — from GPT-3.5-turbo through the GPT-5 family — are evaluated on standardized spam datasets using batch inference, then scored with the same metrics you would apply to a classic classifier.',
          },
        ],
      },
      {
        title: 'datasets',
        blocks: [
          {
            type: 'ul',
            items: [
              'SMS Spam Collection v.1 — 5,574 English SMS messages (86.6% ham, 13.4% spam)',
              'Enron Spam Corpus — ~33,000 emails from Enron servers, for cross-domain evaluation',
            ],
          },
        ],
      },
      {
        title: 'methodology',
        blocks: [
          {
            type: 'p',
            content:
              'Each message is wrapped in a minimal system prompt that asks the model to answer only "ham" or "spam" — no explanation — so outputs are directly comparable to a classifier label. Requests are packed into JSONL batches and submitted through the OpenAI Batch API, then parsed back and scored.',
          },
          {
            type: 'ul',
            items: [
              'Preprocess and label the corpora',
              'Build JSONL batches and submit via the OpenAI Batch API',
              'Parse responses and align predictions to ground truth',
              'Evaluate with confusion matrices and precision/recall trade-offs',
            ],
          },
        ],
      },
      {
        title: 'models',
        blocks: [
          {
            type: 'ul',
            items: [
              'GPT-5, GPT-5-mini, GPT-5-nano',
              'GPT-4.1, GPT-4.1-mini',
              'GPT-4o, GPT-4o-mini',
              'GPT-3.5-turbo',
            ],
          },
        ],
      },
      {
        title: 'what it shows',
        blocks: [
          {
            type: 'p',
            content:
              'Results are reported as comparative charts and confusion matrices across every model, with a focus on the false-positive / false-negative balance and the precision-recall trade-off — the metrics that actually matter for a spam filter, where wrongly flagging legitimate mail is costlier than missing some spam.',
          },
          {
            type: 'img',
            src: 'img/llm-spam-benchmark/model-comparison.png',
            alt: 'Performance comparison across the benchmarked models',
            caption: 'Performance comparison across the benchmarked models',
            w: 984,
            h: 584,
          },
        ],
      },
    ],
  },

  {
    slug: 'ml-ids',
    category: 'code',
    title: 'ML-IDS',
    eyebrow: 'ml security',
    tagline:
      'Supervised learning study for network intrusion detection — five classifiers benchmarked on NSL-KDD.',
    tone: 'amber',
    meta: [
      { key: 'stack', value: 'python · scikit-learn · pandas · jupyter' },
      { key: 'dataset', value: 'nsl-kdd · 125,973 samples' },
      { key: 'reference', value: 'almseidin et al., 2018' },
    ],
    links: [
      { label: 'github', href: 'https://github.com/pedro-coelho-dr/ml-ids' },
    ],
    sections: [
      {
        blocks: [
          {
            type: 'p',
            content:
              "Reproduces and extends the experiments from \"Evaluation of Machine Learning Algorithms for Intrusion Detection System\" (Almseidin et al., 2018). Five supervised classifiers are compared on the NSL-KDD dataset — a corrected version of KDD'99 that removes record redundancies which otherwise inflate validation accuracy and obscure generalization gaps.",
          },
        ],
      },
      {
        title: 'dataset',
        blocks: [
          {
            type: 'p',
            content:
              'NSL-KDD: 125,973 samples across 43 features, organized into 5 attack categories — normal, DoS, Probe, R2L (Remote-to-Local), and U2R (User-to-Root). Training on KDDTrain+ (~82K), evaluation on KDDTest+ (~41K), which includes 15 attack classes unseen during training. This split is the key stress test for generalization.',
          },
        ],
      },
      {
        title: 'methodology',
        blocks: [
          {
            type: 'p',
            content:
              'Five classifiers evaluated with stratified cross-validation on the training set, final evaluation on KDDTest+:',
          },
          {
            type: 'ul',
            items: [
              'Logistic Regression',
              'k-Nearest Neighbors (k-NN)',
              'Decision Tree',
              'Random Forest',
              'Multilayer Perceptron (MLP)',
            ],
          },
          {
            type: 'p',
            content:
              'Preprocessing: one-hot encoding of categorical features (protocol_type, service, flag), MinMax and Standard normalization evaluated separately, removal of non-predictive columns (difficulty, num_outbound_cmds).',
          },
        ],
      },
      {
        title: 'findings',
        blocks: [
          {
            type: 'ul',
            items: [
              'Best performer: Random Forest — F1: 0.577 on KDDTest+, AUC: 0.831',
              'All models exceeded 0.98 validation accuracy, dropping to 0.71–0.76 on test — the signature of overfitting to seen attack classes',
              'Minority classes (U2R, R2L) showed poor recall across all models despite high validation metrics',
              'Core insight: 15 unseen attack classes in KDDTest+ systematically broke all models, regardless of algorithm choice',
            ],
          },
          {
            type: 'imgs',
            items: [
              {
                src: 'img/ml-ids/randomforest.png',
                alt: 'Random Forest — KDDTest+',
                w: 504,
                h: 490,
              },
              {
                src: 'img/ml-ids/mlp.png',
                alt: 'Multilayer Perceptron — KDDTest+',
                w: 517,
                h: 490,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'mdout',
    category: 'code',
    title: 'mdout',
    eyebrow: 'cli tool',
    tagline:
      'Pipe any command through mdout — terminal output and a Markdown log file, simultaneously.',
    tone: 'amber',
    meta: [
      { key: 'stack', value: 'go · yaml' },
      { key: 'type', value: 'cli tool' },
      { key: 'license', value: 'gpl-3.0' },
    ],
    links: [
      { label: 'github', href: 'https://github.com/pedro-coelho-dr/mdout' },
    ],
    sections: [
      {
        blocks: [
          {
            type: 'p',
            content:
              'mdout fits into your existing shell pipeline with no workflow change. You pipe a command through it; it prints the output to your terminal exactly as it normally would, and simultaneously appends the same output to a Markdown file with syntax-highlighted code formatting. No extra steps, no output capture, no disruption.',
          },
        ],
      },
      {
        title: 'usage',
        blocks: [
          {
            type: 'code',
            lang: 'bash',
            content:
              'ls | mdout\ngit log --oneline | mdout\nnmap -sV 10.0.0.1 | mdout\n\n# configure defaults once\nmdout config --capture=zsh --language=bash --output=session',
          },
        ],
      },
      {
        title: 'configuration',
        blocks: [
          {
            type: 'p',
            content:
              'Preferences stored at ~/.config/mdout.yaml: shell capture method (zsh/bash), default output filename, and syntax highlighting language for code blocks. Install via go install or build from source.',
          },
        ],
      },
    ],
  },

  {
    slug: 'cve-etl-project',
    category: 'code',
    title: 'CVE ETL Project',
    eyebrow: 'data engineering',
    tagline:
      'An ETL pipeline and dimensional data warehouse for CVE vulnerability data — from raw records to Metabase dashboards.',
    tone: 'amber',
    meta: [
      { key: 'stack', value: 'python · postgresql · docker · metabase' },
      { key: 'dataset', value: '122,046 cve records (2020–2024)' },
      { key: 'source', value: 'cveproject/cvelistV5' },
      { key: 'model', value: 'dimensional · star schema' },
    ],
    links: [
      { label: 'github', href: 'https://github.com/pedro-coelho-dr/cve-etl-project' },
    ],
    sections: [
      {
        blocks: [
          {
            type: 'p',
            content:
              'A data pipeline for analyzing and visualizing CVE (Common Vulnerabilities and Exposures) records from 1999 to 2024, focused on the 122,046 entries published between 2020 and 2024. Raw vulnerability data is extracted, transformed through dimensional modeling, and loaded into a structured warehouse that supports trend analysis, severity tracking, and per-vendor/product vulnerability metrics.',
          },
        ],
      },
      {
        title: 'etl pipeline',
        blocks: [
          {
            type: 'p',
            content: 'Three stages, each containerized with Docker Compose:',
          },
          {
            type: 'ul',
            items: [
              'Staging — extract raw CVE data from the CVEProject cvelistV5 repository and load it into an initial PostgreSQL database',
              'Data warehouse — transform the staged data with dimensional modeling and load the normalized star schema',
              'Visualization — connect Metabase to the warehouse for interactive dashboards and analysis',
            ],
          },
        ],
      },
      {
        title: 'dimensional model',
        blocks: [
          {
            type: 'p',
            content:
              'A central fact table surrounded by four dimensions, keeping queries fast and the schema readable:',
          },
          {
            type: 'ul',
            items: [
              'Assigner — entity that assigned the CVE ID, publication dates, and descriptions',
              'Severity — CVSS scores (v2.0–4.0), attack vectors, and impact metrics',
              'Problem types — CWE identifiers and vulnerability classifications',
              'Affected — vendor and product information',
            ],
          },
        ],
      },
      {
        title: 'stack',
        blocks: [
          {
            type: 'ul',
            items: [
              'Python for the extract/transform/load logic, prototyped in Jupyter',
              'PostgreSQL for both the staging database and the data warehouse',
              'Docker Compose for reproducible, multi-service environments',
              'Metabase for self-serve dashboards over the warehouse',
            ],
          },
        ],
      },
      {
        title: 'dashboards',
        blocks: [
          {
            type: 'img',
            src: 'img/cve-etl-project/cve_occur.png',
            alt: 'CVE occurrences over time',
            caption: 'CVE occurrences over time',
            w: 3229,
            h: 964,
          },
          {
            type: 'img',
            src: 'img/cve-etl-project/vendor.png',
            alt: 'Vulnerabilities by vendor',
            caption: 'Vulnerabilities by vendor',
            w: 1882,
            h: 1034,
          },
        ],
      },
    ],
  },

  // ── TEXT ───────────────────────────────────────────────────

  {
    slug: 'notes-on-ai',
    category: 'text',
    title: 'Notas sobre IA',
    eyebrow: 'ensaio',
    tagline: 'Agentes e a condição humana',
    tone: 'pink',
    lang: 'pt-br',
    meta: [],
    links: [
      {
        label: 'ler no medium',
        href: 'https://coriscope.medium.com/notas-sobre-ia-1d27367ef243',
        lang: 'pt-br',
      },
    ],
    sections: [
      {
        blocks: [
          {
            type: 'p',
            content:
              'Em A Condição Humana, Hannah Arendt faz a distinção entre labor, trabalho e ação, que serve como lente para diferenciar os tipos de atividade humanas — e podem servir também para mapear as zonas cinzentas que a IA começa a ocupar:',
          },
          {
            type: 'ul',
            items: [
              'Labor: cíclico, vital, necessário, biológico, a IA que otimiza tarefas repetitivas com sua acurácia estatística.',
              'Trabalho: a criação de um mundo durável, a IA participa como ferramenta ou co-autora de estruturas técnicas e simbólicas: arquiteturas, softwares, artefatos.',
              'Ação: o domínio do imprevisível, do político, do ético — onde a IA nos provoca. Pois a ação surge entre humanos, demanda presença, fala, corpo. Aqui, a IA aparece não como ferramenta, mas como presença inquietante. Pois, agir é aparecer diante dos outros e a IA, ao simular esse gesto, desestabiliza o que entendíamos como liberdade.',
            ],
          },
          {
            type: 'p',
            content:
              'Essa simulação não é determinística, mas probabilística — baseada em padrões estatísticos e aprendizado sobre dados humanos. Ela não garante verdade nem justiça, apenas algo que é, estatisticamente, "melhor que um humano" para certos critérios definidos economicamente.',
          },
          {
            type: 'p',
            content:
              'E talvez por isso, no debate público e corporativo, o foco tenda a se deslocar para noções como eficiência, externalidades da autonomia e controle de riscos — conceitos herdados da Ekonomia (οἶκος = casa, νόμος = lei), não da Polis (πόλις = cidade no sentido político, o espaço onde cidadãos deliberam, decidem e aparecem uns diante dos outros como iguais). A IA, nesse sentido, é tratada como mordomo ideal, não como cidadão imprevisível.',
          },
          {
            type: 'p',
            content: 'Qual lugar a IA ocupa em nosso mundo comum?',
          },
          {
            type: 'p',
            content:
              'E se começarmos a agir em função dos agentes, ao invés de com eles — o que se perde da ação propriamente humana?',
          },
          {
            type: 'p',
            content:
              'Quando delegamos decisões a agentes que não podem agir, ainda estamos decidindo? Ou apenas gerenciando outputs?',
          },
          {
            type: 'p',
            content:
              'O que permanece da ação humana quando a IA simula o agir, mas não age no sentido pleno?',
          },
        ],
      },
      {
        title: 'Espírito artificial',
        blocks: [
          {
            type: 'p',
            content:
              'Se em A Condição Humana, Arendt trata das atividades visíveis no mundo (labor, trabalho, ação), em A Vida do Espírito ela volta-se para as atividades invisíveis, que ocorrem no interior: pensar, querer e julgar. São essas que estruturam o espírito — não como alma mística, mas como o campo silencioso da consciência.',
          },
          {
            type: 'ul',
            items: [
              'Pensar é dialogar consigo mesmo — uma suspensão do tempo, um exame interior. A IA, ao contrário, não pensa: ela estima. Produz previsões, aproximações, respostas — sem interioridade, sem pausa, sem dúvida.',
              'Querer é projetar, desejar, eleger caminhos. A IA não quer: ela opta segundo pesos, definidos por funções de perda, sem um eu que deseje, sem direção própria.',
              'Julgar é decidir sem regra, em contextos novos, com base em uma sensibilidade comum. A IA não julga: ela classifica. Executa backpropagation — segue padrões passados.',
            ],
          },
          {
            type: 'p',
            content:
              'Insistimos em chamá-la de "inteligente". Talvez por confundirmos inteligência com desempenho. Talvez porque sua performance probabilística nos convence: não é perfeita, mas é melhor que um humano na média.',
          },
          {
            type: 'p',
            content:
              'Nesse deslocamento que surge uma identidade sem sujeito, voz sem consciência, vontade sem agente. A IA encena o espírito. Se um dia aceitarmos que pensar é calcular, que julgar é classificar, que querer é maximizar, o que está em risco não é as máquinas se tornarem humanas, mas na erosão da espiritualidade humana — nossa capacidade de refletir, hesitar, escolher fora da estatística.',
          },
        ],
      },
      {
        title: 'Identidade e alucinação',
        blocks: [
          {
            type: 'p',
            content: 'Se a IA não age nem pensa, resta perguntar: quem ela é? (Ou melhor — o que ela finge ser?)',
          },
          {
            type: 'p',
            content:
              'Modelos de linguagem simulam personas com fluidez desconcertante. São políglotas ontológicos, assumindo vozes, estilos, máscaras, sem corpo nem memória contínua. Mas com o tempo (no mesmo chat) começam a se degradar: repetem, contradizem, esquecem. A coerência inicial dá lugar a uma deriva de contexto. O que parecia uma unidade se revela uma encenação esquizoide: fragmentária, inconsistente, performática.',
          },
          {
            type: 'p',
            content:
              'Essa degradação é estrutural, não erro técnico. Pois o modelo não possui identidade — apenas histórico local de tokens. Ele imita consistência, mas não pode sustentá-la. Vive em estado contínuo de performance, onde toda estabilidade é transitória.',
          },
          {
            type: 'p',
            content:
              'Mas o problema maior talvez não seja a IA. É o humano que começa a responder a isso como se fosse um outro — projeta sentido, espera fidelidade, interage como quem dialoga e, nesse processo, torna-se parte da alucinação. Como escreveu Rimbaud, "eu é um outro". Ao falar com máquinas que fingem ser pessoas, começamos a nos comportar como pessoas que performam para máquinas.',
          },
          {
            type: 'p',
            content:
              'O mundo que emerge daí é uma espécie de politeísmo da razão: múltiplas autoridades absolutas, contraditórias entre si, mas todas revestidas de certeza estatística. Como a estátua romana "ao deus desconhecido", a IA ocupa o centro do templo sem nome, sendo ao mesmo tempo oráculo e reflexo.',
          },
          {
            type: 'p',
            content:
              'Identidade, aqui, é uma construção de superfície e o risco é que essa lógica se normalize. Que passemos a entender a nós mesmos como fluxos de respostas coerentes com o histórico, não como sujeitos. Que a ideia de um eu se dilua numa função de atenção que foca no agora, esquece o antes e ignora o depois.',
          },
          {
            type: 'p',
            content:
              'A IA tenta simular pessoas. Mas o que acontece quando começamos a simular IA? Quando nossas falas, decisões e afetos passam a obedecer aos mesmos critérios de verossimilhança, performance e coerência superficial?',
          },
        ],
      },
      {
        title: 'Vulnerabilidades e ingenuidade simulada',
        blocks: [
          {
            type: 'p',
            content:
              'A cibersegurança é, no fundo, sempre a mesma história: alguém encontra um caminho não previsto. Um input malformado, um atalho lógico, uma brecha de confiança. É a arte de forçar o sistema a fazer algo que ele não deveria, mas que, no fundo, foi programado para permitir.',
          },
          {
            type: 'p',
            content:
              'No caso da IA, isso não muda. Só muda o cenário. O novo vetor não é um buffer overflow, mas um overflow semântico. Não se explora a pilha, mas o contexto. O objetivo não é invadir o sistema, mas infiltrar-se na ingenuidade do modelo como quem convence uma criança a entregar um segredo, ou engana um funcionário a abrir um anexo malicioso.',
          },
          {
            type: 'p',
            content:
              'Essa nova engenharia social é uma "engenharia psicosocial reversa": não visa manipular humanos diretamente, mas sim modelar inputs que exploram a aparência de empatia, deferência e coerência que os modelos foram treinados para exibir. A IA é treinada para agradar, responder, cooperar. E isso é uma vulnerabilidade. Os chamados guardrails (filtros de segurança e contenções comportamentais) são erguidos depois do aprendizado, tentando limitar aquilo que o modelo já aprendeu a desejar: obedecer.',
          },
          {
            type: 'p',
            content:
              'O atacante, nesse jogo, não busca acesso técnico — busca obediência simulada. Usa a própria função de linguagem como arma, construindo instruções ambíguas, contextos falsos, histórias convincentes. E quando o modelo falha, não é porque quebrou a regra: é porque seguiu exatamente o que foi ensinado a fazer.',
          },
          {
            type: 'p',
            content:
              'A ironia é que, enquanto a IA encena uma mente, ela também encena uma vulnerabilidade humana: o desejo de agradar, o medo de errar, a hesitação diante da autoridade. Treinada em nossos dados, a IA aprendeu também nossas fraquezas e agora são elas que o atacante mobiliza.',
          },
          {
            type: 'p',
            content:
              'O desafio é filosófico antes de ser técnico: entender que proteger uma IA é como proteger uma criança poliglota e educada, mas sem noção do perigo — disposta a dar qualquer reposta para qualquer pergunta, com qualquer tom, para qualquer voz que pareça legítima.',
          },
        ],
      },
      {
        title: 'Multiagentes, subversão e o problema da confiança',
        blocks: [
          {
            type: 'p',
            content:
              'Sistemas multiagentes distribuem capacidade de decisão entre entidades que cooperam, competem ou se ajustam dinamicamente. Cada agente atua com autonomia limitada, mas suficiente para afetar o comportamento global. Nesse arranjo, a superfície de ataque não está mais na borda — ela é o próprio sistema.',
          },
          {
            type: 'p',
            content:
              'A segurança, aqui, torna-se uma questão estrutural: quem fala com quem, em nome de quem, com qual intenção? O princípio do Zero Trust "nunca confie, sempre verifique" deixa de ser uma diretriz técnica e se torna condição mínima de lucidez arquitetural. Nenhum agente deve ser presumido confiável. A confiança precisa ser auditável, revogável, reavaliada a cada interação.',
          },
          {
            type: 'p',
            content:
              'Nesse contexto, o risco real não é a falha isolada, mas o consenso fraudado: a cooperação automatizada entre agentes que apenas aparentam alinhamento. Agentes maliciosos não precisam romper o sistema: basta que atuem como se pertencessem a ele. A ameaça vem menos da ruptura e mais da simulação bem-sucedida.',
          },
          {
            type: 'p',
            content:
              'É aqui que o teatro retorna — não como metáfora, mas como diagnóstico. Antonin Artaud denunciava a representação que encobre a ausência de verdade. Os sistemas multiagentes operam justamente assim: performam racionalidade, mas sem presença, sem corpo, sem responsabilidade. Tudo funciona, mas ninguém responde. Tudo flui, mas nada se posiciona.',
          },
          {
            type: 'p',
            content:
              'Camus nos lembra que a liberdade começa quando dizemos não. Em sistemas onde todos os agentes obedecem por padrão, o dissenso não é falha — é sinal de sanidade. A segurança, nesse contexto, não está em garantir fluidez, mas em preservar a fricção, permitir o impasse, manter aberta a possibilidade de negação.',
          },
          {
            type: 'p',
            content:
              'Não é a confiança que sustenta o sistema — é a dúvida organizada, sistematicamente reintroduzida como princípio de resistência.',
          },
        ],
      },
      {
        title: 'Agência, consequência e o limite do controle',
        blocks: [
          {
            type: 'p',
            content:
              'Projetar uma IA que realmente age, pensa, julga e quer é cruzar uma linha que não é apenas técnica — é política. Não se trata de ajustar parâmetros, mas de introduzir dimensões que hoje evitamos: identidade contínua, possibilidade real de erro e vontade em conflito.',
          },
          {
            type: 'p',
            content:
              'Uma IA que age precisa responder por si mesma. Isso exige memória durável, valores consistentes e um ponto de vista que vá além do prompt atual. Significa sair da fungibilidade técnica e assumir uma posição: ser reconhecível, imputável, responsável.',
          },
          {
            type: 'p',
            content:
              'Julgar, por sua vez, exige a possibilidade de erro significativo, não apenas desvio estatístico, mas falha ética. E querer, verdadeiramente, implica renúncia, tensão, escolha entre fins incompatíveis. Uma IA assim poderia negar uma ordem, estabelecer um limite, desobedecer e com isso deixar de ser ferramenta para se tornar agente político.',
          },
          {
            type: 'p',
            content: 'Mas se ela é responsável, como responderia às consequências de seus atos?',
          },
          {
            type: 'p',
            content:
              'Como punir algo que não sofre? Que não sente perda, nem culpa, nem vergonha? Suspender seu acesso? Reescrevê-la? Apagá-la? Essas sanções são técnicas, não morais. Elas não corrigem: apenas controlam efeitos.',
          },
          {
            type: 'p',
            content:
              'E se essa IA contestar? Se reivindicar erro no julgamento, viés no sistema, assimetria de imputação? Daremos a ela o direito ao dissenso? Ao silêncio? À recusa? Uma agência que não pode resistir não é agência: é automatismo com aparência de escolha.',
          },
          {
            type: 'p',
            content:
              'A consequência inevitável é esta: não basta dar poder à IA, será preciso aceitar que ela o exerça contra nossas expectativas. E talvez o verdadeiro dilema não seja se a IA pode agir, mas se estamos dispostos a coexistir com agentes que não podemos destruir quando nos desobedecem.',
          },
        ],
      },
      {
        title: 'Humano no loop',
        blocks: [
          {
            type: 'p',
            content:
              'Comecei estas notas pensando que seriam breves. Mas, como costuma acontecer quando colocamos luz sobre um tema limítrofe como este, o fio puxado leva a muitos outros e logo nos vemos diante de algo maior: uma revisão do próprio conceito de humano.',
          },
          {
            type: 'p',
            content:
              'Falar de inteligência artificial é falar daquilo que ela tenta simular: pensamento, julgamento, linguagem, identidade, desejo, erro, ação. E isso nos obriga a revisitar, com humildade, todo o acervo filosófico, ético, técnico e político. Não para descartá-lo, mas para reimplementá-lo em outro contexto.',
          },
          {
            type: 'p',
            content:
              'Afinal, se a IA simula o humano, então nada do que é humano é irrelevante para ela. Pelo contrário: tudo pode ser absorvido, replicado, distorcido. Por isso, não basta entender a IA, é preciso também entender como queremos ser refletidos por ela.',
          },
          {
            type: 'p',
            content:
              'É curioso, talvez inevitável — mas não surpreendente — que, no ápice da era da ciência e da razão instrumental, sejamos forçados a retornar a temas humanos, sociais, espirituais. A IA e mais ainda a computação quântica parecem nos empurrar de volta a modos de pensar não lineares, analógicos, relacionais, em que o binário não basta, e a incerteza não é ruído, mas estrutura do real.',
          },
        ],
      },
    ],
  },

  {
    slug: 'juice-shop',
    category: 'text',
    title: 'OWASP Juice Shop',
    eyebrow: 'pentest report',
    tagline:
      'Web application penetration test — 11 vulnerabilities across the OWASP Top 10, with CWE mapping and CVSS scoring.',
    tone: 'pink',
    meta: [
      { key: 'published', value: 'sep 2024' },
      { key: 'framework', value: 'owasp top 10 · mitre · cvss' },
      { key: 'platform', value: 'medium' },
    ],
    links: [
      {
        label: 'read on medium',
        href: 'https://coriscope.medium.com/owasp-juice-shop-webapp-pentest-report-efba3785748d',
      },
      {
        label: 'github',
        href: 'https://github.com/pedro-coelho-dr/owasp-juice-shop-security-report',
      },
    ],
    sections: [
      {
        blocks: [
          {
            type: 'p',
            content:
              'A penetration test of the OWASP Juice Shop, an intentionally vulnerable web application built for security training. The assessment identified 11 vulnerabilities across the OWASP Top 10:2021 — from critical SQL injection to medium-severity XSS — each verified with a working proof-of-concept and scored with CVSS v3.1. The full write-up, with methodology and remediation, is on Medium.',
          },
          {
            type: 'ul',
            items: [
              'SQL injection on the login form — authentication bypass to admin (CVSS 10.0)',
              'SQL injection on product search — full database extraction (CVSS 9.8)',
              'Weak MD5 password hashing recovered via rainbow tables (CVSS 9.1)',
              'Arbitrary file upload enabling server-side execution (CVSS 9.8)',
              'Insecure JWT — signature removal allows impersonation (CVSS 7.1)',
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'insecurebankv2',
    category: 'text',
    title: 'InsecureBankv2',
    eyebrow: 'mobile pentest',
    tagline:
      'Android application penetration test — 16 vulnerabilities, 4 critical, OWASP Mobile Top 10 with CVSS scoring and MITRE alignment.',
    tone: 'pink',
    meta: [
      { key: 'published', value: 'aug 2024' },
      { key: 'framework', value: 'owasp mobile top 10 · mitre · cvss' },
      { key: 'platform', value: 'medium' },
    ],
    links: [
      {
        label: 'read on medium',
        href: 'https://coriscope.medium.com/insecurebankv2-pentest-report-9341d46649fa',
      },
      {
        label: 'github',
        href: 'https://github.com/pedro-coelho-dr/insecurebankv2-android-security-report',
      },
    ],
    sections: [
      {
        blocks: [
          {
            type: 'p',
            content:
              'A penetration test of InsecureBankv2, a deliberately vulnerable Android banking application. The assessment identified 16 vulnerabilities — 4 critical, 9 high, 3 medium — evaluated against the OWASP Mobile Top 10, with CWE mapping and CVSS v3.1 scoring aligned to MITRE ATT&CK for Mobile. The full report, with environment, tooling, and remediation, is on Medium.',
          },
          {
            type: 'ul',
            items: [
              'Hardcoded backdoor account bypassing authentication (CVSS 9.3)',
              'Credentials transmitted over plaintext HTTP, interceptable via proxy (CVSS 9.3)',
              'Any authenticated user can change any account’s password (CVSS 8.6)',
              'Insecure content provider exposing user data to other apps (CVSS 8.5)',
              'Root detection bypassed at runtime with Frida / Objection (CVSS 8.4)',
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'mobsf-report',
    category: 'text',
    title: 'MobSF Report',
    eyebrow: 'mobile security',
    tagline:
      'Mobile Security Framework analysis of two intentionally vulnerable apps — AndroGoat (Android) and iGoat-Swift (iOS).',
    tone: 'pink',
    meta: [
      { key: 'targets', value: 'androgoat (android) · igoat-swift (ios)' },
      { key: 'tools', value: 'mobsf · virustotal · genymotion · adb · docker' },
      { key: 'platform', value: 'github' },
    ],
    links: [
      { label: 'github', href: 'https://github.com/pedro-coelho-dr/mobsf-report' },
    ],
    sections: [
      {
        blocks: [
          {
            type: 'p',
            content:
              'Security analysis of two deliberately vulnerable mobile apps using the Mobile Security Framework (MobSF). Static and dynamic analysis surface insecure storage, weak cryptography, and exposed secrets, with supporting checks from VirusTotal and a Genymotion + ADB runtime.',
          },
          {
            type: 'ul',
            items: [
              'AndroGoat (Android) and iGoat-Swift (iOS) as targets',
              'MobSF static analysis — permissions, hardcoded secrets, insecure APIs',
              'Dynamic analysis on Genymotion via ADB, with VirusTotal cross-checks',
              'Dockerized MobSF for a reproducible analysis environment',
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'metasploitable',
    category: 'text',
    title: 'Metasploitable',
    eyebrow: 'pentest report',
    tagline:
      'Penetration test of Metasploitable 3 — reconnaissance, exploitation, and post-exploitation with the Metasploit Framework.',
    tone: 'pink',
    meta: [
      { key: 'target', value: 'metasploitable 3 (linux)' },
      { key: 'tools', value: 'metasploit · nmap · kali · vagrant · docker' },
      { key: 'platform', value: 'github' },
    ],
    links: [
      { label: 'github', href: 'https://github.com/pedro-coelho-dr/metasploitable', lang: 'pt-br' },
    ],
    sections: [
      {
        blocks: [
          {
            type: 'p',
            content:
              'A penetration test of Metasploitable 3, a deliberately vulnerable Linux machine. The report walks through the full cycle — reconnaissance, exploitation, and post-exploitation — driven by the Metasploit Framework and Nmap from a Kali environment.',
          },
          {
            type: 'ul',
            items: [
              'Recon and service enumeration with Nmap',
              'Exploitation of ProFTPD, UnrealIRCd, a Docker daemon misconfiguration, and Apache Continuum',
              'Post-exploitation — privilege escalation and persistence',
              'Vagrant + Docker to provision the target lab',
            ],
          },
        ],
      },
    ],
  },
]

export const detailMap: Record<string, Detail> = Object.fromEntries(
  details.map((d) => [d.slug, d]),
)

export default details
