import type { PortfolioItem } from './projects'

export const code: PortfolioItem[] = [
  {
    description: 'Semantic similarity word game for Portuguese — guess the secret word by meaning, not by spelling.',
    eyebrow: 'applied AI',
    meta: ['FastAPI', 'Word2Vec', 'Docker'],
    title: 'Verbalyst',
    to: '/code/verbalyst',
    tone: 'amber',
  },
  {
    description: 'Supervised learning study for network intrusion detection on the NSL-KDD dataset.',
    eyebrow: 'ml security',
    meta: ['Python', 'scikit-learn', 'NSL-KDD'],
    title: 'ML-IDS',
    to: '/code/ml-ids',
    tone: 'amber',
  },
  {
    description: 'CLI tool that captures piped command output to Markdown while printing to the terminal.',
    eyebrow: 'cli tool',
    meta: ['Go', 'CLI', 'Markdown'],
    title: 'mdout',
    to: '/code/mdout',
    tone: 'amber',
  },
]
