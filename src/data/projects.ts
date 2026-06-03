export type PortfolioItem = {
  avatar?: string
  description: string
  eyebrow: string
  /** Marks the linked content as Portuguese — shows a PT-BR badge beside the eyebrow. */
  lang?: 'pt-br'
  meta: string[]
  title: string
  to?: string
  tone?: 'amber' | 'neutral' | 'pink' | 'red'
}

export const projects: PortfolioItem[] = [
  {
    description: 'Deliberately vulnerable Flask lab for practicing web exploitation.',
    eyebrow: 'vulnerable lab',
    meta: ['Flask', 'Python', 'Docker'],
    title: 'GLHF',
    to: '/project/glhf',
    tone: 'red',
  },
  {
    avatar: 'img/verbalyst/avatar.jpg',
    description: 'Semantic similarity word game for Portuguese — guess the secret word by meaning, not by spelling.',
    eyebrow: 'applied ML',
    meta: ['FastAPI', 'Word2Vec', 'Docker'],
    title: 'Verbalyst',
    to: '/project/verbalyst',
    tone: 'red',
  },
  {
    description: 'Interactive DevOps & Cloud learning roadmap with a context-aware AI tutor, deployed on AWS.',
    eyebrow: 'cloud · ai',
    meta: ['React', 'FastAPI', 'AWS'],
    title: 'DevOpsCool',
    to: '/project/devopscool',
    tone: 'red',
  },
]
