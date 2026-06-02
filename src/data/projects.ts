export type PortfolioItem = {
  description: string
  eyebrow: string
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
]
