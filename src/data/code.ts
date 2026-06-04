import type { PortfolioItem } from './projects'

export const code: PortfolioItem[] = [
  {
    avatar: 'img/llm-spam-benchmark/avatar.png',
    description: 'Benchmarks GPT models against classic ML for SMS/email spam detection.',
    eyebrow: 'llm benchmark',
    meta: ['Python', 'OpenAI API', 'Jupyter'],
    title: 'LLM Spam Benchmark',
    to: '/code/llm-spam-benchmark',
    tone: 'amber',
  },
  {
    avatar: 'img/mdout/avatar.png',
    description: 'CLI tool that captures piped command output to Markdown while printing to the terminal.',
    eyebrow: 'cli tool',
    meta: ['Go', 'CLI', 'Markdown'],
    title: 'mdout',
    to: '/code/mdout',
    tone: 'amber',
  },
  {
    avatar: 'img/ml-ids/avatar.png',
    description: 'Supervised learning study for network intrusion detection on the NSL-KDD dataset.',
    eyebrow: 'ml security',
    meta: ['Python', 'scikit-learn', 'NSL-KDD'],
    title: 'ML-IDS',
    to: '/code/ml-ids',
    tone: 'amber',
  },
  {
    avatar: 'img/cve-etl-project/avatar.png',
    description: 'ETL pipeline and data warehouse for analyzing CVE vulnerability trends, visualized in Metabase.',
    eyebrow: 'data engineering',
    meta: ['Python', 'PostgreSQL', 'Metabase'],
    title: 'CVE-ETL',
    to: '/code/cve-etl-project',
    tone: 'amber',
  },
]
